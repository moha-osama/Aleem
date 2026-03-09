import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ChildProfileCard from "./ChildProfileCard";
import AddChildProfile from "./AddChildProfile";
import { useAuth, useRegisterStudent } from "@/features/auth";
import type { RegisterStudentRequest } from "@/features/auth";
import {
  useLinkParentChild,
  useParentChildren,
  useAssignSchoolToChild,
} from "@/features/parents";
import { getDashboardConfig } from "./dashboardConfig";

export default function ChildrenProfiles() {
  const { role } = useAuth();
  const config = getDashboardConfig(role);
  const [showAddChild, setShowAddChild] = useState(false);

  const childrenQuery = useParentChildren();
  const registerStudentMutation = useRegisterStudent();
  const linkChildMutation = useLinkParentChild();
  const assignSchoolMutation = useAssignSchoolToChild();

  const isSubmitting =
    registerStudentMutation.isPending ||
    linkChildMutation.isPending ||
    assignSchoolMutation.isPending;

  const handleAddChild = async (
    data: RegisterStudentRequest,
    schoolId?: number,
  ) => {
    await registerStudentMutation.mutateAsync(data);
    const { student_id } = await linkChildMutation.mutateAsync({
      username: data.username,
    });
    if (schoolId) {
      await assignSchoolMutation.mutateAsync({
        childId: student_id,
        school_id: schoolId,
      });
    }
    setShowAddChild(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ملفات الطلاب
          </h1>
          <p className="text-gray-600">{config.membersPageSubtitle}</p>
        </div>
        {role !== "teacher" && (
          <Button
            onClick={() => setShowAddChild(true)}
            disabled={isSubmitting}
            className="bg-linear-to-r from-[#8B5CF6] to-[#EC4899] hover:from-[#7C3AED] hover:to-[#DB2777] text-white"
          >
            <Plus className="w-5 h-5 ml-2" />
            {config.addMemberLabel}
          </Button>
        )}
      </div>
      {/* 
      {childrenQuery.error && (
        <p className="text-sm text-red-600 text-right" role="alert">
          {toApiErrorMessage(childrenQuery.error)}
        </p>
      )} */}
      {/* 
      {linkChildMutation.error && (
        <p className="text-sm text-red-600 text-right" role="alert">
          {toApiErrorMessage(linkChildMutation.error)}
        </p>
      )} */}

      {/* {linkChildMutation.isSuccess && linkChildMutation.data?.detail && (
        <p className="text-sm text-green-700 text-right" role="status">
          {linkChildMutation.data.detail}
        </p>
      )} */}

      {/* Children Grid */}
      {childrenQuery.isLoading ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600">
          جاري تحميل ملفات الطلاب...
        </div>
      ) : childrenQuery.data && childrenQuery.data.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {childrenQuery.data.map((child) => (
            <ChildProfileCard key={child.user_id} child={child} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">
          لا توجد ملفات أطفال مرتبطة بهذا الحساب حتى الآن.
        </div>
      )}

      {/* Add Child Dialog */}
      <AddChildProfile
        open={showAddChild}
        onClose={() => setShowAddChild(false)}
        onAdd={handleAddChild}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
