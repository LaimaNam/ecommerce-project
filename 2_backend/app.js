import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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
