import React from "react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/features/auth";
import { getDashboardConfig } from "./dashboardConfig";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Gamepad2, Trophy, Clock, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useParentChildren } from "@/features/parents";
import { useGames } from "@/features/games";

export default function FamilyOverview() {
  const { role } = useAuth();
  const config = getDashboardConfig(role);

  const { data: parentChildren } = useParentChildren();
  const { data: gamesData } = useGames();

  const familyStats = {
    totalChildren: parentChildren?.length ?? 0,
    activeGames: gamesData?.length ?? 0,
    totalAchievements: 45,
    weeklyHours: 8.5,
  };

  const children = [
    {
      id: "1",
      name: "أحمد",
      age: 8,
      progress: 75,
      gamesPlayed: 15,
      color: "from-[#8B5CF6] to-[#EC4899]",
    },
    {
      id: "2",
      name: "فاطمة",
      age: 10,
      progress: 85,
      gamesPlayed: 22,
      color: "from-[#EC4899] to-[#F59E0B]",
    },
    {
      id: "3",
      name: "محمد",
      age: 6,
      progress: 60,
      gamesPlayed: 8,
      color: "from-[#8B5CF6] to-[#F59E0B]",
    },
  ];

  const recentGames = [
    {
      id: "1",
      name: "لعبة الرياضيات المرحة",
      child: "أحمد",
      date: "اليوم",
      score: 95,
    },
    { id: "2", name: "تحدي القراءة", child: "فاطمة", date: "اليوم", score: 88 },
    { id: "3", name: "مغامرة الحروف", child: "محمد", date: "أمس", score: 92 },
  ];

  const recentAchievements = [
    { id: "1", name: "نجم القراءة", child: "فاطمة", date: "اليوم", icon: "📚" },
    {
      id: "2",
      name: "عبقري الرياضيات",
      child: "أحمد",
      date: "منذ يومين",
      icon: "🧮",
    },
    {
      id: "3",
      name: "مستكشف العلوم",
      child: "محمد",
      date: "منذ 3 أيام",
      icon: "🔬",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {config.overviewTitle}
        </h1>
        <p className="text-gray-600">{config.overviewSubtitle}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-linear-to-br from-[#8B5CF6] to-[#EC4899] rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {familyStats.totalChildren}
              </p>
              <p className="text-sm text-gray-600">عدد الطلاب</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-linear-to-br from-[#EC4899] to-[#F59E0B] rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {familyStats.activeGames}
              </p>
              <p className="text-sm text-gray-600">ألعاب نشطة</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-linear-to-br from-[#F59E0B] to-[#8B5CF6] rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {familyStats.totalAchievements}
              </p>
              <p className="text-sm text-gray-600">إنجازات محققة</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-linear-to-br from-[#8B5CF6] to-[#F59E0B] rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {familyStats.weeklyHours}
              </p>
              <p className="text-sm text-gray-600">ساعات هذا الأسبوع</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Children Progress Summary */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-[#8B5CF6]" />
          {config.summaryTitle}
        </h2>
        <div className="space-y-6">
          {children.map((child) => (
            <div key={child.id}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Avatar
                    className={`w-10 h-10 bg-linear-to-br ${child.color}`}
                  >
                    <AvatarFallback className="text-white">
                      {child.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{child.name}</p>
                    <p className="text-sm text-gray-600">
                      {child.age} سنوات • {child.gamesPlayed} لعبة
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-[#8B5CF6]">
                  {child.progress}%
                </span>
              </div>
              <Progress value={child.progress} className="h-2" />
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Games */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-[#EC4899]" />
            الألعاب التي تم لعبها مؤخرًا
          </h2>
          <div className="space-y-4">
            {recentGames.map((game) => (
              <div
                key={game.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-gray-900">{game.name}</p>
                  <p className="text-sm text-gray-600">
                    {game.child} • {game.date}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#F59E0B]">
                    {game.score}
                  </p>
                  <p className="text-xs text-gray-600">نقطة</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Achievements */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[#F59E0B]" />
            الإنجازات المحققة
          </h2>
          <div className="space-y-4">
            {recentAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-4 p-4 bg-[#FEF3C7] rounded-lg"
              >
                <div className="text-4xl">{achievement.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {achievement.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {achievement.child} • {achievement.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Weekly Learning Report */}
      <Card className="p-6 bg-linear-to-br from-[#F6E9F4] to-[#FEF3C7]">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          تقرير التعلم الأسبوعي
        </h2>
        <p className="text-gray-700 mb-4">
          {config.weeklyReportText(
            familyStats.weeklyHours,
            familyStats.totalAchievements,
          )}
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-2xl font-bold text-[#8B5CF6]">75%</p>
            <p className="text-xs text-gray-600">معدل الإكمال</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-2xl font-bold text-[#EC4899]">92</p>
            <p className="text-xs text-gray-600">متوسط النتائج</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-2xl font-bold text-[#F59E0B]">+15%</p>
            <p className="text-xs text-gray-600">تحسن هذا الأسبوع</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
