// pages/privacy-policy.js
import Navigation from "@/components/navigation";
import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-t from-purple-700 to-black">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold  mb-4">Privacy Policy</h1>

        <p className=" mb-6">
          At GUUDMIND, we prioritize the privacy and security of our users'
          personal information. This Privacy Policy outlines the types of
          information we collect, how we use it, and the measures we take to
          protect it.
        </p>

        <div className=" shadow-sm rounded-md p-4 mb-8">
          <h2 className="text-xl font-semibold  mb-4">
            1. Information We Collect
          </h2>
          <ol className="list-decimal pl-5">
            <li className=" mb-2">
              Personal Information: When you create an account with GUUDMIND, we
              may collect personal information such as your name, email address,
              and profile picture.
            </li>
            <li className=" mb-2">
              Journal Entries: When you use our journaling feature, we collect
              the content of your entries to provide you with the journaling
              service.
            </li>
            <li className=" mb-2">
              Usage Data: We collect information about how you interact with the
              app, such as the features you use, the frequency of use, and error
              logs.
            </li>
          </ol>
          <h2 className="text-xl font-semibold  mb-4">
            2. How We Use Your Information
          </h2>
          <ol className="list-decimal pl-5">
            <li className=" mb-2">
              Providing Services: We use the information we collect to deliver
              and improve our services, including journaling and voice chat
              features.
            </li>
            <li className=" mb-2">
              Communication: We may use your contact information to send you
              important updates, announcements, and notifications related to our
              services.
            </li>
            <li className=" mb-2">
              Personalization: We may use your usage data to personalize your
              experience within the app, such as recommending journaling prompts
              or connecting you with like-minded users for voice chats.
            </li>
            <li className=" mb-2">
              Analytics: We use aggregated and anonymized data for analytical
              purposes to better understand how our users interact with the app
              and to improve its functionality.
            </li>
          </ol>
          <h2 className="text-xl font-semibold  mb-4">3. Data Security</h2>

          <ol className="list-decimal pl-5">
            <li className=" mb-2">
              Encryption: We employ industry-standard encryption protocols to
              protect your personal information during transmission and storage.
            </li>
            <li className=" mb-2">
              Access Controls: Access to your personal information is restricted
              to authorized personnel who require it to perform their duties.
            </li>
            <li className=" mb-2">
              Data Retention: We retain your personal information only for as
              long as necessary to fulfill the purposes outlined in this Privacy
              Policy or as required by law.
            </li>
          </ol>

          <h2 className="text-xl font-semibold  mb-4">
            4. Sharing of Information
          </h2>
          <ol className="list-decimal pl-5">
            <li className=" mb-2">
              Third Parties: We do not sell, trade, or rent your personal
              information to third parties. However, we may share your
              information with service providers who assist us in delivering our
              services, subject to confidentiality obligations.
            </li>
            <li className=" mb-2">
              Legal Compliance: We may disclose your information if required to
              do so by law or in response to valid legal requests, such as court
              orders or subpoenas.
            </li>
          </ol>

          <h2 className="text-xl font-semibold  mb-4">5. Your Rights</h2>
          <ol className="list-decimal pl-5">
            <li className=" mb-2">
              Access and Correction: You have the right to access and correct
              your personal information stored in our systems. You can do so by
              accessing your account settings within the app.
            </li>
            <li className=" mb-2">
              Opt-Out: You can opt-out of receiving promotional emails or
              notifications from us by adjusting your notification preferences
              within the app.
            </li>
          </ol>
          <h2 className="text-xl font-semibold  mb-4">6. Children's Privacy</h2>
          <ol className="list-decimal pl-5">
            <li className=" mb-2">
              GUUDMIND is not intended for use by children under the age of 13.
              We do not knowingly collect personal information from children
              under 13. If you are a parent or guardian and believe that your
              child has provided us with personal information, please contact us
              immediately.
            </li>
          </ol>
          <h2 className="text-xl font-semibold  mb-4">
            7. Changes to this Privacy Policy
          </h2>
          <ol className="list-decimal pl-5">
            <li className=" mb-2">
              We reserve the right to update or modify this Privacy Policy at
              any time. Any changes will be effective immediately upon posting
              the revised Privacy Policy within the app. Your continued use of
              GUUDMIND after any such changes constitutes your acceptance of the
              updated Privacy Policy.
            </li>
          </ol>
          <h2 className="text-xl font-semibold  mb-4">8. Contact Us</h2>
          <ol className="list-decimal pl-5">
            <li className=" mb-2">
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us at admin@gmail.com.
            </li>
          </ol>
        </div>

        {/* Add more sections for other parts of the privacy policy */}

        <footer className="text-center">
          <p>Effective Date: 05/06/2024</p>
          <p>
            Contact Us:{" "}
            <a
              href="mailto:contact@example.com"
              className="text-white font-bold underline"
            >
              admin@guudmind.com
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
