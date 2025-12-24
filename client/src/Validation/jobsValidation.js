// Validation/jobsValidation.js
import * as yup from "yup";

export const jobsRegisterSchema = yup.object().shape({
  phone: yup.string().required("Civil Number is required").min(5),
  jobId: yup.string().required("Job must be selected"),
  title: yup.string().required(),
  company: yup.string().required(),
});
