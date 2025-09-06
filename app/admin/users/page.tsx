import { AdminLayout } from "@/components/admin/admin-layout"
import { UserRoleManagement } from "@/components/admin/user-role-management"

export default function UserManagementPage() {
  return (
    <AdminLayout userRole="super-admin" currentPage="users">
      <UserRoleManagement />
    </AdminLayout>
  )
}
