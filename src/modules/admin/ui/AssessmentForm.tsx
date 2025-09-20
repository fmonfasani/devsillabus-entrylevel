// src/modules/admin/ui/AssessmentForm.tsx
'use client';

import { useState } from 'react';
import { AssessmentType } from '@prisma/client';
import { useToast } from './Toast';

interface Props {
  chapterId: number;
  onCreated?: (assessment: any) => void;
}

export default function AssessmentForm({ chapterId, onCreated }: Props) {
  const [type, setType] = useState<AssessmentType>(AssessmentType.QUIZ);
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [questions, setQuestions] = useState('');
  const [passingScore, setPassingScore] = useState(70);
  const [maxAttempts, setMaxAttempts] = useState(1);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(0);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload: any = {
      type,
      title,
      passingScore,
      maxAttempts,
      timeLimitMinutes,
    };
    if (type === AssessmentType.QUIZ) {
      try {
        payload.questions = JSON.parse(questions || '[]');
      } catch {
        addToast('JSON inválido', 'error');
        setLoading(false);
        return;
      }
    } else {
      payload.instructions = instructions;
    }
    const res = await fetch(`/api/admin/chapters/${chapterId}/assessments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (res.status === 201) {
      const data = await res.json();
      addToast('Evaluación agregada');
      onCreated?.(data);
      setTitle('');
      setInstructions('');
      setQuestions('');
    } else {
      addToast('Error al agregar evaluación', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2" aria-label="Formulario evaluación">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="ass-type">
          Tipo
        </label>
        <select
          id="ass-type"
          value={type}
          onChange={(e) => setType(e.target.value as AssessmentType)}
          className="w-full border rounded p-2"
        >
          {Object.values(AssessmentType).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="ass-title">
          Título
        </label>
        <input
          id="ass-title"
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      {type === AssessmentType.QUIZ ? (
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="ass-questions">
            Preguntas (JSON)
          </label>
          <textarea
            id="ass-questions"
            className="w-full border rounded p-2"
            rows={4}
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="ass-instructions">
            Instrucciones
          </label>
          <textarea
            id="ass-instructions"
            className="w-full border rounded p-2"
            rows={4}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="ass-score">
            Puntuación mínima
          </label>
          <input
            id="ass-score"
            type="number"
            className="w-full border rounded p-2"
            value={passingScore}
            onChange={(e) => setPassingScore(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="ass-attempts">
            Máx. intentos
          </label>
          <input
            id="ass-attempts"
            type="number"
            className="w-full border rounded p-2"
            value={maxAttempts}
            onChange={(e) => setMaxAttempts(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="ass-time">
            Tiempo límite (min)
          </label>
          <input
            id="ass-time"
            type="number"
            className="w-full border rounded p-2"
            value={timeLimitMinutes}
            onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Guardando...' : 'Guardar Evaluación'}
      </button>
    </form>
  );
}
