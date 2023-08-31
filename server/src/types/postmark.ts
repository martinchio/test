export interface EmailResponse {
  To: string;
  SubmittedAt: string;
  MessageID: string;
  ErrorCode: number;
  Message: string;
}

export interface Webhook {
  ID?: number;
  Url: string;
  MessageStream: string;
  HttpAuth: {
    Username: string;
    Password: string;
  };
  HttpHeaders?: Record<string, string>;
  Triggers: any;
}
