import React, { useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { Plus, Edit, Trash2, DollarSign, Settings } from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
  created: string;
}

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: '2691', phone: '', address: '', created: '12 Jul, 2025' },
    { id: 2, name: '656565656', phone: '', address: '', created: '07 Jul, 2025' },
    { id: 3, name: 'Abigayle Morar', phone: '(603) 701-6283', address: '3193 Bette VistaFabiolamouth, AL 65072', created: '19 Mar, 2025' },
    { id: 4, name: 'Aglae Keebler MD', phone: '1-458-415-2185', address: '9376 Lelia Station Suite 940 West Ivy, FL 58820', created: '19 Mar, 2025' },
    { id: 5, name: 'Ahmed', phone: '0808080', address: '', created: '26 Jun, 2025' },
    { id: 6, name: 'ahnaf', phone: '', address: '', created: '02 Jul, 2025' },
    { id: 7, name: 'Devyn Nader', phone: '843-730-5635', address: '633 Alaina Inlet Apt. 701 Port Demond, ME 94966', created: '19 Mar, 2025' },
    { id: 8, name: 'Gail Johnson V', phone: '817-993-8115', address: '831 Stehr Path Joannyborough, DC 50958-8387', created: '19 Mar, 2025' },
    { id: 9, name: 'hbdsbshbfh', phone: '', address: '', created: '08 Jul, 2025' },
    { id: 10, name: 'j', phone: '', address: '', created: '09 Jul, 2025' },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleAction = (action: string, customer: Customer) => {
    switch (action) {
      case 'edit':
        setEditingCustomer(customer);
        setFormData({
          name: customer.name,
          phone: customer.phone,
          address: customer.address
        });
        setShowEditForm(true);
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this customer?')) {
          setCustomers(customers.filter(c => c.id !== customer.id));
        }
        break;
      case 'sale':
        // Navigate to sales page - would use router in real app
        console.log('Navigate to sales for customer:', customer.name);
        break;
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      const newCustomer: Customer = {
        id: Math.max(...customers.map(c => c.id)) + 1,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        created: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      };
      setCustomers([...customers, newCustomer]);
      setFormData({ name: '', phone: '', address: '' });
      setShowCreateForm(false);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCustomer && formData.name && formData.phone) {
      setCustomers(customers.map(c => 
        c.id === editingCustomer.id 
          ? { ...c, name: formData.name, phone: formData.phone, address: formData.address }
          : c
      ));
      setFormData({ name: '', phone: '', address: '' });
      setShowEditForm(false);
      setEditingCustomer(null);
    }
  };

  const ActionDropdown = ({ customer }: { customer: Customer }) => {
    return (
      <select
        className="bg-indigo-300 text-black border-none px-3 py-1.5 rounded text-sm font-medium outline-none cursor-pointer appearance-none bg-no-repeat bg-right"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg fill='black' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\")",
          backgroundSize: '16px',
          backgroundPosition: 'right 8px center',
          paddingRight: '30px'
        }}
        onChange={(e) => {
          if (e.target.value) {
            handleAction(e.target.value, customer);
            e.target.value = '';
          }
        }}
        defaultValue=""
      >
        <option value="" disabled>⚙️ Action</option>
        <option value="edit">✏️ Edit</option>
        <option value="delete">🗑️ Delete</option>
        <option value="sale">💰 Sale</option>
      </select>
    );
  };

  const columns = [
    {
      name: '#',
      selector: (row: Customer) => row.id,
      sortable: true,
      width: '80px',
    },
    {
      name: 'Name',
      selector: (row: Customer) => row.name,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row: Customer) => row.phone,
      sortable: true,
    },
    {
      name: 'Address',
      selector: (row: Customer) => row.address,
      sortable: true,
    },
    {
      name: 'Created',
      selector: (row: Customer) => row.created,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row: Customer) => <ActionDropdown customer={row} />,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const customStyles = {
    table: {
      style: {
        backgroundColor: 'white',
      },
    },
    headRow: {
      style: {
        backgroundColor: '#f9fafb',
        borderBottomColor: '#e5e7eb',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
      },
    },
    headCells: {
      style: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#374151',
        paddingLeft: '24px',
        paddingRight: '24px',
        paddingTop: '12px',
        paddingBottom: '12px',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
        color: '#6b7280',
        paddingLeft: '24px',
        paddingRight: '24px',
        paddingTop: '16px',
        paddingBottom: '16px',
      },
    },
    rows: {
      style: {
        borderBottomColor: '#e5e7eb',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        '&:hover': {
          backgroundColor: '#f9fafb',
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Customer</h1>
        <button 
          className="bg-indigo-300 hover:bg-indigo-400 text-white px-4 py-2 rounded flex items-center gap-2 font-medium"
          onClick={() => setShowCreateForm(true)}
        >
          ➕ Add New
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Customers</h2>
          <DataTable
            columns={columns}
            data={customers}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            customStyles={customStyles}
            highlightOnHover
            responsive
          />
        </div>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">Add New Customer</h2>
          <form onSubmit={handleCreateSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setFormData({ name: '', phone: '', address: '' });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Form */}
      {showEditForm && editingCustomer && (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">Edit Customer</h2>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowEditForm(false);
                  setEditingCustomer(null);
                  setFormData({ name: '', phone: '', address: '' });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CustomerList;