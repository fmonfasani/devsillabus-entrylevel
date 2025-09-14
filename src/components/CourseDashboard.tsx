'use client';
import React, { useState } from 'react';
import CreateCourseModal from './CreateCourseModal';

interface Course {
  id: number;
  name: string;
  slug: string;
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

