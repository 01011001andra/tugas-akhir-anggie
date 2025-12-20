import Hero from '../../../../assets/Vertikultur.png';

export default function SectionHero() {
  return (
    <section className="container flex flex-col-reverse lg:flex-row items-center py-20 gap-10 mt-20 px-6 lg:px-0">
      {/* Kalimat Hero */}
      <div className="flex flex-col gap-6 lg:text-left">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-[#387F39]">
          Selamat Datang di Vertigrow
        </h3>
        <p className="text-lg sm:text-xl lg:text-2xl text-neutral-800">
          Ayo bergabung bersama kami dalam mewujudkan masa depan pertanian Indonesia yang lebih produktif dan berkelanjutan.
        </p>
        <button className="bg-[#387F39] rounded-md hover:bg-green-900 w-40 sm:w-48 px-2 py-2 text-[#F8F8F9] text-lg sm:text-xl lg:mx-0">
          Ayo bergabung!
        </button>
      </div>

      {/* Gambar */}
      <img
        src={Hero}
        alt="gambar vertigrow"
        className="w-full lg:w-1/2 rounded-xl"
      />
    </section>
  );
}
