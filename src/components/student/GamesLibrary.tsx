import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { toApiErrorMessage } from "@/features/auth";
import { useGames, type Game } from "@/features/games";

interface GamesLibraryProps {
  onGameSelect: (game: any) => void;
  onLogout: () => void;
}

function gameTitle(game: Game) {
  return (game.name ?? game.title ?? `Game #${game.id}`).toString();
}

export default function GamesLibrary({ onGameSelect }: GamesLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const gamesQuery = useGames();

  const filtered = useMemo(() => {
    const games = gamesQuery.data ?? [];
    const normalizedSearch = searchQuery.trim().toLowerCase();

    if (!normalizedSearch) {
      return games;
    }

    return games.filter((game) => {
      const title = gameTitle(game).toLowerCase();
      const description = (game.description ?? "").toString().toLowerCase();
      return (
        title.includes(normalizedSearch) ||
        description.includes(normalizedSearch)
      );
    });
  }, [gamesQuery.data, searchQuery]);

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">مرحباً بك في Aleem</h1>
        <p className="text-xl text-white/90 mb-6">
          استكشف الألعاب التعليمية المتاحة لك
        </p>
        <div className="relative max-w-xl">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="ابحث عن لعبة..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="pr-12 h-12 text-gray-900 text-right bg-white"
          />
        </div>
      </div>

      {gamesQuery.error && (
        <p className="text-sm text-red-600 text-right" role="alert">
          {toApiErrorMessage(gamesQuery.error)}
        </p>
      )}

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          الألعاب المتاحة
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((game) => (
            <div
              key={game.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-32 bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                <span className="text-white text-5xl font-bold opacity-20">
                  IBAL
                </span>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {gameTitle(game)}
                  </h3>
                  <Badge
                    className={
                      game.is_active === false
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-100"
                        : "bg-green-100 text-green-700 hover:bg-green-100"
                    }
                  >
                    {game.is_active === false ? "غير مفعلة" : "مفعلة"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {(game.description ?? "").toString() || "-"}
                </p>
                <Button
                  className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                  onClick={() => onGameSelect(game)}
                >
                  عرض التفاصيل
                </Button>
              </div>
            </div>
          ))}

          {!gamesQuery.isLoading && filtered.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
              لا توجد ألعاب حالياً.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
