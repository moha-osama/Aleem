import React from "react";
import OrganizationSidebar from "./OrganizationSidebar";
import DashboardLayout from "@/components/shared/DashboardLayout";

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
    <DashboardLayout
      headerTitle={userData.name}
      headerSubtitle="آخر تسجيل دخول: اليوم 10:30 صباحاً"
      sidebar={({ isOpen, onClose }) => (
        <OrganizationSidebar
          onLogout={onLogout}
          organizationName={userData.name}
          isLogoutPending={isLogoutPending}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    />
  );
}
