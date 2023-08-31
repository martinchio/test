export interface EmailAttachment {
  Name: string
  Content: string
  ContentType: string
  ContentID?: string
}

export interface EmailMessage {
  From: string
  To: string
  Cc?: string
  Bcc?: string
  Subject: string
  Tag?: string
  HtmlBody?: string
  TextBody?: string
  ReplyTo?: string
  Metadata?: Record<string, string>
  Headers?: Array<{ Name: string, Value: string }>
  TrackOpens?: boolean
  TrackLinks?: 'HtmlOnly' | 'HtmlAndText'
  MessageStream?: string
  Attachments?: EmailAttachment[]
}
