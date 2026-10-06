"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, FlaskConical, GraduationCap, Zap, Orbit } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden min-h-[calc(100vh-5rem)]">
      {/* Hero Section */}
      <section className="w-full relative py-20 lg:py-32 overflow-hidden flex flex-col items-center">
        {/* Animated Background Orbits */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
           <motion.div 
             animate={{ rotate: 360 }} 
             transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
             className="absolute w-[600px] h-[600px] rounded-full border border-blue-500/30"
           />
           <motion.div 
             animate={{ rotate: -360 }} 
             transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
             className="absolute w-[400px] h-[400px] rounded-full border border-indigo-500/40"
           />
           <motion.div 
             animate={{ rotate: 360 }} 
             transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
             className="absolute w-[200px] h-[200px] rounded-full border border-purple-500/50"
           />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-8 font-medium text-sm">
              <Orbit className="w-4 h-4" /> Discover the Laws of the Universe
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Master Physics <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                with Ankit Yadav
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-400 mb-10 leading-relaxed">
              Step into the fascinating world of quantum mechanics, classical kinematics, and thermodynamics. Let's make physics interactive, intuitive, and fun!
            </p>
            
            <div className="flex justify-center gap-6 flex-col sm:flex-row">
              <Link 
                href="/courses" 
                className="px-8 py-4 rounded-full text-lg font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all flex items-center justify-center gap-2"
              >
                Start Learning <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/experiments" 
                className="px-8 py-4 rounded-full text-lg font-bold text-slate-300 bg-slate-900 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <FlaskConical className="w-5 h-5" /> Interactive Labs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Learn with Ankit Sir?</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Interactive Concepts",
                description: "Visualize complex physics theories with our custom-built interactive labs and real-world analogies.",
                icon: <Zap className="w-8 h-8 text-yellow-400" />
              },
              {
                title: "Structured Curriculum",
                description: "From high school basics to advanced competitive exams (JEE/NEET), find the exact roadmap you need.",
                icon: <BookOpen className="w-8 h-8 text-blue-400" />
              },
              {
                title: "Expert Mentorship",
                description: "Learn directly from Ankit Yadav, an experienced educator dedicated to clearing your fundamental doubts.",
                icon: <GraduationCap className="w-8 h-8 text-purple-400" />
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-blue-500/50 transition-all text-center flex flex-col items-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-slate-700 transition-colors shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
