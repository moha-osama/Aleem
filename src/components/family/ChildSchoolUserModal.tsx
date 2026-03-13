import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  authQueryKeys,
  toApiErrorMessage,
  useSchoolUser,
  useUpdateSchoolUser,
} from "@/features/auth";
import { parentQueryKeys } from "@/features/parents";

interface ChildSchoolUserModalProps {
  open: boolean;
  onClose: () => void;
  userId: number;
}

export default function ChildSchoolUserModal({
  open,
  onClose,
  userId,
}: ChildSchoolUserModalProps) {
  const queryClient = useQueryClient();
  const userQuery = useSchoolUser(userId, open);
  const updateMutation = useUpdateSchoolUser();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (!open || !userQuery.data) {
      return;
    }

    setUsername(userQuery.data.username);
    setEmail(userQuery.data.email ?? "");
    setFirstName(userQuery.data.first_name);
    setLastName(userQuery.data.last_name);
  }, [open, userQuery.data]);

  const hasChanges = useMemo(() => {
    if (!userQuery.data) {
      return false;
    }

    return (
      username.trim() !== userQuery.data.username ||
      email.trim() !== userQuery.data.email ||
      firstName.trim() !== userQuery.data.first_name ||
      lastName.trim() !== userQuery.data.last_name
    );
  }, [email, firstName, lastName, username, userQuery.data]);

  const isSaving = updateMutation.isPending;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userQuery.data) {
      return;
    }

    const payload: {
      username?: string;
      email?: string;
      first_name?: string;
      last_name?: string;
    } = {};

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    if (trimmedUsername !== userQuery.data.username) {
      payload.username = trimmedUsername;
    }
    if (trimmedEmail !== userQuery.data.email) {
      payload.email = trimmedEmail;
    }
    if (trimmedFirstName !== userQuery.data.first_name) {
      payload.first_name = trimmedFirstName;
    }
    if (trimmedLastName !== userQuery.data.last_name) {
      payload.last_name = trimmedLastName;
    }

    if (Object.keys(payload).length === 0) {
      onClose();
      return;
    }

    await updateMutation.mutateAsync({
      userId,
      payload,
    });

    await Promise.all([
      queryClient.invalidateQueries({ queryKey: parentQueryKeys.children() }),
      queryClient.invalidateQueries({ queryKey: authQueryKeys.schoolUsers() }),
    ]);

    onClose();
  };

  const error = userQuery.error ?? updateMutation.error;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-2xl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right text-xl font-bold text-[#6D28D9]">
            تعديل البيانات
          </DialogTitle>
        </DialogHeader>

        {userQuery.isLoading ? (
          <p className="text-sm text-gray-600 text-right">
            جاري تحميل بيانات الطالب...
          </p>
        ) : userQuery.data ? (
          <form
            onSubmit={(event) => void handleSubmit(event)}
            className="space-y-4"
          >
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {userQuery.data.role}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-[#F6E9F4] text-[#6D28D9]"
              >
                {userQuery.data.school_name}
              </Badge>
            </div>

            {error && (
              <div
                className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
              >
                {toApiErrorMessage(error)}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor={`child-user-username-${userId}`}>
                  اسم المستخدم
                </Label>
                <Input
                  id={`child-user-username-${userId}`}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  disabled={isSaving}
                  required
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`child-user-email-${userId}`}>
                  البريد الإلكتروني
                </Label>
                <Input
                  id={`child-user-email-${userId}`}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={isSaving}
                  type="email"
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`child-user-first-name-${userId}`}>
                  الاسم الأول
                </Label>
                <Input
                  id={`child-user-first-name-${userId}`}
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  disabled={isSaving}
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`child-user-last-name-${userId}`}>
                  الاسم الأخير
                </Label>
                <Input
                  id={`child-user-last-name-${userId}`}
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  disabled={isSaving}
                  className="text-right"
                />
              </div>
            </div>

            <DialogFooter className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSaving}
              >
                إغلاق
              </Button>
              <Button
                type="submit"
                disabled={isSaving || !hasChanges}
                className="bg-[#8B5CF6] text-white"
              >
                {isSaving ? "جاري الحفظ..." : "حفظ التعديلات"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <p className="text-sm text-gray-600 text-right">
            تعذر العثور على بيانات هذا الطالب.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
