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
import type { RegisterStudentRequest } from "@/features/auth";

interface AddChildProfileProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: RegisterStudentRequest) => Promise<void>;
  isSubmitting?: boolean;
}

export default function AddChildProfile({
  open,
  onClose,
  onAdd,
  isSubmitting = false,
}: AddChildProfileProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [educationLevelId, setEducationLevelId] = useState("");
  const [stageId, setStageId] = useState("");
  const [educationYear, setEducationYear] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const levelsQuery = useEducationLevels(open);
  const selectedLevelId = educationLevelId ? Number(educationLevelId) : null;
  const stagesQuery = useEducationStages(
    selectedLevelId ? { education_level: selectedLevelId } : undefined,
    Boolean(selectedLevelId),
  );

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setEducationLevelId("");
    setStageId("");
    setEducationYear("");
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
    await onAdd({
      username: username.trim(),
      email: email.trim(),
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      password,
      stage_id: Number(stageId),
      education_year: educationYear.trim(),
      date_of_birth: dateOfBirth || undefined,
    });
    resetForm();
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
            إضافة ملف طفل جديد
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="child-username">اسم المستخدم *</Label>
              <Input
                id="child-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isSubmitting}
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="child-email">البريد الإلكتروني *</Label>
              <Input
                id="child-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="child-first-name">الاسم الأول *</Label>
              <Input
                id="child-first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={isSubmitting}
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="child-last-name">الاسم الأخير *</Label>
              <Input
                id="child-last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={isSubmitting}
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label>المرحلة التعليمية *</Label>
              <Select
                value={educationLevelId}
                onValueChange={onEducationLevelChange}
                disabled={isSubmitting}
              >
                <SelectTrigger className="text-right">
                  <SelectValue
                    placeholder={
                      levelsQuery.isLoading
                        ? "جاري تحميل المراحل..."
                        : "اختر المرحلة التعليمية"
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
              <Label>الصف الدراسي *</Label>
              <Select
                value={stageId}
                onValueChange={setStageId}
                disabled={
                  isSubmitting || !educationLevelId || stagesQuery.isLoading
                }
              >
                <SelectTrigger className="text-right">
                  <SelectValue
                    placeholder={
                      !educationLevelId
                        ? "اختر المرحلة التعليمية أولاً"
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
              <Label htmlFor="child-education-year">العام الدراسي *</Label>
              <Input
                id="child-education-year"
                value={educationYear}
                onChange={(e) => setEducationYear(e.target.value)}
                required
                placeholder="2024-2025"
                disabled={isSubmitting}
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="child-password">كلمة المرور *</Label>
              <Input
                id="child-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isSubmitting}
                className="text-right"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="child-dob">تاريخ الميلاد (اختياري)</Label>
              <Input
                id="child-dob"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                disabled={isSubmitting}
                className="text-right flex-row-reverse"
              />
            </div>
          </div>

          <DialogFooter className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !stageId}
              className="flex-1 bg-[#6D28D9] hover:bg-[#5B21A3] text-white"
            >
              {isSubmitting ? "جاري الإضافة..." : "إضافة الطفل"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
