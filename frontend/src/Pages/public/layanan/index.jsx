// import React from 'react'
import Navbar from "../../../components/Navbar";
import SectionLayananEdukasi from "./components/SectionLayananEdukasi";
import SectionLayananManajemen from "./components/SectionLayananManajemen";
import SectionLayananChatbot from "./components/SectionLayananChatbot";
import Footer from "../../../components/Footer";

export default function Layanan() {
  return (
    <>
      <Navbar />
      <SectionLayananEdukasi />
      <SectionLayananManajemen />
      <SectionLayananChatbot />
      <Footer />
    </>
  );
}
