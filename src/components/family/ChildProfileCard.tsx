import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, CalendarDays, Pencil, User } from "lucide-react";
import type { ParentChild } from "@/features/parents";
import EditChildProfile from "./EditChildProfile";

interface ChildProfileCardProps {
  child: ParentChild;
}

export default function ChildProfileCard({ child }: ChildProfileCardProps) {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <Card className="p-6 hover:shadow-lg transition-shadow" dir="rtl">
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16 border-2 border-[#8B5CF6]">
            <AvatarImage alt={child.full_name} />
            <AvatarFallback className="bg-linear-to-br from-[#8B5CF6] to-[#F59E0B] text-white text-xl">
              {child.full_name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {child.full_name}
                </h3>
                <p className="text-sm text-gray-600">@{child.username}</p>
              </div>
              {/* <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEdit(true)}
                className="gap-1 text-[#8B5CF6] border-[#8B5CF6] hover:bg-[#8B5CF6]/10"
              >
                <Pencil className="w-3.5 h-3.5" />
                تعديل
              </Button> */}
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              <Badge variant="secondary" className="bg-[#F6E9F4]">
                <User className="w-3 h-3 ml-1" />
                ID: {child.user_id}
              </Badge>
              <Badge variant="secondary" className="bg-[#FEF3C7]">
                <BookOpen className="w-3 h-3 ml-1" />
                {child.education_level}
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {child.stage}
              </Badge>
            </div>

            <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
              <div className="flex items-center gap-2 mb-1">
                <CalendarDays className="w-4 h-4 text-gray-500" />
                <span>العام الدراسي</span>
              </div>
              <p className="font-medium">{child.education_year}</p>
            </div>
          </div>
        </div>
      </Card>

      <EditChildProfile
        open={showEdit}
        onClose={() => setShowEdit(false)}
        child={child}
      />
    </>
  );
}
