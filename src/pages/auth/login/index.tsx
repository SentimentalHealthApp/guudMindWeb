import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { uid, auth } from "@/firebase/config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Email:", email);
    console.log("Password:", password);
    const { result, error } = await login(email, password);

    if (error) {
      console.log(error);
    } else {
      console.log(uid);
      router.push("/profile/home");
    }
  };

  const login = async (email, password) => {
    let result = null;
    let error = null;

    try {
      result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      error = e;
    }

    return { result, error };
  };

  return (
    <div
      className={`flex flex-col min-h-screen bg-gradient-to-t from-[#5D5FEF] to-black justify-center items-center`}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80 text-black"
      >
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-3 py-2 border rounded "
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
