# React POS System

A modern, responsive Point of Sale (POS) system built with React, TypeScript, and Tailwind CSS. This application provides comprehensive functionality for managing products, sales, purchases, customers, and inventory.

## 🚀 Features

### Core Functionality
- **Dashboard** - Overview with sales charts and key metrics
- **Point of Sale (POS)** - Interactive sales interface with cart management
- **Product Management** - Complete product catalog with categories, brands, and units
- **Customer & Supplier Management** - Contact management system
- **Sales & Purchase Tracking** - Transaction history and reporting
- **Inventory Management** - Stock tracking and management
- **User Authentication** - Secure login system with demo credentials

### Key Features
- 🎵 **Sound Effects** - Audio feedback for POS interactions
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🔍 **Search & Filter** - Advanced search capabilities across all modules
- 📊 **Charts & Analytics** - Visual data representation with Chart.js
- 💾 **Data Persistence** - Local storage for user data and preferences
- 🎨 **Modern UI** - Clean, intuitive interface with Tailwind CSS
- 🔐 **Authentication** - Role-based access control

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.1.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.11
- **Icons**: Lucide React
- **Charts**: Chart.js & React Chart.js 2
- **Routing**: React Router DOM 7.7.1
- **Build Tool**: Vite 7.0.4
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-pos-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔑 Demo Credentials

```
Email: demo@qtecsolution.net
Password: 87654321
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Dashboard/      # Dashboard-specific components
│   └── Layout/         # Layout components (Sidebar, Header)
├── contexts/           # React contexts (Auth, etc.)
├── data/              # Static data and mock data
├── pages/             # Page components
│   ├── Auth/          # Authentication pages
│   ├── Dashboard/     # Dashboard page
│   ├── POS/           # Point of Sale interface
│   ├── Products/      # Product management pages
│   ├── People/        # Customer & supplier pages
│   ├── Sales/         # Sales management
│   ├── Purchase/      # Purchase management
│   ├── Reports/       # Reporting pages
│   └── Profile/       # User profile page
└── assets/            # Static assets
```

## 🎯 Core Modules

### 1. Point of Sale (POS)
- Product selection with categories and search
- Shopping cart with quantity adjustments
- Discount application
- Sound effects for interactions
- Checkout process with confirmation

### 2. Product Management
- **Product List** - View and manage all products
- **Create Product** - Add new products to inventory
- **Import Products** - Bulk import via CSV/Excel
- **Brand Management** - Organize products by brand
- **Category Management** - Product categorization
- **Unit Management** - Measurement units (kg, pcs, etc.)

### 3. People Management
- **Customer Management** - Customer database
- **Supplier Management** - Supplier contacts and details

### 4. Sales & Purchase
- **Sales List** - Transaction history
- **Purchase List** - Purchase order tracking
- **Create Purchase** - Generate purchase orders

### 5. Reports & Analytics
- **Sales Report** - Detailed sales analytics
- **Inventory Report** - Stock levels and management
- **Dashboard Charts** - Visual data representation

## 🎨 UI Components

### Form Elements
- Custom styled inputs with Tailwind CSS
- Responsive form layouts
- Validation feedback

### Tables
- Sortable columns
- Pagination support
- Search and filter capabilities
- Action buttons (view, edit, delete)

### Navigation
- Collapsible sidebar
- Breadcrumb navigation
- User dropdown menu

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with:
- Custom color palette (primary, secondary, sidebar, accent)
- Inter font family
- Custom component classes

### Environment Setup
- TypeScript configuration for strict type checking
- ESLint for code quality
- Vite for fast development and building

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy
The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## 🎵 Audio Features

The POS system includes sound effects for:
- Adding items to cart
- Removing items from cart
- Clearing cart
- Checkout completion

Audio files are located in `public/sounds/`

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- Mobile devices (sm: 640px)
- Tablets (md: 768px)
- Desktop (lg: 1024px)
- Large screens (xl: 1280px)

## 🔐 Authentication System

- Local storage-based authentication
- Demo user credentials provided
- User registration functionality
- Password reset capability (simulated)
- Protected routes with automatic redirection

## 🎯 Future Enhancements

- Real-time inventory updates
- Barcode scanning integration
- Receipt printing functionality
- Advanced reporting and analytics
- Multi-store support
- Payment gateway integration
- Offline mode support

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ using React and TypeScript**
