import React from 'react'
import NavbarUser from '../Components/NavbarUser'
import SectionMainHero from '../Sections/MainHero/SectionMainHero'
import FooterUser from '../Components/FooterUser'
import SectionMainLayanan from '../Sections/MainHero/SectionMainLayanan'

export default function MainHero() {
  return (
    <>
      <NavbarUser/>
      <SectionMainHero/>
      <SectionMainLayanan/>
      <FooterUser/>
    </>
  )
}
