import mongoose from "mongoose";
import EventModel from "./models/eventModel.js";
import * as ENV from "./config.js";

const MONGO_URI = `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_CLUSTER}/${ENV.DB_NAME}?retryWrites=true&w=majority&appName=${ENV.APPNAME}`;

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const updateOldEvents = async () => {
  try {
    // إيجاد كل الأحداث القديمة التي لم تحتوي على الحقول الجديدة
    const events = await EventModel.find({
      $or: [
        { age: { $exists: false } },
        { gender: { $exists: false } },
        { experience: { $exists: false } }
      ]
    });

    console.log(`Found ${events.length} old events to update`);

    for (let ev of events) {
      // ✨ عدل القيم هنا حسب ما تريد لكل حدث
      ev.age = 30;             // ضع العمر الذي تريده
      ev.gender = "Female";    // ضع الجنس الذي تريده: Male / Female / Other
      ev.experience = "Advanced"; // ضع مستوى الخبرة: Beginner / Intermediate / Advanced

      await ev.save();
      console.log(`Updated event ${ev._id}`);
    }

    console.log("All old events updated with custom values!");
    process.exit();
  } catch (err) {
    console.error("Error updating events:", err);
    process.exit(1);
  }
};

updateOldEvents();
