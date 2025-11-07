import Manajemen from '../../assets/Layanan/Manajemen.png';

export default function SectionLayananManajemen() {
  return (
    <section className="container mx-auto flex flex-col md:flex-row items-center justify-between py-20 gap-16 mt-36 bg-[#387F39] rounded-lg shadow-lg">
      
      {/* Image Section */}
      <div className="w-full md:w-1/2 overflow-hidden rounded-lg">
        <img 
          src={Manajemen} 
          alt="Manajemen Limbah" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 flex flex-col gap-8 text-white">
        <h2 className="text-3xl md:text-4xl font-semibold md:text-left">
          Manajemen Limbah
        </h2>
        <p className="text-lg md:text-lg md:text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis possimus quisquam asperiores repellat exercitationem cum sapiente et ipsum, maiores rem doloribus. Totam ratione dicta veritatis aliquam placeat recusandae magnam sit hic animi vel, fugiat facere porro! Iure animi laudantium, dignissimos dolorem explicabo facilis mollitia, modi ratione dolorum omnis amet cupiditate.
        </p>
        <div className="flex  md:justify-start">
          <button className="w-50 bg-[#F8F8F9] text-[#387F39] py-3 px-6 rounded-lg text-xl font-semibold hover:bg-[#d3d3d3] focus:outline-none transition duration-300">
            Jelajahi
          </button>
        </div>
      </div>

    </section>
  );
}
