/**
 * =================================================================
 * Campus 360 — Supabase Cloud Database Client & Service Adapter
 * =================================================================
 * 
 * HOW TO CONFIGURE YOUR SUPABASE PROJECT:
 * 1. Log into your Supabase Dashboard: https://supabase.com/dashboard
 * 2. Select your project and navigate to: Project Settings -> API
 * 3. Copy your "Project URL" and paste it into `DEFAULT_SUPABASE_URL` below.
 * 4. Copy your "Project API keys" -> `anon` `public` key and paste into `DEFAULT_SUPABASE_ANON_KEY`.
 * 
 * NOTE: Never use the `service_role` secret key in frontend code!
 * 
 * You can also paste your credentials directly in the live website by clicking
 * the "Local DB / Supabase" badge in the navigation bar!
 */

const DEFAULT_SUPABASE_URL = "https://your-project.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "your-anon-publishable-key";

// Retrieve saved credentials (from env.js, localStorage, or fallback defaults)
function getSupabaseCredentials() {
  const envUrl = (typeof window !== 'undefined' && window.__ENV && window.__ENV.SUPABASE_URL) ? window.__ENV.SUPABASE_URL : null;
  const envKey = (typeof window !== 'undefined' && window.__ENV && window.__ENV.SUPABASE_ANON_KEY) ? window.__ENV.SUPABASE_ANON_KEY : null;

  const storedUrl = localStorage.getItem('campus360_supabase_url') || localStorage.getItem('dyp_supabase_url');
  const storedKey = localStorage.getItem('campus360_supabase_anon_key') || localStorage.getItem('dyp_supabase_anon_key');

  const url = (storedUrl && storedUrl.trim().length > 0)
    ? storedUrl.trim()
    : ((envUrl && envUrl.trim().length > 0 && !envUrl.includes('your-project.supabase.co')) ? envUrl.trim() : DEFAULT_SUPABASE_URL);

  const anonKey = (storedKey && storedKey.trim().length > 0)
    ? storedKey.trim()
    : ((envKey && envKey.trim().length > 0 && !envKey.includes('your-anon-publishable-key')) ? envKey.trim() : DEFAULT_SUPABASE_ANON_KEY);

  return { url, anonKey };
}

let _supabaseClientInstance = null;
let _connectionTestCache = { tested: false, success: false, lastTestedAt: null, message: '' };

const CampusSupabase = {
  getCredentials: getSupabaseCredentials,

  saveCredentials: (url, anonKey) => {
    if (url) {
      localStorage.setItem('campus360_supabase_url', url.trim());
      localStorage.setItem('dyp_supabase_url', url.trim());
    }
    if (anonKey) {
      localStorage.setItem('campus360_supabase_anon_key', anonKey.trim());
      localStorage.setItem('dyp_supabase_anon_key', anonKey.trim());
    }
    _supabaseClientInstance = null;
    _connectionTestCache = { tested: false, success: false, lastTestedAt: null, message: '' };
    return CampusSupabase.getClient();
  },

  clearCredentials: () => {
    localStorage.removeItem('campus360_supabase_url');
    localStorage.removeItem('campus360_supabase_anon_key');
    localStorage.removeItem('dyp_supabase_url');
    localStorage.removeItem('dyp_supabase_anon_key');
    _supabaseClientInstance = null;
    _connectionTestCache = { tested: false, success: false, lastTestedAt: null, message: '' };
  },

  isConfigured: () => {
    const { url, anonKey } = getSupabaseCredentials();
    const isValidUrl = url && url.startsWith('https://') && !url.includes('your-project.supabase.co');
    const isValidKey = anonKey && anonKey.length > 20 && !anonKey.includes('your-anon-publishable-key');
    return Boolean(isValidUrl && isValidKey);
  },

  getClient: () => {
    if (_supabaseClientInstance) return _supabaseClientInstance;

    if (!CampusSupabase.isConfigured()) return null;

    if (typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
      try {
        const { url, anonKey } = getSupabaseCredentials();
        _supabaseClientInstance = window.supabase.createClient(url, anonKey);
        return _supabaseClientInstance;
      } catch (err) {
        console.error('[Campus 360] Supabase client initialization error:', err);
        return null;
      }
    }
    return null;
  },

  // Test actual connectivity with the Supabase database
  testConnection: async () => {
    if (!CampusSupabase.isConfigured()) {
      _connectionTestCache = {
        tested: true,
        success: false,
        lastTestedAt: Date.now(),
        message: 'Awaiting Supabase Project URL and anon publishable key.'
      };
      return _connectionTestCache;
    }

    const client = CampusSupabase.getClient();
    if (!client) {
      _connectionTestCache = {
        tested: true,
        success: false,
        lastTestedAt: Date.now(),
        message: 'Supabase JS SDK not loaded yet. Check internet connection.'
      };
      return _connectionTestCache;
    }

    try {
      // Perform lightweight ping to verify connection and table existence
      const { data, error } = await client
        .from('events')
        .select('id')
        .limit(1);

      if (error) {
        _connectionTestCache = {
          tested: true,
          success: false,
          lastTestedAt: Date.now(),
          message: `Connected to API, but table query returned error: ${error.message} (Did you run supabase-schema.sql?)`
        };
      } else {
        _connectionTestCache = {
          tested: true,
          success: true,
          lastTestedAt: Date.now(),
          message: 'Successfully connected to live Supabase database!'
        };
      }
    } catch (networkErr) {
      _connectionTestCache = {
        tested: true,
        success: false,
        lastTestedAt: Date.now(),
        message: `Network error connecting to Supabase: ${networkErr.message || networkErr}`
      };
    }
    return _connectionTestCache;
  },

  getStatus: () => {
    const configured = CampusSupabase.isConfigured();
    const { url } = getSupabaseCredentials();

    if (configured) {
      const isVerified = _connectionTestCache.tested && _connectionTestCache.success;
      return {
        mode: 'cloud',
        badge: isVerified ? '🟢 Supabase Connected' : '🟡 Supabase Configured',
        description: isVerified 
          ? `Live synchronization active with ${url}`
          : `Configured for ${url}. Click to test connection.`,
        url: url
      };
    } else {
      return {
        mode: 'local',
        badge: '🟠 Local Storage (Supabase Ready)',
        description: 'Running in Local Storage mode. Ready for Supabase credentials.',
        url: null
      };
    }
  },

  // =================================================================
  // FEATURE 1 & 2: EVENTS & EVENT REGISTRATIONS
  // =================================================================

  fetchEvents: async () => {
    const client = CampusSupabase.getClient();
    if (!client) return null;

    try {
      const { data, error } = await client
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (Array.isArray(data) && data.length > 0) {
        return data.map(evt => ({
          id: evt.id,
          title: evt.title,
          category: evt.category || 'Workshop',
          description: evt.description || '',
          dateStr: evt.date_str || '',
          time: evt.time_str || '',
          month: evt.month || 'NOV',
          day: evt.day || '15',
          location: evt.location || 'Campus Auditorium',
          venueType: evt.venue_type || 'in-person',
          host: evt.host || 'Campus Committee',
          capacity: evt.capacity || 100,
          registeredCount: evt.registered_count || 0,
          isFeatured: evt.is_featured || false,
          isRegistered: false
        }));
      }
      return [];
    } catch (e) {
      console.warn('[CampusSupabase] fetchEvents fallback:', e);
      return null;
    }
  },

  createEvent: async (eventData) => {
    const client = CampusSupabase.getClient();
    if (!client) return null;

    try {
      const payload = {
        title: eventData.title,
        category: eventData.category,
        description: eventData.description,
        date_str: eventData.dateStr || eventData.date,
        time_str: eventData.time,
        month: eventData.month,
        day: eventData.day,
        location: eventData.location,
        venue_type: eventData.venueType,
        host: eventData.host,
        capacity: eventData.capacity || 100,
        registered_count: 0
      };

      const { data, error } = await client
        .from('events')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (e) {
      console.error('[CampusSupabase] createEvent error:', e);
      throw e;
    }
  },

  registerForEvent: async (registrationData) => {
    const client = CampusSupabase.getClient();
    if (!client) return null;

    try {
      // 1. Insert registration record
      const { data, error } = await client
        .from('event_registrations')
        .insert([{
          event_id: registrationData.eventId,
          student_name: registrationData.studentName,
          student_email: registrationData.studentEmail,
          student_branch: registrationData.studentBranch,
          status: 'confirmed'
        }])
        .select()
        .single();

      if (error) throw error;

      // 2. Increment registered_count on event
      if (registrationData.currentCount !== undefined) {
        await client
          .from('events')
          .update({ registered_count: (registrationData.currentCount || 0) + 1 })
          .eq('id', registrationData.eventId);
      }

      return data;
    } catch (e) {
      console.error('[CampusSupabase] registerForEvent error:', e);
      throw e;
    }
  },

  // =================================================================
  // FEATURE 3: STUDENT CONNECT (Q&A)
  // =================================================================

  fetchQuestions: async () => {
    const client = CampusSupabase.getClient();
    if (!client) return null;

    try {
      // Fetch questions with nested answers
      const { data, error } = await client
        .from('campus_connect_questions')
        .select(`
          *,
          campus_connect_answers (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (Array.isArray(data) && data.length > 0) {
        return data.map(q => ({
          id: q.id,
          title: q.title,
          details: q.details,
          category: q.category,
          targetBranch: q.target_branch,
          asker: q.asker_name || 'College Aspirant',
          timestamp: new Date(q.created_at).toLocaleDateString(),
          answers: (q.campus_connect_answers || []).map(ans => ({
            id: ans.id,
            author: ans.author_name,
            role: ans.author_role,
            type: ans.perspective_type || 'Personal Student Experience',
            text: ans.answer_text,
            helpfulCount: ans.helpful_count || 1
          }))
        }));
      }
      return [];
    } catch (e) {
      console.warn('[CampusSupabase] fetchQuestions fallback:', e);
      return null;
    }
  },

  askQuestion: async (questionData) => {
    const client = CampusSupabase.getClient();
    if (!client) return null;

    try {
      const payload = {
        title: questionData.title,
        details: questionData.details,
        category: questionData.category,
        target_branch: questionData.targetBranch,
        asker_name: questionData.asker || 'College Aspirant',
        status: 'open'
      };

      const { data, error } = await client
        .from('campus_connect_questions')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (e) {
      console.error('[CampusSupabase] askQuestion error:', e);
      throw e;
    }
  },

  submitAnswer: async (answerData) => {
    const client = CampusSupabase.getClient();
    if (!client) return null;

    try {
      const payload = {
        question_id: answerData.questionId,
        author_name: answerData.author,
        author_role: answerData.role,
        perspective_type: answerData.type || 'Personal Student Experience',
        answer_text: answerData.text,
        helpful_count: 1
      };

      const { data, error } = await client
        .from('campus_connect_answers')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (e) {
      console.error('[CampusSupabase] submitAnswer error:', e);
      throw e;
    }
  },

  // =================================================================
  // FEATURE 4: CAMPUS HELP REQUESTS
  // =================================================================

  fetchHelpRequests: async () => {
    const client = CampusSupabase.getClient();
    if (!client) return null;

    try {
      const { data, error } = await client
        .from('campus_help_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (Array.isArray(data) && data.length > 0) {
        return data.map(req => ({
          id: req.id,
          type: req.post_type || 'request',
          category: req.category || 'general',
          courseTag: req.course_tag || '',
          title: req.title,
          description: req.description,
          author: req.author,
          initials: (req.author || 'ST').substring(0, 2).toUpperCase(),
          department: req.department || 'General',
          contact: req.contact_handle,
          isUrgent: req.is_urgent || false,
          timestamp: new Date(req.created_at).toLocaleDateString(),
          timestampMs: new Date(req.created_at).getTime(),
          responsesCount: req.responses_count || 0,
          status: req.status || 'open'
        }));
      }
      return [];
    } catch (e) {
      console.warn('[CampusSupabase] fetchHelpRequests fallback:', e);
      return null;
    }
  },

  postHelpRequest: async (postData) => {
    const client = CampusSupabase.getClient();
    if (!client) return null;

    try {
      const payload = {
        title: postData.title,
        description: postData.description,
        category: postData.category,
        course_tag: postData.courseTag || '',
        post_type: postData.type || 'request',
        author: postData.author,
        department: postData.department,
        contact_handle: postData.contact,
        is_urgent: postData.isUrgent || false,
        status: 'open',
        responses_count: 0
      };

      const { data, error } = await client
        .from('campus_help_requests')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (e) {
      console.error('[CampusSupabase] postHelpRequest error:', e);
      throw e;
    }
  },

  incrementHelpResponse: async (requestId, currentCount = 0) => {
    const client = CampusSupabase.getClient();
    if (!client) return null;

    try {
      const { data, error } = await client
        .from('campus_help_requests')
        .update({ responses_count: (currentCount || 0) + 1 })
        .eq('id', requestId);

      if (error) throw error;
      return data;
    } catch (e) {
      console.warn('[CampusSupabase] incrementHelpResponse error:', e);
      return null;
    }
  }
};

// Backwards compatibility alias with existing UI status checks
if (typeof window !== 'undefined') {
  window.CampusSupabase = CampusSupabase;
  window.CampusDatabase = CampusSupabase; // Seamless bridge
}
