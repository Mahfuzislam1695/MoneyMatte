"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash2, Shield, Users, Eye, Lock, Unlock, Clock, CheckCircle } from "lucide-react"

export function UserRoleManagement() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [selectedRole, setSelectedRole] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false)
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false)

  const adminUsers = [
    {
      id: "ADM-001",
      name: "John Smith",
      email: "john.smith@moneymatte.com",
      role: "Super Admin",
      status: "active",
      lastLogin: "2024-01-15 10:30 AM",
      created: "2024-01-01",
      permissions: ["all"],
      department: "IT Operations",
      phone: "+880 1712-345678",
    },
    {
      id: "ADM-002",
      name: "Sarah Johnson",
      email: "sarah.johnson@moneymatte.com",
      role: "Admin",
      status: "active",
      lastLogin: "2024-01-15 09:15 AM",
      created: "2024-01-05",
      permissions: ["customer-support", "kyc-verification", "loan-approval"],
      department: "Customer Operations",
      phone: "+880 1812-345678",
    },
    {
      id: "ADM-003",
      name: "Ahmed Rahman",
      email: "ahmed.rahman@moneymatte.com",
      role: "Compliance Officer",
      status: "active",
      lastLogin: "2024-01-15 08:45 AM",
      created: "2024-01-10",
      permissions: ["compliance-monitoring", "audit-logs", "risk-assessment"],
      department: "Compliance",
      phone: "+880 1912-345678",
    },
    {
      id: "ADM-004",
      name: "Lisa Chen",
      email: "lisa.chen@moneymatte.com",
      role: "Risk Manager",
      status: "inactive",
      lastLogin: "2024-01-10 05:20 PM",
      created: "2023-12-15",
      permissions: ["risk-monitoring", "fraud-detection"],
      department: "Risk Management",
      phone: "+880 1612-345678",
    },
  ]

  const roles = [
    {
      id: "ROLE-001",
      name: "Super Admin",
      description: "Full system access and control",
      permissions: [
        "user-management",
        "role-management",
        "system-configuration",
        "compliance-monitoring",
        "financial-products",
        "merchant-management",
        "analytics",
        "security-infrastructure",
      ],
      userCount: 2,
      created: "2024-01-01",
    },
    {
      id: "ROLE-002",
      name: "Admin",
      description: "Daily operations management",
      permissions: ["customer-support", "kyc-verification", "loan-approval"],
      userCount: 8,
      created: "2024-01-01",
    },
    {
      id: "ROLE-003",
      name: "Compliance Officer",
      description: "Compliance and regulatory oversight",
      permissions: ["compliance-monitoring", "audit-logs", "risk-assessment", "regulatory-reports"],
      userCount: 3,
      created: "2024-01-01",
    },
    {
      id: "ROLE-004",
      name: "Risk Manager",
      description: "Risk assessment and fraud detection",
      permissions: ["risk-monitoring", "fraud-detection", "transaction-analysis"],
      userCount: 2,
      created: "2024-01-01",
    },
  ]

  const allPermissions = [
    { id: "user-management", name: "User Management", category: "Administration" },
    { id: "role-management", name: "Role Management", category: "Administration" },
    { id: "system-configuration", name: "System Configuration", category: "Administration" },
    { id: "customer-support", name: "Customer Support", category: "Operations" },
    { id: "kyc-verification", name: "KYC Verification", category: "Operations" },
    { id: "loan-approval", name: "Loan Approval", category: "Operations" },
    { id: "compliance-monitoring", name: "Compliance Monitoring", category: "Compliance" },
    { id: "audit-logs", name: "Audit Logs", category: "Compliance" },
    { id: "risk-assessment", name: "Risk Assessment", category: "Risk Management" },
    { id: "fraud-detection", name: "Fraud Detection", category: "Risk Management" },
    { id: "financial-products", name: "Financial Products", category: "Products" },
    { id: "merchant-management", name: "Merchant Management", category: "Partners" },
    { id: "analytics", name: "Analytics & Reports", category: "Analytics" },
    { id: "security-infrastructure", name: "Security & Infrastructure", category: "Security" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      case "suspended":
        return "destructive"
      default:
        return "outline"
    }
  }

  const handleCreateUser = () => {
    console.log("[v0] Creating new admin user")
    setIsCreateUserOpen(false)
  }

  const handleCreateRole = () => {
    console.log("[v0] Creating new role")
    setIsCreateRoleOpen(false)
  }

  const handleDeactivateUser = (userId: string) => {
    console.log("[v0] Deactivating user:", userId)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">User & Role Management</h2>
          <p className="text-muted-foreground">Manage admin accounts, roles, and permissions</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search users or roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Management Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Admins</p>
                <p className="text-2xl font-bold text-primary">15</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-secondary">13</p>
              </div>
              <CheckCircle className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Roles</p>
                <p className="text-2xl font-bold text-accent">6</p>
              </div>
              <Shield className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
                <p className="text-2xl font-bold text-destructive">2</p>
              </div>
              <Clock className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Admin Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="approvals">Approval Workflows</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Admin Users</CardTitle>
                  <CardDescription>Manage administrator accounts and access</CardDescription>
                </div>
                <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Admin User
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Admin User</DialogTitle>
                      <DialogDescription>Add a new administrator to the system</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Enter full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="admin@moneymatte.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="+880 1712-345678" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="it">IT Operations</SelectItem>
                            <SelectItem value="customer">Customer Operations</SelectItem>
                            <SelectItem value="compliance">Compliance</SelectItem>
                            <SelectItem value="risk">Risk Management</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Assign Role</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.id} value={role.id}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Initial Status</Label>
                        <Select defaultValue="active">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <Button variant="outline" onClick={() => setIsCreateUserOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateUser}>Create Admin User</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(user.status)}>{user.status}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>User Details - {user.name}</DialogTitle>
                                <DialogDescription>View and manage user information</DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Full Name</Label>
                                  <p className="text-sm text-muted-foreground">{user.name}</p>
                                </div>
                                <div>
                                  <Label>Email</Label>
                                  <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                                <div>
                                  <Label>Phone</Label>
                                  <p className="text-sm text-muted-foreground">{user.phone}</p>
                                </div>
                                <div>
                                  <Label>Department</Label>
                                  <p className="text-sm text-muted-foreground">{user.department}</p>
                                </div>
                                <div>
                                  <Label>Role</Label>
                                  <Badge variant="outline">{user.role}</Badge>
                                </div>
                                <div>
                                  <Label>Status</Label>
                                  <Badge variant={getStatusColor(user.status)}>{user.status}</Badge>
                                </div>
                              </div>
                              <div>
                                <Label>Permissions</Label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {user.permissions.map((permission) => (
                                    <Badge key={permission} variant="secondary" className="text-xs">
                                      {permission}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex gap-2 mt-6">
                                <Button variant="outline" className="flex-1 bg-transparent">
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit User
                                </Button>
                                <Button
                                  variant="destructive"
                                  className="flex-1"
                                  onClick={() => handleDeactivateUser(user.id)}
                                >
                                  <Lock className="w-4 h-4 mr-2" />
                                  Deactivate
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            {user.status === "active" ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Roles & Permissions</CardTitle>
                  <CardDescription>Manage user roles and permission assignments</CardDescription>
                </div>
                <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Role
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Role</DialogTitle>
                      <DialogDescription>Define a new role with specific permissions</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="roleName">Role Name</Label>
                          <Input id="roleName" placeholder="Enter role name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="roleDescription">Description</Label>
                          <Input id="roleDescription" placeholder="Brief role description" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label>Permissions</Label>
                        <div className="space-y-4">
                          {Object.entries(
                            allPermissions.reduce(
                              (acc, permission) => {
                                if (!acc[permission.category]) {
                                  acc[permission.category] = []
                                }
                                acc[permission.category].push(permission)
                                return acc
                              },
                              {} as Record<string, typeof allPermissions>,
                            ),
                          ).map(([category, permissions]) => (
                            <div key={category} className="space-y-2">
                              <h4 className="font-medium text-sm">{category}</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {permissions.map((permission) => (
                                  <div key={permission.id} className="flex items-center space-x-2">
                                    <Switch id={permission.id} />
                                    <Label htmlFor={permission.id} className="text-sm">
                                      {permission.name}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <Button variant="outline" onClick={() => setIsCreateRoleOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateRole}>Create Role</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map((role) => (
                  <Card key={role.id} className="border border-border">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{role.name}</CardTitle>
                          <CardDescription>{role.description}</CardDescription>
                        </div>
                        <Badge variant="outline">{role.userCount} users</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium">Permissions</Label>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {role.permissions.slice(0, 3).map((permission) => (
                              <Badge key={permission} variant="secondary" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                            {role.permissions.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{role.permissions.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 bg-transparent"
                                onClick={() => setSelectedRole(role)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Role Details - {role.name}</DialogTitle>
                                <DialogDescription>View and manage role permissions</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Role Name</Label>
                                    <p className="text-sm text-muted-foreground">{role.name}</p>
                                  </div>
                                  <div>
                                    <Label>Users Assigned</Label>
                                    <p className="text-sm text-muted-foreground">{role.userCount} users</p>
                                  </div>
                                </div>
                                <div>
                                  <Label>Description</Label>
                                  <p className="text-sm text-muted-foreground">{role.description}</p>
                                </div>
                                <div>
                                  <Label>Permissions</Label>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {role.permissions.map((permission) => (
                                      <Badge key={permission} variant="secondary" className="text-xs">
                                        {permission}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2 mt-6">
                                <Button variant="outline" className="flex-1 bg-transparent">
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Role
                                </Button>
                                <Button variant="destructive" className="flex-1">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete Role
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Multi-Level Approval Workflows</CardTitle>
              <CardDescription>Configure approval processes for sensitive operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">User Account Creation</CardTitle>
                      <CardDescription>Approval required for new admin accounts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Require Super Admin Approval</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Email Notifications</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Auto-expire after 7 days</span>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">Role Modifications</CardTitle>
                      <CardDescription>Approval for permission changes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Dual Approval Required</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Audit Log Entry</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Immediate Effect</span>
                          <Switch />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">System Configuration</CardTitle>
                      <CardDescription>Critical system changes approval</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Multi-level Approval</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Change Window Required</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Rollback Plan Required</span>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">Financial Operations</CardTitle>
                      <CardDescription>High-value transaction approvals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Amount Threshold: ৳1M+</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Compliance Review</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Risk Assessment</span>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Pending Approvals</CardTitle>
                    <CardDescription>Current requests awaiting approval</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div>
                          <p className="font-medium">New Admin Account - Lisa Wong</p>
                          <p className="text-sm text-muted-foreground">Requested by: John Smith • 2 hours ago</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            Review
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div>
                          <p className="font-medium">Role Permission Update - Compliance Officer</p>
                          <p className="text-sm text-muted-foreground">Requested by: Sarah Johnson • 4 hours ago</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            Review
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
