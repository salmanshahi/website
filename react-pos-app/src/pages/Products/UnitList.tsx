import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';

const UnitList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEntries, setShowEntries] = useState(10);

  const units = [
    { id: 1, name: 'Piece', shortName: 'pcs', description: 'Individual pieces', status: 'Active' },
    { id: 2, name: 'Kilogram', shortName: 'kg', description: 'Weight in kilograms', status: 'Active' },
    { id: 3, name: 'Gram', shortName: 'g', description: 'Weight in grams', status: 'Active' },
    { id: 4, name: 'Liter', shortName: 'l', description: 'Volume in liters', status: 'Active' },
    { id: 5, name: 'Milliliter', shortName: 'ml', description: 'Volume in milliliters', status: 'Active' },
    { id: 6, name: 'Box', shortName: 'box', description: 'Packaged boxes', status: 'Active' },
    { id: 7, name: 'Pack', shortName: 'pack', description: 'Packaged items', status: 'Active' },
    { id: 8, name: 'Dozen', shortName: 'dz', description: 'Set of 12 items', status: 'Active' },
  ];

  const filteredUnits = units.filter(unit =>
    unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Unit List</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add Unit
        </button>
      </div>

      {/* Controls */}
      <div className="card">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <select 
              value={showEntries} 
              onChange={(e) => setShowEntries(Number(e.target.value))}
              className="form-input w-20"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-600">entries</span>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search units..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Units Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Short Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUnits.slice(0, showEntries).map((unit, index) => (
                <tr key={unit.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{unit.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                      {unit.shortName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{unit.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      unit.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {unit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye size={16} />
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Info */}
        <div className="px-6 py-3 bg-gray-50 border-t">
          <div className="text-sm text-gray-500">
            Showing {Math.min(filteredUnits.length, showEntries)} of {filteredUnits.length} entries
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitList;