import { configureStore } from '@reduxjs/toolkit';
import appStateSlice from './features/appStateSlice';
import currentSessionSlice from './features/currentSessionSlice';

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
    auth: currentSessionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
