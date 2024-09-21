const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Permitir solicitudes desde cualquier origen
app.use(express.json()); // Para parsear JSON

app.post('/enviar-correo', (req, res) => {
  const { nombre, apellido, telefono, correo } = req.body;

  if (!nombre || !apellido || !telefono || !correo) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: correo,
    subject: 'Solicitud de Adopción',
    text: `Nombre: ${nombre}\nApellido: ${apellido}\nTeléfono: ${telefono}\nCorreo: ${correo}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error al enviar el correo');
    }
    res.status(200).send('Correo enviado exitosamente');
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
