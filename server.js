const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta para manejar el envío del formulario
app.post('/send-email', (req, res) => {
  const { nombre, email, mensaje } = req.body;

  // Configura el transporte de Nodemailer (usaremos Gmail en este caso)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Variable de entorno para tu correo
      pass: process.env.GMAIL_PASS  // Variable de entorno para tu contraseña de aplicación
    }
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'csdesign26@gmail.com', // Correo donde quieres recibir las solicitudes
    subject: 'Nueva solicitud de adopción',
    text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ success: false, message: 'Error al enviar el correo' });
    }
    res.send({ success: true, message: 'Correo enviado exitosamente' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
