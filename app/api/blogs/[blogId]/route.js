// src/app/api/blogs/[slug]/route.js (formerly [blogId]/route.js)
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin'; // Adjust the path if necessary

export async function GET(request, { params }) {
  const { slug } = params; // Retrieve slug from dynamic route segments

  if (!slug) {
    return NextResponse.json({ error: 'Blog slug is required' }, { status: 400 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('blogs') // Your Supabase 'blogs' table name
      .select('*')    // Select all columns
      .eq('slug', slug) // Filter by the specific blog SLUG
      .single();       // Expect only one row

    if (error) {
      console.error(`Erreur lors de la récupération de l'article de blog avec le slug "${slug}" :`, error);
      if (error.code === 'PGRST116') { // Supabase error code "no rows found"
        return NextResponse.json({ error: 'Article de blog non trouvé' }, { status: 404 });
      }
      return NextResponse.json({ error: 'Échec de la récupération de l\'article de blog' }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Article de blog non trouvé' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error('API Error in [slug] GET :', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}