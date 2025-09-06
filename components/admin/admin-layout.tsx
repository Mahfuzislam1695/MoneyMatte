"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  Home,
  Users,
  CreditCard,
  FileText,
  Settings,
  Shield,
  BarChart3,
  LogOut,
  Bell,
  Search,
  Building2,
  Database,
  UserCheck,
  TrendingUp,
  Lock,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface AdminLayoutProps {
  children: React.ReactNode
  userRole: "admin" | "super-admin"
  currentPage?: string
}

export function AdminLayout({ children, userRole, currentPage = "dashboard" }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()

  const adminMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/admin/dashboard" },
    { id: "customers", label: "Customer Support", icon: Users, href: "/admin/customers" },
    { id: "kyc", label: "KYC Verification", icon: FileText, href: "/admin/kyc" },
    { id: "loans", label: "Loan Approvals", icon: CreditCard, href: "/admin/loans" },
  ]

  const superAdminMenuItems = [
    { id: "super-admin", label: "Super Admin Dashboard", icon: Home, href: "/admin/super-admin" },
    { id: "users", label: "User & Role Management", icon: Users, href: "/admin/users" },
    { id: "system", label: "System Configuration", icon: Settings, href: "/admin/system" },
    { id: "compliance", label: "Compliance & Analytics", icon: Shield, href: "/admin/compliance" },
    { id: "customers", label: "Customer Support", icon: UserCheck, href: "/admin/customers" },
    { id: "kyc", label: "KYC Verification", icon: FileText, href: "/admin/kyc" },
    { id: "loans", label: "Loan Management", icon: CreditCard, href: "/admin/loans" },
    { id: "products", label: "Financial Products", icon: Database, href: "/admin/products" },
    { id: "merchants", label: "Merchant Management", icon: Building2, href: "/admin/merchants" },
    { id: "analytics", label: "Reports & Analytics", icon: BarChart3, href: "/admin/analytics" },
    { id: "security", label: "Security & Infrastructure", icon: Lock, href: "/admin/security" },
  ]

  const menuItems = userRole === "super-admin" ? superAdminMenuItems : adminMenuItems

  const handleLogout = () => {
    router.push("/admin/login")
  }

  const handleGoToApp = () => {
    router.push("/dashboard")
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-sidebar-foreground">MoneyMatte</h2>
            <Badge variant={userRole === "super-admin" ? "default" : "secondary"} className="text-xs">
              {userRole === "super-admin" ? "Super Admin" : "Admin"}
            </Badge>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-3 ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/10"
              }`}
              onClick={() => {
                router.push(item.href)
                setIsSidebarOpen(false)
              }}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-3 text-sidebar-foreground border-sidebar-border bg-transparent"
          onClick={handleGoToApp}
        >
          <TrendingUp className="w-5 h-5" />
          Go to Main App
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-card border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <Sidebar />
                </SheetContent>
              </Sheet>

              <div className="hidden sm:flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Search admin panel...</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>

              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="hidden sm:inline text-foreground font-medium">
                  {userRole === "super-admin" ? "Super Admin" : "Admin User"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
