# Job Tracker

A full-stack job application tracker that helps you manage your job search — track applications, monitor progress through different hiring stages, and store interview prep notes.

## Features

- **Application Tracking** — Log job applications with company, role, status, source, salary range, and contact details
- **Status Pipeline** — Track progress through applied → screening → interview → offer / rejected / withdrawn
- **Interview Prep Notes** — Store question-and-answer pairs organised by category (e.g. React, Behavioural, System Design)
- **Authentication** — Secure register/login/logout with HTTP-only cookie sessions via Supabase Auth

## Tech Stack

### Frontend
- **Vite** — Build tool
- **React 18** — UI library
- **TypeScript** — Type safety
- **Redux Toolkit** — State management
- **Axios** — HTTP client
- **React Router v6** — Navigation
- **TailwindCSS** — Styling

### Backend
- **Node.js** — Runtime environment
- **Express** — Web framework
- **TypeScript** — Type safety
- **Supabase** — PostgreSQL database + Auth
- **Cookie Parser** — HTTP-only cookie sessions
- **CORS** — Cross-origin request handling

## Project Structure

```
booking-app/
├── backend/
│   ├── src/
│   │   ├── config/         # Supabase client setup
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # Data model types
│   │   ├── routes/         # API routes
│   │   └── server.ts       # Entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/         # Styles
│   │   ├── components/     # Reusable components (Navbar, Footer, Layout)
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── store/          # Redux store and slices
│   │   ├── types/          # TypeScript types
│   │   ├── App.tsx         # App component
│   │   └── main.tsx        # Entry point
│   ├── public/             # Static files
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
└── README.md
```

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login | No |
| POST | `/api/auth/logout` | Logout | Yes |
| GET | `/api/applications` | Get all user applications | Yes |
| POST | `/api/applications` | Create an application | Yes |
| GET | `/api/applications/:id` | Get a specific application | Yes |
| PUT | `/api/applications/:id` | Update an application | Yes |
| DELETE | `/api/applications/:id` | Delete an application | Yes |
| GET | `/api/prep-notes` | Get all prep notes | Yes |
| POST | `/api/prep-notes` | Create a prep note | Yes |
| GET | `/api/prep-notes/:id` | Get a specific prep note | Yes |
| PUT | `/api/prep-notes/:id` | Update a prep note | Yes |
| DELETE | `/api/prep-notes/:id` | Delete a prep note | Yes |
| GET | `/health` | Health check | No |

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm
- A [Supabase](https://supabase.com) project (free tier works)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

> **Note:** Use your project's **service role key** (not the anon key) so the backend can bypass Row Level Security.

4. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`.

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

The frontend will run on `http://localhost:5173`.

## Available Scripts

### Backend
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with nodemon |
| `npm run build` | Compile TypeScript |
| `npm start` | Run compiled production build |

### Frontend
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests |

## Pages

- **Home** — Landing page
- **Login** — User login
- **Register** — New user registration
- **Dashboard** — Overview of your job search activity
- **Applications** — View, add, and manage job applications
- **Prep Notes** — Manage interview preparation Q&A by category

## License

MIT