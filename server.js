const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Middleware pour traiter les données JSON et les formulaires
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Utilisez Gmail comme service SMTP
    auth: {
        user: 'flavienkiema1@gmail.com', // Votre adresse Gmail
        pass: 'qdyi zbyp uhow cxyv', // Mot de passe d'application (voir ci-dessous)
    },
});

// Route pour gérer le formulaire de contact
app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    // Options de l'e-mail
    const mailOptions = {
        from: 'votre-email@gmail.com', // Expéditeur
        to: 'flavienkiema1@gmail.com', // Destinataire (votre adresse e-mail)
        subject: `Nouveau message de ${name}`, // Sujet de l'e-mail
        text: `Vous avez reçu un nouveau message de ${name} (${email}) :\n\n${message}`, // Corps de l'e-mail
    };

    // Envoyer l'e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
            res.status(500).send('Erreur lors de l\'envoi du message.');
        } else {
            console.log('E-mail envoyé avec succès :', info.response);
            res.status(200).send('Message envoyé avec succès !');
        }
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});