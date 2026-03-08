import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/features/auth";
import { getDashboardConfig } from "./dashboardConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { toApiErrorMessage } from "@/features/auth";
import { useGames, type Game } from "@/features/games";

function gameTitle(game: Game) {
  return (game.name ?? game.title ?? `Game #${game.id}`).toString();
}

export default function FamilyGamesLibrary() {
  const { role } = useAuth();
  const config = getDashboardConfig(role);
  const [searchQuery, setSearchQuery] = useState("");
  const gamesQuery = useGames();

  const games = useMemo(() => {
    const list = gamesQuery.data ?? [];
    const normalizedSearch = searchQuery.trim().toLowerCase();

    if (!normalizedSearch) {
      return list;
    }

    return list.filter((game) => {
      const title = gameTitle(game).toLowerCase();
      const description = (game.description ?? "").toString().toLowerCase();
      return (
        title.includes(normalizedSearch) ||
        description.includes(normalizedSearch)
      );
    });
  }, [gamesQuery.data, searchQuery]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">مكتبة الألعاب</h1>
        <p className="text-gray-600">{config.gamesSubtitle}</p>
      </div>

      {gamesQuery.error && (
        <p className="text-sm text-red-600 text-right" role="alert">
          {toApiErrorMessage(gamesQuery.error)}
        </p>
      )}

      <Card className="p-6">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="ابحث عن لعبة..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="pr-10 text-right"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Card
            key={game.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-32 bg-linear-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
              <div className="text-white text-4xl font-bold opacity-20">
                IBAL
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {gameTitle(game)}
                </h3>
                <p className="text-sm text-gray-600">
                  {(game.description ?? "").toString() || "-"}
                </p>
              </div>

              <div className="flex items-center gap-2">
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

              <Button className="w-full bg-linear-to-r from-[#8B5CF6] to-[#EC4899] hover:from-[#7C3AED] hover:to-[#DB2777] text-white">
                ابدأ اللعب
              </Button>
            </div>
          </Card>
        ))}

        {!gamesQuery.isLoading && games.length === 0 && (
          <div className="col-span-full rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
            لا توجد ألعاب متاحة حالياً.
          </div>
        )}
      </div>
    </div>
  );
}
