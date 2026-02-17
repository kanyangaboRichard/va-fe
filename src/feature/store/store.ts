import { configureStore } from "@reduxjs/toolkit";
import companiesReducer from "../company/companySlice";
import assessmentReducer from "../assessments/assessmentSlice";

export const store = configureStore({
  reducer: {
    companies: companiesReducer,
    assessments: assessmentReducer,
  },
});

// Types inferred from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
