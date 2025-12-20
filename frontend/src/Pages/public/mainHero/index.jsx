import NavbarUser from "../../../components/NavbarUser";
import SectionMainHero from "./components/SectionMainHero";
import FooterUser from "../../../components/FooterUser";
import SectionMainLayanan from "./components/SectionMainLayanan";

export default function MainHero() {
  return (
    <>
      <NavbarUser />
      <SectionMainHero />
      <SectionMainLayanan />
      <FooterUser />
    </>
  );
}
