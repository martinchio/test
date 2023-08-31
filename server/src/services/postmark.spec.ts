import { sendEmail, postmarkInstance } from "./postmark";
import { POSTMARK_SERVER_TOKEN } from "@config";

postmarkInstance.post = jest.fn();

const mockEmail = {
  From: "john@test.com",
  To: "martin2844@gmail.com",
  TextBody: "testEmail",
  Subject: "Urgent tester needed",
};

describe("sendEmail", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("sends a POST request to https://api.postmarkapp.com/email", async () => {
    (postmarkInstance.post as jest.Mock).mockResolvedValueOnce({ data: {} });
    await sendEmail(mockEmail);
    expect(postmarkInstance.post).toHaveBeenCalledWith("/email", mockEmail);
  });

  it("includes the 'X-Postmark-Server-Token' header", async () => {
    (postmarkInstance.post as jest.Mock).mockResolvedValueOnce({ data: {} });
    await sendEmail(mockEmail);
    expect(postmarkInstance.defaults.headers).toHaveProperty(
      "X-Postmark-Server-Token",
      POSTMARK_SERVER_TOKEN
    );
  });

  it("throws an error if the request fails", async () => {
    const mockError = {
      response: {
        data: "Sample error message",
      },
      message: "Network error",
    };

    (postmarkInstance.post as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(sendEmail(mockEmail)).rejects.toThrow(
      "Failed to send email: Sample error message"
    );
  });
});
