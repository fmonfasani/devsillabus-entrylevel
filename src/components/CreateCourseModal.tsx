// src/components/CreateCourseModal.tsx
'use client';
import { useState } from 'react';
import { CourseType, CourseLevel } from '@prisma/client';

interface Props {
  onCreated?: () => void;
}

export default function CreateCourseModal({ onCreated }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    type: CourseType.FULLSTACK,
    level: CourseLevel.ENTRY_LEVEL,
    initWeeks: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setOpen(false);
    onCreated?.();
  };

  return (
    <div>
      <button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded">
        Nuevo Curso
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded space-y-2 w-80">
            <h2 className="text-lg font-semibold">Crear Curso</h2>
            <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} className="w-full border p-1" />
            <input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} className="w-full border p-1" />
            <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} className="w-full border p-1" />
            <select name="type" value={form.type} onChange={handleChange} className="w-full border p-1">
              {Object.values(CourseType).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <select name="level" value={form.level} onChange={handleChange} className="w-full border p-1">
              {Object.values(CourseLevel).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <label className="flex items-center space-x-2 text-sm">
              <input type="checkbox" name="initWeeks" checked={form.initWeeks} onChange={handleChange} />
              <span>Generar semanas 0..10</span>
            </label>
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => setOpen(false)} className="px-2 py-1 border rounded">
                Cancelar
              </button>
              <button type="submit" className="px-2 py-1 bg-blue-600 text-white rounded">
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
