#!/bin/bash

# Brain Agriculture - Quick Start Script
echo "🚀 Starting Brain Agriculture Backend..."

# Check if .env file exists
if [ ! -f "api/.env" ]; then
    echo "⚠️  Warning: .env file not found in api/ directory"
    echo "   Please create api/.env with your DATABASE_URL"
    echo "   Example: DATABASE_URL=postgresql://user:password@localhost:5432/brain_agriculture"
    echo ""
fi

# Check if Deno is installed
if ! command -v deno &> /dev/null; then
    echo "❌ Deno is not installed. Please install Deno first:"
    echo "   https://deno.land/#installation"
    exit 1
fi

echo "📦 Setting up database..."
deno task setup

if [ $? -eq 0 ]; then
    echo "✅ Database setup completed successfully!"
    echo ""
    echo "🌐 Starting development server..."
    echo "   API will be available at: http://localhost:3000"
    echo "   Press Ctrl+C to stop the server"
    echo ""
    deno task dev
else
    echo "❌ Database setup failed. Please check your configuration."
    exit 1
fi 