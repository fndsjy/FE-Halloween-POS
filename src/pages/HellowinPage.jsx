import React from 'react';
import { Link } from 'react-router-dom';

const Halloween = () => {
  return (
    <div className="Halloween-container mx-auto p-8 bg-black min-h-screen">
      <h1 className="text-5xl font-bold text-orange-500 mb-6 text-center">Welcome to Halloween!</h1>
      <p className="text-lg text-white text-justify mb-4 leading-relaxed">
        ""Halloween" is a tradition that originated in the ancient Celtic peoples and is celebrated every year. Originally intended as a ritual to ward off bad luck, now Halloween is a celebration with people wearing scary costumes
        </p>
      <div className="bg-orange-500 p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold text-black mb-4 text-center">Special Halloween Event!</h2>
        <p className="text-black text-justify mb-4 leading-relaxed">
        Join our special Halloween event and get great discounts on every product purchase. Have an exciting and scary experience with us!
        </p>
        <div className="text-center">
          <Link to="/products" className="px-6 py-2 bg-black text-orange-500 font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300">
            Shop Now
          </Link>
        </div>
      </div>
      <p className="text-lg text-white text-justify mb-4 leading-relaxed">
        Halloween is a celebration that is celebrated on October 31 every year. This celebration is very popular in Western countries, especially in the United States, Canada, and the United Kingdom.
      </p>
      <div className="bg-orange-500 p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold text-black mb-4 text-center">Join Our Halloween Contest!</h2>
        <p className="text-black text-justify mb-4 leading-relaxed">
          Enter our Halloween costume contest and win exciting prizes! Share photos of your best Halloween costumes on social media with #HalloweenContest hashtags.
        </p>
        <div className="text-center">
          <Link to="/contest" className="px-6 py-2 bg-black text-orange-500 font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300">
            Learn More
          </Link>
        </div>
      </div>
      <p className="text-lg text-white text-justify mb-4 leading-relaxed">
        Some of the Halloween traditions include dressing up in spooky costumes, carving pumpkins into jack-o'-lanterns, visiting haunted houses, and performing a "trick or treat" game where children visit homes to ask for candy.
      </p>
      <p className="text-lg text-white text-justify leading-relaxed mb-6">
        In recent years, Halloween has become a fun celebration for everyone, with spooky decorations, costume parties, and a variety of spooky-themed events. On the "Halloween" website, we offer a variety of products and decorations to enliven your Halloween celebration.
      </p>
      <div className="text-center mt-8">
        <Link to="/" className="px-6 py-2 bg-orange-600 text-black font-semibold rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Halloween;
