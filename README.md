# Nexus — Internal Portal

A simple internal portal for team announcements with authentication. Built as a take-home task for a Full Stack Engineer position.

**Features**: Login → Dashboard → Announcements (view + create). Auth, validation, clean separation.
**State Management**: React local state (useState). No Redux — scope is one vertical slice with minimal shared state.
**Repo**: https://github.com/Inkithai/NEXUS

## Key Decisions

### Architecture & Project Structure
- **Next.js 14 App Router**: Chosen for built-in API routes, server components, and excellent TypeScript support
- **Component-based structure**: Clear separation between UI components, API routes, and utilities
- **File-based routing**: Leveraging Next.js conventions for intuitive navigation
- **Single vertical slice**: Focused on announcements feature rather than multiple half-implemented features

### Authentication Strategy
- **Session-based auth with HTTP-only cookies**: More secure than localStorage, prevents XSS attacks
- **bcrypt for password hashing**: Industry-standard for secure password storage
- **Middleware for route protection**: Centralized auth check for protected routes
- **Custom implementation**: Simple, no external auth dependencies, demonstrates understanding of auth fundamentals

### Data Storage
- **SQLite with Prisma ORM**: Chosen for simplicity and zero configuration (no separate database server needed)
- **Prisma for type-safe database access**: Excellent TypeScript integration and migration management
- **Schema with User and Announcement models**: Simple relational structure with proper foreign keys

### State Management
- **React local state (useState)**: Chosen because the scope is limited to one vertical slice
- **No Redux/Zustand**: Would be overkill for this scale; demonstrates judgment on when to use complex state management
- **Optimistic UI updates**: Form submission triggers immediate list refresh for responsive UX

### API Design
- **RESTful conventions**: GET/POST methods, proper status codes, error handling
- **Zod validation**: Type-safe input validation on both client and server
- **Protected routes**: All API endpoints check for valid session cookies
- **JSON responses**: Standard format for frontend consumption

### UI/UX Choices
- **Tailwind CSS**: Utility-first CSS for rapid development without custom CSS files
- **Responsive design**: Mobile-friendly layout using Tailwind's responsive utilities
- **Loading states**: Skeleton screens and loading indicators for better UX
- **Error handling**: User-friendly error messages with clear action guidance

## Setup and Run Guide

### Prerequisites

- Node.js (v18 or higher)
- npm package manager
- Git (optional, for cloning the repository)

### Installation

1. **Clone the repository** (if not already cloned):
   ```bash
   git clone https://github.com/Inkithai/NEXUS.git
   cd NEXUS
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Environment Setup

1. **Create environment file**:
   ```bash
   copy .env.example .env
   ```

2. **Configure environment variables** in `.env`:
   ```
   DATABASE_URL="file:./dev.db"
   AUTH_SECRET="your-secure-secret-key-here"
   ```
   
   - `DATABASE_URL`: SQLite database file path (default is fine for development)
   - `AUTH_SECRET`: Generate a secure random string for session encryption

### Database Setup

1. **Generate Prisma client**:
   ```bash
   npx prisma generate
   ```

2. **Run database migrations**:
   ```bash
   npx prisma migrate dev --name init
   ```

   This will create the SQLite database and set up the required tables (User and Announcement).

### Running the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```
   (If port 3000 is occupied, Next.js will automatically try 3001, 3002, etc.)

### Testing the Application

1. **First-time setup**: Create an account
   - Navigate to the login page
   - Click "Don't have an account? Sign up"
   - Fill in name, email, and password
   - Submit to create your account

2. **Login**: Use your credentials to log in

3. **Create announcements**:
   - On the dashboard, fill in the announcement form
   - Enter title and content
   - Click "Post Announcement"

4. **View announcements**:
   - Announcements appear in the right panel
   - Shows author info and timestamp
   - Most recent announcements appear first

5. **Logout**: Click the logout button to end your session

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npx prisma studio` - Open Prisma Studio to manage database

### Project Structure

```
NEXUS/
├── app/
│   ├── api/
│   │   ├── announcements/
│   │   │   └── route.ts          # Announcements API endpoints
│   │   └── auth/
│   │       ├── login/
│   │       │   └── route.ts      # Login authentication endpoint
│   │       ├── register/
│   │       │   └── route.ts      # User registration endpoint
│   │       ├── logout/
│   │       │   └── route.ts      # Logout endpoint
│   │       └── me/
│   │           └── route.ts      # Current user endpoint
│   ├── dashboard/
│   │   └── page.tsx             # Dashboard page
│   ├── login/
│   │   └── page.tsx             # Login page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page (redirects)
│   └── globals.css              # Global styles
├── components/
│   └── announcements/
│       ├── announcement-card.tsx
│       ├── announcement-form.tsx
│       └── announcement-list.tsx
├── lib/
│   ├── auth/
│   │   └── session.ts            # Authentication session management
│   └── prisma.ts                 # Prisma client instance
├── prisma/
│   └── schema.prisma             # Database schema
├── middleware.ts                 # Route protection middleware
├── .env.example                  # Environment variables template
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

### Technology Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: Custom implementation with bcrypt
- **Validation**: Zod

### Features

- User authentication (login/logout/registration)
- Dashboard with announcements overview
- Create and view announcements
- Session management with secure cookies
- Form validation with Zod
- Responsive design
- Route protection middleware
- Real-time UI updates

### Troubleshooting

**Port already in use**:
- If port 3000 is occupied, the dev server will automatically try the next available port (3001, 3002, etc.)

**Database errors**:
- Ensure `.env` file is properly configured
- Run `npx prisma migrate dev` to set up the database
- Check that the `dev.db` file exists in the project root

**Module not found errors**:
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

**Authentication issues**:
- Clear browser cookies to reset session
- Check that cookies are enabled in your browser
- Verify the session cookie is being set (check browser DevTools)

### Development Notes

- The application uses local React state (useState) instead of Redux for simplicity
- Authentication uses session-based auth with secure cookies
- Database migrations should be run when schema changes
- API routes are located in the `app/api` directory following Next.js 14 conventions
- Middleware handles route protection at the edge for better performance