import { useState } from "react";
import FormInput from "./FormInput";
import CustomButton from "./CustomButton";
import { auth, signInWithGoogle } from "../firebase/utils";
import { useNavigate } from "react-router-dom";

import "./SignIn.scss";

function SignIn() {
  const [emailAndPassword, setEmailAndPassword] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(
        emailAndPassword.email,
        emailAndPassword.password
      );
      setEmailAndPassword({ email: "", password: "" });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = e => {
    setEmailAndPassword({
      ...emailAndPassword,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={emailAndPassword.email}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={emailAndPassword.password}
          handleChange={handleChange}
          label="password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign in</CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn type="button">
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
