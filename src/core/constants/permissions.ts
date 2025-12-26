export const PERMISSIONS = [
  {
    name: "Admin",
    value: "admin",
    actions: [
      { name: "Crear", value: "admin-create" },
      { name: "Editar contraseña", value: "admin-update-password" },
      { name: "Editar", value: "admin-update" },
      { name: "Eliminar", value: "admin-delete" },
      { name: "Eliminar permanente", value: "admin-delete-hard" },
      { name: "Estadisticas", value: "admin-stats" },
      { name: "Restaurar", value: "admin-restore" },
      { name: "Ver", value: "admin-view" },
    ],
  },
  {
    name: "Configuraciones",
    value: "settings",
    actions: [
      { name: "Crear", value: "settings-create" },
      { name: "Editar", value: "settings-update" },
      { name: "Eliminar permanente", value: "settings-delete-hard" },
      { name: "Ver", value: "settings-view" },
    ],
  },
  {
    name: "Permisos",
    value: "permissions",
    actions: [
      { name: "Crear", value: "permissions-create" },
      { name: "Editar", value: "permissions-update" },
      { name: "Eliminar", value: "permissions-delete" },
      { name: "Eliminar permanente", value: "permissions-delete-hard" },
      { name: "Estadisticas", value: "permissions-stats" },
      { name: "Restaurar", value: "permissions-restore" },
      { name: "Ver", value: "permissions-view" },
    ],
  },
  {
    name: "Roles",
    value: "roles",
    actions: [
      { name: "Crear", value: "roles-create" },
      { name: "Editar", value: "roles-update" },
      { name: "Eliminar", value: "roles-delete" },
      { name: "Eliminar permanente", value: "roles-delete-hard" },
      { name: "Restaurar", value: "roles-restore" },
      { name: "Ver", value: "roles-view" },
    ],
  },
];
