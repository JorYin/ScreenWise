# ScreenWise

ScreenWise is a web application designed to help users monitor and reduce their daily screen time. By incorporating social features such as friend connections and leaderboards, ScreenWise fosters a community-driven approach to promoting healthier screen habits.

---

## Features

- **Daily Screen Time Tracking**: Monitor your screen usage on a daily basis.
- **Social Integration**: Connect with friends to share progress and encourage each other.
- **Leaderboards**: Compete with friends to achieve the lowest screen time.

---

## Tech Stack

ScreenWise is built using the MERN stack:

- **Frontend**:
  - React (JavaScript)
  - Libraries:
    - Zustand (State Management)
    - Axios (API Calls)
    - React Router (Page Routing)
    - React Icons (Icons)
  - Tailwind CSS
- **Backend**:
  - Node.js with Express (API Endpoints)
  - MongoDB (Database)
  - Google OAuth 2.0 & Passport JS (Authentication)

---

## Installation

Follow these steps to set up and run ScreenWise locally:

### Prerequisites

Ensure you have the following installed:

1. **Node.js**: [Download Node.js](https://nodejs.org/)
2. **MongoDB**: Set up a MongoDB database ([MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local installation)
3. **Git**: [Download Git](https://git-scm.com/)
4. **Google Cloud Platform (GCP)**:
   - Create a project in GCP.
   - Enable the Google OAuth 2.0 API.
   - Generate credentials for a Web Client and get your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

---

## Backend Setup

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```
2. Install dependencies:
   
   ```bash
   npm install
   ```
3. Create a `.env` file in the server folder with the following environment variables:

   ```env
    MONGO_URL=your_mongo_connection_string
    COOKIESECRET=your_cookie_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```
    Replace everything with the appropriate values.
4. Start the backend server:

   ```bash
   npm start
   ```

## Frontend Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```
2. Install dependencies:
   
   ```bash
   npm install
   ```
3. Update API URL calls in the frontend code to match your local server or deployment URL.

4. Start the development server:

   ```bash
   npm run dev
   ```

## Configuration Notes

1. Authentication: Google OAuth 2.0 is used for user authentication. Ensure you have correctly set up your credentials in `.env` and registered the redirect URIs in GCP. Also make sure to change passport redirect URL.
2. URLs: Update both the backend and frontend API calls to match your local or deployed setup.
3. MongoDB: Verify your `MONGO_URL` is correct and accessible.
4. Safari or Apple Devices: If you are using Safari or an Apple device, you must disable cross-site tracking in your browser settings to use session-based authentication.

## Demo

- **A demonstration of ScreenWise is available in the following video:**
   



