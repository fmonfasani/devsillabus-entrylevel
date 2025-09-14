import React from 'react';
import { Chapter } from '../types/course';

interface ChapterListProps {
  chapters: Chapter[];
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters }) => {
  return (
    <ul className="space-y-2">
      {chapters.map((chapter) => (
        <li key={chapter.id} className="rounded border p-2">
          <span className="font-medium">{chapter.name}</span>
          <span className="ml-2 text-sm text-gray-500">{chapter.progress}%</span>
        </li>
      ))}
    </ul>
  );
};

export default ChapterList;
