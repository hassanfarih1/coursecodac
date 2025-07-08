// app/courses/page.jsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import CourseList from '../components/CourseList';
import { useRouter } from 'next/navigation';

const CoursesPage = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const fetchCourses = async () => {
      try {
        // This API route will return the necessary course data, without 'slug'
        const response = await fetch('/api/courses');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllCourses(data);
        setFilteredCourses(data);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
    if (!term) {
      setFilteredCourses(allCourses);
      return;
    }
    const lowercasedTerm = term.toLowerCase();
    const results = allCourses.filter(course =>
      course.title.toLowerCase().includes(lowercasedTerm) ||
      (course.description && course.description.toLowerCase().includes(lowercasedTerm))
    );
    setFilteredCourses(results);
  }, [allCourses]);

  const onViewDetails = useCallback((course) => {
    // *** CRUCIAL CHANGE: Use course.id for navigation ***
    router.push(`/${course.id}`);
  }, [router]);

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 text-center text-red-600">
        <h1 className="text-4xl font-bold mb-4">Error Loading Courses</h1>
        <p className="text-lg">An issue occurred while fetching courses: {error}</p>
        <p className="text-md mt-2">Please try refreshing the page or checking your network connection.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-bold text-[#334155] font-poppins mb-4">All Courses</h1>
        <p className="text-lg text-[#64748b]">
          Find the perfect course to spark your curiosity and grow your skills.
        </p>
      </header>

      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <div className="mt-8">
        <CourseList
          courses={filteredCourses}
          onViewDetails={onViewDetails}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CoursesPage;