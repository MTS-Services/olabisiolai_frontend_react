export type AuthUser = {
  id: string | number
  name?: string
  email?: string
  role?: string
  roles?: string[]
  /**
   * Spatie `admin` guard permission names (from AdminResource / admin login).
   * Used with `can()` in the admin area. Do not mix with app route role strings.
   */
  permissions?: string[]
  /** Spatie role names assigned to this admin (e.g. super-admin, manager). */
  adminSpatieRoles?: string[]
}

