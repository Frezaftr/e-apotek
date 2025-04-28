import React, { useEffect, useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    // Pastikan semua item minimal punya quantity 1
    const fixedCart = storedCart.map(item => ({
      ...item,
      quantity: item.quantity || item.qty || 1,
    }));
    setCartItems(fixedCart);
    localStorage.setItem('cart', JSON.stringify(fixedCart));
  }, []);

  const handleIncrement = (id) => {
    const updated = cartItems.map(item =>
      item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleDecrement = (id) => {
    const updated = cartItems.map(item =>
      item._id === id && (item.quantity || 1) > 1
        ? { ...item, quantity: (item.quantity || 1) - 1 }
        : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleRemove = (id) => {
    const updated = cartItems.filter(item => item._id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + (item.quantity || 1) * (item.harga || 0), 0);
  };
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Keranjang Belanja</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Keranjang kamu masih kosong.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item._id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.nama}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.nama}</h3>
                <p className="text-gray-500">Rp {(item.harga || 0).toLocaleString('id-ID')}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => handleDecrement(item._id)} className="bg-gray-100 p-2 rounded hover:bg-gray-200">
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => handleIncrement(item._id)} className="bg-gray-100 p-2 rounded hover:bg-gray-200">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-semibold text-blue-600">
                  Rp {((item.harga || 0) * (item.quantity || 1)).toLocaleString('id-ID')}
                </p>
                <button onClick={() => handleRemove(item._id)} className="mt-2 text-red-500 hover:text-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <h3 className="text-xl font-semibold">Total</h3>
            <p className="text-xl font-bold text-green-600">
              Rp {getTotal().toLocaleString('id-ID')}
            </p>
          </div>

          <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
             onClick={() => navigate('/checkout')}
            >
            Checkout Sekarang
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
