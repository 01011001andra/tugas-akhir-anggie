import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo/Logo Vertigrow Blok.png';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Untuk mendapatkan rute aktif saat ini
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State untuk toggle menu

  // Fungsi untuk menangani event scroll
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolling(true); // Terapkan shadow jika sudah di scroll
    } else {
      setScrolling(false); // Hapus shadow jika di posisi atas
    }
  };

  // Menambahkan event listener untuk scroll saat komponen dimuat
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Bersihkan event listener saat komponen tidak digunakan lagi
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi untuk melakukan navigasi ke rute yang berbeda
  const handleClick = (route) => {
    navigate(route); // Navigasi ke rute
    setMenuOpen(false); // Tutup menu setelah navigasi
  };

  return (
    <section
      className={`bg-[#F8F8F9] fixed top-0 left-0 w-full z-50 py-3 px-6 ${
        scrolling ? 'shadow-lg' : ''
      }`}
    >
      {/* container */}
      <div className="container flex justify-between items-center">
        {/* logo */}
        <img
          src={Logo}
          alt="logo vertigrow"
          className="h-14 w-14 cursor-pointer"
          onClick={() => handleClick('/')}
        />

        {/* hamburger menu untuk mobile */}
        <div className="lg:hidden flex items-center">
          <button
            className="text-[#387F39] focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* menu navigasi */}
        <ul
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } absolute lg:static top-20 left-0 w-full lg:w-auto flex-col lg:flex-row items-center lg:flex gap-10 bg-[#F8F8F9] lg:bg-transparent p-6 lg:p-0 z-50 lg:z-auto`}
        >
          <li
            className={`cursor-pointer ${
              location.pathname === '/' ? 'text-green-900 font-bold' : ''
            } hover:text-green-900`}
            onClick={() => handleClick('/')}
          >
            Beranda
          </li>
          <li
            className={`cursor-pointer ${
              location.pathname === '/tentang' ? 'text-green-900 font-bold' : ''
            } hover:text-green-900`}
            onClick={() => handleClick('/tentang')}
          >
            Tentang Kami
          </li>
          <li
            className={`cursor-pointer ${
              location.pathname === '/layanan' ? 'text-green-900 font-bold' : ''
            } hover:text-green-900`}
            onClick={() => handleClick('/layanan')}
          >
            Layanan Kami
          </li>

          {/* Tombol Masuk dan Daftar */}
          <div className="flex flex-col lg:flex-row gap-3">
            <button
              className="bg-[#387F39] hover:bg-green-800 rounded-full font-semibold text-[#F8F8F9] w-28 p-2"
              onClick={() => handleClick('/masuk')}
            >
              Masuk
            </button>
            <button
              className="bg-[#FF8F4E] hover:bg-orange-700 rounded-full font-semibold text-[#F8F8F9] w-28 p-2"
              onClick={() => handleClick('/daftar')}
            >
              Daftar
            </button>
          </div>
        </ul>
      </div>
    </section>
  );
}
