import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState({ day: '', month: '', year: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
  
    // Validasi email
    if (email !== confirmEmail) {
      setError('Email dan konfirmasi email tidak cocok');
      return;
    }
  
    // Data untuk dikirim ke backend
    const userData = {
      nama_depan: firstName,
      nama_belakang: lastName,
      email,
      password,
      gender,
      tanggal_lahir: `${birthDate.year}-${birthDate.month.padStart(2, '0')}-${birthDate.day.padStart(2, '0')}`,
    };
  
    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Terjadi kesalahan saat mendaftar');
      }
  
      const result = await response.json();
      setSuccess('Pendaftaran berhasil! Anda akan diarahkan ke halaman login.');
      setError('');
  
      // Arahkan ke halaman login setelah beberapa saat
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };  

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      <div 
        className="absolute inset-0 bg-cover bg-center filter blur-md opacity-30" 
        style={{ backgroundImage: 'url(../../images/Halloween.png)' }} 
      />
      <div className="relative bg-gradient-to-br from-purple-900 via-black to-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg border border-orange-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">🎃 Buat Akun Baru 🎃</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">Nama Depan:</label>
            <input 
              type="text" 
              id="firstName" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              className="w-full p-3 border border-gray-600 bg-black text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Nama depan"
              required 
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">Nama Belakang:</label>
            <input 
              type="text" 
              id="lastName" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              className="w-full p-3 border border-gray-600 bg-black text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Nama belakang"
              required 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Email Anda:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-3 border border-gray-600 bg-black text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Email"
              required 
            />
          </div>
          <div>
            <label htmlFor="confirmEmail" className="block text-sm font-medium text-white mb-2">Masukkan Ulang Email:</label>
            <input 
              type="email" 
              id="confirmEmail" 
              value={confirmEmail} 
              onChange={(e) => setConfirmEmail(e.target.value)} 
              className="w-full p-3 border border-gray-600 bg-black text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Konfirmasi email"
              required 
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-2">Kata Sandi Baru:</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-3 border border-gray-600 bg-black text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Kata sandi"
              required 
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-white mb-2">Jenis Kelamin:</label>
            <select 
              id="gender" 
              value={gender} 
              onChange={(e) => setGender(e.target.value)} 
              className="w-full p-3 border border-gray-600 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required 
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-2">Tanggal Lahir:</label>
            <div className="flex space-x-2">
              <select 
                value={birthDate.day} 
                onChange={(e) => setBirthDate({ ...birthDate, day: e.target.value })} 
                className="w-1/3 p-3 border border-gray-600 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required 
              >
                <option value="">Hari</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select 
                value={birthDate.month} 
                onChange={(e) => setBirthDate({ ...birthDate, month: e.target.value })} 
                className="w-1/3 p-3 border border-gray-600 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required 
              >
                <option value="">Bulan</option>
                {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map((month, index) => (
                  <option key={index + 1} value={index + 1}>{month}</option>
                ))}
              </select>
              <select 
                value={birthDate.year} 
                onChange={(e) => setBirthDate({ ...birthDate, year: e.target.value })} 
                className="w-1/3 p-3 border border-gray-600 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required 
              >
                <option value="">Tahun</option>
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i + 1920} value={i + 1920}>{i + 1920}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-xs text-gray-400 mb-4">
            Mengapa saya harus memberikan tanggal lahir saya?
          </div>
          <div className="mb-4 text-xs text-gray-400">
            Dengan mengklik "Mendaftar", Anda setuju dengan ketentuan kami dan bahwa Anda telah membaca Kebijakan Data kami.
          </div>
          <button type="submit" className="w-full py-3 bg-black-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all mb-4">Mendaftar</button>
          <button onClick={() => navigate('/login')} className="w-full py-3 bg-black-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all">Kembali</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
