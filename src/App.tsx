import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import LoginScreen from "@/components/auth/LoginScreen";
import SignupTypeSelection from "@/components/auth/SignupTypeSelection";
import OrganizationSignup from "@/components/auth/OrganizationSignup";
import FamilySignup from "@/components/auth/FamilySignup";
import { LandingPage } from "@/components/landing/LandingPage";

function Landing() {
  const navigate = useNavigate();
  return <LandingPage onLoginClick={() => navigate("/login")} />;
}

function Login() {
  const navigate = useNavigate();

  const handleLogin = (email: string, _password: string) => {
    if (email.includes("school") || email.includes("org")) {
      navigate("/dashboard/organization", {
        state: { email, name: "????? ????? ??????????" },
      });
    } else {
      navigate("/dashboard/family", {
        state: { email, name: "????? ??????", parentName: "???? ????" },
      });
    }
  };

  return (
    <LoginScreen
      onLogin={handleLogin}
      onNavigateToSignup={() => navigate("/signup")}
      onBack={() => navigate("/")}
    />
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
  return (
    <OrganizationSignup
      onComplete={(data) =>
        navigate("/dashboard/organization", { state: data })
      }
      onBack={() => navigate("/signup")}
    />
  );
}

function FamilySignupPage() {
  const navigate = useNavigate();
  return (
    <FamilySignup
      onComplete={(data) => navigate("/dashboard/family", { state: data })}
      onBack={() => navigate("/signup")}
    />
  );
}

function OrgDashboard() {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECCAE8]">
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mx-auto shadow-md p-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold text-[#6D28D9]">
          ????? {state?.name}!
        </h2>
        <p className="text-gray-600">???? ???? ??????? ??? ???????</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-sm text-[#83458E] hover:underline"
        >
          ????? ??????
        </button>
      </div>
    </div>
  );
}

function FamilyDashboard() {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECCAE8]">
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mx-auto shadow-md p-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold text-[#6D28D9]">
          ????? {state?.name}!
        </h2>
        <p className="text-gray-600">???? ???? ??????? ??? ???????</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-sm text-[#F59E0B] hover:underline"
        >
          ????? ??????
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupType />} />
        <Route path="/signup/organization" element={<OrgSignup />} />
        <Route path="/signup/family" element={<FamilySignupPage />} />
        <Route path="/dashboard/organization" element={<OrgDashboard />} />
        <Route path="/dashboard/family" element={<FamilyDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
