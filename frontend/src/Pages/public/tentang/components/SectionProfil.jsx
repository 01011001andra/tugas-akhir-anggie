import Profil from "../../../../assets/Vertikultur.png";

export default function SectionProfil() {
  return (
    <section className="container mx-auto mb-20 flex flex-col lg:flex-row-reverse items-center py-16 gap-10 mt-36 px-4 lg:px-0">
      {/* Gambar profil di sebelah kanan */}
      <img
        src={Profil}
        alt="Vertikultur"
        className="rounded-lg shadow-lg w-full lg:w-1/2"
      />

      {/* Teks profil */}
      <div className="flex flex-col gap-6 lg:w-1/2">
        <h2 className="text-4xl font-bold text-[#387F39] lg:text-left">
          VertiGrow
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          VertiGrow adalah platform inovatif pertama yang berfokus pada edukasi
          pertanian modern, khususnya teknik vertikultur. Kami memiliki misi
          untuk memberdayakan generasi muda dalam mencapai keberlanjutan sektor
          agrikultur di Indonesia, menciptakan masa depan yang lebih hijau dan
          berkelanjutan.
        </p>
      </div>
    </section>
  );
}
