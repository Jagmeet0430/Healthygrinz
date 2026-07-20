export function isValidAdminToken(token: string | null) {
  const expected = process.env.ADMIN_TOKEN || "change-this-admin-password";
  return Boolean(token && token === expected);
}
