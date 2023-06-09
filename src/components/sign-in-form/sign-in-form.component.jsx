import React from "react";
import { useDispatch } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.slice";
import Button, { BUTTON_TYPE_CLASS } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";

export const defaultFormValue = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = React.useState(defaultFormValue);
  const { email, password } = formValue;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  function handleSignInWithGoogle() {
    dispatch(googleSignInStart());
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      dispatch(emailSignInStart({ email, password }));
      resetFormValue();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  }

  function resetFormValue() {
    setFormValue(defaultFormValue);
  }

  return (
    <div className="sign-in-form-container">
      <h2>Signin with email and password</h2>

      <form onSubmit={handleSubmit}>
        <FormInput
          required
          type="email"
          name="email"
          label="Email"
          value={email}
          onChange={handleChange}
        />

        <FormInput
          required
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={handleChange}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.google}
            onClick={handleSignInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
