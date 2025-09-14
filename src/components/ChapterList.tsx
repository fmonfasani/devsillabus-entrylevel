'use client';
import React, { useEffect, useState } from 'react';
import CreateChapterModal from './CreateChapterModal';

interface Chapter {
  id: number;
  weekNumber: number;
  title: string;
}

interface ChapterListProps {
  course: { id: number; name: string };
}

const ChapterList: React.FC<ChapterListProps> = ({ course }) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchChapters = async () => {
    const res = await fetch(`/api/admin/courses/${course.id}/chapters`);
    if (res.ok) {
      setChapters(await res.json());
    }
  };

  useEffect(() => {
    fetchChapters();
  }, [course.id]);

  const handleSubmit = async (chapterData: any) => {
    await fetch(`/api/admin/courses/${course.id}/chapters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(chapterData)
    });
    setIsOpen(false);
    fetchChapters();
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold">Capítulos de {course.name}</h4>
        <button
          onClick={() => setIsOpen(true)}
          className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
        >
          Nuevo
        </button>
      </div>
      <ul className="space-y-1">
        {chapters.map((ch) => (
          <li key={ch.id} className="border rounded p-2">
            Semana {ch.weekNumber}: {ch.title}
          </li>
        ))}
      </ul>

      <CreateChapterModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        courseId={course.id}
        maxWeekNumber={chapters.length}
      />
    </div>
  );
};

export default ChapterList;

