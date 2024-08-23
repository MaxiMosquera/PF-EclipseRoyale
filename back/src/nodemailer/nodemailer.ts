const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gmailporbody@gmail.com', 
    pass: 'passwordgmail',
  },
});

const mailOptions = {
  from: 'eclipseroyale@gmail.com',
  to: 'gmailporbody@gmail.com',
  subject: 'Confirmación de registro',
  text: 'Gracias por registrarte en nuestra aplicación. Por favor, confirma tu correo electrónico haciendo clic en el siguiente enlace.',
};


transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error al enviar correo:', error);
  } else {
    console.log('Correo enviado:', info.response);
  }
});