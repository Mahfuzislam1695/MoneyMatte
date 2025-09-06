import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, FileCheck, CreditCard, AlertCircle, TrendingUp, Clock } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <AdminLayout userRole="admin" currentPage="dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Daily operations and customer support overview</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending KYC</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">24</div>
              <p className="text-xs text-muted-foreground">+3 from yesterday</p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">12</div>
              <p className="text-xs text-muted-foreground">-2 from yesterday</p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loan Applications</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">8</div>
              <p className="text-xs text-muted-foreground">+1 from yesterday</p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Urgent Issues</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">3</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent KYC Submissions
              </CardTitle>
              <CardDescription>Latest identity verification requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "John Doe", type: "NID", status: "pending", time: "2 hours ago" },
                { name: "Sarah Khan", type: "Passport", status: "review", time: "4 hours ago" },
                { name: "Ahmed Ali", type: "Driving License", status: "pending", time: "6 hours ago" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.type} • {item.time}
                    </p>
                  </div>
                  <Badge variant={item.status === "pending" ? "secondary" : "outline"}>{item.status}</Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                View All KYC Requests
              </Button>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Support Queue
              </CardTitle>
              <CardDescription>Customer support tickets requiring attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { ticket: "#1234", issue: "Transaction Failed", priority: "high", time: "1 hour ago" },
                { ticket: "#1235", issue: "Account Access", priority: "medium", time: "3 hours ago" },
                { ticket: "#1236", issue: "KYC Question", priority: "low", time: "5 hours ago" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{item.ticket}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.issue} • {item.time}
                    </p>
                  </div>
                  <Badge
                    variant={
                      item.priority === "high" ? "destructive" : item.priority === "medium" ? "secondary" : "outline"
                    }
                  >
                    {item.priority}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                View All Tickets
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
