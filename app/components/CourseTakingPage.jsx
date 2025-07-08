import React, { useState, useEffect, useMemo } from 'react';
import { PlayIcon, DocumentTextIcon, QuestionMarkCircleIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '../constants';

const LessonTypeIcon = ({ type, className = "w-5 h-5" }) => {
  switch (type) {
    case 'video':
      return <PlayIcon className={`${className} text-[#0ea5e9]`} />;
    case 'text':
      return <DocumentTextIcon className={`${className} text-[#10b981]`} />;
    case 'quiz':
      return <QuestionMarkCircleIcon className={`${className} text-[#f59e0b]`} />;
    default:
      return <DocumentTextIcon className={`${className} text-[#64748b]`} />;
  }
};

const CourseTakingPage = ({ course, onNavigate }) => {
  const [activeModuleId, setActiveModuleId] = useState(course.modules.length > 0 ? course.modules[0].id : null);
  const [activeLessonId, setActiveLessonId] = useState(
    course.modules.length > 0 && course.modules[0].lessons.length > 0 ? course.modules[0].lessons[0].id : null
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const activeLesson = useMemo(() => {
    if (!activeModuleId || !activeLessonId) return null;
    const module = course.modules.find(m => m.id === activeModuleId);
    return module?.lessons.find(l => l.id === activeLessonId) || null;
  }, [activeModuleId, activeLessonId, course.modules]);

  const allLessonsFlat = useMemo(() => {
    return course.modules.flatMap(module =>
      module.lessons.map(lesson => ({ ...lesson, moduleId: module.id }))
    );
  }, [course.modules]);

  const currentLessonIndex = useMemo(() => {
    if (!activeLesson) return -1;
    return allLessonsFlat.findIndex(l => l.id === activeLesson.id && l.moduleId === activeModuleId);
  }, [activeLesson, activeModuleId, allLessonsFlat]);

  const handleLessonClick = (moduleId, lessonId) => {
    setActiveModuleId(moduleId);
    setActiveLessonId(lessonId);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const navigateLesson = (direction) => {
    if (currentLessonIndex === -1) return;

    const newIndex = direction === 'next' ? currentLessonIndex + 1 : currentLessonIndex - 1;

    if (newIndex >= 0 && newIndex < allLessonsFlat.length) {
      const newLesson = allLessonsFlat[newIndex];
      setActiveModuleId(newLesson.moduleId);
      setActiveLessonId(newLesson.id);
    }
  };

  const toggleModule = (moduleId) => {
    setActiveModuleId(prevId => (prevId === moduleId ? null : moduleId));
  };

  useEffect(() => {
    if (!activeLessonId && course.modules.length > 0 && course.modules[0].lessons.length > 0) {
      setActiveModuleId(course.modules[0].id);
      setActiveLessonId(course.modules[0].lessons[0].id);
    }
  }, [course, activeLessonId]);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] bg-[#f8fafc]">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-24 left-2 z-50 p-2 bg-[#0ea5e9] text-white rounded-md shadow-lg"
        aria-label={sidebarOpen ? "Fermer la barre latérale" : "Ouvrir la barre latérale"}
        aria-expanded={sidebarOpen}
      >
        {sidebarOpen ? <ChevronLeftIcon className="w-6 h-6" /> : <ChevronRightIcon className="w-6 h-6" />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 md:static z-40 w-72 md:w-80 bg-white border-r border-[#e2e8f0] shadow-lg p-6 overflow-y-auto transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 pt-20 md:pt-6`}
        aria-label="Navigation du Cours"
      >
        <div className="mb-6">
          <button
            onClick={() => onNavigate('courseEnrollment', { courseId: course.id })}
            className="text-sm text-[#0ea5e9] hover:text-[#0284c7] mb-2 inline-flex items-center group transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-1 group-hover:-translate-x-0.5 transition-transform" />
            Retour aux infos du cours
          </button>
          <h2 className="text-xl font-semibold text-[#334155] font-poppins truncate" title={course.title}>{course.title}</h2>
        </div>

        <nav>
          <ul>
            {course.modules.map((module) => (
              <li key={module.id} className="mb-3">
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex justify-between items-center py-2 px-3 rounded-md hover:bg-[#f1f5f9] transition-colors text-left"
                  aria-expanded={activeModuleId === module.id}
                  aria-controls={`module-lessons-${module.id}`}
                >
                  <span className="font-medium text-[#334155]">{module.title}</span>
                  <ChevronDownIcon className={`w-5 h-5 text-[#64748b] transition-transform ${activeModuleId === module.id ? 'rotate-180' : ''}`} />
                </button>
                {activeModuleId === module.id && (
                  <ul id={`module-lessons-${module.id}`} className="mt-2 ml-4 space-y-1 animate-fade-in">
                    {module.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <button
                          onClick={() => handleLessonClick(module.id, lesson.id)}
                          className={`w-full flex items-center py-2 px-3 rounded-md text-left transition-colors text-sm
                            ${lesson.id === activeLessonId ? 'bg-[#e0f2fe] text-[#0ea5e9] font-medium' : 'text-[#64748b] hover:bg-[#f8fafc]'}`}
                          aria-current={lesson.id === activeLessonId ? "page" : undefined}
                        >
                          <LessonTypeIcon type={lesson.type} className="w-4 h-4 mr-2.5 flex-shrink-0" />
                          <span className="truncate flex-grow" title={lesson.title}>{lesson.title}</span>
                          <span className="text-xs text-[#94a3b8] ml-2 flex-shrink-0">{lesson.duration}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {activeLesson ? (
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl animate-fade-in min-h-full">
            <header className="mb-8 pb-4 border-b border-[#e2e8f0]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#0ea5e9] font-medium">{course.modules.find(m => m.id === activeModuleId)?.title}</span>
                <LessonTypeIcon type={activeLesson.type} className="w-6 h-6" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#334155] font-poppins">{activeLesson.title}</h1>
              <p className="text-sm text-[#64748b] mt-1">Durée: {activeLesson.duration}</p>
            </header>

            <article className="prose prose-slate max-w-none prose-img:rounded-lg prose-a:text-[#0ea5e9] hover:prose-a:text-[#0284c7]">
              {activeLesson.type === 'video' && (
                <div className="aspect-video bg-[#1e293b] rounded-lg flex items-center justify-center text-white mb-6">
                  <PlayIcon className="w-16 h-16 opacity-50" />
                  <p className="absolute">Contenu vidéo pour "{activeLesson.title}"</p>
                </div>
              )}
              {activeLesson.type === 'text' && (
                <div>
                  <p>Voici le contenu textuel de la leçon : <strong>{activeLesson.title}</strong>.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <p>Plus de détails et d'explications iraient ici.</p>
                </div>
              )}
              {activeLesson.type === 'quiz' && (
                <div className="p-6 bg-[#fffbeb] border border-[#fde68a] rounded-lg">
                  <h3 className="text-xl font-semibold text-[#b45309] mb-3">C'est l'heure du quiz !</h3>
                  <p>Un quiz lié à "{activeLesson.title}" serait présenté ici. Cela pourrait inclure des questions à choix multiples, des questions à trous ou des défis de codage.</p>
                  <button className="mt-4 bg-[#f59e0b] text-white px-4 py-2 rounded-md hover:bg-[#d97706]">Commencer le Quiz (Non Implémenté)</button>
                </div>
              )}
            </article>

            <div className="mt-12 pt-6 border-t border-[#e2e8f0] flex justify-between items-center">
              <button
                onClick={() => navigateLesson('prev')}
                disabled={currentLessonIndex <= 0}
                className="bg-[#e2e8f0] hover:bg-[#cbd5e1] text-[#334155] font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
              >
                <ChevronLeftIcon className="w-5 h-5 mr-1" /> Précédent
              </button>
              <button
                onClick={() => navigateLesson('next')}
                disabled={currentLessonIndex === -1 || currentLessonIndex >= allLessonsFlat.length - 1}
                className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
              >
                Suivant <ChevronRightIcon className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <QuestionMarkCircleIcon className="w-16 h-16 text-[#94a3b8] mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-[#334155]">Sélectionnez une leçon pour commencer</h2>
              <p className="text-[#64748b]">Choisissez un module et une leçon dans la barre latérale pour commencer à apprendre.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CourseTakingPage;