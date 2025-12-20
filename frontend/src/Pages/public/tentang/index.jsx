// import React from 'react'
import Navbar from "../../../components/Navbar";
import SectionProfil from "./components/SectionProfil";
import SectionVertikultur from "./components/SectionVertikultur";
import SectionTim from "./components/SectionTim";
import Footer from "../../../components/Footer";

export default function Tentang() {
  return (
    <>
      <Navbar />
      <SectionProfil />
      <SectionVertikultur />
      <SectionTim />
      <Footer />
    </>
  );
}
