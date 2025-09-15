// src/components/ChapterSelect.tsx
'use client';

import { useEffect, useState } from 'react';

interface Chapter {
  id: number;
  title: string;
  weekNumber: number;
}

interface Props {
  courseId: number;
  value?: number;
  onChange: (chapterId: number) => void;
}

export default function ChapterSelect({ courseId, value, onChange }: Props) {
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    if (!courseId) return;
    const fetchChapters = async () => {
      const res = await fetch(`/api/courses/${courseId}/chapters`);
      if (res.ok) {
        const data: Chapter[] = await res.json();
        setChapters(data);
      }
    };
    fetchChapters();
  }, [courseId]);

  if (!courseId) return null;

  return (
    <select
      className="w-full border rounded p-2"
      value={value ?? ''}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label="Seleccionar capítulo"
    >
      <option value="">Selecciona un capítulo</option>
      {chapters.map((ch) => (
        <option key={ch.id} value={ch.id}>
          Semana {ch.weekNumber}: {ch.title}
        </option>
      ))}
    </select>
  );
}
