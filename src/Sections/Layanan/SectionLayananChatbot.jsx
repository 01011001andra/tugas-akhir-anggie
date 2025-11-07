import Chatbot from "../../assets/Layanan/Chatbot.jpg";

export default function SectionLayananChatbot() {
  return (
    <section className="container mx-auto flex flex-col md:flex-row items-center justify-between py-20 gap-16 mt-36">
      {/* Image Section */}
      <div className="w-full md:w-1/2 overflow-hidden rounded-lg">
        <img
          src={Chatbot}
          alt="Chatbot AI"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-green-600  md:text-left">
          Chatbot AI
        </h2>
        <p className="text-lg md:text-xl text-neutral-700 md:text-left">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem natus
          debitis exercitationem voluptatem, consectetur, dicta est aliquid
          molestiae quas, facilis vel ea repellat impedit accusantium!
          Consequatur, corporis dolores animi ipsum placeat corrupti mollitia
          nobis debitis maxime minus quo ipsa autem quae consectetur officia
          officiis eligendi optio rerum deserunt explicabo obcaecati!
        </p>
        <div className="flex md:justify-start">
          <button className="w-50 bg-[#387F39] text-white py-3 px-6 rounded-lg text-xl font-semibold hover:bg-green-700 focus:outline-none transition duration-300">
            Jelajahi
          </button>
        </div>
      </div>
    </section>
  );
}
