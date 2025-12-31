import NavbarUser from "../../../components/NavbarUser";
import SectionMainHero from "./components/SectionMainHero";
import SectionMainLayanan from "./components/SectionMainLayanan";
import { useSearchParams } from "react-router-dom";
import ProductSection from "../product/components/ProductSection";
import Footer from "../../../components/Footer";

export default function MainHero() {
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  console.log(type);
  let content;

  switch (type) {
    case "transaction":
      content = (
        <>
          <ProductSection />
        </>
      );
      break;
    case "main":
    default:
      content = (
        <>
          <SectionMainHero />
          <SectionMainLayanan />
        </>
      );
      break;
  }

  return (
    <>
      <NavbarUser />
      {content}
      <Footer />
    </>
  );
}
