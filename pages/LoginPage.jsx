import { auth, firestore, googleAuthProvider } from '../lib/firebase'
export default function LoginPage({ }) {
  return (
    <main>
        <SignInButton/>
    </main>
  )
}
function SignInButton(){
    async function signInWithGoogle(){
      await auth.signInWithPopup(googleAuthProvider);
    };
    return(
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    )
  }