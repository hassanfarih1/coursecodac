// src/app/api/courses/[slug]/route.js
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET(request, { params }) { // Destructure params object, don't destructure slug directly yet
  const { slug } = params; // Extract slug after potential awaiting if params were a promise (though not expected here)
  const { searchParams } = new URL(request.url);
  const contentSlug = searchParams.get('contentSlug');

  if (!slug) {
    return NextResponse.json({ error: 'Course slug is required' }, { status: 400 });
  }

  try {
    // Step 1: Always fetch the base course data first (ID and Title are crucial for content filtering)
    const { data: course, error: courseError } = await supabaseAdmin
      .from('course')
      .select('id, title, description, difficulty, image_url, created_at, slug')
      .eq('slug', slug)
      .single();

    if (courseError) {
      console.error(`Error fetching course with slug ${slug}:`, courseError);
      if (courseError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 });
      }
      return NextResponse.json({ error: 'Failed to retrieve course details' }, { status: 500 });
    }

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Step 2: Conditionally fetch content based on contentSlug
    if (contentSlug) {
      // If contentSlug is provided, fetch *only* that specific content section
      const { data: specificContent, error: contentError } = await supabaseAdmin
        .from('content')
        .select('id, title, content, metadata, slug')
        .eq('slug', contentSlug)
        .eq('category', course.id) // IMPORTANT: Filter by the course's internal ID
        .single();

      if (contentError) {
        console.error(`Error fetching content section "${contentSlug}" for course ID ${course.id}:`, contentError);
        if (contentError.code === 'PGRST116') {
          return NextResponse.json({ error: `Content section with slug "${contentSlug}" not found for course "${slug}"` }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to retrieve content section' }, { status: 500 });
      }

      if (!specificContent) {
         return NextResponse.json({ error: `Content section with slug "${contentSlug}" not found for course "${slug}"` }, { status: 404 });
      }

      return NextResponse.json({ courseTitle: course.title, content: specificContent }, { status: 200 });

    } else {
      // If no contentSlug, fetch all content sections for the course
      const { data: allContent, error: allContentError } = await supabaseAdmin
        .from('content')
        .select('id, title, content, metadata, slug') // Select all necessary fields
        .eq('category', course.id) // Filter by the course's internal ID
        .order('id', { ascending: true }); // Ensure consistent order

      if (allContentError) {
        console.error(`Error fetching all content for course ID ${course.id}:`, allContentError);
        return NextResponse.json({ error: 'Failed to retrieve course content' }, { status: 500 });
      }

      // Combine course details with all content sections
      const courseWithContent = {
        ...course,
        content: allContent || [], // Ensure content is an array, even if empty
      };
      return NextResponse.json(courseWithContent, { status: 200 });
    }

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}