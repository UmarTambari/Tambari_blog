"use client";

import { logout } from "@/app/actions/auth";
import { LogOut, User } from "lucide-react";
import { useState } from "react";

export default function AdminHeader({ userEmail }: { userEmail: string }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Page title will be added by individual pages */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome back!
          </h2>
          <p className="text-sm text-gray-500">
            Manage your blog content
          </p>
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-gray-700">{userEmail}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <>
              {/* Backdrop to close dropdown when clicking outside */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs text-gray-500">Signed in as</p>
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {userEmail}
                  </p>
                </div>

                <form action={logout}>
                  <button
                    type="submit"
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}