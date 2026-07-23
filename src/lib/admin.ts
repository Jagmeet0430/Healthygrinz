export function isValidAdminToken(token: string | null) {
  const expected = (process.env.ADMIN_TOKEN || "change-this-admin-password").trim();
  const provided = token?.trim();
  return Boolean(provided && provided === expected);
}
