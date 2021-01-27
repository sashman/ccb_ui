import React from "react";
import RegularButton from "components/CustomButtons/Button";

const LoginButton = () => {
  const { loginWithRedirect } = {};

  return (
    <RegularButton onClick={() => loginWithRedirect()}>Log In</RegularButton>
  );
};

export default LoginButton;
