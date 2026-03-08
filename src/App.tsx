import {
  BrowserRouter,
  Navigate,
  Outlet,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { type ReactNode, useMemo, useState } from "react";
import LoginScreen from "@/components/auth/LoginScreen";
import SignupTypeSelection from "@/components/auth/SignupTypeSelection";
import OrganizationSignup from "@/components/auth/OrganizationSignup";
import FamilySignup from "@/components/auth/FamilySignup";
import AuthenticatedProfilePage from "@/components/auth/AuthenticatedProfilePage";
import { LandingPage } from "@/components/landing/LandingPage";
import OrganizationDashboard from "@/components/organization/OrganizationDashboard";
import DashboardOverview from "@/components/organization/DashboardOverview";
import ManageUsers from "@/components/organization/ManageUsers";
import ManageGames from "@/components/organization/ManageGames";
import ManageStudyYears from "@/components/organization/ManageStudyYears";
import OrganizationSettings from "@/components/organization/OrganizationSettings";
import SubscriptionsBilling from "@/components/organization/SubscriptionsBilling";
import GameQuestionsManager from "@/components/shared/GameQuestionsManager";
import FamilyDashboardComponent from "@/components/family/FamilyDashboard";
import FamilyOverview from "@/components/family/FamilyOverview";
import ChildrenProfiles from "@/components/family/ChildrenProfiles";
import FamilyGamesLibrary from "@/components/family/FamilyGamesLibrary";
import ProgressReports from "@/components/family/ProgressReports";
import FamilySubscription from "@/components/family/FamilySubscription";
import FamilySettings from "@/components/family/FamilySettings";
import StudentDashboard from "@/components/student/StudentDashboard";
import {
  ProtectedRoute,
  PublicOnlyRoute,
  useAuth,
  useLogin,
  useSignup,
  toApiErrorMessage,
} from "@/features/auth";
import { tokenStorage } from "@/api/client";
import type { UserRole } from "@/features/auth";

function routeForRole(role: UserRole) {
  if (role === "school_admin") {
    return "/dashboard/organization/overview";
  }

  if (role === "parent" || role === "teacher") {
    return "/dashboard/home";
  }

  return "/dashboard/student";
}

function createUsernameFromEmail(email: string, suffix: string) {
  const fallback = `user_${Date.now()}`;
  const normalized = email
    .split("@")[0]
    ?.trim()
    .replace(/[^a-zA-Z0-9_]/g, "_");
  return normalized ? `${normalized}_${suffix}` : fallback;
}

function splitName(fullName: string) {
  const trimmed = fullName.trim();

  if (!trimmed) {
    return { firstName: "User", lastName: "Account" };
  }

  const parts = trimmed.split(/\s+/);
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" ") || "User",
  };
}

function currentEducationYear() {
  const currentYear = new Date().getFullYear();
  return `${currentYear}-${currentYear + 1}`;
}

function Landing() {
  const navigate = useNavigate();
  return <LandingPage onLoginClick={() => navigate("/login")} />;
}

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useLogin();

  const redirectAfterLogin = (
    location.state as { from?: { pathname?: string } } | null
  )?.from?.pathname;

  const infoMessage =
    (location.state as { infoMessage?: string } | null)?.infoMessage ?? null;

  const handleLogin = async (username: string, password: string) => {
    try {
      const data = await loginMutation.mutateAsync({ username, password });
      navigate(redirectAfterLogin ?? routeForRole(data.role), {
        replace: true,
      });
    } catch {
      // Error is rendered via mutation state.
    }
  };

  return (
    <>
      {infoMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-md text-sm">
          {infoMessage}
        </div>
      )}
      <LoginScreen
        onLogin={handleLogin}
        onNavigateToSignup={() => navigate("/signup")}
        onBack={() => navigate("/")}
        isSubmitting={loginMutation.isPending}
        errorMessage={
          loginMutation.error
            ? toApiErrorMessage(loginMutation.error)
            : undefined
        }
      />
    </>
  );
}

function SignupType() {
  const navigate = useNavigate();
  return (
    <SignupTypeSelection
      onSelectType={(type) =>
        navigate(
          type === "organization" ? "/signup/organization" : "/signup/family",
        )
      }
      onBack={() => navigate("/login")}
    />
  );
}

function OrgSignup() {
  const navigate = useNavigate();
  const signupMutation = useSignup();
  const [clientError, setClientError] = useState<string | null>(null);

  const handleComplete = async (data: Record<string, unknown>) => {
    setClientError(null);

    if (!tokenStorage.getAccessToken()) {
      setClientError(
        "لا يمكن إنشاء هذا النوع من الحسابات بدون تسجيل دخول. حسب إعدادات الـ API الحالية، إنشاء حساب المؤسسة يتطلب صلاحية school_admin.",
      );
      return;
    }

    const password = String(data.password ?? "");
    const confirmPassword = String(data.confirmPassword ?? "");
    const agreeToTerms = Boolean(data.agreeToTerms);

    if (!agreeToTerms) {
      setClientError("يرجى الموافقة على الشروط والأحكام.");
      return;
    }

    if (password !== confirmPassword) {
      setClientError("تأكيد كلمة المرور غير مطابق.");
      return;
    }

    const email = String(data.email ?? "");
    const principalName = String(data.principalName ?? "");
    const { firstName, lastName } = splitName(principalName);

    try {
      await signupMutation.mutateAsync({
        accountType: "organization",
        payload: {
          username: createUsernameFromEmail(email, "teacher"),
          email,
          first_name: firstName,
          last_name: lastName,
          password,
          subject_ids: [],
        },
      });

      navigate("/login", {
        replace: true,
        state: {
          infoMessage: "تم إنشاء الحساب بنجاح. يمكنك تسجيل الدخول الآن.",
        },
      });
    } catch {
      // Server error displayed from mutation state.
    }
  };

  return (
    <OrganizationSignup
      onComplete={handleComplete}
      onBack={() => navigate("/signup")}
      isSubmitting={signupMutation.isPending}
      errorMessage={
        clientError ??
        (signupMutation.error
          ? toApiErrorMessage(signupMutation.error)
          : undefined)
      }
    />
  );
}

function FamilySignupPage() {
  const navigate = useNavigate();
  const signupMutation = useSignup();
  const [clientError, setClientError] = useState<string | null>(null);

  const handleComplete = async (data: Record<string, unknown>) => {
    setClientError(null);

    if (!tokenStorage.getAccessToken()) {
      setClientError(
        "لا يمكن إنشاء حساب طالب بدون تسجيل دخول. حسب إعدادات الـ API الحالية، endpoint إنشاء الطالب يتطلب حساب school_admin أو parent.",
      );
      return;
    }

    const password = String(data.password ?? "");
    const confirmPassword = String(data.confirmPassword ?? "");
    const agreeToTerms = Boolean(data.agreeToTerms);

    if (!agreeToTerms) {
      setClientError("يرجى الموافقة على الشروط والأحكام.");
      return;
    }

    if (password !== confirmPassword) {
      setClientError("تأكيد كلمة المرور غير مطابق.");
      return;
    }

    const familyName = String(data.familyName ?? "");
    const parentName = String(data.parentName ?? "");
    const email = String(data.email ?? "");
    const { firstName, lastName } = splitName(parentName || familyName);

    try {
      await signupMutation.mutateAsync({
        accountType: "family",
        payload: {
          username: createUsernameFromEmail(email, "student"),
          email,
          first_name: firstName,
          last_name: lastName,
          password,
          stage_id: 1,
          education_year: currentEducationYear(),
          date_of_birth: "2015-01-01",
        },
      });

      navigate("/login", {
        replace: true,
        state: {
          infoMessage: "تم إنشاء الحساب بنجاح. يمكنك تسجيل الدخول الآن.",
        },
      });
    } catch {
      // Server error displayed from mutation state.
    }
  };

  return (
    <FamilySignup
      onComplete={handleComplete}
      onBack={() => navigate("/signup")}
      isSubmitting={signupMutation.isPending}
      errorMessage={
        clientError ??
        (signupMutation.error
          ? toApiErrorMessage(signupMutation.error)
          : undefined)
      }
    />
  );
}

function DashboardHome() {
  const { role } = useAuth();

  if (!role) {
    return <Outlet />;
  }

  return <Navigate to={routeForRole(role)} replace />;
}

function RequireRole({
  roles,
  children,
}: {
  roles: UserRole[];
  children: ReactNode;
}) {
  const { role, isCheckingAuth } = useAuth();

  if (isCheckingAuth || !role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-600">جاري التحميل...</p>
      </div>
    );
  }

  if (!roles.includes(role)) {
    return <Navigate to={routeForRole(role)} replace />;
  }

  return <>{children}</>;
}

function OrgDashboard() {
  const navigate = useNavigate();
  const { user, logout, isLogoutPending } = useAuth();

  const dashboardData = useMemo(
    () => ({
      name:
        `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() ||
        user?.username ||
        "المؤسسة",
    }),
    [user?.first_name, user?.last_name, user?.username],
  );

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <OrganizationDashboard
      userData={dashboardData}
      isLogoutPending={isLogoutPending}
      onLogout={() => {
        void handleLogout();
      }}
    />
  );
}

function FamilyDashboard() {
  const navigate = useNavigate();
  const { user, role, logout, isLogoutPending } = useAuth();

  const dashboardData = useMemo(
    () => ({
      name:
        `${user?.last_name ?? ""} ${user?.first_name ?? ""}`.trim() ||
        user?.username ||
        (role === "teacher" ? "المعلم" : "العائلة"),
      parentName:
        `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() ||
        "ولي الأمر",
      email: user?.email || "",
    }),
    [user?.email, user?.first_name, user?.last_name, user?.username],
  );

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <FamilyDashboardComponent
      userData={dashboardData}
      isLogoutPending={isLogoutPending}
      onLogout={() => {
        void handleLogout();
      }}
    />
  );
}

function StudentDashboardPage() {
  const navigate = useNavigate();
  const { user, logout, isLogoutPending } = useAuth();

  const dashboardData = useMemo(
    () => ({
      name:
        `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() ||
        user?.username ||
        "الطالب",
      email: user?.email || "",
    }),
    [user?.email, user?.first_name, user?.last_name, user?.username],
  );

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <StudentDashboard
      userData={dashboardData}
      isLogoutPending={isLogoutPending}
      onLogout={() => {
        void handleLogout();
      }}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupType />} />
          <Route path="/signup/organization" element={<OrgSignup />} />
          <Route path="/signup/family" element={<FamilySignupPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route
            path="/dashboard/organization"
            element={
              <RequireRole roles={["school_admin"]}>
                <OrgDashboard />
              </RequireRole>
            }
          >
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<DashboardOverview />} />
            <Route path="manage-users">
              <Route index element={<Navigate to="students" replace />} />
              <Route path=":tab" element={<ManageUsers />} />
            </Route>
            <Route path="games" element={<ManageGames />} />
            <Route path="game-questions">
              <Route index element={<Navigate to="questions" replace />} />
              <Route path=":tab" element={<GameQuestionsManager />} />
            </Route>
            <Route path="study-years">
              <Route index element={<Navigate to="levels" replace />} />
              <Route path=":tab" element={<ManageStudyYears />} />
            </Route>
            <Route path="billing" element={<SubscriptionsBilling />} />
            <Route path="settings" element={<OrganizationSettings />} />
          </Route>
          <Route
            path="/dashboard/home"
            element={
              <RequireRole roles={["parent", "teacher"]}>
                <FamilyDashboard />
              </RequireRole>
            }
          >
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<FamilyOverview />} />
            <Route path="children" element={<ChildrenProfiles />} />
            <Route path="games" element={<FamilyGamesLibrary />} />
            <Route path="progress" element={<ProgressReports />} />
            <Route path="reports" element={<ProgressReports />} />
            <Route path="subscription" element={<FamilySubscription />} />
            <Route path="settings" element={<FamilySettings />} />
          </Route>
          <Route
            path="/dashboard/student"
            element={
              <RequireRole roles={["student"]}>
                <StudentDashboardPage />
              </RequireRole>
            }
          />
          <Route path="/profile" element={<AuthenticatedProfilePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
