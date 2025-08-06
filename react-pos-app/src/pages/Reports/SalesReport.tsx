import React from 'react';
import { Calendar, Download, TrendingUp } from 'lucide-react';
import SalesChart from '../../components/Dashboard/SalesChart';

const SalesReport: React.FC = () => {
  const reportData = [
    { period: 'Today', sales: 15, revenue: '₹12,500' },
    { period: 'This Week', sales: 89, revenue: '₹75,300' },
    { period: 'This Month', sales: 345, revenue: '₹2,85,600' },
    { period: 'This Year', sales: 4200, revenue: '₹35,50,000' },
  ];

  const topProducts = [
    { name: 'Kinder Joy (Boys)', sales: 145, revenue: '₹15,805' },
    { name: 'Ferrero Rocher Premium', sales: 89, revenue: '₹97,900' },
    { name: 'Dan Cake Classic Brownies', sales: 67, revenue: '₹9,380' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Sales Report</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Calendar size={16} />
            Date Range
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportData.map((item, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{item.period}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{item.sales}</p>
                <p className="text-sm text-gray-500">Sales</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-green-600">{item.revenue}</p>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp size={16} className="mr-1" />
                  +12%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
          <SalesChart />
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.sales} units sold</p>
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

export default SalesReport;