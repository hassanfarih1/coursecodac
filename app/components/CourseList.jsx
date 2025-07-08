// app/components/CourseList.jsx
import React from 'react';
import CourseCard from './CourseCard';
import LoadingSpinner from './LoadingSpinner';

const CourseList = ({ courses, onViewDetails, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        {/* Couleur directe pour text-neutral-dark */}
        <p className="text-xl text-[#64748b]">Aucun cours trouvé. Essayez un autre terme de recherche !</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {courses.map(course => (
        // The CourseCard receives the full 'course' object, which now contains the 'slug'.
        // The onViewDetails function (from app/courses/page.jsx) will then use this slug.
        <CourseCard key={course.id} course={course} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
};

export default CourseList;