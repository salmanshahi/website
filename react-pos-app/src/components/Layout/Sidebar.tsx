import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  ShoppingCart, 
  Users, 
  Package, 
  Tag, 
  ShoppingBag, 
  TrendingUp, 
  Settings,
  ChevronDown,
  ChevronRight,
  Lock,
  User
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  collapsed: boolean;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <BarChart3 size={20} />,
    path: '/dashboard'
  },
  {
    id: 'pos',
    label: 'POS',
    icon: <ShoppingCart size={20} />,
    path: '/pos'
  },
  {
    id: 'people',
    label: 'People',
    icon: <Users size={20} />,
    children: [
      { id: 'customers', label: 'Customer', icon: null, path: '/customers' },
      { id: 'suppliers', label: 'Supplier', icon: null, path: '/suppliers' }
    ]
  },
  {
    id: 'products',
    label: 'Product',
    icon: <Package size={20} />,
    children: [
      { id: 'product-list', label: 'Product List', icon: null, path: '/products' },
      { id: 'product-create', label: 'Product Create', icon: null, path: '/products/create' },
      { id: 'brands', label: 'Brand', icon: null, path: '/brands' },
      { id: 'categories', label: 'Category', icon: null, path: '/categories' },
      { id: 'units', label: 'Unit', icon: null, path: '/units' }
    ]
  },
  {
    id: 'sales',
    label: 'Sale',
    icon: <Tag size={20} />,
    children: [
      { id: 'sales-list', label: 'Sale List', icon: null, path: '/sales' }
    ]
  },
  {
    id: 'purchases',
    label: 'Purchase',
    icon: <ShoppingBag size={20} />,
    children: [
      { id: 'purchase-list', label: 'Purchase List', icon: null, path: '/purchases' },
      { id: 'purchase-create', label: 'Purchase Create', icon: null, path: '/purchases/create' }
    ]
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <TrendingUp size={20} />,
    children: [
      { id: 'sales-summary', label: 'Sales Summary', icon: null, path: '/reports/sales-summary' },
      { id: 'sales-report', label: 'Sales', icon: null, path: '/reports/sales' },
      { id: 'inventory', label: 'Inventory', icon: null, path: '/reports/inventory' }
    ]
  }
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();
  const { user } = useAuth();

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isParentActive = (children: MenuItem[]) => {
    return children.some(child => child.path && isActive(child.path));
  };

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isItemActive = item.path ? isActive(item.path) : hasChildren ? isParentActive(item.children!) : false;

    if (hasChildren) {
      return (
        <div key={item.id}>
          <div
            className={`nav-link ${isItemActive ? 'active' : ''}`}
            onClick={() => toggleExpanded(item.id)}
          >
            {item.icon}
            {!collapsed && (
              <>
                <span className="nav-text">{item.label}</span>
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </>
            )}
          </div>
          {!collapsed && isExpanded && (
            <div className="submenu">
              {item.children?.map(child => (
                <Link
                  key={child.id}
                  to={child.path || '#'}
                  className={`submenu-link ${child.path && isActive(child.path) ? 'text-white bg-slate-700' : ''}`}
                >
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.path || '#'}
        className={`nav-link ${isItemActive ? 'active' : ''}`}
      >
        {item.icon}
        {!collapsed && <span className="nav-text">{item.label}</span>}
      </Link>
    );
  };

  return (
    <aside className={`bg-slate-800 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} flex flex-col`}>
      {/* User Section */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
            <Lock size={16} />
          </div>
          {!collapsed && (
            <span className="font-medium">{user?.name || 'User'}</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map(renderMenuItem)}
      </nav>

      {/* Settings Section */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-700">
          <div className="text-xs font-semibold text-gray-400 mb-3">SETTINGS</div>
          <div className="nav-link" onClick={() => toggleExpanded('website-settings')}>
            <Settings size={20} />
            <span className="nav-text">Website Settings</span>
            {expandedItems.includes('website-settings') ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          {expandedItems.includes('website-settings') && (
            <div className="submenu">
              <div className="submenu-link">
                <Settings size={16} />
                General Setting
              </div>
              <div className="submenu-link">
                <span className="text-yellow-400">💵</span>
                Currency
              </div>
              <div className="submenu-link">
                <User size={16} />
                User Management
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;