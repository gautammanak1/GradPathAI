import express from 'express';
import { createTransport } from 'nodemailer';
import { json } from 'body-parser';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(json());
app.use(cors());

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-email-password'   // Replace with your email password
    }
});

app.post('/send-email', (req, res) => {
    const { email, jobs } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Job Listings',
        text: `Here are the job details:\n\n${jobs.map(job => `
            Position: ${job.position}
            Company: ${job.company}
            Location: ${job.location}
            Work Type: ${job.work_type}
            Date Posted: ${job.date_posted}
            Job Link: ${job.job_link || 'N/A'}
            Company Website: ${job.website || 'N/A'}
        `).join('\n\n')}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
