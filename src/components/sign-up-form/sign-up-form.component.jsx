import React from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserProfileDocument,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

export const defaultFormValue = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpFormComponent() {
  const id = React.useId();
  const [formValue, setFormValue] = React.useState(defaultFormValue);
  const { displayName, email, password, confirmPassword } = formValue;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert(`Password and confirm password don't match`);
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });
      resetFormValue();
    } catch (err) {
      console.error(`Error when signing up`, err);
    }
  }

  function resetFormValue() {
    setFormValue(defaultFormValue);
  }

  return (
    <div>
      <h1>Sign up with username and password</h1>

      <form onSubmit={handleSubmit}>
        <FormInput
          required
          type="text"
          name="displayName"
          label="Display Name"
          value={displayName}
          onChange={handleChange}
        />

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

        <FormInput
          required
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          value={confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
