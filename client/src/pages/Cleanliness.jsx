import React from 'react';

const SoftwareIssue = () => {
  return (
    <div className="min-h-screen bg-[#f7f6f4] py-16">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1a1a1a]">Cleanliness</h1>
          <p className="mt-2 text-sm text-[#5a6d78]">PropertyHub</p>
          <p className="mt-2 text-sm text-[#5a6d78]">Internet Cafe Complaint and Feedback System</p>
          <p className="mt-4 text-sm text-[#5a6d78]">Effective Date: June 13, 2026</p>
          <p className="text-sm text-[#5a6d78]">Last Updated: June 13, 2026</p>
        </div>

        <article className="bg-white border border-[#e6e2da] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] px-8 py-10 text-[#1a1a1a]">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Overview</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
               Cleanliness issues refer to any concerns regarding the hygiene, sanitation, and overall tidiness of our coffee shop premises. 
               This includes dining areas, restrooms, food preparation areas, gaming zones, and common spaces.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
               Maintaining a clean environment is essential for customer satisfaction, health compliance, and the overall experience of every guest. 
               Your feedback helps us identify areas that need immediate attention and ensures we uphold the highest standards of cleanliness.
            </p>
          </section>

            <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">2. Common Cleanliness Issues</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Dining Area: </b>Tables not wiped, floor sticky, spilled drinks, trash bins overflowing, crumbs on seats.</li>
                <li><b>Restrooms: </b>No soap or tissue, dirty floors, foul odor, toilet not flushing, sinks clogged.</li>
                <li><b>Food & Beverage Station: </b>Counter sticky, condiment spills, coffee stains, utensils not clean.</li>
                <li><b>Gaming Area: </b>Keyboards/mice sticky, chairs stained, trash left on tables, dusty monitors.</li>
                <li><b>Entrance/Walkways: </b>Wet floors, dirt tracked in, mats not clean, slippery surfaces.</li>
                <li><b>Kitchen/Prep Area: </b>Floor greasy, counters not sanitized, equipment not cleaned.</li>
                <li><b>Display Shelves: </b>Dust buildup, product packaging dirty, expired items on display.</li>
                <li><b>Air Quality: </b>Lingering odors, poor ventilation, smoke smell, dusty air conditioning.</li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">3. Information We Collect For Cleanliness Issues</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>To promptly address cleanliness concerns, we collect the following information:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Reporter Name: </b>Full name or staff ID</li>
                <li><b>Location: </b>Dining Area, Restroom, Gaming Area, Kitchen, Entrance, etc.</li>
                <li><b>Specific Area: </b>Table #, Restroom #, Gaming Station #, etc.</li>
                <li><b>Issue Description: </b>Detailed explanation of the cleanliness concern</li>
                <li><b>Photos: </b>Visual evidence of the issue (recommended)</li>
                <li><b>Severity: </b>Critical/High/Medium/Low</li>
                <li><b>Time of Observation: </b>Date and time issue was observed</li>
                <li><b>Customer Count: </b>Approximate number of customers in affected area</li>
              </ul>
              <p>We only collect information that is necessary for the proper operation of the complaint and feedback system.</p>
            </div>
          </section>

        <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">4. Cleanliness Standards We Maintain</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Table Turnaround: </b>Tables cleared and wiped within 2 minutes of customer departure.</li>
                <li><b>Floor Cleaning: </b>Floors swept and mopped every 2 hours; spills addressed immediately.</li>
                <li><b>Restroom Checks: </b>Restrooms inspected and cleaned every 30 minutes.</li>
                <li><b>Trash Disposal: </b>Trash bins emptied when ¾ full; not less than every 2 hours.</li>
                <li><b>Surface Sanitization: </b>All high-touch surfaces sanitized hourly.</li>
                <li><b>Gaming Equipment: </b>Keyboards, mice, and headsets sanitized after each use.</li>
                <li><b>Air Quality: </b>Air conditioning filters cleaned monthly; odors addressed immediately.</li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">5. Cleanliness Issue Resolution Process</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Submission: </b>Cleanliness issue reported with location and details.</li>
                <li><b>Notification: </b>Housekeeping team alerted immediately.</li>
                <li><b>Inspection: </b>Supervisor inspects and verifies the issue.</li>
                <li><b>Remediation: </b>Area is cleaned, sanitized, or repaired as needed.</li>
                <li><b>Follow-Up: </b>Reporter notified of resolution.</li>
                <li><b>Documentation: </b>Issue logged for training and trend analysis.</li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">6. Estimated Resolution Time</h2>
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
            <td className="px-5 py-3.5 text-[#4a5b6a]">Immediate</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 5 minutes</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>High</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 5 minutes</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 15 minutes</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Medium</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 10 minutes</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 30 minutes</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Low</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 15 minutes</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 1 hour</td>
            </tr>
            </tbody>
            </table>
            </div>
            </div>
            </section>

            <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">7. Tips for Reporting Cleanliness Issues</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Be specific: </b>Instead of "restroom dirty," say "restroom floor is wet and soap dispenser is empty."</li>
                <li><b>Take Photos: </b>Visual evidence helps housekeeping address the exact problem.</li>
                <li><b>Note Location: </b>Provide specific table numbers, restroom numbers, or gaming station IDs.</li>
                <li><b>Report Promptly: </b>Early reporting prevents minor issues from becoming major problems.</li>
                <li><b>Follow Safety Protocols: </b>Avoid walking on wet floors; report immediately to prevent accidents.</li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">8. Data Protection Commitment</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p> All cleanliness reports are handled with confidentiality. 
                Personal information provided is used solely for issue resolution and quality improvement. 
                Data is protected under the Data Privacy Act of 2012 and retained for training and compliance purposes.
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">9. Contact Information</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
              For privacy-related questions, requests, or complaints, please contact:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[#5a6d78] leading-7">
                <li>Internet Cafe Management: PropertyHub Services</li>
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
