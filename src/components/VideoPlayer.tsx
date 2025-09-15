// src/components/VideoPlayer.tsx
'use client';

interface Metadata {
  embedUrl?: string;
  isYouTube?: boolean;
}

interface Props {
  url: string;
  title?: string;
  metadata?: Metadata;
}

export default function VideoPlayer({ url, title, metadata }: Props) {
  const src = metadata?.isYouTube && metadata.embedUrl ? metadata.embedUrl : url;
  return (
    <div>
      <div className="relative pt-[56.25%]">
        <iframe
          src={src}
          className="absolute top-0 left-0 w-full h-full"
          allowFullScreen
        />
      </div>
      {title && <p className="mt-2 text-center text-sm">{title}</p>}
    </div>
  );
}
