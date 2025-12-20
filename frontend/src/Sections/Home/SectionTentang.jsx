export default function SectionTentang() {
    return (
      <section className="bg-neutral-100 w-full px-6 lg:px-0 mb-20">
        <div className="container mx-auto flex flex-col items-center py-10 lg:py-16 gap-6 lg:gap-10">
          {/* Judul */}
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#387F39] text-center">
            Apa itu Vertigrow?
          </h3>
  
          {/* Deskripsi */}
          <p className="text-base sm:text-lg lg:text-xl text-center text-neutral-800 max-w-4xl">
            Vertigrow merupakan platform pertama yang berfokus pada edukasi pertanian modern, 
            khususnya teknik vertikultur. Tujuan kami adalah memberdayakan anak muda untuk 
            mencapai keberlangsungan sektor agrikultur di Indonesia.
          </p>
  
          {/* Tombol */}
          <button className="bg-[#387F39] hover:bg-green-900 rounded-md w-40 sm:w-52 px-2 py-2 text-[#F8F8F9] text-base sm:text-lg">
            Pelajari selengkapnya
          </button>
        </div>
      </section>
    );
  }
