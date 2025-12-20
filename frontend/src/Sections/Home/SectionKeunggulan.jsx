import React from 'react';
import Card from 'react-bootstrap/Card';
import Edukasi from '../../assets/Layanan/Edukasi.png';
import Chatbot from '../../assets/Layanan/Chatbot.jpg';
import Manajemen from '../../assets/Layanan/Manajemen.png';

export default function SectionKeunggulan() {
  return (
    <section className="flex justify-center my-28 px-6">
      <div className="w-full max-w-7xl">
        {/* Judul */}
        <p className="font-semibold text-center text-2xl sm:text-3xl text-neutral-800 mb-10">
          Mengapa Memilih Kami?
        </p>

        {/* Kontainer Kartu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {/* Kartu 1 */}
          <Card className="relative overflow-hidden rounded-lg">
            <Card.Img 
              variant="top" 
              src={Edukasi} 
              className="h-full w-full object-cover rounded-t-lg" 
            />
            {/* Overlay Gradasi */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black opacity-70"></div>
            <Card.Body className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full z-10">
              <Card.Title className="text-white text-lg md:text-xl font-semibold">
                500+ jenis tanaman yang bisa dipelajari
              </Card.Title>
            </Card.Body>
          </Card>

          {/* Kartu 2 */}
          <Card className="relative overflow-hidden rounded-lg">
            <Card.Img 
              variant="top" 
              src={Manajemen} 
              className="h-full w-full object-cover rounded-t-lg" 
            />
            {/* Overlay Gradasi */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black opacity-70"></div>
            <Card.Body className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full z-10">
              <Card.Title className="text-white text-lg md:text-xl font-semibold">
                Sistem pembelajaran yang menyeluruh
              </Card.Title>
            </Card.Body>
          </Card>

          {/* Kartu 3 */}
          <Card className="relative overflow-hidden rounded-lg">
            <Card.Img 
              variant="top" 
              src={Chatbot} 
              className="h-full w-full object-cover rounded-t-lg" 
            />
            {/* Overlay Gradasi */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black opacity-70"></div>
            <Card.Body className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full z-10">
              <Card.Title className="text-white text-lg md:text-xl font-semibold">
                ChatBot AI yang relevan
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>
    </section>
  );
}
