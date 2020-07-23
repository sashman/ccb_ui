import { useAuth0 } from "@auth0/auth0-react";

const Email = () => {
  const { user, isAuthenticated } = useAuth0();

  return isAuthenticated ? user.email : "Not logged in";
};

export default Email;
