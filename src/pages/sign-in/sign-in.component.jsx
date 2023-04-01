import {
  createUserProfileDocument,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

export default function SignIn() {
  async function signInWithGoogle() {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserProfileDocument(user);
    console.log(userDocRef);
  }

  return (
    <div>
      <h1>I'm sign in page</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}
