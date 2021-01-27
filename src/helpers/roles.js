export default {
  SUPERUSER: "Superuser",
  getRoles: (user) => user.groups,
  hasRole: (user, role) => user.groups.includes(role),
};
