import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
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

interface LoginScreenProps {
  onLogin: (username: string, password: string) => void;
  onNavigateToSignup: () => void;
  onBack?: () => void;
  isSubmitting?: boolean;
  errorMessage?: string;
}

export default function LoginScreen({
  onLogin,
  onNavigateToSignup,
  onBack,
  isSubmitting = false,
  errorMessage,
}: LoginScreenProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(identifier, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECCAE8] p-4">
      {onBack && (
        <button
          onClick={onBack}
          className="fixed top-4 right-4 flex items-center gap-1 text-[#83458E] hover:text-[#6D28D9] text-sm font-semibold bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm transition-colors"
        >
          الرئيسية ←
        </button>
      )}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <Logo />
            <h1 className="text-3xl font-bold text-[#6D28D9] mb-2">
              تسجيل الدخول
            </h1>
            <p className="text-sm text-gray-600">
              أدخل بيانات حسابك للوصول إلى المنصة
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <FloatingLabelInput
              id="identifier"
              label="البريد الإلكتروني أو اسم المستخدم"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              autoComplete="username"
              required
              disabled={isSubmitting}
              className="text-right"
            />

            <FloatingLabelInput
              id="password"
              label="كلمة المرور"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
              className="text-right"
            />

            {errorMessage && (
              <p className="text-sm text-red-600 text-right" role="alert">
                {errorMessage}
              </p>
            )}

            <div className="flex items-center justify-between">
              <a href="#" className="text-sm text-[#83458E] hover:underline">
                هل نسيت كلمة المرور؟
              </a>
              <div className="flex items-center gap-2">
                <Label htmlFor="remember" className="text-sm cursor-pointer">
                  تذكرني
                </Label>
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#83458E] hover:bg-[#7C3AED] text-white py-6"
            >
              {isSubmitting ? "جاري تسجيل الدخول..." : "دخول"}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">أو</span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">ليس لديك حساب؟ </span>
              <button
                type="button"
                onClick={onNavigateToSignup}
                disabled={isSubmitting}
                className="text-sm text-[#83458E] hover:underline font-semibold"
              >
                إنشاء حساب جديد
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
