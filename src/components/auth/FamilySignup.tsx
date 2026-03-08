import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import logoSrc from "/full_logo.png";

/* ── Inline Logo ─────────────────────────────────────── */
function Logo() {
  return (
    <div className="flex flex-col items-center mx-auto mb-4">
      <img
        src={logoSrc}
        alt="IBAL Logo"
        className="h-28 w-auto object-contain"
      />
    </div>
  );
}

interface FamilySignupProps {
  onComplete: (data: Record<string, unknown>) => void;
  onBack: () => void;
  isSubmitting?: boolean;
  errorMessage?: string;
}

export default function FamilySignup({
  onComplete,
  onBack,
  isSubmitting = false,
  errorMessage,
}: FamilySignupProps) {
  const [formData, setFormData] = useState({
    familyName: "",
    parentName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    country: "",
    numberOfChildren: "",
    agreeToTerms: false,
  });

  const handleInputChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({ ...formData, accountType: "family" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECCAE8] p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-[#F59E0B] text-white">
                    {s}
                  </div>
                  {s < 2 && <div className="w-12 h-1 bg-[#F59E0B]" />}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600">الخطوة 1 من 2</p>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <Logo />
            <h1 className="text-3xl font-bold text-[#6D28D9] mb-2">
              أنشئ حساب عائلتك
            </h1>
            <p className="text-sm text-gray-600">
              املأ البيانات التالية لإنشاء حساب العائلة
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="familyName" className="text-right block">
                اسم العائلة
              </Label>
              <Input
                id="familyName"
                type="text"
                placeholder="أدخل اسم العائلة"
                value={formData.familyName}
                onChange={(e) =>
                  handleInputChange("familyName", e.target.value)
                }
                required
                disabled={isSubmitting}
                className="w-full text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentName" className="text-right block">
                اسم ولي الأمر
              </Label>
              <Input
                id="parentName"
                type="text"
                placeholder="أدخل اسم ولي الأمر"
                value={formData.parentName}
                onChange={(e) =>
                  handleInputChange("parentName", e.target.value)
                }
                required
                disabled={isSubmitting}
                className="w-full text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-right block">
                البريد الإلكتروني
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@family.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-right block">
                كلمة المرور
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="كلمة المرور"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-right block">
                تأكيد كلمة المرور
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="أعد إدخال كلمة المرور"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                required
                disabled={isSubmitting}
                className="w-full text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-right block">
                رقم الهاتف
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+966 XXX XXX XXX"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                required
                disabled={isSubmitting}
                className="w-full text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-right block">
                الدولة / المنطقة
              </Label>
              <Select
                value={formData.country}
                onValueChange={(value) => handleInputChange("country", value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className="w-full text-right">
                  <SelectValue placeholder="اختر الدولة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sa">المملكة العربية السعودية</SelectItem>
                  <SelectItem value="ae">الإمارات العربية المتحدة</SelectItem>
                  <SelectItem value="kw">الكويت</SelectItem>
                  <SelectItem value="qa">قطر</SelectItem>
                  <SelectItem value="bh">البحرين</SelectItem>
                  <SelectItem value="om">عمان</SelectItem>
                  <SelectItem value="eg">مصر</SelectItem>
                  <SelectItem value="jo">الأردن</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numberOfChildren" className="text-right block">
                عدد الطلاب
              </Label>
              <Select
                value={formData.numberOfChildren}
                onValueChange={(value) =>
                  handleInputChange("numberOfChildren", value)
                }
                disabled={isSubmitting}
              >
                <SelectTrigger className="w-full text-right">
                  <SelectValue placeholder="اختر عدد الطلاب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">طفل واحد</SelectItem>
                  <SelectItem value="2">طفلان</SelectItem>
                  <SelectItem value="3">3 أطفال</SelectItem>
                  <SelectItem value="4">4 أطفال</SelectItem>
                  <SelectItem value="5">5 أطفال أو أكثر</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <Label htmlFor="terms" className="text-sm cursor-pointer">
                أوافق على{" "}
                <a href="#" className="text-[#F59E0B] hover:underline">
                  الشروط والأحكام
                </a>
              </Label>
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) =>
                  handleInputChange("agreeToTerms", checked)
                }
                disabled={isSubmitting}
              />
            </div>

            {errorMessage && (
              <p className="text-sm text-red-600 text-right" role="alert">
                {errorMessage}
              </p>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={onBack}
                disabled={isSubmitting}
                variant="outline"
                className="flex-1"
              >
                العودة
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#F59E0B] hover:bg-[#D97706] text-white"
              >
                {isSubmitting ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
