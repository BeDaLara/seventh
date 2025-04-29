const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS automático + headers manuais
app.use(cors({
  origin: 'https://bedalara.github.io/seventh',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://bedalara.github.io/seventh');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

app.options('*', (req, res) => {
  res.sendStatus(200);
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: "hkro kipi jywm mspe", // senha de app do Gmail
  },
});

app.post('/send-email', async (req, res) => {
  const { nome, email } = req.body;

  const mailOptions = {
    from: '7th.gearr@gmail.com',
    to: email,
    subject: 'Solicitação Recebida - SeventhGear',
    text: `Olá ${nome},\n\nRecebemos sua solicitação com sucesso! Em breve um revendedor entrará em contato.\n\nAtenciosamente,\nEquipe SeventhGear`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'E-mail enviado com sucesso.' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ error: 'Erro ao enviar e-mail.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
