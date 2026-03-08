import React from "react";
import { Outlet } from "react-router-dom";
import OrganizationSidebar from "./OrganizationSidebar";

interface OrganizationDashboardProps {
  userData: {
    name: string;
  };
  onLogout: () => void;
  isLogoutPending?: boolean;
}

export default function OrganizationDashboard({
  userData,
  onLogout,
  isLogoutPending = false,
}: OrganizationDashboardProps) {
  return (
    <div className="flex min-h-screen bg-gray-50" dir="rtl">
      <OrganizationSidebar
        onLogout={onLogout}
        organizationName={userData.name}
        isLogoutPending={isLogoutPending}
      />

      <div className="flex-1 mr-64">
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* <img src="/logo.jpg" alt="Logo" className="h-10 w-auto" /> */}
              <div>
                <h2 className="font-bold text-gray-900">{userData.name}</h2>
                <p className="text-sm text-gray-500">
                  آخر تسجيل دخول: اليوم 10:30 صباحاً
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
