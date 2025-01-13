import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContestPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      console.log("File selected:", selectedFile.name);
      setSelectedFile(null);
      alert("Photo successfully selected!");
    } else {
      alert("Please select a file before uploading.");
    }
  };

  return (
    <div className="contest-container relative mx-auto p-8 min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(../../images/Halloween-background.jpg)' }}>
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative z-10 text-center p-8 border-4 border-orange-600 rounded-lg shadow-2xl max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-orange-500 mb-6 animate-pulse">Halloween Photo Contest</h1>
        <p className="text-lg text-white text-justify mb-8 leading-relaxed animate-fadeIn">
          Join our Halloween photo contest and win exciting prizes! Upload a photo of your best Halloween costume below.
        </p>
        <form onSubmit={handleSubmit} className="bg-orange-500 p-8 rounded-lg shadow-lg inline-block animate-popUp w-full">
          <div className="mb-6">
            <label className="block text-black text-xl mb-2" htmlFor="file-upload">Choose a photo:</label>
            <input 
              type="file" 
              id="file-upload" 
              className="w-full p-4 bg-white text-black rounded-lg border-2 border-black"
              onChange={handleFileChange}
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-3 bg-black text-orange-500 font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300">
            <i className="fa fa-upload mr-2"></i>Upload Photo
          </button>
        </form>
        <div className="text-center mt-8">
          <Link to="/" className="inline-block px-8 py-3 bg-orange-600 text-black font-semibold rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300">
            Back to Home
          </Link>
        </div>
        <div className="absolute top-4 right-4 flex flex-col items-center space-y-2">
          <i className="fa fa-ghost text-6xl text-orange-500 animate-bounce"></i>
          <span className="text-orange-500">Capture the Spooky!</span>
        </div>
        <div className="absolute bottom-4 left-4 flex flex-col items-center space-y-2">
          <i className="fa fa-ghost text-6xl text-orange-500 animate-bounce"></i>
          <span className="text-orange-500">Boo!</span>
        </div>
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-orange-500 opacity-50 rounded-full mix-blend-multiply animate-ping"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-orange-500 opacity-50 rounded-full mix-blend-multiply animate-ping"></div>
      </div>
    </div>
  );
};

export default ContestPage;
