// components/UserProfile.tsx

import Image from "next/image";
import Link from "next/link";

interface UserProfileProps {
  user: {
    name?: string;
    email: string;
    image?: string;
  };
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="bg-white shadow overflow-hidden rounded-lg mb-12">
      <div className="px-4 py-5 sm:px-6 flex justify-between">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Your personal account information
          </p>
        </div>
        <Link 
          href="/api/auth/signout" 
          className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors"
        >
          Sign Out
        </Link>
      </div>
      <div className="border-t border-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            {user.image ? (
              <div className="flex-shrink-0 h-12 w-12 relative rounded-full overflow-hidden">
                <Image 
                  src={user.image} 
                  alt={user.name || "User avatar"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-gray-400"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              </div>
            )}
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">
                {user.name || "User"}
              </h4>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
