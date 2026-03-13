import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, UserX } from "lucide-react";
import type { SchoolUserSummary } from "@/features/auth";
import { displayName } from "@/features/auth";

interface SchoolUsersTableProps {
  items: SchoolUserSummary[];
  totalCount: number;
  isLoading: boolean;
  emptyMessage: string;
  countLabel: string;
  onSelectUser?: (userId: number) => void;
  onEditUser?: (userId: number) => void;
  canDeactivate?: boolean;
  onDeactivate?: (userId: number) => void;
  isDeactivatePending?: boolean;
}

export default function SchoolUsersTable({
  items,
  totalCount,
  isLoading,
  emptyMessage,
  countLabel,
  onSelectUser,
  onEditUser,
  canDeactivate = false,
  onDeactivate,
  isDeactivatePending = false,
}: SchoolUsersTableProps) {
  const editHandler = onEditUser ?? onSelectUser;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                الاسم
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                اسم المستخدم
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                البريد الإلكتروني
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                الحالة
              </th>
              {(canDeactivate || onDeactivate) && (
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  الإجراءات
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((user) => (
              <tr
                key={user.id}
                className={`hover:bg-gray-50 transition-colors ${onSelectUser ? "cursor-pointer" : ""}`}
                onClick={() => onSelectUser?.(user.id)}
              >
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">
                    {displayName(user)}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">{user.username}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <Badge
                    variant={user.is_active === false ? "secondary" : "default"}
                    className={
                      user.is_active === false
                        ? ""
                        : "bg-green-100 text-green-700 hover:bg-green-100"
                    }
                  >
                    {user.is_active === false ? "غير نشط" : "نشط"}
                  </Badge>
                </td>
                {(canDeactivate || onDeactivate) && (
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-start">
                      {editHandler && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={(event) => {
                            event.stopPropagation();
                            editHandler(user.id);
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      )}

                      {canDeactivate && onDeactivate && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          disabled={isDeactivatePending}
                          onClick={(event) => {
                            event.stopPropagation();
                            onDeactivate(user.id);
                          }}
                        >
                          <UserX className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!isLoading && items.length === 0 && (
        <div className="px-6 py-8 text-center text-sm text-gray-500 border-t border-gray-200">
          {emptyMessage}
        </div>
      )}

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
        عرض {items.length} من {totalCount} {countLabel}
      </div>
    </div>
  );
}
