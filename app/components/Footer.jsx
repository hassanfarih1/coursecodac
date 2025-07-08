// app/components/Footer.jsx
'use client'; // Ce composant utilise des gestionnaires d'événements (onClick) et doit donc être un composant client

import React from 'react';
import Link from 'next/link'; // Importer Link pour la navigation
import { LogoIcon } from '../constants'; // S'assurer que le chemin est correct

// Importer des icônes spécifiques de react-icons
// Nous utiliserons les icônes Font Awesome car elles sont couramment disponibles pour les médias sociaux
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#1e293b] text-[#f1f5f9] mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            {/* Logo/Nom de la marque - Utiliser Link pour une navigation directe */}
            <Link
              href="/" // Navigue vers la page d'accueil (app/page.jsx)
              className="flex items-center mb-4 cursor-pointer"
              aria-label="Naviguer vers la page d'accueil"
            >
              <LogoIcon className="h-10 w-10 text-[#0ea5e9]" />
              <span className="ml-3 text-2xl font-bold font-poppins">AlgoMentor</span>
            </Link>
            <p className="text-[#64748b] text-sm leading-relaxed">
              Propulser la prochaine génération de codeurs avec des expériences d'apprentissage amusantes, engageantes et modernes.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white font-poppins">Liens Rapides</h3>
            <ul className="space-y-2">
              {/* Utiliser le composant Link pour tous les éléments de navigation */}
              <li>
                <Link href="/courses" className="hover:text-[#0ea5e9] transition-colors duration-200 text-sm text-left">
                  Cours
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0ea5e9] transition-colors duration-200 text-sm text-left">
                  À Propos de Nous
                </Link>
              </li>
              
              <li>
                <Link href="/privacypolicy" className="hover:text-[#0ea5e9] transition-colors duration-200 text-sm text-left">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/join-us" className="hover:text-[#0ea5e9] transition-colors duration-200 text-sm text-left">
                  Nous Rejoindre
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white font-poppins">Connectez-vous avec nous</h3>
            <div className="flex space-x-4">
              {/* Icône Facebook */}
              <a href="#" className="text-[#64748b] hover:text-[#0ea5e9] transition-colors duration-200" aria-label="Page Facebook">
                <span className="sr-only">Facebook</span>
                {/* FaFacebookF de react-icons */}
                <FaFacebookF className="w-6 h-6" />
              </a>

              {/* Icône Instagram */}
              <a href="#" className="text-[#64748b] hover:text-[#0ea5e9] transition-colors duration-200" aria-label="Page Instagram">
                <span className="sr-only">Instagram</span>
                {/* FaInstagram de react-icons */}
                <FaInstagram className="w-6 h-6" />
              </a>

              {/* Icône TikTok */}
              <a href="#" className="text-[#64748b] hover:text-[#0ea5e9] transition-colors duration-200" aria-label="Page TikTok">
                <span className="sr-only">TikTok</span>
                {/* FaTiktok de react-icons */}
                <FaTiktok className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-[#64748b] pt-8 text-center">
          <p className="text-sm text-[#64748b]">&copy; {new Date().getFullYear()} AlgoMentor. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;