import type { UserRole } from "@/features/auth";

export interface SubscriptionPlan {
  name: string;
  price: string;
  count: number;
  popular?: boolean;
  features: string[];
  color: string;
}

export interface DashboardConfig {
  dashboardTitle: string;
  headerRoleLabel: string;
  defaultAccountName: string;
  overviewTitle: string;
  overviewSubtitle: string;
  summaryTitle: string;
  weeklyReportText: (hours: number, achievements: number) => string;
  membersPageSubtitle: string;
  addMemberLabel: string;
  gamesSubtitle: string;
  reportsSubtitle: string;
  reportsPersonPlaceholder: string;
  currentPlanName: string;
  subscriptionPlans: SubscriptionPlan[];
}

export function getDashboardConfig(role: UserRole | null): DashboardConfig {
  const isTeacher = role === "teacher";
  return {
    dashboardTitle: isTeacher ? "لوحة تحكم المعلم" : "لوحة تحكم العائلة",
    headerRoleLabel: isTeacher ? "المعلم" : "ولي الأمر",
    defaultAccountName: isTeacher ? "المعلم" : "العائلة",
    overviewTitle: isTeacher ? "نظرة عامة على الفصل" : "نظرة عامة على العائلة",
    overviewSubtitle: isTeacher
      ? "متابعة التقدم التعليمي لجميع طلاب الفصل"
      : "متابعة التقدم التعليمي لجميع أفراد العائلة",
    summaryTitle: isTeacher ? "ملخص نشاط طلاب الفصل" : "ملخص نشاط الطلاب",
    weeklyReportText: (hours, achievements) =>
      isTeacher
        ? `أحسنتم! هذا الأسبوع، أكمل طلاب الفصل ${hours} ساعة من الألعاب التعليمية وحققوا ${achievements} إنجازًا جديدًا.`
        : `أحسنتم! هذا الأسبوع، أكمل أطفالكم ${hours} ساعة من الألعاب التعليمية وحققوا ${achievements} إنجازًا جديدًا.`,
    membersPageSubtitle: isTeacher
      ? "إدارة ملفات طلاب الفصل ومتابعة تقدمهم"
      : "إدارة ملفات أطفالك ومتابعة تقدمهم",
    addMemberLabel: isTeacher ? "إضافة طالب جديد" : "إضافة طفل جديد",
    gamesSubtitle: isTeacher
      ? "الألعاب المتاحة لفصلك من نفس المدرسة"
      : "الألعاب المتاحة لعائلتك من نفس المدرسة",
    reportsSubtitle: isTeacher
      ? "متابعة تفصيلية لتقدم كل طالب في المهارات المختلفة"
      : "متابعة تفصيلية لتقدم كل طفل في المهارات المختلفة",
    reportsPersonPlaceholder: isTeacher ? "اختر الطالب" : "اختر الطفل",
    currentPlanName: isTeacher ? "المعلم الذهبي" : "العائلة الذهبية",
    subscriptionPlans: isTeacher
      ? [
          {
            name: "المعلم الأساسي",
            price: "49",
            count: 15,
            features: [
              "حتى 15 طالب",
              "الألعاب الأساسية",
              "تقارير شهرية",
              "دعم عبر البريد",
            ],
            color: "from-[#8B5CF6] to-[#EC4899]",
          },
          {
            name: "المعلم الذهبي",
            price: "99",
            count: 30,
            popular: true,
            features: [
              "حتى 30 طالب",
              "جميع الألعاب",
              "تقارير أسبوعية",
              "دعم على مدار الساعة",
              "محتوى حصري",
            ],
            color: "from-[#F59E0B] to-[#EC4899]",
          },
          {
            name: "المعلم البلاتيني",
            price: "149",
            count: 60,
            features: [
              "حتى 60 طالب",
              "جميع الألعاب والمميزات",
              "تقارير يومية مفصلة",
              "دعم VIP",
              "محتوى حصري",
              "جلسات استشارية",
            ],
            color: "from-[#8B5CF6] to-[#F59E0B]",
          },
        ]
      : [
          {
            name: "العائلة الأساسية",
            price: "49",
            count: 2,
            features: [
              "حتى 2 أطفال",
              "الألعاب الأساسية",
              "تقارير شهرية",
              "دعم عبر البريد",
            ],
            color: "from-[#8B5CF6] to-[#EC4899]",
          },
          {
            name: "العائلة الذهبية",
            price: "99",
            count: 5,
            popular: true,
            features: [
              "حتى 5 أطفال",
              "جميع الألعاب",
              "تقارير أسبوعية",
              "دعم على مدار الساعة",
              "محتوى حصري",
            ],
            color: "from-[#F59E0B] to-[#EC4899]",
          },
          {
            name: "العائلة البلاتينية",
            price: "149",
            count: 10,
            features: [
              "حتى 10 أطفال",
              "جميع الألعاب والمميزات",
              "تقارير يومية مفصلة",
              "دعم VIP",
              "محتوى حصري",
              "جلسات استشارية",
            ],
            color: "from-[#8B5CF6] to-[#F59E0B]",
          },
        ],
  };
}
