import React from "react";
import { useOktaAuth } from "@okta/okta-react";

const LogoutButton = () => {
  const {
    oktaAuth: { signOut },
  } = useOktaAuth();

  return <button onClick={() => signOut()}>Log Out</button>;
};

export default LogoutButton;
