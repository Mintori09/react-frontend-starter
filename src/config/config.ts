// src/config.ts

export const appConfig = {
  name: import.meta.env.VITE_APP_NAME || 'MyApp',
  env: import.meta.env.VITE_APP_ENV || 'development',
  version: import.meta.env.VITE_APP_VERSION || '0.0.1',
  port: Number(import.meta.env.VITE_APP_PORT) || 5173,
};

export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
};

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

export const featureFlags = {
  login: import.meta.env.VITE_FEATURE_LOGIN === 'true',
  chat: import.meta.env.VITE_FEATURE_CHAT === 'true',
};

export const thirdPartyKeys = {
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
};
