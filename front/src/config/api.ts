// Firebase project configuration from environment variables
const FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const FIREBASE_REGION = import.meta.env.VITE_FIREBASE_REGION;

// Development vs Production API URLs
export const API_BASE_URL = `http://127.0.0.1:5001/${FIREBASE_PROJECT_ID}/${FIREBASE_REGION}`;
