import React from "react";
import { Users, Gamepad2, TrendingUp, Clock } from "lucide-react";
import { useSchoolUsers } from "@/features/auth";
import { useGames } from "@/features/games";

export default function DashboardOverview() {
  const { data: schoolUsers } = useSchoolUsers("student");
  const { data: gamesData } = useGames();

  const stats = [
    {
      title: "عدد الطلاب",
      value: (schoolUsers?.items.length ?? 0).toLocaleString(),
      icon: Users,
      trend: "+150 هذا الشهر",
      color: "from-[#8B5CF6] to-[#9F7AEA]",
    },
    {
      title: "الألعاب المتاحة",
      value: String(gamesData?.length ?? 0),
      icon: Gamepad2,
      trend: "+5 ألعاب جديدة",
      color: "from-[#EC4899] to-[#F472B6]",
    },
    {
      title: "معدل التفاعل",
      value: "72%",
      icon: TrendingUp,
      trend: "↑ 8% عن الشهر الماضي",
      color: "from-[#F59E0B] to-[#FBBF24]",
    },
    {
      title: "ساعات التعلم",
      value: "18,000",
      icon: Clock,
      trend: "إجمالي الساعات",
      color: "from-[#8B5CF6] to-[#6D28D9]",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">مرحباً بك في Aleem</h1>
        <p className="text-white/90">نظرة عامة على نشاط المؤسسة</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            {/* <p className="text-sm text-gray-500">{stat.trend}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
