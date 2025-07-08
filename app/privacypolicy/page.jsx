'use client'
import React from 'react';

const PrivacyPolicyPage = ({ onNavigate }) => {
  const lastUpdatedDate = new Date().toLocaleDateString('fr-FR', { // Changed locale to 'fr-FR'
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const Section = ({ title, children }) => (
    <section className="mb-8">
      {/* Couleur directe pour text-neutral-darker */}
      <h2 className="text-2xl font-semibold text-[#334155] font-poppins mb-3">{title}</h2>
      {/* Couleur directe pour text-neutral-dark */}
      <div className="space-y-3 text-[#64748b] leading-relaxed">{children}</div>
    </section>
  );

  return (
    // Couleur directe pour bg-neutral-light
    <div className="bg-[#f8fafc] min-h-[calc(100vh-160px)] py-12 md:py-20 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="container mx-auto max-w-3xl bg-white p-8 sm:p-10 md:p-12 rounded-xl shadow-xl">
        {/* Couleur directe pour border-slate-200 */}
        <header className="mb-10 text-center border-b border-[#e2e8f0] pb-8">
          {/* Couleur directe pour text-neutral-darker */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#334155] font-poppins mb-3">
            Politique de Confidentialité
          </h1>
          {/* Couleur directe pour text-neutral-dark */}
          <p className="text-md text-[#64748b]">
            Dernière mise à jour : {lastUpdatedDate}
          </p>
        </header>

        {/* Couleurs directes pour prose-headings:text-neutral-darker, prose-a:text-primary, hover:prose-a:text-primary-hover */}
        <article className="prose prose-slate max-w-none prose-headings:font-poppins prose-headings:text-[#334155] prose-a:text-[#0ea5e9] hover:prose-a:text-[#0284c7]">
          <Section title="1. Introduction">
            <p>Bienvenue sur CodeSpark Academy ("nous", "notre" ou "nos"). Nous nous engageons à protéger votre vie privée. Cette Politique de Confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site web [VotreSiteWeb.com] (le "Site") et utilisez nos services (les "Services"). Veuillez lire attentivement cette politique de confidentialité. Si vous n'êtes pas d'accord avec les termes de cette politique de confidentialité, veuillez ne pas accéder au site.</p>
            <p>Nous nous réservons le droit d'apporter des modifications à cette Politique de Confidentialité à tout moment et pour quelque raison que ce soit. Nous vous informerons de tout changement en mettant à jour la date de "Dernière mise à jour" de cette Politique de Confidentialité. Nous vous encourageons à consulter périodiquement cette Politique de Confidentialité pour rester informé des mises à jour.</p>
          </Section>

          <Section title="2. Informations que nous collectons">
            <p>Nous pouvons collecter des informations vous concernant de diverses manières. Les informations que nous pouvons collecter sur le Site comprennent :</p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Données Personnelles</h3>
            <p>Les informations personnellement identifiables, telles que votre nom, votre adresse de livraison, votre adresse e-mail et votre numéro de téléphone, ainsi que des informations démographiques, telles que votre âge, votre sexe, votre ville d'origine et vos intérêts, que vous nous fournissez volontairement lorsque vous vous inscrivez sur le Site ou lorsque vous choisissez de participer à diverses activités liées au Site, telles que les chats en ligne et les forums de discussion.</p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Données Dérivées</h3>
            <p>Les informations que nos serveurs collectent automatiquement lorsque vous accédez au Site, telles que votre adresse IP, votre type de navigateur, votre système d'exploitation, vos heures d'accès et les pages que vous avez consultées directement avant et après l'accès au Site.</p>
            {/* Ajoutez d'autres sections courantes comme les données financières, les données d'appareils mobiles, les données de tiers, etc. comme espaces réservés */}
          </Section>

          <Section title="3. Comment nous utilisons vos informations">
            <p>Disposer d'informations exactes vous concernant nous permet de vous offrir une expérience fluide, efficace et personnalisée. Plus précisément, nous pouvons utiliser les informations collectées vous concernant via le Site pour :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Créer et gérer votre compte.</li>
              <li>Vous envoyer des e-mails concernant votre compte ou votre commande.</li>
              <li>Permettre les communications d'utilisateur à utilisateur.</li>
              <li>Exécuter et gérer les achats, les commandes, les paiements et les autres transactions liées au Site.</li>
              <li>Générer un profil personnel vous concernant pour rendre les futures visites sur le Site plus personnalisées.</li>
              <li>Surveiller et analyser l'utilisation et les tendances pour améliorer votre expérience avec le Site.</li>
              {/* ... plus d'éléments de liste ... */}
            </ul>
          </Section>

          <Section title="4. Partage et divulgation des données">
            <p>Nous pouvons partager les informations que nous avons collectées vous concernant dans certaines situations. Vos informations peuvent être divulguées comme suit :</p>
            <h3 className="text-xl font-semibold mt-4 mb-2">En vertu de la loi ou pour protéger les droits</h3>
            <p>Si nous pensons que la divulgation d'informations vous concernant est nécessaire pour répondre à une procédure légale, pour enquêter ou remédier à des violations potentielles de nos politiques, ou pour protéger les droits, la propriété et la sécurité d'autrui, nous pouvons partager vos informations tel que permis ou requis par toute loi, règle ou réglementation applicable.</p>
            {/* ... plus de types de divulgation ... */}
          </Section>

          <Section title="5. Sécurité des données">
            <p>Nous utilisons des mesures de sécurité administratives, techniques et physiques pour aider à protéger vos informations personnelles. Bien que nous ayons pris des mesures raisonnables pour sécuriser les informations personnelles que vous nous fournissez, veuillez noter qu'en dépit de nos efforts, aucune mesure de sécurité n'est parfaite ou impénétrable, et aucune méthode de transmission de données ne peut être garantie contre toute interception ou autre type d'utilisation abusive.</p>
          </Section>

          <Section title="6. Vos droits en matière de protection des données">
            <p>Selon votre localisation, vous disposez des droits suivants concernant vos données personnelles :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Le droit d'accès – Vous avez le droit de demander des copies de vos données personnelles.</li>
              <li>Le droit de rectification – Vous avez le droit de nous demander de corriger toute information que vous estimez inexacte ou de compléter toute information que vous estimez incomplète.</li>
              {/* Ajoutez plus de droits comme l'effacement, la restriction du traitement, l'opposition au traitement, la portabilité des données */}
            </ul>
            <p>Si vous souhaitez exercer l'un de ces droits, veuillez nous contacter.</p>
          </Section>

          <Section title="7. Confidentialité des enfants">
            <p>Nous ne sollicitons ni ne commercialisons sciemment des informations auprès d'enfants de moins de 13 ans. Si vous avez connaissance de données que nous avons collectées auprès d'enfants de moins de 13 ans, veuillez nous contacter en utilisant les coordonnées fournies ci-dessous.</p>
          </Section>

          <Section title="8. Modifications de cette Politique de Confidentialité">
            <p>Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre afin de refléter, par exemple, des changements dans nos pratiques ou pour d'autres raisons opérationnelles, légales ou réglementaires. Nous vous informerons de tout changement en publiant la nouvelle Politique de Confidentialité sur cette page et en mettant à jour la date de "Dernière mise à jour".</p>
          </Section>

          <Section title="9. Nous Contacter">
            <p>Si vous avez des questions ou des commentaires concernant cette Politique de Confidentialité, veuillez nous contacter par e-mail à <a href="mailto:privacy@codespark.dev">privacy@codespark.dev</a> ou en utilisant les coordonnées fournies sur notre page de contact.</p>
            <div className="mt-6">
              <button
                onClick={() => onNavigate('contact')}
                // Couleurs directes pour bg-primary, text-white, hover:bg-primary-hover
                className="bg-[#0ea5e9] text-white font-medium py-2.5 px-6 rounded-lg hover:bg-[#0284c7] transition-colors duration-200 shadow-sm"
              >
                Aller à la Page de Contact
              </button>
            </div>
          </Section>
        </article>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;