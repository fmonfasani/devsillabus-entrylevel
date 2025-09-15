// src/components/CreateCourseModal.tsx
'use client';

import { useState } from 'react';
import { CourseLevel, CourseType } from '@prisma/client';
import { useToast } from './Toast';

interface Course {
  id: number;
  name: string;
  slug: string;
  description: string;
  type: CourseType;
  level: CourseLevel;
  initWeeks: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (course: Course) => void;
}

export default function CreateCourseModal({ isOpen, onClose, onCreated }: Props) {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    type: CourseType.FULLSTACK as CourseType,
    level: CourseLevel.ENTRY_LEVEL as CourseLevel,
    initWeeks: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/admin/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.status === 201) {
      const data = await res.json();
      addToast('Curso creado');
      onCreated(data);
      onClose();
      setForm({
        name: '',
        slug: '',
        description: '',
        type: CourseType.FULLSTACK,
        level: CourseLevel.ENTRY_LEVEL,
        initWeeks: false,
      });
    } else {
      addToast('Error al crear curso', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4">Crear curso</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="course-name" className="block text-sm font-medium mb-1">
              Nombre
            </label>
            <input
              id="course-name"
              className="w-full border rounded p-2"
              value={form.name}
              onChange={(e) =>
                handleChange('name', e.target.value)
              }
              required
            />
          </div>
          <div>
            <label htmlFor="course-slug" className="block text-sm font-medium mb-1">
              Slug
            </label>
            <input
              id="course-slug"
              className="w-full border rounded p-2"
              value={form.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="course-description" className="block text-sm font-medium mb-1">
              Descripción
            </label>
            <textarea
              id="course-description"
              className="w-full border rounded p-2"
              rows={3}
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label htmlFor="course-type" className="block text-sm font-medium mb-1">
                Tipo
              </label>
              <select
                id="course-type"
                className="w-full border rounded p-2"
                value={form.type}
                onChange={(e) => handleChange('type', e.target.value as CourseType)}
              >
                {Object.values(CourseType).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="course-level" className="block text-sm font-medium mb-1">
                Nivel
              </label>
              <select
                id="course-level"
                className="w-full border rounded p-2"
                value={form.level}
                onChange={(e) => handleChange('level', e.target.value as CourseLevel)}
              >
                {Object.values(CourseLevel).map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="course-initweeks"
              type="checkbox"
              checked={form.initWeeks}
              onChange={(e) => handleChange('initWeeks', e.target.checked)}
            />
            <label htmlFor="course-initweeks" className="text-sm">
              Inicializar semanas
            </label>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? 'Guardando...' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
