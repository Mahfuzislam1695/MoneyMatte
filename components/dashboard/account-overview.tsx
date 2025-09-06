"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, TrendingUp, CreditCard, Wallet } from "lucide-react"

interface AccountOverviewProps {
  balance: number
  availableBalance: number
  accountNumber: string
  balanceVisible: boolean
  onToggleBalance: () => void
}

export function AccountOverview({
  balance,
  availableBalance,
  accountNumber,
  balanceVisible,
  onToggleBalance,
}: AccountOverviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const monthlyChange = 12.5 // Mock percentage change

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Main Balance Card */}
      <Card className="glass-strong md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
            <CardDescription>Account {accountNumber}</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onToggleBalance} className="h-8 w-8 p-0">
            {balanceVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-3xl font-bold">{balanceVisible ? formatCurrency(balance) : "৳ ••••••"}</div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-primary">+{monthlyChange}%</span>
                <span className="text-muted-foreground">this month</span>
              </div>
            </div>
            <div className="pt-2 border-t border-border/50">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Available Balance</span>
                <span className="font-medium">{balanceVisible ? formatCurrency(availableBalance) : "৳ ••••••"}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit Card */}
      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Credit Card</CardTitle>
          <CreditCard className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{balanceVisible ? formatCurrency(15000) : "৳ ••••••"}</div>
            <div className="text-xs text-muted-foreground">Available Credit</div>
            <Badge variant="outline" className="text-xs">
              Platinum Card
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Savings */}
      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings</CardTitle>
          <Wallet className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{balanceVisible ? formatCurrency(85000) : "৳ ••••••"}</div>
            <div className="text-xs text-muted-foreground">FDR + DPS</div>
            <div className="flex items-center space-x-1 text-xs">
              <TrendingUp className="w-3 h-3 text-primary" />
              <span className="text-primary">8.5% APY</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
