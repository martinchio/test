import { sendEmail as SendEmail } from '@services/postmark'
import { Email } from '@models/emailModel'
import { type EmailMessage } from '@/types/email'

/**
 * Sends an email using postmark and saves it to the DB.
 * @param {EmailMessage} message - The email message object.
 * @returns {Promise<string>} - The ID of the saved email.
 * @throws {Error} - Throws an error if sending or saving the email fails.
 */
export async function sendEmail (message: EmailMessage) {
  try {
    const response = await SendEmail(message)
    const savedEmail = await Email.create({
      From: message.From,
      To: message.To,
      Subject: message.Subject,
      Body: message.TextBody || message.HtmlBody,
      Type: 'sent',
      Status: response.status
    })
    return savedEmail.id
  } catch (error) {
    throw new Error(
      `Failed to send email: ${
        error.response ? error.response.data : error.message
      }`
    )
  }
}

/**
 * Saves an inbound email to the DB.
 * @param {EmailMessage} message - The inbound email message object.
 * @returns {Promise<EmailMessage>} - The saved email document.
 */
export async function saveEmail (message) {
  return await Email.create({
    From: message.From,
    To: message.To,
    Subject: message.Subject,
    Body: message.TextBody || message.HtmlBody,
    Type: 'received',
    Status: 200
  })
}

/**
 * Retrieves all emails from the DB sorted by date DESC
 * @returns {Promise<EmailMessage[]>} - An array of email documents.
 */
export function getEmails (Type = 'received') {
  return Email.find({ Type }).sort({ createdAt: -1 })
}

/**
 * Retrieves a specific email by ID from the DB.
 * @param {string} id - The ID of the email to retrieve.
 * @returns {Promise<EmailMessage|null>} - The email document, or null if not found.
 */
export function getEmail (id) {
  return Email.findById(id)
}

/**
 * Deletes a specific email by ID from the DB.
 * @param {string} address - The email address of the email
 * @returns {Promise<Object|null>} -  The emails associated with said address
 *
*/
export function getEmailByAddress (address) {
  return Email.find({ $or: [{ To: address }, { From: address }] })
}

/**
 * Deletes a specific email by ID from the DB.
 * @param {string} id - The ID of the email to delete.
 * @returns {Promise<EmailMessage|null>} - The deleted email document, or null if not found.
 */
export function deleteEmail (id) {
  return Email.findByIdAndDelete(id)
}
