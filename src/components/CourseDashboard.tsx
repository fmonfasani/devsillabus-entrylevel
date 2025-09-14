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
        editingCourse={editingCourse || undefined}
      />
    </div>
  );
};

export default CourseDashboard;

