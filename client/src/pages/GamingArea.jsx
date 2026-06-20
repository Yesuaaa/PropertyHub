import React from 'react';

const SoftwareIssue = () => {
  return (
    <div className="min-h-screen bg-[#f7f6f4] py-16">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1a1a1a]">Gaming Area</h1>
          <p className="mt-2 text-sm text-[#5a6d78]">PropertyHub</p>
          <p className="mt-2 text-sm text-[#5a6d78]">Internet Cafe Complaint and Feedback System</p>
          <p className="mt-4 text-sm text-[#5a6d78]">Effective Date: June 13, 2026</p>
          <p className="text-sm text-[#5a6d78]">Last Updated: June 13, 2026</p>
        </div>

        <article className="bg-white border border-[#e6e2da] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] px-8 py-10 text-[#1a1a1a]">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Overview</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
               Gaming area issues refer to any concerns related to the computers, gaming consoles, peripherals, seating, and overall gaming experience within our coffee shop's dedicated gaming zone. 
               This includes hardware malfunctions, software problems, network connectivity, peripheral issues, and gaming station cleanliness.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
               Our gaming area is a key attraction for customers seeking a premium gaming experience. 
               Your feedback ensures that every gaming session is smooth, enjoyable, and free from technical disruptions.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">2. Common Gaming Area Issues</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Hardware Problems: </b>Computer not powering on, monitor flickering, keyboard keys missing, mouse not responding, headset audio issues.</li>
                <li><b>Network Problems: </b>High ping, lag spikes, disconnections, slow download speeds, game server connection errors.</li>
                <li><b>Software Problems: </b>Game crashes, game not launching, outdated game versions, client errors, missing game files.</li>
                <li><b>Peripheral Issue: </b>Keyboard sticky, mouse not tracking, headset broken, controller unresponsive, mousepad worn.</li>
                <li><b>Seating & Furniture: </b>Chair wobbly, armrest broken, table height issues, torn upholstery.</li>
                <li><b>Cleanliness Issue: </b>Keyboards/mice dirty, sticky surfaces, trash left at station, dusty monitors, food spills</li>
                <li><b>Audio/Visual Issues: </b>Speakers not working, screen resolution wrong, color distortion, audio delay.</li>
                <li><b>Account Issues: </b>Game account not logged in, subscription expired, parental controls blocking games.</li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">3. Information We Collect For Gaming Area Issues</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>To quickly resolve gaming area concerns, we collect the following information:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Reporter Name: </b>Full name or staff ID</li>
                <li><b>Gaming Station Number: </b>PC #, Console Station #, etc.</li>
                <li><b>Hardware Issue: </b>Computer, monitor, keyboard, mouse, headset, etc.</li>
                <li><b>Software Issue: </b>Game name, error message, crash description</li>
                <li><b>Network Issue:: </b>Ping, lag, disconnection frequency</li>
                <li><b>Cleanliness Issue: </b>Specific hygiene or tidiness concern</li>
                <li><b>Photos: </b>Visual evidence of the issue (recommended)</li>
                <li><b>Severity: </b>Critical/High/Medium/Low</li>
                <li><b>Duration: </b>How long has the issue been present?</li>
              </ul>
              <p>We only collect information that is necessary for the proper operation of the complaint and feedback system.</p>
            </div>
          </section>

        <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">4. Gaming Area Standards We Maintain</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Equipment Inspections: </b>All stations inspected daily before opening.</li>
                <li><b>Peripheral Hygiene: </b>Keyboards, mouse, and headsets sanitized after each use.</li>
                <li><b>Game Updates: </b>Game libraries updated weekly; auto-updates enabled.</li>
                <li><b>Network Performance: </b>Latency maintained under 50ms; no packet loss.</li>
                <li><b>Station Cleanliness: </b>Monitors dusted, surfaces wiped, trash removed every hour.</li>
                <li><b>Ergonomic Checks: </b>Chairs and tables adjusted for customer comfort.</li>
                <li><b>Soundproofing: </b>Game audio contained to avoid disturbing other customers.</li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">5. Gaming Area Issue Resolution Process</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Submission: </b>Gaming issue reported with station number and details.</li>
                <li><b>Triage: </b>Issue categorized as Hardware, Software, Network, or Cleanliness.</li>
                <li><b>Remote Check: </b>IT attempts remote diagnostics if applicable.</li>
                <li><b>Physical Inspection: </b>Technician inspects station on-site.</li>
                <li><b>Resolution: </b>Fix applied: hardware replacement, software update, network adjustment, or cleaning.</li>
                <li><b>Verification: </b>Station tested to ensure full functionality.</li>
                <li><b>Closure: </b>Reporter notified and ticket closed.</li>
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
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 5 minutes</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 15 minutes</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>High</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 10 minutes</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 30 minutes</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Medium</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 20 minutes</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 2 hours</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Low</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 30 minutes</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 24 hours</td>
            </tr>
            </tbody>
            </table>
            </div>
            </div>
            </section>

            <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">7. Tips for Reporting Gaming <Area:d></Area:d> Issues</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Note Station Number: </b>Always include the gaming station number or PC name.</li>
                <li><b>Take Screenshots: </b>For software errors, capture the error message.</li>
                <li><b>Test Peripherals: </b>Try a different keyboard/mouse to isolate the issue.</li>
                <li><b>Check Other Stations: </b>Determine if it's an isolated issue or widespread.</li>
                <li><b>Be Detailed: </b>Instead of "game not working," say "Call of Duty crashes when loading the main menu at 75%."</li>
                <li><b>Report Cleanliness: </b>Dirty peripherals should be reported for immediate sanitization.</li>
              </ul>
            </div>
          </section>

            <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">6. Gaming Area Inventory</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">

            <div className="overflow-x-auto rounded-lg border border-[#e5eaef] bg-white">
            <table className="min-w-full text-sm text-left">
            <thead className="bg-[#f7f9fb] text-[#3d4e5c] text-xs uppercase tracking-wider">
            <tr>
            <th className="px-5 py-3 font-semibold">Category</th>
            <th className="px-5 py-3 font-semibold">Equipment</th>
            <th className="px-5 py-3 font-semibold">Quantity</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f6]">
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Computers</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Gaming PCs with RTX 4060, 32GB RAM</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">20 units</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Monitors</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">27" 144Hz Curved Displays</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">20 units</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Keyboards</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Mechanical RGB Keyboards</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">25 units (includes spares)</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Mouse</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">High-DPI Gaming Mouse</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">25 units (includes spares)</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Headsets</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Surround Sound Gaming Headsets</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">20 units</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Consoles</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">PlayStation 5, Xbox Series X</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">4 units (2 each)</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Controllers</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">DualSense, Xbox Wireless</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">8 units</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Chairs</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Ergonomic Gaming Chairs</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">20 units</td>
            </tr>
            </tbody>
            </table>
            </div>
            </div>
            </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">8. Data Protection Commitment</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>Gaming area reports may include personal information such as usernames, gaming accounts, and session logs. 
                This data is collected strictly for issue resolution and is not shared with third parties. 
                All data handling complies with the Data Privacy Act of 2012.
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
