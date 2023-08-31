// Mocking the external dependencies
import {
  sendEmail,
  saveEmail,
  getEmails,
  getEmail,
  getEmailByAddress,
  deleteEmail,
} from "./email";
import { sendEmail as mockSendEmail } from "@services/postmark";
import { Email } from "@models/emailModel";

jest.mock("@services/postmark", () => ({
  sendEmail: jest.fn(),
}));

jest.mock("@models/emailModel", () => ({
  Email: {
    create: jest.fn(),
  },
}));

describe("sendEmail function", () => {
  const mockMessage = {
    From: "john@test.com",
    To: "martin2844@gmail.com",
    Subject: "Urgent tester needed",
    TextBody: "testEmail",
  };

  const mockResponse = { status: 200 };
  const mockSavedEmail = { id: "someId" };

  beforeEach(() => {
    (mockSendEmail as jest.MockedFunction<any>).mockClear();
  });

  it("should call SendEmail function and save the email", async () => {
    (mockSendEmail as jest.MockedFunction<any>).mockResolvedValueOnce(
      mockResponse
    );
    (Email.create as jest.MockedFunction<any>).mockResolvedValueOnce(
      mockSavedEmail
    );

    const result = await sendEmail(mockMessage);

    expect(mockSendEmail).toHaveBeenCalledWith(mockMessage);
    expect(Email.create).toHaveBeenCalledWith({
      From: mockMessage.From,
      To: mockMessage.To,
      Subject: mockMessage.Subject,
      Body: mockMessage.TextBody,
      Type: "sent",
      Status: mockResponse.status,
    });
    expect(result).toBe(mockSavedEmail.id);
  });

  it("should throw an error if sending email fails", async () => {
    const mockError = new Error("Failed to send email");
    (mockSendEmail as jest.MockedFunction<any>).mockRejectedValueOnce(
      mockError
    );

    await expect(sendEmail(mockMessage)).rejects.toThrow(
      `Failed to send email: ${mockError.message}`
    );
  });

  it("should save an inbound email", async () => {
    const mockEmailMessage = {
      From: "test@test.com",
      To: "receiver@test.com",
      Subject: "Test",
      TextBody: "Test Message",
    };

    const mockSavedEmail = { ...mockEmailMessage, id: "1234" };
    (Email.create as jest.MockedFunction<any>).mockResolvedValueOnce(
      mockSavedEmail
    );
    const result = await saveEmail(mockEmailMessage);
    expect(Email.create).toHaveBeenCalledWith({
      From: mockEmailMessage.From,
      To: mockEmailMessage.To,
      Subject: mockEmailMessage.Subject,
      Type: "received",
      Status: 200,
      Body: mockEmailMessage.TextBody,
    });
    expect(result).toEqual(mockSavedEmail);
  });

  it("should retrieve emails of a specific type", async () => {
    const mockEmails = [{ id: "1" }, { id: "2" }];
    Email.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockEmails),
    });
    const result = await getEmails("received");
    expect(result).toEqual(mockEmails);
  });

  it("should retrieve a specific email by ID", async () => {
    const mockEmail = { id: "1" };
    Email.findById = jest.fn().mockResolvedValue(mockEmail);
    const result = await getEmail("1");
    expect(result).toEqual(mockEmail);
  });

  it("should retrieve emails by address", async () => {
    const mockEmails = [{ id: "1" }, { id: "2" }];
    Email.find = jest.fn().mockResolvedValue(mockEmails);
    const result = await getEmailByAddress("test@test.com");
    expect(result).toEqual(mockEmails);
  });

  it("should delete a specific email by ID", async () => {
    const mockDeletedEmail = { id: "1" };
    Email.findByIdAndDelete = jest.fn().mockResolvedValue(mockDeletedEmail);
    const result = await deleteEmail("1");
    expect(result).toEqual(mockDeletedEmail);
  });
});
