// app/components/CourseCard.jsx
import React from 'react';
import Link from 'next/link'; // Import Link

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-[#dcfce7] text-[#15803d]'; // Débutant
    case 'Intermediate':
      return 'bg-[#fef9c3] text-[#a16207]'; // Intermédiaire
    case 'Advanced':
      return 'bg-[#fee2e2] text-[#b91c1c]'; // Avancé
    default:
      return 'bg-[#f1f5f9] text-[#475569]'; // Par défaut
  }
};

const CourseCard = ({ course }) => { // onViewDetails is no longer needed directly for the Link
  const {
    title,
    description,
    image_url,
    difficulty,
    slug, // Destructure the slug here
  } = course;

  // Function to translate difficulty levels for display
  const translateDifficulty = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'Débutant';
      case 'Intermediate':
        return 'Intermédiaire';
      case 'Advanced':
        return 'Avancé';
      default:
        return difficulty; // Return as is if no translation found
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-slide-up">
      {image_url && <img src={image_url} alt={title} className="w-full h-48 object-cover" />}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          {difficulty && (
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(difficulty)}`}>
              {/* Display translated difficulty */}
              {translateDifficulty(difficulty)}
            </span>
          )}
        </div>
        <h3 className="text-xl font-semibold text-[#334155] mb-2 font-poppins min-h-[56px]">{title}</h3>
        <p className="text-sm text-[#64748b] mb-3 flex-grow min-h-[60px]">{description}</p>

        <div className="mt-auto">
          {/* Use Next.js Link component for client-side navigation */}
          {slug && ( // Ensure slug exists before rendering the link
            <Link
              href={`/${slug}`} // Navigate to /course/[slug]
              className="w-full bg-[#0ea5e9] text-white font-medium py-2.5 px-4 rounded-lg hover:bg-[#0284c7] transition-colors duration-200 shadow-sm text-center block" // Add block and text-center for button-like appearance
            >
              Prendre le Cours
            </Link>
          )}
          {!slug && ( // Fallback if slug is not available (shouldn't happen if slug generation is correct)
            <button
              disabled
              className="w-full bg-gray-400 text-white font-medium py-2.5 px-4 rounded-lg cursor-not-allowed"
            >
              Prendre le Cours (Error)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;