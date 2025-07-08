// src/app/blog/page.jsx
'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link for navigation

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch from your updated API endpoint that returns 'slug'
        const response = await fetch('/api/blogs');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Erreur HTTP ! statut: ${response.status}`);
        }
        const data = await response.json();
        setBlogPosts(data);
      } catch (err) {
        console.error('Échec de la récupération des articles de blog :', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // BlogPostCard component (defined inline)
  // Ensure 'slug' is received as a prop
  const BlogPostCard = ({ id, title, content, image_url, slug }) => {
    // For the excerpt, we still want plain text, so we'll create a temporary element
    // to strip HTML tags from the content.
    const getExcerpt = (htmlContent) => {
      if (!htmlContent) return '';
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      return `${textContent.substring(0, 150)}${textContent.length > 150 ? '...' : ''}`;
    };

    const excerpt = getExcerpt(content);

    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        {image_url && <img src={image_url} alt={title} className="w-full h-48 object-cover" />}
        {!image_url && <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">Pas d'image</div>}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-[#334155] mb-2 font-poppins">{title}</h3>
          <p className="text-sm text-[#64748b] mb-4 flex-grow" dangerouslySetInnerHTML={{ __html: excerpt }}></p>

          {/* IMPORTANT: Use 'slug' for the href */}
          {/* Ensure 'slug' is not undefined before using it, fallback to id if necessary for old data */}
          <Link
            href={`/blog/${slug || id}`} // Use slug if available, otherwise fallback to id (for old data)
            className="mt-auto w-full bg-[#84cc16] text-white font-medium py-2.5 px-4 rounded-lg hover:bg-[#65a30d] transition-colors duration-200 shadow-sm sm:w-auto sm:self-start text-center"
          >
            Lire la suite
          </Link>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-[#f8fafc] min-h-[calc(100vh-160px)] py-12 md:py-20 px-4 sm:px-6 lg:px-8 flex justify-center items-center text-xl text-[#334155]">
        Chargement des articles de blog...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#f8fafc] min-h-[calc(100vh-160px)] py-12 md:py-20 px-4 sm:px-6 lg:px-8 text-center text-red-600">
        <h1 className="text-4xl font-bold mb-4">Erreur de chargement du blog</h1>
        <p className="text-lg">Un problème est survenu lors de la récupération des articles de blog : {error}</p>
        <p className="text-md mt-2">Veuillez essayer d'actualiser la page ou de vérifier votre connexion réseau.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-[calc(100vh-160px)] py-12 md:py-20 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="container mx-auto">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#334155] font-poppins mb-4">
            Blog AlgoMentor
          </h1>
          <p className="text-lg md:text-xl text-[#64748b] max-w-3xl mx-auto">
            Analyses, tutoriels et actualités du monde du code et de la technologie. Restez à l'écoute pour des mises à jour régulières !
          </p>
        </header>

        {blogPosts.length > 0 ? (
          <section>
            <h2 className="text-3xl font-bold text-[#334155] font-poppins mb-8 text-center md:text-left">
              Derniers articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map(post => (
                <BlogPostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  image_url={post.image_url}
                  slug={post.slug} // Pass the slug here!
                />
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-16">
            <svg className="mx-auto h-16 w-16 text-[#64748b] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <h2 className="text-2xl font-semibold text-[#334155] mb-2">Notre blog arrive bientôt !</h2>
            <p className="text-[#64748b]">
              Nous travaillons d'arrache-pied pour vous apporter des articles et des mises à jour éclairantes. Revenez plus tard !
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;