import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import HellowinPage from './pages/HellowinPage';
import ContestPage from './pages/ContestPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // Impor halaman pendaftaran

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute utama untuk HomePage */}
        <Route path="/" element={<HomePage />} />

        {/* Rute untuk halaman produk dan keranjang */}
        <Route path="/products" element={<HomePage scrollTarget="products" />} />
        <Route path="/cart" element={<HomePage scrollTarget="cart" />} />

        {/* Rute untuk halaman Halloween dan Kontes */}
        <Route path="/hellowin" element={<HellowinPage />} />
        <Route path="/contest" element={<ContestPage />} />

        {/* Rute untuk halaman login dan register */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* Halaman pendaftaran */}

        {/* Rute untuk halaman yang tidak ditemukan */}
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
