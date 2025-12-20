"use client";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Logo from "../assets/Logo/Logo Vertigrow Blok.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);

    const interval = setInterval(updateCartCount, 500);
    return () => {
      window.removeEventListener("storage", updateCartCount);
      clearInterval(interval);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (route) => {
    navigate(route);
    setMenuOpen(false);
  };

  return (
    <section
      className={`bg-[#F8F8F9] fixed top-0 left-0 w-full z-50 py-3 px-6 ${
        scrolling ? "shadow-lg" : ""
      }`}
    >
      <div className="container flex justify-between items-center">
        <img
          src={Logo || "/placeholder.svg"}
          alt="logo vertigrow"
          className="h-14 w-14 cursor-pointer"
          onClick={() => handleClick("/")}
        />

        <div className="lg:hidden flex items-center gap-4">
          <button
            className="relative text-[#387F39]"
            onClick={() => handleClick("/cart")}
          >
            <Icon icon="mdi:shopping-cart" className="text-2xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
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

        <ul
          className={`${
            menuOpen ? "flex" : "hidden"
          } absolute lg:static top-20 left-0 w-full lg:w-auto flex-col lg:flex-row items-center lg:flex gap-10 bg-[#F8F8F9] lg:bg-transparent p-6 lg:p-0 z-50 lg:z-auto`}
        >
          <li
            className={`cursor-pointer ${
              location.pathname === "/" ? "text-green-900 font-bold" : ""
            } hover:text-green-900`}
            onClick={() => handleClick("/")}
          >
            Beranda
          </li>
          <li
            className={`cursor-pointer ${
              location.pathname === "/tentang" ? "text-green-900 font-bold" : ""
            } hover:text-green-900`}
            onClick={() => handleClick("/tentang")}
          >
            Tentang Kami
          </li>
          <li
            className={`cursor-pointer ${
              location.pathname === "/layanan" ? "text-green-900 font-bold" : ""
            } hover:text-green-900`}
            onClick={() => handleClick("/layanan")}
          >
            Layanan Kami
          </li>
          <li
            className={`cursor-pointer ${
              location.pathname === "/products"
                ? "text-green-900 font-bold"
                : ""
            } hover:text-green-900`}
            onClick={() => handleClick("/products")}
          >
            Produk
          </li>

          <button
            className="relative text-[#387F39] hover:text-green-900 hidden lg:flex items-center gap-2"
            onClick={() => handleClick("/cart")}
          >
            <Icon icon="mdi:shopping-cart" className="text-xl" />
            {cartCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <div className="flex flex-col lg:flex-row gap-3">
            <button
              className="bg-[#387F39] hover:bg-green-800 rounded-full font-semibold text-[#F8F8F9] w-28 p-2"
              onClick={() => handleClick("/masuk")}
            >
              Masuk
            </button>
            <button
              className="bg-[#FF8F4E] hover:bg-orange-700 rounded-full font-semibold text-[#F8F8F9] w-28 p-2"
              onClick={() => handleClick("/daftar")}
            >
              Daftar
            </button>
          </div>
        </ul>
      </div>
    </section>
  );
}
