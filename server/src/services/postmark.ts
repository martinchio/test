import axios, { type AxiosResponse } from "axios";
import {
  POSTMARK_SERVER_TOKEN,
  WEBHOOK_URL,
  POSTMARK_PASSWORD,
  POSTMARK_USER,
} from "@config";
import { type EmailMessage } from "@ctypes/email";
import { type EmailResponse, type Webhook } from "@ctypes/postmark";

export const postmarkInstance = axios.create({
  baseURL: "https://api.postmarkapp.com/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Postmark-Server-Token": POSTMARK_SERVER_TOKEN,
  },
});

// Todo define axios response type
export async function sendEmail(
  message: EmailMessage
): Promise<AxiosResponse<EmailResponse>> {
  try {
    const response = await postmarkInstance.post("/email", message);
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to send email: ${
        error.response ? error.response.data : error.message
      }`
    );
  }
}

export async function bootstrapWebhooks(): Promise<Webhook> {
  try {
    const {
      data: { Webhooks },
    } = await getRegisteredWebhooks();
    const webhookUrl = WEBHOOK_URL + "/webhook";
    const projectWebhook = Webhooks.find(
      (webhook) => webhook.Url === webhookUrl
    );
    if (!projectWebhook) {
      const webhook = await createWebhook({
        Url: webhookUrl,
        MessageStream: "outbound",
        HttpAuth: {
          Username: POSTMARK_USER,
          Password: POSTMARK_PASSWORD,
        },
        Triggers: {
          Open: {
            Enabled: true,
            PostFirstOpenOnly: true,
          },
          Click: {
            Enabled: true,
          },
          Delivery: {
            Enabled: true,
          },
          Bounce: {
            Enabled: false,
            IncludeContent: false,
          },
          SpamComplaint: {
            Enabled: true,
            IncludeContent: false,
          },
          SubscriptionChange: {
            Enabled: false,
          },
        },
      });
      return webhook.data;
    }
    return projectWebhook;
  } catch (error) {
    throw new Error(
      `Failed to bootstrap webhooks: ${
        error.response ? error.response.data : error.message
      }. Please check you havent reached the webhooklimit of 10, delete one and try again`
    );
  }
}

export async function getRegisteredWebhooks(): Promise<
  AxiosResponse<{ Webhooks: Webhook[] }>
> {
  try {
    const response = await postmarkInstance.get(
      "/webhooks?MessageStream=outbound"
    );
    return response;
  } catch (error) {
    throw new Error(
      `Failed to get webhooks: ${
        error.response ? error.response.data : error.message
      }`
    );
  }
}

export async function createWebhook(
  webhook: Webhook
): Promise<AxiosResponse<Webhook>> {
  try {
    const response = await postmarkInstance.post("/webhooks", webhook);
    return response;
  } catch (error) {
    throw new Error(
      `Failed to create webhook: ${
        error.response ? error.response.data : error.message
      }`
    );
  }
}

export async function updateWebhook(
  webhook: Partial<Webhook>
): Promise<AxiosResponse<Webhook>> {
  try {
    const response = await postmarkInstance.put(
      `/webhooks/${webhook.ID}`,
      webhook
    );
    return response;
  } catch (error) {
    throw new Error(
      `Failed to update webhook: ${
        error.response ? error.response.data : error.message
      }`
    );
  }
}
