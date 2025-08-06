import React, { useState } from 'react';
import { Search, Plus, Minus, ShoppingCart, Trash2, Calculator } from 'lucide-react';
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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [discount, setDiscount] = useState(0);

  const categories = ['All', 'Snacks', 'Beverages', 'Dairy', 'Meat', 'Fruits', 'Bakery'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.code.toString().includes(searchTerm);
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const playBeepSound = () => {
    try {
      const audio = new Audio('/sounds/beep-07a.mp3');
      audio.play().catch(e => console.log('Could not play sound:', e));
    } catch (e) {
      console.log('Sound not available:', e);
    }
  };

  const addToCart = (product: typeof products[0]) => {
    playBeepSound();
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
  };

  const removeFromCart = (id: number) => {
    playBeepSound();
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    if (cart.length === 0) return;
    
    if (window.confirm('Are you sure you want to clear the cart?')) {
      playBeepSound();
      setCart([]);
      setDiscount(0);
    }
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getFinalTotal = () => {
    const subtotal = getTotalAmount();
    return Math.max(0, subtotal - discount);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }
    
    const finalTotal = getFinalTotal();
    const confirmMessage = `Complete checkout for ₹${finalTotal.toFixed(2)}?`;
    
    if (window.confirm(confirmMessage)) {
      alert(`✅ Checkout completed successfully!\nTotal: ₹${finalTotal.toFixed(2)}\nThank you for your purchase!`);
      clearCart();
    }
  };

  return (
    <div className="flex h-full gap-6">
      {/* Products Section */}
      <div className="flex-1 space-y-6">
        {/* Search and Categories */}
        <div className="card">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products by name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10"
                />
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
                <span className="text-lg font-bold text-primary">₹{product.price}</span>
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
                    <p className="text-primary font-semibold">₹{item.price}</p>
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
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{getTotalAmount().toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Discount:</span>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Math.max(0, Number(e.target.value)))}
                  className="w-20 px-2 py-1 text-right border rounded"
                  placeholder="0"
                  min="0"
                  max={getTotalAmount()}
                />
              </div>
              <div className="flex justify-between">
                <span>Tax (0%):</span>
                <span>₹0.00</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>₹{getFinalTotal().toFixed(2)}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={clearCart}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="flex-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                ✅ Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default POS;