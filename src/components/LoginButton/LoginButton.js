import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import RegularButton from "components/CustomButtons/Button";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <RegularButton onClick={() => loginWithRedirect()}>Log In</RegularButton>
  );
};

export default LoginButton;
