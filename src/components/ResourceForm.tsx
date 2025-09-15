// src/components/ResourceForm.tsx
'use client';

import { useState } from 'react';
import { ResourceType } from '@prisma/client';
import { useToast } from './Toast';

interface Props {
  chapterId: number;
  onCreated?: (resource: any) => void;
}

export default function ResourceForm({ chapterId, onCreated }: Props) {
  const [type, setType] = useState<ResourceType>(ResourceType.VIDEO);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [isRequired, setIsRequired] = useState(true);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload: any = { type, title, isRequired };
    if (type === ResourceType.DOCUMENT) payload.content = content;
    else payload.url = url;

    const res = await fetch(`/api/admin/chapters/${chapterId}/resources`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (res.status === 201) {
      const data = await res.json();
      addToast('Recurso agregado');
      onCreated?.(data);
      setTitle('');
      setUrl('');
      setContent('');
    } else {
      addToast('Error al agregar recurso', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2" aria-label="Formulario recurso">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="res-type">
          Tipo
        </label>
        <select
          id="res-type"
          value={type}
          onChange={(e) => setType(e.target.value as ResourceType)}
          className="w-full border rounded p-2"
        >
          {Object.values(ResourceType).map((rt) => (
            <option key={rt} value={rt}>
              {rt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="res-title">
          Título
        </label>
        <input
          id="res-title"
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      {type === ResourceType.DOCUMENT ? (
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="res-content">
            Contenido
          </label>
          <textarea
            id="res-content"
            className="w-full border rounded p-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            required
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="res-url">
            URL
          </label>
          <input
            id="res-url"
            type="url"
            className="w-full border rounded p-2"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
      )}
      <div className="flex items-center space-x-2">
        <input
          id="res-required"
          type="checkbox"
          checked={isRequired}
          onChange={(e) => setIsRequired(e.target.checked)}
        />
        <label htmlFor="res-required" className="text-sm">
          Obligatorio
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Guardando...' : 'Guardar Recurso'}
      </button>
    </form>
  );
}
