'use client';
import React from 'react';

interface Course {
  id: number;
  name: string;
  slug: string;
  chapters: number;
  enrollments: number;
  completionRate: number;
}

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onSelect: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEdit, onSelect }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{course.name}</h3>
          <p className="text-sm text-gray-500">{course.slug}</p>
          <div className="mt-2 text-sm text-gray-600">
            <p>Chapters: {course.chapters}</p>
            <p>Estudiantes: {course.enrollments}</p>
            <p>Completado: {course.completionRate}%</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(course)}
            className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
          >
            Editar
          </button>
          <button
            onClick={() => onSelect(course)}
            className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
          >
            Capítulos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

