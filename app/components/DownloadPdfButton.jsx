// app/components/DownloadPdfButton.jsx
'use client';

import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast'; // Importer toast pour les notifications

const DownloadPdfButton = ({ pdfUrl, courseTitle }) => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setEmail(''); // Effacer l'e-mail à la fermeture
    setIsSubmitting(false); // Réinitialiser l'état de soumission
  };

  const handleSendPdf = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!email || !email.includes('@') || !email.includes('.')) {
      toast.error('Veuillez entrer une adresse e-mail valide.');
      setIsSubmitting(false);
      return;
    }

    if (!pdfUrl) {
      toast.error(`Le PDF de présentation du cours "${courseTitle}" n'est pas encore disponible.`);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/send-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, pdfUrl, courseTitle }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Cours envoyé avec succès à votre e-mail !');
        handleCloseModal(); // Fermer le modal en cas de succès
      } else {
        toast.error(data.error || 'Échec de l\'envoi du cours. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur d\'envoi de PDF :', error);
      toast.error('Une erreur inattendue est survenue. Veuillez réessayer plus tard.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="w-full max-w-sm bg-[#0ea5e9] text-white font-semibold py-3.5 px-6 rounded-lg hover:bg-[#0284c7] transition-colors duration-200 shadow-xl text-lg"
      >
        Télécharger le PDF du Cours
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-opacity-90 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
        >
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative animate-scale-up">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-semibold"
              aria-label="Fermer le modal"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-[#334155] mb-4 text-center">Obtenez Votre PDF de Cours</h2>
            <p className="text-[#64748b] text-center mb-6">
              Entrez votre e-mail pour recevoir le PDF de présentation du cours **{courseTitle}** directement dans votre boîte de réception.
            </p>

            <form onSubmit={handleSendPdf} className="space-y-4">
              <div>
                <label htmlFor="pdfEmail" className="block text-sm font-medium text-[#334155] mb-1">
                  Votre Adresse E-mail
                </label>
                <input
                  type="email"
                  id="pdfEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 text-[#334155] bg-[#f8fafc] border border-[#cbd5e1] rounded-lg shadow-sm focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9] outline-none transition-shadow duration-200"
                  placeholder="vous@example.com"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#0ea5e9] text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-[#0284c7] transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0ea5e9] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Envoi...' : 'Envoyer le PDF'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadPdfButton;