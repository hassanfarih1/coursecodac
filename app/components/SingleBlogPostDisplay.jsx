// app/components/SingleBlogPostDisplay.jsx
'use client'; // This component needs client-side interactivity

import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import Link from 'next/link'; // Import Link for declarative navigation
import { ChevronLeftIcon } from '../constants'; // Assuming ChevronLeftIcon is correctly defined here

const SingleBlogPostDisplay = ({ post }) => {
  const router = useRouter(); // Initialize router for back navigation

  // Ensure post and its properties exist to prevent errors
  if (!post) {
    return (
      <div className="text-center py-12 text-gray-600">
        Blog post data is missing.
      </div>
    );
  }

  // Formatting date for display (optional)
  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) // Changed to fr-FR for consistency
    : 'Date inconnue'; // Translated

  // Placeholder for author and tags if not in Supabase schema yet
  const displayAuthor = post.author || 'Équipe CodeSpark'; // Assuming you might add an 'author' column
  const displayTags = post.tags || []; // Assuming you might add a 'tags' column (JSONB array)

  return (
    <div className="bg-[#f8fafc] min-h-[calc(100vh-160px)] py-12 md:py-20 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="container mx-auto max-w-3xl">
        {/* Use Link component for "Back to Blog" for better navigation */}
        <Link
          href="/blog" // Navigate directly to the /blog page
          className="inline-flex items-center text-[#0ea5e9] hover:text-[#0284c7] mb-8 group transition-colors duration-200"
        >
          {/* Ensure ChevronLeftIcon is properly imported/defined */}
          <ChevronLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Retour au Blog {/* Translated */}
        </Link>

        <article className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-xl">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#334155] font-poppins mb-3">
              {post.title}
            </h1>
            <div className="text-sm text-[#64748b]">
              <span>Par {displayAuthor}</span> {/* Translated */}
              <span className="mx-2">|</span>
              <span>Publié le {formattedDate}</span> {/* Translated */}
            </div>
            {displayTags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {displayTags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 text-xs font-medium bg-sky-100 text-sky-700 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {post.image_url && (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8 shadow-md"
            />
          )}

          {/* CHANGED: Using dangerouslySetInnerHTML to render the HTML content */}
          <div
            className="prose prose-slate max-w-none prose-headings:font-poppins prose-headings:text-[#334155] prose-a:text-[#0ea5e9] hover:prose-a:text-[#0284c7]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          >
            {/* The content will be injected here, so no direct children are needed */}
          </div>
        </article>
      </div>
    </div>
  );
};

export default SingleBlogPostDisplay;