// app/components/Header.jsx
'use client'; // Cette directive est nécessaire car vous utilisez des hooks React et des gestionnaires d'événements

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'; // Importer Link pour la navigation
import { usePathname, useRouter } from 'next/navigation'; // Importer les hooks pour le chemin actuel et la navigation par programme
import { LogoIcon, MenuIcon, CloseIcon } from '../constants'; // S'assurer que ces chemins sont corrects

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname(); // Obtenir le chemin actuel de Next.js
  const router = useRouter(); // Obtenir l'instance du routeur pour la navigation par programme

  // Fonction utilitaire pour déterminer les classes de liens actifs
  const navLinkClasses = (href, isMobile = false) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 cursor-pointer ${
      isMobile
        ? (pathname === href ? 'bg-[#0ea5e9] text-white' : 'text-[#334155] hover:bg-[#0ea5e9] hover:text-white')
        : (pathname === href ? 'text-[#0ea5e9] font-semibold' : 'text-[#334155] hover:text-[#0ea5e9]')
    }`;

  // Gérer les clics sur les liens mobiles (pour les éléments de navigation réguliers) et fermer le menu
  const handleMobileNavLinkClick = (href) => {
    router.push(href); // Naviguer en utilisant le routeur Next.js
    setIsMobileMenuOpen(false); // Fermer le menu mobile après la navigation
  };

  // Effet pour fermer le menu mobile en cas de clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuButton = document.getElementById('mobile-menu-button');
      if (menuButton && menuButton.contains(event.target)) {
        return;
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Nom de la marque - Utiliser Link pour la navigation directe */}
          <Link
            href="/" // Navigue vers la page d'accueil (app/page.jsx)
            className="flex items-center cursor-pointer"
            aria-label="Naviguer vers la page d'accueil"
          >
            <LogoIcon className="h-10 w-10 text-[#0ea5e9]" />
            <span className="ml-3 text-2xl font-bold text-[#334155] font-poppins">AlgoMentor</span>
          </Link>

          {/* Navigation de bureau */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/courses" className={navLinkClasses('/courses')}>Cours</Link>   
            <Link href="/blog" className={navLinkClasses('/blog')}>Blog</Link>
            <Link href="/about" className={navLinkClasses('/about')}>À Propos</Link>
          </nav>

          {/* Bouton "Se connecter" pour le bureau */}
          <div className="flex items-center">
            <div className="hidden md:block">
              <Link
                href="/join-us" // Navigue vers la page de connexion (app/signin/page.jsx)
                className="bg-[#0ea5e9] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#0284c7] transition-colors duration-200 text-sm shadow-sm"
              >
                - Nous Rejoindre -
              </Link>
            </div>

            {/* Bouton Menu Mobile */}
            <div className="md:hidden">
              <button
                id="mobile-menu-button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-[#334155] hover:text-[#0ea5e9] hover:bg-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0ea5e9]"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Ouvrir le menu principal</span>
                {isMobileMenuOpen ? (
                  <CloseIcon className="block h-7 w-7" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-7 w-7" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg z-40 animate-slide-up"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Liens de navigation mobile */}
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/courses" className={`${navLinkClasses('/courses', true)} w-full text-left`}>Cours</Link>
           <Link onClick={() => setIsMobileMenuOpen(false)} href="/blog" className={`${navLinkClasses('/blog', true)} w-full text-left`}>Blog</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/about" className={`${navLinkClasses('/about', true)} w-full text-left`}>À Propos</Link>
          </div>
          <div className="pt-2 pb-3 border-t border-[#e2e8f0] px-2 sm:px-3">
            {/* Lien "Se connecter" mobile */}
            <Link
              href="/join-us" // Naviguer directement vers la page de connexion
              onClick={() => setIsMobileMenuOpen(false)} // Fermer le menu au clic
              className="w-full bg-[#0ea5e9] text-white px-4 py-2.5 rounded-lg font-medium hover:bg-[#0284c7] transition-colors duration-200 text-sm shadow-sm text-center block"
            >
              Nous Rejoindre
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;