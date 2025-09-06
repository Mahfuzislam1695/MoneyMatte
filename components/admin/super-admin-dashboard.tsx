"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Users,
  DollarSign,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  Shield,
  Activity,
  Database,
  Globe,
  Settings,
  FileText,
  Building2,
  Clock,
  CheckCircle,
} from "lucide-react"

export function SuperAdminDashboard() {
  // Sample data for charts
  const transactionData = [
    { name: "Jan", transactions: 45000, volume: 2400000 },
    { name: "Feb", transactions: 52000, volume: 2800000 },
    { name: "Mar", transactions: 48000, volume: 2600000 },
    { name: "Apr", transactions: 61000, volume: 3200000 },
    { name: "May", transactions: 55000, volume: 2900000 },
    { name: "Jun", transactions: 67000, volume: 3500000 },
  ]

  const userGrowthData = [
    { name: "Week 1", users: 1200 },
    { name: "Week 2", users: 1350 },
    { name: "Week 3", users: 1180 },
    { name: "Week 4", users: 1420 },
  ]

  const riskDistribution = [
    { name: "Low Risk", value: 75, color: "#d97706" },
    { name: "Medium Risk", value: 20, color: "#f97316" },
    { name: "High Risk", value: 5, color: "#dc2626" },
  ]

  const systemAlerts = [
    {
      id: 1,
      type: "security",
      message: "Multiple failed login attempts detected",
      severity: "high",
      time: "5 minutes ago",
    },
    {
      id: 2,
      type: "compliance",
      message: "Daily AML report ready for review",
      severity: "medium",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "system",
      message: "Database backup completed successfully",
      severity: "low",
      time: "2 hours ago",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      action: "New admin account created",
      user: "Super Admin",
      time: "10 minutes ago",
      type: "user-management",
    },
    {
      id: 2,
      action: "Transaction limit updated",
      user: "System Config",
      time: "30 minutes ago",
      type: "system-config",
    },
    {
      id: 3,
      action: "Merchant approval processed",
      user: "Admin User",
      time: "1 hour ago",
      type: "merchant",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">System governance, compliance, and analytics overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-transparent">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            System Settings
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">125,847</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Volume</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">৳45.2M</div>
            <p className="text-xs text-muted-foreground">+8.2% from yesterday</p>
            <Progress value={82} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">8,432</div>
            <p className="text-xs text-muted-foreground">৳2.1B total portfolio</p>
            <Progress value={68} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">99.8%</div>
            <p className="text-xs text-muted-foreground">Uptime last 30 days</p>
            <Progress value={99.8} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Transaction Volume Trends</CardTitle>
            <CardDescription>Monthly transaction count and volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={transactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="transactions" fill="#d97706" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Weekly new user registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Risk Analysis and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Risk Distribution
            </CardTitle>
            <CardDescription>Current risk assessment breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {riskDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              System Alerts
            </CardTitle>
            <CardDescription>Recent security and compliance alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                        {alert.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <p className="text-sm text-foreground">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Alerts
            </Button>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest admin and system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">by {activity.user}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View Activity Log
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used super admin functions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="governance" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="governance">Governance</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="governance" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Users className="w-6 h-6" />
                  <span className="text-sm">Manage Users</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Shield className="w-6 h-6" />
                  <span className="text-sm">Role Permissions</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Building2 className="w-6 h-6" />
                  <span className="text-sm">Merchant Approval</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Settings className="w-6 h-6" />
                  <span className="text-sm">System Config</span>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="compliance" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <FileText className="w-6 h-6" />
                  <span className="text-sm">AML Reports</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <AlertTriangle className="w-6 h-6" />
                  <span className="text-sm">Risk Monitoring</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-sm">Audit Logs</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Globe className="w-6 h-6" />
                  <span className="text-sm">Regulatory</span>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="system" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Database className="w-6 h-6" />
                  <span className="text-sm">Database</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Activity className="w-6 h-6" />
                  <span className="text-sm">Performance</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Shield className="w-6 h-6" />
                  <span className="text-sm">Security</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Settings className="w-6 h-6" />
                  <span className="text-sm">Integrations</span>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="reports" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <TrendingUp className="w-6 h-6" />
                  <span className="text-sm">Analytics</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <DollarSign className="w-6 h-6" />
                  <span className="text-sm">Financial</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Users className="w-6 h-6" />
                  <span className="text-sm">User Reports</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <CreditCard className="w-6 h-6" />
                  <span className="text-sm">Loan Portfolio</span>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
