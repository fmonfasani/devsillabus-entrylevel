import React from 'react';
import { Course } from '../types/course';

interface CourseCardProps {
  course: Course;
  onSelect?: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect }) => {
  return (
    <div
      className="cursor-pointer rounded border p-4"
      onClick={() => onSelect?.(course)}
    >
      <h3 className="text-lg font-medium">{course.name}</h3>
      <p className="text-sm text-gray-500">Level: {course.level}</p>
      <p className="text-sm">Progress: {course.progress}%</p>
    </div>
  );
};

export default CourseCard;
