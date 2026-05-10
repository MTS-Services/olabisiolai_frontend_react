import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Pencil,
  Plus,
  Search,
  ShieldUser,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  createStaffAdmin,
  fetchStaffAdmins,
  type AdminAccountStatus,
  type StaffAdminRow,
  updateAdminRolePermissions,
  updateAdminStatus,
} from "@/api/adminAccounts";
import {
  type AdminPermissionRow,
  type AdminRoleRow,
  fetchAdminPermissions,
  fetchAdminRoles,
} from "@/api/adminRbac";
import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAuthErrorMessage } from "@/features/auth/errorMessage";

function permissionResourceLabel(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length <= 1) return name;
  return parts.slice(1).join(" ");
}

function groupPermissionsByResource(perms: AdminPermissionRow[]): Map<string, AdminPermissionRow[]> {
  const map = new Map<string, AdminPermissionRow[]>();
  for (const p of perms) {
    const key = permissionResourceLabel(p.name) || p.name;
    const list = map.get(key) ?? [];
    list.push(p);
    map.set(key, list);
  }
  for (const [, list] of map) {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }
  return new Map([...map.entries()].sort((a, b) => a[0].localeCompare(b[0])));
}

function displayName(row: StaffAdminRow): string {
  const fn = row.first_name?.trim() ?? "";
  const ln = row.last_name?.trim() ?? "";
  const combined = `${fn} ${ln}`.trim();
  if (combined) return combined;
  if (row.name?.trim()) return row.name.trim();
  return row.email || "—";
}

function roleLabel(row: StaffAdminRow): string {
  if (row.roles?.length) return row.roles.join(", ");
  if (row.role) return row.role;
  return "—";
}

function rowHasSuperAdminRole(row: StaffAdminRow): boolean {
  const roles = row.roles ?? (row.role ? [row.role] : []);
  return roles.includes("super-admin");
}

function adminStatusPillColors(status: string | undefined): string {
  const s = (status ?? "pending").toLowerCase();
  const map: Record<string, string> = {
    active:
      "bg-emerald-500/15 text-emerald-800 ring-emerald-600/25 dark:text-emerald-300",
    pending: "bg-amber-500/15 text-amber-900 ring-amber-600/30 dark:text-amber-200",
    block: "bg-red-500/15 text-red-800 ring-red-600/25 dark:text-red-300",
  };
  return map[s] ?? map.pending;
}

function adminStatusShortLabel(status: AdminAccountStatus): string {
  if (status === "block") return "Suspended";
  if (status === "active") return "Active";
  return "Pending";
}

/** Single control: pill colors follow the current value; change happens in-place. */
function AdminStatusControl({
  value,
  readOnly,
  disabled,
  onChange,
  ariaLabel,
}: {
  value: AdminAccountStatus;
  readOnly: boolean;
  disabled?: boolean;
  onChange?: (next: AdminAccountStatus) => void;
  ariaLabel: string;
}) {
  const colors = adminStatusPillColors(value);
  const base =
    "inline-flex h-9 max-w-56 min-w-36 items-center rounded-full px-3 text-xs font-semibold ring-1 ring-inset transition-colors";

  if (readOnly) {
    return (
      <span
        className={`${base} ${colors} cursor-default pr-3`}
        title="Status cannot be changed for this row"
      >
        {adminStatusShortLabel(value)}
      </span>
    );
  }

  return (
    <div className="relative inline-flex max-w-56 align-middle">
      <select
        aria-label={ariaLabel}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange?.(e.target.value as AdminAccountStatus)}
        className={`${base} ${colors} w-full cursor-pointer appearance-none pr-8 disabled:cursor-not-allowed disabled:opacity-60`}
      >
        <option value="active">Active — verifies email</option>
        <option value="pending">Pending — unverified</option>
        <option value="block">Suspended</option>
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 opacity-70"
        aria-hidden
      />
    </div>
  );
}

export default function AdminAccounts() {
  const { can, user, hasRole } = useAuth();
  const [items, setItems] = useState<StaffAdminRow[]>([]);
  const [meta, setMeta] = useState<{
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  } | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const lastDebouncedSearchRef = useRef("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [spatieRoles, setSpatieRoles] = useState<AdminRoleRow[]>([]);
  const [allPermissions, setAllPermissions] = useState<AdminPermissionRow[]>([]);

  const [createOpen, setCreateOpen] = useState(false);
  const [rbacOpen, setRbacOpen] = useState(false);
  const [rbacTarget, setRbacTarget] = useState<StaffAdminRow | null>(null);

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [statusSavingId, setStatusSavingId] = useState<number | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [createRole, setCreateRole] = useState("");
  const [createPermNames, setCreatePermNames] = useState<Set<string>>(new Set());

  const [rbacRole, setRbacRole] = useState("");
  const [rbacPermNames, setRbacPermNames] = useState<Set<string>>(new Set());

  const grouped = useMemo(() => groupPermissionsByResource(allPermissions), [allPermissions]);

  const loadCatalog = useCallback(async () => {
    try {
      const [r, p] = await Promise.all([fetchAdminRoles(), fetchAdminPermissions()]);
      setSpatieRoles(r);
      setAllPermissions(p);
    } catch {
      // list page still works; modals may be limited
    }
  }, []);

  const loadList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { items: list, meta: m } = await fetchStaffAdmins({
        page,
        per_page: perPage,
        search: debouncedSearch || undefined,
      });
      setItems(list);
      setMeta(m);
    } catch (e) {
      setError(getAuthErrorMessage(e, "Could not load admins."));
    } finally {
      setLoading(false);
    }
  }, [page, perPage, debouncedSearch]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const next = searchInput.trim();
      if (lastDebouncedSearchRef.current !== next) {
        lastDebouncedSearchRef.current = next;
        setPage(1);
      }
      setDebouncedSearch(next);
    }, 350);
    return () => window.clearTimeout(id);
  }, [searchInput]);

  useEffect(() => {
    void loadCatalog();
  }, [loadCatalog]);

  useEffect(() => {
    void loadList();
  }, [loadList]);

  function toggleCreatePerm(name: string) {
    setCreatePermNames((prev) => {
      const n = new Set(prev);
      if (n.has(name)) n.delete(name);
      else n.add(name);
      return n;
    });
  }

  function toggleRbacPerm(name: string) {
    setRbacPermNames((prev) => {
      const n = new Set(prev);
      if (n.has(name)) n.delete(name);
      else n.add(name);
      return n;
    });
  }

  function openCreate() {
    setFormError(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setCreateRole(spatieRoles[0]?.name ?? "");
    setCreatePermNames(new Set());
    setCreateOpen(true);
  }

  function openRbac(row: StaffAdminRow) {
    setFormError(null);
    setRbacTarget(row);
    const initialRole = row.roles?.[0] ?? row.role ?? spatieRoles[0]?.name ?? "";
    setRbacRole(initialRole);
    setRbacPermNames(new Set(row.permissions ?? []));
    setRbacOpen(true);
  }

  async function submitCreate() {
    const fn = firstName.trim();
    const ln = lastName.trim();
    const em = email.trim();
    const pw = password;
    const rl = createRole.trim();
    if (!fn || !ln || !em || !pw || !rl) {
      setFormError("first_name, last_name, email, password, and role are required.");
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      await createStaffAdmin({
        first_name: fn,
        last_name: ln,
        email: em,
        password: pw,
        role: rl,
        phone: phone.trim() || undefined,
        permissions: createPermNames.size > 0 ? [...createPermNames] : undefined,
      });
      setCreateOpen(false);
      await loadList();
    } catch (e) {
      setFormError(getAuthErrorMessage(e, "Create admin failed."));
    } finally {
      setSaving(false);
    }
  }

  function isActorRow(row: StaffAdminRow): boolean {
    if (user?.id == null) return false;
    return Number(user.id) === row.id;
  }

  const handleStatusChange = useCallback(
    async (row: StaffAdminRow, next: AdminAccountStatus) => {
      const current = (row.status ?? "pending") as AdminAccountStatus;
      if (current === next) return;
      setStatusSavingId(row.id);
      setError(null);
      try {
        await updateAdminStatus(row.id, { status: next });
        await loadList();
      } catch (e) {
        setError(getAuthErrorMessage(e, "Could not update status."));
      } finally {
        setStatusSavingId(null);
      }
    },
    [loadList],
  );

  async function submitRbac() {
    if (!rbacTarget) return;
    const rl = rbacRole.trim();
    if (!rl) {
      setFormError("Role is required.");
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      const payload =
        rbacPermNames.size > 0 ? { role: rl, permissions: [...rbacPermNames] } : { role: rl };
      await updateAdminRolePermissions(rbacTarget.id, payload);
      setRbacOpen(false);
      setRbacTarget(null);
      await loadList();
    } catch (e) {
      setFormError(getAuthErrorMessage(e, "Update role/permissions failed (super-admin only on API)."));
    } finally {
      setSaving(false);
    }
  }

  const canCreate = can("create admins");
  const canEditRbac = can("edit admins");
  const canView = can("view admins");
  const canChangeStatus = can("change admin status");

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-chat-accent">User management</p>
          <h1 className="mt-1 text-2xl font-semibold leading-tight text-ink-heading sm:text-3xl">
            Admin accounts
          </h1>
        </div>
        {canCreate ? (
          <Button type="button" onClick={openCreate} className="gap-2 shrink-0">
            <Plus className="size-4" />
            New admin
          </Button>
        ) : null}
      </div>

      {!canView ? (
        <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          You may be missing the <span className="font-medium">view admins</span> permission; the list could fail to
          load.
        </div>
      ) : null}

      {error ? (
        <div className="mb-4 rounded-lg border border-tint-red/40 bg-tint-red/10 px-3 py-2 text-sm text-brand-red">
          {error}
        </div>
      ) : null}

      <section className="rounded-2xl border border-border-gray bg-card p-3 shadow-sm sm:p-4 lg:p-6">
        <div className="mb-4 flex flex-col gap-3 border-b border-border-gray pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-soft text-chat-accent">
              <ShieldUser className="size-4" />
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-ink">Administrators</h2>
              <p className="text-sm text-chat-meta">
                {meta ? `${meta.total} total` : loading ? "…" : `${items.length} loaded`}
                {debouncedSearch ? ` · matching “${debouncedSearch}”` : null}
              </p>
            </div>
          </div>
          <div className="relative w-full sm:max-w-xs sm:shrink-0">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-chat-meta"
              aria-hidden
            />
            <Input
              type="search"
              placeholder="Search name, email, phone…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9"
              aria-label="Search administrators"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="border-b border-border-gray">
                <th className="px-2 py-2 text-left text-xs font-semibold text-body-secondary sm:px-4 sm:py-3 sm:text-sm">
                  Name
                </th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-body-secondary sm:px-4 sm:py-3 sm:text-sm">
                  Email
                </th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-body-secondary sm:px-4 sm:py-3 sm:text-sm">
                  Phone
                </th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-body-secondary sm:px-4 sm:py-3 sm:text-sm">
                  Status
                </th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-body-secondary sm:px-4 sm:py-3 sm:text-sm">
                  Role
                </th>
                <th className="px-2 py-2 text-right text-xs font-semibold text-body-secondary sm:px-4 sm:py-3 sm:text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center">
                    <Loader2 className="mx-auto size-6 animate-spin text-chat-accent" />
                  </td>
                </tr>
              ) : null}
              {!loading &&
                items.map((row) => (
                  <tr key={row.id} className="border-b border-border-light">
                    <td className="px-2 py-3 text-sm font-medium text-ink sm:px-4 sm:py-4">{displayName(row)}</td>
                    <td className="px-2 py-3 text-sm text-body-secondary sm:px-4 sm:py-4">{row.email}</td>
                    <td className="px-2 py-3 text-sm text-body-secondary sm:px-4 sm:py-4">
                      {row.phone?.trim() ? row.phone : "—"}
                    </td>
                    <td className="px-2 py-3 text-sm sm:px-4 sm:py-4">
                      <AdminStatusControl
                        value={(row.status ?? "pending") as AdminAccountStatus}
                        readOnly={
                          !canChangeStatus ||
                          isActorRow(row) ||
                          (rowHasSuperAdminRole(row) && !hasRole("super-admin"))
                        }
                        disabled={statusSavingId === row.id}
                        ariaLabel={`Status for ${displayName(row)}`}
                        onChange={(next) => void handleStatusChange(row, next)}
                      />
                    </td>
                    <td className="px-2 py-3 text-sm text-body-secondary sm:px-4 sm:py-4">{roleLabel(row)}</td>
                    <td className="px-2 py-3 sm:px-4 sm:py-4">
                      <div className="flex justify-end">
                        {canEditRbac ? (
                          <button
                            type="button"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted"
                            title="Role & permissions"
                            onClick={() => openRbac(row)}
                          >
                            <Pencil className="size-4 text-body-secondary" />
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              {!loading && items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-chat-meta">
                    No admins returned.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        {meta && meta.total > perPage ? (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border-gray pt-4">
            <p className="text-xs text-chat-meta">
              Page {meta.current_page} of {meta.last_page} ({meta.per_page} per page)
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={page <= 1 || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="size-4" />
                Prev
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={page >= meta.last_page || loading}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        ) : null}
      </section>

      {createOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
          onClick={() => (saving ? null : setCreateOpen(false))}
          role="presentation"
        >
          <div
            className="relative flex max-h-[min(92dvh,760px)] w-full max-w-lg flex-col rounded-2xl bg-card shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between border-b border-border-gray px-5 py-4">
              <h2 className="text-lg font-semibold text-ink">New admin</h2>
              <button
                type="button"
                disabled={saving}
                className="inline-flex size-9 items-center justify-center rounded-lg text-body-secondary hover:bg-muted"
                onClick={() => setCreateOpen(false)}
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto px-5 py-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-ink" htmlFor="adm-fn">
                    First name
                  </label>
                  <Input id="adm-fn" value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={saving} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-ink" htmlFor="adm-ln">
                    Last name
                  </label>
                  <Input id="adm-ln" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={saving} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="adm-em">
                  Email
                </label>
                <Input
                  id="adm-em"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={saving}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="adm-ph">
                  Phone <span className="font-normal text-chat-meta">(optional)</span>
                </label>
                <Input id="adm-ph" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={saving} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="adm-pw">
                  Password
                </label>
                <Input
                  id="adm-pw"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={saving}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="adm-role">
                  Spatie role
                </label>
                <select
                  id="adm-role"
                  value={createRole}
                  onChange={(e) => setCreateRole(e.target.value)}
                  disabled={saving}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                >
                  {spatieRoles.length === 0 ? <option value="">— add roles in API first —</option> : null}
                  {spatieRoles.map((r) => (
                    <option key={r.id} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="rounded-lg bg-muted/60 px-3 py-2 text-xs text-body-secondary">
                New admins start as <strong className="text-ink">Pending</strong> with email unverified. They become{" "}
                <strong className="text-ink">Active</strong> after OTP verification, or immediately if you set status to
                Active in the list (which also marks email verified).
              </p>

              <div>
                <p className="mb-2 text-sm font-medium text-ink">
                  Permissions <span className="font-normal text-chat-meta">(optional)</span>
                </p>
                <div className="max-h-[min(40vh,280px)] space-y-3 overflow-y-auto rounded-xl border border-border-gray p-3">
                  {[...grouped.entries()].map(([resource, plist]) => (
                    <div key={resource}>
                      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-chat-meta">{resource}</p>
                      <ul className="grid gap-1.5 sm:grid-cols-2">
                        {plist.map((p) => (
                          <li key={p.id}>
                            <label className="flex cursor-pointer items-start gap-2 rounded-lg px-2 py-1 text-sm hover:bg-muted">
                              <input
                                type="checkbox"
                                className="mt-0.5 size-4 rounded border-border-gray"
                                checked={createPermNames.has(p.name)}
                                onChange={() => toggleCreatePerm(p.name)}
                                disabled={saving}
                              />
                              <span>{p.name}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {formError ? (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {formError}
                </div>
              ) : null}
            </div>

            <div className="flex justify-end gap-2 border-t border-border-gray px-5 py-4">
              <Button type="button" variant="outline" disabled={saving} onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="button" disabled={saving} onClick={() => void submitCreate()} className="min-w-[100px]">
                {saving ? <Loader2 className="size-4 animate-spin" /> : "Create"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {rbacOpen && rbacTarget ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
          onClick={() => (saving ? null : setRbacOpen(false))}
          role="presentation"
        >
          <div
            className="relative flex max-h-[min(92dvh,760px)] w-full max-w-lg flex-col rounded-2xl bg-card shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between border-b border-border-gray px-5 py-4">
              <h2 className="text-lg font-semibold text-ink">Role &amp; permissions</h2>
              <button
                type="button"
                disabled={saving}
                className="inline-flex size-9 items-center justify-center rounded-lg text-body-secondary hover:bg-muted"
                onClick={() => setRbacOpen(false)}
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto px-5 py-4">
              <p className="text-sm text-body-secondary">
                <span className="font-medium text-ink">{displayName(rbacTarget)}</span> —{" "}
                <code className="text-xs">PUT /admin/admins/{rbacTarget.id}/role-permissions</code>
              </p>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-ink" htmlFor="rbac-role">
                  Role
                </label>
                <select
                  id="rbac-role"
                  value={rbacRole}
                  onChange={(e) => setRbacRole(e.target.value)}
                  disabled={saving}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                >
                  {rbacRole && !spatieRoles.some((r) => r.name === rbacRole) ? (
                    <option value={rbacRole}>{rbacRole}</option>
                  ) : null}
                  {spatieRoles.map((r) => (
                    <option key={r.id} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-ink">Permissions</p>
                <p className="mb-2 text-xs text-chat-meta">Leave unchecked to sync role only (omit permissions array).</p>
                <div className="max-h-[min(40vh,280px)] space-y-3 overflow-y-auto rounded-xl border border-border-gray p-3">
                  {[...grouped.entries()].map(([resource, plist]) => (
                    <div key={resource}>
                      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-chat-meta">{resource}</p>
                      <ul className="grid gap-1.5 sm:grid-cols-2">
                        {plist.map((p) => (
                          <li key={p.id}>
                            <label className="flex cursor-pointer items-start gap-2 rounded-lg px-2 py-1 text-sm hover:bg-muted">
                              <input
                                type="checkbox"
                                className="mt-0.5 size-4 rounded border-border-gray"
                                checked={rbacPermNames.has(p.name)}
                                onChange={() => toggleRbacPerm(p.name)}
                                disabled={saving}
                              />
                              <span>{p.name}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              {formError ? (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {formError}
                </div>
              ) : null}
            </div>

            <div className="flex justify-end gap-2 border-t border-border-gray px-5 py-4">
              <Button type="button" variant="outline" disabled={saving} onClick={() => setRbacOpen(false)}>
                Cancel
              </Button>
              <Button type="button" disabled={saving} onClick={() => void submitRbac()} className="min-w-[100px]">
                {saving ? <Loader2 className="size-4 animate-spin" /> : "Save"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
