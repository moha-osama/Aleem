import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SchoolUsersTable from "./SchoolUsersTable";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Users, UserCog } from "lucide-react";
import {
  displayName,
  toApiErrorMessage,
  useAuth,
  useDeactivateSchoolUser,
  useRegisterStudent,
  useRegisterTeacher,
  useSchoolUsers,
} from "@/features/auth";
import {
  useEducationLevels,
  useEducationStages,
  useEducationSubjects,
} from "@/features/education";

type ActiveTab = "students" | "teachers";

// ---------------------------------------------------------------------------
// Students section
// ---------------------------------------------------------------------------

function StudentsSection() {
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
  const deactivateMutation = useDeactivateSchoolUser();

  const error =
    studentsQuery.error ??
    levelsQuery.error ??
    stagesQuery.error ??
    registerStudentMutation.error ??
    deactivateMutation.error;

  const students = studentsQuery.data?.items ?? [];

  const filteredStudents = useMemo(() => {
    const needle = searchQuery.trim().toLowerCase();
    if (!needle) return students;
    return students.filter((s) => {
      const name = displayName(s).toLowerCase();
      const user = s.username.toLowerCase();
      const mail = (s.email ?? "").toLowerCase();
      return (
        name.includes(needle) || user.includes(needle) || mail.includes(needle)
      );
    });
  }, [students, searchQuery]);

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

  const handleCreateOpenChange = (open: boolean) => {
    setIsCreateOpen(open);
    if (!open) resetForm();
  };

  const onEducationLevelChange = (value: string) => {
    setEducationLevelId(value);
    setStageId("");
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-gray-600 text-sm">عرض وإدارة جميع الطلاب المسجلين</p>
        {canRegister && (
          <Button
            className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white gap-2"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="w-4 h-4" />
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
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-right"
        />
      </div>

      <SchoolUsersTable
        items={filteredStudents}
        totalCount={students.length}
        isLoading={studentsQuery.isLoading}
        emptyMessage="لا يوجد طلاب مطابقون حالياً."
        countLabel="طالب"
        canDeactivate={canDeactivate}
        onDeactivate={(userId) =>
          void deactivateMutation.mutateAsync({ userId })
        }
        isDeactivatePending={deactivateMutation.isPending}
      />

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
                  onChange={(e) => setUsername(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-first-name">الاسم الأول *</Label>
                <Input
                  id="student-first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-last-name">الاسم الأخير *</Label>
                <Input
                  id="student-last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                  onChange={(e) => setEducationYear(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
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
                  onChange={(e) => setDateOfBirth(e.target.value)}
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

// ---------------------------------------------------------------------------
// Teachers section
// ---------------------------------------------------------------------------

function TeachersSection() {
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
      const name = displayName(t).toLowerCase();
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-gray-600 text-sm">عرض وتسجيل المعلمين في المؤسسة</p>
        <Button
          className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white gap-2"
          onClick={() => setIsCreateOpen(true)}
        >
          <Plus className="w-4 h-4" />
          تسجيل معلم جديد
        </Button>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {toApiErrorMessage(error)}
        </div>
      )}

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <Input
          type="text"
          placeholder="ابحث عن معلم بالاسم أو اسم المستخدم أو البريد الإلكتروني..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-right"
        />
      </div>

      <SchoolUsersTable
        items={filteredTeachers}
        totalCount={teachers.length}
        isLoading={teachersQuery.isLoading}
        emptyMessage="لا يوجد معلمون مطابقون حالياً."
        countLabel="معلم"
        canDeactivate
        onDeactivate={(userId) =>
          void deactivateMutation.mutateAsync({ userId })
        }
        isDeactivatePending={deactivateMutation.isPending}
      />

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

// ---------------------------------------------------------------------------
// Combined page
// ---------------------------------------------------------------------------

export default function ManageUsers() {
  const { tab } = useParams<{ tab: string }>();
  const navigate = useNavigate();

  const activeTab: ActiveTab = tab === "teachers" ? "teachers" : "students";

  const tabs: { id: ActiveTab; label: string; icon: typeof Users }[] = [
    { id: "students", label: "الطلاب", icon: Users },
    { id: "teachers", label: "المعلمين", icon: UserCog },
  ];

  return (
    <div className="space-y-6" dir="rtl">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          إدارة الطلاب والمعلمين
        </h1>
        <p className="text-gray-600 mt-1">
          عرض وإدارة الطلاب والمعلمين المسجلين في المؤسسة
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => navigate(`../${id}`, { relative: "path" })}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === id
                ? "bg-white text-[#8B5CF6] shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "students" ? <StudentsSection /> : <TeachersSection />}
    </div>
  );
}
