import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import HomePage from '../src/components/HomePage';

describe("HomePage Component", () => {

  it("should render HomePage successfully", () => {
    render(<HomePage />);
    const mainElement = screen.getByRole("main", { hidden: true });
    expect(mainElement).toBeInTheDocument();
  });

  it("should display homepage text", () => {
    render(<HomePage />);
    const text = screen.queryByText(/welcome/i);
    expect(text).toBeInTheDocument();
  });

  it("should have a button", () => {
    render(<HomePage />);
    const button = screen.getByRole("button");
    expect(button).toBeVisible();
  });

});
