# 🚀 Brain Agriculture - Setup Guide

## Quick Start

### Prerequisites

- [Deno](https://deno.land/#installation) installed
- PostgreSQL database running
- Environment file configured

### Environment Setup

1. Create `api/.env` file with your database configuration:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/brain_agriculture"
PORT=3000
```

### Running the Backend

#### Option 1: Automatic Scripts (Recommended)

```bash
# Linux/macOS
./start.sh

# Windows
start.bat
```

#### Option 2: Manual Commands

```bash
# Setup database and start development server
deno task full-dev

# Or step by step:
deno task setup    # Generate Prisma client, push schema, seed data
deno task dev      # Start development server with hot reload
```

## Available Commands

### Development

- `deno task dev` - Start development server with hot reload
- `deno task start` - Start production server
- `deno task full-dev` - Setup database and start development server

### Database Operations

- `deno task db:generate` - Generate Prisma client
- `deno task db:push` - Push schema to database
- `deno task db:migrate` - Run database migrations
- `deno task db:seed` - Seed database with sample data
- `deno task db:studio` - Open Prisma Studio
- `deno task db:reset` - Reset database
- `deno task db:deploy` - Deploy migrations to production

### Code Quality

- `deno task test` - Run tests
- `deno task test:watch` - Run tests in watch mode
- `deno task lint` - Run linter
- `deno task fmt` - Format code
- `deno task validate` - Run all validations

### Build & Deploy

- `deno task build` - Build application
- `deno task docker:build` - Build Docker image
- `deno task docker:run` - Run Docker container

## API Endpoints

Once running, the API will be available at `http://localhost:3000`:

- `GET /` - API information and documentation
- `GET /health` - Health check
- `GET /producer` - List producers
- `POST /producer` - Create producer
- `GET /producer/:id` - Get producer
- `PUT /producer/:id` - Update producer
- `DELETE /producer/:id` - Delete producer
- `GET /farm` - List farms
- `POST /farm` - Create farm
- `GET /farm/:id` - Get farm
- `PUT /farm/:id` - Update farm
- `DELETE /farm/:id` - Delete farm
- `GET /harvest` - List harvests
- `POST /harvest` - Create harvest
- `GET /harvest/:id` - Get harvest
- `PUT /harvest/:id` - Update harvest
- `DELETE /harvest/:id` - Delete harvest
- `GET /crop` - List crops
- `POST /crop` - Create crop
- `GET /crop/:id` - Get crop
- `PUT /crop/:id` - Update crop
- `DELETE /crop/:id` - Delete crop
- `GET /dashboard` - Dashboard analytics

## Project Structure

```
brain-agriculture/
├── api/                    # Backend API (NestJS)
│   ├── producer/          # Producer management
│   ├── farm/              # Farm management
│   ├── harvest/           # Harvest management
│   ├── crop/              # Crop management
│   ├── dashboard/         # Analytics dashboard
│   └── prisma/            # Database service
├── data/                  # Database layer
│   └── prisma/           # Prisma schema and migrations
├── start.sh              # Linux/macOS start script
├── start.bat             # Windows start script
└── deno.json             # Root workspace configuration
```

## Troubleshooting

### Common Issues

1. **Deno not found**: Install Deno from https://deno.land/#installation
2. **Database connection failed**: Check your `DATABASE_URL` in `api/.env`
3. **Port already in use**: Change the `PORT` in `api/.env` or stop other
   services
4. **Prisma client not generated**: Run `deno task db:generate`

### Getting Help

- Check the main [README.md](README.md) for detailed requirements
- Review the API documentation at `GET /` endpoint
- Check the health endpoint at `GET /health`
