-- Run this once in Supabase SQL Editor for project ovjbnwhrurjcifrmmoxv.
-- Table: git_updates  |  used by the home-page footer

CREATE TABLE IF NOT EXISTS public.git_updates (
    id BIGSERIAL PRIMARY KEY,
    github_change_no VARCHAR(40) NOT NULL,
    github_change_date DATE NOT NULL,
    github_change_time TIME NOT NULL,
    updated_by TEXT NOT NULL,
    commit_message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT git_updates_change_no_not_blank CHECK (LENGTH(TRIM(github_change_no)) > 0)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_git_updates_change_no
    ON public.git_updates(github_change_no);

CREATE INDEX IF NOT EXISTS idx_git_updates_latest
    ON public.git_updates(github_change_date DESC, github_change_time DESC);

ALTER TABLE public.git_updates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Git updates are viewable by everyone" ON public.git_updates;
CREATE POLICY "Git updates are viewable by everyone"
    ON public.git_updates
    FOR SELECT
    USING (TRUE);

GRANT SELECT ON TABLE public.git_updates TO anon, authenticated;
GRANT ALL ON TABLE public.git_updates TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.git_updates_id_seq TO anon, authenticated, service_role;

INSERT INTO public.git_updates (
    github_change_no,
    github_change_date,
    github_change_time,
    updated_by,
    commit_message
)
VALUES (
    '960a7a9',
    DATE '2026-10-17',
    TIME '22:14:57',
    'amitshrivastva@buildingvoid.com',
    'Add Google Drive upload integration, and organize Courses and Free Resources pages'
)
ON CONFLICT (github_change_no) DO UPDATE SET
    github_change_date = EXCLUDED.github_change_date,
    github_change_time = EXCLUDED.github_change_time,
    updated_by = EXCLUDED.updated_by,
    commit_message = EXCLUDED.commit_message;
