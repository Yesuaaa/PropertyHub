import React from 'react';

const BillingIssue = () => {
  return (
    <div className="min-h-screen bg-[#f7f6f4] py-16">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1a1a1a]">Billing Concern</h1>
          <p className="mt-2 text-sm text-[#5a6d78]">PropertyHub</p>
          <p className="mt-2 text-sm text-[#5a6d78]">Internet Cafe Complaint and Feedback System</p>
          <p className="mt-4 text-sm text-[#5a6d78]">Effective Date: June 13, 2026</p>
          <p className="text-sm text-[#5a6d78]">Last Updated: June 13, 2026</p>
        </div>

        <article className="bg-white border border-[#e6e2da] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] px-8 py-10 text-[#1a1a1a]">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Overview</h2>
            <p className="text-sm text-[#5a6d78] leading-7">
              Billing concerns cover any discrepancy related to charges, payments, and account balances within our internet cafe.
              This includes hourly rental rates, membership fees, load or top-up transactions, printing charges, and refunds.
            </p>
            <p className="text-sm text-[#5a6d78] leading-7">
              Accurate billing is essential to maintaining trust with our customers. Your report allows us to investigate, correct,
              and prevent any charging errors from recurring.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">2. Common Billing Concerns</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Hourly Rate: </b>Incorrect charge for session time, timer not stopping, or rate mismatch.</li>
                <li><b>Membership: </b>Membership discount not applied, expired membership, or duplicate billing.</li>
                <li><b>Load / Top-up: </b>Top-up not credited, wrong amount loaded, or load balance disappearing.</li>
                <li><b>Printing Charge: </b>Overcharged for printed pages, count mismatch, or unprinted pages billed.</li>
                <li><b>Refund Requests: </b>Session cut short by outage, double payment, or service not rendered.</li>
                <li><b>Receipt Errors: </b>Missing receipt, wrong total, or incorrect change given.</li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">3. Information We Collect For Billing Concerns</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>To properly investigate and resolve your billing concern, we collect the following information:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Reporter Name: </b>Full name or account ID</li>
                <li><b>Account / Member ID: </b>Used to locate your session and transaction records</li>
                <li><b>Transaction Reference: </b>Receipt number or transaction timestamp</li>
                <li><b>Charge Category: </b>Hourly Rate, Membership, Load / Top-up, Printing Charge</li>
                <li><b>Amount Disputed: </b>The specific amount in question</li>
                <li><b>Issue Description: </b>Detailed explanation of the discrepancy</li>
                <li><b>Receipt / Screenshot: </b>Proof of payment or charge (optional but recommended)</li>
                <li><b>Timestamp: </b>Date and time the charge occurred</li>
              </ul>
              <p>We only collect information that is necessary for the proper operation of the complaint and feedback system.</p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">4. How We Process Your Billing Report</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Submission: </b>You submit your billing complaint through the system.</li>
                <li><b>Verification: </b>Our cashier team cross-checks the transaction logs and session records.</li>
                <li><b>Reconciliation: </b>Discrepancy is confirmed against receipts, timers, and payment gateway records.</li>
                <li><b>Resolution: </b>Refund, credit adjustment, or charge correction is applied to your account.</li>
                <li><b>Closure: </b>Once resolved, you are notified and the ticket is closed with a resolution summary.</li>
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
            <h2 className="text-2xl font-semibold">6. Tips for Reporting Billing Concerns</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <ul className="list-disc pl-5 space-y-2">
                <li><b>Keep Your Receipt: </b>Receipts and transaction IDs are the fastest way to verify a charge.</li>
                <li><b>Note the Exact Time: </b>Session start and end times help reconcile the timer.</li>
                <li><b>Check Your Balance First: </b>Confirm the current load balance before reporting a discrepancy.</li>
                <li><b>Identify the Terminal: </b>Specify which workstation or kiosk processed the payment.</li>
                <li><b>Be Specific: </b>Describe the exact charge in question (e.g., &ldquo;Charged 2 hours but session was only 45 minutes&rdquo;).</li>
              </ul>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-semibold">7. Data Protection Commitment</h2>
            <div className="space-y-3 text-sm text-[#5a6d78] leading-7">
              <p>All billing-related reports are handled with strict confidentiality. Account IDs, transaction references, and payment
                records are used solely for reconciliation and refund purposes. Personal and financial information is protected under
                the Data Privacy Act of 2012 and will not be shared outside our organization except with authorized payment service providers.</p>
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

export default BillingIssue;
