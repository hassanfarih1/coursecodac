// app/course/[slug]/page.jsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { ChevronDownIcon } from '@/app/constants'; // Adjust path as needed based on your structure

const getDifficultyBadge = (difficulty) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-[#dcfce7] text-[#15803d]';
    case 'Intermediate': return 'bg-[#fef9c3] text-[#a16207]';
    case 'Advanced': return 'bg-[#fee2e2] text-[#b91c1c]';
    default: return 'bg-[#f1f5f9] text-[#475569]';
  }
};

// generateStaticParams for SSG/ISR with SLUGS
export async function generateStaticParams() {
  const { data: courses, error } = await supabaseAdmin
    .from('course')
    .select('slug'); // Fetch SLUGS for static paths

  if (error) {
    console.error('Error fetching course slugs for generateStaticParams:', error);
    return [];
  }

  // Filter out any null or undefined slugs to prevent build errors
  return courses.filter(course => course.slug).map((course) => ({
    slug: String(course.slug), // Ensure slug is a string
  }));
}
// END generateStaticParams

// Function to fetch course data (reused for both page content and metadata)
async function getCourseData(slug) {
  if (!slug) {
    return null;
  }

  const { data, error } = await supabaseAdmin
    .from('course')
    .select('id, title, description, difficulty, image_url, created_at, slug, content(id, title, content, metadata, slug)')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching course with slug "${slug}":`, error);
    if (error.code === 'PGRST116') {
      return null; // Course not found
    }
    throw error; // Propagate other errors
  }

  if (!data) {
    return null;
  }

  // Sort content sections for consistent order
  const sortedContentSections = data.content ?
    [...data.content].sort((a, b) => String(a.id).localeCompare(String(b.id))) : [];

  return {
    ...data,
    content: sortedContentSections,
    firstContentSection: sortedContentSections.length > 0 ? sortedContentSections[0] : null,
  };
}

// generateMetadata function for dynamic SEO
export async function generateMetadata({ params }) {
  // FIX: Await params before destructuring
  const resolvedParams = await params; // <--- ADD THIS LINE
  const { slug } = resolvedParams;     // <--- USE resolvedParams HERE

  const course = await getCourseData(slug);

  if (!course) {
    return {
      title: 'Course Not Found',
      description: 'The requested course could not be found.',
    };
  }

  return {
    title: course.title,
    description: course.description || `Learn ${course.title} with our comprehensive course.`, // Fallback description
  };
}


export default async function CourseOverviewPage({ params }) {
  // FIX: Await params here as well
  const resolvedParams = await params; // <--- ADDED THIS LINE
  const { slug } = resolvedParams;     // <--- USE resolvedParams HERE

  let course = null;
  try {
    course = await getCourseData(slug);
  } catch (err) {
    console.error('Server component data fetching error in CourseOverviewPage:', err);
    notFound(); // Use notFound for actual page rendering errors
  }

  if (!course) {
    notFound();
  }

  const { firstContentSection, content: sortedContentSections } = course;

  // If there's no content, still display the course details but indicate no content
  if (!firstContentSection) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{course.title}</h1>
        <p className="text-xl text-gray-700">This course currently has no content sections. Please check back later!</p>
        <Link href="/courses" className="mt-6 px-6 py-3 bg-[#0ea5e9] text-white rounded-md hover:bg-[#0284c7] transition-colors">
          Back to All Courses
        </Link>
      </div>
    );
  }

  const createdAtDate = course.created_at ? new Date(course.created_at) : null;
  const formattedDate = createdAtDate ?
    new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(createdAtDate) :
    'Date not available';

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      <div className="bg-[#1e293b] text-white py-10 md:py-16 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="container mx-auto">
          <Link
            href="/courses"
            className="text-sm text-[#93c5fd] hover:text-[#e0f2fe] mb-4 transition-colors duration-200 inline-flex items-center group"
          >
            {ChevronDownIcon && <ChevronDownIcon className="w-5 h-5 mr-1 transform -rotate-90 inline-block group-hover:-translate-x-1 transition-transform duration-200" />} Back to All Courses
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-3">{course.title}</h1>
          {course.description && (
            <p className="text-lg text-[#cbd5e1] mb-4">{course.description}</p>
          )}
          <div className="flex items-center space-x-4 text-[#e2e8f0] text-sm mb-4">
            <p>Created: <span className="font-semibold">{formattedDate}</span></p>
            {course.difficulty && (
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyBadge(course.difficulty)}`}>
                {course.difficulty}
              </span>
            )}
          </div>
          {course.image_url && (
            <img
              src={course.image_url}
              alt={course.title}
              className="w-full h-64 object-cover rounded-lg shadow-xl mt-6 md:mt-8"
            />
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="lg:grid lg:grid-cols-4 lg:gap-10">
          <div className="lg:col-span-3">
            <section className="mb-10 p-6 bg-white rounded-lg shadow-lg article-content">
              <h2 className="text-2xl font-bold text-[#334155] font-poppins mb-4">
                {firstContentSection.title}
              </h2>
              <div
                className="prose max-w-none text-[#475569] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: firstContentSection.content }}
              />
            </section>
          </div>

          <div className="lg:col-span-1 lg:pl-6">
            <div className="sticky top-24 space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-[#334155] mb-4">Course Lessons</h3>
                {sortedContentSections.length > 0 ? (
                  <ul className="space-y-3">
                    {sortedContentSections.map((section, index) => (
                      <li key={section.id}> {/* Use item.id for stable key */}
                        {/* LINK TO SPECIFIC CONTENT SECTION USING COURSE.SLUG AND SECTION.SLUG */}
                        {/* Ensure section.slug exists before linking */}
                        {section.slug ? (
                          <Link
                            href={`/${slug}/${section.slug}`} // Adjusted to /course/ slug/ section.slug
                            className={`block p-2 rounded-md transition-colors duration-200
                                       ${String(section.id) === String(firstContentSection.id) // Still compare by ID for active state for now
                                           ? 'bg-[#e0f2fe] text-[#0ea5e9] font-semibold'
                                           : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`
                                       }
                          >
                            <span className="text-sm">{index + 1}. {section.title}</span>
                          </Link>
                        ) : (
                          // Fallback if content section doesn't have a slug (e.g., old data)
                          <span className="block p-2 text-gray-500">
                            {index + 1}. {section.title} (Link not available)
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-gray-600 text-sm">No lessons found for this course.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}