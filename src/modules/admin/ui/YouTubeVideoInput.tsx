// src/modules/admin/ui/YouTubeVideoInput.tsx
'use client';

import { useEffect, useState } from 'react';
import { YouTubeService, YouTubeVideoInfo } from '@/lib/youtubeUtils';

interface Props {
  value: string;
  onChange: (url: string) => void;
  onValidation: (info: YouTubeVideoInfo | null, error: string | null) => void;
}

export default function YouTubeVideoInput({ value, onChange, onValidation }: Props) {
  const [info, setInfo] = useState<YouTubeVideoInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!value) {
        setInfo(null);
        setError(null);
        onValidation(null, null);
        return;
      }
      const data = await YouTubeService.getVideoInfo(value);
      if (!active) return;
      if (data) {
        setInfo(data);
        setError(null);
        onValidation(data, null);
      } else {
        const err = 'URL de YouTube no válida';
        setInfo(null);
        setError(err);
        onValidation(null, err);
      }
    })();
    return () => {
      active = false;
    };
  }, [value, onValidation]);

  return (
    <div>
      <input
        type="url"
        className="w-full border rounded p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://www.youtube.com/watch?v=..."
        required
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      {info && (
        <div className="mt-2 flex items-center space-x-2">
          <img
            src={info.thumbnail}
            alt="thumbnail"
            className="w-24 h-16 object-cover rounded"
          />
          <span className="text-sm">{info.videoId}</span>
        </div>
      )}
    </div>
  );
}
