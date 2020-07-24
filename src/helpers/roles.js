export default {
  SUPERUSER: "superuser",
  getRoles: (user) => user["http://ccb.com/role"],
  hasRole: (user, role) => user["http://ccb.com/role"].includes(role),
};
