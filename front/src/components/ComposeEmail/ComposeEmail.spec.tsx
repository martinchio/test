import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EmailForm from "./ComposeEmail";

jest.useFakeTimers();

describe("EmailForm", () => {
  const mockOnSubmit = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(<EmailForm onSubmit={mockOnSubmit} onSuccess={mockOnSuccess} />);
  });

  it("renders", () => {
    expect(screen.getByLabelText(/To:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("updates input values on change", async () => {
    userEvent.type(screen.getByLabelText(/To:/i), "jane@test.com");
    await waitFor(() => {
      expect(screen.getByLabelText(/To:/i)).toHaveValue("jane@test.com");
    });

    userEvent.type(screen.getByLabelText(/Subject:/i), "Test Subject");
    await waitFor(() => {
      expect(screen.getByLabelText(/Subject:/i)).toHaveValue("Test Subject");
    });

    userEvent.type(screen.getByLabelText(/Message:/i), "Hello there");
    await waitFor(() => {
      expect(screen.getByLabelText(/Message:/i)).toHaveValue("Hello there");
    });
  });

  it("displays success message on successful form submission", async () => {
    mockOnSubmit.mockResolvedValueOnce("good");
    fireEvent.change(screen.getByLabelText(/To:/i), {
      target: { value: "recipient@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/Subject:/i), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByLabelText(/Message:/i), {
      target: { value: "Test message" },
    });
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    jest.runAllTimers(); // Fast forward all timers

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.getByText(/Email Sent!/i)).toBeInTheDocument();
    });
  });

  it("displays error message on failed form submission", async () => {
    mockOnSubmit.mockRejectedValueOnce(new Error("Failed to send email"));
    fireEvent.change(screen.getByLabelText(/To:/i), {
      target: { value: "recipient@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/Subject:/i), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByLabelText(/Message:/i), {
      target: { value: "Test message" },
    });
    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.getByText(/Error sending email/i)).toBeInTheDocument();
    });
  });
});
