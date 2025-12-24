// Tests/HomePage.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "../src/components/HomePage";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
// Mock صحيح للـ context
vi.mock("../src/Store/store.jsx", () => {
  return {
    useAppContext: () => ({ isLoggedIn: false }), // <= رجّع قيمة افتراضية
  };
});

// Mock للـ BottomNav
vi.mock("../src/components/BottomNav", () => {
  return {
    default: () => <div data-testid="bottom-nav" />,
  };
});

test("renders HomePage with title", () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  
  expect(screen.getByText(/Muyan/i)).toBeInTheDocument();
});
