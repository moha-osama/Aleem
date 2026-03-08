import React from "react";
import { Outlet } from "react-router-dom";
import FamilySidebar from "./FamilySidebar";
import { useAuth } from "@/features/auth";
import { getDashboardConfig } from "./dashboardConfig";

interface FamilyDashboardProps {
  userData: {
    name: string;
    parentName: string;
    email?: string;
  };
  onLogout: () => void;
  isLogoutPending?: boolean;
}

export default function FamilyDashboard({
  userData,
  onLogout,
  isLogoutPending = false,
}: FamilyDashboardProps) {
  const { role } = useAuth();
  const config = getDashboardConfig(role);

  return (
    <div className="flex min-h-screen bg-gray-50" dir="rtl">
      <FamilySidebar
        onLogout={onLogout}
        familyName={userData.name}
        isLogoutPending={isLogoutPending}
      />

      <div className="flex-1 mr-64">
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/logo.jpg" alt="Logo" className="h-10 w-auto" />
              <div>
                <h2 className="font-bold text-gray-900">{userData.name}</h2>
                <p className="text-sm text-gray-500">
                  {config.headerRoleLabel}: {userData.parentName}
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
