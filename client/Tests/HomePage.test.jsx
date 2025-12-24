// Tests/HomePageSimple.test.jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../src/components/HomePage.jsx";

describe("HomePage Simple Test", () => {
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // بما أن user غير موجود، سيظهر نص تسجيل الدخول
    expect(screen.getByText(/Please log in to see the homepage/i)).not.toBeNull();
  });
});
