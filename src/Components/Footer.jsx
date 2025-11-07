import React from 'react';
import Logo from '../assets/Logo/Logo VertiGrow Blok.png';

export default function Footer() {
  return (
    <section className="bg-[#F8F8F9] text-white">
      {/* Container */}
      <div className="container flex flex-col md:flex-row justify-between py-10 px-6">

        {/* Logo and Address */}
        <div className="flex flex-col gap-4 mb-6 md:mb-0">
          <div className="flex items-center gap-5">
            <img src={Logo} alt="logo" className="w-16 h-16" />
            <p className="text-2xl font-bold text-[#387F39]">
              VertiGrow
              <br />
              slogan dan jargon
            </p>
          </div>
          <p className="text-lg text-[#387F39]">
            alamat Lorem ipsum dolor sit amet consectetur
            <br /> adipisicing elit. Eligendi, quos?
          </p>
        </div>

        {/* Navbar */}
        <div className="flex flex-col text-lg text-[#387F39] mb-6 md:mb-0">
          <p className="text-xl font-semibold">Tentang Kami</p>
          <p>Visi misi</p>
          <p>Tim Pengembang</p>
          <p>Layanan Kami</p>
        </div>

        {/* Contact */}
        <div className="flex flex-col text-lg text-[#387F39]">
          <p className="text-xl font-semibold">Kontak</p>
          <p>VertiGrow@gmail.com</p>
          <p>Instagram: VertiGrow</p>
          <p>Facebook: VertiGrow</p>
        </div>

      </div>
    </section>
  );
}
