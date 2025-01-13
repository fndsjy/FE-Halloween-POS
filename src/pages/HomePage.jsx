import React, { useState, useEffect } from 'react';
import Navbar from '../component/organisms/Navbar';
import Products from "../component/templates/Products";
import Cart from "../component/templates/Cart";

const HomePage = ({ scrollTarget }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-cover bg-center">
        <img className="bg-cover w-full h-fit" alt="Halloween Pict" src="../../images/Halloween.png" />
      </div>
      <div className="absolute bottom-24 left-0 right-0 h-2/4 bg-gradient-to-b from-transparent to-black"></div>

      <header className="text-center pt-40 pb-10 bg-black text-white">
        <h1 className="creepy-text text-4xl font-bold mb-2">Creepy Store</h1>
        {user && <p className="text-lg mt-4">Welcome, {user.email}!</p>}
        <p className="text-lg mt-4">Explore our wide range of spooky products and deals!</p>
        {scrollTarget === undefined && (
          <div className="mt-16 bg-gradient-to-br from-yellow-800 via-orange-700 to-purple-900 p-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4 animate-pulse">🎃 Join Us for the Halloween Event! 🎃</h2>
            <p className="text-white text-xl mb-6">Come in your best costume and enjoy a night full of spooky fun!</p>
            <div className="bg-black bg-opacity-70 p-6 rounded-lg shadow-xl border-2 border-orange-600">
              <p className="text-white font-semibold text-lg mb-4">
                📍 <span className="text-orange-300">Event Location:</span> Mikroskil, Halloween Town
              </p>
              <p className="text-white text-lg mb-4">📅 <span className="text-orange-300">Date:</span> October 31</p>
              <p className="text-white text-lg mb-4">⏰ <span className="text-orange-300">Time:</span> 6:00 PM - 10:00 PM</p>
              <p className="text-white text-lg mb-4">👻 Don't miss out on the best Halloween event of the year!</p>
            </div>
          </div>
        )}
      </header>

      {scrollTarget === "products" && (
        <section>
          <Products />
        </section>
      )}
      
      {scrollTarget === "cart" && (
        <section>
          <Cart />
        </section>
      )}
    </div>
  );
};

export default HomePage;
