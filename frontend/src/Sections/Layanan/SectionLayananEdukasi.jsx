import Edukasi from '../../assets/Layanan/Edukasi.png';

export default function SectionLayananEdukasi() {
  return (
    <section className="container mx-auto flex flex-col md:flex-row items-center justify-between py-20 gap-16 mt-36">
      {/* Image Section */}
      <div className="w-full md:w-1/2 overflow-hidden rounded-lg shadow-lg">
        <img 
          src={Edukasi} 
          alt="Edukasi Vertikultur" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 flex flex-col gap-8">
        <p className="text-3xl md:text-4xl font-semibold text-green-600 leading-tight md:text-left">
          Edukasi Vertikultur
        </p>
        <p className="text-lg text-neutral-700 md:text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore voluptatem aperiam est dolorum voluptate quibusdam minus. Id deleniti alias minima omnis reprehenderit? At nihil, magnam, numquam maiores amet laboriosam, unde cupiditate praesentium eveniet fugiat beatae! Recusandae dolorem doloribus et, quibusdam ex provident eaque voluptates at possimus quos atque adipisci quaerat?
        </p>
        <div className="flex md:justify-start">
          <button className=" bg-[#387F39] text-white w-50 py-3 px-6 rounded-lg text-xl font-semibold hover:bg-green-700 focus:outline-none transition duration-300">
            Jelajahi
          </button>
        </div>
      </div>
    </section>
  );
}
