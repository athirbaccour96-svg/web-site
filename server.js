const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Basic Route
app.get('/', (req, res) => {
    res.send('Portfolio Backend is running');
});

// Contact Route
app.post('/submit_message', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    console.log('Received message:', { name, email, message });

    // TODO: Configure your email transport here (e.g., Gmail, Outlook, SendGrid)
    // This is a placeholder for actual email sending logic.
    /*
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-app-password'
        }
    });

    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com',
        subject: `Portfolio Message from ${name}`,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
    */

    // For now, simple success response
    res.status(200).json({ message: 'Message received (Check backend logs)' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
