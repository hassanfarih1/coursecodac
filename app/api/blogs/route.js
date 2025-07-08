// src/app/api/blogs/route.js
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { slugify } from '@/lib/slugify'; // Import the slugify function

export async function POST(request) {
    try {
        const formData = await request.formData();
        const blogTitle = formData.get('blogTitle');
        const blogContent = formData.get('blogContent');
        const blogImageFile = formData.get('blogImageFile');
        const blogMetaData = formData.get('blogMetaData');

        // Basic validation for essential blog data
        if (!blogTitle || !blogContent) {
            return NextResponse.json({ error: 'Missing required blog data (title, content).' }, { status: 400 });
        }

        // --- Generate Slug for the Blog Post ---
        const baseSlug = slugify(blogTitle);
        let blogSlug = baseSlug;
        let counter = 0;

        // Check for slug uniqueness and append a counter if necessary
        while (true) {
            const { data: existingBlog, error: existingBlogError } = await supabaseAdmin
                .from('blogs')
                .select('id')
                .eq('slug', blogSlug)
                .single();

            if (existingBlogError && existingBlogError.code !== 'PGRST116') {
                // PGRST116 means "no rows found", which is good. Other errors are bad.
                console.error('Error checking for existing blog slug:', existingBlogError);
                return NextResponse.json({ error: 'Failed to check for existing blog slug.' }, { status: 500 });
            }

            if (existingBlog) {
                // Slug already exists, try appending a number
                counter++;
                blogSlug = `${baseSlug}-${counter}`;
            } else {
                // Slug is unique (or no error, meaning no existing blog)
                break;
            }
        }

        let imageUrl = null;

        // --- Upload Blog Image to Supabase Storage ---
        if (blogImageFile) {
            const imageFileName = `${Date.now()}-${blogImageFile.name}`;
            const { data: imageData, error: imageError } = await supabaseAdmin.storage
                .from('blogimages') // Ensure this bucket exists in your Supabase Storage
                .upload(imageFileName, blogImageFile, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (imageError) {
                console.error('Error uploading blog image:', imageError);
                return NextResponse.json({ error: 'Failed to upload blog image' }, { status: 500 });
            }
            imageUrl = supabaseAdmin.storage.from('blogimages').getPublicUrl(imageFileName).data.publicUrl;
        }

        // --- Insert new blog post into the 'blogs' table (NOW INCLUDING SLUG) ---
        const { data: newBlogData, error: insertError } = await supabaseAdmin
            .from('blogs') // Your Supabase 'blogs' table name
            .insert([
                {
                    title: blogTitle,
                    image_url: imageUrl,
                    content: blogContent,
                    metadata: blogMetaData,
                    slug: blogSlug, // Add the generated blog slug here
                },
            ])
            .select('id, slug'); // Select the new ID and slug

        if (insertError) {
            console.error('Error inserting blog post:', insertError);
            return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Blog post created successfully', blog: newBlogData[0] }, { status: 201 });

    } catch (error) {
        console.error('API Error in POST /api/blogs:', error);
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}

// --- GET Function to retrieve all blog posts (NOW INCLUDING SLUG) ---
export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('blogs') // Your Supabase 'blogs' table name
            .select('id, title, content, image_url, created_at, slug') // Select all columns, INCLUDING SLUG
            .order('created_at', { ascending: false }); // Order by most recent first

        if (error) {
            console.error('Error fetching blog posts:', error);
            return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('API Error in GET /api/blogs:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}