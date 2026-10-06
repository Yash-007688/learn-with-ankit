"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, BarChart, ArrowRight } from "lucide-react";
import Link from "next/link";

const COURSES = [
  {
    title: "Classical Mechanics",
    description: "Master Newton's laws, kinematics, and dynamics. Perfect for Class 11 and JEE/NEET aspirants.",
    level: "Intermediate",
    duration: "40 Hours",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Electromagnetism",
    description: "Dive into electric fields, magnetic forces, and Maxwell's equations. Comprehensive Class 12 syllabus.",
    level: "Advanced",
    duration: "50 Hours",
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Quantum Physics Fundamentals",
    description: "An intuitive introduction to the quantum realm, wave-particle duality, and modern physics.",
    level: "Beginner",
    duration: "25 Hours",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Thermodynamics",
    description: "Understand the laws of heat, work, and energy transfer. Essential for competitive exams.",
    level: "Intermediate",
    duration: "30 Hours",
    color: "from-orange-500 to-red-500",
  }
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-6"
        >
          Explore Courses
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-400 max-w-2xl mx-auto"
        >
          Structured learning paths designed to build your core concepts from the ground up.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {COURSES.map((course, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="relative group bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-700 transition-all"
          >
            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${course.color}`} />
            
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">{course.title}</h3>
              <p className="text-slate-400 mb-8 min-h-[3rem]">{course.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-slate-300 mb-8">
                <div className="flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-slate-500" />
                  {course.level}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  {course.duration}
                </div>
              </div>

              <Link 
                href="/login"
                className="inline-flex items-center gap-2 text-white font-medium hover:text-blue-400 transition-colors group-hover:gap-3"
              >
                Enroll Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Subtle background glow effect on hover */}
            <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r ${course.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 rounded-full pointer-events-none`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
