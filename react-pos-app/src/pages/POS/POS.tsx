import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, Minus, ShoppingCart, Trash2, Calculator, X, Smartphone, User } from 'lucide-react';
import { products } from '../../data/products';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const POS: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [barcodeSearch, setBarcodeSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [customer, setCustomer] = useState('Walking Customer');
  const [discount, setDiscount] = useState(0);
  const [fractionalDiscount, setFractionalDiscount] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const beepSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    beepSoundRef.current = new Audio('/sounds/beep-07a.mp3');
  }, []);

  const categories = ['All', 'Snacks', 'Beverages', 'Dairy', 'Meat', 'Fruits', 'Bakery'];

  const playBeep = () => {
    if (beepSoundRef.current) {
      beepSoundRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.code.toString().includes(searchTerm);
    const matchesBarcode = barcodeSearch === '' || product.code.toString().includes(barcodeSearch);
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesBarcode && matchesCategory;
  });

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    playBeep();
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    playBeep();
  };

  const removeFromCart = (id: number) => {
    const item = cart.find(i => i.id === id);
    if (item && window.confirm(`Are you sure you want to delete "${item.name}" from cart?`)) {
      setCart(prev => prev.filter(item => item.id !== id));
      playBeep();
    }
  };

  const clearCart = () => {
    setCart([]);
    setShowConfirmClear(false);
    playBeep();
  };

  const confirmClearCart = () => {
    setShowConfirmClear(true);
  };

  const getSubTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getFinalTotal = () => {
    const subTotal = getSubTotal();
    if (fractionalDiscount) {
      return subTotal - (subTotal * (discount / 100));
    }
    return subTotal - discount;
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }
    
    alert('Checkout functionality coming soon!');
  };

  const clearCustomer = () => {
    if (window.confirm('Are you sure you want to delete "Walking Customer"?')) {
      setCustomer('');
      playBeep();
    }
  };

  return (
    <div className="flex h-full gap-6">
      {/* Products Section */}
      <div className="flex-1 space-y-6">
        {/* Customer Section */}
        <div className="card">
          <div className="flex items-center gap-3">
            <User className="text-gray-500" size={20} />
            <input
              type="text"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="flex-1 form-input"
              placeholder="Customer name"
            />
            <button
              onClick={clearCustomer}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Search and Categories */}
        <div className="card">
          <div className="space-y-4">
            <div className="flex gap-3">
              <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Smartphone size={18} />
              </button>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter Product Barcode"
                  value={barcodeSearch}
                  onChange={(e) => setBarcodeSearch(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Enter Product Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input pl-10"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="card p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => addToCart(product)}>
              <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">RS {product.price}</span>
                <span className="text-xs text-gray-500">#{product.code}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="w-full mt-3 bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="card text-center py-12">
            <p className="text-gray-500">No products found matching your search.</p>
          </div>
        )}
      </div>

      {/* Cart Section */}
      <div className="w-80 space-y-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ShoppingCart size={20} />
              Cart ({getTotalItems()})
            </h3>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ShoppingCart size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <p className="text-primary font-semibold">RS {item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calculator size={20} />
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Sub Total:</span>
                <span>RS {getSubTotal().toFixed(2)}</span>
              </div>
              
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Discount"
                  value={discount || ''}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  className="form-input"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="fractionalDiscount"
                    checked={fractionalDiscount}
                    onChange={(e) => setFractionalDiscount(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="fractionalDiscount" className="text-sm text-gray-600">
                    Apply Fractional Discount
                  </label>
                </div>
              </div>

              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>RS {getFinalTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button
                onClick={confirmClearCart}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                ✅ Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmClear && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <p className="text-gray-800 mb-4">Are you sure you want to clear the cart?</p>
            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirmClear(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POS;