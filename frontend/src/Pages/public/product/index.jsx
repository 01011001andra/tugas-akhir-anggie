import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ProductSection from "./components/ProductSection";

export default function ProductList() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <ProductSection />
      <Footer />
    </div>
  );
}
