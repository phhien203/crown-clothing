import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import { Link } from "react-router-dom";
import "./sign-in.styles.scss";

export default function SignIn() {
  return (
    <div className="sign-in-container">
      <SignInForm />
      <p className="sign-up-link-container">
        Don't have an account?{" "}
        <Link className="sign-up-link" to="/sign-up">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
