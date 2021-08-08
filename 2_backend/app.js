import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import NewsletterEmail from './models/newsletterEmailModel.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// -- Connecting DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((res) => {
    console.log(`Connected to MongoDB`);
    // Starting server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  });

// ROUTES
app.get('/', (req, res) => {
  res.send('API is running...');
});

// -- POST route for newsletter emails
app.post('/api/newsletterEmails', (req, res) => {
  if (!req.body.email) {
    res.status(400).json({
      message: 'Please enter your email correctly!',
      success: false,
    });
    return;
  }

  const email = new NewsletterEmail(req.body);
  console.log(email);
  email
    .save()
    .then((data) => {
      res.json({
        message: 'You registered to our email list! Thank you!:)',
        success: true,
      });
    })
    .catch((err) => console.log(err));
});
