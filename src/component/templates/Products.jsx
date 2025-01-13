import { useState, useEffect } from "react";
import { formatPrice } from "../../menu";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ message: "", visible: false });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      setAlert({ message: "Added to cart successfully!", visible: true });

      // Update the max stock in the products list
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.productId === productId
            ? { ...product, maxStockCanBeMade: product.maxStockCanBeMade - 1 }
            : product
        )
      );

      setTimeout(() => {
        setAlert({ message: "", visible: false });
      }, 3000);
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAlert({ message: "Error adding to cart", visible: true });
      setTimeout(() => {
        setAlert({ message: "", visible: false });
      }, 3000);
    }
  };

  if (loading) return <p className="my-8 w-full text-orange-500 text-center mx-auto tracking-widest fa-beat-fade">Loading products...</p>;
  if (error) return <p className="my-8 w-full text-orange-500 text-center tracking-widest mx-auto fa-beat-fade">{error}</p>;

  return (
    <div>
      {alert.visible && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-black p-2 rounded-xl shadow-xl z-40">
          {alert.message}
        </div>
      )}

      <div className="gap-4 font-white my-24 mx-12 grid grid-cols-5">
        {products.map((item, index) => (
          <div key={index} className="my-4 shadow-lg shadow-gray-500 bg-black rounded-xl flex flex-col justify-between hover:scale-105">
            <img src={item.image} alt={item.name} className="h-56 w-68 rounded-lg shadow-lg" />
            <div className="flex flex-col mx-4">
              <p className="text-center font-bold my-4">{item.name}</p>
              <p className="text-justify">{item.desc}</p>
              <p className="text-xs text-orange-500 italic my-2">Max order: {item.maxStockCanBeMade}</p>
              <p className="text-center">Rp {formatPrice(item.price)}</p>
              <div onClick={() => handleAddToCart(item.productId)} className="rounded-lg bg-orange-500 p-2 text-center text-black my-2 cursor-pointer">
                Add to Cart
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
