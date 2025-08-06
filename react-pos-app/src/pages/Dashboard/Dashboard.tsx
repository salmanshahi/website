import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign 
} from 'lucide-react';
import SalesChart from '../../components/Dashboard/SalesChart';
import RevenueChart from '../../components/Dashboard/RevenueChart';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, icon, color }) => (
  <div className="card">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <div className={`flex items-center mt-2 text-sm ${
          changeType === 'increase' ? 'text-green-600' : 'text-red-600'
        }`}>
          {changeType === 'increase' ? (
            <TrendingUp size={16} className="mr-1" />
          ) : (
            <TrendingDown size={16} className="mr-1" />
          )}
          {change}
        </div>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Sales',
      value: '₹45,231',
      change: '+20.1% from last month',
      changeType: 'increase' as const,
      icon: <DollarSign size={24} className="text-white" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Orders',
      value: '2,345',
      change: '+15.3% from last month',
      changeType: 'increase' as const,
      icon: <ShoppingCart size={24} className="text-white" />,
      color: 'bg-green-500'
    },
    {
      title: 'Total Products',
      value: '1,234',
      change: '+2.5% from last month',
      changeType: 'increase' as const,
      icon: <Package size={24} className="text-white" />,
      color: 'bg-purple-500'
    },
    {
      title: 'Total Customers',
      value: '567',
      change: '-3.2% from last month',
      changeType: 'decrease' as const,
      icon: <Users size={24} className="text-white" />,
      color: 'bg-orange-500'
    }
  ];

  const recentOrders = [
    { id: '#12345', customer: 'John Doe', amount: '₹1,234', status: 'Completed', date: '2024-01-15' },
    { id: '#12346', customer: 'Jane Smith', amount: '₹2,456', status: 'Pending', date: '2024-01-15' },
    { id: '#12347', customer: 'Bob Johnson', amount: '₹789', status: 'Completed', date: '2024-01-14' },
    { id: '#12348', customer: 'Alice Brown', amount: '₹3,456', status: 'Processing', date: '2024-01-14' },
    { id: '#12349', customer: 'Charlie Wilson', amount: '₹567', status: 'Completed', date: '2024-01-13' }
  ];

  const topProducts = [
    { name: 'Kinder Joy (Boys)', sold: 145, revenue: '₹15,805' },
    { name: 'Ferrero Rocher Premium', sold: 89, revenue: '₹97,900' },
    { name: 'Dan Cake Classic Brownies', sold: 67, revenue: '₹9,380' },
    { name: 'Chicken Keema', sold: 45, revenue: '₹13,500' },
    { name: 'Fresh Fruits Mix', sold: 34, revenue: '₹6,800' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
          <SalesChart />
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <RevenueChart />
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <button className="text-primary hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Order ID</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Customer</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100">
                    <td className="py-3 px-2 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="py-3 px-2 text-sm text-gray-600">{order.customer}</td>
                    <td className="py-3 px-2 text-sm font-medium text-gray-900">{order.amount}</td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
            <button className="text-primary hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.sold} sold</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{product.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;