import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Lock,
  Save,
  KeyRound,
  CheckCircle2,
  Pencil,
  X,
} from "lucide-react";
import {
  toApiErrorMessage,
  useChangePassword,
  useMe,
  useUpdateMe,
} from "@/features/auth";

// ---------------------------------------------------------------------------
// ProfileCard — read-only view with an Edit toggle
// ---------------------------------------------------------------------------

export function ProfileCard() {
  const meQuery = useMe();
  const updateMeMutation = useUpdateMe();

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (meQuery.data) {
      setFirstName(meQuery.data.first_name);
      setLastName(meQuery.data.last_name);
      setEmail(meQuery.data.email);
    }
  }, [meQuery.data]);

  const handleCancel = () => {
    if (meQuery.data) {
      setFirstName(meQuery.data.first_name);
      setLastName(meQuery.data.last_name);
      setEmail(meQuery.data.email);
    }
    setIsEditing(false);
    setSuccess(false);
    updateMeMutation.reset();
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setSuccess(false);
    await updateMeMutation.mutateAsync({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
    });
    setSuccess(true);
    setIsEditing(false);
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#9F7AEA]">
            <User className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            المعلومات الشخصية
          </h2>
        </div>
        {!meQuery.isLoading && !isEditing && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setIsEditing(true);
              setSuccess(false);
            }}
          >
            <Pencil className="h-3.5 w-3.5" />
            تعديل
          </Button>
        )}
      </div>

      <Separator />

      {meQuery.isLoading ? (
        <p className="text-sm text-gray-500">جاري تحميل البيانات...</p>
      ) : (
        <form
          onSubmit={(event) => void handleSave(event)}
          className="space-y-4"
        >
          {/* Username — always read-only */}
          <div className="space-y-1.5">
            <Label htmlFor="pc-username">اسم المستخدم</Label>
            <Input
              id="pc-username"
              value={meQuery.data?.username ?? ""}
              disabled
              className="bg-gray-50 text-right text-gray-500"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="pc-first-name">الاسم الأول</Label>
              <Input
                id="pc-first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required={isEditing}
                readOnly={!isEditing}
                disabled={updateMeMutation.isPending}
                className={
                  isEditing
                    ? "text-right"
                    : "bg-gray-50 text-right text-gray-700 cursor-default"
                }
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pc-last-name">الاسم الأخير</Label>
              <Input
                id="pc-last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required={isEditing}
                readOnly={!isEditing}
                disabled={updateMeMutation.isPending}
                className={
                  isEditing
                    ? "text-right"
                    : "bg-gray-50 text-right text-gray-700 cursor-default"
                }
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="pc-email" className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-gray-400" />
              البريد الإلكتروني
            </Label>
            <Input
              id="pc-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={isEditing}
              readOnly={!isEditing}
              disabled={updateMeMutation.isPending}
              dir="ltr"
              className={
                isEditing
                  ? "text-right"
                  : "bg-gray-50 text-right text-gray-700 cursor-default"
              }
            />
          </div>

          {updateMeMutation.error && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {toApiErrorMessage(updateMeMutation.error)}
            </p>
          )}

          {success && (
            <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              تم حفظ التغييرات بنجاح.
            </div>
          )}

          {isEditing && (
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={updateMeMutation.isPending}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
              >
                <Save className="h-4 w-4" />
                {updateMeMutation.isPending ? "جاري الحفظ..." : "حفظ التغييرات"}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={updateMeMutation.isPending}
                onClick={handleCancel}
              >
                <X className="h-4 w-4" />
                إلغاء
              </Button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ChangePasswordCard
// ---------------------------------------------------------------------------

export function ChangePasswordCard() {
  const changePasswordMutation = useChangePassword();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setClientError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setClientError("كلمة المرور الجديدة وتأكيدها غير متطابقتين.");
      return;
    }

    await changePasswordMutation.mutateAsync({
      old_password: oldPassword,
      new_password: newPassword,
    });

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSuccess(true);
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#EC4899] to-[#F472B6]">
          <Lock className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          تغيير كلمة المرور
        </h2>
      </div>

      <Separator />

      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="space-y-4"
      >
        <div className="space-y-1.5">
          <Label
            htmlFor="cp-old-password"
            className="flex items-center gap-1.5"
          >
            <KeyRound className="h-3.5 w-3.5 text-gray-400" />
            كلمة المرور الحالية *
          </Label>
          <Input
            id="cp-old-password"
            type="password"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
              setSuccess(false);
              setClientError(null);
            }}
            required
            disabled={changePasswordMutation.isPending}
            dir="ltr"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="cp-new-password">كلمة المرور الجديدة *</Label>
          <Input
            id="cp-new-password"
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setSuccess(false);
              setClientError(null);
            }}
            required
            disabled={changePasswordMutation.isPending}
            dir="ltr"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="cp-confirm-password">تأكيد كلمة المرور *</Label>
          <Input
            id="cp-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setSuccess(false);
              setClientError(null);
            }}
            required
            disabled={changePasswordMutation.isPending}
            dir="ltr"
          />
        </div>

        {(clientError ?? changePasswordMutation.error) && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {clientError ?? toApiErrorMessage(changePasswordMutation.error!)}
          </p>
        )}

        {success && (
          <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            تم تغيير كلمة المرور بنجاح.
          </div>
        )}

        <Button
          type="submit"
          disabled={changePasswordMutation.isPending}
          className="bg-[#EC4899] hover:bg-[#DB2777]"
        >
          <Lock className="h-4 w-4" />
          {changePasswordMutation.isPending
            ? "جاري التغيير..."
            : "تغيير كلمة المرور"}
        </Button>
      </form>
    </div>
  );
}
