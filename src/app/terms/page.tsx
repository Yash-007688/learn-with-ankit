"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { ShieldCheck, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const sections = [
    {
      id: "1",
      title: "1. About Learn with Ankit",
      content: (
        <>
          <p className="mb-3">
            Learn with Ankit provides physics-learning content and related educational support for students preparing for school examinations, JEE, NEET, and other academic goals. The Services are presented by or on behalf of Ankit Yadav Sir and the Learn with Ankit team.
          </p>
          <p>
            The Services are intended for educational and informational purposes. They do not guarantee admission, examination results, marks, ranks, selections, or any particular academic outcome.
          </p>
        </>
      ),
    },
    {
      id: "2",
      title: "2. Eligibility and Accounts",
      content: (
        <ul className="list-disc pl-5 space-y-2 text-stone-300">
          <li>You must provide accurate and complete information when creating an account.</li>
          <li>You are responsible for keeping your login credentials confidential and for all activity carried out through your account.</li>
          <li>If you are under the age of 18, you should use the Services with the knowledge and consent of a parent or legal guardian.</li>
          <li>You must promptly notify us if you believe your account has been accessed without authorization.</li>
          <li>We may suspend or terminate an account that contains inaccurate information, is used unlawfully, or violates these Terms.</li>
        </ul>
      ),
    },
    {
      id: "3",
      title: "3. Educational Content and Access",
      content: (
        <ul className="list-disc pl-5 space-y-2 text-stone-300">
          <li>Course videos, notes, problem sets, recordings, live sessions, explanations, graphics, and other materials are provided for your personal, non-commercial educational use.</li>
          <li>Access to a course or feature may depend on the plan, enrollment, payment status, availability, and other conditions shown at the time of purchase or enrollment.</li>
          <li>We may update, improve, replace, or discontinue content or features from time to time.</li>
          <li>You may not share your account or make paid or restricted content available to anyone else.</li>
          <li>We do not promise that every course, session, instructor, community feature, or piece of content will always be available or error-free.</li>
        </ul>
      ),
    },
    {
      id: "4",
      title: "4. Acceptable Use",
      content: (
        <>
          <p className="mb-3">You agree not to:</p>
          <ul className="list-disc pl-5 space-y-2 text-stone-300 mb-4">
            <li>Copy, download, record, reproduce, publish, sell, license, distribute, or publicly display our content except where we have expressly permitted it in writing;</li>
            <li>Share account credentials or allow another person to access your account;</li>
            <li>Scrape, reverse engineer, interfere with, or attempt to gain unauthorized access to the website or its systems;</li>
            <li>Upload or transmit malware, spam, unlawful material, or content that infringes another person’s rights;</li>
            <li>Harass, abuse, threaten, impersonate, or harm other students, teachers, staff, or community members; or</li>
            <li>Use the Services for any unlawful, fraudulent, or commercial purpose without our written permission.</li>
          </ul>
          <p>We may remove content, restrict access, or suspend accounts that violate this section or create risk for the Services or their users.</p>
        </>
      ),
    },
    {
      id: "5",
      title: "5. Payments, Subscriptions, and Refunds",
      content: (
        <ul className="list-disc pl-5 space-y-2 text-stone-300">
          <li>Prices, taxes, payment terms, renewal terms, and any applicable refund or cancellation conditions will be shown before purchase.</li>
          <li>You authorize the applicable payment provider to charge the selected payment method for the amount displayed at checkout.</li>
          <li>A payment does not transfer ownership of our content to you; it grants only the access rights described at checkout.</li>
          <li>Unless a separate written refund policy says otherwise, payments are non-refundable after digital course access has been provided, except where required by applicable law.</li>
          <li>We may change prices or plans prospectively. Changes will not affect an already-paid period unless the applicable purchase terms state otherwise.</li>
        </ul>
      ),
    },
    {
      id: "6",
      title: "6. Intellectual Property",
      content: (
        <>
          <p className="mb-3">
            The Services and all related content, including text, branding, logos, course materials, videos, audio, illustrations, graphics, software, and layout, are owned by or licensed to Learn with Ankit and are protected by applicable intellectual-property laws.
          </p>
          <p>
            Except for the limited personal-use permission expressly granted in these Terms, no rights are transferred to you. “Learn with Ankit,” related names, and branding may not be used without prior written permission.
          </p>
        </>
      ),
    },
    {
      id: "7",
      title: "7. Student Submissions and Feedback",
      content: (
        <>
          <p className="mb-3">
            If you submit questions, feedback, suggestions, reviews, or other material, you confirm that you have the right to submit it. You grant Learn with Ankit a non-exclusive, worldwide, royalty-free permission to use, reproduce, adapt, and display that material for operating, improving, and promoting the Services, subject to our Privacy Policy and applicable law.
          </p>
          <p>Please do not submit confidential personal information in public community areas.</p>
        </>
      ),
    },
    {
      id: "8",
      title: "8. Third-Party Links and Services",
      content: (
        <p>
          The website may contain links to third-party platforms such as social-media, messaging, payment, hosting, or video services. Those services are governed by their own terms and privacy policies. We are not responsible for third-party websites, content, availability, or practices.
        </p>
      ),
    },
    {
      id: "9",
      title: "9. Disclaimers",
      content: (
        <>
          <p className="mb-3">
            To the maximum extent permitted by law, the Services are provided on an “as available” and “as is” basis. We do not warrant that the website or its content will be uninterrupted, secure, complete, accurate, current, or free of errors or harmful components.
          </p>
          <p className="mb-3">
            Educational examples and performance claims are illustrative and should not be treated as a promise of results. You remain responsible for your study decisions, exam registrations, preparation, and use of the information provided.
          </p>
          <p>Nothing in these Terms excludes or limits any consumer or other legal right that cannot lawfully be excluded or limited.</p>
        </>
      ),
    },
    {
      id: "10",
      title: "10. Limitation of Liability",
      content: (
        <>
          <p className="mb-3">
            To the maximum extent permitted by applicable law, Learn with Ankit and its owners, instructors, employees, and service providers will not be liable for indirect, incidental, special, consequential, exemplary, or punitive losses, or for loss of data, goodwill, opportunity, or expected academic results, arising from or related to your use of the Services.
          </p>
          <p>
            Where liability cannot be excluded, our total liability for a claim relating to the Services will be limited to the amount you paid to Learn with Ankit for the specific Service giving rise to the claim during the six months preceding the event, or the minimum amount required by applicable law, whichever is greater.
          </p>
        </>
      ),
    },
    {
      id: "11",
      title: "11. Suspension and Termination",
      content: (
        <p>
          You may stop using the Services at any time. We may suspend or terminate access, with or without notice where permitted by law, if you breach these Terms, misuse the Services, fail to pay applicable charges, or if suspension is reasonably necessary to protect users or the Services.
        </p>
      ),
    },
    {
      id: "12",
      title: "12. Changes to these Terms",
      content: (
        <p>
          We may update these Terms to reflect changes to the Services, law, or business practices. The updated version will be posted on this page with a revised “Last updated” date. Your continued use of the Services after an update means you accept the updated Terms.
        </p>
      ),
    },
    {
      id: "13",
      title: "13. Privacy",
      content: (
        <p>
          Our collection and use of personal information are described in the Learn with Ankit Privacy Policy. Please review that policy before creating an account or using the Services.
        </p>
      ),
    },
    {
      id: "14",
      title: "14. Governing Law and Disputes",
      content: (
        <p>
          These Terms will be governed by the laws applicable to the operator of Learn with Ankit, without regard to conflict-of-law principles. Courts having appropriate jurisdiction over the operator’s location will have jurisdiction over disputes, unless applicable law requires another forum or dispute process.
        </p>
      ),
    },
    {
      id: "15",
      title: "15. Contact",
      content: (
        <p>
          For questions about these Terms, account access, courses, or legal notices, contact Learn with Ankit through the contact details published on the website, including our official WhatsApp, email, or other support channel made available here.
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0500] text-stone-200">
      {/* Glow backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-b from-amber-600/10 via-orange-600/5 to-transparent blur-[120px] pointer-events-none" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 relative z-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-amber-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 border-b border-amber-900/30 pb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-800/40 bg-amber-950/40 text-amber-400 text-xs font-semibold mb-4">
            <FileText className="w-3.5 h-3.5" />
            Legal Agreement
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-stone-400 text-sm">
            Last updated: <span className="text-amber-400 font-medium">13 October 2026</span>
          </p>
          <p className="mt-4 text-stone-300 leading-relaxed">
            Welcome to Learn with Ankit. These Terms & Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the Learn with Ankit website, courses, lectures, mentorship, doubt-solving sessions, community features, and related educational services (collectively, the &ldquo;Services&rdquo;). By accessing or using the Services, you agree to be bound by these Terms.
          </p>
          <p className="mt-2 text-stone-400 text-sm italic">
            If you do not agree with these Terms, please do not use the Services.
          </p>
        </motion.div>

        {/* Content sections */}
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="p-6 sm:p-8 rounded-2xl bg-amber-950/20 border border-amber-900/30 backdrop-blur-sm hover:border-amber-700/40 transition-colors"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                {section.title}
              </h2>
              <div className="text-stone-300 leading-relaxed text-sm sm:text-base">
                {section.content}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Important note */}
        <div className="mt-12 p-6 rounded-2xl border border-amber-800/30 bg-amber-950/30 text-xs sm:text-sm text-stone-400 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p>
            <strong className="text-amber-400">Important Notice:</strong> This is a general terms document governing access to educational resources provided by Learn with Ankit. For queries or legal notices, please reach out via our contact channels.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
