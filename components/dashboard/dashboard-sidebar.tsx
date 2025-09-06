"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  ArrowLeftRight,
  Receipt,
  TrendingUp,
  CreditCard,
  PiggyBank,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Smartphone,
  Building,
  Wallet,
  Banknote,
  QrCode,
  Users,
  Calculator,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface DashboardSidebarProps {
  activeView: string
  onViewChange: (view: string) => void
  isOpen: boolean
  onToggle: () => void
}

export function DashboardSidebar({ activeView, onViewChange, isOpen, onToggle }: DashboardSidebarProps) {
  const router = useRouter()

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      badge: null,
      route: "/dashboard",
    },
    {
      id: "services",
      label: "All Services",
      icon: Building,
      badge: null,
      route: "/services",
    },
    {
      id: "accounts",
      label: "Accounts",
      icon: Wallet,
      badge: null,
      route: "/dashboard",
    },
    {
      id: "transfers",
      label: "Fund Transfers",
      icon: ArrowLeftRight,
      badge: null,
      route: "/transfers",
    },
    {
      id: "payments",
      label: "Bill Payments",
      icon: Receipt,
      badge: "3",
      route: "/bill-payment",
    },
    {
      id: "qr-payments",
      label: "QR Payments",
      icon: QrCode,
      badge: null,
      route: "/qr-payments",
    },
    {
      id: "qr-transfer",
      label: "QR Transfer",
      icon: Smartphone,
      badge: null,
      route: "/qr-transfer",
    },
    {
      id: "beneficiaries",
      label: "Beneficiaries",
      icon: Users,
      badge: null,
      route: "/beneficiaries",
    },
    {
      id: "loans",
      label: "Online Loan",
      icon: Banknote,
      badge: "3",
      route: "/online-loan",
    },
    {
      id: "emi",
      label: "EMI Tracking",
      icon: Calculator,
      badge: null,
      route: "/emi-tracking",
    },
    {
      id: "deposits",
      label: "FDR & DPS",
      icon: PiggyBank,
      badge: null,
      route: "/fdr-dps",
    },
    {
      id: "investments",
      label: "Shonchoy Potro",
      icon: TrendingUp,
      badge: null,
      route: "/shonchoy-potro",
    },
    {
      id: "statements",
      label: "Statements",
      icon: FileText,
      badge: null,
      route: "/dashboard",
    },
  ]

  const bottomMenuItems = [
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
    {
      id: "help",
      label: "Help & Support",
      icon: HelpCircle,
    },
  ]

  const handleMenuClick = (item: any) => {
    onViewChange(item.id)
    if (item.route) {
      router.push(item.route)
    }
    if (window.innerWidth < 1024) onToggle()
  }

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden glass bg-background/80 backdrop-blur-sm"
        onClick={onToggle}
      >
        {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 glass-strong border-r border-border/50 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">MoneyMatte</h2>
                <p className="text-xs text-muted-foreground">Financial Platform</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeView === item.id

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start h-12 ${isActive ? "gradient-bg text-white" : "hover:bg-accent/50"}`}
                  onClick={() => handleMenuClick(item)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              )
            })}
          </div>

          {/* Quick Access */}
          <div className="p-4 border-t border-border/50">
            <div className="space-y-2 mb-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Quick Access</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="glass bg-transparent"
                  onClick={() => router.push("/qr-payments")}
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  QR Pay
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="glass bg-transparent"
                  onClick={() => router.push("/transfers")}
                >
                  <Building className="w-4 h-4 mr-2" />
                  Transfer
                </Button>
              </div>
            </div>

            {/* Bottom Menu */}
            <div className="space-y-1">
              {bottomMenuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="w-full justify-start h-10 hover:bg-accent/50"
                    onClick={() => {
                      onViewChange(item.id)
                      if (window.innerWidth < 1024) onToggle()
                    }}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                )
              })}
              <Button
                variant="ghost"
                className="w-full justify-start h-10 text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
