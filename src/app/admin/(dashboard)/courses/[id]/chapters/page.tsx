// app/admin/(dashboard)/courses/[id]/chapters/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { AssessmentType, ResourceType } from '@prisma/client';
import ResourceForm from '@/modules/admin/ui/ResourceForm';
import AssessmentForm from '@/modules/admin/ui/AssessmentForm';
import { ToastProvider, useToast } from '@/modules/admin/ui/Toast';
import EmptyState from '@/components/EmptyState';

interface PageProps {
  params: { id: string };
}

interface Resource {
  id: number;
  type: ResourceType;
  title: string;
  url?: string;
  content?: string;
  isRequired: boolean;
  orderIndex: number;
}

interface Assessment {
  id: number;
  type: AssessmentType;
  title: string;
  questions?: any[];
  instructions?: string;
}

interface Chapter {
  id: number;
  title: string;
  weekNumber: number;
  resources: Resource[];
  assessments: Assessment[];
}

export default function ChaptersPage({ params }: PageProps) {
  return (
    <ToastProvider>
      <ChaptersContent courseId={Number(params.id)} />
    </ToastProvider>
  );
}

function ChaptersContent({ courseId }: { courseId: number }) {
  const { addToast } = useToast();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedId, setSelectedId] = useState<number | ''>('');
  const [tab, setTab] = useState<'resources' | 'assessments'>('resources');
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    fetch(`/api/courses/${courseId}/chapters`).then(async (res) => {
      if (res.status === 403) {
        setForbidden(true);
        return;
      }
      if (res.ok) {
        const data: Chapter[] = await res.json();
        setChapters(data);
      }
    });
  }, [courseId]);

  const selected =
    chapters.find((c) => c.id === selectedId) || (chapters.length ? chapters[0] : undefined);

  useEffect(() => {
    if (!selectedId && chapters.length) setSelectedId(chapters[0].id);
  }, [chapters, selectedId]);

  const handleResourceCreated = (res: any) => {
    setChapters((prev) =>
      prev.map((ch) =>
        ch.id === selected?.id ? { ...ch, resources: [...ch.resources, res] } : ch
      )
    );
    addToast('Recurso agregado');
  };

  const handleAssessmentCreated = (ass: any) => {
    setChapters((prev) =>
      prev.map((ch) =>
        ch.id === selected?.id ? { ...ch, assessments: [...ch.assessments, ass] } : ch
      )
    );
    addToast('Evaluación agregada');
  };

  if (forbidden) return <p className="p-6">Solo ADMIN</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-2">Capítulos</h1>
      {chapters.length === 0 ? (
        <EmptyState message="Sin capítulos" />
      ) : (
        <div className="space-y-4">
          <select
            className="border rounded p-2"
            value={selected?.id ?? ''}
            onChange={(e) => setSelectedId(Number(e.target.value))}
            aria-label="Seleccionar capítulo"
          >
            {chapters.map((ch) => (
              <option key={ch.id} value={ch.id}>
                Semana {ch.weekNumber}: {ch.title}
              </option>
            ))}
          </select>

          <div>
            <div className="flex space-x-4 border-b mb-4">
              <button
                className={`pb-2 ${tab === 'resources' ? 'border-b-2 border-blue-600' : ''}`}
                onClick={() => setTab('resources')}
              >
                Recursos
              </button>
              <button
                className={`pb-2 ${tab === 'assessments' ? 'border-b-2 border-blue-600' : ''}`}
                onClick={() => setTab('assessments')}
              >
                Evaluaciones
              </button>
            </div>
            {tab === 'resources' ? (
              <div className="space-y-4">
                {selected?.resources
                  .sort((a, b) => a.orderIndex - b.orderIndex)
                  .map((r) => (
                    <div key={r.id} className="border rounded p-2">
                      <p className="font-semibold">{r.title}</p>
                      {r.type === ResourceType.VIDEO && r.url ? (
                        <iframe
                          src={r.url}
                          className="w-full aspect-video"
                          title={r.title}
                        />
                      ) : r.type === ResourceType.DOCUMENT && r.content ? (
                        <pre className="whitespace-pre-wrap bg-gray-100 p-2 overflow-x-auto">
                          {r.content}
                        </pre>
                      ) : r.url ? (
                        <a
                          href={r.url}
                          target="_blank"
                          className="text-blue-600 underline"
                        >
                          Ver recurso
                        </a>
                      ) : null}
                    </div>
                  ))}
                <ResourceForm
                  chapterId={selected!.id}
                  onCreated={handleResourceCreated}
                />
              </div>
            ) : (
              <div className="space-y-4">
                {selected?.assessments.map((a) => (
                  <div key={a.id} className="border rounded p-2">
                    <p className="font-semibold">{a.title}</p>
                    {a.type === AssessmentType.QUIZ ? (
                      <p>
                        {a.questions ? a.questions.length : 0} preguntas
                      </p>
                    ) : (
                      <p>{a.instructions}</p>
                    )}
                  </div>
                ))}
                <AssessmentForm
                  chapterId={selected!.id}
                  onCreated={handleAssessmentCreated}
                />
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
