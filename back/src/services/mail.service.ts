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
      from: '"Tu Nombre" <contactoeclipseroyale@gmail.com>', // Remitente
      to: email, // Destinatario
      subject: 'Registro exitoso', // Asunto
      text: '¡Gracias por registrarte!', // Texto en plano
      html: "<h1>Gracias Por Registrarte con Hotel Eclipse Royale</h1> <p>Una vez registrado puedes acceder a nuestros servicios</p>", // HTML del cuerpo del correo
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendReservationemail(email: string, name: string): Promise<void> {
    const mailOptions = {
      from: '"Tu Nombre" <contactoeclipseroyale@gmail.com>', // Remitente
      to: email, // Destinatario
      subject: 'Reserva exitosa', // Asunto
      text: '¡Gracias por reservar!', // Texto en plano
      html: `<h1>Gracias ${name} Por Reservar con Hotel Eclipse Royale</h1> <p>Puedes ver tus reservas en la seccion historial</p>`, // HTML del cuerpo del correo
    };

    await this.transporter.sendMail(mailOptions);
  }
}


