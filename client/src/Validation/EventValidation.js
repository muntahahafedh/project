import * as yup from "yup";

export const eventRegisterSchema = yup.object().shape({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must contain only numbers")
    .min(6, "Phone number must be at least 6 digits")
    .max(15, "Phone number can't exceed 15 digits"),

  eventId: yup.string().required("Please select an event"),

  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(10, "Age must be at least 10")
    .max(120, "Age must be less than or equal to 120"),

  gender: yup.string().required("Please select gender"),

  experience: yup.string().required("Please select experience level"),
});
