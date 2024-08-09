import { https } from 'firebase-functions';
import { createTransport } from 'nodemailer';
import { google } from 'googleapis';

// Google Calendar setup
const calendar = google.calendar('v3');
const calendarId = 'YOUR_CALENDAR_ID'; // Replace with your calendar ID

const oauth2Client = new google.auth.OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URL'
);
oauth2Client.setCredentials({
  refresh_token: 'YOUR_REFRESH_TOKEN',
});

// Create a calendar event
async function createCalendarEvent(mentorEmail, menteeEmail, dateTime) {
  const event = {
    summary: `Call with ${menteeEmail}`,
    description: `Call scheduled with ${menteeEmail} via Google Meet.`,
    start: {
      dateTime: dateTime,
      timeZone: 'America/Los_Angeles', // Adjust timezone as needed
    },
    end: {
      dateTime: new Date(new Date(dateTime).getTime() + 30 * 60000).toISOString(), // 30 min duration
      timeZone: 'America/Los_Angeles',
    },
    attendees: [
      { email: mentorEmail },
      { email: menteeEmail },
    ],
    conferenceData: {
      createRequest: {
        requestId: 'sample123',
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  };

  return calendar.events.insert({
    auth: oauth2Client,
    calendarId: calendarId,
    resource: event,
    conferenceDataVersion: 1,
  });
}

// Send email notification
async function sendEmail(mentorEmail, menteeEmail, dateTime) {
  const transport = createTransport({
    service: 'gmail',
    auth: {
      user: 'YOUR_EMAIL',
      pass: 'YOUR_PASSWORD',
    },
  });

  const mailOptions = {
    from: 'YOUR_EMAIL',
    to: mentorEmail,
    subject: 'New Call Booking',
    text: `You have a new call booked with ${menteeEmail} on ${dateTime}.`,
  };

  return transport.sendMail(mailOptions);
}

export const bookCall = https.onRequest(async (req, res) => {
  const { mentorEmail, menteeEmail, dateTime } = req.body;
  try {
    const calendarResponse = await createCalendarEvent(mentorEmail, menteeEmail, dateTime);
    const emailResponse = await sendEmail(mentorEmail, menteeEmail, dateTime);
    res.status(200).send({
      calendarResponse: calendarResponse.data || calendarResponse,
      emailResponse: emailResponse.response || emailResponse
    });
  } catch (error) {
    console.error('Error booking call:', error);
    res.status(500).send(error.message);
  }
});
