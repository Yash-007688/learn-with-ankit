"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldAlert,
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  LogOut,
  Plus,
  Trash2,
  CheckCircle2,
  Search,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  BarChart3,
  Calendar
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<{ email?: string; name?: string; role?: string } | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Initial mock state for Admin Dashboard
  const [courses, setCourses] = useState([
    { id: 1, title: "Classical Mechanics", students: 1240, price: "₹2,499", status: "Active" },
    { id: 2, title: "Electromagnetism & Waves", students: 980, price: "₹2,999", status: "Active" },
    { id: 3, title: "Thermodynamics & Heat", students: 860, price: "₹1,999", status: "Active" },
    { id: 4, title: "Optics & Light Physics", students: 730, price: "₹2,199", status: "Active" },
    { id: 5, title: "Modern & Quantum Physics", students: 620, price: "₹3,499", status: "Active" },
    { id: 6, title: "Fluid Mechanics", students: 510, price: "₹1,799", status: "Draft" },
  ]);

  const [students, setStudents] = useState([
    { id: 1, name: "Aarav Sharma", email: "aarav@example.com", course: "Classical Mechanics", date: "Today" },
    { id: 2, name: "Priya Verma", email: "priya.v@example.com", course: "Electromagnetism", date: "Yesterday" },
    { id: 3, name: "Rohan Gupta", email: "rohan99@example.com", course: "Modern Physics", date: "11 Oct 2026" },
    { id: 4, name: "Neha Patel", email: "neha.patel@example.com", course: "Thermodynamics", date: "10 Oct 2026" },
  ]);

  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCoursePrice, setNewCoursePrice] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Check login on mount from Supabase auth and sessionStorage
  useEffect(() => {
    const supabase = createClient();

    async function checkAuth() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const userEmail = (user.email || "").toLowerCase().trim();
          const { data: profile } = await supabase
            .from("profiles")
            .select("role, full_name")
            .eq("id", user.id)
            .maybeSingle();

          const role = profile?.role;
          const isKnownAdmin =
            userEmail === "yashrajmoolchandani@gmail.com" ||
            userEmail === "yashrajmmolchandani@gmail.com";

          if (role === "admin" || role === "dev" || isKnownAdmin) {
            setIsAuthenticated(true);
            setAdminUser({
              email: user.email,
              name: profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || "Admin",
              role: role || "admin",
            });
            sessionStorage.setItem("admin_auth", "true");
            sessionStorage.setItem("admin_email", userEmail);
            return;
          }
        }
      } catch (err) {
        console.error("Error checking Supabase auth:", err);
      }

      const authStatus = sessionStorage.getItem("admin_auth");
      if (authStatus === "true") {
        setIsAuthenticated(true);
        setAdminUser({
          email: sessionStorage.getItem("admin_email") || "admin",
          name: "Admin",
          role: "admin",
        });
      }
    }

    checkAuth();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = username.trim().toLowerCase();
    const validEmails = ["yashrajmmolchandani@gmail.com", "yashrajmoolchandani@gmail.com", "admin"];
    
    if (validEmails.includes(cleanUsername) && password === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      sessionStorage.setItem("admin_email", cleanUsername);
      setAdminUser({ email: cleanUsername, name: "Admin", role: "admin" });
      setLoginError("");
    } else {
      setLoginError("Invalid credentials! Enter valid admin email and password.");
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // ignore
    }
    setIsAuthenticated(false);
    setAdminUser(null);
    sessionStorage.removeItem("admin_auth");
    sessionStorage.removeItem("admin_email");
    setUsername("");
    setPassword("");
    window.location.href = "/";
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;
    const newCourse = {
      id: Date.now(),
      title: newCourseTitle,
      students: 0,
      price: newCoursePrice ? `₹${newCoursePrice}` : "₹1,999",
      status: "Active",
    };
    setCourses([...courses, newCourse]);
    setNewCourseTitle("");
    setNewCoursePrice("");
    setShowAddModal(false);
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  // If NOT authenticated, show Admin Login Portal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0500] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/15 blur-[140px] pointer-events-none rounded-full" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-stone-950/80 border border-amber-900/30 rounded-3xl p-8 backdrop-blur-xl relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          {/* Logo & Avatar */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 to-orange-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                  <Image
                    src="/ankit-sir.png"
                    alt="Ankit Sir"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 p-1 bg-amber-500 rounded-full text-black">
                <Lock className="w-3 h-3" />
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
            <p className="text-xs text-stone-400 mt-1">
              Authorized access only for Learn with Ankit management
            </p>
          </div>

          {/* Hint badge */}
          <div className="mb-6 p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 text-xs text-amber-300/90 text-center flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Email: <strong className="text-white">yashrajmmolchandani@gmail.com</strong> | Password: <strong className="text-white">admin</strong></span>
          </div>

          {loginError && (
            <div className="mb-6 p-3 rounded-xl bg-red-950/50 border border-red-800/50 text-xs text-red-300 text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                Admin Email / Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="yashrajmmolchandani@gmail.com"
                className="w-full px-4 py-3.5 rounded-xl bg-stone-900/80 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3.5 rounded-xl bg-stone-900/80 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 mt-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 font-bold text-black flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] cursor-pointer"
            >
              Sign In as Admin
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-stone-500 hover:text-amber-400 transition-colors">
              ← Return to public website
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  const totalStudents = courses.reduce((acc, c) => acc + c.students, 0);

  return (
    <div className="min-h-screen bg-[#0a0500] text-stone-200">
      {/* Top Admin Nav */}
      <header className="border-b border-amber-900/30 bg-[#0a0500]/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 to-orange-500">
              <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                <Image
                  src="/ankit-sir.png"
                  alt="Ankit Sir"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div>
              <span className="font-bold text-lg text-white block leading-tight">Learn with Ankit</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
                  ROLE: ADMIN
                </span>
                <span className="text-xs text-stone-400 hidden sm:inline">yashrajmmolchandani@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex text-xs px-3 py-1.5 rounded-lg border border-amber-900/40 text-stone-400 hover:text-white transition-colors"
            >
              View Live Website ↗
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl bg-red-950/40 border border-red-900/40 text-red-400 hover:bg-red-900/50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Overview Dashboard</h1>
            <p className="text-stone-400 text-sm mt-1">Manage active courses, enrollment numbers, and student inquiries.</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 transition-transform cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add New Course
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-900/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Total Enrolled</span>
              <Users className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white mb-1">{totalStudents.toLocaleString()}+</div>
            <span className="text-xs text-green-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +14% this month
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-900/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Total Courses</span>
              <BookOpen className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white mb-1">{courses.length}</div>
            <span className="text-xs text-amber-400">All physics streams active</span>
          </div>

          <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-900/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Est. Monthly Revenue</span>
              <DollarSign className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white mb-1">₹12.4 Lakh</div>
            <span className="text-xs text-green-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +22% vs last month
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-900/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Doubts Answered</span>
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white mb-1">98.8%</div>
            <span className="text-xs text-stone-400">Avg resolution time: 4 hrs</span>
          </div>
        </div>

        {/* Course Management Table */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Active Courses Management</h2>
            <span className="text-xs text-stone-400">{courses.length} listed</span>
          </div>

          <div className="rounded-2xl border border-amber-900/30 bg-stone-950/60 overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-stone-300">
                <thead className="bg-amber-950/40 text-stone-400 uppercase text-xs font-semibold tracking-wider border-b border-amber-900/30">
                  <tr>
                    <th className="px-6 py-4">Course Name</th>
                    <th className="px-6 py-4">Enrolled Students</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-900/20">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-amber-900/10 transition-colors">
                      <td className="px-6 py-4 font-semibold text-white">{course.title}</td>
                      <td className="px-6 py-4">{course.students.toLocaleString()} students</td>
                      <td className="px-6 py-4 text-amber-400 font-medium">{course.price}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          course.status === "Active"
                            ? "bg-green-950/60 border border-green-800/50 text-green-400"
                            : "bg-stone-800 text-stone-400"
                        }`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-2 rounded-lg text-stone-500 hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
                          title="Delete course"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Enrollments */}
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">Recent Enrollments</h2>
          <div className="rounded-2xl border border-amber-900/30 bg-stone-950/60 p-6 backdrop-blur-sm">
            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-amber-950/15 border border-amber-900/20 gap-2">
                  <div>
                    <h3 className="font-bold text-white text-sm">{student.name}</h3>
                    <p className="text-xs text-stone-400">{student.email} • Enrolled in <span className="text-amber-400 font-medium">{student.course}</span></p>
                  </div>
                  <span className="text-xs text-stone-500 flex items-center gap-1.5 self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5" />
                    {student.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-stone-950 border border-amber-900/40 rounded-3xl p-6 shadow-2xl"
          >
            <h3 className="text-xl font-bold text-white mb-2">Create New Course</h3>
            <p className="text-xs text-stone-400 mb-6">Add a new course curriculum module to the catalog.</p>

            <form onSubmit={handleAddCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  required
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  placeholder="e.g. Wave Optics Masterclass"
                  className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase mb-2">
                  Price in ₹ (INR)
                </label>
                <input
                  type="number"
                  value={newCoursePrice}
                  onChange={(e) => setNewCoursePrice(e.target.value)}
                  placeholder="2499"
                  className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-xl bg-stone-900 text-stone-300 font-semibold text-sm hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer"
                >
                  Save Course
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
