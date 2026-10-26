"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
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
  Calendar,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  User,
  Edit2,
  UploadCloud,
  FileText,
  Video,
  Layers,
  X,
  ExternalLink,
  Tag
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

interface Course {
  id: number;
  course_code: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  description: string;
  target_class: string;
  level: string;
  price: number;
  original_price?: number | null;
  thumbnail_url?: string | null;
  total_duration: string;
  total_lectures: number;
  status: "active" | "draft" | "archived";
  created_at: string;
}

interface FreeResource {
  id: number;
  title: string;
  category: string;
  target_class: string;
  file_url: string;
  file_size?: string | null;
  download_count: number;
  is_published: boolean;
  created_at: string;
}

interface PaidResource {
  id: number;
  course_id: number;
  course_name: string;
  title: string;
  resource_type: "video" | "pdf_notes" | "dpp" | "mock_test";
  video_url?: string | null;
  file_url?: string | null;
  chapter_order: number;
  is_preview: boolean;
  created_at: string;
}

interface QueryItem {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "contacted" | "resolved" | "spam";
  admin_notes?: string | null;
  created_at: string;
}

interface ProfileItem {
  id: string;
  full_name?: string | null;
  email?: string | null;
  role: "admin" | "dev" | "student";
  avatar_url?: string | null;
  class?: string | null;
  created_at?: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<{ email?: string; name?: string; role?: string } | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Navigation tab
  const [activeTab, setActiveTab] = useState<"courses" | "upload" | "queries" | "profiles">("courses");

  // Real Database States
  const [courses, setCourses] = useState<Course[]>([]);
  const [freeResources, setFreeResources] = useState<FreeResource[]>([]);
  const [paidResources, setPaidResources] = useState<PaidResource[]>([]);
  const [queries, setQueries] = useState<QueryItem[]>([]);
  const [profiles, setProfiles] = useState<ProfileItem[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Course Modal (Add / Edit)
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [courseForm, setCourseForm] = useState({
    title: "",
    course_code: "",
    subtitle: "",
    description: "",
    target_class: "Class 11",
    level: "Intermediate",
    is_free: false,
    price: "1999",
    original_price: "2999",
    total_duration: "40 Hours",
    total_lectures: "30",
    status: "active" as "active" | "draft",
  });

  // Resource Upload Modal (Free / Paid)
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<"free" | "paid">("paid");
  const [uploadForm, setUploadForm] = useState({
    title: "",
    // Free resource fields
    category: "Handwritten Notes",
    target_class: "Class 11",
    file_url: "",
    file_size: "2.5 MB",
    is_published: true,
    // Paid resource fields
    course_id: "",
    course_name: "",
    resource_type: "video" as "video" | "pdf_notes" | "dpp" | "mock_test",
    video_url: "",
    paid_file_url: "",
    chapter_order: "1",
    is_preview: false,
  });

  const [actionLoading, setActionLoading] = useState(false);

  // Fetch all live data from backend APIs
  const fetchAllData = async () => {
    setLoadingData(true);
    try {
      const [coursesRes, resourcesRes, queriesRes, dataRes] = await Promise.all([
        fetch("/api/admin/courses"),
        fetch("/api/admin/resources"),
        fetch("/api/admin/queries"),
        fetch("/api/admin/data"),
      ]);

      if (coursesRes.ok) {
        const cJson = await coursesRes.json();
        setCourses(cJson.courses || []);
      }
      if (resourcesRes.ok) {
        const rJson = await resourcesRes.json();
        setFreeResources(rJson.freeResources || []);
        setPaidResources(rJson.paidResources || []);
      }
      if (queriesRes.ok) {
        const qJson = await queriesRes.json();
        setQueries(qJson.queries || []);
      }
      if (dataRes.ok) {
        const dJson = await dataRes.json();
        setProfiles(dJson.profiles || []);
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoadingData(false);
    }
  };

  // Auth check
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
            userEmail === "yashrajmmolchandani@gmail.com" ||
            userEmail === "ankityadav.vicky@gmail.com";

          if (role === "admin" || role === "dev" || isKnownAdmin) {
            setIsAuthenticated(true);
            setAdminUser({
              email: user.email,
              name: profile?.full_name || user.user_metadata?.full_name || "Admin",
              role: role || "admin",
            });
            sessionStorage.setItem("admin_auth", "true");
            sessionStorage.setItem("admin_email", userEmail);
            fetchAllData();
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
        fetchAllData();
      }
    }

    checkAuth();
  }, []);

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = username.trim().toLowerCase();
    const validEmails = ["yashrajmmolchandani@gmail.com", "yashrajmoolchandani@gmail.com", "ankityadav.vicky@gmail.com", "admin"];

    if (validEmails.includes(cleanUsername) && password === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      sessionStorage.setItem("admin_email", cleanUsername);
      setAdminUser({ email: cleanUsername, name: "Admin", role: "admin" });
      setLoginError("");
      fetchAllData();
    } else {
      setLoginError("Invalid credentials! Enter valid admin email and password.");
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    try {
      await supabase.auth.signOut();
    } catch {}
    setIsAuthenticated(false);
    setAdminUser(null);
    sessionStorage.removeItem("admin_auth");
    sessionStorage.removeItem("admin_email");
    window.location.href = "/";
  };

  // Open modal to add a fresh course
  const handleOpenAddCourse = () => {
    setEditingCourseId(null);
    setCourseForm({
      title: "",
      course_code: "",
      subtitle: "",
      description: "",
      target_class: "Class 11",
      level: "Intermediate",
      is_free: false,
      price: "1999",
      original_price: "2999",
      total_duration: "40 Hours",
      total_lectures: "30",
      status: "active",
    });
    setShowCourseModal(true);
  };

  // Open modal to edit existing course
  const handleOpenEditCourse = (course: Course) => {
    setEditingCourseId(course.id);
    const isFree = Number(course.price) === 0;
    setCourseForm({
      title: course.title,
      course_code: course.course_code || "",
      subtitle: course.subtitle || "",
      description: course.description || "",
      target_class: course.target_class || "Class 11",
      level: course.level || "Intermediate",
      is_free: isFree,
      price: isFree ? "0" : course.price.toString(),
      original_price: course.original_price ? course.original_price.toString() : "",
      total_duration: course.total_duration || "40 Hours",
      total_lectures: course.total_lectures ? course.total_lectures.toString() : "0",
      status: course.status as "active" | "draft",
    });
    setShowCourseModal(true);
  };

  // Save Course (Create or Update)
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title.trim()) return;
    setActionLoading(true);

    try {
      const method = editingCourseId ? "PUT" : "POST";
      const payload: any = {
        title: courseForm.title,
        course_code: courseForm.course_code,
        subtitle: courseForm.subtitle,
        description: courseForm.description,
        target_class: courseForm.target_class,
        level: courseForm.level,
        is_free: courseForm.is_free,
        price: courseForm.is_free ? 0 : Number(courseForm.price || 0),
        original_price: courseForm.is_free ? null : Number(courseForm.original_price || 0),
        total_duration: courseForm.total_duration,
        total_lectures: Number(courseForm.total_lectures || 0),
        status: courseForm.status,
      };

      if (editingCourseId) {
        payload.id = editingCourseId;
      }

      const res = await fetch("/api/admin/courses", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowCourseModal(false);
        fetchAllData();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save course");
      }
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Course
  const handleDeleteCourse = async (id: number) => {
    if (!confirm("Are you sure you want to delete this course? Associated paid resources may also be removed.")) return;
    try {
      const res = await fetch(`/api/admin/courses?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setCourses((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Uploaded Resource (Free or Paid)
  const handleSaveResource = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      let payload: any = { upload_type: uploadType, title: uploadForm.title };

      if (uploadType === "free") {
        payload = {
          ...payload,
          category: uploadForm.category,
          target_class: uploadForm.target_class,
          file_url: uploadForm.file_url,
          file_size: uploadForm.file_size,
          is_published: uploadForm.is_published,
        };
      } else {
        const selectedCourse = courses.find((c) => c.id.toString() === uploadForm.course_id);
        payload = {
          ...payload,
          course_id: uploadForm.course_id,
          course_name: selectedCourse ? selectedCourse.title : uploadForm.course_name,
          resource_type: uploadForm.resource_type,
          video_url: uploadForm.video_url || null,
          file_url: uploadForm.paid_file_url || null,
          chapter_order: Number(uploadForm.chapter_order || 1),
          is_preview: uploadForm.is_preview,
        };
      }

      const res = await fetch("/api/admin/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowUploadModal(false);
        setUploadForm({
          title: "",
          category: "Handwritten Notes",
          target_class: "Class 11",
          file_url: "",
          file_size: "2.5 MB",
          is_published: true,
          course_id: courses[0]?.id?.toString() || "",
          course_name: courses[0]?.title || "",
          resource_type: "video",
          video_url: "",
          paid_file_url: "",
          chapter_order: "1",
          is_preview: false,
        });
        fetchAllData();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to upload resource");
      }
    } catch (err: any) {
      alert(err.message || "Failed to upload");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Resource
  const handleDeleteResource = async (id: number, type: "free" | "paid") => {
    if (!confirm(`Are you sure you want to delete this ${type} resource?`)) return;
    try {
      const res = await fetch(`/api/admin/resources?id=${id}&type=${type}`, { method: "DELETE" });
      if (res.ok) {
        if (type === "free") {
          setFreeResources((prev) => prev.filter((r) => r.id !== id));
        } else {
          setPaidResources((prev) => prev.filter((r) => r.id !== id));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update Query Status
  const handleUpdateQueryStatus = async (id: number, status: "new" | "contacted" | "resolved") => {
    try {
      const res = await fetch("/api/admin/queries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setQueries((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Query
  const handleDeleteQuery = async (id: number) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/admin/queries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setQueries((prev) => prev.filter((q) => q.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // If NOT authenticated, show Login Portal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0500] flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/15 blur-[140px] pointer-events-none rounded-full" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-stone-950/80 border border-amber-900/30 rounded-3xl p-8 backdrop-blur-xl relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 to-orange-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                  <Image src="/ankit-sir.png" alt="Ankit Sir" fill className="object-cover object-top" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 p-1 bg-amber-500 rounded-full text-black">
                <Lock className="w-3 h-3" />
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin & Dev Portal</h1>
            <p className="text-xs text-stone-400 mt-1">
              Authorized access for Learn with Ankit management
            </p>
          </div>

          <form onSubmit={handleManualLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase mb-2">Email / Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin or your email"
                className="w-full px-4 py-3 rounded-xl bg-stone-900/80 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-stone-900/80 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && <p className="text-xs text-red-400 bg-red-950/40 p-2.5 rounded-lg border border-red-900/40">{loginError}</p>}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm hover:from-amber-400 hover:to-orange-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-stone-500 hover:text-amber-400 transition-colors inline-flex items-center gap-1">
              ← Return to Home Page
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Calculate real total resources
  const totalResourcesCount = freeResources.length + paidResources.length;

  return (
    <div className="min-h-screen bg-[#0a0500] text-stone-200">
      {/* Header Bar */}
      <header className="border-b border-amber-900/30 bg-stone-950/80 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 min-h-[4rem] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-black relative border border-amber-500/40 shrink-0">
                <Image src="/ankit-sir.png" alt="Ankit Sir" fill className="object-cover object-top" />
              </div>
              <span className="font-bold text-base sm:text-lg text-white">Learn with Ankit</span>
            </Link>
            <span className="hidden sm:inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase shrink-0">
              Admin & Dev Portal
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-stone-400 hidden lg:inline">
              Logged in as <strong className="text-white">{adminUser?.name || adminUser?.email || "Admin"}</strong>
            </span>
            <Link
              href="/"
              target="_blank"
              className="text-xs font-medium px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-colors shrink-0"
            >
              <span className="hidden sm:inline">View Live Website</span>
              <span className="sm:hidden">Live</span> ↗
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-900/40 text-red-400 hover:bg-red-900/50 transition-colors cursor-pointer shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Section & Action Buttons */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Admin Operations Center</h1>
            <p className="text-stone-400 text-xs sm:text-sm mt-1">
              Manage live courses (Free & Paid), upload chapter resources, and respond to student inquiries.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                if (courses.length === 0) {
                  alert("Please add at least one course first before uploading paid resources!");
                }
                setUploadForm((prev) => ({
                  ...prev,
                  course_id: courses[0]?.id?.toString() || "",
                  course_name: courses[0]?.title || "",
                }));
                setShowUploadModal(true);
              }}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-amber-700/40 text-amber-300 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <UploadCloud className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">Upload Resource</span>
            </button>
            <button
              onClick={handleOpenAddCourse}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 transition-transform cursor-pointer"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span className="truncate">Create Course</span>
            </button>
          </div>
        </div>

        {/* Real Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-900/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Active Courses</span>
              <BookOpen className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white mb-1">{courses.length}</div>
            <span className="text-xs text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Free & Paid Courses in DB
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-900/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Uploaded Resources</span>
              <UploadCloud className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white mb-1">{totalResourcesCount}</div>
            <span className="text-xs text-stone-400">
              {freeResources.length} Free • {paidResources.length} Paid
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-900/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Student Queries</span>
              <MessageSquare className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white mb-1">{queries.length}</div>
            <span className="text-xs text-green-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {queries.filter((q) => q.status === "new").length} New Unread
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-900/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Registered Users</span>
              <Users className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white mb-1">{profiles.length}</div>
            <span className="text-xs text-amber-400">Live profiles connected</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-amber-900/30 mb-8 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "courses"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "text-stone-400 hover:text-white hover:bg-stone-900/50"
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            Courses Catalog ({courses.length})
          </button>

          <button
            onClick={() => setActiveTab("upload")}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "upload"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "text-stone-400 hover:text-white hover:bg-stone-900/50"
            }`}
          >
            <UploadCloud className="w-4 h-4 shrink-0" />
            Uploaded Resources ({totalResourcesCount})
          </button>

          <button
            onClick={() => setActiveTab("queries")}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "queries"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "text-stone-400 hover:text-white hover:bg-stone-900/50"
            }`}
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            Student Inquiries ({queries.length})
          </button>

          <button
            onClick={() => setActiveTab("profiles")}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "profiles"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "text-stone-400 hover:text-white hover:bg-stone-900/50"
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            Registered Profiles ({profiles.length})
          </button>
        </div>

        {/* TAB 1: COURSES MANAGEMENT */}
        {activeTab === "courses" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-xl font-bold text-white tracking-tight">Active Courses Management</h2>
              <button
                onClick={handleOpenAddCourse}
                className="text-xs font-bold px-3.5 py-2 rounded-lg bg-amber-500 text-black hover:bg-amber-400 flex items-center justify-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Course
              </button>
            </div>

            {courses.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-amber-900/40 bg-stone-950/40 p-12 text-center">
                <BookOpen className="w-10 h-10 text-amber-500/50 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">No Courses Created Yet</h3>
                <p className="text-xs text-stone-400 max-w-sm mx-auto mb-4">
                  Create your first physics course! You can make it 100% Free or Paid with a custom price tag.
                </p>
                <button
                  onClick={handleOpenAddCourse}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm cursor-pointer"
                >
                  Create First Course
                </button>
              </div>
            ) : (
              <div className="rounded-2xl border border-amber-900/30 bg-stone-950/60 overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left text-sm text-stone-300">
                    <thead className="bg-amber-950/40 text-stone-400 uppercase text-xs font-semibold tracking-wider border-b border-amber-900/30">
                      <tr>
                        <th className="px-6 py-4">Course Title & Code</th>
                        <th className="px-6 py-4">Target Class & Level</th>
                        <th className="px-6 py-4">Course Type / Price</th>
                        <th className="px-6 py-4">Lectures & Duration</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-900/20">
                      {courses.map((course) => {
                        const isFree = Number(course.price) === 0;
                        return (
                          <tr key={course.id} className="hover:bg-amber-900/10 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-semibold text-white">{course.title}</div>
                              <div className="text-xs text-amber-500/80 font-mono mt-0.5">{course.course_code}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-stone-300 text-xs font-medium">{course.target_class}</div>
                              <div className="text-[11px] text-stone-500">{course.level}</div>
                            </td>
                            <td className="px-6 py-4">
                              {isFree ? (
                                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-950/60 text-green-400 border border-green-800/40">
                                  FREE COURSE
                                </span>
                              ) : (
                                <div>
                                  <span className="text-amber-400 font-bold text-sm">₹{course.price}</span>
                                  {course.original_price && (
                                    <span className="text-stone-500 text-xs line-through ml-2">₹{course.original_price}</span>
                                  )}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 text-xs text-stone-400">
                              {course.total_lectures || 0} Lectures • {course.total_duration}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase ${
                                  course.status === "active"
                                    ? "bg-green-950/50 text-green-400 border border-green-800/40"
                                    : "bg-stone-800 text-stone-400"
                                }`}
                              >
                                {course.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2 shrink-0">
                                <button
                                  onClick={() => handleOpenEditCourse(course)}
                                  className="p-2 rounded-lg text-stone-400 hover:text-amber-400 hover:bg-amber-950/40 transition-colors shrink-0 cursor-pointer"
                                  title="Edit course"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteCourse(course.id)}
                                  className="p-2 rounded-lg text-stone-400 hover:text-red-400 hover:bg-red-950/40 transition-colors shrink-0 cursor-pointer"
                                  title="Delete course"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: UPLOADED RESOURCES (FREE & PAID) */}
        {activeTab === "upload" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Upload & Curriculum Resources</h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Attach video lectures & DPPs to specific courses, or publish open free resources for all students.
                </p>
              </div>
              <button
                onClick={() => {
                  setUploadForm((prev) => ({
                    ...prev,
                    course_id: courses[0]?.id?.toString() || "",
                    course_name: courses[0]?.title || "",
                  }));
                  setShowUploadModal(true);
                }}
                className="text-xs font-bold px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.3)] self-start sm:self-auto shrink-0"
              >
                <Plus className="w-4 h-4" /> Upload New Resource
              </button>
            </div>

            {/* Paid Course Resources Table */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Video className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-white text-base">Course Enrolled Resources (Paid Content)</h3>
                <span className="text-xs text-stone-500">({paidResources.length} items)</span>
              </div>

              {paidResources.length === 0 ? (
                <div className="p-8 rounded-2xl border border-dashed border-amber-900/30 bg-stone-950/40 text-center text-xs text-stone-500">
                  No paid resources uploaded yet. Click &quot;Upload New Resource&quot; and choose a course from the dropdown.
                </div>
              ) : (
                <div className="rounded-2xl border border-amber-900/30 bg-stone-950/60 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] text-left text-xs text-stone-300">
                      <thead className="bg-amber-950/30 text-stone-400 uppercase text-[11px] font-semibold border-b border-amber-900/30">
                        <tr>
                          <th className="px-5 py-3">Resource Title</th>
                          <th className="px-5 py-3">Belongs to Course</th>
                          <th className="px-5 py-3">Type</th>
                          <th className="px-5 py-3">Order</th>
                          <th className="px-5 py-3">Free Preview?</th>
                          <th className="px-5 py-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-amber-900/20">
                        {paidResources.map((res) => (
                          <tr key={res.id} className="hover:bg-amber-900/10">
                            <td className="px-5 py-3.5 font-semibold text-white">
                              {res.title}
                              {res.video_url && (
                                <a href={res.video_url} target="_blank" rel="noreferrer" className="text-[10px] text-amber-400 flex items-center gap-1 mt-0.5 hover:underline">
                                  <ExternalLink className="w-2.5 h-2.5" /> Watch Video URL
                                </a>
                              )}
                            </td>
                            <td className="px-5 py-3.5">
                              <span className="px-2 py-0.5 rounded-md bg-stone-900 border border-stone-800 text-stone-300 font-medium">
                                {res.course_name}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 uppercase font-mono text-[10px] text-amber-400">
                              {res.resource_type}
                            </td>
                            <td className="px-5 py-3.5 font-mono text-stone-400">Ch. #{res.chapter_order}</td>
                            <td className="px-5 py-3.5">
                              {res.is_preview ? (
                                <span className="text-green-400 text-[10px] uppercase font-bold">Yes (Demo)</span>
                              ) : (
                                <span className="text-stone-500 text-[10px] uppercase">Locked</span>
                              )}
                            </td>
                            <td className="px-5 py-3.5 text-right">
                              <button
                                onClick={() => handleDeleteResource(res.id, "paid")}
                                className="p-1.5 rounded-lg text-stone-500 hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer shrink-0"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Free Public Resources Table */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-green-400" />
                <h3 className="font-bold text-white text-base">Free Public Downloads (Open Access)</h3>
                <span className="text-xs text-stone-500">({freeResources.length} items)</span>
              </div>

              {freeResources.length === 0 ? (
                <div className="p-8 rounded-2xl border border-dashed border-amber-900/30 bg-stone-950/40 text-center text-xs text-stone-500">
                  No free resources uploaded yet. Click &quot;Upload New Resource&quot; and choose Free Resource.
                </div>
              ) : (
                <div className="rounded-2xl border border-amber-900/30 bg-stone-950/60 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] text-left text-xs text-stone-300">
                      <thead className="bg-amber-950/30 text-stone-400 uppercase text-[11px] font-semibold border-b border-amber-900/30">
                        <tr>
                          <th className="px-5 py-3">Resource Title</th>
                          <th className="px-5 py-3">Category</th>
                          <th className="px-5 py-3">Target Class</th>
                          <th className="px-5 py-3">File Size</th>
                          <th className="px-5 py-3">Status</th>
                          <th className="px-5 py-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-amber-900/20">
                        {freeResources.map((res) => (
                          <tr key={res.id} className="hover:bg-amber-900/10">
                            <td className="px-5 py-3.5 font-semibold text-white">
                              {res.title}
                              <a href={res.file_url} target="_blank" rel="noreferrer" className="text-[10px] text-amber-400 flex items-center gap-1 mt-0.5 hover:underline">
                                <ExternalLink className="w-2.5 h-2.5" /> File Link
                              </a>
                            </td>
                            <td className="px-5 py-3.5 text-stone-300">{res.category}</td>
                            <td className="px-5 py-3.5 text-stone-400">{res.target_class}</td>
                            <td className="px-5 py-3.5 font-mono text-stone-500">{res.file_size || "1.5 MB"}</td>
                            <td className="px-5 py-3.5">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-green-950/50 text-green-400 border border-green-800/40">
                                Published
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-right">
                              <button
                                onClick={() => handleDeleteResource(res.id, "free")}
                                className="p-1.5 rounded-lg text-stone-500 hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer shrink-0"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: STUDENT INQUIRIES */}
        {activeTab === "queries" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Student Inquiries & Leads</h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Direct messages submitted by students from the website contact form.
                </p>
              </div>
              <span className="text-xs text-stone-400 self-start sm:self-auto">{queries.length} total messages</span>
            </div>

            {queries.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-amber-900/40 bg-stone-950/40 p-12 text-center text-xs text-stone-500">
                No inquiries submitted yet. When students submit the contact form on the home page, inquiries appear here.
              </div>
            ) : (
              <div className="space-y-4">
                {queries.map((q) => (
                  <div key={q.id} className="p-4 sm:p-5 rounded-2xl bg-amber-950/15 border border-amber-900/30 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-white text-sm">{q.name}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          {q.subject}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                            q.status === "new"
                              ? "bg-blue-950/60 text-blue-400 border border-blue-800/40"
                              : q.status === "contacted"
                              ? "bg-yellow-950/60 text-yellow-400 border border-yellow-800/40"
                              : "bg-green-950/60 text-green-400 border border-green-800/40"
                          }`}
                        >
                          {q.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-2">
                        <span className="text-[11px] text-stone-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(q.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <button
                          onClick={() => handleDeleteQuery(q.id)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-red-400 hover:bg-red-950/30 transition-colors ml-2 cursor-pointer shrink-0"
                          title="Delete message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-stone-300 bg-stone-900/70 p-3 rounded-xl border border-amber-900/20 leading-relaxed break-words">
                      {q.message}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-amber-900/20">
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
                        <a href={`mailto:${q.email}`} className="flex items-center gap-1.5 text-amber-300 hover:underline break-all">
                          <Mail className="w-3.5 h-3.5 shrink-0" /> {q.email}
                        </a>
                        <a href={`tel:${q.phone_number}`} className="flex items-center gap-1.5 text-stone-300 hover:text-white">
                          <Phone className="w-3.5 h-3.5 shrink-0" /> {q.phone_number}
                        </a>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                        {q.status !== "contacted" && (
                          <button
                            onClick={() => handleUpdateQueryStatus(q.id, "contacted")}
                            className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-yellow-950/40 text-yellow-400 border border-yellow-800/30 hover:bg-yellow-900/50 cursor-pointer"
                          >
                            Mark Contacted
                          </button>
                        )}
                        {q.status !== "resolved" && (
                          <button
                            onClick={() => handleUpdateQueryStatus(q.id, "resolved")}
                            className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-green-950/40 text-green-400 border border-green-800/30 hover:bg-green-900/50 cursor-pointer"
                          >
                            Mark Resolved
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: REGISTERED PROFILES */}
        {activeTab === "profiles" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Registered Profiles & Users</h2>
                <p className="text-xs text-stone-400 mt-0.5">Live user accounts created through Google OAuth or signup.</p>
              </div>
              <span className="text-xs text-stone-400 self-start sm:self-auto">{profiles.length} total users</span>
            </div>

            {profiles.length === 0 ? (
              <div className="p-8 rounded-2xl border border-dashed border-amber-900/30 bg-stone-950/40 text-center text-xs text-stone-500">
                No profiles found yet.
              </div>
            ) : (
              <div className="space-y-3">
                {profiles.map((p) => (
                  <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-amber-950/15 border border-amber-900/20 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-amber-900/40 border border-amber-500/40 shrink-0 relative flex items-center justify-center">
                        {p.avatar_url ? (
                          <img src={p.avatar_url} alt={p.full_name || "User"} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <User className="w-5 h-5 text-amber-300" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-sm">{p.full_name || "Student"}</h3>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                              p.role === "admin"
                                ? "bg-red-950/60 text-red-400 border border-red-800/40"
                                : p.role === "dev"
                                ? "bg-purple-950/60 text-purple-400 border border-purple-800/40"
                                : "bg-green-950/60 text-green-400 border border-green-800/40"
                            }`}
                          >
                            {p.role}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400">{p.email || "No email"} • {p.class || "Class 11"}</p>
                      </div>
                    </div>
                    <span className="text-xs text-stone-500 flex items-center gap-1.5 self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5" />
                      {p.created_at ? new Date(p.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Recent"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL 1: ADD / EDIT COURSE */}
      {showCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-stone-950 border border-amber-900/40 rounded-3xl p-5 sm:p-6 shadow-2xl my-8 relative"
          >
            <button
              onClick={() => setShowCourseModal(false)}
              className="absolute right-4 top-4 p-1 rounded-lg text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">
              {editingCourseId ? "Edit Physics Course" : "Create New Physics Course"}
            </h3>
            <p className="text-xs text-stone-400 mb-5">
              Set title, pricing, and curriculum parameters. Connects directly to Supabase.
            </p>

            <form onSubmit={handleSaveCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase mb-1.5">Course Title</label>
                <input
                  type="text"
                  required
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  placeholder="e.g. Classical Mechanics Masterclass"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase mb-1.5">Course Code</label>
                  <input
                    type="text"
                    value={courseForm.course_code}
                    onChange={(e) => setCourseForm({ ...courseForm, course_code: e.target.value })}
                    placeholder="e.g. PHY-11-MEC"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase mb-1.5">Target Class</label>
                  <select
                    value={courseForm.target_class}
                    onChange={(e) => setCourseForm({ ...courseForm, target_class: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-amber-900/40 text-white text-sm"
                  >
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                    <option value="Dropper">Dropper</option>
                    <option value="All">All Students</option>
                  </select>
                </div>
              </div>

              {/* Course Type: Free or Paid Toggle */}
              <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-900/40 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div>
                    <span className="text-xs font-bold text-white uppercase block">Course Pricing Type</span>
                    <span className="text-[11px] text-stone-400">Choose whether this course is completely Free or Paid</span>
                  </div>
                  <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-xl border border-stone-800 self-start sm:self-auto shrink-0">
                    <button
                      type="button"
                      onClick={() => setCourseForm({ ...courseForm, is_free: true, price: "0" })}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        courseForm.is_free ? "bg-green-500 text-black shadow" : "text-stone-400 hover:text-white"
                      }`}
                    >
                      Free
                    </button>
                    <button
                      type="button"
                      onClick={() => setCourseForm({ ...courseForm, is_free: false, price: "1999" })}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        !courseForm.is_free ? "bg-amber-500 text-black shadow" : "text-stone-400 hover:text-white"
                      }`}
                    >
                      Paid
                    </button>
                  </div>
                </div>

                {!courseForm.is_free && (
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-amber-900/30">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">Selling Price (₹)</label>
                      <input
                        type="number"
                        required
                        value={courseForm.price}
                        onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                        placeholder="1999"
                        className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-amber-900/40 text-white text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">Original Price (₹)</label>
                      <input
                        type="number"
                        value={courseForm.original_price}
                        onChange={(e) => setCourseForm({ ...courseForm, original_price: e.target.value })}
                        placeholder="2999"
                        className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-amber-900/40 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase mb-1.5">Total Lectures</label>
                  <input
                    type="number"
                    value={courseForm.total_lectures}
                    onChange={(e) => setCourseForm({ ...courseForm, total_lectures: e.target.value })}
                    placeholder="35"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-amber-900/40 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase mb-1.5">Total Duration</label>
                  <input
                    type="text"
                    value={courseForm.total_duration}
                    onChange={(e) => setCourseForm({ ...courseForm, total_duration: e.target.value })}
                    placeholder="45 Hours"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-amber-900/40 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase mb-1.5">Description</label>
                <textarea
                  rows={3}
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  placeholder="Course highlights, JEE/NEET concepts, and practice problems..."
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-amber-900/40 text-white text-sm resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-amber-900/30">
                <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">
                  <label className="text-xs text-stone-300 font-semibold whitespace-nowrap">Publish Status:</label>
                  <select
                    value={courseForm.status}
                    onChange={(e) => setCourseForm({ ...courseForm, status: e.target.value as "active" | "draft" })}
                    className="px-3 py-1.5 rounded-lg bg-stone-900 border border-amber-900/40 text-xs text-white"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setShowCourseModal(false)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-stone-400 hover:text-white border border-stone-800 sm:border-0 text-xs font-semibold text-center cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs cursor-pointer shadow-lg disabled:opacity-50 text-center"
                  >
                    {actionLoading ? "Saving..." : editingCourseId ? "Update Course" : "Save Course"}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL 2: UPLOAD RESOURCE (FREE OR PAID WITH COURSE DROPDOWN) */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-stone-950 border border-amber-900/40 rounded-3xl p-5 sm:p-6 shadow-2xl my-8 relative"
          >
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute right-4 top-4 p-1 rounded-lg text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">Upload Study Material</h3>
            <p className="text-xs text-stone-400 mb-5">
              Add chapter lectures for enrolled students, or open PDF resources for everyone.
            </p>

            {/* Toggle Free vs Paid Upload */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 p-1.5 bg-stone-900 rounded-xl border border-stone-800 mb-5">
              <button
                type="button"
                onClick={() => setUploadType("paid")}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  uploadType === "paid" ? "bg-amber-500 text-black shadow" : "text-stone-400 hover:text-white"
                }`}
              >
                <Video className="w-3.5 h-3.5 shrink-0" />
                <span>Paid Course Content</span>
              </button>
              <button
                type="button"
                onClick={() => setUploadType("free")}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  uploadType === "free" ? "bg-green-500 text-black shadow" : "text-stone-400 hover:text-white"
                }`}
              >
                <FileText className="w-3.5 h-3.5 shrink-0" />
                <span>Free Public Download</span>
              </button>
            </div>

            <form onSubmit={handleSaveResource} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase mb-1.5">Resource Title</label>
                <input
                  type="text"
                  required
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  placeholder={
                    uploadType === "paid"
                      ? "e.g. Chapter 1: Newton's Laws of Motion - Part 1"
                      : "e.g. Kinematics Formula Cheat Sheet PDF"
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              {/* PAID CONTENT SPECIFIC FIELDS */}
              {uploadType === "paid" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 uppercase mb-1.5">
                      Select Course (Dropdown)
                    </label>
                    {courses.length === 0 ? (
                      <div className="p-3 rounded-xl bg-red-950/40 border border-red-900/40 text-red-400 text-xs">
                        No courses found. Please create a course first!
                      </div>
                    ) : (
                      <select
                        required
                        value={uploadForm.course_id}
                        onChange={(e) => {
                          const c = courses.find((x) => x.id.toString() === e.target.value);
                          setUploadForm({
                            ...uploadForm,
                            course_id: e.target.value,
                            course_name: c ? c.title : "",
                          });
                        }}
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-amber-900/40 text-white text-sm"
                      >
                        {courses.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.title} ({course.course_code})
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 uppercase mb-1.5">Resource Type</label>
                      <select
                        value={uploadForm.resource_type}
                        onChange={(e) => setUploadForm({ ...uploadForm, resource_type: e.target.value as any })}
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-amber-900/40 text-white text-sm"
                      >
                        <option value="video">Video Lecture</option>
                        <option value="pdf_notes">PDF Notes</option>
                        <option value="dpp">Daily Practice Paper (DPP)</option>
                        <option value="mock_test">Mock Test</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 uppercase mb-1.5">Chapter / Lecture Order</label>
                      <input
                        type="number"
                        value={uploadForm.chapter_order}
                        onChange={(e) => setUploadForm({ ...uploadForm, chapter_order: e.target.value })}
                        placeholder="1"
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-amber-900/40 text-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 uppercase mb-1.5">
                      Video URL / Stream Link (Optional)
                    </label>
                    <input
                      type="url"
                      value={uploadForm.video_url}
                      onChange={(e) => setUploadForm({ ...uploadForm, video_url: e.target.value })}
                      placeholder="https://youtube.com/watch?v=... or Vimeo"
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm"
                    />
                  </div>

                  {/* Google Drive / Cloud File Input */}
                  <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-900/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center text-xs">
                          📁
                        </div>
                        <span className="text-xs font-bold text-white uppercase">Google Drive / File URL</span>
                      </div>
                      {uploadForm.paid_file_url?.includes("drive.google.com") && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                          Google Drive Detected
                        </span>
                      )}
                    </div>

                    <input
                      type="url"
                      value={uploadForm.paid_file_url}
                      onChange={(e) => setUploadForm({ ...uploadForm, paid_file_url: e.target.value })}
                      placeholder="Paste Google Drive share link, PDF URL, or Cloud link..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-xs"
                    />

                    {uploadForm.paid_file_url && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-stone-400 pt-1">
                        <span>Make sure sharing is set to: &quot;Anyone with link can view&quot;</span>
                        <a
                          href={uploadForm.paid_file_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-amber-400 hover:underline flex items-center gap-1 font-semibold self-start sm:self-auto"
                        >
                          Test Link <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="is_preview"
                      checked={uploadForm.is_preview}
                      onChange={(e) => setUploadForm({ ...uploadForm, is_preview: e.target.checked })}
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                    <label htmlFor="is_preview" className="text-xs text-stone-300">
                      Allow as Free Demo Preview (Students can watch without paying)
                    </label>
                  </div>
                </>
              )}

              {/* FREE RESOURCE SPECIFIC FIELDS */}
              {uploadType === "free" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 uppercase mb-1.5">Category</label>
                      <select
                        value={uploadForm.category}
                        onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-amber-900/40 text-white text-sm"
                      >
                        <option value="Formula Sheets">Formula Sheets</option>
                        <option value="Handwritten Notes">Handwritten Notes</option>
                        <option value="PYQ Papers">PYQ Papers</option>
                        <option value="DPPs">Daily Practice Problems</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 uppercase mb-1.5">Target Class</label>
                      <select
                        value={uploadForm.target_class}
                        onChange={(e) => setUploadForm({ ...uploadForm, target_class: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-amber-900/40 text-white text-sm"
                      >
                        <option value="Class 11">Class 11</option>
                        <option value="Class 12">Class 12</option>
                        <option value="All">All Students</option>
                      </select>
                    </div>
                  </div>

                  {/* Google Drive / PDF URL Field for Free Resource */}
                  <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-900/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center text-xs">
                          📁
                        </div>
                        <span className="text-xs font-bold text-white uppercase">Google Drive Link / PDF URL</span>
                      </div>
                      {uploadForm.file_url?.includes("drive.google.com") && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                          Google Drive Detected
                        </span>
                      )}
                    </div>

                    <input
                      type="url"
                      required
                      value={uploadForm.file_url}
                      onChange={(e) => setUploadForm({ ...uploadForm, file_url: e.target.value })}
                      placeholder="Paste Google Drive share link (e.g. https://drive.google.com/file/d/...)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-amber-900/40 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-xs"
                    />

                    {uploadForm.file_url && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-stone-400 pt-1">
                        <span>Ensure Google Drive link access is &quot;Anyone with the link can view&quot;</span>
                        <a
                          href={uploadForm.file_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-amber-400 hover:underline flex items-center gap-1 font-semibold self-start sm:self-auto"
                        >
                          Test Link <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 uppercase mb-1.5">File Size Display</label>
                    <input
                      type="text"
                      value={uploadForm.file_size}
                      onChange={(e) => setUploadForm({ ...uploadForm, file_size: e.target.value })}
                      placeholder="e.g. 2.4 MB"
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-amber-900/40 text-white text-sm"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-amber-900/30">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-stone-400 hover:text-white border border-stone-800 sm:border-0 text-xs font-semibold text-center cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs cursor-pointer shadow-lg disabled:opacity-50 text-center"
                >
                  {actionLoading ? "Uploading..." : "Publish Resource"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
