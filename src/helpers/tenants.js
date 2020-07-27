export default {
  hasTenant: (user) => {
    return !!user_metadata(user).tenant;
  },
  getTenantFromUser: (user) => {
    return user && user_metadata(user) && user_metadata(user).tenant;
  },
};

const user_metadata = (user) => user["http://ccb.com/user_metadata"];
