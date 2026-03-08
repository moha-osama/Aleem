import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Gamepad2,
  FileText,
  CreditCard,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { useAuth } from "@/features/auth";
import { getDashboardConfig } from "./dashboardConfig";

interface FamilySidebarProps {
  onLogout: () => void;
  familyName: string;
  isLogoutPending?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function FamilySidebar({
  onLogout,
  familyName,
  isLogoutPending = false,
  isOpen,
  onClose,
}: FamilySidebarProps) {
  const { role } = useAuth();
  const config = getDashboardConfig(role);

  const menuItems = [
    {
      to: "/dashboard/home/overview",
      label: config.dashboardTitle,
      icon: Home,
    },
    { to: "/dashboard/home/children", label: "ملفات الطلاب", icon: Users },
    { to: "/dashboard/home/games", label: "مكتبة الألعاب", icon: Gamepad2 },
    {
      to: "/dashboard/home/reports",
      label: "التقارير والإحصائيات",
      icon: FileText,
    },
    {
      to: "/dashboard/home/subscription",
      label: "الاشتراك",
      icon: CreditCard,
    },
    { to: "/dashboard/home/settings", label: "الإعدادات", icon: Settings },
  ];

  return (
    <>
      {/* Backdrop – mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-screen w-64 bg-white border-l border-gray-200 flex flex-col z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Close button – mobile only */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 left-4 p-1 rounded-md text-gray-500 hover:bg-gray-100"
          aria-label="إغلاق القائمة"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-center">
            <img src="/logo.jpg" alt="Logo" className="w-32 h-auto" />
          </div>
          <p className="text-center text-sm text-gray-600 mt-2 font-medium">
            {familyName}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={onClose}
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
    </>
  );
}
