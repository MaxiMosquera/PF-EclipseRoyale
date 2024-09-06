import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { User } from 'src/entities/user.entity';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configura el transportador con las variables de entorno
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: "maximiliano.mosquera1@gmail.com",
        pass: "02324aaA",
      },
    });
  }

  async prueba(): Promise<void> {
    const mailOptions = {
      from: "maximiliano.mosquera1@gmail.com", // Remitente
      to: 'indisardi99@gmail.com', // Destinatario
      subject: 'Prueba', // Asunto
     
      html: 'Prueba', // Texto en HTML
    };
  }
  // Método para enviar el correo de confirmación

  async sendUserConfirmation(user: User): Promise<void> {
    const mailOptions = {
      from: '"Tu Nombre" <contactoeclipseroyale@gmail.com>', // Remitente
      to: user.email, // Destinatario
      subject: 'Registro exitoso', // Asunto
      text: '¡Gracias por registrarte!', // Texto en plano
      html: `<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
        color: #333;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: auto;
        padding: 20px;
        background-color: #ffffff;
        border: 1px solid #e1e1e1;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #000000;
        color: #ffffff;
        padding: 20px;
        text-align: center;
        border-radius: 8px 8px 0 0;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 20px;
        text-align: center;
      }
      .content h2 {
        color: #000000;
        font-size: 20px;
      }
      .content p {
        color: #555555;
        font-size: 16px;
        margin: 20px 0;
      }
         .button {
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        color: #000000;
        background: linear-gradient(145deg, #d4af37, #f7e5b4);
        border: 1px solid #d4af37;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
        box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(255, 255, 255, 0.5);
        transition: 0.3s;
    }

    .button:hover {
          background: linear-gradient(145deg, #f7e5b4, #d4af37);
          box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2), inset -3px -3px 6px rgba(255, 255, 255, 0.5);
          color: #000000;
        }
      .footer {
        padding: 20px;
        text-align: center;
        background-color: #f1f1f1;
        color: #999999;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Hotel Eclipse Royale</h1>
      </div>
      <div class="content">
        <h2>¡Gracias por registrarte, ${user.name}!</h2>
        <p>Nos alegra que hayas creado una cuenta con nosotros. Ahora puedes acceder a nuestros servicios y disfrutar de todas las ventajas que ofrecemos.</p>
        <a href="#" class="button">Volver al inicio</a>
      </div>
      <div class="footer">
        <p>&copy; 2024 Hotel Eclipse Royale. Todos los derechos reservados.</p>
      </div>
    </div>
  </body>
  </html>`, // HTML del cuerpo del correo
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendReservationemail(email: string, name: string): Promise<void> {
    console.log('Sending reservation email to:', email);

    const mailOptions = {
      from: '"Tu Nombre" <contactoeclipseroyale@gmail.com>', // Remitente
      to: email, // Destinatario
      subject: 'Reserva exitosa', // Asunto
      text: '¡Gracias por reservar!', // Texto en plano
      html: `
    <body style="font-family: Arial, sans-serif; background-color: #f0f4ff; margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; box-sizing: border-box;">
      <div style="background-color: #ffffff; max-width: 600px; width: 100%; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); text-align: center;">
        <img style="margin-bottom: 20px; border-radius: 8px;" src="https://front-hotel-app-g8u2.vercel.app/_next/image?url=%2Flogo.png&w=256&q=75" alt="Logo" width="150" height="100">
        <h1 style="color: #333333; font-size: 24px;">Reserva exitosa, ${name}!</h1>
        <p style="font-style: italic; color: #333333;"><strong>contactoeclipseroyale@gmail.com</strong></p>
        <p style="color: #333333;">Tu registro en Hotel Eclipse Royale se ha realizado con éxito, te invitamos a explorar nuestros servicios en el siguiente enlace:</p>
        <a href="https://front-hotel-app-g8u2.vercel.app/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #7f69b9; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">Ir a Home</a>
        <p style="color: #666666; margin-top: 20px;">Si no puedes hacer click en el botón, visita este link <a href="https://front-hotel-app-g8u2.vercel.app/" style="color: #5120cc; text-decoration: none;">siguiente enlace</a></p>
      </div>
    </body>`, // HTML del cuerpo del correo
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendUserConfirmationGoogle(user: User): Promise<void> {
    const mailOptions = {
      from: '"Tu Nombre" <contactoeclipseroyale@gmail.com>', // Remitente
      to: user.email, // Destinatario
      subject: 'Registro exitoso', // Asunto
      text: '¡Gracias por registrarte!', // Texto en plano
      html: `<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
        color: #333;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: auto;
        padding: 20px;
        background-color: #ffffff;
        border: 1px solid #e1e1e1;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #000000;
        color: #ffffff;
        padding: 20px;
        text-align: center;
        border-radius: 8px 8px 0 0;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 20px;
        text-align: center;
      }
      .content h2 {
        color: #000000;
        font-size: 20px;
      }
      .content p {
        color: #555555;
        font-size: 16px;
        margin: 20px 0;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        color: #000000;
        background: linear-gradient(145deg, #d4af37, #f7e5b4);
        border: 1px solid #d4af37;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
        box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(255, 255, 255, 0.5);
        transition: 0.3s;
      }
        .button:hover {
          background: linear-gradient(145deg, #f7e5b4, #d4af37);
          box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2), inset -3px -3px 6px rgba(255, 255, 255, 0.5);
          color: #000000;
        }
      .footer {
        padding: 20px;
        text-align: center;
        background-color: #f1f1f1;
        color: #999999;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Hotel Eclipse Royale</h1>
      </div>
      <div class="content">
        <h2>¡Gracias por registrarte, ${user.name}!</h2>
        <p>Nos alegra que te hayas unido a nosotros. Ahora puedes acceder a nuestros servicios y disfrutar de todas las ventajas que ofrecemos.</p>
        <p>Ya que te registraste utilizando Google, te invitamos a completar tus datos en la sección de "Editar Perfil" para que podamos conocerte mejor y ofrecerte una experiencia personalizada.</p>
        <a href="#" class="button">Volver al inicio</a>
      </div>
      <div class="footer">
        <p>&copy; 2024 Hotel Eclipse Royale. Todos los derechos reservados.</p>
      </div>
    </div>
  </body>
  </html>`, // HTML del cuerpo del correo
    };

    await this.transporter.sendMail(mailOptions);
  }
}
