import React from "react";

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

import "./Register.scss";

const RegisterPage = () => (
  <div className="register">
    <SignIn />
    <SignUp />
  </div>
);

export default RegisterPage;
