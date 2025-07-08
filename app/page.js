// app/page.js
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import HeroSection from './components/HeroSection';
import SearchBar from './components/SearchBar';
import CourseList from './components/CourseList';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const [allCourses, setAllCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('/api/courses');
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `Erreur HTTP ! statut: ${response.status}`);
                }
                const data = await response.json();
                setAllCourses(data);
                setFilteredCourses(data);
            } catch (err) {
                console.error('Échec de la récupération des cours pour la page d&apos;accueil :', err);
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

    const navigateTo = useCallback((page, options) => {
        if (page === 'courses') {
            router.push('/courses');
        } else if (page === 'courseEnrollment' && options?.courseId) {
            // Chemin mis à jour
            router.push(`/${options.courseId}`);
        }
    }, [router]);

    const handleViewCourseDetails = useCallback((course) => {
        // Chemin mis à jour
        router.push(`/${course.id}`);
    }, [router]);

    if (error) {
        return (
            <div className="text-center py-12 text-red-600">
                <p>Erreur lors du chargement des cours pour la page d&apos;accueil : {error}</p>
                <p>Veuillez vérifier votre API et la connexion à la base de données.</p>
            </div>
        );
    }

    return (
        <>
            <HeroSection onNavigate={navigateTo} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="text-center md:text-left mb-8">
                    <h2 className="text-3xl font-bold text-[#334155] font-poppins ">Cours en Vedette</h2>
                    <p className="text-[#64748b] mt-2">Découvrez nos cours les plus populaires pour démarrer votre apprentissage.</p>
                </div>
                <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
                <CourseList
                    courses={filteredCourses.slice(0, 8)}
                    onViewDetails={handleViewCourseDetails}
                    isLoading={isLoading}
                />
            </div>
        </>
    );
}