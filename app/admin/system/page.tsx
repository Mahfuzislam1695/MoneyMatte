import { AdminLayout } from "@/components/admin/admin-layout"
import { SystemConfiguration } from "@/components/admin/system-configuration"

export default function SystemConfigurationPage() {
  return (
    <AdminLayout userRole="super-admin" currentPage="system">
      <SystemConfiguration />
    </AdminLayout>
  )
}
