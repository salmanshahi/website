#!/bin/bash

echo "🚀 Setting up React POS System..."

# Create React app with Vite
npm create vite@latest react-pos-app -- --template react-ts
cd react-pos-app

# Install dependencies
npm install
npm install react-router-dom @types/node lucide-react chart.js react-chartjs-2 tailwindcss postcss autoprefixer @tailwindcss/forms

# Initialize Tailwind CSS
npx tailwindcss init -p

echo "✅ React POS System setup completed!"
echo "📁 Project created in: react-pos-app/"
echo "🔧 Next steps:"
echo "   1. cd react-pos-app"
echo "   2. Copy the source files from the provided code"
echo "   3. npm run dev"
echo ""
echo "🔑 Demo credentials:"
echo "   Email: demo@qtecsolution.net"
echo "   Password: 87654321"