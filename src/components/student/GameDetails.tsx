import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Star,
  Clock,
  Share2,
  Heart,
  Gamepad2,
  Check,
} from "lucide-react";

interface GameDetailsProps {
  game: any;
  onBack: () => void;
}

export default function GameDetails({ game, onBack }: GameDetailsProps) {
  const learningOutcomes = [
    "تحسين مهارات الحساب الذهني",
    "فهم المفاهيم الأساسية في الرياضيات",
    "تطوير مهارات حل المشكلات",
    "تعزيز الثقة بالنفس",
    "التعلم من خلال اللعب التفاعلي",
  ];

  const reviews = [
    {
      name: "محمد أحمد",
      rating: 5,
      comment: "لعبة رائعة! ساعدتني كثيراً في تحسين مهاراتي",
    },
    {
      name: "فاطمة سعيد",
      rating: 5,
      comment: "ممتعة جداً وتعليمية في نفس الوقت",
    },
    {
      name: "عبدالله خالد",
      rating: 4,
      comment: "لعبة جيدة ولكن أتمنى المزيد من المستويات",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        onClick={onBack}
        variant="ghost"
        className="gap-2 hover:bg-gray-100"
      >
        <ArrowRight className="w-5 h-5" />
        العودة إلى المكتبة
      </Button>

      {/* Hero Section */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div className="h-80 relative overflow-hidden">
          <div
            className={`h-full bg-gradient-to-br ${game.color} flex items-center justify-center`}
          >
            <Gamepad2 className="w-32 h-32 text-white opacity-80" />
          </div>
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
              {game.category}
            </Badge>
          </div>
        </div>
      </div>

      {/* Game Info */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              {game.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold">{game.rating}</span>
                <span>/ 5</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5" />
                <span>حوالي 45 دقيقة</span>
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {game.description}
            </p>
            <div className="flex gap-3">
              <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-lg px-8 py-6">
                ابدأ اللعب
              </Button>
              <Button variant="outline" className="gap-2">
                <Share2 className="w-5 h-5" />
                شارك
              </Button>
              <Button variant="outline" className="gap-2">
                <Heart className="w-5 h-5" />
                المفضلة
              </Button>
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ماذا ستتعلم</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {learningOutcomes.map((outcome, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Game Details */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            تفاصيل اللعبة
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">الفئة العمرية</p>
              <p className="font-semibold text-gray-900">مناسبة للصفوف 1-3</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">مستوى الصعوبة</p>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                متوسط
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">عدد المستويات</p>
              <p className="font-semibold text-gray-900">15 مستوى</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          التقييمات والمراجعات
        </h2>
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-4 last:border-0"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-500 fill-yellow-500"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mr-13">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
