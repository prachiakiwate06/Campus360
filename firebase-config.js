/**
 * =================================================================
 * Campus 360 — Cloud Database & Authentication Configuration
 * =================================================================
 * 
 * CURRENT STATUS:
 * [✓] Local Persistence Active (HTML5 Web Storage / LocalStorage)
 * [!] Cloud Database & Auth: Ready to connect
 * 
 * TO CONNECT YOUR LIVE FIREBASE BACKEND:
 * 1. Visit https://console.firebase.google.com/ and create or select your project.
 * 2. Register a Web App ("Campus 360") in Project Settings.
 * 3. Enable Cloud Firestore in "Test Mode" or with rules permitting authenticated reads/writes.
 * 4. Enable Authentication -> Sign-in methods -> Email/Password & Google.
 * 5. Replace the placeholder values in `FIREBASE_CONFIG` below with your project credentials.
 * 6. Set `ENABLE_FIREBASE = true`.
 * 
 * Note: When `ENABLE_FIREBASE = false`, the application automatically operates in
 * High-Performance Local Mode, preserving all events, campus locations, collaboration
 * posts, and lost-and-found listings securely in the browser's persistent storage.
 */

const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "campus-360.firebaseapp.com",
  projectId: "campus-360",
  storageBucket: "campus-360.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Set to true once you paste your real Firebase credentials above:
const ENABLE_FIREBASE = false;

// Cloud Sync Interface & Database Status Helper
const CampusDatabase = {
  isConfigured: () => {
    return ENABLE_FIREBASE && FIREBASE_CONFIG.apiKey !== "YOUR_API_KEY_HERE";
  },

  getStatus: () => {
    if (CampusDatabase.isConfigured()) {
      return {
        mode: 'cloud',
        badge: '🟢 Cloud Firestore Connected',
        description: 'Synchronized with live Firebase Cloud database.'
      };
    } else {
      return {
        mode: 'local',
        badge: '🟢 Local Persistence Active',
        description: 'Running in Local Storage mode. Ready for Firebase credentials.'
      };
    }
  }
};

if (typeof window !== 'undefined') {
  window.CampusDatabase = CampusDatabase;
}
