import { api } from "@/api/client";
import { unwrapLaravelData } from "@/api/laravelResponse";
import { env } from "@/config/env";

function apiBaseAlreadyIncludesV1(): boolean {
  const base = env.apiBaseUrl.replace(/\/+$/, "").toLowerCase();
  return base.endsWith("/v1");
}

/** `/admin/admins` or with `/v1` prefix when base URL is only `/api`. */
function adminAdminsBasePaths(): string[] {
  const primary = "/admin/admins";
  if (apiBaseAlreadyIncludesV1()) return [primary];
  return [primary, `/v1/admin/admins`];
}

function toRecord(v: unknown): Record<string, unknown> | null {
  if (!v || typeof v !== "object") return null;
  return v as Record<string, unknown>;
}

export type StaffAdminRow = {
  id: number;
  first_name?: string;
  last_name?: string;
  name?: string;
  email: string;
  phone?: string;
  status?: string;
  /** Spatie role name(s) when API sends them */
  roles?: string[];
  role?: string;
  /** Direct permission names when API includes them on the resource */
  permissions?: string[];
};

export type AdminListMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type CreateStaffAdminPayload = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
  status?: string;
  permissions?: string[];
};

export type UpdateAdminRolePermissionsPayload = {
  role: string;
  permissions?: string[];
};

/** Matches Laravel `AdminStatus` enum values */
export type AdminAccountStatus = "active" | "pending" | "block";

export type UpdateAdminStatusPayload = {
  status: AdminAccountStatus;
};

function mapStaffAdmin(raw: unknown, index: number): StaffAdminRow {
  const o = toRecord(raw) ?? {};
  const id = typeof o.id === "number" ? o.id : index + 1;
  const rolesRaw = o.roles;
  let roles: string[] | undefined;
  if (Array.isArray(rolesRaw)) {
    roles = rolesRaw.map((r) => {
      if (typeof r === "string") return r;
      const rr = toRecord(r);
      return typeof rr?.name === "string" ? rr.name : String(r);
    });
  }
  const permRaw = o.permissions;
  let permissions: string[] | undefined;
  if (Array.isArray(permRaw)) {
    permissions = permRaw
      .map((p) => {
        if (typeof p === "string") return p;
        const pr = toRecord(p);
        return typeof pr?.name === "string" ? pr.name : "";
      })
      .filter(Boolean);
  }

  return {
    id,
    first_name: typeof o.first_name === "string" ? o.first_name : undefined,
    last_name: typeof o.last_name === "string" ? o.last_name : undefined,
    name: typeof o.name === "string" ? o.name : undefined,
    email: typeof o.email === "string" ? o.email : "",
    phone: typeof o.phone === "string" ? o.phone : undefined,
    status: typeof o.status === "string" ? o.status : undefined,
    roles,
    role: typeof o.role === "string" ? o.role : undefined,
    permissions,
  };
}

function pickAdminList(body: unknown): { items: StaffAdminRow[]; meta: AdminListMeta | null } {
  const root = unwrapLaravelData(body);
  if (Array.isArray(root)) {
    return { items: root.map(mapStaffAdmin), meta: null };
  }
  const rec = toRecord(root);
  if (!rec) return { items: [], meta: null };

  const inner = rec.data;
  if (Array.isArray(inner)) {
    return { items: inner.map(mapStaffAdmin), meta: null };
  }
  const page = toRecord(inner);
  if (page && Array.isArray(page.data)) {
    const meta: AdminListMeta = {
      current_page: typeof page.current_page === "number" ? page.current_page : 1,
      last_page: typeof page.last_page === "number" ? page.last_page : 1,
      per_page: typeof page.per_page === "number" ? page.per_page : page.data.length,
      total: typeof page.total === "number" ? page.total : page.data.length,
    };
    return { items: page.data.map(mapStaffAdmin), meta };
  }

  if (Array.isArray(rec.items)) {
    return { items: rec.items.map(mapStaffAdmin), meta: null };
  }

  return { items: [], meta: null };
}

async function requestWithBasePaths<T>(
  exec: (base: string) => Promise<T>,
): Promise<T> {
  let last: unknown = null;
  for (const base of adminAdminsBasePaths()) {
    try {
      return await exec(base);
    } catch (e) {
      last = e;
    }
  }
  throw last;
}

export async function fetchStaffAdmins(options?: {
  page?: number;
  per_page?: number;
}): Promise<{
  items: StaffAdminRow[];
  meta: AdminListMeta | null;
}> {
  const per_page = options?.per_page ?? 15;
  const params: Record<string, number> = { per_page };
  if (options?.page != null) params.page = options.page;

  return requestWithBasePaths(async (base) => {
    const res = await api.get<unknown>(base, { params });
    return pickAdminList(res.data);
  });
}

export async function createStaffAdmin(payload: CreateStaffAdminPayload): Promise<StaffAdminRow> {
  return requestWithBasePaths(async (base) => {
    const res = await api.post<unknown>(base, payload);
    const row = unwrapLaravelData(res.data);
    return mapStaffAdmin(row ?? res.data, 0);
  });
}

export async function updateAdminRolePermissions(
  id: number,
  payload: UpdateAdminRolePermissionsPayload,
): Promise<unknown> {
  return requestWithBasePaths(async (base) => {
    const res = await api.put<unknown>(`${base}/${id}/role-permissions`, payload);
    return unwrapLaravelData(res.data) ?? res.data;
  });
}

export async function updateAdminStatus(
  id: number,
  payload: UpdateAdminStatusPayload,
): Promise<StaffAdminRow> {
  return requestWithBasePaths(async (base) => {
    const res = await api.put<unknown>(`${base}/${id}/status`, payload);
    const unwrapped = unwrapLaravelData(res.data) ?? res.data;
    const rec = toRecord(unwrapped);
    const adminPayload = rec?.admin ?? unwrapped;
    return mapStaffAdmin(adminPayload, 0);
  });
}

export async function rbacCheckAdmin(
  id: number,
  query: { role?: string; permission?: string },
): Promise<unknown> {
  return requestWithBasePaths(async (base) => {
    const res = await api.get<unknown>(`${base}/${id}/rbac-check`, { params: query });
    return unwrapLaravelData(res.data) ?? res.data;
  });
}
