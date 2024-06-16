import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db, uid } from "@/firebase/config";
import { useAuthContext } from "@/context/ContextProvider";
export default function EntryView() {
  const [entry, setEntry] = useState();
  const router = useRouter();
  const { entryId } = router.query;
  console.log(entryId);
  const entryRef = db
    .collection("journalEntries")
    .doc(uid)
    .collection("userEntries")
    .doc(entryId);

  const getDocumentReference = async () => {
    try {
      const doc = await entryRef.get();

      if (doc.exists) {
        const data = doc.data();

        const documentEntry = { entry, ...data };
        setEntry(documentEntry);
        return documentEntry; // Optionally return the document snapshot or data
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error getting document:", error);
      return null;
    }
  };

  useEffect(() => {
    getDocumentReference();
  }, []);

  if (entry) {
    console.log(entry);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4">
      <h1 className="text-3xl mb-4">Display Entry</h1>
      {entry ? (
        <div className=" p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold">{entry.title}</h2>
          {/* <p className="text-sm text-gray-500 mb-2">Date: {entry.date}</p> */}
          <p className="text-sm mb-2">{entry.entry}</p>
          {/* Render other entry details as needed */}
        </div>
      ) : (
        <p>Loading entry...</p>
      )}{" "}
    </div>
  );
}
