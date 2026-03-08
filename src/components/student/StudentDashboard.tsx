import React, { useState } from "react";
import GamesLibrary from "./GamesLibrary";
import StudentProfile from "./StudentProfile";
import GameDetails from "./GameDetails";

interface StudentDashboardProps {
  userData: {
    name: string;
    email?: string;
  };
  onLogout: () => void;
  isLogoutPending?: boolean;
}

interface StudentGameSummary {
  id: number;
  title: string;
  description?: string;
  category?: string;
  rating?: number;
  color?: string;
}

type View = "library" | "profile" | "game-details";

export default function StudentDashboard({
  userData,
  onLogout,
  isLogoutPending = false,
}: StudentDashboardProps) {
  const [currentView, setCurrentView] = useState<View>("library");
  const [selectedGame, setSelectedGame] = useState<StudentGameSummary | null>(
    null,
  );

  const handleGameSelect = (game: StudentGameSummary) => {
    setSelectedGame(game);
    setCurrentView("game-details");
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Aleem Logo" className="h-10 w-auto" />
            </div>

            {/* Nav Links */}
            <div className="flex items-center gap-8">
              <button
                onClick={() => setCurrentView("library")}
                className={`text-sm font-semibold transition-colors ${
                  currentView === "library" || currentView === "game-details"
                    ? "text-[#8B5CF6]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                مكتبة الألعاب
              </button>
              <button
                onClick={() => setCurrentView("profile")}
                className={`text-sm font-semibold transition-colors ${
                  currentView === "profile"
                    ? "text-[#8B5CF6]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                الملف الشخصي
              </button>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                مرحباً، {userData.name}
              </span>
              <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {userData.name.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === "library" && (
          <GamesLibrary onGameSelect={handleGameSelect} onLogout={onLogout} />
        )}
        {currentView === "profile" && (
          <StudentProfile
            onLogout={onLogout}
            isLogoutPending={isLogoutPending}
          />
        )}
        {currentView === "game-details" && selectedGame && (
          <GameDetails
            game={selectedGame}
            onBack={() => setCurrentView("library")}
          />
        )}
      </div>
    </div>
  );
}
