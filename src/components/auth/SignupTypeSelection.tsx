import { Button } from "@/components/ui/button";
import { Building2, Users } from "lucide-react";
import logoSrc from "/full_logo.png";

/* ── Inline Logo ─────────────────────────────────────── */
function Logo() {
  return (
    <div className="flex flex-col items-center mx-auto mb-6">
      <img
        src={logoSrc}
        alt="IBAL Logo"
        className="h-28 w-auto object-contain"
      />
    </div>
  );
}

interface SignupTypeSelectionProps {
  onSelectType: (type: "organization" | "family") => void;
  onBack: () => void;
}

export default function SignupTypeSelection({
  onSelectType,
  onBack,
}: SignupTypeSelectionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECCAE8] p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <Logo />
            <h1 className="text-3xl md:text-4xl font-bold text-[#6D28D9] mb-3">
              اختر نوع حسابك
            </h1>
            <p className="text-gray-600">
              اختر ما إذا كنت ستدير مدرسة أو فصل دراسي أم حساب عائلي
            </p>
          </div>

          {/* Account Type Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Organization Account Card */}
            <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-[#83458E] transition-all hover:shadow-lg cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#83458E] to-[#EC4899] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#6D28D9] mb-3">
                  حساب المؤسسة
                </h2>
                <p className="text-gray-600 mb-6">
                  إدارة الطلاب والألعاب التعليمية والاشتراكات
                </p>
                <ul className="text-right w-full space-y-2 mb-6 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#83458E] rounded-full"></span>
                    <span>إضافة وإدارة الطلاب</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#83458E] rounded-full"></span>
                    <span>التحكم في الألعاب المتاحة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#83458E] rounded-full"></span>
                    <span>تقارير وإحصائيات متقدمة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#83458E] rounded-full"></span>
                    <span>إدارة السنوات الدراسية</span>
                  </li>
                </ul>
                <Button
                  onClick={() => onSelectType("organization")}
                  className="w-full bg-[#83458E] hover:bg-[#7C3AED] text-white"
                >
                  اختر هذا الخيار
                </Button>
              </div>
            </div>

            {/* Family Account Card */}
            <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-[#F59E0B] transition-all hover:shadow-lg cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#83458E] to-[#F59E0B] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#6D28D9] mb-3">
                  حساب العائلة
                </h2>
                <p className="text-gray-600 mb-6">
                  إدارة تعلم أطفالك من حساب واحد
                </p>
                <ul className="text-right w-full space-y-2 mb-6 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full"></span>
                    <span>إضافة ملفات متعددة للأطفال</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full"></span>
                    <span>متابعة التقدم التعليمي</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full"></span>
                    <span>تقارير وإحصائيات مفصلة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full"></span>
                    <span>التحكم في أوقات اللعب</span>
                  </li>
                </ul>
                <Button
                  onClick={() => onSelectType("family")}
                  className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white"
                >
                  اختر هذا الخيار
                </Button>
              </div>
            </div>
          </div>

          {/* Back to Login */}
          <div className="text-center">
            <button
              onClick={onBack}
              className="text-sm text-gray-600 hover:text-[#83458E] hover:underline"
            >
              العودة إلى تسجيل الدخول
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
