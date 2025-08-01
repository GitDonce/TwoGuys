# Two Guys Backend

Backend API for the Two Guys application.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration

### Development

Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:3001` by default.

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linting
- `npm run lint:fix` - Fix linting issues
- `npm test` - Run tests

### API Endpoints

- `GET /` - Health check
- `GET /api/health` - Detailed health status

### Project Structure

```
backend/
├── src/
│   ├── index.ts          # Main server file
│   ├── routes/           # API routes (coming soon)
│   ├── middleware/       # Custom middleware (coming soon)
│   ├── models/           # Data models (coming soon)
│   └── utils/            # Utility functions (coming soon)
├── dist/                 # Compiled JavaScript
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables

See `.env.example` for all available configuration options.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request 