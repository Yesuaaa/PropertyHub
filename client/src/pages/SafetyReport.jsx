import React from 'react';

const SafetyReport = () => {
  return (
    <div className="min-h-screen bg-[#f7f6f4] py-16">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1a1a1a]">Safety Concern</h1>
          <p className="mt-2 text-sm text-[#5a6d78]">PropertyHub</p>
          <p className="mt-2 text-sm text-[#5a6d78]">Internet Cafe Complaint and Feedback System</p>
          <p className="mt-4 text-sm text-[#5a6d78]">Effective Date: June 13, 2026</p>
          <p className="text-sm text-[#5a6d78]">Last Updated: June 13, 2026</p>
        </div>

        <article className="bg-white border border-[#e6e2da] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] px-8 py-10 text-[#1a1a1a]">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Overview</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
              Safety concerns cover any condition that may threaten the wellbeing of customers or staff within our internet cafe premises.
              This includes power outages, poor ventilation, electrical hazards, trip hazards, and unsafe workstation conditions.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              A safe environment is our top priority. Your report allows us to identify hazards, respond quickly, and maintain a secure
              space for everyone. Safety reports are treated with the highest urgency.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">2. Common Safety Concerns</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Power Outage: </b>Sudden loss of power, flickering lights, or non-functional outlets at workstations.</li>
                <li><b>Ventilation: </b>Stuffy air, overheating room, air-conditioning failure, or poor air circulation.</li>
                <li><b>Workstation Area: </b>Exposed wiring, unstable desks, broken chairs, or frayed cables.</li>
                <li><b>Electrical Hazard: </b>Sparking outlets, burning smell, or overheating equipment.</li>
                <li><b>Trip / Slip Hazard: </b>Loose cables across walkways, wet floors, or obstructed exits.</li>
                <li><b>Emergency Equipment: </b>Blocked fire exits, missing extinguishers, or non-functional emergency lighting.</li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">3. Information We Collect For Safety Concerns</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>To properly assess and resolve your safety concern, we collect the following information:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Reporter Name: </b>Full name or staff ID</li>
                <li><b>Location: </b>Workstation Area, Restroom, Counter, Gaming Area, VIP / Premium Room</li>
                <li><b>Hazard Category: </b>Power Outage, Ventilation, Workstation Area, Electrical, Trip / Slip</li>
                <li><b>People Affected: </b>Whether customers or staff are at immediate risk</li>
                <li><b>Issue Description: </b>Detailed explanation of the hazard</li>
                <li><b>Photos: </b>Visual evidence of the condition (optional but recommended)</li>
                <li><b>Timestamp: </b>Date and time the hazard was observed</li>
                <li><b>Severity Rating: </b>Critical / High / Medium / Low</li>
              </ul>
              <p>We only collect information that is necessary for the proper operation of the complaint and feedback system.</p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">4. How We Process Your Safety Report</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Submission: </b>You submit your safety concern through the system.</li>
                <li><b>Immediate Assessment: </b>Staff on duty assesses whether the area must be evacuated or cordoned off.</li>
                <li><b>Containment: </b>Hazard is isolated (e.g., power cut to a faulty outlet, wet-floor signage placed).</li>
                <li><b>Resolution: </b>Maintenance team or external contractor performs the required repair.</li>
                <li><b>Closure: </b>Once verified safe, you are notified and the ticket is closed with a resolution summary.</li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">5. Estimated Response and Resolution Time</h2>
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
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 1 hour</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>High</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 15 minutes</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 2 hours</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Medium</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 30 minutes</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 8 hours</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Low</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 1 hour</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 24 hours</td>
            </tr>
            </tbody>
            </table>
            </div>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">6. Tips for Reporting Safety Concerns</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Do Not Ignore Hazards: </b>Even minor issues like a loose cable can cause injury.</li>
                <li><b>Avoid the Area: </b>If there is immediate danger (sparks, smoke), move away first, then report.</li>
                <li><b>Take Photos: </b>Visual evidence helps maintenance prepare the right tools and parts.</li>
                <li><b>Pinpoint the Location: </b>Specify the exact workstation number or zone.</li>
                <li><b>Be Specific: </b>Describe exactly what you observed (e.g., &ldquo;Outlet at Workstation 7 is sparking when plugged in&rdquo;).</li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">7. Data Protection Commitment</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>All safety-related reports are handled with strict confidentiality. Reporter identity, hazard descriptions, and location
                data are used solely for risk assessment and remediation. Personal information is protected under the Data Privacy Act of
                2012 and will not be shared outside our organization except with authorized maintenance or emergency service providers.</p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">8. Contact Information</h2>
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

export default SafetyReport;
