
'use client';

import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import ChapterList from './ChapterList';
import CreateCourseModal from './CreateCourseModal';

interface Course {
  id: number;
  name: string;
  slug: string;

  chapters: number;
  enrollments: number;
  completionRate: number;

  description: string;
  type: string;
  level: string;
  durationWeeks: number;
  startDate: string;
  endDate: string;
  isActive: boolean;

}

const CourseDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/courses');
    if (res.ok) {
      const data = await res.json();
      setCourses(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCourseSubmit = async (courseData: any) => {
    const method = editingCourse ? 'PUT' : 'POST';
    const url = editingCourse
      ? `/api/admin/courses/${editingCourse.id}`
      : '/api/admin/courses';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData)
    });
    setModalOpen(false);
    setEditingCourse(null);
    fetchCourses();

  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const handleCreateCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = { id: Date.now(), ...courseData };
    setCourses(prev => [...prev, newCourse]);
  };

  const handleUpdateCourse = (courseData: Omit<Course, 'id'>) => {
    if (!editingCourse) return;
    setCourses(prev =>
      prev.map(course =>
        course.id === editingCourse.id ? { ...course, ...courseData } : course
      )
    );
    setEditingCourse(null);
  };

  const openCreateModal = () => {
    setEditingCourse(null);
    setShowCourseModal(true);
  };

  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    setShowCourseModal(true);
  };

  const closeModal = () => {
    setShowCourseModal(false);
    setEditingCourse(null);

  };

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Cursos</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="px-3 py-2 bg-blue-600 text-white rounded"
        >
          Nuevo Curso
        </button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id}>
              <CourseCard
                course={course}
                onEdit={(c) => {
                  setEditingCourse(c);
                  setModalOpen(true);
                }}
                onSelect={(c) =>
                  setSelectedCourse(selectedCourse?.id === c.id ? null : c)
                }
              />
              {selectedCourse?.id === course.id && (
                <ChapterList course={course} />
              )}
            </div>
          ))}
        </div>
      )}

      <CreateCourseModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingCourse(null);
        }}
        onSubmit={handleCourseSubmit}

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Cursos</h1>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Crear Curso
        </button>
      </div>

      {courses.length === 0 ? (
        <p className="text-gray-500">No hay cursos creados.</p>
      ) : (
        <ul className="space-y-2">
          {courses.map(course => (
            <li key={course.id} className="border p-4 rounded flex justify-between">
              <div>
                <h2 className="font-semibold">{course.name}</h2>
                <p className="text-sm text-gray-600">{course.description}</p>
              </div>
              <button
                onClick={() => openEditModal(course)}
                className="text-blue-600 hover:underline"
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      )}

      <CreateCourseModal
        isOpen={showCourseModal}
        onClose={closeModal}
        onSubmit={editingCourse ? handleUpdateCourse : handleCreateCourse}

        editingCourse={editingCourse || undefined}
      />

    </div>
  );
};

export default CourseDashboard;

