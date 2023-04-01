import React from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserProfileDocument,
} from "../../utils/firebase/firebase.utils";

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
        <label htmlFor={`${id}-display-name`}>Display Name</label>
        <input
          required
          type="text"
          name="displayName"
          id={`${id}-display-name`}
          value={displayName}
          onChange={handleChange}
        />

        <label htmlFor={`${id}-email`}>Email</label>
        <input
          required
          type="email"
          name="email"
          id={`${id}-email`}
          value={email}
          onChange={handleChange}
        />

        <label htmlFor={`${id}-password`}>Password</label>
        <input
          required
          type="password"
          name="password"
          id={`${id}-password`}
          value={password}
          onChange={handleChange}
        />

        <label htmlFor={`${id}-confirm-password`}>Confirm Password</label>
        <input
          required
          type="password"
          name="confirmPassword"
          id={`${id}-confirm-password`}
          value={confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
