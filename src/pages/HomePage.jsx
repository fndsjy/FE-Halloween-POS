import Navbar from '../component/organisms/Navbar';
import Products from "../component/templates/Products";
import Cart from "../component/templates/Cart";

const HomePage = ({ scrollTarget }) => {
  return (
    <div>
      <Navbar />
      <div className="bg-cover bg-center">
        <img className="bg-cover w-full h-fit" alt="Halloween Pict" src="../../images/Halloween.png" />
      </div>
      <div className="absolute bottom-24 left-0 right-0 h-2/4 bg-gradient-to-b from-transparent to-black"></div>

      {/* Render only the section based on scrollTarget */}
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
