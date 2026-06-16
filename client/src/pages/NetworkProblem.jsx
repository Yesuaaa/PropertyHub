import React from 'react';

const NetworkProblem = () => {
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
               Network problems involve any disruption in connectivity, communication, or data transmission within our coffee shop's infrastructure.
               This includes Wi-Fi outages, slow internet speeds, device-to-device communication failures, VPN issues, and cloud synchronization errors.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
               Because our operations rely heavily on cloud-based systems, network issues can halt transaction, delay order processing, and
               negatively impact customer experience. your report is essential for rapid diagnosis and restoration of services.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">2. Common Network Problems</h2>
            <h4 className="text-2xl font-semibold">a. Wi-Fi Outage</h4>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>Staff devices and customer guest Wi-Fi are disconnected or showing "No Internet".</p>
              </div>
            <h4 className="text-2xl font-semibold">b. Slow Internet Speed</h4>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>Connectivity exists but loading times are extremely delayed for POS and cloud systems.</p>
              </div>
            <h4 className="text-2xl font-semibold">c. Device Communication Failure</h4>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>Kitchen printers not receiving orders from front counter; tablets not syncing.</p>
            </div>
            <h4 className="text-2xl font-semibold">d. VPN Failure</h4>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>Unable to connect to head-office database for inventory updates or reports.</p>
              </div>
            <h4 className="text-2xl font-semibold">e. IP Address Conflicts</h4>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>Specific device cannot be found on the network due to duplicate IP assignment.</p>
              </div>
            <h4 className="text-2xl font-semibold">f. DNS Issues</h4>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>Websites and apps fail to load due to domain resolution errors.</p>
            </div>
            <h4 className="text-2xl font-semibold">g. Packet Loss/Latency</h4>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>Orders transmitted with delay; voice/video calls breaking up.</p>
            </div>
            <h4 className="text-2xl font-semibold">h. Switch/Router Malfunction</h4>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>Hardware failure in network equipment causing partial or total blackout.</p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">3. Information We Collect For Network Issues</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>To quickly identify and resolve network issues, we collect the following information:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Reporter Name: </b>Full name or staff ID</li>
                <li><b>Affected Areas: </b>Front Counter, Dining Area, Kitchen, Drive-Thru, Office</li>
                <li><b>Affected Devices: </b>Specific devices or all devices in the area</li>
                <li><b>Issue Description: </b>Detailed explanation of the problem</li>
                <li><b>Screenshots: </b>Speed test results, error messages, or connectivity indicators</li>
                <li><b>Timestamp: </b>Date and time the issue occurred</li>
                <li><b>Impact Level: </b>Total Outage/Partial Outage/Degraded Performance</li>
                <li><b>Customer Impact: </b>Number of customers affected (if known)</li>
              </ul>
              <p>We only collect information that is necessary for the proper operation of the complaint and feedback system.</p>
            </div>
          </section>

        <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">4. Network Diagnostics Protocol</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Initial Report: </b>System submits network complaint with details.</li>
                <li><b>Remote Diagnostics: </b>IT team checks router status, bandwidth usage, and device connectivity remotely.</li>
                <li><b>Physical Inspection: </b>If remote check fails, on-site inspection of routers, switches, and cables.</li>
                <li><b>ISP Coordination: </b>If issue is external, internet service provider is contacted for resolution.</li>
                <li><b>Restoration: </b>Network restored, and all devices are tested for full functionality.</li>
                <li><b>Post-Mortem: </b>Root cause analysis to prevent recurrence.</li>
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
            <th className="px-5 py-3 font-semibold">Impact Level</th>
            <th className="px-5 py-3 font-semibold">Response Time</th>
            <th className="px-5 py-3 font-semibold">Resolution Time</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f6]">
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Total Outage</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Immediate</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 1 hours</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Partial Outage</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 10 minutes</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 2 hours</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Degraded Performance</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 20 minutes</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Within 4 hours</td>
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
                <li><b>Run a Speed Test: </b>Use a free tool to check download/upload speeds.</li>
                <li><b>Check All Devices: </b>Determine if one device is affected or all devices.</li>
                <li><b>Restart Router: </b>Sometimes a simple reboot resolves the issue.</li>
                <li><b>Note External Factors: </b>Rain, construction, or power fluctuations can affect connectivity.</li>
                <li><b>Provide Screenshots: </b>Error messages and connection status screens are helpful.</li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">7. Network Insfracture at a Glance</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">

            <div className="overflow-x-auto rounded-lg border border-[#e5eaef] bg-white">
            <table className="min-w-full text-sm text-left">
            <thead className="bg-[#f7f9fb] text-[#3d4e5c] text-xs uppercase tracking-wider">
            <tr>
            <th className="px-5 py-3 font-semibold">Primary Router</th>
            <th className="px-5 py-3 font-semibold">Purpose</th>
            <th className="px-5 py-3 font-semibold">Backup Plan</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f6]">
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Primary Router</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Main internet gateway</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Secondaray router on standby</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Wi-Fi Access Points</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Wireless coverage across store</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Manual failover to cellular backup</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Managed Switches</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Wired device connections</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Replacement switch available</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Cellular Backup</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Emergency internet access</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Activated automatically during outage</td>
            </tr>
            <tr>
            <td className="px-5 py-3.5 font-medium text-[#1a2a3a]"><b>Power Supply</b></td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">Equipment uptime</td>
            <td className="px-5 py-3.5 text-[#4a5b6a]">UPS and generator backup</td>
            </tr>
            </tbody>
            </table>
            </div>
            </div>
            </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">8. Data Protection Commitment</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>Network logs, IP addresses, and connectivity data are collected strictly for diagnostic and security purposes. 
                This data is not shared with third parties except ISP technicians directly involved in resolution.
                All data handling complies with the Data Privacy Act of 2012.</p>
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

export default NetworkProblem;
