import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Plus, Save, Trash2 } from "lucide-react";
import { toApiErrorMessage } from "@/features/auth";
import {
  useCreateEducationLevel,
  useCreateEducationStage,
  useCreateEducationSubject,
  useDeleteEducationLevel,
  useDeleteEducationStage,
  useDeleteEducationSubject,
  useEducationLevels,
  useEducationStages,
  useEducationSubjects,
  useUpdateEducationLevel,
  useUpdateEducationStage,
  useUpdateEducationSubject,
  type EducationLevel,
  type EducationStage,
  type EducationSubject,
} from "@/features/education";

type EducationTab = "levels" | "stages" | "subjects";

export default function ManageStudyYears() {
  const { tab } = useParams<{ tab: string }>();
  const navigate = useNavigate();
  const activeTab: EducationTab =
    tab === "stages" ? "stages" : tab === "subjects" ? "subjects" : "levels";

  const [levelName, setLevelName] = useState("");
  const [levelOrder, setLevelOrder] = useState("0");
  const [editingLevelId, setEditingLevelId] = useState<number | null>(null);

  const [stageName, setStageName] = useState("");
  const [stageOrder, setStageOrder] = useState("1");
  const [stageLevelId, setStageLevelId] = useState("");
  const [editingStageId, setEditingStageId] = useState<number | null>(null);
  const [stageFilterLevelId, setStageFilterLevelId] = useState("all");

  const [subjectName, setSubjectName] = useState("");
  const [subjectDescription, setSubjectDescription] = useState("");
  const [subjectIsActive, setSubjectIsActive] = useState(true);
  const [subjectStageId, setSubjectStageId] = useState("");
  const [editingSubjectId, setEditingSubjectId] = useState<number | null>(null);
  const [subjectFilterStageId, setSubjectFilterStageId] = useState("all");
  const [subjectFilterLevelId, setSubjectFilterLevelId] = useState("all");
  const [subjectFilterActive, setSubjectFilterActive] = useState("all");

  const levelsQuery = useEducationLevels();
  const stagesQuery = useEducationStages(
    stageFilterLevelId === "all"
      ? undefined
      : { education_level: Number(stageFilterLevelId) },
  );
  const subjectsQuery = useEducationSubjects({
    stage:
      subjectFilterStageId === "all" ? undefined : Number(subjectFilterStageId),
    education_level:
      subjectFilterLevelId === "all" ? undefined : Number(subjectFilterLevelId),
    is_active:
      subjectFilterActive === "all"
        ? undefined
        : subjectFilterActive === "active",
  });

  const createLevelMutation = useCreateEducationLevel();
  const updateLevelMutation = useUpdateEducationLevel();
  const deleteLevelMutation = useDeleteEducationLevel();

  const createStageMutation = useCreateEducationStage();
  const updateStageMutation = useUpdateEducationStage();
  const deleteStageMutation = useDeleteEducationStage();

  const createSubjectMutation = useCreateEducationSubject();
  const updateSubjectMutation = useUpdateEducationSubject();
  const deleteSubjectMutation = useDeleteEducationSubject();

  const isLoadingInitialData =
    levelsQuery.isLoading || stagesQuery.isLoading || subjectsQuery.isLoading;

  const levelNameById = useMemo(() => {
    const map = new Map<number, string>();
    (levelsQuery.data ?? []).forEach((level) => {
      map.set(level.id, level.name);
    });
    return map;
  }, [levelsQuery.data]);

  const stageById = useMemo(() => {
    const map = new Map<number, EducationStage>();
    (stagesQuery.data ?? []).forEach((stage) => {
      map.set(stage.id, stage);
    });
    return map;
  }, [stagesQuery.data]);

  const currentError =
    levelsQuery.error ??
    stagesQuery.error ??
    subjectsQuery.error ??
    createLevelMutation.error ??
    updateLevelMutation.error ??
    deleteLevelMutation.error ??
    createStageMutation.error ??
    updateStageMutation.error ??
    deleteStageMutation.error ??
    createSubjectMutation.error ??
    updateSubjectMutation.error ??
    deleteSubjectMutation.error;

  const isSavingLevel =
    createLevelMutation.isPending || updateLevelMutation.isPending;
  const isSavingStage =
    createStageMutation.isPending || updateStageMutation.isPending;
  const isSavingSubject =
    createSubjectMutation.isPending || updateSubjectMutation.isPending;

  const isDeleting =
    deleteLevelMutation.isPending ||
    deleteStageMutation.isPending ||
    deleteSubjectMutation.isPending;

  const levels = levelsQuery.data ?? [];
  const stages = stagesQuery.data ?? [];
  const subjects = subjectsQuery.data ?? [];

  const resetLevelForm = () => {
    setLevelName("");
    setLevelOrder("0");
    setEditingLevelId(null);
  };

  const resetStageForm = () => {
    setStageName("");
    setStageOrder("1");
    setStageLevelId("");
    setEditingStageId(null);
  };

  const resetSubjectForm = () => {
    setSubjectName("");
    setSubjectDescription("");
    setSubjectIsActive(true);
    setSubjectStageId("");
    setEditingSubjectId(null);
  };

  const handleSaveLevel = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      name: levelName.trim(),
      order: Number(levelOrder),
    };

    if (editingLevelId) {
      await updateLevelMutation.mutateAsync({ id: editingLevelId, payload });
    } else {
      await createLevelMutation.mutateAsync(payload);
    }

    resetLevelForm();
  };

  const handleSaveStage = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      name: stageName.trim(),
      order: Number(stageOrder),
      education_level_id: Number(stageLevelId),
    };

    if (editingStageId) {
      await updateStageMutation.mutateAsync({ id: editingStageId, payload });
    } else {
      await createStageMutation.mutateAsync(payload);
    }

    resetStageForm();
  };

  const handleSaveSubject = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      name: subjectName.trim(),
      description: subjectDescription.trim(),
      is_active: subjectIsActive,
      stage_id: Number(subjectStageId),
    };

    if (editingSubjectId) {
      await updateSubjectMutation.mutateAsync({
        id: editingSubjectId,
        payload,
      });
    } else {
      await createSubjectMutation.mutateAsync(payload);
    }

    resetSubjectForm();
  };

  const startEditLevel = (level: EducationLevel) => {
    setEditingLevelId(level.id);
    setLevelName(level.name);
    setLevelOrder(String(level.order));
  };

  const startEditStage = (stage: EducationStage) => {
    setEditingStageId(stage.id);
    setStageName(stage.name);
    setStageOrder(String(stage.order));
    setStageLevelId(String(stage.education_level_id));
  };

  const startEditSubject = (subject: EducationSubject) => {
    setEditingSubjectId(subject.id);
    setSubjectName(subject.name);
    setSubjectDescription(subject.description);
    setSubjectIsActive(subject.is_active);
    setSubjectStageId(String(subject.stage_id));
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة التعليم</h1>
          {/* <p className="text-gray-600 mt-1">
            إدارة المراحل التعليمية والصفوف والمواد عبر الـ API مباشرة
          </p> */}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeTab === "levels" ? "default" : "outline"}
          className={
            activeTab === "levels" ? "bg-[#8B5CF6] hover:bg-[#7C3AED]" : ""
          }
          onClick={() => navigate("../levels")}
        >
          المراحل التعليمية
        </Button>
        <Button
          variant={activeTab === "stages" ? "default" : "outline"}
          className={
            activeTab === "stages" ? "bg-[#8B5CF6] hover:bg-[#7C3AED]" : ""
          }
          onClick={() => navigate("../stages")}
        >
          الصفوف
        </Button>
        <Button
          variant={activeTab === "subjects" ? "default" : "outline"}
          className={
            activeTab === "subjects" ? "bg-[#8B5CF6] hover:bg-[#7C3AED]" : ""
          }
          onClick={() => navigate("../subjects")}
        >
          المواد
        </Button>
      </div>

      {currentError && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {toApiErrorMessage(currentError)}
        </div>
      )}

      {isLoadingInitialData && (
        <div className="rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600">
          جاري تحميل بيانات التعليم...
        </div>
      )}

      {activeTab === "levels" && (
        <div className="grid gap-6 lg:h-[calc(100vh-240px)] lg:grid-cols-[360px_minmax(0,1fr)] lg:overflow-hidden">
          <form
            onSubmit={(event) => {
              void handleSaveLevel(event);
            }}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm space-y-4 lg:sticky lg:top-0 lg:self-start"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              {editingLevelId
                ? "تعديل المرحلة التعليمية"
                : "إضافة مرحلة تعليمية"}
            </h2>

            <div className="space-y-2">
              <Label htmlFor="level-name">اسم المرحلة *</Label>
              <Input
                id="level-name"
                value={levelName}
                onChange={(event) => setLevelName(event.target.value)}
                required
                disabled={isSavingLevel}
                className="text-right"
                placeholder="المرحلة التأسيسية"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="level-order">الترتيب *</Label>
              <Input
                id="level-order"
                type="number"
                value={levelOrder}
                onChange={(event) => setLevelOrder(event.target.value)}
                required
                disabled={isSavingLevel}
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isSavingLevel}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
              >
                {editingLevelId ? (
                  <Save className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {editingLevelId ? "حفظ التعديل" : "إضافة"}
              </Button>
              {editingLevelId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetLevelForm}
                >
                  إلغاء
                </Button>
              )}
            </div>
          </form>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm lg:h-full lg:overflow-y-auto">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              قائمة المراحل التعليمية
            </h3>
            <div className="space-y-3">
              {levels.map((level) => (
                <div
                  key={level.id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{level.name}</p>
                    <p className="text-sm text-gray-600">
                      الترتيب: {level.order}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEditLevel(level)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isDeleting}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => {
                        void deleteLevelMutation.mutateAsync({ id: level.id });
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {levels.length === 0 && (
                <p className="text-sm text-gray-500">
                  لا توجد مراحل تعليمية حالياً.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "stages" && (
        <div className="grid gap-6 lg:h-[calc(100vh-240px)] lg:grid-cols-[360px_minmax(0,1fr)] lg:overflow-hidden">
          <form
            onSubmit={(event) => {
              void handleSaveStage(event);
            }}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm space-y-4 lg:sticky lg:top-0 lg:self-start"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              {editingStageId ? "تعديل الصف" : "إضافة صف"}
            </h2>

            <div className="space-y-2">
              <Label htmlFor="stage-name">اسم الصف *</Label>
              <Input
                id="stage-name"
                value={stageName}
                onChange={(event) => setStageName(event.target.value)}
                required
                disabled={isSavingStage}
                className="text-right"
                placeholder="الصف التمهيدي"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stage-order">الترتيب *</Label>
              <Input
                id="stage-order"
                type="number"
                value={stageOrder}
                onChange={(event) => setStageOrder(event.target.value)}
                required
                disabled={isSavingStage}
              />
            </div>

            <div className="space-y-2">
              <Label>المرحلة التعليمية *</Label>
              <Select value={stageLevelId} onValueChange={setStageLevelId}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المرحلة التعليمية" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level.id} value={String(level.id)}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isSavingStage || !stageLevelId}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
              >
                {editingStageId ? (
                  <Save className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {editingStageId ? "حفظ التعديل" : "إضافة"}
              </Button>
              {editingStageId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetStageForm}
                >
                  إلغاء
                </Button>
              )}
            </div>
          </form>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm space-y-4 lg:h-full lg:overflow-y-auto">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-gray-900">
                قائمة الصفوف
              </h3>
              <Select
                value={stageFilterLevelId}
                onValueChange={setStageFilterLevelId}
              >
                <SelectTrigger className="max-w-[240px]">
                  <SelectValue placeholder="تصفية حسب المرحلة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل المراحل</SelectItem>
                  {levels.map((level) => (
                    <SelectItem key={level.id} value={String(level.id)}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              {stages.map((stage) => (
                <div
                  key={stage.id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{stage.name}</p>
                    <p className="text-sm text-gray-600">
                      الترتيب: {stage.order} | المرحلة:{" "}
                      {levelNameById.get(stage.education_level_id) ?? "-"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEditStage(stage)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isDeleting}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => {
                        void deleteStageMutation.mutateAsync({ id: stage.id });
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {stages.length === 0 && (
                <p className="text-sm text-gray-500">
                  لا توجد صفوف حسب التصفية الحالية.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "subjects" && (
        <div className="grid gap-6 lg:h-[calc(100vh-240px)] lg:grid-cols-[360px_minmax(0,1fr)] lg:overflow-hidden">
          <form
            onSubmit={(event) => {
              void handleSaveSubject(event);
            }}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm space-y-4 lg:sticky lg:top-0 lg:self-start"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              {editingSubjectId ? "تعديل المادة" : "إضافة مادة"}
            </h2>

            <div className="space-y-2">
              <Label htmlFor="subject-name">اسم المادة *</Label>
              <Input
                id="subject-name"
                value={subjectName}
                onChange={(event) => setSubjectName(event.target.value)}
                required
                disabled={isSavingSubject}
                className="text-right"
                placeholder="التربية البدنية"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject-description">الوصف *</Label>
              <Textarea
                id="subject-description"
                value={subjectDescription}
                onChange={(event) => setSubjectDescription(event.target.value)}
                required
                disabled={isSavingSubject}
                className="text-right"
                placeholder="وصف المادة"
              />
            </div>

            <div className="space-y-2">
              <Label>الصف *</Label>
              <Select value={subjectStageId} onValueChange={setSubjectStageId}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الصف" />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage.id} value={String(stage.id)}>
                      {stage.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <label className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2">
              <span className="text-sm text-gray-700">مفعلة</span>
              <input
                type="checkbox"
                checked={subjectIsActive}
                onChange={(event) => setSubjectIsActive(event.target.checked)}
                disabled={isSavingSubject}
                className="h-4 w-4"
              />
            </label>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isSavingSubject || !subjectStageId}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
              >
                {editingSubjectId ? (
                  <Save className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {editingSubjectId ? "حفظ التعديل" : "إضافة"}
              </Button>
              {editingSubjectId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetSubjectForm}
                >
                  إلغاء
                </Button>
              )}
            </div>
          </form>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm space-y-4 lg:h-full lg:overflow-y-auto">
            <div className="grid gap-3 md:grid-cols-3">
              <Select
                value={subjectFilterLevelId}
                onValueChange={setSubjectFilterLevelId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="المرحلة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل المراحل</SelectItem>
                  {levels.map((level) => (
                    <SelectItem key={level.id} value={String(level.id)}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={subjectFilterStageId}
                onValueChange={setSubjectFilterStageId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="الصف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الصفوف</SelectItem>
                  {stages.map((stage) => (
                    <SelectItem key={stage.id} value={String(stage.id)}>
                      {stage.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={subjectFilterActive}
                onValueChange={setSubjectFilterActive}
              >
                <SelectTrigger>
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="active">مفعلة</SelectItem>
                  <SelectItem value="inactive">غير مفعلة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              {subjects.map((subject) => {
                const stage = stageById.get(subject.stage_id);
                const levelName = stage
                  ? (levelNameById.get(stage.education_level_id) ?? "-")
                  : "-";

                return (
                  <div
                    key={subject.id}
                    className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">
                            {subject.name}
                          </p>
                          <Badge
                            className={
                              subject.is_active
                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                            }
                          >
                            {subject.is_active ? "مفعلة" : "غير مفعلة"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {subject.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          المرحلة: {levelName} | الصف: {stage?.name ?? "-"}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditSubject(subject)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={isDeleting}
                          className="text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => {
                            void deleteSubjectMutation.mutateAsync({
                              id: subject.id,
                            });
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {subjects.length === 0 && (
                <p className="text-sm text-gray-500">
                  لا توجد مواد حسب التصفية الحالية.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
