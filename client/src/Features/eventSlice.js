import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

// Async Thunks
export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const res = await axios.get(`${ENV.SERVER_URL}/events`);
  return res.data.events;
});

export const registerEvent = createAsyncThunk(
  "events/registerEvent",
  async (eventData) => {
    const res = await axios.post(`${ENV.SERVER_URL}/registerEvent`, eventData);
    return res.data.event; // تأكد أن السيرفر يرجع جميع الحقول الجديدة
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async (eventData) => {
    const res = await axios.put(
      `${ENV.SERVER_URL}/events/${eventData._id}`,
      eventData
    );
    return res.data.event;
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId) => {
    await axios.delete(`${ENV.SERVER_URL}/events/${eventId}`);
    return eventId;
  }
);

export const initialEventState = {
  events: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const eventSlice = createSlice({
  name: "events",
  initialState: initialEventState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Events
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
        state.isSuccess = true;
      })
      .addCase(fetchEvents.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Register Event
      .addCase(registerEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        // نضيف الحدث الجديد مع جميع الحقول الجديدة
        state.events.push(action.payload);
        state.isSuccess = true;
      })
      .addCase(registerEvent.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Update Event
      .addCase(updateEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.events.findIndex(
          (e) => e._id === action.payload._id
        );
        if (index !== -1) state.events[index] = action.payload;
      })
      .addCase(updateEvent.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Delete Event
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((e) => e._id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

// ✅ نصدر الافتراضي
export default eventSlice.reducer;
