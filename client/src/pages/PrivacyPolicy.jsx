import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#f7f6f4] py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 sm:px-10">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1a1a1a]">Privacy Notice</h1>
          <p className="mt-2 text-sm text-[#5a6d78]">Zogo</p>
          <p className="mt-2 text-sm text-[#5a6d78]">Internet Cafe Complaint and Feedback System</p>
          <p className="mt-4 text-sm text-[#5a6d78]">Effective Date: June 13, 2026</p>
          <p className="text-sm text-[#5a6d78]">Last Updated: June 13, 2026</p>
        </div>

        <article className="bg-white border border-[#e6e2da] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] px-5 sm:px-8 py-6 sm:py-10 text-[#1a1a1a]">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
              This Privacy Notice explains how Zogo Services collects, uses, stores, protects, and manages personal information through Zogo, our online Internet Cafe Complaint and Feedback System.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              We value your privacy and are committed to protecting your personal information in accordance with applicable data privacy laws, including the Data Privacy Act of 2012 of the Philippines. The Data Privacy Act protects the privacy of individuals while allowing the responsible flow of information for legitimate purposes.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              By using this system, you understand and agree that your personal information may be collected and processed for complaint handling, feedback management, communication, documentation, and internet cafe management purposes.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">2. Personal Information We Collect</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>When you use the system, we may collect the following information:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Full name</li>
                <li>Email address</li>
                <li>Contact number</li>
                <li>PC station number, room number, or workstation location</li>
                <li>Username and password</li>
                <li>Complaint or feedback details</li>
                <li>Category of concern</li>
                <li>Date, time, and location of the reported issue</li>
                <li>Uploaded images, screenshots, documents, or evidence</li>
                <li>Status updates, replies, and administrator remarks</li>
                <li>System activity, such as login records, submission timestamps, and complaint history</li>
              </ul>
              <p>
                If anonymous reporting is enabled, we may allow users to submit complaints without displaying their identity to administrators or staff. However, the system may still collect limited technical or submission-related information needed for security, audit, or abuse prevention.
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">3. Sensitive Personal Information</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
              Users should avoid submitting sensitive personal information unless it is necessary for the complaint or feedback.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              Sensitive personal information may include details about a person&apos;s age, marital status, health, religion, ethnicity, government-issued IDs, or similar protected information. The National Privacy Commission&apos;s guide explains that sensitive personal information includes details such as race, ethnic origin, marital status, age, color, and religious, philosophical, or political affiliations.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              Please do not upload or submit sensitive information about yourself or another person unless it is directly relevant to the complaint.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">4. Why We Collect Your Information</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>We collect and use personal information for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>To receive and record complaints, concerns, reports, and feedback</li>
                <li>To verify and review submitted complaints</li>
                <li>To contact users for clarification or updates</li>
                <li>To assign complaints to authorized internet cafe staff</li>
                <li>To monitor the progress and status of complaints</li>
                <li>To resolve hardware, network, facility, or service concerns</li>
                <li>To prevent false, abusive, spam, or harmful submissions</li>
                <li>To maintain records for documentation and accountability</li>
                <li>To improve internet cafe services and system performance</li>
                <li>To comply with legal, regulatory, or administrative requirements</li>
              </ul>
              <p>We only collect information that is necessary for the proper operation of the complaint and feedback system.</p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">5. How We Use Your Information</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>              Your personal information may be used by authorized administrators or internet cafe staff to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Review your complaint or feedback</li>
                <li>Respond to your concern</li>
                <li>Update the status of your complaint</li>
                <li>Contact you if more details are needed</li>
                <li>Investigate reported issues</li>
                <li>Coordinate with maintenance, security, or management personnel</li>
                <li>Generate reports for service improvement</li>
                <li>Protect the system from misuse or unauthorized access</li>
              </ul>
              <p>Your information will not be used for unrelated purposes without proper notice or lawful basis.</p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">6. Who Can Access Your Information</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>Access to personal information is limited to authorized users only, such as:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>System administrators</li>
                <li>Internet cafe managers</li>
                <li>Assigned technical support personnel</li>
                <li>Internet cafe staff, when relevant</li>
                <li>Authorized members of the development or technical support team</li>
                <li>Other authorized personnel necessary for resolving the complaint</li>
              </ul>
              <p>Only the information needed to perform their assigned duties will be made available to authorized personnel.</p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">7. Sharing of Information</h2>
            <p className="text-sm text-[#5a6d78] leading-7">We do not sell your personal information.</p>
            <p className="text-sm text-[#5a6d78] leading-7">
              Your information may only be shared when necessary, such as:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[#5a6d78] leading-7">
              <li>When needed to resolve a complaint</li>
              <li>When required by internet cafe management procedures</li>
              <li>When required by law, regulation, court order, or lawful government request</li>
              <li>When needed to protect the rights, safety, or security of users, customers, staff, or the internet cafe</li>
              <li>When technical service providers help operate or maintain the system</li>
            </ul>
            <p className="text-sm text-[#5a6d78] leading-7">
              If third-party service providers are used, they are expected to handle personal information securely and only for authorized purposes.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">8. Anonymous Complaints and Feedback</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
              The system may allow anonymous submissions.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              If you submit anonymously, your identity may not be shown in the complaint record. However, anonymous reports should still be truthful, respectful, and complete.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              Please understand that anonymous complaints may be harder to investigate or resolve, especially if the report lacks important details or evidence.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              Anonymous reporting must not be used to harass, threaten, falsely accuse, or damage the reputation of another person.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">9. Uploaded Files and Evidence</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
              Users may upload images, screenshots, documents, or other supporting files.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              Uploaded files must be related to the complaint or feedback. Users should avoid uploading images or documents that unnecessarily reveal another person&apos;s private information.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              The National Privacy Commission has reminded the public to be responsible when sharing photos and videos containing personal data.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              We may remove uploaded files that are irrelevant, inappropriate, harmful, misleading, or privacy-invasive.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">10. Data Storage and Retention</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
              Personal information and complaint records will be stored only for as long as necessary for complaint processing, documentation, administrative purposes, legal compliance, or internet cafe management records.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              Records may be deleted, archived, or anonymized when they are no longer needed.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              Suggested retention period for your school project:
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              Complaint and feedback records may be retained for 6 months after resolution, unless a longer period is required for legal, administrative, or internet cafe management purposes.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">11. Data Security</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
              We use reasonable security measures to protect personal information from unauthorized access, loss, misuse, alteration, or disclosure.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              These measures may include:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[#5a6d78] leading-7">
              <li>User authentication</li>
              <li>Password protection</li>
              <li>Role-based access control</li>
              <li>Secure database storage</li>
              <li>Limited administrator access</li>
              <li>Activity logs</li>
              <li>Regular system maintenance</li>
              <li>Secure handling of uploaded files</li>
            </ul>
            <p className="text-sm text-[#5a6d78] leading-7">
              However, no online system is completely risk-free. Users are responsible for protecting their own account credentials and reporting suspicious activity immediately.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">12. User Responsibilities</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
              Users are responsible for making sure that the information they submit is accurate, truthful, and relevant.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">Users should not:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[#5a6d78] leading-7">
              <li>Submit false complaints</li>
              <li>Upload fake or misleading evidence</li>
              <li>Share another person&apos;s private information without valid reason</li>
              <li>Use the system to harass or threaten others</li>
              <li>Share their account password</li>
              <li>Attempt to access another user&apos;s account</li>
              <li>Misuse complaint records or system data</li>
            </ul>
            <p className="text-sm text-[#5a6d78] leading-7">
              Misuse of the system may result in account restriction, complaint rejection, or further administrative action.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">13. Your Rights as a Data Subject</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
              Under the Data Privacy Act, individuals whose personal information is processed are considered data subjects.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              As a data subject, you may have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[#5a6d78] leading-7">
              <li>Be informed about how your personal information is collected and used</li>
              <li>Access your personal information</li>
              <li>Request correction of inaccurate or outdated information</li>
              <li>Object to certain types of processing</li>
              <li>Request deletion or blocking of personal information, when applicable</li>
              <li>File a complaint if you believe your privacy rights have been violated</li>
            </ul>
            <p className="text-sm text-[#5a6d78] leading-7">
              The National Privacy Commission provides information about data subject rights under the Data Privacy Act.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">14. How to Request Access, Correction, or Deletion</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
              If you want to access, correct, update, or request deletion of your personal information, you may contact us through:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[#5a6d78] leading-7">
                <li>Internet Cafe Management: Zogo Services</li>
                <li>Email: <a className="underline text-[#1a1a1a]" href="mailto:zogooff@gmail.com">zogooff@gmail.com</a></li>
                <li>Phone: 0969 4204 676</li>
                <li>Office Address: Bangkok Metro East Ave Philippines</li>
            </ul>
            <p className="text-sm text-[#5a6d78] leading-7">
              We may ask you to verify your identity before processing your request to protect your privacy and prevent unauthorized access.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">15. Cookies and System Logs</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
              The system may use cookies, session data, or system logs to support login sessions, improve security, and monitor system performance.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              System logs may include:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[#5a6d78] leading-7">
              <li>Login time</li>
              <li>Logout time</li>
              <li>IP address</li>
              <li>Browser or device information</li>
              <li>Complaint submission timestamps</li>
              <li>Failed login attempts</li>
            </ul>
            <p className="text-sm text-[#5a6d78] leading-7">
              These logs are used for security, troubleshooting, and system monitoring.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">16. Third-Party Services</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
              The system may use third-party services such as hosting providers, email services, cloud storage, or database platforms.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              These services may process limited information only as necessary to operate the system.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              Examples may include:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[#5a6d78] leading-7">
              <li>Email notification services</li>
              <li>Web hosting services</li>
              <li>Database hosting services</li>
              <li>File storage services</li>
              <li>Analytics or error monitoring tools</li>
            </ul>
            <p className="text-sm text-[#5a6d78] leading-7">
              Third-party services should not use your personal information for their own unrelated purposes.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">17. Children and Minors</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
              This system is intended for authorized users connected to the internet cafe.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              If a minor uses the system, the internet cafe management may require guidance, supervision, or consent from a parent, guardian, or authorized adult, depending on the situation and applicable rules.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">18. Changes to This Privacy Notice</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
              We may update this Privacy Notice when necessary to reflect changes in the system, internet cafe management policies, legal requirements, or data processing activities.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              When major changes are made, users may be notified through the system, email, or official announcement.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              Continued use of the system after changes are posted means you acknowledge the updated Privacy Notice.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">19. Contact Information</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
              For privacy-related questions, requests, or complaints, please contact:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[#5a6d78] leading-7">
                <li>Internet Cafe Management: Zogo Services</li>
              <li>Data Privacy Contact Person: Joe Muthra</li>
              <li>Email: <a className="underline text-[#1a1a1a]" href="mailto:Joe.mama@gmail.com">Joe.mama@gmail.com</a></li>
              <li>Phone: 0967 2456 729</li>
              <li>Office Address: Moskov Russia</li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
