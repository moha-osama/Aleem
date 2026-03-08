import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddChildProfileProps {
  open: boolean;
  onClose: () => void;
  onAdd: (username: string) => Promise<void>;
  isSubmitting?: boolean;
}

export default function AddChildProfile({
  open,
  onClose,
  onAdd,
  isSubmitting = false,
}: AddChildProfileProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAdd(username.trim());
    setUsername("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#6D28D9] text-right">
            إضافة ملف طفل جديد
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-right block">
              اسم المستخدم للطالب
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="أدخل username الخاص بالطالب"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full text-right"
            />
            <p className="text-xs text-gray-500 text-right">
              يجب أن يكون الطالب موجودا بالفعل وفي نفس المدرسة.
            </p>
          </div>

          <DialogFooter className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || username.trim().length === 0}
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
