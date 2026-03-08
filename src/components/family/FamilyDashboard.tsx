import React from "react";
import FamilySidebar from "./FamilySidebar";
import DashboardLayout from "@/components/shared/DashboardLayout";
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
    <DashboardLayout
      headerTitle={userData.name}
      headerSubtitle={`${config.headerRoleLabel}: ${userData.parentName}`}
      showLogo
      sidebar={({ isOpen, onClose }) => (
        <FamilySidebar
          onLogout={onLogout}
          familyName={userData.name}
          isLogoutPending={isLogoutPending}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    />
  );
}
