const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Configurar transportador de e-mail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS // use uma senha de app, não a principal
    }
});

app.post('/send-email', async (req, res) => {
    const { nome, email } = req.body;

    const mailOptions = {
        from: '7th.gearr@gmail.com',
        to: email,
        subject: 'Solicitação Recebida - SeventhGear',
        text: `Olá ${nome},\n\nRecebemos sua solicitação com sucesso! Em breve um revendedor entrará em contato.\n\nAtenciosamente,\nEquipe SeventhGear`
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
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
