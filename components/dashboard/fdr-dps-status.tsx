"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Calendar, Bell, PiggyBank, Clock, Target } from "lucide-react"

interface FDRDPSStatusProps {
  balanceVisible: boolean
}

export function FDRDPSStatus({ balanceVisible }: FDRDPSStatusProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const deposits = [
    {
      id: "1",
      type: "FDR",
      name: "Fixed Deposit - 1 Year",
      principal: 500000,
      currentValue: 542500,
      interestRate: 8.5,
      maturityDate: "2024-12-15",
      startDate: "2023-12-15",
      status: "Active",
      interestEarned: 42500,
      daysToMaturity: 45,
    },
    {
      id: "2",
      type: "DPS",
      name: "Monthly Deposit Scheme",
      monthlyAmount: 10000,
      totalDeposited: 120000,
      currentValue: 125400,
      interestRate: 9.0,
      maturityDate: "2025-06-15",
      startDate: "2023-06-15",
      status: "Active",
      interestEarned: 5400,
      completedMonths: 12,
      totalMonths: 24,
    },
    {
      id: "3",
      type: "FDR",
      name: "Fixed Deposit - 3 Years",
      principal: 1000000,
      currentValue: 1087500,
      interestRate: 9.5,
      maturityDate: "2025-03-20",
      startDate: "2022-03-20",
      status: "Active",
      interestEarned: 87500,
      daysToMaturity: 120,
    },
  ]

  const upcomingMaturity = deposits
    .filter((d) => d.daysToMaturity <= 60)
    .sort((a, b) => a.daysToMaturity - b.daysToMaturity)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-balance">FDR & DPS Status</h2>
          <p className="text-muted-foreground">Track your deposits and investment growth</p>
        </div>
        <Button variant="outline" size="sm" className="glass bg-transparent w-fit">
          <PiggyBank className="w-4 h-4 mr-2" />
          New Deposit
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Deposits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{balanceVisible ? formatCurrency(1620000) : "৳ ••••••"}</div>
            <div className="text-sm text-muted-foreground">Principal Amount</div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {balanceVisible ? formatCurrency(1755400) : "৳ ••••••"}
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <TrendingUp className="w-3 h-3 text-primary" />
              <span className="text-primary">+8.36%</span>
              <span className="text-muted-foreground">growth</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Interest Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {balanceVisible ? formatCurrency(135400) : "৳ ••••••"}
            </div>
            <div className="text-sm text-muted-foreground">Total Earnings</div>
          </CardContent>
        </Card>
      </div>

      {/* Maturity Notifications */}
      {upcomingMaturity.length > 0 && (
        <Card className="glass border-amber-200 bg-amber-50/10">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-amber-500" />
              <CardTitle className="text-amber-700">Upcoming Maturity</CardTitle>
            </div>
            <CardDescription>Deposits maturing within 60 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingMaturity.map((deposit) => (
              <div
                key={deposit.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-lg bg-amber-100/20"
              >
                <div>
                  <div className="font-medium">{deposit.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Matures in {deposit.daysToMaturity} days • {deposit.maturityDate}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{balanceVisible ? formatCurrency(deposit.currentValue) : "৳ ••••••"}</div>
                  <Button variant="outline" size="sm" className="mt-2 glass bg-transparent">
                    Renew Options
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Active Deposits */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Active Deposits</h3>
        {deposits.map((deposit) => (
          <Card key={deposit.id} className="glass">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{deposit.name}</span>
                    <Badge variant="outline">{deposit.type}</Badge>
                  </CardTitle>
                  <CardDescription>
                    Started: {deposit.startDate} • Rate: {deposit.interestRate}% p.a.
                  </CardDescription>
                </div>
                <Badge variant="secondary">{deposit.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">
                    {deposit.type === "DPS" ? "Total Deposited" : "Principal"}
                  </div>
                  <div className="font-bold">
                    {balanceVisible
                      ? formatCurrency(deposit.type === "DPS" ? deposit.totalDeposited : deposit.principal)
                      : "৳ ••••••"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Current Value</div>
                  <div className="font-bold text-primary">
                    {balanceVisible ? formatCurrency(deposit.currentValue) : "৳ ••••••"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Interest Earned</div>
                  <div className="font-bold text-primary">
                    {balanceVisible ? formatCurrency(deposit.interestEarned) : "৳ ••••••"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Maturity Date</div>
                  <div className="font-medium">{deposit.maturityDate}</div>
                </div>
              </div>

              {deposit.type === "DPS" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>
                      {deposit.completedMonths}/{deposit.totalMonths} months
                    </span>
                  </div>
                  <Progress value={(deposit.completedMonths / deposit.totalMonths) * 100} className="h-2" />
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="glass bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Schedule
                </Button>
                <Button variant="outline" size="sm" className="glass bg-transparent">
                  <Target className="w-4 h-4 mr-2" />
                  Maturity Options
                </Button>
                {deposit.type === "DPS" && (
                  <Button variant="outline" size="sm" className="glass bg-transparent">
                    <Clock className="w-4 h-4 mr-2" />
                    Next Payment
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
