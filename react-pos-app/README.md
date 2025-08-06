# React POS System

A modern Point of Sale (POS) system built with React, TypeScript, and Tailwind CSS. This application provides a complete solution for managing inventory, sales, customers, and business analytics.

## Features

### 🔐 Authentication
- User login and registration
- Password reset functionality
- Session management with localStorage
- Demo credentials: `demo@qtecsolution.net` / `87654321`

### 📊 Dashboard
- Real-time sales statistics
- Revenue and sales charts
- Recent orders overview
- Top-selling products
- Interactive charts using Chart.js

### 🛒 Point of Sale (POS)
- Product catalog with search and filtering
- Category-based product browsing
- Shopping cart with quantity management
- Real-time order total calculation
- Checkout process
- Product image gallery

### 📦 Product Management
- Product listing with search functionality
- Add new products
- Product categories (Snacks, Beverages, Dairy, Meat, Fruits, Bakery)
- Product codes and pricing
- Image management

### 👥 People Management
- Customer management
- Supplier management
- Contact information storage
- Search and filter capabilities

### 💰 Sales & Purchase Management
- Sales transaction history
- Purchase order management
- Order status tracking
- Invoice generation capabilities

### 📈 Reports & Analytics
- Sales reports with date filtering
- Inventory reports
- Low stock alerts
- Revenue analytics
- Export functionality

### ⚙️ User Profile
- Profile information management
- Password change functionality
- User avatar support

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Chart.js with react-chartjs-2
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **State Management**: React Context API

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-pos-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Demo Credentials

- **Email**: demo@qtecsolution.net
- **Password**: 87654321

## Project Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── SalesChart.tsx
│   │   └── RevenueChart.tsx
│   └── Layout/
│       ├── Layout.tsx
│       ├── Sidebar.tsx
│       └── Header.tsx
├── contexts/
│   └── AuthContext.tsx
├── data/
│   └── products.ts
├── pages/
│   ├── Auth/
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   └── ForgotPassword.tsx
│   ├── Dashboard/
│   │   └── Dashboard.tsx
│   ├── POS/
│   │   └── POS.tsx
│   ├── Products/
│   │   ├── ProductList.tsx
│   │   └── CreateProduct.tsx
│   ├── People/
│   │   ├── CustomerList.tsx
│   │   └── SupplierList.tsx
│   ├── Sales/
│   │   └── SalesList.tsx
│   ├── Purchase/
│   │   └── PurchaseList.tsx
│   ├── Reports/
│   │   ├── SalesReport.tsx
│   │   └── Inventory.tsx
│   └── Profile/
│       └── Profile.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## Key Features Implemented

### Authentication System
- Complete login/signup flow
- Protected routes
- User session management
- Demo account support

### POS System
- Product catalog with 18 sample products
- Category filtering (All, Snacks, Beverages, Dairy, Meat, Fruits, Bakery)
- Search functionality by name or product code
- Shopping cart with add/remove/quantity controls
- Order total calculation
- Checkout process

### Dashboard Analytics
- Sales statistics cards
- Interactive bar chart for sales trends
- Line chart for revenue tracking
- Recent orders table
- Top products listing

### Responsive Design
- Mobile-first approach
- Responsive sidebar navigation
- Adaptive grid layouts
- Touch-friendly interface

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Screenshots

The application includes:
- Modern login interface with demo credentials
- Comprehensive dashboard with charts and statistics
- Full-featured POS system with product catalog
- Product management with CRUD operations
- Customer and supplier management
- Sales and purchase tracking
- Detailed reports and analytics
- User profile management

## Future Enhancements

- Backend API integration
- Real-time notifications
- Barcode scanning
- Receipt printing
- Multi-store support
- Advanced reporting
- Mobile app version
