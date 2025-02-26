const express = require('express');
const app = express();
// const shortid = require('shortid');
const { google } = require('googleapis');
const { web } = require('./client_secret_734486457800-stfa7g23b4b4aackt7s8gfs7ev0q1n8l.apps.googleusercontent.com.json');


const oauth2client = new google.auth.OAuth2('your_client_id', 'your_client_secret', 'redirect_url')

const scopes = ['https://www.googleapis.com/auth/calendar'];

const url = oauth2client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  include_granted_scopes: true
});

console.log(url)

//your redirect url path
app.get('/auth/success', (req, res) => {
  const { code } = req.query;
  oauth2client.getToken(code)
    .then((resp) => {
      console.log(resp)
      res.json({ resp })
    })
    .catch((err) => console.log(err));
})

app.listen(8000, () => console.log('server is listening'))




// const calen = async () => {
//   try {
//     // const auth = oauth2client.setCredentials(tokens.access_token)
//     // const auth = google.auth.fromJSON(tokens)
//     oauth2client.setCredentials({
//       access_token: '',
//       refresh_token: '',
//       expiry_date: ''
//     })
//     const calendar = google.calendar({ version: "v3" });

//     const event = {
//       summary: 'Google I/O 2015',
//       // 'location': '800 Howard St., San Francisco, CA 94103',
//       description: 'A chance to hear more about Google\'s developer products.',
//       start: {
//         dateTime: '2023-03-25T01:20:00+05:30',
//         timeZone: 'Asia/Kolkata',
//       },
//       end: {
//         dateTime: '2023-03-25T01:50:00+05:30',
//         timeZone: 'Asia/Kolkata',
//       },
//       attendees: [
//       ],
//       reminders: {
//         useDefault: false,
//         overrides: [
//           { method: 'email', 'minutes': 24 * 60 },
//           { method: 'popup', 'minutes': 10 },
//         ],
//       },
//       conferenceData: {
//         createRequest: { requestId: "random_rsnd" },
//       },
//     }
//     const resp = await calendar.events.insert({
//       auth: oauth2client,
//       calendarId: 'primary',
//       resource: event,
//       conferenceDataVersion: 1,
//       sendNotifications: true,
//     })

//     console.log(resp)
//   } catch (error) {
//     console.log(error)
//   }

// };
