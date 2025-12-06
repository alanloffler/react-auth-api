export const ERoles = {
  ADMIN: "admin",
  SUPER: "superadmin",
  TEACHER: "teacher",
} as const;

export type TRole = (typeof ERoles)[keyof typeof ERoles];
