// Import necessary npm libraries
import dotenv from 'dotenv';
import express from 'express';
import passport from './config/passport.js';
import session from 'express-session';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Loading the config
dotenv.config();

// Importing Routes
import authRouter from './routes/auth.js';
import indexRouter from './routes/index.js';
import userRouter from './routes/users.js';

const app = express();

// Middleware Setup
app.use(express.json());
app.use(cors({
  origin: 'https://screen-wise.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));

// Session Setup
app.use(session({
  secret: process.env.COOKIESECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/api/users', userRouter);

// Mongoose SetUp
// Checking to see if there is any error connecting to the mongoDB using the PORT
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));