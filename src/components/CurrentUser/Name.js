import { useAuth0 } from "@auth0/auth0-react";

const Name = () => {
  const { user } = useAuth0();

  return user ? user.name : "Not logged in";
};

export default Name;
