import Card from 'react-bootstrap/Card';
import Edukasi from '../../assets/Layanan/Edukasi.png';
import Chatbot from '../../assets/Layanan/Chatbot.jpg';
import Manajemen from '../../assets/Layanan/Manajemen.png';

function SectionMainLayanan() {
    return (
      <section className="container flex justify-center px-6 py-20">
        <div className="w-full max-w-7xl">
          {/* Judul */}
          <p className="font-semibold text-center text-2xl md:text-3xl text-neutral-800 mb-10">
            Ayo mulai petualanganmu!
          </p>
  
          {/* Kontainer Kartu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Kartu 1 */}
            <Card className="shadow-lg">
              <Card.Img
                variant="top"
                src='https://picsum.photos/300/300'
                className="h-48 w-full object-cover rounded-t-lg"
              />
              <Card.Body>
                <Card.Title className="text-lg font-bold text-neutral-800">
                  Panduan Vertikultur
                </Card.Title>
                <Card.Text className="text-sm text-neutral-600">
                  Panduan praktis dan terstruktur untuk tanaman anda
                </Card.Text>
                <button className="bg-[#387F39] text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-900 focus:outline-none">
                  Jelajahi
                </button>
              </Card.Body>
            </Card>
  
            {/* Kartu 2 */}
            <Card className="shadow-lg">
              <Card.Img
                variant="top"
                src='https://picsum.photos/300/300'
                className="h-48 w-full object-cover rounded-t-lg"
              />
              <Card.Body>
                <Card.Title className="text-lg font-bold text-neutral-800">
                  Chatbot AI
                </Card.Title>
                <Card.Text className="text-sm text-neutral-600">
                  Temukan solusi masalah anda dengan bantuan AI
                </Card.Text>
                <button className="bg-[#387F39] text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-900 focus:outline-none">
                  Jelajahi
                </button>
              </Card.Body>
            </Card>
  
            {/* Kartu 3 */}
            <Card className="shadow-lg">
              <Card.Img
                variant="top"
                src='https://picsum.photos/300/300'
                className="h-48 w-full object-cover rounded-t-lg"
              />
              <Card.Body>
                <Card.Title className="text-lg font-bold text-neutral-800">
                  Panduan Manajemen Limbah
                </Card.Title>
                <Card.Text className="text-sm text-neutral-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Card.Text>
                <button className="bg-[#387F39] text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-900 focus:outline-none">
                  Jelajahi
                </button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </section>
    );
  }
  
  export default SectionMainLayanan;
