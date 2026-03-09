import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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

interface OrganizationSignupProps {
  onComplete: (data: Record<string, unknown>) => void;
  onBack: () => void;
  isSubmitting?: boolean;
  errorMessage?: string;
}

export default function OrganizationSignup({
  onComplete,
  onBack,
  isSubmitting = false,
  errorMessage,
}: OrganizationSignupProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    school_name: "",
    school_address: "",
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleInputChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete({ ...formData, accountType: "organization" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECCAE8] p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      s <= step
                        ? "bg-[#83458E] text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-12 h-1 ${
                        s < step ? "bg-[#83458E]" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600">
              الخطوة {step} من 3
            </p>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <Logo />
            <h1 className="text-3xl font-bold text-[#6D28D9] mb-2">
              إنشاء حساب مؤسستك
            </h1>
            <p className="text-sm text-gray-600">
              املأ البيانات التالية لإنشاء حساب المؤسسة
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="school_name" className="text-right block">
                    اسم المدرسة / المؤسسة
                  </Label>
                  <Input
                    id="school_name"
                    type="text"
                    placeholder="اسم المدرسة"
                    value={formData.school_name}
                    onChange={(e) =>
                      handleInputChange("school_name", e.target.value)
                    }
                    required
                    disabled={isSubmitting}
                    className="w-full text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school_address" className="text-right block">
                    عنوان المدرسة
                  </Label>
                  <Input
                    id="school_address"
                    type="text"
                    placeholder="المدينة، الدولة"
                    value={formData.school_address}
                    onChange={(e) =>
                      handleInputChange("school_address", e.target.value)
                    }
                    required
                    disabled={isSubmitting}
                    className="w-full text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-right block">
                    البريد الإلكتروني للمسؤول
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@school.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="w-full text-right"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="first_name" className="text-right block">
                    الاسم الأول
                  </Label>
                  <Input
                    id="first_name"
                    type="text"
                    placeholder="الاسم الأول"
                    value={formData.first_name}
                    onChange={(e) =>
                      handleInputChange("first_name", e.target.value)
                    }
                    required
                    disabled={isSubmitting}
                    className="w-full text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last_name" className="text-right block">
                    اسم العائلة
                  </Label>
                  <Input
                    id="last_name"
                    type="text"
                    placeholder="اسم العائلة"
                    value={formData.last_name}
                    onChange={(e) =>
                      handleInputChange("last_name", e.target.value)
                    }
                    required
                    disabled={isSubmitting}
                    className="w-full text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-right block">
                    اسم المستخدم
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="admin_username"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    required
                    disabled={isSubmitting}
                    className="w-full text-right"
                    dir="ltr"
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-right block">
                    كلمة المرور
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="كلمة المرور"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
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

                <div className="flex items-center gap-2 justify-start">
                  <Label htmlFor="terms" className="text-sm cursor-pointer">
                    أوافق على{" "}
                    <a href="#" className="text-[#83458E] hover:underline">
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
              </>
            )}

            {errorMessage && (
              <p className="text-sm text-red-600 text-right" role="alert">
                {errorMessage}
              </p>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={() => (step > 1 ? setStep(step - 1) : onBack())}
                disabled={isSubmitting}
                variant="outline"
                className="flex-1"
              >
                {step > 1 ? "السابق" : "العودة"}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#83458E] hover:bg-[#7C3AED] text-white"
              >
                {isSubmitting
                  ? "جاري إنشاء الحساب..."
                  : step < 3
                    ? "التالي"
                    : "إنشاء الحساب"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
