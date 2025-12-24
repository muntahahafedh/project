import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import EventModel from "./models/eventModel.js";
import UserModel from "./models/UserModel.js";
import JobModel from "./models/jobModel.js";
import * as ENV from "./config.js";

const app = express();
app.use(express.json());

// ✅ CORS جاهز لـ Render و localhost
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://muyan-frontend.onrender.com",
    ],
    credentials: true,
  })
);

// ✅ Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_CLUSTER}/${ENV.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// -------- Users --------
app.post("/registerUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields required" });

    const exists = await UserModel.findOne({ email });
    if (exists)
      return res.status(400).json({ error: "Email already used" });

    const newUser = new UserModel({ name, email, password });
    await newUser.save();

    res.status(201).json({
      user: { id: newUser._id, name, email },
      msg: "User registered successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(404).json({ error: "User not found" });

    if (user.password !== password)
      return res.status(400).json({ error: "Wrong password" });

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      msg: "Login successful",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// -------- Events --------
app.post("/registerEvent", async (req, res) => {
  try {
    const {
      name,
      phone,
      age,
      gender,
      experience,
      eventId,
      eventTitle,
      userId,
    } = req.body;

    if (
      !name ||
      !phone ||
      !age ||
      !gender ||
      !experience ||
      !eventId ||
      !userId
    )
      return res.status(400).json({ error: "All fields required" });

    const newEvent = new EventModel({
      name,
      phone,
      age,
      gender,
      experience,
      eventId,
      eventTitle,
      userId,
    });

    await newEvent.save();
    res.status(201).json({ event: newEvent });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/events/user/:userId", async (req, res) => {
  try {
    const events = await EventModel.find({
      userId: req.params.userId,
    });
    res.json({ events });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/events/:id", async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);
    if (!event)
      return res.status(404).json({ error: "Event not found" });
    res.json({ event });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/events/:id", async (req, res) => {
  try {
    const updatedEvent =
      await EventModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
    if (!updatedEvent)
      return res.status(404).json({ error: "Event not found" });
    res.json({ event: updatedEvent });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/events/:id", async (req, res) => {
  try {
    const deleted =
      await EventModel.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Event not found" });
    res.json({ msg: "Event deleted successfully" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// -------- Jobs --------
app.post("/registerJob", async (req, res) => {
  try {
    const {
      userId,
      jobId,
      title,
      company,
      location,
      salary,
      type,
      phone,
    } = req.body;

    if (!userId || !jobId || !title || !company || !phone)
      return res
        .status(400)
        .json({ error: "All required fields must be filled" });

    const newJob = new JobModel({
      userId,
      jobId,
      title,
      company,
      location,
      salary,
      type,
      phone,
    });
    await newJob.save();

    res.json({ job: newJob });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/jobs/user/:userId", async (req, res) => {
  try {
    const jobs = await JobModel.find({
      userId: req.params.userId,
    });
    res.json({ jobs });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/jobs/:id", async (req, res) => {
  try {
    const job = await JobModel.findById(req.params.id);
    if (!job)
      return res.status(404).json({ error: "Job not found" });
    res.json({ job });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/jobs/:id", async (req, res) => {
  try {
    const updatedJob =
      await JobModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
    if (!updatedJob)
      return res.status(404).json({ error: "Job not found" });
    res.json({ job: updatedJob });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/jobs/:id", async (req, res) => {
  try {
    const deleted =
      await JobModel.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Job not found" });
    res.json({ msg: "Job deleted successfully" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = ENV.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
