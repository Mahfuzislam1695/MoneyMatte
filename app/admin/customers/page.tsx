import { AdminLayout } from "@/components/admin/admin-layout"
import { CustomerSupport } from "@/components/admin/customer-support"

export default function CustomerSupportPage() {
  return (
    <AdminLayout userRole="admin" currentPage="customers">
      <CustomerSupport />
    </AdminLayout>
  )
}
