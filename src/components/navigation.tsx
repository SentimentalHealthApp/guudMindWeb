import Link from "next/link";
import { uid, auth, db, firebase } from "@/firebase/config";

export default function Navigation() {
  console.log(uid);

  const handleSignOut = async () => {
    try {
      await auth.signOut(); // Perform Firebase sign-out operation
      console.log("User signed out"); // Optional: Log success message
    } catch (error) {
      console.error("Error signing out:", error); // Log any errors
    }
  };
  return (
    <nav className=" text-white p-4 flex justify-end w-full">
      <div className="w-full md:w-1/2 flex justify-around">
        <Link href="/" className="hover:underline font-bold">
          Home
        </Link>

        <Link href="/support" className="hover:underline font-bold">
          Support
        </Link>
        <Link href="/privacy-policy" className="hover:underline font-bold">
          Privacy Policy
        </Link>

        {!uid ? (
          <>
            <Link href="/auth/login" className="hover:underline font-bold">
              Login
            </Link>
            <Link href="/auth/signup" className="hover:underline font-bold">
              Sign Up
            </Link>
          </>
        ) : (
          <Link
            href="/"
            onClick={handleSignOut}
            className="hover:underline font-bold"
          >
            Sign Out
          </Link>
        )}
      </div>
    </nav>
  );
}
