// src/components/CreateChapterModal.tsx
'use client';
import { useState } from 'react';

interface Props {
  courseId: number;
  nextWeekNumber?: number;
  onCreated?: () => void;
}

export default function CreateChapterModal({ courseId, nextWeekNumber = 0, onCreated }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ weekNumber: nextWeekNumber, title: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/admin/courses/${courseId}/chapters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setOpen(false);
    onCreated?.();
  };

  return (
    <div className="mb-4">
      <button onClick={() => setOpen(true)} className="px-2 py-1 text-sm bg-blue-600 text-white rounded">
        Nuevo Capítulo
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded space-y-2 w-64">
            <h2 className="font-semibold">Crear Capítulo</h2>
            <input
              name="weekNumber"
              type="number"
              value={form.weekNumber}
              onChange={handleChange}
              className="w-full border p-1"
            />
            <input
              name="title"
              placeholder="Título"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-1"
            />
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
