import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configura el transportador con las variables de entorno
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Método para enviar el correo de confirmación
  async sendUserConfirmation(email: string): Promise<void> {
    const mailOptions = {
      from: '"Tu Nombre" <pablorodriguez6002@gmail.com>', // Remitente
      to: email, // Destinatario
      subject: 'Registro exitoso', // Asunto
      text: '¡Gracias por registrarte!', // Texto en plano
      html: '<b>¡Gracias por registrarte!</b>', // HTML del cuerpo del correo
    };

    await this.transporter.sendMail(mailOptions);
  }
}
