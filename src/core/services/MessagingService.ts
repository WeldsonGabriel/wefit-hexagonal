export class MessagingService {
  async sendWelcomeEmail(email: string): Promise<void> {
    // Implementação do envio de email
    console.log(`Enviando email de boas-vindas para ${email}`);
  }
}