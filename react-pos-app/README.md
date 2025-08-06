# React POS Application

A modern Point of Sale (POS) system built with React, TypeScript, and Tailwind CSS. This is a complete conversion from the original HTML/CSS/JavaScript POS system to a modern React application with all the same functionality plus enhanced features.

## Features

### Core POS Functionality
- **Complete POS Interface**: Product selection, cart management, and checkout process
- **Product Search**: Search by product name or barcode scanning
- **Category Filtering**: Filter products by categories (Snacks, Beverages, Dairy, Meat, Fruits, Bakery)
- **Shopping Cart**: Add/remove items, quantity management with +/- buttons
- **Customer Management**: Select and manage customer information
- **Discount System**: Apply fixed amount or percentage-based discounts
- **Sound Effects**: Audio feedback for cart operations (beep sounds)
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Additional Features
- **Dashboard**: Sales overview with interactive charts and KPIs
- **Product Management**: Complete product CRUD operations
- **Customer & Supplier Management**: Manage business relationships
- **Sales Reports**: Detailed analytics and reporting
- **User Authentication**: Secure login/registration system
- **Multi-page Navigation**: Full sidebar navigation with collapsible menus

## Technology Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Navigate to the React POS app directory:
```bash
cd react-pos-app
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Credentials

For testing purposes, you can use these demo credentials:
- **Email**: demo@qtecsolution.net
- **Password**: 87654321

Or create a new account using the signup page.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## POS System Usage

### Main POS Interface
1. **Customer Selection**: Enter customer name (defaults to "Walking Customer")
2. **Product Search**: 
   - Use barcode scanner button or enter barcode manually
   - Search products by name using the search input
   - Filter by category using category buttons
3. **Adding to Cart**: Click on any product to add it to cart
4. **Cart Management**:
   - Use +/- buttons to adjust quantities
   - Click trash icon to remove items (with confirmation)
   - Clear entire cart with confirmation dialog
5. **Checkout Process**:
   - Review items and total
   - Apply discounts (fixed amount or percentage)
   - Click checkout to complete sale

### Navigation
- **Dashboard**: View sales overview and analytics
- **POS**: Main point of sale interface
- **People**: Manage customers and suppliers
- **Products**: Product management and inventory
- **Sales**: View sales history and reports
- **Reports**: Detailed analytics and reporting

## Project Structure

```
react-pos-app/
├── public/
│   ├── images/         # Product images
│   └── sounds/         # Audio files for POS sounds
├── src/
│   ├── components/     # Reusable components
│   │   ├── Dashboard/  # Dashboard charts and widgets
│   │   └── Layout/     # Header, Sidebar, Layout components
│   ├── contexts/       # React contexts (Authentication)
│   ├── data/          # Product data and mock data
│   ├── pages/         # Page components
│   │   ├── Auth/      # Login, Signup, Forgot Password
│   │   ├── Dashboard/ # Main dashboard
│   │   ├── POS/       # Point of Sale interface
│   │   ├── Products/  # Product management
│   │   ├── People/    # Customer/Supplier management
│   │   ├── Sales/     # Sales management
│   │   ├── Reports/   # Analytics and reports
│   │   └── Profile/   # User profile
│   ├── App.tsx        # Main app with routing
│   └── main.tsx       # Entry point
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## Key Features Converted from Original

### ✅ Completed Conversions
- **POS Interface**: Complete cart functionality with all original features
- **Product Grid**: Responsive product display with images and pricing
- **Search & Filter**: Barcode search and category filtering
- **Cart Operations**: Add, remove, update quantities with confirmations
- **Discount System**: Both fixed amount and percentage discounts
- **Customer Management**: Customer input with clear functionality
- **Sound Effects**: Beep sounds for cart operations
- **Sidebar Navigation**: Collapsible menu system
- **User Authentication**: Login/logout with session management
- **Responsive Design**: Mobile-friendly interface

### 🎯 Enhanced Features
- **Modern UI**: Clean, professional design with Tailwind CSS
- **TypeScript**: Type safety and better development experience
- **Component Architecture**: Reusable, maintainable code structure
- **State Management**: Proper React state management
- **Routing**: Client-side routing with React Router
- **Charts & Analytics**: Interactive dashboard with Chart.js

## Product Data

Products are stored in `src/data/products.ts` with the following structure:
```typescript
{
  id: number,
  name: string,
  price: number,
  image: string,
  code: number,
  category: string
}
```

Images are stored in `public/images/` and referenced as `/images/filename.png`.

## Customization

### Adding New Products
Edit `src/data/products.ts`:
```typescript
{
  id: 19,
  name: "New Product",
  price: 150,
  image: "/images/new-product.png",
  code: 999,
  category: "Snacks"
}
```

### Styling Customization
- Global styles: `src/index.css`
- Tailwind config: `tailwind.config.js`
- Component-specific styles: Use Tailwind classes

### Adding New Pages
1. Create component in appropriate `src/pages/` directory
2. Add route in `src/App.tsx`
3. Update sidebar navigation in `src/components/Layout/Sidebar.tsx`

## Comparison with Original

| Feature | Original HTML/JS | React Version |
|---------|-----------------|---------------|
| Architecture | Vanilla JS | React + TypeScript |
| Styling | Custom CSS | Tailwind CSS |
| State Management | DOM manipulation | React state |
| Routing | Multi-page HTML | Single Page App |
| Code Organization | Scattered files | Component-based |
| Type Safety | None | Full TypeScript |
| Build Process | None | Vite build system |
| Development Experience | Basic | Hot reload, linting |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions about the React POS system, please create an issue in the repository.

---

**Note**: This React application maintains all the functionality of the original HTML/CSS/JavaScript POS system while providing a modern, scalable, and maintainable codebase.
