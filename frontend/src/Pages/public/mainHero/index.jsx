import NavbarUser from "../../../components/NavbarUser";
import SectionMainHero from "./components/SectionMainHero";
import SectionMainLayanan from "./components/SectionMainLayanan";
import { useSearchParams } from "react-router-dom";
import Footer from "../../../components/Footer";
import Transaction from "./components/Transaction";
import Education from "./components/Education";

export default function MainHero() {
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  console.log(type);
  let content;

  switch (type) {
    case "transaction":
      content = (
        <>
          <Transaction />
        </>
      );
      break;
    case "education":
      content = (
        <>
          <Education />
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
