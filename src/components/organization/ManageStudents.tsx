import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import {
  toApiErrorMessage,
  useAuth,
  useDeactivateSchoolUser,
  useRegisterStudent,
  useSchoolUsers,
  type SchoolUserSummary,
} from "@/features/auth";
import { useEducationLevels, useEducationStages } from "@/features/education";

function studentDisplayName(student: SchoolUserSummary): string {
  const fullName =
    `${student.first_name ?? ""} ${student.last_name ?? ""}`.trim();
  return fullName || student.username;
}

export default function ManageStudents() {
  const { role } = useAuth();
  const canRegister = role === "school_admin" || role === "parent";
  const canDeactivate = role === "school_admin";

  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [educationLevelId, setEducationLevelId] = useState("");
  const [stageId, setStageId] = useState("");
  const [educationYear, setEducationYear] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const studentsQuery = useSchoolUsers("student", true);
  const levelsQuery = useEducationLevels(true);
  const selectedLevelId = educationLevelId ? Number(educationLevelId) : null;
  const stagesQuery = useEducationStages(
    selectedLevelId ? { education_level: selectedLevelId } : undefined,
    Boolean(selectedLevelId),
  );
  const registerStudentMutation = useRegisterStudent();
  const deactivateStudentMutation = useDeactivateSchoolUser();

  const error =
    studentsQuery.error ??
    levelsQuery.error ??
    stagesQuery.error ??
    registerStudentMutation.error ??
    deactivateStudentMutation.error;

  const students = studentsQuery.data?.items ?? [];

  const filteredStudents = useMemo(() => {
    const needle = searchQuery.trim().toLowerCase();

    if (!needle) {
      return students;
    }

    return students.filter((student) => {
      const name = studentDisplayName(student).toLowerCase();
      const user = student.username.toLowerCase();
      const mail = (student.email ?? "").toLowerCase();
      return (
        name.includes(needle) || user.includes(needle) || mail.includes(needle)
      );
    });
  }, [students, searchQuery]);

  const resetCreateForm = () => {
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

  const onEducationLevelChange = (value: string) => {
    setEducationLevelId(value);
    setStageId("");
  };

  const handleCreateOpenChange = (open: boolean) => {
    setIsCreateOpen(open);
    if (!open) {
      resetCreateForm();
    }
  };

  const onCreateStudent = async (event: React.FormEvent) => {
    event.preventDefault();

    await registerStudentMutation.mutateAsync({
      username: username.trim(),
      email: email.trim(),
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      password,
      stage_id: Number(stageId),
      education_year: educationYear.trim(),
      date_of_birth: dateOfBirth || undefined,
    });

    handleCreateOpenChange(false);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة الطلاب</h1>
          {/* <p className="text-gray-600 mt-1">عرض وإدارة جميع الطلاب المسجلين</p> */}
        </div>

        {canRegister && (
          <Button
            className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white gap-2"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="w-5 h-5" />
            إضافة طالب جديد
          </Button>
        )}
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {toApiErrorMessage(error)}
        </div>
      )}

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <Input
          type="text"
          placeholder="ابحث عن طالب بالاسم أو اسم المستخدم أو البريد الإلكتروني..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="text-right"
        />
      </div>

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
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      {canDeactivate && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          disabled={deactivateStudentMutation.isPending}
                          onClick={() => {
                            void deactivateStudentMutation.mutateAsync({
                              userId: student.id,
                            });
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        student.is_active === false ? "secondary" : "default"
                      }
                      className={
                        student.is_active === false
                          ? ""
                          : "bg-green-100 text-green-700 hover:bg-green-100"
                      }
                    >
                      {student.is_active === false ? "غير نشط" : "نشط"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{student.email}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {student.username}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">
                      {studentDisplayName(student)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!studentsQuery.isLoading && filteredStudents.length === 0 && (
          <div className="px-6 py-8 text-center text-sm text-gray-500 border-t border-gray-200">
            لا يوجد طلاب مطابقون حالياً.
          </div>
        )}

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
          عرض {filteredStudents.length} من {students.length} طالب
        </div>
      </div>

      <Dialog open={isCreateOpen} onOpenChange={handleCreateOpenChange}>
        <DialogContent className="sm:max-w-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right">إضافة طالب جديد</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(event) => void onCreateStudent(event)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="student-username">اسم المستخدم *</Label>
                <Input
                  id="student-username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-email">البريد الإلكتروني *</Label>
                <Input
                  id="student-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-first-name">الاسم الأول *</Label>
                <Input
                  id="student-first-name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  required
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-last-name">الاسم الأخير *</Label>
                <Input
                  id="student-last-name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  required
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label>المرحلة التعليمية *</Label>
                <Select
                  value={educationLevelId}
                  onValueChange={onEducationLevelChange}
                >
                  <SelectTrigger className="text-right">
                    <SelectValue
                      placeholder={
                        levelsQuery.isLoading
                          ? "جاري تحميل المراحل التعليمية..."
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
                  disabled={!educationLevelId || stagesQuery.isLoading}
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
                <Label htmlFor="student-education-year">العام الدراسي *</Label>
                <Input
                  id="student-education-year"
                  value={educationYear}
                  onChange={(event) => setEducationYear(event.target.value)}
                  required
                  placeholder="2024-2025"
                  className="text-right"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="student-password">كلمة المرور *</Label>
                <Input
                  id="student-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="text-right"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="student-dob">تاريخ الميلاد (اختياري)</Label>
                <Input
                  id="student-dob"
                  type="date"
                  value={dateOfBirth}
                  onChange={(event) => setDateOfBirth(event.target.value)}
                  className="text-right flex-row-reverse"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                disabled={registerStudentMutation.isPending || !stageId}
              >
                <Plus className="w-4 h-4" />
                إضافة
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
