import { useRouter } from "next/router";
import { useState } from "react";
import { uid, auth, db, firebase } from "@/firebase/config";

export default function NewEntry() {
  const router = useRouter();
  const [journalData, setJournalData] = useState({
    title: "",
    entry: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJournalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Logic to save new entry
    console.log("Title:", journalData.title);
    console.log("Entry:", journalData.entry);
    // Redirect to another page after saving
    router.push("/profile"); // Replace with your desired route
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <h1 className="text-3xl mb-8">NEW ENTRY PAGE</h1>

      {/* Title Input */}
      <input
        type="text"
        name="title"
        value={journalData.title}
        onChange={handleInputChange}
        placeholder="Enter Title"
        className="border border-gray-400 rounded-md p-2 mb-4 w-full"
      />

      {/* Journal Entry Input */}
      <textarea
        name="entry"
        value={journalData.entry}
        onChange={handleInputChange}
        placeholder="Write your journal entry here..."
        rows="10"
        className="border border-gray-400 rounded-md p-2 w-full"
      />

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
      >
        Save Entry
      </button>
    </div>
  );
}
