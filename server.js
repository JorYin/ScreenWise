// Import necessary npm libraries
import dotenv from 'dotenv';
import express from 'express';
import passport from './config/passport.js';
import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
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
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(helmet());
app.use(morgan('dev'));

// Session Setup
const MongoStore = connectMongo(session);

app.use(session({
  secret: process.env.COOKIESECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongoUrl: process.env.MONGO_URL }),
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
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
const PORT = 6001;
mongoose.connect(process.env.MONGO_URL)
.then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
})
.catch((error) => console.log(`${PORT} did not connect`));

export default app;