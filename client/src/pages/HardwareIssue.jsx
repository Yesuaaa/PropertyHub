import React from 'react';

const HardwareIssue = () => {
  return (
    <div className="min-h-screen bg-[#f7f6f4] py-16">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1a1a1a]">Hardware Issue</h1>
          <p className="mt-2 text-sm text-[#5a6d78]">Zogo</p>
          <p className="mt-2 text-sm text-[#5a6d78]">Internet Cafe Complaint and Feedback System</p>
          <p className="mt-4 text-sm text-[#5a6d78]">Effective Date: June 13, 2026</p>
          <p className="text-sm text-[#5a6d78]">Last Updated: June 13, 2026</p>
        </div>

        <article className="bg-white border border-[#e6e2da] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] px-8 py-10 text-[#1a1a1a]">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Overview</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
              Hardware issues refer to any physical malfunction or failure of the equipment used in our coffee shop operations.
              This includes point-of-sales (POS) terminals, receipt printers, card readers, self-order kiosks, tablets, and other elctronic devices that support daily business activities.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              When hardware fails, it directly impacts our ability to serve customers efficiently. Your report helps us identify, track, and resolve these physical equipment problems promptly.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">2. Common Hardware Issues</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <ul className="list-disc pl-5 space-y-2">
                <li><b>POS Terminal: </b>Screen frozen, unresponsive to touch, black screen, slow performance, physical damage (cracked screen).</li>
                <li><b>Receipt Printer: </b>Paper jam, out of paper, printing blank receipts, faded text, connectivity errors, mechanical failure.</li>
                <li><b>Card Reader/Pinpad: </b>Not powering on, card not reading (swipe/chip/tap), transaction declined repeatedly, display glitches.</li>
                <li><b>Self-Order Kiosk: </b>Touchscreen unresponsive, display flickering, physical damage, system boot failure.</li>
                <li><b>Kitchen Display System: </b>Screen goes black, order not showing, audio alerts not working, lag in order updates.</li>
                <li><b>Tablets/Mobile Devices: </b>Battery not charging, cracked screen, app crashing, overheating, connectivity issues.</li>
                <li><b>Coffee Equipment: </b>Digital scale not syncing, grinder display errors, connected machine offline.</li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">3. Information We Collect For Hardware Issues</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>To properly diagnose and resolve your hardware concern, we collect the following information:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Reporter Name: </b>Full name or staff ID</li>
                <li><b>Device Type: </b>POS, Printer, Card Reader, Kiosk, Tablet, etc.</li>
                <li><b>Device Model/Serial Number: </b>Found on the device lable</li>
                <li><b>Location: </b>Counter#1, Drive-Thru, Kitchen, Self-Order Station, etc.</li>
                <li><b>Issue Description: </b>Detailed explanation of the problem</li>
                <li><b>Photos/Videos: </b>Visual evidence of the issue (optional but recommended)</li>
                <li><b>Timestamp: </b>Date and time the issue occurred</li>
                <li><b>Severity Rating: </b>Critical/High/Medium/Low</li>
              </ul>
              <p>We only collect information that is necessary for the proper operation of the complaint and feedback system.</p>
            </div>
          </section>

        <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">4. How We Process Your Hardware Report</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Submission: </b>You submit your hardware complaint through the system.</li>
                <li><b>Verification: </b>Our technical team verifies the issue through remote diagnostics or physical inspection.</li>
                <li><b>Triage: </b>Issue is categorized by severity: Critical (stop operations) to Low (minor inconvenience).</li>
                <li><b>Resolution: </b>On-site repair, equipment replacement, or vendor coordination.</li>
                <li><b>Closure: </b>Once resolved, you are notified and the ticket is closed with a resolution summary.</li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">5. How We Use Your Information</h2>
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
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 4 hours</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Medium</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 1 hour</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 24 hours</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Low</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 4 hours</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 48 hours</td>
            </tr>
            </tbody>
            </table>
            </div>
            </div>
            </section>

            <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">6. Tips for Reporting Hardware Issues</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Restart First: </b>Try turning the device off and n again before submitting.</li>
                <li><b>Check Cables: </b>Ensure all power and data cables are properly connected.</li>
                <li><b>Take Photos: </b>Visual evidence helps technician prepare the right parts.</li>
                <li><b>Note Serial Numbers: </b>This helps with warrantly tracking and inventory management.</li>
                <li><b>Be Specific: </b>Describe exactly what happened (e.g., "Printer jammed when printing order #67 at 7:11pm").</li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">7. Data Protection Commitment</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>All hardware-related reports are handled with strict confidentiality. Device information, serial numbers, and location data are used solely for maintenance and warrantly purposes. Personal information is protected under the Data Privacy Act of 2012 and will not be shared outside our organization except with authorized service providers.</p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">8. Contact Information</h2>
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

export default HardwareIssue;
