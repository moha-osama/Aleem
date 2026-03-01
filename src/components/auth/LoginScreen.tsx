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

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onNavigateToSignup: () => void;
  onBack?: () => void;
}

export default function LoginScreen({
  onLogin,
  onNavigateToSignup,
  onBack,
}: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
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
            <div className="space-y-2">
              <Label htmlFor="email" className="text-right block">
                البريد الإلكتروني
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-right"
              />
            </div>

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
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#83458E] hover:bg-[#7C3AED] text-white py-6"
            >
              دخول
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
