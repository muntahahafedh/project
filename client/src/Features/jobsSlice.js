import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

// جلب كل الوظائف
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${ENV.SERVER_URL}/jobs`);
      return res.data.jobs;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// تسجيل وظيفة
export const registerJob = createAsyncThunk(
  "jobs/registerJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${ENV.SERVER_URL}/registerJob`, jobData);
      return res.data.job;
    } catch (err) {
      // عرض رسالة الخطأ المرسلة من السيرفر
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const initialJobState = {
  jobs: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "", // لإظهار رسالة الخطأ
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState: initialJobState,
  reducers: {
    resetJobState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // تسجيل وظيفة
      .addCase(registerJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(registerJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs.push(action.payload);
        state.isSuccess = true;
      })
      .addCase(registerJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to register job";
      })

      // جلب الوظائف
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to fetch jobs";
      });
  },
});

export const { resetJobState } = jobsSlice.actions;
export default jobsSlice.reducer;
