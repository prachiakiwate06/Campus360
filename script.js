/**
 * =================================================================
 * SmartCampus — Client-Side Authentication Logic (script.js)
 * Features:
 *  - Tab switching (Login / Register) with smooth transition
 *  - Password visibility toggle (Show / Hide)
 *  - Client-side validation & student credentials handling
 *  - LocalStorage user registry & session persistence
 *  - Seamless redirection to Campus 360 dashboard (index.html)
 *  - 1-click demo accounts for fast verification
 * =================================================================
 */

// Default Seed Accounts for instantaneous testing
const DEFAULT_ACCOUNTS = [
  {
    fullName: "Alex Chen",
    email: "alex.chen@campus.edu",
    password: "password123",
    studentId: "CAMPUS2026CS042",
    branch: "CSE",
    year: "Final Year"
  },
  {
    fullName: "Rohan Sharma",
    email: "rohan.sharma@campus.edu",
    password: "password123",
    studentId: "CAMPUS2025IT018",
    branch: "IT",
    year: "Third Year"
  },
  {
    fullName: "Sophia Ramirez",
    email: "sophia@campus.edu",
    password: "password123",
    studentId: "CAMPUS2027DS099",
    branch: "Data Science",
    year: "Second Year"
  }
];

// Initialize persistent user storage
function initializeStorage() {
  try {
    const existing = JSON.parse(localStorage.getItem('smartCampusUsers') || '[]');
    if (!existing || existing.length === 0) {
      localStorage.setItem('smartCampusUsers', JSON.stringify(DEFAULT_ACCOUNTS));
    } else {
      let updated = false;
      DEFAULT_ACCOUNTS.forEach(seed => {
        if (!existing.some(u => u.email.toLowerCase() === seed.email.toLowerCase())) {
          existing.push(seed);
          updated = true;
        }
      });
      if (updated) {
        localStorage.setItem('smartCampusUsers', JSON.stringify(existing));
      }
    }
  } catch (e) {
    localStorage.setItem('smartCampusUsers', JSON.stringify(DEFAULT_ACCOUNTS));
  }
}

/**
 * Switch between 'login' and 'register' views
 * @param {'login' | 'register'} formType 
 */
function showForm(formType) {
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const messageEl = document.getElementById('message');

  // Clear previous status alerts
  hideMessage();

  if (formType === 'login') {
    loginTab.classList.add('active');
    loginTab.setAttribute('aria-selected', 'true');
    registerTab.classList.remove('active');
    registerTab.setAttribute('aria-selected', 'false');

    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');

    const emailInput = document.getElementById('loginEmail');
    if (emailInput) setTimeout(() => emailInput.focus(), 50);
  } else {
    registerTab.classList.add('active');
    registerTab.setAttribute('aria-selected', 'true');
    loginTab.classList.remove('active');
    loginTab.setAttribute('aria-selected', 'false');

    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');

    const nameInput = document.getElementById('fullName');
    if (nameInput) setTimeout(() => nameInput.focus(), 50);
  }
}

/**
 * Toggle password field visibility between 'password' and 'text'
 * @param {string} inputId 
 * @param {HTMLElement} btn 
 */
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;

  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = 'Hide';
    btn.setAttribute('aria-label', 'Hide password');
  } else {
    input.type = 'password';
    btn.textContent = 'Show';
    btn.setAttribute('aria-label', 'Show password');
  }
}

/**
 * Display formatted message feedback to user
 * @param {string} text 
 * @param {'success' | 'error' | 'info'} type 
 */
function showMessage(text, type = 'info') {
  const msgEl = document.getElementById('message');
  if (!msgEl) return;

  msgEl.textContent = text;
  msgEl.className = '';
  msgEl.classList.add('show', type);
}

/**
 * Hide message feedback
 */
function hideMessage() {
  const msgEl = document.getElementById('message');
  if (!msgEl) return;
  msgEl.className = '';
  msgEl.textContent = '';
}

/**
 * Forgot password handler with friendly simulation
 */
function forgotPassword() {
  const emailInput = document.getElementById('loginEmail');
  const email = emailInput ? emailInput.value.trim() : '';

  if (!email) {
    showMessage("Please enter your college email address above, then click 'Forgot password'.", "error");
    if (emailInput) emailInput.focus();
    return;
  }

  // Simulate password recovery dispatch
  showMessage(`📬 Reset link sent to ${email}! Please check your college inbox or spam folder.`, "success");
}

/**
 * Show Terms and Conditions summary
 */
function showTerms(event) {
  if (event) event.preventDefault();
  alert(
    "Campus360 Terms & Conditions:\n\n" +
    "1. Respect campus privacy and student community guidelines.\n" +
    "2. Use your authentic college credentials for campus-verified posts.\n" +
    "3. Keep academic collaboration constructive and honor code compliant."
  );
}

/**
 * 1-Click Demo Account Quick Filler
 * @param {'alex' | 'rohan'} userKey 
 */
function fillDemoAccount(userKey) {
  showForm('login');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');

  if (userKey === 'alex') {
    emailInput.value = 'alex.chen@campus.edu';
    passwordInput.value = 'password123';
    showMessage("Demo account loaded: Alex Chen (alex.chen@campus.edu). Click Login →", "info");
  } else {
    emailInput.value = 'rohan.sharma@campus.edu';
    passwordInput.value = 'password123';
    showMessage("Demo account loaded: Rohan Sharma (rohan.sharma@campus.edu). Click Login →", "info");
  }
}

// -------------------------------------------------------------
// Form Submission Handlers
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initializeStorage();

  // Handle URL hash routing (#register or #login)
  const handleHashAuth = () => {
    const hash = (window.location.hash || '').toLowerCase();
    if (hash === '#register' || hash === '#signup') {
      showForm('register');
    } else if (hash === '#login' || hash === '#signin') {
      showForm('login');
    }
  };

  handleHashAuth();
  window.addEventListener('hashchange', handleHashAuth);

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const rememberCheckbox = document.getElementById('remember');
  const loginEmailInput = document.getElementById('loginEmail');

  // Pre-fill remembered email
  const rememberedEmail = localStorage.getItem('smartCampusRememberEmail');
  if (rememberedEmail && loginEmailInput && rememberCheckbox) {
    loginEmailInput.value = rememberedEmail;
    rememberCheckbox.checked = true;
  }

  // --- LOGIN FORM SUBMISSION ---
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      const remember = document.getElementById('remember')?.checked;
      const submitBtn = document.getElementById('loginSubmitBtn');

      if (!email || !password) {
        showMessage("Please provide both email and password.", "error");
        return;
      }

      // Handle Remember Me
      if (remember) {
        localStorage.setItem('smartCampusRememberEmail', email);
      } else {
        localStorage.removeItem('smartCampusRememberEmail');
      }

      // Check registered users in localStorage
      const users = JSON.parse(localStorage.getItem('smartCampusUsers') || '[]');
      const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      // Loading state on button and async loading bar
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="c360-spinner"></span> <span>Signing in...</span>`;
      }
      const loadingBar = document.getElementById('c360-async-loading-bar');
      if (loadingBar) loadingBar.classList.add('active');

      setTimeout(() => {
        if (loadingBar) loadingBar.classList.remove('active');
        if (matchedUser && matchedUser.password === password) {
          // Success with existing user record
          localStorage.setItem('smartCampusCurrentUser', JSON.stringify(matchedUser));
          showMessage(`✓ Welcome back, ${matchedUser.fullName}! Redirecting to Campus360...`, "success");

          setTimeout(() => {
            window.location.href = 'index.html';
          }, 1200);
        } else if (!matchedUser && password.length >= 6) {
          // Allow new student login with plausible credentials (auto-create profile)
          const namePart = email.split('@')[0].replace(/[._-]/g, ' ');
          const formattedName = namePart.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          
          const newUser = {
            fullName: formattedName || 'Campus Student',
            email: email,
            password: password,
            studentId: 'CAMPUS' + Math.floor(1000 + Math.random() * 9000),
            branch: 'CSE',
            year: 'Second Year'
          };

          users.push(newUser);
          localStorage.setItem('smartCampusUsers', JSON.stringify(users));
          localStorage.setItem('smartCampusCurrentUser', JSON.stringify(newUser));

          showMessage(`✓ Welcome, ${newUser.fullName}! Redirecting to Campus360...`, "success");
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 1200);
        } else {
          // Invalid credentials
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Login</span> <span class="btn-arrow">→</span>`;
          }
          showMessage("✕ Invalid email or password. Use demo account or create an account.", "error");
        }
      }, 500);
    });
  }

  // --- REGISTER FORM SUBMISSION ---
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName').value.trim();
      const regEmail = document.getElementById('regEmail').value.trim();
      const studentId = document.getElementById('studentId').value.trim();
      const branch = document.getElementById('branch').value;
      const year = document.getElementById('year').value;
      const regPassword = document.getElementById('regPassword').value;
      const terms = document.getElementById('terms')?.checked;
      const submitBtn = document.getElementById('regSubmitBtn');

      if (!fullName || !regEmail || !studentId || !branch || !year || !regPassword) {
        showMessage("Please fill in all registration fields.", "error");
        return;
      }

      if (regPassword.length < 8) {
        showMessage("Password must be at least 8 characters long.", "error");
        return;
      }

      if (!terms) {
        showMessage("Please agree to the terms and conditions to register.", "error");
        return;
      }

      // Check if email already registered
      const users = JSON.parse(localStorage.getItem('smartCampusUsers') || '[]');
      const exists = users.some(u => u.email.toLowerCase() === regEmail.toLowerCase());

      if (exists) {
        showMessage("An account with this college email already exists. Please login instead.", "error");
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="c360-spinner"></span> <span>Creating account...</span>`;
      }
      const loadingBar = document.getElementById('c360-async-loading-bar');
      if (loadingBar) loadingBar.classList.add('active');

      setTimeout(() => {
        if (loadingBar) loadingBar.classList.remove('active');
        const newUser = {
          fullName,
          email: regEmail,
          password: regPassword,
          studentId,
          branch,
          year
        };

        users.push(newUser);
        localStorage.setItem('smartCampusUsers', JSON.stringify(users));
        localStorage.setItem('smartCampusCurrentUser', JSON.stringify(newUser));

        showMessage(`✨ Account created successfully! Welcome, ${fullName}! Redirecting...`, "success");

        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1200);
      }, 600);
    });
  }
});

// Expose functions globally for inline onclick handlers
window.showForm = showForm;
window.togglePassword = togglePassword;
window.forgotPassword = forgotPassword;
window.fillDemoAccount = fillDemoAccount;
window.showTerms = showTerms;
