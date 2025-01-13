import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    // JSON body for login
    const loginData = { email, password };

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming the response contains a token or user data
        localStorage.setItem('accessToken', data.accessToken);
        navigate('/'); // Navigate to the homepage after successful login
      } else {
        // Show error message from the server
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      <div 
        className="absolute inset-0 bg-cover bg-center filter blur-lg opacity-40" 
        style={{ backgroundImage: 'url(../../images/Halloween.png)' }}
      />
      <div className="relative bg-gradient-to-br from-purple-800 to-black p-8 rounded-lg shadow-xl w-full max-w-sm border border-orange-700">
        <h1 className="text-3xl font-bold text-center mb-8 text-orange-500">🎃 Halloween Login 🎃</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white-500 mb-2">Email:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-3 border border-gray-600 bg-black text-white rounded-lg placeholder-gray-400 focus:border-orange-500"
              placeholder="Your spooky email"
              required 
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white-500 mb-2">Password:</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-3 border border-gray-600 bg-black text-white rounded-lg placeholder-gray-400 focus:border-orange-500"
              placeholder="Your secret spell"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-3 mt-6 bg-black text-white rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-all">
            Login
          </button>
          <button 
            onClick={() => navigate('/')} 
            className="w-full py-3 mt-4 bg-black text-white rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-all">
            Back
          </button>
          <button 
            onClick={() => navigate('/register')} 
            className="w-full py-3 mt-4 bg-black text-white rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-all">
            Buat Akun Baru
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
