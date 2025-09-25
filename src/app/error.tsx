'use client';
import { Button } from '@/components/ui/button';
import { AlertTriangleIcon } from 'lucide-react';
import Link from 'next/link';
import React, { memo } from 'react';

const Error = memo(
  ({
    error,
    reset
  }: {
    error: Error & { digest: string };
    reset: () => void;
  }) => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-rose-100 p-3 rounded-full">
              <AlertTriangleIcon className="size-10 text-red-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-medium text-gray-900">
              Oops! Something went wrong.
            </h2>
            <p>{error.message}</p>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <Button onClick={reset} className="font-me px-6">
              刷 新
            </Button>
            <Button className="font-medium" variant="ghost" asChild>
              <Link href="/">返 回</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

export default Error;
