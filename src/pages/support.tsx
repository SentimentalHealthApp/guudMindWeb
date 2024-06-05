import Navigation from "@/components/navigation";

export default function Support() {
  const contactEmail = "admin@guudmind.com";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-t from-purple-700 to-black">
      <Navigation />
      <div className="mt-8 px-4 text-center flex justify-center flex-col">
        <h1 className="text-3xl font-bold mb-4">Support</h1>
        <p className="text-lg mb-8">
          For any inquiries or assistance, please contact us at:
        </p>
        <a
          href={`mailto:${contactEmail}`}
          className="text-white font-bold underline"
        >
          {contactEmail}
        </a>
      </div>
    </div>
  );
}
