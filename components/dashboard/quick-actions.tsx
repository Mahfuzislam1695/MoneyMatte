"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeftRight, Smartphone, QrCode, Receipt, CreditCard, PiggyBank, TrendingUp, Building } from "lucide-react"

interface QuickActionsProps {
  onActionClick: (action: string) => void
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  const quickActions = [
    {
      id: "transfer",
      label: "Send Money",
      description: "Bank transfer",
      icon: ArrowLeftRight,
      color: "bg-primary/10 text-primary",
      action: "transfers",
    },
    {
      id: "mobile",
      label: "Mobile Wallet",
      description: "bKash, Nagad",
      icon: Smartphone,
      color: "bg-accent/10 text-accent",
      action: "transfers",
    },
    {
      id: "qr",
      label: "QR Payment",
      description: "Scan & pay",
      icon: QrCode,
      color: "bg-primary/10 text-primary",
      action: "payments",
    },
    {
      id: "bills",
      label: "Pay Bills",
      description: "Utilities & more",
      icon: Receipt,
      color: "bg-yellow-100 text-yellow-700",
      action: "payments",
    },
    {
      id: "loan",
      label: "Apply Loan",
      description: "Quick approval",
      icon: CreditCard,
      color: "bg-blue-100 text-blue-700",
      action: "loans",
    },
    {
      id: "deposit",
      label: "Open Deposit",
      description: "FDR, DPS",
      icon: PiggyBank,
      color: "bg-green-100 text-green-700",
      action: "deposits",
    },
    {
      id: "invest",
      label: "Invest",
      description: "Grow money",
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-700",
      action: "investments",
    },
    {
      id: "branch",
      label: "Find Branch",
      description: "Locations",
      icon: Building,
      color: "bg-gray-100 text-gray-700",
      action: "settings",
    },
  ]

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.id}
                variant="ghost"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-accent/50"
                onClick={() => onActionClick(action.action)}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
