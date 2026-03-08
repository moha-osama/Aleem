import { useMe } from "@/features/auth";
import {
  ProfileCard,
  ChangePasswordCard,
} from "@/components/shared/ProfileCard";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudentProfileProps {
  onLogout: () => void;
  isLogoutPending?: boolean;
}

export default function StudentProfile({
  onLogout,
  isLogoutPending = false,
}: StudentProfileProps) {
  const meQuery = useMe();
  const user = meQuery.data;

  const displayName =
    `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() ||
    user?.username ||
    "الطالب";

  return (
    <div className="space-y-6" dir="rtl">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center shrink-0">
            <span className="text-3xl font-bold text-white">
              {displayName.charAt(0)}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
            {user?.email && (
              <p className="text-gray-500 text-sm mt-0.5" dir="ltr">
                {user.email}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Settings cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ProfileCard />
        <ChangePasswordCard />
      </div>

      {/* Logout */}
      <div className="flex justify-end">
        <Button
          onClick={onLogout}
          disabled={isLogoutPending}
          variant="outline"
          className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
        >
          <LogOut className="w-4 h-4" />
          {isLogoutPending ? "جاري تسجيل الخروج..." : "تسجيل الخروج"}
        </Button>
      </div>
    </div>
  );
}
