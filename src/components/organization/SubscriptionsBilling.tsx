import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Download } from "lucide-react";

export default function SubscriptionsBilling() {
  const invoices = [
    {
      id: 1,
      date: "01/02/2026",
      description: "اشتراك شهري - فبراير 2026",
      amount: "500 ر.س",
      status: "paid",
    },
    {
      id: 2,
      date: "01/01/2026",
      description: "اشتراك شهري - يناير 2026",
      amount: "500 ر.س",
      status: "paid",
    },
    {
      id: 3,
      date: "01/12/2025",
      description: "اشتراك شهري - ديسمبر 2025",
      amount: "500 ر.س",
      status: "paid",
    },
    {
      id: 4,
      date: "01/11/2025",
      description: "اشتراك شهري - نوفمبر 2025",
      amount: "500 ر.س",
      status: "paid",
    },
  ];

  const features = [
    "حتى 5,000 طالب",
    "جميع الألعاب التعليمية",
    "دعم 24/7",
    "تقارير متقدمة",
    "إدارة السنوات الدراسية",
    "تطبيقات الجوال",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">الاشتراك والفواتير</h1>
        <p className="text-gray-600 mt-1">إدارة اشتراكك والفواتير</p>
      </div>

      {/* Current Subscription */}
      <div className="bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] rounded-xl p-8 text-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">خطة المؤسسة المتقدمة</h2>
            <p className="text-white/90 mb-4">
              خطة شاملة لجميع احتياجات المؤسسات التعليمية
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">500</span>
              <span className="text-xl">ر.س / شهر</span>
            </div>
          </div>
          <Badge className="bg-green-500 text-white hover:bg-green-500">
            نشط
          </Badge>
        </div>

        <div className="space-y-2 mb-6">
          <p className="text-sm text-white/90">
            تاريخ الفوترة القادم: 15/03/2026
          </p>
          <p className="text-sm text-white/90">
            طريقة الدفع: بطاقة ائتمان تنتهي بـ **** 4242
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button className="bg-white text-[#8B5CF6] hover:bg-white/90">
            تحديث الخطة
          </Button>
          <Button
            variant="outline"
            className="text-black border-white hover:bg-white/10"
          >
            تحديث طريقة الدفع
          </Button>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">سجل الفواتير</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  الإجراء
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  الحالة
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  المبلغ
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  الوصف
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  التاريخ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      تحميل PDF
                    </Button>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      مدفوع
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">
                      {invoice.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {invoice.description}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{invoice.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cancel Subscription */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="font-bold text-red-900 mb-2">إلغاء الاشتراك</h3>
        <p className="text-sm text-red-700 mb-4">
          سيتم إلغاء اشتراكك في نهاية دورة الفوترة الحالية. لن تتمكن من الوصول
          إلى الميزات بعد ذلك.
        </p>
        <Button
          variant="outline"
          className="text-red-600 border-red-300 hover:bg-red-100"
        >
          إلغاء الاشتراك
        </Button>
      </div>
    </div>
  );
}
