import {
  ProfileCard,
  ChangePasswordCard,
} from "@/components/shared/ProfileCard";

export default function OrganizationSettings() {
  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">الإعدادات</h1>
        <p className="text-gray-600 mt-1">إدارة معلومات حسابك وكلمة المرور</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ProfileCard />
        <ChangePasswordCard />
      </div>
    </div>
  );
}
