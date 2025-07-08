// src/app/api/courses/route.js
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { slugify } from '@/lib/slugify';// Make sure this path is correct for your slugify function

export async function POST(request) {
  try {
    const formData = await request.formData();
    const courseTitle = formData.get('courseTitle');
    const courseDifficulty = formData.get('courseDifficulty');
    const courseImageFile = formData.get('courseImageFile');
    const courseContentSectionsJson = formData.get('courseContentSections');
    const courseDescription = formData.get('courseDescription');

    // Basic validation for essential course data
    if (!courseTitle || !courseDifficulty || !courseContentSectionsJson) {
      return NextResponse.json({ error: 'Missing required course data (title, difficulty, content sections).' }, { status: 400 });
    }

    // --- Generate Slug for the Course ---
    const courseSlug = slugify(courseTitle);

    // Check if a course with this slug already exists to prevent duplicates
    const { data: existingCourse, error: existingCourseError } = await supabaseAdmin
      .from('course')
      .select('id')
      .eq('slug', courseSlug)
      .single();

    if (existingCourseError && existingCourseError.code !== 'PGRST116') {
      console.error('Error checking for existing course slug:', existingCourseError);
      return NextResponse.json({ error: 'Failed to check for existing course slug.' }, { status: 500 });
    }

    if (existingCourse) {
      return NextResponse.json({ error: 'A course with this title already exists. Please choose a different title.' }, { status: 409 });
    }

    let imageUrl = null;

    // --- Upload Course Image to Supabase Storage ---
    if (courseImageFile) {
      const imageFileName = `${Date.now()}-${courseImageFile.name}`;
      const { data: imageData, error: imageError } = await supabaseAdmin.storage
        .from('courseimages')
        .upload(imageFileName, courseImageFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (imageError) {
        console.error('Error uploading course image:', imageError);
        return NextResponse.json({ error: 'Failed to upload course image' }, { status: 500 });
      }
      imageUrl = supabaseAdmin.storage.from('courseimages').getPublicUrl(imageFileName).data.publicUrl;
    } else {
      return NextResponse.json({ error: 'Course image file is required.' }, { status: 400 });
    }

    // --- Insert new course into the 'course' table (NOW INCLUDING SLUG) ---
    const { data: courseData, error: courseError } = await supabaseAdmin
      .from('course')
      .insert([
        {
          title: courseTitle,
          difficulty: courseDifficulty,
          image_url: imageUrl,
          description: courseDescription,
          slug: courseSlug, // Add the generated course slug here
        },
      ])
      .select('id');

    if (courseError) {
      console.error('Error inserting course:', courseError);
      return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
    }

    const courseId = courseData[0].id; // Get the ID of the newly created course

    // --- Parse the content sections JSON and insert into 'content' table ---
    let courseContentSections;
    try {
      courseContentSections = JSON.parse(courseContentSectionsJson);
      if (!Array.isArray(courseContentSections)) {
        throw new Error('courseContentSections is not a valid array.');
      }
    } catch (parseError) {
      console.error('Error parsing courseContentSections JSON:', parseError);
      await supabaseAdmin.from('course').delete().eq('id', courseId);
      return NextResponse.json({ error: 'Invalid course content sections data format.' }, { status: 400 });
    }

    // Map the frontend data structure to your 'content' table structure (NOW INCLUDING SLUG)
    const contentToInsert = courseContentSections.map(section => ({
      title: section.title,
      content: section.body,
      metadata: section.metadata,
      category: courseId, // Foreign key linking to the course ID
      slug: slugify(section.title), // Generate slug for content section
    }));

    // Optional: Check for unique content slugs within this course before inserting
    // This is more complex to implement efficiently in bulk inserts,
    // but important if you want to guarantee uniqueness at the DB level for routing.
    // For simplicity here, we'll assume the slugify function usually creates unique enough slugs
    // and let the URL handle the context. If you need strict uniqueness (e.g., "intro-1", "intro-2"),
    // you'd need to add logic here to append numbers if a slug already exists for that course.

    if (contentToInsert.length > 0) {
      const { data: contentData, error: contentError } = await supabaseAdmin
        .from('content')
        .insert(contentToInsert);

      if (contentError) {
        console.error('Error inserting course content sections:', contentError);
        await supabaseAdmin.from('course').delete().eq('id', courseId);
        return NextResponse.json({ error: 'Failed to create course content sections.' }, { status: 500 });
      }
    }

    // Success response
    return NextResponse.json({ message: 'Course and content created successfully!', courseId: courseId, courseSlug: courseSlug }, { status: 201 });

  } catch (error) {
    console.error('API Error in POST /api/courses:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

// --- GET Function to retrieve courses with their content (INCLUDING CONTENT SLUGS) ---
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('course')
      .select('id, title, description, difficulty, image_url, created_at, slug, content(id, title, content, metadata, slug)') // Select content slug here
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching courses with content:', error);
      return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error('API Error in GET /api/courses:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}