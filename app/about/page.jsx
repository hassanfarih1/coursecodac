import React from 'react';
import { LogoIcon } from '../constants'; // Assuming LogoIcon is for branding

const AboutUsPage = () => { // Removed onNavigate as it's not used in this context
  return (
    <div className="bg-[#f8fafc] min-h-[calc(100vh-160px)] py-12 md:py-20 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="container mx-auto">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#334155] font-poppins mb-4">
            À Propos de AlgoMentor
          </h1>
          <p className="text-lg md:text-xl text-[#64748b] max-w-3xl mx-auto">
            Éveiller la curiosité et autonomiser les apprenants grâce à une éducation au codage accessible et engageante.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-16">
          <div className="bg-white p-8 rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105">
            <h2 className="text-3xl font-bold text-[#0ea5e9] font-poppins mb-4">Notre Mission</h2>
            <p className="text-[#64748b] leading-relaxed">
              Démocratiser l'éducation au codage en offrant des expériences d'apprentissage de haute qualité, interactives et amusantes pour tous, quel que soit leur parcours ou leur expérience préalable. Nous visons à susciter une passion durable pour la technologie et la résolution de problèmes.
            </p>
          </div>
          <div className="order-first md:order-last">
            <div className="bg-gradient-to-br from-[#38bdf8] to-[#6366f1] p-8 rounded-xl shadow-xl flex items-center justify-center min-h-[200px] md:min-h-[250px]">
              <LogoIcon className="w-24 h-24 text-white opacity-80" />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl mb-16">
          <h2 className="text-3xl font-bold text-[#0ea5e9] font-poppins mb-6 text-center md:text-left">Notre Vision</h2>
          <p className="text-[#64748b] leading-relaxed mb-4">
            Nous imaginons un monde où chacun peut apprendre à coder et utiliser la technologie pour créer, innover et avoir un impact positif. AlgoMentor s'efforce d'être une plateforme de premier plan qui non seulement enseigne des compétences techniques, mais favorise également la créativité, la pensée critique et la collaboration.
          </p>
          <p className="text-[#64748b] leading-relaxed">
            Notre objectif est de bâtir une communauté solidaire d'apprenants, d'éducateurs et de professionnels de l'industrie dédiés à l'avancement de la littératie technologique et à la construction d'un avenir meilleur.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#334155] font-poppins mb-8 text-center">Nos Valeurs Fondamentales</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Accessibilité", description: "Rendre l'apprentissage accessible à tous, avec un contenu facile à comprendre et un environnement favorable." },
              // Removed mention of "interactive and fun" in Engagement description to be more general
              { title: "Engagement", description: "Créer des expériences d'apprentissage qui captivent les apprenants et rendent les sujets complexes agréables." },
              { title: "Qualité", description: "Nous engageons à respecter les normes les plus élevées en matière de conception de programmes, d'instruction et d'expérience de la plateforme." },
              { title: "Communauté", description: "Favoriser un espace collaboratif où les apprenants peuvent se connecter, partager et grandir ensemble." },
              { title: "Innovation", description: "Faire évoluer continuellement nos méthodes d'enseignement et notre contenu pour refléter les dernières technologies." },
              { title: "Autonomisation", description: "Dotter les individus des compétences et de la confiance nécessaires pour atteindre leurs objectifs et façonner l'avenir." },
            ].map(value => (
              <div key={value.title} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-[#84cc16] mb-2 font-poppins">{value.title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Removed "Rencontrez l'Équipe" section completely */}

      </div>
    </div>
  );
};

export default AboutUsPage;