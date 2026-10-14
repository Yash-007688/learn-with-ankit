-- ==============================================================================
-- LEARN WITH ANKIT - COMPLETE DATABASE MIGRATION SCRIPT
-- Run this script directly in the Supabase SQL Editor.
-- ==============================================================================

-- 1. PROFILES TABLE (Students & Admins)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone_number VARCHAR(20) UNIQUE,
    avatar_url TEXT,
    class VARCHAR(50) NOT NULL DEFAULT 'Class 11', -- 'Class 11', 'Class 12', 'Dropper'
    target_exam VARCHAR(50) DEFAULT 'JEE',          -- 'JEE Main', 'JEE Advanced', 'NEET', 'Boards'
    role VARCHAR(20) DEFAULT 'student',             -- 'student', 'admin'
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
    id BIGSERIAL PRIMARY KEY,
    course_code VARCHAR(50) UNIQUE NOT NULL,       -- e.g. 'PHY-11-MEC'
    title TEXT NOT NULL,                           -- e.g. 'Classical Mechanics'
    slug TEXT UNIQUE NOT NULL,                     -- e.g. 'classical-mechanics'
    subtitle TEXT,
    description TEXT NOT NULL,
    target_class VARCHAR(50) NOT NULL,             -- 'Class 11', 'Class 12', 'All'
    level VARCHAR(50) DEFAULT 'Intermediate',      -- 'Beginner', 'Intermediate', 'Advanced'
    price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    original_price NUMERIC(10,2),
    thumbnail_url TEXT,
    total_duration VARCHAR(50) DEFAULT '40 Hours',
    total_lectures INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'draft',            -- 'draft', 'active', 'archived'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. FREE RESOURCES TABLE (Open Public Downloads)
CREATE TABLE IF NOT EXISTS public.free_resources (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,                           -- e.g. 'Kinematics Formula Cheat Sheet'
    category VARCHAR(50) NOT NULL,                 -- 'Formula Sheets', 'Handwritten Notes', 'PYQ Papers', 'DPPs'
    target_class VARCHAR(50) NOT NULL,             -- 'Class 11', 'Class 12', 'All'
    file_url TEXT NOT NULL,
    file_size VARCHAR(20),                         -- e.g. '2.4 MB'
    download_count INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PAID RESOURCES TABLE (Course No & Course Name Specified)
CREATE TABLE IF NOT EXISTS public.paid_resources (
    id BIGSERIAL PRIMARY KEY,
    course_id BIGINT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE, -- Course No
    course_name TEXT NOT NULL,                                                -- Course Name
    title TEXT NOT NULL,
    resource_type VARCHAR(30) NOT NULL,            -- 'video', 'pdf_notes', 'dpp', 'mock_test'
    video_url TEXT,
    file_url TEXT,
    chapter_order INTEGER DEFAULT 1,
    is_preview BOOLEAN DEFAULT FALSE,              -- True if free demo allowed
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PAYMENTS TABLE (Transactions & Orders)
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    course_id BIGINT REFERENCES public.courses(id) ON DELETE SET NULL,
    amount NUMERIC(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    gateway VARCHAR(50) NOT NULL,                  -- 'Razorpay', 'Cashfree', 'Stripe', 'UPI'
    payment_order_id TEXT UNIQUE NOT NULL,
    transaction_id TEXT UNIQUE,
    status VARCHAR(30) DEFAULT 'pending',          -- 'pending', 'success', 'failed', 'refunded'
    plan_tier VARCHAR(50) NOT NULL,                -- 'Single Topic', 'Full Batch', 'Rankers Pro'
    expires_at TIMESTAMPTZ,                        -- Expiry date of course access
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. QUERIES TABLE (Contact Us / Student Counseling Leads)
CREATE TABLE IF NOT EXISTS public.queries (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email TEXT NOT NULL,
    subject VARCHAR(100) NOT NULL,                 -- 'JEE Preparation', 'NEET Batch', etc.
    message TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'new',              -- 'new', 'contacted', 'resolved', 'spam'
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TESTIMONIALS TABLE (Student Reviews & Ranks)
CREATE TABLE IF NOT EXISTS public.testimonials (
    id BIGSERIAL PRIMARY KEY,
    student_name TEXT NOT NULL,
    exam_tag VARCHAR(100) NOT NULL,                -- e.g. 'JEE Advanced AIR 420', 'NEET 680/720'
    avatar_url TEXT,
    review_text TEXT NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    is_featured BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON public.profiles(phone_number);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_paid_resources_course_id ON public.paid_resources(course_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);
CREATE INDEX IF NOT EXISTS idx_queries_status ON public.queries(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON public.testimonials(is_featured);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.free_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paid_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policy (Users can read and update their own profile)
CREATE POLICY "Public profiles are viewable by owner" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- 2. Courses Policy (Anyone can read active courses)
CREATE POLICY "Courses are viewable by everyone" ON public.courses
    FOR SELECT USING (status = 'active' OR auth.role() = 'service_role');

-- 3. Free Resources Policy (Anyone can read published free resources)
CREATE POLICY "Free resources are viewable by everyone" ON public.free_resources
    FOR SELECT USING (is_published = TRUE);

-- 4. Testimonials Policy (Anyone can read featured testimonials)
CREATE POLICY "Testimonials are viewable by everyone" ON public.testimonials
    FOR SELECT USING (is_featured = TRUE);

-- 5. Queries Policy (Anyone can insert a contact query)
CREATE POLICY "Anyone can submit a query" ON public.queries
    FOR INSERT WITH CHECK (TRUE);

-- 6. Payments Policy (Users can only see their own transactions)
CREATE POLICY "Users can view own payments" ON public.payments
    FOR SELECT USING (auth.uid() = user_id);

-- 7. Paid Resources Policy (Students who paid for the course or previews can view)
CREATE POLICY "Paid resources viewable by enrolled students" ON public.paid_resources
    FOR SELECT USING (
        is_preview = TRUE OR EXISTS (
            SELECT 1 FROM public.payments
            WHERE payments.user_id = auth.uid()
              AND payments.course_id = paid_resources.course_id
              AND payments.status = 'success'
              AND (payments.expires_at IS NULL OR payments.expires_at > NOW())
        )
    );
