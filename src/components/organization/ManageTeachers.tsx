import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Trash2 } from "lucide-react";
import {
  toApiErrorMessage,
  useDeactivateSchoolUser,
  useRegisterTeacher,
  useSchoolUsers,
  type SchoolUserSummary,
} from "@/features/auth";
import { useEducationSubjects } from "@/features/education";

function teacherDisplayName(teacher: SchoolUserSummary): string {
  const fullName =
    `${teacher.first_name ?? ""} ${teacher.last_name ?? ""}`.trim();
  return fullName || teacher.username;
}

export default function ManageTeachers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<number[]>([]);

  const teachersQuery = useSchoolUsers("teacher", true);
  const subjectsQuery = useEducationSubjects({ is_active: true });
  const registerTeacherMutation = useRegisterTeacher();
  const deactivateMutation = useDeactivateSchoolUser();

  const error =
    teachersQuery.error ??
    subjectsQuery.error ??
    registerTeacherMutation.error ??
    deactivateMutation.error;

  const teachers = teachersQuery.data?.items ?? [];

  const filteredTeachers = useMemo(() => {
    const needle = searchQuery.trim().toLowerCase();
    if (!needle) return teachers;
    return teachers.filter((t) => {
      const name = teacherDisplayName(t).toLowerCase();
      const user = t.username.toLowerCase();
      const mail = (t.email ?? "").toLowerCase();
      return (
        name.includes(needle) || user.includes(needle) || mail.includes(needle)
      );
    });
  }, [teachers, searchQuery]);

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setSelectedSubjectIds([]);
  };

  const handleCreateOpenChange = (open: boolean) => {
    setIsCreateOpen(open);
    if (!open) {
      resetForm();
      registerTeacherMutation.reset();
    }
  };

  const toggleSubject = (id: number) => {
    setSelectedSubjectIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const onCreateTeacher = async (event: React.FormEvent) => {
    event.preventDefault();
    await registerTeacherMutation.mutateAsync({
      username: username.trim(),
      email: email.trim(),
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      password,
      subject_ids: selectedSubjectIds,
    });
    handleCreateOpenChange(false);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة المعلمين</h1>
          <p className="text-gray-600 mt-1">عرض وتسجيل المعلمين في المؤسسة</p>
        </div>

        <Button
          className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white gap-2"
          onClick={() => setIsCreateOpen(true)}
        >
          <Plus className="w-5 h-5" />
          تسجيل معلم جديد
        </Button>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {toApiErrorMessage(error)}
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <Input
          type="text"
          placeholder="ابحث عن معلم بالاسم أو اسم المستخدم أو البريد الإلكتروني..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="text-right"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  الإجراءات
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  الحالة
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  البريد الإلكتروني
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  اسم المستخدم
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  الاسم
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTeachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        disabled={deactivateMutation.isPending}
                        onClick={() => {
                          void deactivateMutation.mutateAsync({
                            userId: teacher.id,
                          });
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        teacher.is_active === false ? "secondary" : "default"
                      }
                      className={
                        teacher.is_active === false
                          ? ""
                          : "bg-green-100 text-green-700 hover:bg-green-100"
                      }
                    >
                      {teacher.is_active === false ? "غير نشط" : "نشط"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{teacher.email}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {teacher.username}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">
                      {teacherDisplayName(teacher)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!teachersQuery.isLoading && filteredTeachers.length === 0 && (
          <div className="px-6 py-8 text-center text-sm text-gray-500 border-t border-gray-200">
            لا يوجد معلمون مطابقون حالياً.
          </div>
        )}

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
          عرض {filteredTeachers.length} من {teachers.length} معلم
        </div>
      </div>

      {/* Register Teacher Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={handleCreateOpenChange}>
        <DialogContent className="sm:max-w-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right">تسجيل معلم جديد</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(event) => void onCreateTeacher(event)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="teacher-username">اسم المستخدم *</Label>
                <Input
                  id="teacher-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teacher-email">البريد الإلكتروني *</Label>
                <Input
                  id="teacher-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teacher-first-name">الاسم الأول *</Label>
                <Input
                  id="teacher-first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teacher-last-name">الاسم الأخير *</Label>
                <Input
                  id="teacher-last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="text-right"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="teacher-password">كلمة المرور *</Label>
                <Input
                  id="teacher-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  dir="ltr"
                />
              </div>
            </div>

            {/* Subject selection */}
            <div className="space-y-2">
              <Label>
                المواد الدراسية{" "}
                <span className="text-gray-400 text-xs">(اختياري)</span>
              </Label>
              {subjectsQuery.isLoading ? (
                <p className="text-sm text-gray-500">جاري تحميل المواد...</p>
              ) : (subjectsQuery.data ?? []).length === 0 ? (
                <p className="text-sm text-gray-500">لا توجد مواد متاحة.</p>
              ) : (
                <ScrollArea className="h-36 rounded-md border border-gray-200 p-3">
                  <div className="space-y-2">
                    {(subjectsQuery.data ?? []).map((subject) => (
                      <label
                        key={subject.id}
                        className="flex items-center gap-2 cursor-pointer select-none"
                      >
                        <Checkbox
                          checked={selectedSubjectIds.includes(subject.id)}
                          onCheckedChange={() => toggleSubject(subject.id)}
                        />
                        <span className="text-sm text-gray-700">
                          {subject.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </ScrollArea>
              )}
              {selectedSubjectIds.length > 0 && (
                <p className="text-xs text-gray-500">
                  {selectedSubjectIds.length} مادة محددة
                </p>
              )}
            </div>

            {registerTeacherMutation.error && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {toApiErrorMessage(registerTeacherMutation.error)}
              </p>
            )}

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={registerTeacherMutation.isPending}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
              >
                <Plus className="w-4 h-4" />
                {registerTeacherMutation.isPending
                  ? "جاري التسجيل..."
                  : "تسجيل المعلم"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleCreateOpenChange(false)}
              >
                إلغاء
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
