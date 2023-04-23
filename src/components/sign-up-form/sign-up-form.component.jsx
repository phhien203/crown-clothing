import React from "react";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.slice";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";

export const defaultFormValue = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm() {
  const dispatch = useDispatch();
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
      dispatch(signUpStart({ email, password, displayName }));
      resetFormValue();
    } catch (err) {
      console.error(`Error when signing up`, err);
    }
  }

  function resetFormValue() {
    setFormValue(defaultFormValue);
  }

  return (
    <div className="sign-up-form-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with username and password</span>

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

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}
