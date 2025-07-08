// src/app/blog/[slug]/page.jsx (formerly app/blog/[blogId]/page.jsx)
// Ceci est un Composant Serveur par défaut (pas de 'use client')

import { notFound } from 'next/navigation'; // Pour gérer les erreurs 404
import { supabaseAdmin } from '@/lib/supabase/admin'; // Accès direct côté serveur à Supabase
import SingleBlogPostDisplay from '@/app/components/SingleBlogPostDisplay';
// No need to import slugify here unless you want to re-slugify something,
// generateStaticParams will get slugs directly from DB.

// generateStaticParams for SSG (if you choose to pre-render blog posts)
export async function generateStaticParams() {
  const { data: blogs, error } = await supabaseAdmin.from('blogs').select('slug');

  if (error) {
    console.error('Error fetching blog slugs for generateStaticParams:', error);
    return [];
  }

  // Filter out any null or undefined slugs to prevent build errors
  return blogs.filter(blog => blog.slug).map((blog) => ({
    slug: String(blog.slug), // Ensure slug is a string
  }));
}


// Helper function to fetch blog post data for metadata
async function getBlogPostForMetadata(slug) {
  if (!slug) {
    return null;
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('blogs') // Your Supabase table name
      .select('title, content') // Select title and content for metadata
      .eq('slug', slug) // Filter by blog SLUG
      .single();

    if (error) {
      console.error(`Erreur lors de la récupération de l'article de blog avec le slug "${slug}" :`, error);
      if (error.code === 'PGRST116') { // Supabase "no rows found"
        return null; // Return null for not found, to be handled by metadata/page component
      }
      throw error; // Propagate other errors
    }

    return data;

  } catch (err) {
    console.error('Erreur de récupération du blog dans getBlogPostForMetadata :', err);
    throw err; // Re-throw to be caught by generateMetadata or page component
  }
}


// generateMetadata function for dynamic SEO
export async function generateMetadata({ params }) {
  const { slug } = params;
  let blogPost = null;

  try {
    blogPost = await getBlogPostForMetadata(slug);
  } catch (error) {
    console.error('Error fetching blog post for metadata:', error);
    return {
      title: 'Article de Blog Non Trouvé',
      description: 'L\'article de blog demandé n\'a pas pu être trouvé.',
    };
  }

  if (!blogPost) {
    return {
      title: 'Article de Blog Non Trouvé',
      description: 'L\'article de blog demandé n\'a pas pu être trouvé.',
    };
  }

  // Generate a description from the content, stripping HTML tags and truncating
  const plainTextContent = blogPost.content ? blogPost.content.replace(/<[^>]*>?/gm, '') : '';
  const description = plainTextContent.substring(0, 160) + (plainTextContent.length > 160 ? '...' : '');

  return {
    title: blogPost.title,
    description: description || `Lisez notre article sur "${blogPost.title}".`,
  };
}


export default async function BlogPostPage({ params }) {
  const { slug } = params; // Now receiving 'slug' from params

  if (!slug) {
    notFound(); // If no slug is provided, treat as a 404 error
  }

  let blogPost = null;
  try {
    // Fetch the full blog post data by slug
    const { data, error } = await supabaseAdmin
      .from('blogs') // Your Supabase table name
      .select('*')    // Select all columns
      .eq('slug', slug) // Filter by the specific blog SLUG
      .single();       // Expect a single row

    if (error) {
      console.error(`Erreur lors de la récupération de l'article de blog avec le slug "${slug}" :`, error);
      if (error.code === 'PGRST116') { // Supabase "no rows found"
        notFound(); // Show 404 page if not found in database
      }
      throw new Error(`Échec de la récupération de l'article de blog : ${error.message}`);
    }

    if (!data) {
      notFound(); // Fallback to 404 if data is null for some reason
    }

    blogPost = data;

  } catch (err) {
    console.error('Erreur de récupération du blog dans le composant serveur :', err);
    notFound(); // If an unhandled error occurs during fetch, show 404
  }

  // Pass the fetched blog post data to the client component for rendering
  return (
    <SingleBlogPostDisplay post={blogPost} />
  );
}