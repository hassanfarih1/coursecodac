// app/newsletter/page.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LogoIcon } from '../constants';
import toast, { Toaster } from 'react-hot-toast';

const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!email || !email.includes('@') || !email.includes('.')) {
      toast.error('Veuillez entrer une adresse e-mail valide.');
      setIsSubmitting(false);
      return;
    }

    console.log('Tentative d\'abonnement de l\'e-mail :', email);

    try {
      // This path was originally '/api/user' in your first prompt
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Merci de vous être abonné !');
        setEmail('');
      } else {
        if (response.status === 200 && data.message && data.message.includes('already subscribed')) {
          toast('Vous êtes déjà abonné à notre newsletter !', {
            icon: '👋',
          });
        } else if (response.status === 409) {
          toast('Cet e-mail est déjà abonné !', {
            icon: '📧',
          });
        } else {
          toast.error(data.error || 'Échec de l\'abonnement. Veuillez réessayer.');
        }
      }
    } catch (error) {
      console.error('Erreur d\'abonnement à la newsletter :', error);
      toast.error('Une erreur inattendue est survenue. Veuillez réessayer plus tard.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center bg-gradient-to-br from-[#e0f2fe] via-[#e0e7ff] to-[#f3e8ff] p-4 animate-fade-in">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: '',
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 4000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
            style: {
              background: '#16a34a',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#16a34a',
            },
          },
          error: {
            duration: 5000,
            style: {
              background: '#dc2626',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#dc2626',
            },
          },
        }}
      />
      <div className="bg-white p-8 sm:p-10 md:p-12 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-[1.01]">
        <div className="flex flex-col items-center mb-8">
          <Link
            href="/"
            className="flex items-center mb-2 cursor-pointer"
            aria-label="Aller à la page d'accueil"
          >
            <LogoIcon className="h-12 w-12 text-[#0ea5e9]" />
            <span className="ml-3 text-3xl font-bold text-[#334155] font-poppins">AlgoMentor</span>
          </Link>
          <h2 className="text-2xl font-semibold text-[#334155] text-center">Restez Informé !</h2>
          <p className="text-[#64748b] text-sm mt-1 text-center">
            Abonnez-vous à notre newsletter pour les derniers cours, articles de blog et mises à jour.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#334155] mb-1">
              Votre adresse e-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
              className="w-full px-4 py-3 text-[#334155] bg-[#f8fafc] border border-[#cbd5e1] rounded-lg shadow-sm focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9] outline-none transition-shadow duration-200"
              placeholder="vous@example.com"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-[#0ea5e9] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#0284c7] transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0ea5e9] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Abonnement en cours...' : 'S\'abonner Maintenant'}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-[#64748b]">
          Nous respectons votre vie privée. Vous pouvez vous désabonner à tout moment.
        </p>
      </div>
    </div>
  );
};

export default NewsletterPage;