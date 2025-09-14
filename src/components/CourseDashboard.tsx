'use client';

import { useState } from 'react';

export default function CourseDashboard() {
  const [show, setShow] = useState(false);

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-xl font-semibold">Dashboard</h1>
      <button
        className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-900"
        onClick={() => setShow(!show)}
      >
        Toggle
      </button>
      {show && <div className="mt-4">Content</div>}
    </div>
  );
}
