import { AdminLayout } from "@/components/admin/admin-layout"
import { ComplianceAnalytics } from "@/components/admin/compliance-analytics"

export default function ComplianceAnalyticsPage() {
  return (
    <AdminLayout userRole="super-admin" currentPage="compliance">
      <ComplianceAnalytics />
    </AdminLayout>
  )
}
