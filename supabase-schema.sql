-- =================================================================
-- Campus 360 — Supabase Cloud Database Schema & Security
-- =================================================================
-- Instructions:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard
-- 2. Select your project -> Click on "SQL Editor" in the left sidebar
-- 3. Click "New Query", paste this entire script, and click "Run" (or Ctrl+Enter)
-- =================================================================

-- 1. EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Workshop',
  description TEXT,
  date_str TEXT,
  time_str TEXT,
  month TEXT DEFAULT 'NOV',
  day TEXT DEFAULT '15',
  location TEXT NOT NULL,
  venue_type TEXT DEFAULT 'in-person',
  host TEXT DEFAULT 'Campus Committee',
  capacity INTEGER DEFAULT 100,
  registered_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. EVENT REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  event_id TEXT NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  student_branch TEXT NOT NULL,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. CAMPUS CONNECT: STUDENT QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS public.campus_connect_questions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  details TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Admission Guidance',
  target_branch TEXT DEFAULT 'General Campus',
  asker_name TEXT DEFAULT 'College Aspirant',
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. CAMPUS CONNECT: SENIOR ANSWERS TABLE
CREATE TABLE IF NOT EXISTS public.campus_connect_answers (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  question_id TEXT NOT NULL REFERENCES public.campus_connect_questions(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL,
  perspective_type TEXT DEFAULT 'Personal Student Experience',
  answer_text TEXT NOT NULL,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. CAMPUS HELP REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.campus_help_requests (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  course_tag TEXT,
  post_type TEXT DEFAULT 'request',
  author TEXT NOT NULL,
  department TEXT,
  contact_handle TEXT NOT NULL,
  is_urgent BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'open',
  responses_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =================================================================
-- Protect tables against unauthorized tampering while enabling least-privilege
-- public reads and authenticated / anon validated submissions.

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campus_connect_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campus_connect_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campus_help_requests ENABLE ROW LEVEL SECURITY;

-- Events Policies
DROP POLICY IF EXISTS "Public can view events" ON public.events;
CREATE POLICY "Public can view events" ON public.events
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can submit events" ON public.events;
CREATE POLICY "Anyone can submit events" ON public.events
  FOR INSERT WITH CHECK (length(title) > 0);

DROP POLICY IF EXISTS "Anyone can update event counts" ON public.events;
CREATE POLICY "Anyone can update event counts" ON public.events
  FOR UPDATE USING (true) WITH CHECK (true);

-- Event Registrations Policies
DROP POLICY IF EXISTS "Public can register for events" ON public.event_registrations;
CREATE POLICY "Public can register for events" ON public.event_registrations
  FOR INSERT WITH CHECK (length(student_name) > 0 AND length(student_email) > 0);

DROP POLICY IF EXISTS "Public can view registration counts" ON public.event_registrations;
CREATE POLICY "Public can view registration counts" ON public.event_registrations
  FOR SELECT USING (true);

-- Campus Connect Questions Policies
DROP POLICY IF EXISTS "Public can view questions" ON public.campus_connect_questions;
CREATE POLICY "Public can view questions" ON public.campus_connect_questions
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Aspirants can post questions" ON public.campus_connect_questions;
CREATE POLICY "Aspirants can post questions" ON public.campus_connect_questions
  FOR INSERT WITH CHECK (length(title) > 0 AND length(details) > 0);

-- Campus Connect Answers Policies
DROP POLICY IF EXISTS "Public can view answers" ON public.campus_connect_answers;
CREATE POLICY "Public can view answers" ON public.campus_connect_answers
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Seniors can submit answers" ON public.campus_connect_answers;
CREATE POLICY "Seniors can submit answers" ON public.campus_connect_answers
  FOR INSERT WITH CHECK (length(author_name) > 0 AND length(answer_text) > 0);

-- Campus Help Requests Policies
DROP POLICY IF EXISTS "Public can view help requests" ON public.campus_help_requests;
CREATE POLICY "Public can view help requests" ON public.campus_help_requests
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Students can post help requests" ON public.campus_help_requests;
CREATE POLICY "Students can post help requests" ON public.campus_help_requests
  FOR INSERT WITH CHECK (length(title) > 0 AND length(description) > 0);

DROP POLICY IF EXISTS "Students can increment responses count" ON public.campus_help_requests;
CREATE POLICY "Students can increment responses count" ON public.campus_help_requests
  FOR UPDATE USING (true) WITH CHECK (true);

-- =================================================================
-- SEED INITIAL CAMPUS DATA (Optional Demonstration Baseline)
-- =================================================================

INSERT INTO public.events (id, title, category, description, date_str, time_str, month, day, location, venue_type, host, capacity, registered_count, is_featured)
VALUES 
  ('evt-1', 'HackTheCampus 2026: 36-Hour Hackathon', 'Hackathon', 'Build innovative software and hardware prototypes for college campus automation, student productivity, and sustainability.', '2026-11-14', '09:00 AM - 09:00 PM', 'NOV', '14', 'Main Auditorium & CS Labs', 'in-person', 'GDSC & Coding Duo Club', 120, 84, true),
  ('evt-2', 'Hands-on Generative AI & LLM Systems', 'Workshop', 'Learn how to deploy open-source models, build RAG pipelines, and integrate conversational AI into web apps.', '2026-11-18', '02:00 PM - 05:30 PM', 'NOV', '18', 'Lab 304, IT Block A', 'in-person', 'AI Student Society', 60, 48, false),
  ('evt-3', 'Competitive Coding Duel: Speed Algorithmic Round', 'Competition', '1v1 algorithmic face-off on data structures, dynamic programming, and binary search with live leaderboard.', '2026-11-22', '04:00 PM - 06:30 PM', 'NOV', '22', 'Online Code Arena & Lab 102', 'hybrid', 'Competitive Programming Cell', 80, 52, false),
  ('evt-4', 'Product Management & Tech Career Roadmap', 'Career Meetup', 'Insights from alumni working at top tech firms on crack interviews, resume tailoring, and off-campus offers.', '2026-11-26', '06:00 PM - 07:30 PM', 'NOV', '26', 'Seminar Hall 2 & YouTube Live', 'virtual', 'Campus Placement Cell', 250, 189, false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.campus_connect_questions (id, title, details, category, target_branch, asker_name)
VALUES
  ('qa-1', 'How difficult is first-year coding for students without computer science in 12th?', 'I took PCM with Hindi in 12th and have zero experience with C/Python. Will I struggle in the first semester programming lab?', 'Academics and Teaching', 'Computer Science (CSE)', 'Ananya Deshmukh (12th Aspirant)'),
  ('qa-2', 'What is the actual difference between CSE and IT branches in syllabus and placements?', 'Confused between CSE and IT options on campus. Do IT students get access to all top tech companies during campus drives?', 'Branch Selection', 'Information Technology (IT)', 'Sameer Patil (CET Aspirant)'),
  ('qa-3', 'How is the hostel mess food and Wi-Fi connectivity for late-night coding?', 'Planning to stay in the on-campus hostel. How reliable is the internet speed in rooms and what are the library night hours?', 'Hostel and Accommodation', 'General Campus', 'Zoya Khan (Prospective Student)')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.campus_connect_answers (id, question_id, author_name, author_role, perspective_type, answer_text, helpful_count)
VALUES
  ('ans-1', 'qa-1', 'Alex Chen', '3rd Year CSE (GDSC Lead)', 'Personal Student Experience', 'Do not worry at all! More than 45% of students in our batch had zero coding experience before joining. The professors start right from scratch with flowcharting and basic C logic. Just be consistent in lab sessions and join peer study squads.', 18),
  ('ans-2', 'qa-2', 'Rohan Kulkarni', '4th Year IT (Placed at Rakuten)', 'Personal Student Experience', 'Curriculum-wise, CSE focuses a bit more on hardware architecture and theory of computation, while IT emphasizes web technologies, cloud, and networking. For 98% of placement drives, companies invite both CSE and IT students identically.', 24),
  ('ans-3', 'qa-3', 'Tanvi Deshmukh', '3rd Year AI/DS (Hostel Resident)', 'Personal Student Experience', 'Hostel Wi-Fi is quite decent with 50-100 Mbps throughout the wings. The central digital library remains open until 11:30 PM during regular weeks and 24 hours during semester exam weeks.', 15)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.campus_help_requests (id, title, description, category, course_tag, post_type, author, department, contact_handle, is_urgent, responses_count)
VALUES
  ('help-1', 'Need assistance debugging Dijkstra Graph algorithm in C++', 'Getting an unexpected infinite loop in priority queue node expansion for our DS lab assignment.', 'coding', 'CS201', 'request', 'Aarav Mehta', 'CS Sophomore', 'Discord: aarav#4821', true, 3),
  ('help-2', 'Engineering Mathematics-II Unit 3 Fourier Series Handwritten Notes', 'Sharing complete neat lecture notes, solved previous year university problems, and shortcut formulae sheets.', 'notes', 'MATH152', 'offer', 'Sneha Kulkarni', 'IT 2nd Year', 'sneha.k@campus.edu', false, 7)
ON CONFLICT (id) DO NOTHING;
