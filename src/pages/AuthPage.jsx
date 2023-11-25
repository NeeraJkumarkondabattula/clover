import React from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const AuthPage = ({ type }) => {
  return <>{type == "sign-in" ? <SignIn /> : <SignUp />}</>;
};

export default AuthPage;
