import Vertikultur from "../../../../assets/Layanan/Chatbot.jpg";

export default function SectionVertikultur() {
  return (
    <section className="bg-[#387F39] py-16">
      {/* Container */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16 text-white px-4">
        {/* Teks Deskripsi */}
        <div className="flex flex-col gap-8 lg:w-1/2">
          <h2 className="text-4xl font-extrabold lg:text-left text-white mb-4">
            Apa itu Vertikultur?
          </h2>
          <p className="text-lg text-justify leading-relaxed text-white opacity-90">
            Vertikultur adalah teknik pertanian yang memanfaatkan ruang secara
            vertikal, memungkinkan tanaman tumbuh dalam lapisan atau struktur
            bertingkat. Metode ini dapat mengoptimalkan ruang terbatas dan
            meningkatkan efisiensi pertanian, terutama di area perkotaan.
            <br />
            <br />
            Dengan vertikultur, kita dapat menanam berbagai jenis tanaman
            seperti sayuran, buah, dan tanaman hias dalam ruang yang lebih
            kecil, bahkan di dalam ruangan sekalipun. Teknologi ini menawarkan
            solusi yang ramah lingkungan dan berkelanjutan untuk meningkatkan
            ketahanan pangan.
          </p>
        </div>

        {/* Gambar Vertikultur */}
        <div className="lg:w-1/2 relative">
          <img
            src={Vertikultur}
            alt="Vertikultur"
            className="w-full h-full object-cover rounded-xl shadow-xl transform hover:scale-105 transition duration-300"
          />
          <div className="absolute inset-0 bg-black opacity-30 rounded-xl"></div>
        </div>
      </div>
    </section>
  );
}
