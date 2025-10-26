# Frontend README

This is the Next.js frontend application for the Stable Diffusion FastAPI Service.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Code Quality

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Type checking
npm run type-check

# Run all checks
npm run check-all
```

## Docker

```bash
# Build frontend image
docker build -t stable-diffusion-frontend .

# Run frontend container
docker run -p 3000:3000 stable-diffusion-frontend
```

## API Integration

The frontend is configured to communicate with the FastAPI backend at `http://localhost:8000` during development.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Lucide React** - Icon library
