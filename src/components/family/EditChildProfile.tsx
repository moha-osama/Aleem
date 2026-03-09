import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEducationLevels, useEducationStages } from "@/features/education";
import { useUpdateChildProfile } from "@/features/parents";
import type { ParentChild } from "@/features/parents";

interface EditChildProfileProps {
  open: boolean;
  onClose: () => void;
  child: ParentChild;
}

export default function EditChildProfile({
  open,
  onClose,
  child,
}: EditChildProfileProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [educationLevelId, setEducationLevelId] = useState("");
  const [stageId, setStageId] = useState("");
  const [educationYear, setEducationYear] = useState(child.education_year);
  const [dateOfBirth, setDateOfBirth] = useState("");

  const levelsQuery = useEducationLevels(open);
  const selectedLevelId = educationLevelId ? Number(educationLevelId) : null;
  const stagesQuery = useEducationStages(
    selectedLevelId ? { education_level: selectedLevelId } : undefined,
    Boolean(selectedLevelId),
  );

  const updateMutation = useUpdateChildProfile();

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setEducationLevelId("");
    setStageId("");
    setEducationYear(child.education_year);
    setDateOfBirth("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const onEducationLevelChange = (value: string) => {
    setEducationLevelId(value);
    setStageId("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Record<string, string | number> = {};
    if (firstName.trim()) payload.first_name = firstName.trim();
    if (lastName.trim()) payload.last_name = lastName.trim();
    if (email.trim()) payload.email = email.trim();
    if (stageId) payload.stage_id = Number(stageId);
    if (educationYear.trim()) payload.education_year = educationYear.trim();
    if (dateOfBirth) payload.date_of_birth = dateOfBirth;

    await updateMutation.mutateAsync({ childId: child.user_id, ...payload });
    resetForm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
      }}
    >
      <DialogContent
        className="sm:max-w-2xl max-h-[90vh] overflow-y-auto"
        dir="rtl"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#6D28D9] text-right">
            تعديل ملف {child.full_name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="edit-first-name">الاسم الأول</Label>
              <Input
                id="edit-first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={updateMutation.isPending}
                className="text-right"
                placeholder="اتركه فارغاً للإبقاء على الحالي"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-last-name">الاسم الأخير</Label>
              <Input
                id="edit-last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={updateMutation.isPending}
                className="text-right"
                placeholder="اتركه فارغاً للإبقاء على الحالي"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="edit-email">البريد الإلكتروني</Label>
              <Input
                id="edit-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={updateMutation.isPending}
                className="text-right"
                placeholder="اتركه فارغاً للإبقاء على الحالي"
              />
            </div>

            <div className="space-y-2">
              <Label>المرحلة التعليمية</Label>
              <Select
                value={educationLevelId}
                onValueChange={onEducationLevelChange}
                disabled={updateMutation.isPending}
              >
                <SelectTrigger className="text-right">
                  <SelectValue
                    placeholder={
                      levelsQuery.isLoading
                        ? "جاري تحميل المراحل..."
                        : `الحالية: ${child.education_level}`
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {(levelsQuery.data ?? []).map((level) => (
                    <SelectItem key={level.id} value={String(level.id)}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>الصف الدراسي</Label>
              <Select
                value={stageId}
                onValueChange={setStageId}
                disabled={
                  updateMutation.isPending ||
                  !educationLevelId ||
                  stagesQuery.isLoading
                }
              >
                <SelectTrigger className="text-right">
                  <SelectValue
                    placeholder={
                      !educationLevelId
                        ? `الحالي: ${child.stage}`
                        : stagesQuery.isLoading
                          ? "جاري تحميل الصفوف..."
                          : "اختر الصف الدراسي"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {(stagesQuery.data ?? []).map((stage) => (
                    <SelectItem key={stage.id} value={String(stage.id)}>
                      {stage.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-education-year">العام الدراسي</Label>
              <Input
                id="edit-education-year"
                value={educationYear}
                onChange={(e) => setEducationYear(e.target.value)}
                placeholder="2024-2025"
                disabled={updateMutation.isPending}
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-dob">تاريخ الميلاد</Label>
              <Input
                id="edit-dob"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                disabled={updateMutation.isPending}
                className="text-right flex-row-reverse"
              />
            </div>
          </div>

          <DialogFooter className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={updateMutation.isPending}
              className="flex-1"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="flex-1 bg-linear-to-r from-[#8B5CF6] to-[#EC4899] hover:from-[#7C3AED] hover:to-[#DB2777] text-white"
            >
              {updateMutation.isPending ? "جاري الحفظ..." : "حفظ التغييرات"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
