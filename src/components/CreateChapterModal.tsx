'use client';
import React, { useState, useEffect } from 'react';

interface CreateChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (chapterData: any) => void;
  courseId: number;
  maxWeekNumber: number;
  editingChapter?: any;
}

const CreateChapterModal: React.FC<CreateChapterModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  courseId,
  maxWeekNumber,
  editingChapter
}) => {
  const [formData, setFormData] = useState({
    weekNumber: maxWeekNumber + 1,
    title: '',
    description: '',
    theoreticalContent: '',
    practicalRequirements: '',
    minScoreTheory: 80,
    minScorePractice: 80,
    unlockDate: '',
    isPublished: false
  });

  useEffect(() => {
    if (editingChapter) {
      setFormData({
        weekNumber: editingChapter.weekNumber || maxWeekNumber + 1,
        title: editingChapter.title || '',
        description: editingChapter.description || '',
        theoreticalContent: editingChapter.theoreticalContent || '',
        practicalRequirements: editingChapter.practicalRequirements || '',
        minScoreTheory: editingChapter.minScoreTheory || 80,
        minScorePractice: editingChapter.minScorePractice || 80,
        unlockDate: editingChapter.unlockDate ? editingChapter.unlockDate.split('T')[0] : '',
        isPublished: editingChapter.isPublished ?? false
      });
    } else {
      setFormData({
        weekNumber: maxWeekNumber + 1,
        title: '',
        description: '',
        theoreticalContent: '',
        practicalRequirements: '',
        minScoreTheory: 80,
        minScorePractice: 80,
        unlockDate: '',
        isPublished: false
      });
    }
  }, [editingChapter, isOpen, maxWeekNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {editingChapter ? 'Editar Capítulo' : 'Crear Nuevo Capítulo'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de Semana *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.weekNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, weekNumber: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Desbloqueo
              </label>
              <input
                type="datetime-local"
                value={formData.unlockDate}
                onChange={(e) => setFormData(prev => ({ ...prev, unlockDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título del Capítulo *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value } ))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Fundamentos + Docker 101"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Descripción breve del capítulo..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contenido Teórico
            </label>
            <textarea
              value={formData.theoreticalContent}
              onChange={(e) => setFormData(prev => ({ ...prev, theoreticalContent: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Material teórico, enlaces a recursos, videos..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Requisitos Prácticos
            </label>
            <textarea
              value={formData.practicalRequirements}
              onChange={(e) => setFormData(prev => ({ ...prev, practicalRequirements: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Labs, proyectos, ejercicios prácticos..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Puntaje Mínimo Teoría *
              </label>
              <input
                type="number"
                required
                min="0"
                max="100"
                value={formData.minScoreTheory}
                onChange={(e) => setFormData(prev => ({ ...prev, minScoreTheory: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Puntaje Mínimo Práctica *
              </label>
              <input
                type="number"
                required
                min="0"
                max="100"
                value={formData.minScorePractice}
                onChange={(e) => setFormData(prev => ({ ...prev, minScorePractice: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublished"
              checked={formData.isPublished}
              onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isPublished" className="ml-2 text-sm text-gray-700">
              Capítulo publicado
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={[
                'flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700',
                'flex items-center justify-center gap-2'
              ].join(' ')}
            >
              💾
              {editingChapter ? 'Actualizar' : 'Crear'} Capítulo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChapterModal;

