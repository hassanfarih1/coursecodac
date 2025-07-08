// app/course/[slug]/[contentSlug]/page.jsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { ChevronDownIcon } from '@/app/constants'; // Adjust path as needed

// generateStaticParams for SSG/ISR
export async function generateStaticParams() {
  const { data: courses, error: coursesError } = await supabaseAdmin
    .from('course')
    .select('slug, content(slug)'); // Select course SLUG and content SLUG

  if (coursesError) {
    console.error('Error fetching course slugs and content slugs for generateStaticParams (content pages):', coursesError);
    return [];
  }

  let paths = [];
  courses.forEach(course => {
    // Ensure course.slug exists and is not null
    if (course.slug) {
      course.content.forEach(contentItem => {
        // Ensure contentItem.slug exists and is not null
        // Also ensure it's not an empty string or just whitespace
        if (contentItem.slug && String(contentItem.slug).trim() !== '') {
          paths.push({
            slug: String(course.slug),     // Course slug
            contentSlug: String(contentItem.slug), // Content slug
          });
        } else {
            console.warn(`Skipping content item with missing or empty slug for course slug: ${course.slug}, content ID: ${contentItem.id}`);
        }
      });
    } else {
        console.warn(`Skipping course with missing or empty slug: ${course.id}`);
    }
  });

  return paths;
}

// Helper function to fetch data for both the page component and generateMetadata
async function getContentPageData(slug, contentSlug) {
  if (!slug || !contentSlug) {
    console.error("Missing slug or contentSlug in getContentPageData.");
    return null;
  }

  // Fetch the course by slug to get its internal ID (for content filtering) and title
  const { data: courseData, error: courseError } = await supabaseAdmin
    .from('course')
    .select('id, title, slug') // Select id, title, and slug
    .eq('slug', slug) // Query by course SLUG
    .single();

  if (courseError || !courseData) {
    console.error(`Error fetching course by slug "${slug}":`, courseError);
    return null; // Return null if course not found or error
  }
  const courseTitle = courseData.title;
  const courseSupabaseId = courseData.id; // Use this for content table 'category' filter

  // Fetch the specific content section by its slug AND course category (internal ID)
  const { data: currentContentData, error: currentContentError } = await supabaseAdmin
    .from('content')
    .select('id, title, content, metadata, slug') // Select content details including slug
    .eq('slug', contentSlug) // Query by content SLUG
    .eq('category', courseSupabaseId) // Filter by course's internal ID (category)
    .single();

  if (currentContentError) {
    console.error(
      `Error fetching current content section "${contentSlug}" for course ID ${courseSupabaseId} (slug: ${slug}):`,
      JSON.stringify(currentContentError, null, 2)
    );
    if (currentContentError.code === 'PGRST116') {
      console.warn(`Current content section "${contentSlug}" not found (PGRST116) for course ID ${courseSupabaseId}.`);
    }
    return null; // Return null if content not found or error
  }
  const contentSection = currentContentData;

  // Fetch all content sections for the current course (for navigation), ordering by their internal ID
  const { data: allContentData, error: allContentError } = await supabaseAdmin
    .from('content')
    .select('id, title, slug') // Need id, title, and slug for navigation list
    .eq('category', courseSupabaseId)
    .order('id', { ascending: true }); // Order by ID to maintain a consistent lesson order

  let allCourseContent = [];
  if (allContentData) {
    allCourseContent = allContentData;
  } else if (allContentError) {
    console.warn(`Could not fetch all content sections for course ID ${courseSupabaseId}:`, JSON.stringify(allContentError, null, 2));
  }

  return { courseTitle, contentSection, allCourseContent };
}


// generateMetadata function for dynamic SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params; // Await params here
  const { slug, contentSlug } = resolvedParams;

  const data = await getContentPageData(slug, contentSlug);

  if (!data || !data.contentSection) {
    return {
      title: 'Content Not Found',
      description: 'The requested course content could not be found.',
    };
  }

  const { courseTitle, contentSection } = data;

  // Generate a description from the content, stripping HTML tags and truncating
  const plainTextContent = contentSection.content ? contentSection.content.replace(/<[^>]*>?/gm, '') : '';
  const description = plainTextContent.substring(0, 160) + (plainTextContent.length > 160 ? '...' : '');

  return {
    title: `${contentSection.title} | ${courseTitle}`,
    description: description || `Learn about ${contentSection.title} in the ${courseTitle} course.`, // Fallback description
  };
}


export default async function IndividualContentPage({ params }) {
  const resolvedParams = await params;
  const { slug, contentSlug } = resolvedParams;

  let data = null;
  try {
    data = await getContentPageData(slug, contentSlug);
  } catch (err) {
    console.error('Caught an unexpected error during data fetching in IndividualContentPage:', err);
    notFound();
  }

  if (!data || !data.contentSection) {
    console.warn(`Content section "${contentSlug}" is null after all fetch attempts for course "${slug}". Triggering 404.`);
    notFound();
  }

  const { courseTitle, contentSection, allCourseContent } = data;

  // --- DEBUGGING: Log the content before rendering ---
  console.log("--- DEBUGGING contentSection.content ---");
  console.log("Type of contentSection.content:", typeof contentSection.content);
  console.log("Value of contentSection.content (first 500 chars):", String(contentSection.content || '').substring(0, 500));
  console.log("Is contentSection.content truthy?", !!contentSection.content);
  console.log("Length of contentSection.content:", String(contentSection.content || '').length);
  console.log("--- END DEBUGGING ---");

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      <div className="bg-[#1e293b] text-white py-8 md:py-12 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="container mx-auto">
          <Link
            href={`/${slug}`} // Corrected to include /course/ base path
            className="text-sm text-[#93c5fd] hover:text-[#e0f2fe] mb-4 transition-colors duration-200 inline-flex items-center group"
          >
            {ChevronDownIcon && <ChevronDownIcon className="w-5 h-5 mr-1 transform -rotate-90 inline-block group-hover:-translate-x-1 transition-transform duration-200" />}
            Back to Course: <span className="font-semibold ml-1">{courseTitle}</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-2 mt-4">{contentSection.title}</h1>
          <p className="text-lg text-[#cbd5e1]">{courseTitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="lg:grid lg:grid-cols-4 lg:gap-10">
          <div className="lg:col-span-3">
            <section className="p-6 bg-white rounded-lg shadow-lg article-content">
              {contentSection.content ? (
                <div
                  className="prose max-w-none text-[#475569] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: contentSection.content }}
                />
              ) : (
                <p className="text-gray-600 text-center py-10">
                  No content available for this lesson. Please check the data source.
                </p>
              )}
            </section>
          </div>

          <div className="lg:col-span-1 lg:pl-6">
            <div className="sticky top-24 space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-[#334155] mb-4">Course Lessons</h3>
                {allCourseContent.length > 0 ? (
                  <ul className="space-y-3">
                    {allCourseContent.map((item) => (
                      <li key={item.id}> {/* Keep key as item.id, it's stable */}
                        {/* Ensure section.slug exists before linking */}
                        {item.slug ? (
                          <Link
                            // Link using course SLUG and content SLUG
                            href={`/${slug}/${item.slug}`} // Corrected to include /course/ base path
                            className={`block p-2 rounded-md transition-colors duration-200
                                       ${String(item.slug) === contentSlug
                                            ? 'bg-[#e0f2fe] text-[#0ea5e9] font-semibold'
                                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`
                                          }
                          >
                            <span className="text-sm">{item.title}</span>
                          </Link>
                        ) : (
                          // Fallback if content section doesn't have a slug (e.g., old data)
                          <span className="block p-2 text-gray-500">
                            {item.title} (Link not available)
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-gray-600 text-sm">No other lessons found for this course.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
