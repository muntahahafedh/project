import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  userId: { type: String, required: true },       // معرف المستخدم
  jobId: { type: String, required: true },        // معرف الوظيفة من القائمة
  title: { type: String, required: true },        // اسم الوظيفة من القائمة
  company: { type: String },                      // اسم الشركة (يمكنك تركه ثابت أو اختيار)
  location: { type: String },                     // موقع الوظيفة (يمكن تركه ثابت)
  type: { type: String },                         // نوع الوظيفة (Full-time, Part-time)
  phone: { type: String, required: true },       // الرقم المدني (Civil ID)
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);
