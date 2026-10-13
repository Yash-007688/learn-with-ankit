"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { Shield, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "1",
      title: "1. Who We Are",
      content: (
        <>
          <p className="mb-3">
            Learn with Ankit provides physics-learning content, courses, lectures, mentorship, doubt-solving support, and related educational services for students preparing for school examinations, JEE, NEET, and other academic goals.
          </p>
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-900/40 text-stone-300 text-sm space-y-1">
            <p>• <strong className="text-white">Platform:</strong> Learn with Ankit</p>
            <p>• <strong className="text-white">Website:</strong> <a href="https://learn-with-ankit-one.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">https://learn-with-ankit-one.vercel.app/</a></p>
            <p>• <strong className="text-white">Privacy Support:</strong> Contact via official website channels</p>
          </div>
        </>
      ),
    },
    {
      id: "2",
      title: "2. Information We Collect",
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-white mb-2">Information you provide:</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-300">
              <li>Name, email address, phone number, and account login details;</li>
              <li>Class, exam-preparation preferences, course selections, and learning interests;</li>
              <li>Messages, questions, feedback, reviews, or support requests;</li>
              <li>Information provided when registering for a course, event, session, or community feature;</li>
              <li>Payment and billing information when purchasing a paid Service (handled securely by payment gateways).</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Information collected automatically:</h3>
            <p className="text-stone-300">
              Device and technical data such as IP address, browser type, operating system, referring pages, approximate location, access timestamps, and usage behavior through cookies or server logs.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Information from third parties:</h3>
            <p className="text-stone-300">
              Data received from authentication providers (like Google OAuth), payment processors, communication tools, or analytics providers.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "3",
      title: "3. How We Use Information",
      content: (
        <ul className="list-disc pl-5 space-y-2 text-stone-300">
          <li>Create, authenticate, and manage student accounts;</li>
          <li>Deliver courses, video lectures, problem sets, mentorship, and doubt resolutions;</li>
          <li>Process enrollments, payments, and account transactions;</li>
          <li>Communicate lecture schedules, important curriculum updates, security notices, and support replies;</li>
          <li>Personalize learning progress and optimize user platform experience;</li>
          <li>Prevent fraud, abuse, unauthorized access, and protect platform security;</li>
          <li>Comply with applicable legal requirements and enforce our Terms & Conditions.</li>
        </ul>
      ),
    },
    {
      id: "4",
      title: "4. Cookies and Similar Technologies",
      content: (
        <p>
          We use essential cookies and local session storage to keep you securely signed in, preserve user settings, and operate core platform functions. You can manage or disable cookies via your browser settings, though some interactive features may require cookies to operate properly.
        </p>
      ),
    },
    {
      id: "5",
      title: "5. How We Share Information",
      content: (
        <>
          <p className="mb-3">We may share information with:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-stone-300 mb-3">
            <li>Trusted cloud hosting, database, authentication, and technical service providers;</li>
            <li>Regulated payment gateways to securely handle transactions;</li>
            <li>Instructors, mentors, and academic support staff to deliver educational support;</li>
            <li>Legal or regulatory authorities when strictly required by applicable law.</li>
          </ul>
          <p className="text-amber-400/90 font-medium text-sm">
            We do not sell personal student information to third parties.
          </p>
        </>
      ),
    },
    {
      id: "6",
      title: "6. Third-Party Services and Links",
      content: (
        <p>
          Our platform links to external communication and media platforms such as WhatsApp, YouTube, and Instagram. Any interaction on those platforms is governed by their respective privacy terms and security policies.
        </p>
      ),
    },
    {
      id: "7",
      title: "7. Data Retention",
      content: (
        <p>
          We retain personal data for as long as necessary to provide active course access, maintain academic records, resolve support inquiries, and comply with statutory requirements. Data no longer needed is securely removed or anonymized.
        </p>
      ),
    },
    {
      id: "8",
      title: "8. Data Security",
      content: (
        <p>
          We implement industry-standard technical and administrative safeguards to protect your personal information against unauthorized access, alteration, or disclosure. Users are advised to keep their login credentials confidential.
        </p>
      ),
    },
    {
      id: "9",
      title: "9. Your Choices and Rights",
      content: (
        <p>
          Depending on your location and jurisdiction, you may have rights to access, update, correct, or request deletion of your personal account information. You can reach out through our official support channel to make such requests.
        </p>
      ),
    },
    {
      id: "10",
      title: "10. Children’s Privacy",
      content: (
        <p>
          Our courses are tailored for school and competitive examination students. Minors should use the platform under the consent, supervision, and involvement of a parent or legal guardian.
        </p>
      ),
    },
    {
      id: "11",
      title: "11. International Data Transfers",
      content: (
        <p>
          Cloud hosting and database infrastructure may store or process data on secure servers across global regions with appropriate transfer security safeguards.
        </p>
      ),
    },
    {
      id: "12",
      title: "12. Marketing Communications",
      content: (
        <p>
          We may send course announcements, study resources, or schedule alerts. You can opt out of promotional communications at any time while continuing to receive essential account and security notices.
        </p>
      ),
    },
    {
      id: "13",
      title: "13. Changes to this Privacy Policy",
      content: (
        <p>
          We may update this Privacy Policy from time to time. Revised policies will be published on this page along with the updated date at the top.
        </p>
      ),
    },
    {
      id: "14",
      title: "14. Contact Us",
      content: (
        <p>
          For privacy questions, account deletion requests, or support inquiries, please reach out via the official WhatsApp or email links available across the Learn with Ankit website.
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0500] text-stone-200">
      {/* Warm Ambient Glow */}
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
            <Lock className="w-3.5 h-3.5" />
            Privacy & Data Protection
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-stone-400 text-sm">
            Last updated: <span className="text-amber-400 font-medium">13 October 2026</span>
          </p>
          <p className="mt-4 text-stone-300 leading-relaxed">
            This Privacy Policy explains how Learn with Ankit (&ldquo;Learn with Ankit,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, shares, and protects information when you visit our website, create an account, enroll in our courses, or interact with our educational services.
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

        {/* Notice badge */}
        <div className="mt-12 p-6 rounded-2xl border border-amber-800/30 bg-amber-950/30 text-xs sm:text-sm text-stone-400 flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p>
            <strong className="text-amber-400">Student Trust Commitment:</strong> At Learn with Ankit, we prioritize the confidentiality and safety of our learners&apos; study records and personal credentials.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
