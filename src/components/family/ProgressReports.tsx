import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/features/auth";
import { getDashboardConfig } from "./dashboardConfig";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Download, TrendingUp, Star, Target } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProgressReports() {
  const { role } = useAuth();
  const config = getDashboardConfig(role);
  const [selectedChild, setSelectedChild] = useState("all");
  const [timePeriod, setTimePeriod] = useState("week");

  const childrenProgress = [
    {
      id: "1",
      name: "أحمد محمد",
      color: "from-[#8B5CF6] to-[#EC4899]",
      skills: [
        { name: "الرياضيات", progress: 85, improvement: "+12%" },
        { name: "القراءة", progress: 75, improvement: "+8%" },
        { name: "العلوم", progress: 90, improvement: "+15%" },
      ],
      weeklyStats: {
        gamesCompleted: 15,
        hoursPlayed: 4.5,
        averageScore: 88,
        achievements: 5,
      },
    },
    {
      id: "2",
      name: "فاطمة أحمد",
      color: "from-[#EC4899] to-[#F59E0B]",
      skills: [
        { name: "الرياضيات", progress: 92, improvement: "+10%" },
        { name: "القراءة", progress: 95, improvement: "+18%" },
        { name: "العلوم", progress: 88, improvement: "+12%" },
      ],
      weeklyStats: {
        gamesCompleted: 22,
        hoursPlayed: 6.2,
        averageScore: 92,
        achievements: 8,
      },
    },
    {
      id: "3",
      name: "محمد علي",
      color: "from-[#8B5CF6] to-[#F59E0B]",
      skills: [
        { name: "الحروف", progress: 70, improvement: "+20%" },
        { name: "الأرقام", progress: 65, improvement: "+15%" },
        { name: "الألوان", progress: 80, improvement: "+10%" },
      ],
      weeklyStats: {
        gamesCompleted: 8,
        hoursPlayed: 2.5,
        averageScore: 78,
        achievements: 3,
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            التقدم التعليمي
          </h1>
          <p className="text-gray-600">{config.reportsSubtitle}</p>
        </div>
        <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-white">
          <Download className="w-5 h-5 ml-2" />
          تصدير التقرير
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger className="text-right">
              <SelectValue placeholder={config.reportsPersonPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الطلاب</SelectItem>
              <SelectItem value="1">أحمد محمد</SelectItem>
              <SelectItem value="2">فاطمة أحمد</SelectItem>
              <SelectItem value="3">محمد علي</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="text-right">
              <SelectValue placeholder="الفترة الزمنية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">اليوم</SelectItem>
              <SelectItem value="week">هذا الأسبوع</SelectItem>
              <SelectItem value="month">هذا الشهر</SelectItem>
              <SelectItem value="year">هذا العام</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="text-right">
              <SelectValue placeholder="نوع المهارة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع المهارات</SelectItem>
              <SelectItem value="math">الرياضيات</SelectItem>
              <SelectItem value="reading">القراءة</SelectItem>
              <SelectItem value="science">العلوم</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="text-right">
              <SelectValue placeholder="نوع اللعبة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الألعاب</SelectItem>
              <SelectItem value="educational">تعليمية</SelectItem>
              <SelectItem value="puzzle">ألغاز</SelectItem>
              <SelectItem value="adventure">مغامرات</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Progress Cards */}
      <div className="space-y-6">
        {childrenProgress.map((child) => (
          <Card key={child.id} className="p-6">
            <div className="space-y-6">
              {/* Child Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <Avatar className={`w-16 h-16 bg-linear-to-br ${child.color}`}>
                  <AvatarFallback className="text-white text-xl">
                    {child.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">
                    {child.name}
                  </h3>
                  <p className="text-sm text-gray-600">تقرير الأسبوع الحالي</p>
                </div>
              </div>

              {/* Weekly Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-[#F6E9F4] rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-[#8B5CF6]" />
                    <p className="text-2xl font-bold text-[#8B5CF6]">
                      {child.weeklyStats.gamesCompleted}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">ألعاب مكتملة</p>
                </div>
                <div className="text-center p-4 bg-[#FEF3C7] rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-[#F59E0B]" />
                    <p className="text-2xl font-bold text-[#F59E0B]">
                      {child.weeklyStats.averageScore}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">متوسط النتائج</p>
                </div>
                <div className="text-center p-4 bg-[#DBEAFE] rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-[#3B82F6]" />
                    <p className="text-2xl font-bold text-[#3B82F6]">
                      {child.weeklyStats.hoursPlayed}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">ساعات اللعب</p>
                </div>
                <div className="text-center p-4 bg-[#DCFCE7] rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl">🏆</span>
                    <p className="text-2xl font-bold text-[#10B981]">
                      {child.weeklyStats.achievements}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">إنجازات جديدة</p>
                </div>
              </div>

              {/* Skills Progress */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4">تقدم المهارات</h4>
                <div className="space-y-4">
                  {child.skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-green-600">
                            {skill.improvement}
                          </span>
                          <span className="text-sm font-bold text-[#8B5CF6]">
                            {skill.progress}%
                          </span>
                        </div>
                      </div>
                      <Progress value={skill.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
