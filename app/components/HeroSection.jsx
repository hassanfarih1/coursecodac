import React from 'react';

const HeroSection = ({ onNavigate }) => {
  return (
    <div className="bg-gradient-to-br from-[#0ea5e9] via-[#4f46e5] to-[#9333ea] text-white animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight font-poppins">
          Allumez Votre <span className="text-[#fcd34d]">Parcours de Code</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-[#e0f2fe] mb-10 max-w-3xl mx-auto leading-relaxed">
          Découvrez nos cours et exercices conçus pour rendre l'apprentissage de la programmation amusant, engageant et efficace. Commencez à construire votre avenir, gratuitement et dès aujourd'hui !
        </p>
        <button
          onClick={() => onNavigate('courses')}
          className="bg-[#facc15] text-[#334155] font-semibold px-10 py-4 rounded-lg text-lg hover:bg-[#fcd34d] transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          Découvrir les Cours
        </button>
      </div>
    </div>
  );
};

export default HeroSection;