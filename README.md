# HealthMate – Daily Wellness Tracker

HealthMate is a full-stack web application designed to help users track their daily wellness activities, including medication, water intake, sleep, and diet.

## Tech Stack

- **Frontend & Backend**: Next.js (App Router)
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT & Firebase Auth (Google Login)
- **Styling**: Tailwind CSS
- **Deployment**: Ready for Vercel / Similar

## Project Structure

- `/app`: App Router pages and API routes
- `/components`: Reusable UI components
- `/lib`: Database and Auth configurations
- `/models`: Mongoose schemas
- `/utils`: Helper functions
- `/hooks`: Custom React hooks
- `/styles`: Global styles

## Getting Started

### 1. Prerequisites

- Node.js (Latest LTS)
- MongoDB Atlas account (or local MongoDB)
- Firebase Project

### 2. Setup Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

MIT
