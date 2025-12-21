import Logo from "../assets/Logo/Logo VertiGrow Blok.png";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="container mx-auto px-6 py-12">
        <div className="footer grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <aside>
            <div className="flex items-center gap-4">
              <img src={Logo} alt="VertiGrow Logo" className="w-14 h-14" />
              <div>
                <h2 className="text-2xl font-bold text-green-700">VertiGrow</h2>
                <p className="text-sm text-green-600">Grow Smart, Grow Green</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              VertiGrow adalah platform modern berbasis teknologi yang membantu
              pengelolaan tanaman secara efisien, berkelanjutan, dan ramah
              lingkungan.
            </p>

            <p className="mt-3 text-sm">Batam, Indonesia</p>
          </aside>

          {/* Navigation */}
          <nav>
            <h6 className="footer-title text-green-700">Tentang Kami</h6>
            <a className="link link-hover">Profil Perusahaan</a>
            <a className="link link-hover">Visi & Misi</a>
            <a className="link link-hover">Tim Pengembang</a>
            <a className="link link-hover">Layanan VertiGrow</a>
          </nav>

          {/* Contact */}
          <nav>
            <h6 className="footer-title text-green-700">Kontak</h6>
            <a className="link link-hover">📧 support@vertigrow.id</a>
            <a className="link link-hover">📷 Instagram: @vertigrow.id</a>
            <a className="link link-hover">📘 Facebook: VertiGrow</a>
            <a className="link link-hover">📞 +62 812-3456-7890</a>
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t pt-6 text-center text-sm opacity-70">
          © {new Date().getFullYear()} VertiGrow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
