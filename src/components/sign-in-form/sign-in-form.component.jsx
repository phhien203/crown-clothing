import React from "react";
import { UserContext } from "../../contexts/user.context";
import {
  createUserProfileDocument,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";

export const defaultFormValue = {
  email: "",
  password: "",
};

export default function SignInForm() {
  console.log(`SignInForm`);
  const { setCurrentUser } = React.useContext(UserContext);
  const [formValue, setFormValue] = React.useState(defaultFormValue);
  const { email, password } = formValue;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);
      setCurrentUser(user);
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

  async function signInWithGoogle() {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserProfileDocument(user);
    console.log({ userDocRef });
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
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
