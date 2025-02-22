export class MessagingService {
  sendEmail(subject: string, message: string): void {
    // Implementação para envio de email (ex: via SMTP, API de terceiros, etc.)
    console.log(`Email sent: ${subject} - ${message}`);
  }
}
