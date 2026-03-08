import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Calendar } from "lucide-react";

export default function FamilySubscription() {
  const currentPlan = {
    name: "العائلة الذهبية",
    price: "99",
    currency: "ريال",
    period: "شهرياً",
    nextBilling: "15 مارس 2026",
    children: 5,
    features: [
      "حتى 5 أطفال",
      "وصول غير محدود لجميع الألعاب",
      "تقارير تفصيلية أسبوعية",
      "دعم فني على مدار الساعة",
      "محتوى تعليمي حصري",
    ],
  };

  const plans = [
    {
      name: "العائلة الأساسية",
      price: "49",
      children: 2,
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
      children: 5,
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
      children: 10,
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
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">الاشتراك</h1>
        <p className="text-gray-600">إدارة خطة اشتراكك ومعلومات الدفع</p>
      </div>

      {/* Current Plan */}
      <Card className="p-6 bg-linear-to-br from-[#F6E9F4] to-[#FEF3C7]">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentPlan.name}
            </h2>
            <p className="text-gray-600">خطتك الحالية</p>
          </div>
          <Badge className="bg-green-500 text-white">نشط</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">السعر</p>
            <p className="text-3xl font-bold text-[#8B5CF6]">
              {currentPlan.price}{" "}
              <span className="text-lg">{currentPlan.currency}</span>
            </p>
            <p className="text-sm text-gray-600">{currentPlan.period}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">الفوترة القادمة</p>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#F59E0B]" />
              <p className="text-lg font-semibold text-gray-900">
                {currentPlan.nextBilling}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">عدد الطلاب</p>
            <p className="text-3xl font-bold text-[#EC4899]">
              {currentPlan.children}
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <p className="font-semibold text-gray-900">مميزات الخطة:</p>
          {currentPlan.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            <CreditCard className="w-5 h-5 ml-2" />
            تحديث طريقة الدفع
          </Button>
          <Button
            variant="outline"
            className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
          >
            إلغاء الاشتراك
          </Button>
        </div>
      </Card>

      {/* Available Plans */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">الخطط المتاحة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-6 ${plan.popular ? "border-2 border-[#F59E0B] relative" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 right-1/2 transform translate-x-1/2 bg-[#F59E0B] text-white">
                  الأكثر شعبية
                </Badge>
              )}

              <div
                className={`w-16 h-16 bg-linear-to-br ${plan.color} rounded-lg flex items-center justify-center mb-4`}
              >
                <span className="text-white text-2xl font-bold">
                  {plan.children}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {plan.name}
              </h3>

              <div className="mb-6">
                <p className="text-4xl font-bold text-[#8B5CF6]">
                  {plan.price}{" "}
                  <span className="text-lg text-gray-600">ريال</span>
                </p>
                <p className="text-sm text-gray-600">شهرياً</p>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-linear-to-r from-[#F59E0B] to-[#EC4899] hover:from-[#D97706] hover:to-[#DB2777]"
                    : "bg-[#8B5CF6] hover:bg-[#7C3AED]"
                } text-white`}
              >
                {currentPlan.name === plan.name
                  ? "الخطة الحالية"
                  : "ترقية الخطة"}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
