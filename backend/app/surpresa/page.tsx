'use client';
import { useState, useEffect } from 'react';

// Os caminhos das fotos que ficarão passando. 
const fotos = ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg', '/images/6.jpg', '/images/7.jpg', '/images/8.jpg', '/images/9.jpg', '/images/10.jpg', '/images/11.jpg'];

export default function Surpresa() {
  const [fotoAtual, setFotoAtual] = useState(0);
  const [mostrarVideo, setMostrarVideo] = useState(false);

  // Lógica que troca a foto sozinha a cada 3,5 segundos
  useEffect(() => {
    if (mostrarVideo) return;
    const timer = setInterval(() => {
      setFotoAtual((prev) => (prev + 1) % fotos.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [mostrarVideo]);

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center p-6 text-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded-3xl shadow-xl mt-4 md:mt-12">
        
        {/* NOVO TÍTULO AQUI */}
        <h1 className="text-3xl md:text-4xl font-bold text-rose-600 mb-6 uppercase">
          Feliz Aniversário Meu Amor! 🎉❤️
        </h1>
        
        {!mostrarVideo ? (
          <div className="flex flex-col items-center">
            
            {/* NOVO TEXTO ROMÂNTICO AQUI */}
            <p className="text-xl text-gray-700 italic mb-8 px-4 leading-relaxed font-medium">
              "Obrigado meu amor por ser essa menina tão linda, tão perfeita, tão carinhosa meu amor, eu te amo mais que tudo"
            </p>

            {/* Área das Fotos */}
            <div className="relative w-full max-w-sm aspect-[4/5] overflow-hidden rounded-2xl shadow-lg mb-8 bg-gray-100 flex items-center justify-center">
              {fotos.map((foto, index) => (
                <img 
                  key={index}
                  src={foto} 
                  alt={`Nossa foto ${index + 1}`} 
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === fotoAtual ? 'opacity-100' : 'opacity-0'
                  }`} 
                />
              ))}
            </div>

            <button 
              onClick={() => setMostrarVideo(true)}
              className="bg-rose-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-rose-600 hover:scale-105 transition-all duration-300"
            >
              Assistir ao nosso vídeo 🎂
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-rose-500 mb-6">Também celebramos nossos 2 anos de namoro!</h2>
            
            {/* Área do Vídeo */}
            <video 
              controls 
              autoPlay 
              className="w-full max-w-md rounded-2xl shadow-xl mb-8 border-4 border-rose-100"
              src="/video.mp4"
            >
              Seu navegador não suporta o vídeo.
            </video>

            <button 
              onClick={() => setMostrarVideo(false)}
              className="text-rose-500 font-semibold underline hover:text-rose-700 transition"
            >
              Voltar para as nossas fotos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}