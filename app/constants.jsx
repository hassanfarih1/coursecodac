import React from 'react';
// Removed import { Course, CourseDifficulty } from './types'; as types are no longer needed in this JSX file

// If CourseDifficulty was used as a TypeScript enum for strict type checking,
// you'll need to decide how to represent these values in plain JavaScript.
// For example, by defining them as simple strings or constants if they are used elsewhere.
// For the purpose of this conversion, I'm assuming they can be inline strings.

export const LogoIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

export const SearchIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const StarIcon = ({ className, filled = true }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.321h5.385a.562.562 0 01.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.82.61l-4.725-2.885a.563.563 0 00-.652 0l-4.725 2.885a.562.562 0 01-.82-.61l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988h5.385a.563.563 0 00.475-.321l2.125-5.111z" />
  </svg>
);

export const CloseIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const MenuIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const ChevronDownIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export const ChevronLeftIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const ChevronRightIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const PlayIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
  </svg>
);

export const DocumentTextIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const QuestionMarkCircleIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);



export const INITIAL_COURSES = [
  {
    id: '1',
    title: 'React for Beginners: The Modern Way',
    tagline: 'Master the fundamentals of React and build dynamic web apps.',
    description: 'Dive into React.js, learning about components, state, props, hooks, and context API to build interactive user interfaces.',
    longDescription: 'This comprehensive course will take you from zero to hero in React. You will learn to build reusable components, manage application state effectively, handle user events, and fetch data from APIs. We cover modern React features like Hooks (useState, useEffect, useContext) and functional components. By the end, you will have built several mini-projects and a larger portfolio piece.',
    instructor: { name: 'Alice Wonderland', avatarUrl: 'https://picsum.photos/seed/alice/100/100' },
    imageUrl: 'https://picsum.photos/seed/react/600/400',
    difficulty: 'BEGINNER', // Changed from CourseDifficulty.BEGINNER
    duration: '8 Weeks',
    rating: 4.8,
    reviewsCount: 1250,
    tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
    whatYouWillLearn: [
      'Core React concepts: JSX, Components, Props, State',
      'React Hooks: useState, useEffect, useContext, useRef',
      'Building dynamic and interactive UIs',
      'Working with forms and handling user input',
      'Fetching data from APIs using async/await',
      'Basic state management with Context API',
    ],
    requirements: [
      'Basic understanding of HTML, CSS, and JavaScript (ES6+)',
      'A computer with internet access and a code editor',
      'Eagerness to learn!',
    ],
    modules: [
      {
        id: 'm1', title: 'Introduction to React', description: 'Get started with React, understanding its core philosophy and setting up your development environment.',
        lessons: [
          { id: 'l1a', title: 'What is React?', duration: '10min', type: 'video' },
          { id: 'l1b', title: 'Setting up Your Environment', duration: '20min', type: 'text' },
          { id: 'l1c', title: 'Your First React Component', duration: '15min', type: 'video' },
        ],
      },
      {
        id: 'm2', title: 'Components, Props, and State', description: 'Learn the building blocks of React applications: components, how to pass data with props, and manage local state.',
        lessons: [
          { id: 'l2a', title: 'Functional vs Class Components', duration: '12min', type: 'text' },
          { id: 'l2b', title: 'Understanding Props', duration: '18min', type: 'video' },
          { id: 'l2c', title: 'Managing State with useState', duration: '25min', type: 'video' },
          { id: 'l2d', title: 'Parent-Child Communication', duration: '20min', type: 'quiz' },
        ],
      },
      {
        id: 'm3', title: 'React Hooks Deep Dive', description: 'Master essential React Hooks for side effects, context, and more.',
        lessons: [
          { id: 'l3a', title: 'useEffect for Side Effects', duration: '22min', type: 'video' },
          { id: 'l3b', title: 'useContext for Global State', duration: '20min', type: 'video' },
          { id: 'l3c', title: 'useRef and Custom Hooks', duration: '18min', type: 'text' },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Advanced Tailwind CSS Techniques',
    tagline: 'Go beyond the basics and craft stunning, responsive designs.',
    description: 'Learn advanced Tailwind CSS features, customization, and best practices for building professional-grade UIs.',
    longDescription: 'Unlock the full potential of Tailwind CSS. This course covers responsive design strategies, customizing your Tailwind config, creating reusable components with @apply, optimizing for production, and integrating with JavaScript frameworks. You will work on complex layouts and learn how to build a design system thinking with Tailwind.',
    instructor: { name: 'Bob The Builder', avatarUrl: 'https://picsum.photos/seed/bob/100/100' },
    imageUrl: 'https://picsum.photos/seed/tailwind/600/400',
    difficulty: 'INTERMEDIATE', // Changed from CourseDifficulty.INTERMEDIATE
    duration: '6 Weeks',
    rating: 4.9,
    reviewsCount: 980,
    tags: ['Tailwind CSS', 'CSS', 'Frontend', 'UI/UX Design'],
    whatYouWillLearn: [
      'Advanced responsive design patterns',
      'Customizing Tailwind (colors, fonts, spacing)',
      'Using plugins and creating custom utilities',
      'Optimizing Tailwind for performance',
      'Dark mode implementation',
      'Building complex layouts and components',
    ],
    requirements: [
      'Solid understanding of HTML and CSS',
      'Basic experience with Tailwind CSS',
      'Familiarity with a JavaScript framework is helpful but not required',
    ],
    modules: [
      {
        id: 'm2_1', title: 'Tailwind Configuration Deep Dive', description: 'Mastering the tailwind.config.js file.',
        lessons: [
          { id: 'l2_1a', title: 'Customizing Theme', duration: '25min', type: 'video' },
          { id: 'l2_1b', title: 'Adding Plugins', duration: '15min', type: 'text' },
        ],
      },
      {
        id: 'm2_2', title: 'Responsive Design Mastery', description: 'Building truly adaptive interfaces.',
        lessons: [
          { id: 'l2_2a', title: 'Mobile-First Approach', duration: '20min', type: 'video' },
          { id: 'l2_2b', title: 'Complex Breakpoints', duration: '18min', type: 'quiz' },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Python for Data Science & AI',
    tagline: 'Unlock the power of Python for data analysis and machine learning.',
    description: 'A comprehensive guide to using Python libraries like NumPy, Pandas, Matplotlib, and Scikit-learn for data science.',
    longDescription: 'This course is your gateway to the exciting world of Data Science and Artificial Intelligence using Python. We start with Python fundamentals and quickly move to powerful libraries. You will learn data manipulation with Pandas, numerical computation with NumPy, data visualization with Matplotlib and Seaborn, and an introduction to machine learning concepts with Scikit-learn. Hands-on projects will solidify your understanding.',
    instructor: { name: 'Charlie Codecraft', avatarUrl: 'https://picsum.photos/seed/charlie/100/100' },
    imageUrl: 'https://picsum.photos/seed/python/600/400',
    difficulty: 'ADVANCED', // Changed from CourseDifficulty.ADVANCED
    duration: '12 Weeks',
    rating: 4.7,
    reviewsCount: 1500,
    tags: ['Python', 'Data Science', 'AI', 'Machine Learning'],
    whatYouWillLearn: [
      'Python programming fundamentals for data science',
      'Data manipulation and analysis with Pandas',
      'Numerical computing with NumPy',
      'Data visualization with Matplotlib and Seaborn',
      'Introduction to Machine Learning with Scikit-learn',
      'Building predictive models',
    ],
    requirements: [
      'Basic programming concepts (any language)',
      'Understanding of basic statistics is helpful',
      'Python installed on your machine',
    ],
    modules: [
      {
        id: 'm3_1', title: 'Python Fundamentals for Data Science', description: 'Essential Python concepts for data tasks.',
        lessons: [
          { id: 'l3_1a', title: 'Data Structures', duration: '30min', type: 'video' },
          { id: 'l3_1b', title: 'Control Flow', duration: '25min', type: 'text' },
        ],
      },
      {
        id: 'm3_2', title: 'NumPy and Pandas', description: 'Core libraries for data manipulation.',
        lessons: [
          { id: 'l3_2a', title: 'NumPy Arrays', duration: '35min', type: 'video' },
          { id: 'l3_2b', title: 'Pandas DataFrames', duration: '40min', type: 'video' },
          { id: 'l3_2c', title: 'Data Cleaning', duration: '30min', type: 'quiz' },
        ],
      },
    ],
  },
];