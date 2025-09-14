"use client";

import React, { useState } from 'react';
import CourseCard from './CourseCard';
import ChapterList from './ChapterList';
import { Course } from '../types/course';

const CourseDashboard: React.FC = () => {
  const [courses] = useState<Course[]>([
    {
      id: '1',
      name: 'Sample Course',
      level: 'Entry',
      progress: 20,
      chapters: [
        { id: 'c1', name: 'Introduction', progress: 100 },
        { id: 'c2', name: 'Basics', progress: 50 },
      ],
    },
  ]);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} onSelect={setSelectedCourse} />
        ))}
      </div>
      {selectedCourse && <ChapterList chapters={selectedCourse.chapters} />}
    </div>
  );
};

export default CourseDashboard;
