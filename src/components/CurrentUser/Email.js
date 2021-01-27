import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";

const Email = () => {
  const {
    oktaAuth,
    authState: { isAuthenticated },
  } = useOktaAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const user = await oktaAuth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  console.log(user);

  return isAuthenticated && user ? user.email : "Not logged in";
};

export default Email;
