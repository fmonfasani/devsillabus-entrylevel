// src/components/EmptyState.tsx
import React from 'react';

interface Props {
  message: string;
}

export default function EmptyState({ message }: Props) {
  return (
    <p className="text-sm text-gray-500" role="status">
      {message}
    </p>
  );
}
