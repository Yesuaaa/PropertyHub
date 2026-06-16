import React from 'react';

const SoftwareIssue = () => {
  return (
    <div className="min-h-screen bg-[#f7f6f4] py-16">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1a1a1a]">Software Issue</h1>
          <p className="mt-2 text-sm text-[#5a6d78]">Zogo</p>
          <p className="mt-2 text-sm text-[#5a6d78]">Internet Cafe Complaint and Feedback System</p>
          <p className="mt-4 text-sm text-[#5a6d78]">Effective Date: June 13, 2026</p>
          <p className="text-sm text-[#5a6d78]">Last Updated: June 13, 2026</p>
        </div>

        <article className="bg-white border border-[#e6e2da] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] px-8 py-10 text-[#1a1a1a]">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Overview</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
               Software issues refer to bugs, glitches, errors, and malfunctions within the applications and systems used in our coffee shop operations.
               This includes the POS application, inventory management system, customer loyalty app, kitchen display system, and any integrated third-party services.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
               Software problems can disrupt transactions, cause data loss, generate incorrect reports, and create confucsion among staff.
               Your detailed report helps our developers identify, reproduce, and fix these issues efficiently.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">2. Common Software Problems</h2>
            <h4 className="text-2xl font-semibold">a. Application Crashes</h4>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>POS app closes unepectedly during checkout; kioks app freezes.</p>
              </div>
            <h4 className="text-2xl font-semibold">b. Menu Errors</h4>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>Items missing from menu, incorrect prices displayed, wrong product images.</p>
              </div>
            <h4 className="text-2xl font-semibold">c. Transaction Errors</h4>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>Payment processing fails, incorrect change calculayed, duplicate orders.</p>
            </div>
            <h4 className="text-2xl font-semibold">d. Sync/Integration Errors</h4>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>Online orders not appearing in kitchen; inventory not updating after sale.</p>
              </div>
            <h4 className="text-2xl font-semibold">e. Login/Authentication Failures</h4>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>Staff unable to log in; password reset not working; account locked.</p>
              </div>
            <h4 className="text-2xl font-semibold">f. Reporting Bugs</h4>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>Sales reports incorrect totals, missing tax calculations, date range errors.</p>
            </div>
            <h4 className="text-2xl font-semibold">g. User Interface Glitches</h4>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>Buttons overlapping, text cut off, screen scaling issues, unresponsive elements.</p>
            </div>
            <h4 className="text-2xl font-semibold">h. Data Corruption</h4>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>Order history missing, customer data lost, settings reset unexpectedly.</p>
            </div>
            <h4 className="text-2xl font-semibold">i. Performance Issues</h4>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>App slow to load, lag during transactions, delayed response to commands.</p>
            </div>
            <h4 className="text-2xl font-semibold">j. Third-Party Integration</h4>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>Delivery platform orders not syncing; loyalty points not accruing.</p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">3. Information We Collect For Software Issues</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>To effectively debug and resolve software problems, we collect the following information:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Reporter Name: </b>Full name or staff ID</li>
                <li><b>Application Name: </b>POS, Inventory, Loyalty App, Kitchen Display, etc.</li>
                <li><b>Application Version: </b>Found in settings or about section</li>
                <li><b>Device Type & OS: </b>Windows, iOS, Android, or Web browser</li>
                <li><b>Error Code/Message: </b>Exact test of any error pop-ups</li>
                <li><b>Steps to Reproduce: </b>Detailed steps that led to the error</li>
                <li><b>Screenshots/Screen Recordings: </b>Visual evidence of the issue</li>
                <li><b>Timestamp: </b>Date and time the issue occurred</li>
                <li><b>Impact Level: </b>Single User/Multiple Users/All Users</li>
                <li><b>Order/Receipt Number: </b>If applicable to the error</li>
              </ul>
              <p>We only collect information that is necessary for the proper operation of the complaint and feedback system.</p>
            </div>
          </section>

        <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">4. Software Issue Resolution Process</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Submission: </b>Issue submitted with detailed description and attachments.</li>
                <li><b>Triage: </b>Issue is categorized by urgency and impact.</li>
                <li><b>Reproduction: </b>Developers attempt to replicate the bug in a test environment.</li>
                <li><b>Debugging: </b>Code is reviewed and the root cause is identified.</li>
                <li><b>Hotflix/Patch: </b>If critical, immediate fix is deployed.</li>
                <li><b>Update Release: </b>Regular update cycle includes the fix if not urgent.</li>
                <li><b>Verification: </b>Reporter is notified and asked to verify the fix.</li>
                <li><b>Closure: </b>Ticket is closed with resolution notes.</li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">5. Estimated Resolution Time</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">

            <div className="overflow-x-auto rounded-lg border border-[#e5eaef] bg-white">
            <table className="min-w-full text-sm text-left">
            <thead className="bg-[#f7f9fb] text-[#3d4e5c] text-xs uppercase tracking-wider">
            <tr>
            <th className="px-5 py-3 font-semibold">Severity</th>
            <th className="px-5 py-3 font-semibold">Response Time</th>
            <th className="px-5 py-3 font-semibold">Resolution Time</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f6]">
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Critical</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 15 minutes</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 2 hours</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>High</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 30 minutes</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 6 hours</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Medium</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 1 hour</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 48 hours</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Low</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 4 hour</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 7 days</td>
            </tr>
            </tbody>
            </table>
            </div>
            </div>
            </section>

            <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">6. Tips for Reporting Software Issues</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Take Screenhots: </b>Capture error messages and the screen where the issue occurred.</li>
                <li><b>Record Steps: </b>Write down exactly what you did before the error appeared.</li>
                <li><b>Note Version Numbers: </b>Include the app version and operating system.</li>
                <li><b>Check Internet Connection: </b>Some "software errors" are actually network-related.</li>
                <li><b>Restart the App: </b>Often, restarting resolves temporary glitches..</li>
                <li><b>Be Specific: </b>Instead of "it crashed," say "crashed when I clicked 'Add Milk'."</li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">7. Software Development Lifecycle</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">

            <div className="overflow-x-auto rounded-lg border border-[#e5eaef] bg-white">
            <table className="min-w-full text-sm text-left">
            <thead className="bg-[#f7f9fb] text-[#3d4e5c] text-xs uppercase tracking-wider">
            <tr>
            <th className="px-5 py-3 font-semibold">Phase</th>
            <th className="px-5 py-3 font-semibold">Description</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f6]">
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Planning</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Features and bug fixes are prioritized.</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Development</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Code is written and tested internally.</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Testing (QA)</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">WQuality assurance team validates fixes.</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Staging</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Updates deployed to a test environment.</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Production</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Updates rolled out to live systems.</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Monitoring</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Performance and errors are tracked post-release.</td>
            </tr>
            </tbody>
            </table>
            </div>
            </div>
            </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">8. Data Protection Commitment</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p> Software error logs, user activity data, and system diagnostics are collected strictly for debugging and improvement purposes.
                All data is anonymized where possible and stored securely. Access is limited to authorized developers and system administrators.
                Personal data is protected under the Data Privacy of 2012.
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">9. Contact Information</h2>
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

export default SoftwareIssue;
