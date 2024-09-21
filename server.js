const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para manejar el envío de correos
app.post('/enviar-correo', async (req, res) => {
  const { nombre, apellido, telefono, correo } = req.body;

  // Validación simple de los datos recibidos
  if (!nombre || !apellido || !telefono || !correo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  // Configuración del transporte de correo (usa tus credenciales reales)
  const transporter = nodemailer.createTransport({
    service: 'gmail', // O 'Outlook' si prefieres usar Outlook
    auth: {
      user: process.env.CORREO_USUARIO, // Debes tener esta variable en tu configuración de entorno
      pass: process.env.CORREO_PASS,    // Contraseña o app password
    },
  });

  const mailOptions = {
    from: process.env.CORREO_USUARIO,
    to: 'csdesign26@gmail.com', // Cambia esto por el correo al que quieres enviar la solicitud
    subject: 'Nueva solicitud de adopción',
    text: `Nombre: ${nombre}\nApellido: ${apellido}\nTeléfono: ${telefono}\nCorreo: ${correo}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: 'Hubo un problema al enviar el correo.' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
