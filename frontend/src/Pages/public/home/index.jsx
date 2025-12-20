import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import SectionHero from "./components/SectionHero";
import SectionLayanan from "./components/SectionLayanan";
import SectionKeunggulan from "./components/SectionKeunggulan";
import SectionTentang from "./components/SectionTentang";

export default function Home() {
  return (
    <>
      <Navbar />
      <SectionHero />
      <SectionTentang />
      <SectionLayanan />
      <SectionKeunggulan />
      <Footer />
    </>
  );
}
