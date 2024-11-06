import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <div
      className={`w-full fixed px-12 py-2 top-0 z-40 text-white flex justify-between transition-all duration-300 ${isScrolled ? "bg-black/50 backdrop-blur-md" : "bg-transparent"}`}>
      <img alt="logo" src="../../images/Creepy Store.png" className="w-48" />
      <div className="flex w-2/12 justify-between text-xl my-2 font-bold">
        <Link to="/products">Products</Link>
        <Link to="/cart">
          <i className="fa-solid fa-cart-shopping"></i>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
