import { useAuth } from "@/features/auth";

export default function AuthenticatedProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-2xl mx-auto bg-white rounded-xl border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">الملف الشخصي</h1>
        <p className="text-gray-600 mb-6">
          بيانات المستخدم من نقطة النهاية /api/auth/me/
        </p>
        <div className="space-y-3 text-sm">
          <p>
            <span className="font-semibold">المعرف:</span> {user.id}
          </p>
          <p>
            <span className="font-semibold">اسم المستخدم:</span> {user.username}
          </p>
          <p>
            <span className="font-semibold">الاسم:</span> {user.first_name}{" "}
            {user.last_name}
          </p>
          <p>
            <span className="font-semibold">البريد الإلكتروني:</span>{" "}
            {user.email}
          </p>
          <p>
            <span className="font-semibold">الدور:</span> {user.role}
          </p>
        </div>
      </div>
    </div>
  );
}
