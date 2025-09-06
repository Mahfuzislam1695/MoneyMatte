"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  AreaChart,
  Area,
} from "recharts"
import { Shield, AlertTriangle, FileText, DollarSign, CreditCard, Eye, Download, Search, Activity } from "lucide-react"

export function ComplianceAnalytics() {
  const [activeTab, setActiveTab] = useState("compliance")
  const [selectedDateRange, setSelectedDateRange] = useState("7d")

  // Sample data for charts
  const transactionVolumeData = [
    { date: "Jan 1", volume: 2400000, transactions: 1200, suspicious: 5 },
    { date: "Jan 2", volume: 2800000, transactions: 1400, suspicious: 3 },
    { date: "Jan 3", volume: 2600000, transactions: 1300, suspicious: 7 },
    { date: "Jan 4", volume: 3200000, transactions: 1600, suspicious: 2 },
    { date: "Jan 5", volume: 2900000, transactions: 1450, suspicious: 4 },
    { date: "Jan 6", volume: 3500000, transactions: 1750, suspicious: 6 },
    { date: "Jan 7", volume: 3100000, transactions: 1550, suspicious: 3 },
  ]

  const riskDistributionData = [
    { name: "Low Risk", value: 75, color: "#d97706" },
    { name: "Medium Risk", value: 20, color: "#f97316" },
    { name: "High Risk", value: 5, color: "#dc2626" },
  ]

  const loanPortfolioData = [
    { category: "Personal Loans", performing: 85, npl: 15, amount: 1200000000 },
    { category: "SME Loans", performing: 78, npl: 22, amount: 2500000000 },
    { category: "Education Loans", performing: 92, npl: 8, amount: 800000000 },
    { category: "Home Loans", performing: 88, npl: 12, amount: 3200000000 },
  ]

  // Audit Logs
  const auditLogs = [
    {
      id: "AUD-001",
      timestamp: "2024-01-15 10:30:15",
      user: "john.smith@moneymatte.com",
      action: "User Account Created",
      details: "Created admin account for Sarah Johnson",
      ipAddress: "192.168.1.100",
      riskLevel: "low",
    },
    {
      id: "AUD-002",
      timestamp: "2024-01-15 10:25:42",
      user: "sarah.johnson@moneymatte.com",
      action: "Transaction Limit Modified",
      details: "Updated daily limit from ৳300K to ৳500K for user ID: USR-12345",
      ipAddress: "192.168.1.105",
      riskLevel: "medium",
    },
    {
      id: "AUD-003",
      timestamp: "2024-01-15 10:20:18",
      user: "system@moneymatte.com",
      action: "Suspicious Transaction Flagged",
      details: "Transaction TXN-789456 flagged for manual review - Amount: ৳850K",
      ipAddress: "system",
      riskLevel: "high",
    },
  ]

  // AML Alerts
  const amlAlerts = [
    {
      id: "AML-001",
      type: "Structuring",
      customer: "Ahmed Rahman",
      amount: "৳950,000",
      description: "Multiple transactions just below reporting threshold",
      status: "investigating",
      created: "2024-01-15 09:30 AM",
      priority: "high",
    },
    {
      id: "AML-002",
      type: "Unusual Pattern",
      customer: "Lisa Chen",
      amount: "৳2,500,000",
      description: "Sudden increase in transaction volume",
      status: "cleared",
      created: "2024-01-15 08:15 AM",
      priority: "medium",
    },
    {
      id: "AML-003",
      type: "PEP Match",
      customer: "Mohammad Ali",
      amount: "৳1,200,000",
      description: "Customer matches Politically Exposed Person list",
      status: "pending",
      created: "2024-01-15 07:45 AM",
      priority: "high",
    },
  ]

  // Regulatory Reports
  const regulatoryReports = [
    {
      name: "Daily Transaction Report",
      type: "Bangladesh Bank",
      frequency: "Daily",
      lastGenerated: "2024-01-15 06:00 AM",
      status: "submitted",
      dueDate: "2024-01-16 06:00 AM",
    },
    {
      name: "AML Compliance Report",
      type: "BFIU",
      frequency: "Monthly",
      lastGenerated: "2024-01-01 12:00 PM",
      status: "pending",
      dueDate: "2024-01-31 11:59 PM",
    },
    {
      name: "Suspicious Transaction Report",
      type: "BFIU",
      frequency: "As Required",
      lastGenerated: "2024-01-14 03:30 PM",
      status: "submitted",
      dueDate: "Within 7 days of detection",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
      case "cleared":
        return "default"
      case "pending":
      case "investigating":
        return "secondary"
      case "overdue":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "default"
      case "medium":
        return "secondary"
      case "high":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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
          <h2 className="text-2xl font-bold text-foreground">Compliance & Analytics</h2>
          <p className="text-muted-foreground">Monitor compliance, risk, and generate regulatory reports</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AML Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">12</div>
            <p className="text-xs text-muted-foreground">3 high priority</p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Volume</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">৳3.1M</div>
            <p className="text-xs text-muted-foreground">+8.2% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">7.2</div>
            <p className="text-xs text-muted-foreground">Low risk threshold</p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">98.5%</div>
            <p className="text-xs text-muted-foreground">Excellent compliance</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="compliance">AML/CFT</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="reports">Regulatory Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="portfolio">Loan Portfolio</TabsTrigger>
        </TabsList>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  AML Alerts
                </CardTitle>
                <CardDescription>Anti-Money Laundering monitoring and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {amlAlerts.map((alert) => (
                    <div key={alert.id} className="border border-border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={getPriorityColor(alert.priority)}>{alert.priority}</Badge>
                          <Badge variant="outline">{alert.type}</Badge>
                        </div>
                        <Badge variant={getStatusColor(alert.status)}>{alert.status}</Badge>
                      </div>
                      <h4 className="font-medium text-foreground">{alert.customer}</h4>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                        <span>{alert.amount}</span>
                        <span>{alert.created}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View All AML Alerts
                </Button>
              </CardContent>
            </Card>

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
                      data={riskDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {riskDistributionData.map((item, index) => (
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
          </div>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Transaction Monitoring</CardTitle>
              <CardDescription>Real-time transaction volume and suspicious activity tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={transactionVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="volume"
                    stackId="1"
                    stroke="#d97706"
                    fill="#d97706"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="suspicious"
                    stackId="2"
                    stroke="#dc2626"
                    fill="#dc2626"
                    fillOpacity={0.8}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Audit Logs
                  </CardTitle>
                  <CardDescription>Complete audit trail of user and admin activities</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input placeholder="Search audit logs..." className="pl-10 w-64" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell className="font-medium">{log.action}</TableCell>
                      <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                      <TableCell>
                        <Badge variant={getRiskColor(log.riskLevel)}>{log.riskLevel}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Regulatory Reports
              </CardTitle>
              <CardDescription>Bangladesh Bank and BFIU compliance reporting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regulatoryReports.map((report, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-foreground">{report.name}</h4>
                          <Badge variant={getStatusColor(report.status)}>{report.status}</Badge>
                          <Badge variant="outline">{report.type}</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Frequency: </span>
                            {report.frequency}
                          </div>
                          <div>
                            <span className="font-medium">Last Generated: </span>
                            {report.lastGenerated}
                          </div>
                          <div>
                            <span className="font-medium">Due Date: </span>
                            {report.dueDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">
                <FileText className="w-4 h-4 mr-2" />
                Generate New Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Transaction Volume Trends</CardTitle>
                <CardDescription>Daily transaction volume and count</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={transactionVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="volume" fill="#d97706" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Income from various services</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={transactionVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="transactions" stroke="#f97316" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="glass">
            <CardHeader>
              <CardTitle>High-Risk Transaction Analysis</CardTitle>
              <CardDescription>Detailed analysis of flagged transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="border border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Flagged Today</p>
                        <p className="text-2xl font-bold text-destructive">23</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-destructive" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Under Review</p>
                        <p className="text-2xl font-bold text-secondary">15</p>
                      </div>
                      <Eye className="w-8 h-8 text-secondary" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">False Positives</p>
                        <p className="text-2xl font-bold text-primary">8</p>
                      </div>
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Loan Portfolio Health
              </CardTitle>
              <CardDescription>Performance analysis of loan categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {loanPortfolioData.map((category, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-foreground">{category.category}</h4>
                      <div className="text-sm text-muted-foreground">
                        Portfolio: ৳{(category.amount / 1000000000).toFixed(1)}B
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-muted-foreground">Performing Loans</span>
                          <span className="text-sm font-medium text-primary">{category.performing}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${category.performing}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-muted-foreground">Non-Performing Loans</span>
                          <span className="text-sm font-medium text-destructive">{category.npl}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-destructive h-2 rounded-full" style={{ width: `${category.npl}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Portfolio Distribution</CardTitle>
                <CardDescription>Loan amount by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={loanPortfolioData.map((item, index) => ({
                        name: item.category,
                        value: item.amount,
                        color: ["#d97706", "#f97316", "#dc2626", "#059669"][index],
                      }))}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {loanPortfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={["#d97706", "#f97316", "#dc2626", "#059669"][index]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => `৳${(value / 1000000000).toFixed(1)}B`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>NPL Trends</CardTitle>
                <CardDescription>Non-performing loan ratio over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart
                    data={[
                      { month: "Jul", npl: 12 },
                      { month: "Aug", npl: 14 },
                      { month: "Sep", npl: 11 },
                      { month: "Oct", npl: 13 },
                      { month: "Nov", npl: 15 },
                      { month: "Dec", npl: 12 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="npl" stroke="#dc2626" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
