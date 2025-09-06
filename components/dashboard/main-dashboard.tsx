"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell, User } from "lucide-react"
import { DashboardSidebar } from "./dashboard-sidebar"
import { AccountOverview } from "./account-overview"
import { QuickActions } from "./quick-actions"
import { RecentTransactions } from "./recent-transactions"
import { FinancialSummary } from "./financial-summary"
import { ProfileManagement } from "../profile/profile-management"
import { AccountsInformation } from "./accounts-information"
import { FDRDPSStatus } from "./fdr-dps-status"
import { LoanStatus } from "./loan-status"
import { CreditCardStatus } from "./credit-card-status"

export function MainDashboard() {
  const [activeView, setActiveView] = useState("dashboard")
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock user data
  const userData = {
    name: "John Doe",
    accountNumber: "****1234",
    balance: 125750.5,
    availableBalance: 120250.5,
  }

  const renderContent = () => {
    switch (activeView) {
      case "profile":
        return <ProfileManagement onBack={() => setActiveView("dashboard")} />
      case "accounts":
        return (
          <AccountsInformation
            balanceVisible={balanceVisible}
            onToggleBalance={() => setBalanceVisible(!balanceVisible)}
          />
        )
      case "deposits":
        return <FDRDPSStatus balanceVisible={balanceVisible} />
      case "loans":
        return <LoanStatus balanceVisible={balanceVisible} />
      case "credit-cards":
        return (
          <CreditCardStatus
            balanceVisible={balanceVisible}
            onToggleBalance={() => setBalanceVisible(!balanceVisible)}
          />
        )
      case "transfers":
        return <div className="p-6">Transfer functionality coming soon...</div>
      case "payments":
        return <div className="p-6">Bill payments functionality coming soon...</div>
      case "investments":
        return <div className="p-6">Investment tools coming soon...</div>
      default:
        return (
          <div className="space-y-6">
            {/* Dashboard Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-balance">Welcome back, {userData.name}</h1>
                <p className="text-muted-foreground">Here's your financial overview for today</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" className="glass bg-transparent">
                  <Bell className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Notifications</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="glass bg-transparent"
                  onClick={() => setActiveView("profile")}
                >
                  <User className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Profile</span>
                </Button>
              </div>
            </div>

            {/* Account Overview */}
            <AccountOverview
              balance={userData.balance}
              availableBalance={userData.availableBalance}
              accountNumber={userData.accountNumber}
              balanceVisible={balanceVisible}
              onToggleBalance={() => setBalanceVisible(!balanceVisible)}
            />

            {/* Quick Actions */}
            <QuickActions onActionClick={setActiveView} />

            {/* Financial Summary and Recent Transactions */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecentTransactions />
              </div>
              <div className="lg:col-span-1">
                <FinancialSummary />
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen gradient-bg-subtle">
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar
          activeView={activeView}
          onViewChange={setActiveView}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <div className="p-6">{renderContent()}</div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  )
}
