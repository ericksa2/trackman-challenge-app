import { configureStore } from "@reduxjs/toolkit";
import { facilitiesSlice } from "./facilitiesSlice";

export const store = configureStore({
  reducer: {
    facilities: facilitiesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;   