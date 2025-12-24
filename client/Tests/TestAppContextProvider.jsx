// Tests/TestAppContextProvider.jsx
import React, { createContext, useContext } from "react";

// السياق نفسه مثل التطبيق
const AppContext = createContext();

// Hook للاختبارات
export const useAppContext = () => useContext(AppContext);

// Provider خفيف للاختبارات
export function TestAppContextProvider({ children }) {
  const value = {
    user: { name: "Test User", email: "test@example.com" }, // قيمة افتراضية
    userDispatch: () => {}, // دالة فارغة بدل الديسباتش الحقيقية
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
