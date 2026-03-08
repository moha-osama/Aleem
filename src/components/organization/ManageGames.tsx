import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Plus, Save, Trash2 } from "lucide-react";
import { toApiErrorMessage, useAuth } from "@/features/auth";
import {
  useCreateGame,
  useDeleteGame,
  useGames,
  useUpdateGame,
  type Game,
} from "@/features/games";

function gameTitle(game: Game) {
  return (game.name ?? game.title ?? `Game #${game.id}`).toString();
}

export default function ManageGames() {
  const { role } = useAuth();
  const canManage = role === "school_admin";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const gamesQuery = useGames();
  const createMutation = useCreateGame();
  const updateMutation = useUpdateGame();
  const deleteMutation = useDeleteGame();

  const error =
    gamesQuery.error ??
    createMutation.error ??
    updateMutation.error ??
    deleteMutation.error;

  const isSaving = createMutation.isPending || updateMutation.isPending;

  const filteredGames = useMemo(() => {
    const games = gamesQuery.data ?? [];
    const normalizedSearch = searchQuery.trim().toLowerCase();

    if (!normalizedSearch) {
      return games;
    }

    return games.filter((game) => {
      const title = gameTitle(game).toLowerCase();
      const desc = (game.description ?? "").toString().toLowerCase();
      return (
        title.includes(normalizedSearch) || desc.includes(normalizedSearch)
      );
    });
  }, [gamesQuery.data, searchQuery]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditingId(null);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      name: name.trim(),
      description: description.trim() || undefined,
    };

    if (editingId) {
      await updateMutation.mutateAsync({ id: editingId, payload });
    } else {
      await createMutation.mutateAsync(payload);
    }

    setIsFormOpen(false);
    resetForm();
  };

  const openCreateModal = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const startEdit = (game: Game) => {
    setEditingId(game.id);
    setName(gameTitle(game));
    setDescription((game.description ?? "").toString());
    setIsFormOpen(true);
  };

  const onModalOpenChange = (open: boolean) => {
    setIsFormOpen(open);
    if (!open) {
      resetForm();
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة الألعاب</h1>
        </div>

        {canManage && (
          <Button
            type="button"
            onClick={openCreateModal}
            className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
          >
            <Plus className="w-4 h-4" />
            إضافة لعبة جديدة
          </Button>
        )}
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {toApiErrorMessage(error)}
        </div>
      )}

      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <Input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="ابحث عن لعبة بالاسم أو الوصف"
          className="text-right"
        />
      </div>

      {canManage && (
        <Dialog open={isFormOpen} onOpenChange={onModalOpenChange}>
          <DialogContent className="sm:max-w-xl" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-right">
                {editingId ? "تعديل لعبة" : "إضافة لعبة جديدة"}
              </DialogTitle>
            </DialogHeader>

            <form
              onSubmit={(event) => {
                void onSubmit(event);
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="game-name">اسم اللعبة *</Label>
                <Input
                  id="game-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  disabled={isSaving}
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="game-description">الوصف</Label>
                <Textarea
                  id="game-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  disabled={isSaving}
                  className="text-right bg-gray-100"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                >
                  {editingId ? (
                    <Save className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  {editingId ? "حفظ التعديل" : "إضافة"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onModalOpenChange(false)}
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {(filteredGames ?? []).map((game) => (
          <div
            key={game.id}
            className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {gameTitle(game)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {(game.description ?? "-").toString()}
                  </p>
                </div>
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

              {canManage && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEdit(game)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => {
                      void deleteMutation.mutateAsync({ id: game.id });
                    }}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}

        {!gamesQuery.isLoading && filteredGames.length === 0 && (
          <div className="col-span-full rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
            لا توجد ألعاب مطابقة حالياً.
          </div>
        )}
      </div>
    </div>
  );
}
