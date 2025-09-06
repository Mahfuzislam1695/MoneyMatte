import { AdminLayout } from "@/components/admin/admin-layout"
import { SuperAdminDashboard } from "@/components/admin/super-admin-dashboard"

export default function SuperAdminPage() {
  return (
    <AdminLayout userRole="super-admin" currentPage="dashboard">
      <SuperAdminDashboard />
    </AdminLayout>
  )
}
