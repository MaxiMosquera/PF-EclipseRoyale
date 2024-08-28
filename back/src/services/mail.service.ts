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
      html: '<h1>Gracias Por Registrarte con Hotel Eclipse Royale</h1> <p>Una vez registrado puedes acceder a nuestros servicios</p>', // HTML del cuerpo del correo
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendReservationemail(email: string, name: string): Promise<void> {
    const mailOptions = {
      from: '"Tu Nombre" <contactoeclipseroyale@gmail.com>', // Remitente
      to: email, // Destinatario
      subject: 'Reserva exitosa', // Asunto
      text: '¡Gracias por reservar!', // Texto en plano
      html: `
    <body style="font-family: Arial, sans-serif; background-color: #f0f4ff; margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; box-sizing: border-box;">
      <div style="background-color: #ffffff; max-width: 600px; width: 100%; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); text-align: center;">
        <img style="margin-bottom: 20px; border-radius: 8px;" src="https://front-hotel-app-g8u2.vercel.app/_next/image?url=%2Flogo.png&w=256&q=75" alt="Logo" width="150" height="100">
        <h1 style="color: #333333; font-size: 24px;">Registro Exitoso</h1>
        <p style="font-style: italic; color: #333333;"><strong>contactoeclipseroyale@gmail.com</strong></p>
        <p style="color: #333333;">Tu registro en Hotel Eclipse Royale se ha realizado con éxito, te invitamos a explorar nuestros servicios en el siguiente enlace:</p>
        <a href="https://front-hotel-app-g8u2.vercel.app/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #7f69b9; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">Ir a Home</a>
        <p style="color: #666666; margin-top: 20px;">Si no puedes hacer click en el botón, visita este link <a href="https://front-hotel-app-g8u2.vercel.app/" style="color: #5120cc; text-decoration: none;">siguiente enlace</a></p>
      </div>
    </body>`, // HTML del cuerpo del correo
    };

    await this.transporter.sendMail(mailOptions);
  }
}
