import React, { useState } from 'react';
import { Plus, Minus, Trash2, Save, Calendar } from 'lucide-react';
import { products } from '../../data/products';

interface PurchaseItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

const CreatePurchase: React.FC = () => {
  const [supplier, setSupplier] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [notes, setNotes] = useState('');

  const suppliers = [
    'ABC Suppliers Ltd.',
    'XYZ Trading Company',
    'Best Foods Distributor',
    'Premium Products Inc.',
    'Local Market Supplier'
  ];

  const addProduct = () => {
    if (!selectedProduct) return;

    const product = products.find(p => p.id.toString() === selectedProduct);
    if (!product) return;

    const existingItem = purchaseItems.find(item => item.id === product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      const newItem: PurchaseItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        total: product.price
      };
      setPurchaseItems([...purchaseItems, newItem]);
    }
    setSelectedProduct('');
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setPurchaseItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity, total: item.price * quantity }
          : item
      )
    );
  };

  const updatePrice = (id: number, price: number) => {
    setPurchaseItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, price, total: price * item.quantity }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setPurchaseItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotalAmount = () => {
    return purchaseItems.reduce((total, item) => total + item.total, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supplier || purchaseItems.length === 0) {
      alert('Please select a supplier and add at least one product');
      return;
    }

    const purchaseOrder = {
      supplier,
      date: purchaseDate,
      items: purchaseItems,
      total: getTotalAmount(),
      notes,
      status: 'Pending'
    };

    console.log('Purchase Order:', purchaseOrder);
    alert('✅ Purchase order created successfully!');
    
    // Reset form
    setSupplier('');
    setPurchaseDate(new Date().toISOString().split('T')[0]);
    setPurchaseItems([]);
    setNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Create Purchase Order</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Purchase Details */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Purchase Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supplier *
              </label>
              <select
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="form-input"
                required
              >
                <option value="">Select Supplier</option>
                {suppliers.map((sup, index) => (
                  <option key={index} value={sup}>{sup}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purchase Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="form-input pl-10"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Add Products */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Add Products</h3>
          <div className="flex gap-2">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="form-input flex-1"
            >
              <option value="">Select Product</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} (₹{product.price})
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addProduct}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              Add
            </button>
          </div>
        </div>

        {/* Purchase Items */}
        {purchaseItems.length > 0 && (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Purchase Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {purchaseItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.name}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => updatePrice(item.id, Number(e.target.value))}
                          className="w-20 px-2 py-1 border rounded text-sm"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-600 hover:text-gray-800"
                          >
                            <Minus size={16} />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                            className="w-16 px-2 py-1 border rounded text-center text-sm"
                            min="1"
                          />
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-600 hover:text-gray-800"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ₹{item.total.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total */}
            <div className="mt-4 flex justify-end">
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  Total Amount: ₹{getTotalAmount().toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Additional Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter any additional notes or special instructions..."
            className="form-input h-24 resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-primary flex items-center gap-2"
          >
            <Save size={20} />
            Create Purchase Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePurchase;