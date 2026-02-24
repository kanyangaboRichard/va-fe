import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {fetchAssessmentsAPI,createAssessmentAPI,} from "../../api/Assessment.api";

interface AssessmentState {
  assessments: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AssessmentState = {
  assessments: [],
  isLoading: false,
  error: null,
};

export const fetchAssessments = createAsyncThunk(
  "assessments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAssessmentsAPI();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  }
);

export const createAssessment = createAsyncThunk(
  "assessments/create",
  async (data: any, { rejectWithValue }) => {
    try {
      return await createAssessmentAPI(data);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to create");
    }
  }
);

const assessmentSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssessments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAssessments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.assessments = action.payload;
      })
      .addCase(fetchAssessments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(createAssessment.fulfilled, (state, action) => {
        state.assessments.unshift(action.payload);
      });
  },
});

export default assessmentSlice.reducer;
