'use client';

import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import TipTapEditor from '../components/TipTapEditor'; // Adjust path if necessary

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [loading, setLoading] = useState(false);

  // --- Course Form States ---
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState(''); // State for course description
  const [courseImageFile, setCourseImageFile] = useState(null);
  const [courseDifficulty, setCourseDifficulty] = useState('Beginner');

  // State for dynamic course content sections, each with its own title and body
  const [courseContentSections, setCourseContentSections] = useState([
    { title: '', body: '' }, // Start with one empty content section
  ]);

  // --- Blog Form States ---
  const [blogTitle, setBlogTitle] = useState('');
  const [blogImageFile, setBlogImageFile] = useState(null);
  const [blogContent, setBlogContent] = useState(''); // State to hold blog content (will be used by TipTap)

  // --- Course Handlers ---
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('courseTitle', courseTitle);
    formData.append('courseDescription', courseDescription); // Append course description
    formData.append('courseDifficulty', courseDifficulty);
    formData.append('courseContentSections', JSON.stringify(courseContentSections));

    if (courseImageFile) {
      formData.append('courseImageFile', courseImageFile);
    }

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create course');
      }

      const result = await response.json();
      console.log('Course created successfully:', result);
      toast.success('Course created successfully!');

      // Clear form
      setCourseTitle('');
      setCourseDescription(''); // Clear the description state
      setCourseImageFile(null);
      setCourseDifficulty('Beginner');
      setCourseContentSections([{ title: '', body: '' }]); // Removed metadata from initial state
      document.getElementById('courseImageFile').value = '';

    } catch (error) {
      console.error('Error creating course:', error);
      toast.error(error.message || 'Error creating course.');
    } finally {
      setLoading(false);
    }
  };

  // Handlers for dynamic content sections
  const handleAddContentSection = () => {
    setCourseContentSections([...courseContentSections, { title: '', body: '' }]); // Removed metadata from new section
  };

  const handleRemoveContentSection = (index) => {
    const newSections = courseContentSections.filter((_, i) => i !== index);
    setCourseContentSections(newSections);
  };

  const handleContentSectionChange = (index, field, value) => {
    const newSections = courseContentSections.map((section, i) =>
      i === index ? { ...section, [field]: value } : section
    );
    setCourseContentSections(newSections);
  };


  // --- Blog Handlers ---
  const handleCreateBlog = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('blogTitle', blogTitle);
    formData.append('blogContent', blogContent); // blogContent now comes from TipTapEditor

    if (blogImageFile) {
      formData.append('blogImageFile', blogImageFile);
    }

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create blog post');
      }

      const result = await response.json();
      console.log('Blog post created successfully:', result);
      toast.success('Blog post created successfully!');

      // Clear form
      setBlogTitle('');
      setBlogImageFile(null);
      setBlogContent(''); // Clear TipTap content
      document.getElementById('blogImageFile').value = '';

    } catch (error) {
      console.error('Error creating blog post:', error);
      toast.error(error.message || 'Error creating blog post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-160px)]">
      <Toaster />
      <h1 className="text-4xl font-bold text-[#334155] mb-8 text-center font-poppins">Admin Panel</h1>

      <div className="flex justify-center mb-8">
        <button
          className={`px-6 py-3 text-lg font-medium rounded-l-lg transition-colors duration-200 ${
            activeTab === 'courses' ? 'bg-[#0ea5e9] text-white shadow-md' : 'bg-[#e2e8f0] text-[#334155] hover:bg-[#cbd5e1]'
          }`}
          onClick={() => setActiveTab('courses')}
          disabled={loading}
        >
          Manage Courses
        </button>
        <button
          className={`px-6 py-3 text-lg font-medium rounded-r-lg transition-colors duration-200 ${
            activeTab === 'blogs' ? 'bg-[#0ea5e9] text-white shadow-md' : 'bg-[#e2e8f0] text-[#334155] hover:bg-[#cbd5e1]'
          }`}
          onClick={() => setActiveTab('blogs')}
          disabled={loading}
        >
          Manage Blogs
        </button>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing... Please wait.
          </div>
        </div>
      )}

      {activeTab === 'courses' && (
        <div className="bg-white p-8 rounded-lg shadow-xl mb-12 animate-fade-in">
          <h2 className="text-3xl font-semibold text-[#334155] mb-6 border-b pb-4">Create New Course</h2>
          <form onSubmit={handleCreateCourse} className="space-y-6">
            {/* Course Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="courseTitle" className="block text-sm font-medium text-[#334155] mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  id="courseTitle"
                  className="w-full px-4 py-2 border border-[#cbd5e1] rounded-md focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="courseDifficulty" className="block text-sm font-medium text-[#334155] mb-1">
                  Difficulty
                </label>
                <select
                  id="courseDifficulty"
                  className="w-full px-4 py-2 border border-[#cbd5e1] rounded-md focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
                  value={courseDifficulty}
                  onChange={(e) => setCourseDifficulty(e.target.value)}
                  disabled={loading}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>

            {/* Course Description Textarea */}
            <div>
              <label htmlFor="courseDescription" className="block text-sm font-medium text-[#334155] mb-1">
                Course Description
              </label>
              <textarea
                id="courseDescription"
                rows="4" // You can adjust the number of rows
                className="w-full px-4 py-2 border border-[#cbd5e1] rounded-md focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="Provide a brief overview of the course content and what learners will achieve."
                disabled={loading}
              ></textarea>
            </div>

            {/* Course Image File */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <div>
                <label htmlFor="courseImageFile" className="block text-sm font-medium text-[#334155] mb-1">
                  Course Image File
                </label>
                <input
                  type="file"
                  id="courseImageFile"
                  className="w-full px-4 py-2 border border-[#cbd5e1] rounded-md focus:ring-[#0ea5e9] focus:border-[#0ea5e9] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e0f2fe] file:text-[#0ea5e9] hover:file:bg-[#bfdbfe]"
                  accept="image/*"
                  onChange={(e) => setCourseImageFile(e.target.files[0])}
                  required // Make image required for creating a new course
                  disabled={loading}
                />
                {courseImageFile && (
                  <p className="text-xs text-gray-500 mt-1">Selected: {courseImageFile.name}</p>
                )}
              </div>
            </div>

            {/* Dynamic Course Content Sections */}
            <div className="space-y-4 border border-[#e2e8f0] p-4 rounded-md">
              <h3 className="text-xl font-medium text-[#334155] mb-4">Course Content Sections</h3>
              {courseContentSections.map((section, index) => (
                <div key={index} className="border border-[#cbd5e1] p-4 rounded-md bg-[#f8fafc] space-y-3">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor={`contentTitle-${index}`} className="block text-sm font-medium text-[#334155]">
                      Section {index + 1} Title
                    </label>
                    {/* Only show remove button if there's more than one section */}
                    {courseContentSections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveContentSection(index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                        disabled={loading}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    id={`contentTitle-${index}`}
                    className="w-full px-3 py-2 border border-[#cbd5e1] rounded-md focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
                    value={section.title}
                    onChange={(e) => handleContentSectionChange(index, 'title', e.target.value)}
                    placeholder="e.g., Introduction to React"
                    required
                    disabled={loading}
                  />

                  <label htmlFor={`contentBody-${index}`} className="block text-sm font-medium text-[#334155] mt-4 mb-1">
                    Section {index + 1} Body
                  </label>
                  <TipTapEditor
                    content={section.body}
                    onUpdate={(newContent) => handleContentSectionChange(index, 'body', newContent)}
                    editable={!loading}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddContentSection}
                className="w-full bg-[#0ea5e9] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#0284c7] transition-colors duration-200 mt-4 disabled:opacity-50"
                disabled={loading}
              >
                Add Content Section
              </button>
            </div>

            <div className="mt-8 pt-6 border-t">
              <button
                type="submit"
                className="w-full bg-[#10b981] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#059669] transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10b981]"
                disabled={loading}
              >
                {loading ? 'Creating Course...' : 'Create Course'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blog Management Section */}
      {activeTab === 'blogs' && (
        <div className="bg-white p-8 rounded-lg shadow-xl mb-12 animate-fade-in">
          <h2 className="text-3xl font-semibold text-[#334155] mb-6 border-b pb-4">Create New Blog Post</h2>
          <form onSubmit={handleCreateBlog} className="space-y-6">
            <div>
              <label htmlFor="blogTitle" className="block text-sm font-medium text-[#334155] mb-1">
                Blog Title
              </label>
              <input
                type="text"
                id="blogTitle"
                className="w-full px-4 py-2 border border-[#cbd5e1] rounded-md focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="blogImageFile" className="block text-sm font-medium text-[#334155] mb-1">
                Blog Image File (Thumbnail)
              </label>
              <input
                type="file"
                id="blogImageFile"
                className="w-full px-4 py-2 border border-[#cbd5e1] rounded-md focus:ring-[#0ea5e9] focus:border-[#0ea5e9] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e0f2fe] file:text-[#0ea5e9] hover:file:bg-[#bfdbfe]"
                accept="image/*"
                onChange={(e) => setBlogImageFile(e.target.files[0])}
                disabled={loading}
              />
              {blogImageFile && (
                <p className="text-xs text-gray-500 mt-1">Selected: {blogImageFile.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="blogContent" className="block text-sm font-medium text-[#334155] mb-1">
                Blog Content
              </label>
              {/* MODIFIED: Replaced textarea with TipTapEditor */}
              <TipTapEditor
                content={blogContent}
                onUpdate={setBlogContent} // TipTapEditor will call setBlogContent with the new HTML content
                editable={!loading} // Pass loading state to disable editor when processing
              />
            </div>

            <div className="mt-8 pt-6 border-t">
              <button
                type="submit"
                className="w-full bg-[#10b981] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#059669] transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10b981]"
                disabled={loading}
              >
                {loading ? 'Creating Blog Post...' : 'Create Blog Post'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPage;