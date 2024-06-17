import { useState, useEffect } from "react";
import { uid, auth, db, firebase } from "@/firebase/config";
import { useRouter } from "next/router";

const COLORS = {
  bodyText: "#333333",
  bodyText_2: "#888888",
  purple: "#5D5FEF",
  confirm: "#28A745",
  confirmLight: "#DFF2E1",
  warning: "#FFC107",
  warningLight: "#FFF4E5",
};

export default function HomePage() {
  // set up firebase x
  // make sure the user is logged in first x
  // get all of their journal entries
  // display in journal entry compnent x
  // click to go read the entry
  const [entries, setEntries] = useState();
  const router = useRouter();

  const entriesRef = db
    .collection("journalEntries")
    .doc(uid)
    .collection("userEntries");

  useEffect(() => {
    const getJournalEntries = () => {
      entriesRef.orderBy("created", "desc").onSnapshot((snapshot) => {
        let journalEntries = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          console.log("hellow", data);
          return { id, ...data };
        });
        setEntries(journalEntries);
      });
    };
    getJournalEntries();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={() => router.push("/profile/newEntry")}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 absolute top-4 right-4"
      >
        New Entry
      </button>
      {entries &&
        entries.map((entry, index) => (
          <JournalItem
            key={index}
            entry={entry}
            date={entry.date}
            handleNavigation={() => router.push(`/profile/${entry.id}`)}
          />
        ))}
    </div>
  );
}

const JournalItem = ({ entry, date, handleNavigation }) => {
  const MAX_ENTRY_LENGTH = 50;
  const MAX_TITLE_LENGTH = 25;
  const truncatedEntry =
    entry.entry.length > MAX_ENTRY_LENGTH
      ? entry.entry.substring(0, MAX_ENTRY_LENGTH) + "..."
      : entry.entry + "...";

  const truncatedTitle =
    entry.title.length > MAX_TITLE_LENGTH
      ? entry.title.substring(0, MAX_TITLE_LENGTH) + "..."
      : entry.title.trimStart() + "-";

  const previewMoods = entry.response?.slice(0, 3);

  let moodCount;
  if (entry.response) {
    moodCount = entry.response.length;
  } else {
    moodCount = 0;
  }

  const formatDate = (item) => {
    const timestamp = new firebase.firestore.Timestamp(
      item.created.seconds,
      item.created.nanoseconds
    );
    const date = timestamp.toDate();
    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;

    return formattedDate;
  };

  return (
    <button
      onClick={handleNavigation}
      className="w-1/2 p-2 my-1 flex items-center justify-center bg-white rounded-2xl border border-purple-500 shadow"
    >
      <div className="w-1 h-20 bg-purple-500 mr-2 shadow"></div>
      <div className="flex flex-col justify-center h-full w-full">
        <div className="flex justify-between items-center w-full">
          <div className="w-4/5">
            <h2 className="text-sm font-bold text-gray-800">
              {truncatedTitle}
            </h2>
          </div>
          {/* <p className="text-xs font-medium text-gray-500">
            {formatDate(date)}
          </p> */}
        </div>
        <div className="flex my-1">
          {previewMoods?.map((response, index) => {
            const { mood, positive } = response;
            return (
              <div
                key={index}
                className={`mr-1 p-1 rounded ${
                  positive ? "bg-green-100" : "bg-yellow-100"
                } flex justify-center items-center`}
              >
                <p
                  className={`text-xs ${
                    positive ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {mood}
                </p>
              </div>
            );
          })}
        </div>
        <p className="text-sm text-gray-800">{truncatedEntry.trimStart()}</p>
      </div>
    </button>
  );
};
