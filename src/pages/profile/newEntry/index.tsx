import { useRouter } from "next/router";
import { useState } from "react";
import { uid, auth, db, firebase } from "@/firebase/config";
import { getFunctions, httpsCallable } from "firebase/functions";

export default function NewEntry() {
  const router = useRouter();
  const userRef = db.collection("users").doc(uid);
  const functions = getFunctions();

  const [journalData, setJournalData] = useState({
    title: "",
    entry: "",
    prompted: false,
  });

  const [loading, setLoading] = useState(false);
  const [entryAnalyzed, setEntryAnalyzed] = useState(false);
  const [results, setResults] = useState([]);
  const [affirmation, setAffirmation] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJournalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateJournalStreak = async () => {
    try {
      const journalRef = db
        .collection("userEntries")
        .doc(uid)
        .collection("userEntries");

      const lastJournalQuery = journalRef.orderBy("created", "desc").limit(2);

      const snapshot = await lastJournalQuery.get();

      if (snapshot.docs.length < 2) {
        // first check in to initialize streak
        await userRef.update({
          currentStreak: 1,
        });
        return;
      }

      const lastJournalDoc = snapshot.docs[1];
      const lastJournal = lastJournalDoc.data().created.toDate();

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const lastJournalDate = new Date(lastJournal);
      lastJournalDate.setHours(0, 0, 0, 0);

      const diffDays = (today - lastJournalDate) / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        // If last check-in was yesterday, increment streak
        await userRef.update({
          currentStreak: firebase.firestore.FieldValue.increment(1),
        });
      } else if (diffDays > 1) {
        // If last check-in was more than one day ago, reset currentStreak
        await userRef.update({
          currentStreak: 1,
        });
      }
    } catch (error) {
      console.error("Error handling check-on: ", error);
    }
  };

  const submitJournalEntry = async (
    journalData: object,
    uid: string,
    type: string
  ) => {
    try {
      const addJournalEntry = httpsCallable(functions, "addJournalEntry");
      if (typeof journalData !== undefined) {
        const result = await addJournalEntry({
          journalData,
          uid,
          type,
        });
        return result;
      }
    } catch (error) {
      console.log("Error submitting:", error);
    }
  };

  const handleSave = async () => {
    // Logic to save new entry
    console.log("Title:", journalData.title);
    console.log("Entry:", journalData.entry);

    setLoading(true);
    const response = await submitJournalEntry(journalData, uid, "analyzed");

    const analyzedData = response.data.response;
    const affirmationResponse = response.data.affirmation;
    setResults(analyzedData);
    setAffirmation(affirmationResponse);
    // update journal streak
    await updateJournalStreak();
    setLoading(false);
    setEntryAnalyzed(true);
  };

  //   console.log(uid);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      {!loading && !entryAnalyzed && (
        <>
          <h1 className="text-3xl mb-8">NEW ENTRY PAGE</h1>

          <input
            type="text"
            name="title"
            value={journalData.title}
            onChange={handleInputChange}
            placeholder="Enter Title"
            className="border border-gray-400 rounded-md p-2 mb-4 w-full text-black"
          />

          <textarea
            name="entry"
            value={journalData.entry}
            onChange={handleInputChange}
            placeholder="Write your journal entry here..."
            rows="10"
            className="border border-gray-400 rounded-md p-2 w-full text-black"
          />

          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
          >
            Save Entry
          </button>
        </>
      )}
      {loading && <div>Loading</div>}
      {!loading && entryAnalyzed && (
        <div>
          {results.map((mood, index) => {
            return <div key={index}>{mood.mood} </div>;
          })}

          <button
            onClick={() => {
              router.push("/profile/home"); // Replace with your desired route
            }}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
