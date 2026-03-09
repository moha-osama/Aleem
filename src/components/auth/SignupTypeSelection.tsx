import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Building2,
  ChevronLeft,
  Gamepad2,
  GraduationCap,
  BarChart3,
  Users,
  Star,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import logoSrc from "/full_logo.png";

/* ── Mockup data ──────────────────────────────────────── */
const mockStats = [
  {
    label: "الطلاب",
    value: "248",
    icon: GraduationCap,
    color: "bg-purple-100 text-purple-600",
  },
  {
    label: "المعلمون",
    value: "18",
    icon: Users,
    color: "bg-pink-100 text-pink-600",
  },
  {
    label: "الألعاب",
    value: "34",
    icon: Gamepad2,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    label: "الدروس",
    value: "120",
    icon: BookOpen,
    color: "bg-amber-100 text-amber-600",
  },
];

const mockStudents = [
  { name: "أحمد محمد", grade: "الصف الخامس", score: 92, avatar: "أ" },
  { name: "سارة علي", grade: "الصف الرابع", score: 87, avatar: "س" },
  { name: "يوسف خالد", grade: "الصف السادس", score: 95, avatar: "ي" },
];

const mockGames = [
  { name: "الرياضيات المرحة", subject: "رياضيات", players: 42, rating: 4.8 },
  { name: "قصص عربية", subject: "لغة عربية", players: 38, rating: 4.6 },
  { name: "علوم الطبيعة", subject: "علوم", players: 29, rating: 4.9 },
];

const features = [
  { text: "إضافة وإدارة الطلاب والمعلمين", icon: Users },
  { text: "مكتبة ألعاب تعليمية تفاعلية", icon: Gamepad2 },
  { text: "تقارير أداء وإحصائيات تفصيلية", icon: BarChart3 },
  { text: "إدارة المراحل والسنوات الدراسية", icon: GraduationCap },
  { text: "لوحة تحكم مرنة وسهلة الاستخدام", icon: TrendingUp },
];

/* ── Dashboard Mockup ─────────────────────────────────── */
function DashboardMockup() {
  return (
    <div
      className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden text-sm shadow-inner"
      dir="rtl"
    >
      {/* Top bar */}
      <div className="bg-[#83458E] px-4 py-2 flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="text-white/70 text-xs mr-2">
          لوحة التحكم — مدرسة النور
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-2">
          {mockStats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-lg p-2.5 border border-gray-100 text-center"
            >
              <div
                className={`w-7 h-7 rounded-lg ${s.color} flex items-center justify-center mx-auto mb-1`}
              >
                <s.icon className="w-3.5 h-3.5" />
              </div>
              <p className="font-bold text-gray-800 text-base leading-none">
                {s.value}
              </p>
              <p className="text-gray-400 text-[10px] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Students mini table */}
        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
            <span className="font-semibold text-gray-700 text-xs">
              أحدث الطلاب
            </span>
            <span className="text-[#83458E] text-[10px] cursor-pointer">
              عرض الكل
            </span>
          </div>
          {mockStudents.map((st) => (
            <div
              key={st.name}
              className="px-3 py-2 flex items-center gap-2 border-b border-gray-50 last:border-0"
            >
              <div className="w-6 h-6 rounded-full bg-linear-to-br from-[#83458E] to-[#EC4899] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                {st.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-[11px] truncate">
                  {st.name}
                </p>
                <p className="text-gray-400 text-[10px]">{st.grade}</p>
              </div>
              <div className="flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded">
                <TrendingUp className="w-2.5 h-2.5 text-green-500" />
                <span className="text-green-600 text-[10px] font-semibold">
                  {st.score}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Games mini list */}
        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-100">
            <span className="font-semibold text-gray-700 text-xs">
              الألعاب الأكثر استخداماً
            </span>
          </div>
          {mockGames.map((g) => (
            <div
              key={g.name}
              className="px-3 py-2 flex items-center gap-2 border-b border-gray-50 last:border-0"
            >
              <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                <Gamepad2 className="w-3 h-3 text-indigo-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-[11px] truncate">
                  {g.name}
                </p>
                <p className="text-gray-400 text-[10px]">
                  {g.subject} · {g.players} لاعب
                </p>
              </div>
              <div className="flex items-center gap-0.5">
                <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                <span className="text-[10px] font-semibold text-gray-600">
                  {g.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
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
    <div
      className="min-h-screen flex items-center justify-center bg-[#ECCAE8] p-4"
      dir="rtl"
    >
      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* ── Left panel: info + CTA ─────────────────── */}
            <div className="p-8 md:p-12 flex flex-col justify-between">
              {/* Logo */}
              <div>
                <img
                  src={logoSrc}
                  alt="IBAL Logo"
                  className="h-20 w-auto object-contain mb-8"
                />

                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                  <Building2 className="w-3.5 h-3.5" />
                  حساب المؤسسة التعليمية
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-4">
                  أدِر مدرستك بالكامل
                  <span className="block text-[#83458E]">من مكان واحد</span>
                </h1>

                <p className="text-gray-500 text-base leading-relaxed mb-8">
                  منصة متكاملة لإدارة الطلاب، المعلمين، الألعاب التعليمية
                  والاشتراكات — مصممة خصيصاً للمؤسسات والمدارس.
                </p>

                {/* Features list */}
                <ul className="space-y-3 mb-10">
                  {features.map((f) => (
                    <li key={f.text} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                        <f.icon className="w-4 h-4 text-[#83458E]" />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">
                        {f.text}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-auto shrink-0" />
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="space-y-3">
                <Button
                  onClick={() => onSelectType("organization")}
                  className="w-full bg-[#83458E] hover:bg-[#6D28D9] text-white py-6 text-base font-semibold rounded-xl shadow-lg shadow-purple-200 transition-all hover:shadow-purple-300"
                >
                  إنشاء حساب المؤسسة مجاناً
                </Button>
                <button
                  onClick={onBack}
                  className="w-full flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-[#83458E] transition-colors py-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  العودة إلى تسجيل الدخول
                </button>
              </div>
            </div>

            {/* ── Right panel: dashboard mockup ─────────── */}
            <div className="bg-linear-to-br from-[#83458E] via-[#9D46A0] to-[#6D28D9] p-8 md:p-10 flex flex-col justify-center">
              <div className="mb-5">
                <h2 className="text-white font-bold text-lg mb-1">
                  معاينة لوحة التحكم
                </h2>
                {/* <p className="text-purple-200 text-xs">
                  هذا ما ستجده بعد تسجيل مؤسستك
                </p> */}
              </div>
              <DashboardMockup />

              {/* Floating trust badge */}
              <div className="mt-5 flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    تقييم 4.9 / 5 من المدارس
                  </p>
                  <p className="text-purple-200 text-xs">
                    +200 مدرسة تثق في منصتنا
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
