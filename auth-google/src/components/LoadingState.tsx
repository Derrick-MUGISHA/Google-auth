'use client';

import React from 'react';

export default function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-32 p-8">
      <div className="loading"></div>
      <p className="mt-3 text-gray-500">{message}</p>
    </div>
  );
}
