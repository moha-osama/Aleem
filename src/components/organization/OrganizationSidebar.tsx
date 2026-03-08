import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Gamepad2,
  Calendar,
  CreditCard,
  Settings,
  LogOut,
  FileQuestion,
} from "lucide-react";

interface OrganizationSidebarProps {
  onLogout: () => void;
  organizationName: string;
  isLogoutPending?: boolean;
}

export default function OrganizationSidebar({
  onLogout,
  organizationName,
  isLogoutPending = false,
}: OrganizationSidebarProps) {
  const menuItems = [
    {
      to: "/dashboard/organization/overview",
      label: "لوحة التحكم",
      icon: Home,
    },
    {
      to: "/dashboard/organization/manage-users/students",
      label: "إدارة الطلاب والمعلمين",
      icon: Users,
    },
    {
      to: "/dashboard/organization/games",
      label: "إدارة الألعاب",
      icon: Gamepad2,
    },
    {
      to: "/dashboard/organization/game-questions",
      label: "أسئلة الألعاب",
      icon: FileQuestion,
    },
    {
      to: "/dashboard/organization/study-years",
      label: "إدارة التعليم",
      icon: Calendar,
    },
    {
      to: "/dashboard/organization/billing",
      label: "الاشتراك والفواتير",
      icon: CreditCard,
    },
    {
      to: "/dashboard/organization/settings",
      label: "الإعدادات",
      icon: Settings,
    },
  ];

  return (
    <div className="fixed right-0 top-0 h-screen w-64 bg-white border-l border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-center">
          <img src="/logo.jpg" alt="Logo" className="w-32 h-auto" />
        </div>
        {/* <p className="text-center text-sm text-gray-600 mt-2 font-medium">
          {organizationName}
        </p> */}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-colors ${
                    isActive
                      ? "bg-[#8B5CF6] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          disabled={isLogoutPending}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>
            {isLogoutPending ? "جاري تسجيل الخروج..." : "تسجيل الخروج"}
          </span>
        </button>
      </div>
    </div>
  );
}
