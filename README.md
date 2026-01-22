# Doctor Booking App - HealthCare+

A full-stack doctor booking application where patients can log in and book GP appointments.

## Tech Stack

### Frontend
- **Vite** - Build tool
- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **React Router** - Navigation
- **TailwindCSS** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM

## Project Structure

```
booking-app/
├── backend/
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   └── server.ts       # Entry point
│   ├── tests/              # Test files
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/         # Images, styles, etc.
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services (RTK Query)
│   │   ├── store/          # Redux store and slices
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   ├── App.tsx         # App component
│   │   └── main.tsx        # Entry point
│   ├── public/             # Static files
│   ├── index.html          # HTML template
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/booking-app
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

5. Start the development server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend application will run on `http://localhost:3000`

## Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run linter

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run lint` - Run linter

## Features (To be implemented)

- [ ] User authentication (patients and doctors)
- [ ] Patient registration and login
- [ ] Browse doctors by specialization
- [ ] View doctor profiles and availability
- [ ] Book appointments
- [ ] View and manage appointments
- [ ] Cancel/reschedule appointments
- [ ] Dashboard for patients
- [ ] Dashboard for doctors
- [ ] Admin panel

## Current Status

✅ Basic project structure created
✅ Frontend UI pages designed (HTML/CSS only)
✅ Redux store structure set up
✅ Backend folder structure created
✅ TypeScript configuration
✅ TailwindCSS integration

⏳ Authentication - To be implemented
⏳ API endpoints - To be implemented
⏳ Database integration - To be implemented
⏳ Testing - To be implemented

## Pages

- **Home** - Landing page with features and CTAs
- **Login** - User login page
- **Register** - New user registration
- **Dashboard** - User dashboard with appointment stats
- **Doctors** - Browse and search doctors
- **Appointments** - View and manage appointments

## License

MIT