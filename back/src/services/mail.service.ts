import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Reservation } from 'src/entities/reservation.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async prueba(): Promise<void> {
    const mailOptions = {
      from: 'maximiliano.mosquera1@gmail.com',
      to: 'indisardi99@gmail.com',
      subject: 'Prueba',

      html: 'Prueba',
    };
  }

  async sendUserConfirmation(user: User): Promise<void> {
    const mailOptions = {
      from: '"Hotel Eclipse Royale" <contactoeclipseroyale@gmail.com>',
      to: user.email,
      subject: 'Registro exitoso',
      text: '¡Gracias por registrarte!',
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
        <a href="https://front-hotel-app-six.vercel.app/" class="button">Volver al inicio</a>
      </div>
      <div class="footer">
        <p>&copy; 2024 Hotel Eclipse Royale. Todos los derechos reservados.</p>
      </div>
    </div>
  </body>
  </html>`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendHotelUpdates(user: User): Promise<void> {
    const mailOptions = {
      from: '"Hotel Eclipse Royale" <contactoeclipseroyale@gmail.com>',
      to: user.email,
      subject: 'Novedades en Hotel Eclipse Royale',
      text: '¡Descubre las últimas novedades en nuestra página!',
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
      .updates {
        text-align: left;
        padding: 10px;
        border-top: 1px solid #e1e1e1;
        margin-top: 20px;
      }
      .update-item {
        margin-bottom: 15px;
      }
      .update-item h3 {
        color: #000000;
        font-size: 18px;
        margin: 0;
      }
      .update-item p {
        color: #555555;
        font-size: 16px;
        margin: 5px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Hotel Eclipse Royale</h1>
      </div>
      <div class="content">
        <h2>¡Hola, ${user.name}!</h2>
        <p>Estamos emocionados de compartir contigo algunas nuevas características que hemos implementado en nuestra página:</p>
        <div class="updates">
          <div class="update-item">
            <h3>Chatbot Dinámico</h3>
            <p>Ahora contamos con un chatbot potenciado con inteligencia artificial que será tu guía en nuestra web. Podrá proporcionarte información sobre precios de reservas, categorías de habitaciones y mucho más.</p>
          </div>
          <div class="update-item">
            <h3>Sistema de Reservas Mejorado</h3>
            <p>Hemos simplificado el proceso de reserva en nuestra página para que puedas hacerlo de manera rápida y sencilla.</p>
          </div>
          <div class="update-item">
            <h3>Edición de Usuario</h3>
            <p>Ahora podrás editar tu perfil para personalizarlo aún más, brindándote una experiencia más completa y personalizada.</p>
          </div>
        </div>
        <a href="https://front-hotel-app-six.vercel.app/" class="button">Ver qué hay de nuevo!</a>
      </div>
      <div class="footer">
        <p>&copy; 2024 Hotel Eclipse Royale. Todos los derechos reservados.</p>
      </div>
    </div>
  </body>
  </html>`,
    };

    await this.transporter.sendMail(mailOptions);
  }


  async sendReservationEmail(
    email: string,
    name: string,
    reservation: Reservation,
    services: string[],
  ): Promise<void> {
    console.log('Sending reservation email to:', email);

    const mailOptions = {
      from: '"Hotel Eclipse Royale" <contactoeclipseroyale@gmail.com>',
      to: email,
      subject: 'Detalles de tu reserva en Hotel Eclipse Royale',
      text: '¡Gracias por tu reserva!',
      html: `
      <body style="font-family: Arial, sans-serif; background-color: #f0f4ff; margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; box-sizing: border-box;">
        <div style="background-color: #ffffff; max-width: 600px; width: 100%; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); text-align: center;">
          <img style="margin-bottom: 20px; border-radius: 8px;" src="https://front-hotel-app-six.vercel.app//_next/image?url=%2Flogo.png&w=256&q=75" alt="Logo" width="150" height="100">
          <h1 style="color: #333333; font-size: 20px;">¡Tu reserva ha sido confirmada, ${name}!</h1>
          <p style="color: #333333;">Aquí tienes los detalles de tu reserva en Hotel Eclipse Royale:</p>
          <p style="color: #333333;"><strong>ID de Reserva:</strong> ${reservation.id}</p>
          <p style="color: #ff3838; font-size: 10px"><strong>Puedes usar el ID de la reserva para cancelar tu reserva por medio de nuestro chatbot</strong></p>          
          <p style="color: #333333;"><strong>Checkin:</strong> ${reservation.startDate}</p>
          <p style="color: #333333;"><strong>Checkout:</strong> ${reservation.endDate}</p>
          <p style="color: #333333;"><strong>Servicios solicitados:</strong> ${services.join(', ') || 'No se solicitaron servicios adicionales'}</p>
          <p style="color: #333333;"><strong>Número de Habitación:</strong> ${reservation.room.number}</p>
          <p style="color: #333333;"><strong>Costo Total:</strong> $${reservation.price}</p>
          <a href="https://front-hotel-app-six.vercel.app/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #7f69b9; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">Volver al hotel</a>
          <p style="color: #666666; margin-top: 20px;">Si no puedes hacer click en el botón, visita este <a href="https://front-hotel-app-six.vercel.app/" style="color: #5120cc; text-decoration: none;">enlace</a>.</p>
        </div>
      </body>`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendUserConfirmationGoogle(user: User): Promise<void> {
    const mailOptions = {
      from: '"Hotel Eclipse Royale" <contactoeclipseroyale@gmail.com>',
      to: user.email,
      subject: 'Registro exitoso',
      text: '¡Gracias por registrarte!',
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
        <a href="https://front-hotel-app-six.vercel.app/" class="button">Volver al inicio</a>
      </div>
      <div class="footer">
        <p>&copy; 2024 Hotel Eclipse Royale. Todos los derechos reservados.</p>
      </div>
    </div>
  </body>
  </html>`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendAdminWelcome(user: User, password: string): Promise<void> {
    const mailOptions = {
      from: '"Hotel Eclipse Royale" <contactoeclipseroyale@gmail.com>',
      to: user.email,
      subject: 'Bienvenido a Hotel Eclipse Royale',
      text: '¡Bienvenido al equipo!',
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
      .credentials {
        background-color: #f7e5b4;
        border: 1px solid #d4af37;
        padding: 10px;
        margin: 20px 0;
        border-radius: 5px;
        text-align: left;
        color: #000000;
        font-size: 16px;
      }
      .credentials p {
        margin: 5px 0;
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
        <h2>¡Bienvenido al equipo, ${user.name}!</h2>
        <p>Nos complace darte la bienvenida como administrador del Hotel Eclipse Royale. A partir de ahora tendrás acceso a las siguientes características:</p>
        <ul>
          <li>Creación y edición de habitaciones, servicios y características.</li>
          <li>Control y gestión de usuarios.</li>
          <li>Seguimiento detallado de las ganancias del hotel.</li>
        </ul>
        <p>Tus credenciales de acceso son las siguientes:</p>
        <div class="credentials">
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Password:</strong> ${password}</p>
        </div>
        <a href="https://front-hotel-app-six.vercel.app/" class="button">Acceder a la plataforma</a>
      </div>
      <div class="footer">
        <p>&copy; 2024 Hotel Eclipse Royale. Todos los derechos reservados.</p>
      </div>
    </div>
  </body>
</html>
`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
