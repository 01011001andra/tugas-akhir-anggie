import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import SectionHero from '../Sections/Home/SectionHero'
import SectionLayanan from '../Sections/Home/SectionLayanan'
import SectionKeunggulan from '../Sections/Home/SectionKeunggulan'
import SectionTentang from '../Sections/Home/SectionTentang'

export default function Home() {
  return (
    <>
      <Navbar/>
      <SectionHero/>
      <SectionTentang/>
      <SectionLayanan/>
      <SectionKeunggulan/>
      <Footer/>
    </>
  )
}
