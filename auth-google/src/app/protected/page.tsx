// app/protected/page.tsx

import AuthGuard from "@/components/AuthGuard";

// import AuthGuard from '@/components/AuthGuard';

export default function ProtectedPage() {
  return (
    <AuthGuard>
      <div className="p-4">
        <h1>Protected Content</h1>
        <p>This page is only visible to authenticated users.</p>
      </div>
    </AuthGuard>
  );
}
