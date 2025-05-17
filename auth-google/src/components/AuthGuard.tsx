'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingState from './LoadingState';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [status, router]);
  
  if (status === 'loading') {
    return <LoadingState message="Checking authentication..." />;
  }
  
  if (status === 'authenticated') {
    return <>{children}</>;
  }
  
  return null;
}
