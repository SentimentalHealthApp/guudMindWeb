import Link from "next/link";

export default function Navigation() {
  return (
    <nav className=" text-white p-4 flex justify-end">
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
        <Link href="/auth/login" className="hover:underline font-bold">
          Login
        </Link>
        <Link href="/signup" className="hover:underline font-bold">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
