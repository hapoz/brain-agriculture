@echo off
REM Brain Agriculture - Quick Start Script for Windows

echo 🚀 Starting Brain Agriculture Backend...

REM Check if .env file exists
if not exist "api\.env" (
    echo ⚠️  Warning: .env file not found in api\ directory
    echo    Please create api\.env with your DATABASE_URL
    echo    Example: DATABASE_URL=postgresql://user:password@localhost:5432/brain_agriculture
    echo.
)

REM Check if Deno is installed
deno --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Deno is not installed. Please install Deno first:
    echo    https://deno.land/#installation
    pause
    exit /b 1
)

echo 📦 Setting up database...
deno task setup

if errorlevel 1 (
    echo ❌ Database setup failed. Please check your configuration.
    pause
    exit /b 1
)

echo ✅ Database setup completed successfully!
echo.
echo 🌐 Starting development server...
echo    API will be available at: http://localhost:3000
echo    Press Ctrl+C to stop the server
echo.
deno task dev 