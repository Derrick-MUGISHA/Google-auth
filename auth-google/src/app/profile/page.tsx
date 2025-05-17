// app/profile/page.tsx
import { getUserSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function Profile() {
  const user = await getUserSession();
  
  // Redirect to login if not authenticated
  if (!user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-2">Manage your personal information and account settings</p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-16 sm:px-10 relative">
          <div className="absolute left-6 sm:left-10 bottom-0 transform translate-y-1/2">
            {user.image ? (
              <Image 
                src={user.image} 
                alt={user.name || "Profile"} 
                className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-blue-300 flex items-center justify-center border-4 border-white shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-16 pb-8 px-6 sm:px-10">
          <h2 className="text-2xl font-bold text-gray-900">{user.name || "User"}</h2>
          <p className="text-gray-500">{user.email}</p>
          
          <div className="mt-8 space-y-8">
            {/* Personal Information */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700">
                      {user.name || "Not provided"}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700">
                      {user.email}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  This information is synced with your Google account.
                </p>
              </div>
            </section>
            
            {/* Account Information */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account ID</label>
                  <div className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 font-mono text-sm">
                    {"Not available"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Authentication Provider</label>
                  <div className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700">
                    Google
                  </div>
                </div>
              </div>
            </section>
            
            {/* Raw Profile Data */}
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Raw Profile Data</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="overflow-auto max-h-60 bg-gray-100 p-4 rounded text-xs font-mono">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>
            </section>
          </div>
          
          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link 
              href="/dashboard" 
              className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back to Dashboard
            </Link>
            <Link
              href="/api/auth/signout"
              className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
