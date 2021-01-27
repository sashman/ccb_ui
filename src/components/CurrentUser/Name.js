const Name = () => {
  const { user } = {};

  return user ? user.name : "Not logged in";
};

export default Name;
