import React, { useState, useEffect } from 'react';
import { formatPrice } from '../../menu';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/carts");
        if (!response.ok) throw new Error("Failed to fetch cart items");

        const data = await response.json();
        setCart(data.cart || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = async (productId, action) => {
    const item = cart.find(item => item.productId === productId);
    if (!item) return;

    try {
      const response = await fetch("http://localhost:3001/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, action }),
      });

      if (!response.ok) throw new Error("Failed to update quantity");

      const updatedResponse = await fetch("http://localhost:3001/api/carts");
      if (!updatedResponse.ok) throw new Error("Failed to fetch updated cart");

      const updatedData = await updatedResponse.json();
      setCart(updatedData.cart || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleIncrease = (productId) => {
    handleQuantityChange(productId, 'add');
  };

  const handleDecrease = (productId) => {
    handleQuantityChange(productId, 'subtract');
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/cart/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to remove item");

      setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart })
      });

      if (!response.ok) throw new Error("Checkout failed");

      setCart([]);
      setAlertMessage('Checkout successful! Your products have been ordered.');

      setTimeout(() => {
        navigate("/products");
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = totalPrice * 0.1;
  const grandTotal = totalPrice + tax;
  const isCartEmpty = cart.length === 0;

  return (
    <div className="cart-container shadow-xl shadow-gray-600 mx-80 my-8 p-2 rounded-lg">
      {alertMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 rounded-xl shadow-xl right-0 z-40 bg-orange-500 text-white text-center py-2">
          {alertMessage}
        </div>
      )}

      {error ? (
        <p className="my-8 w-full text-orange-500 text-center mx-auto tracking-widest fa-beat-fade">{error}</p>
      ) : cart.length > 0 ? (
        cart.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between mx-4 py-2"
          >
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded" />
            <div className="flex-1 ml-4 w-[75%]">
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="truncate text-gray-500">{item.desc}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => handleDecrease(item.productId)}
                  className="px-2 py-1 text-sm text-white bg-orange-600 rounded-l"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>

                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value), item.maxStockCanBeMade)}
                  className="w-10 text-right text-black border-t border-b border-white"
                  min="1"
                  max={item.maxStockCanBeMade}
                />

                <button
                  onClick={() => handleIncrease(item.productId)}
                  className="px-2 py-1 text-sm text-white bg-orange-600 rounded-r"
                  disabled={item.maxStockCanBeMade <= 0}
                >
                  +
                </button>
              </div>
              <p className="mt-1 text-orange-500">
                Stock available: {item.maxStockCanBeMade}
              </p>
            </div>
            <div className='w-[25%] text-right'>
              <p className="text-lg font-semibold">Rp {formatPrice(item.price * item.quantity)}</p>
              <button
                onClick={() => handleDelete(item.productId)}
                className="mt-2 text-center text-orange-500 hover:text-orange-700"
              >
                <i className="text-center fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="fa-beat-fade py-2 tracking-widest text-center text-orange-500">Your cart is empty.</p>
      )}

      {/* Conditionally render these sections */}
      {!isCartEmpty && (
        <>
          <div className="total-section mt-8 mx-4 flex justify-between text-lg font-medium">
            <p>Total Price:</p>
            <p>Rp {formatPrice(totalPrice)}</p>
          </div>
          <div className="tax-section mx-4 flex justify-between text-lg font-medium">
            <p>Tax (10%):</p>
            <p>Rp {formatPrice(tax)}</p>
          </div>
          <div className="grand-total-section mx-4 flex justify-between text-lg font-bold mt-4">
            <p>Grand Total:</p>
            <p>Rp {formatPrice(grandTotal)}</p>
          </div>
          <div className="checkout-button mt-8 mx-4 my-2 text-center">
            <button
              onClick={handleCheckout}
              className="w-full py-2 bg-orange-600 text-black rounded-lg hover:bg-orange-700 transition-all"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
