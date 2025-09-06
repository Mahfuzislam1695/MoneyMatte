import { AdminLayout } from "@/components/admin/admin-layout"
import { KYCVerification } from "@/components/admin/kyc-verification"

export default function KYCVerificationPage() {
  return (
    <AdminLayout userRole="admin" currentPage="kyc">
      <KYCVerification />
    </AdminLayout>
  )
}
