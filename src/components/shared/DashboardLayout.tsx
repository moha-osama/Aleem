import { type ReactNode, useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

interface DashboardLayoutProps {
  sidebar: (props: { isOpen: boolean; onClose: () => void }) => ReactNode;
  headerTitle: string;
  headerSubtitle?: string;
  showLogo?: boolean;
}

export default function DashboardLayout({
  sidebar,
  headerTitle,
  headerSubtitle,
  showLogo = false,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50" dir="rtl">
      {sidebar({ isOpen: sidebarOpen, onClose: () => setSidebarOpen(false) })}

      <div className="flex-1 lg:mr-64 min-w-0">
        <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 sticky top-0 z-20">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
              aria-label="فتح القائمة"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4 pr-8 md:pr-0">
              {showLogo && (
                <img
                  src="/logo.jpg"
                  alt="Logo"
                  className="h-10 w-auto hidden sm:block"
                />
              )}
              <div>
                <h2 className="font-bold text-gray-900">{headerTitle}</h2>
                {headerSubtitle && (
                  <p className="text-sm text-gray-500">{headerSubtitle}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
