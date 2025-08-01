# Two Guys Monorepo

A full-stack application with React frontend and Node.js backend for city onboarding guides.

## 🏗️ Project Structure

```
two guys/
├── package.json              # Root workspace configuration
├── frontend/                  # Frontend (React + Vite + TypeScript)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── ApiTest.tsx   # API testing dashboard
│   │   │   ├── Index.tsx     # Main page
│   │   │   ├── Vilnius.tsx   # Vilnius city guide
│   │   │   └── Utena.tsx     # Utena city guide
│   │   ├── components/
│   │   │   ├── ApiTest.tsx   # API test component
│   │   │   └── ui/           # shadcn/ui components
│   │   └── services/
│   │       └── api.ts        # API service layer
│   ├── package.json
│   └── ...
└── backend/                   # Backend (Node.js + Express + TypeScript)
    ├── src/
    │   ├── index.ts          # Main server file
    │   ├── routes/
    │   │   └── items.ts      # Mock API endpoints
    │   ├── middleware/       # Custom middleware (ready for expansion)
    │   ├── models/           # Data models (ready for expansion)
    │   └── utils/            # Helper functions (ready for expansion)
    ├── package.json
    ├── tsconfig.json
    └── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

**Install all dependencies (root, frontend, and backend):**
```bash
npm install
```

*Thanks to npm workspaces, this single command installs all dependencies for the entire monorepo!*

### Development

#### Option 1: Run Both Services (Recommended)
```bash
npm run dev
```
This starts both frontend (port 5173) and backend (port 3001) simultaneously.

#### Option 2: Run Services Separately

**Frontend only:**
```bash
npm run dev:frontend
```

**Backend only:**
```bash
npm run dev:backend
```

### Environment Configuration

Create `.env` files (optional):

**Frontend (.env in frontend/):**
```env
VITE_API_URL=http://localhost:3001/api
```

**Backend (.env in backend/):**
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 🧪 Testing the API

1. **Start the development servers:**
   ```bash
   npm run dev
   ```

2. **Open your browser and navigate to:**
   - Frontend: http://localhost:5173
   - API Test Dashboard: http://localhost:5173/api-test
   - Backend Health Check: http://localhost:3001/api/health

3. **Use the API Test Dashboard to:**
   - ✅ Check backend connectivity
   - ✅ View mock items (Lithuanian-themed tasks)
   - ✅ Create new items
   - ✅ Update existing items
   - ✅ Mark items as complete/incomplete
   - ✅ Delete items

## 🔗 Available API Endpoints

The backend provides a RESTful API for managing items:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/items` | Get all items |
| GET | `/api/items/:id` | Get single item |
| POST | `/api/items` | Create new item |
| PUT | `/api/items/:id` | Update item |
| DELETE | `/api/items/:id` | Delete item |

### Example API Usage

**Create an item:**
```bash
curl -X POST http://localhost:3001/api/items \
  -H "Content-Type: application/json" \
  -d '{"title": "Visit Gediminas Tower", "description": "Explore the historic tower in Vilnius"}'
```

**Get all items:**
```bash
curl http://localhost:3001/api/items
```

## 📦 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run dev:frontend` - Start frontend only
- `npm run dev:backend` - Start backend only
- `npm run build` - Build both applications
- `npm run lint` - Lint both codebases

### Frontend (frontend/)
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend (backend/)
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌟 Features

### Frontend
- ⚡ Vite + React + TypeScript
- 🎨 shadcn/ui components
- 🎯 Tailwind CSS styling
- 🧭 React Router for navigation
- 🔄 Real-time API testing dashboard
- 📱 Responsive design

### Backend
- 🚀 Express.js with TypeScript
- 🔄 Hot reload with tsx
- 🛡️ CORS configured for frontend
- 📊 RESTful API design
- 🧪 Mock data for testing
- 📁 Organized folder structure

### Mock Data
The backend comes with Lithuanian-themed sample data:
- Visit Vilnius Old Town
- Check out Utena Lakes  
- Try Lithuanian cuisine

## 🛠️ Next Steps

1. **Database Integration:** Replace mock data with a real database (PostgreSQL, MongoDB, etc.)
2. **Authentication:** Add user authentication and authorization
3. **Validation:** Add request validation middleware
4. **Testing:** Add unit and integration tests
5. **Deployment:** Set up CI/CD and deployment configurations

## 🐛 Troubleshooting

### Backend not connecting?
1. Make sure backend is running on port 3001
2. Check that no other service is using port 3001
3. Verify CORS configuration in backend

### Frontend build issues?
1. Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
2. Check TypeScript configuration
3. Verify all imports are correct

### API Test Dashboard shows "Backend Disconnected"?
1. Ensure backend is running (`npm run dev:backend`)
2. Check browser console for error messages
3. Verify API URL in frontend configuration

## 📄 License

This project is part of a development monorepo setup. 