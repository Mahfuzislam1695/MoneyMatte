import { AdminLayout } from "@/components/admin/admin-layout"
import { LoanApprovals } from "@/components/admin/loan-approvals"

export default function LoanApprovalsPage() {
  return (
    <AdminLayout userRole="admin" currentPage="loans">
      <LoanApprovals />
    </AdminLayout>
  )
}
