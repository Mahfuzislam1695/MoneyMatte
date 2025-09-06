"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Calendar, DollarSign, Shield, Bell, TrendingUp, Lock, Eye, EyeOff } from "lucide-react"

interface CreditCardStatusProps {
  balanceVisible: boolean
  onToggleBalance: () => void
}

export function CreditCardStatus({ balanceVisible, onToggleBalance }: CreditCardStatusProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const creditCards = [
    {
      id: "1",
      name: "MoneyMatte Platinum",
      number: "****1234",
      type: "Platinum",
      creditLimit: 500000,
      availableCredit: 425000,
      outstandingBalance: 75000,
      minimumDue: 3750,
      totalDue: 75000,
      dueDate: "2024-02-15",
      billingCycle: "15th of every month",
      status: "Active",
      rewardPoints: 12500,
      cashback: 2500,
    },
    {
      id: "2",
      name: "MoneyMatte Gold",
      number: "****5678",
      type: "Gold",
      creditLimit: 200000,
      availableCredit: 180000,
      outstandingBalance: 20000,
      minimumDue: 1000,
      totalDue: 20000,
      dueDate: "2024-02-20",
      billingCycle: "20th of every month",
      status: "Active",
      rewardPoints: 4500,
      cashback: 850,
    },
  ]

  const transactions = [
    {
      id: "1",
      description: "Online Shopping - Daraz",
      amount: 15000,
      date: "2024-01-20",
      category: "Shopping",
      cardNumber: "****1234",
      status: "Posted",
    },
    {
      id: "2",
      description: "Restaurant - Pizza Hut",
      amount: 2500,
      date: "2024-01-19",
      category: "Dining",
      cardNumber: "****1234",
      status: "Posted",
    },
    {
      id: "3",
      description: "Fuel - Padma Oil",
      amount: 3000,
      date: "2024-01-18",
      category: "Fuel",
      cardNumber: "****5678",
      status: "Posted",
    },
    {
      id: "4",
      description: "Grocery - Shwapno",
      amount: 4500,
      date: "2024-01-17",
      category: "Grocery",
      cardNumber: "****1234",
      status: "Pending",
    },
  ]

  const alerts = [
    {
      type: "due_date",
      message: "Payment due in 3 days for Platinum Card",
      severity: "warning",
      cardId: "1",
    },
    {
      type: "suspicious",
      message: "Unusual transaction detected - ৳25,000 at ATM",
      severity: "high",
      cardId: "1",
    },
  ]

  const upcomingDues = creditCards.filter((card) => {
    const dueDate = new Date(card.dueDate)
    const today = new Date()
    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-balance">Credit Card Status</h2>
          <p className="text-muted-foreground">Manage your credit cards and payments</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={onToggleBalance} className="glass bg-transparent">
            {balanceVisible ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {balanceVisible ? "Hide" : "Show"}
          </Button>
          <Button variant="outline" size="sm" className="glass bg-transparent">
            <CreditCard className="w-4 h-4 mr-2" />
            Apply New Card
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert, index) => (
            <Card
              key={index}
              className={`glass ${
                alert.severity === "high" ? "border-red-200 bg-red-50/10" : "border-amber-200 bg-amber-50/10"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  {alert.severity === "high" ? (
                    <Shield className="w-5 h-5 text-red-500" />
                  ) : (
                    <Bell className="w-5 h-5 text-amber-500" />
                  )}
                  <div className="flex-1">
                    <div className={`font-medium ${alert.severity === "high" ? "text-red-700" : "text-amber-700"}`}>
                      {alert.message}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="glass bg-transparent">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Due Date Reminders */}
      {upcomingDues.length > 0 && (
        <Card className="glass border-amber-200 bg-amber-50/10">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              <CardTitle className="text-amber-700">Payment Due Soon</CardTitle>
            </div>
            <CardDescription>Credit card payments due within 7 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingDues.map((card) => (
              <div
                key={card.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-lg bg-amber-100/20"
              >
                <div>
                  <div className="font-medium">{card.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Due: {card.dueDate} • Minimum: {balanceVisible ? formatCurrency(card.minimumDue) : "৳ ••••••"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{balanceVisible ? formatCurrency(card.totalDue) : "৳ ••••••"}</div>
                  <Button variant="outline" size="sm" className="mt-2 glass bg-transparent">
                    Pay Now
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 glass">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {creditCards.map((card) => (
            <Card key={card.id} className="glass">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{card.name}</span>
                      <Badge variant="outline">{card.type}</Badge>
                    </CardTitle>
                    <CardDescription>
                      Card {card.number} • {card.billingCycle}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{card.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Credit Limit</div>
                    <div className="font-bold">{balanceVisible ? formatCurrency(card.creditLimit) : "৳ ••••••"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Available Credit</div>
                    <div className="font-bold text-primary">
                      {balanceVisible ? formatCurrency(card.availableCredit) : "৳ ••••••"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Outstanding Balance</div>
                    <div className="font-bold text-destructive">
                      {balanceVisible ? formatCurrency(card.outstandingBalance) : "৳ ••••••"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Payment Due Date</div>
                    <div className="font-medium">{card.dueDate}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Credit Utilization</span>
                    <span>{((card.outstandingBalance / card.creditLimit) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(card.outstandingBalance / card.creditLimit) * 100} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="glass bg-transparent">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Pay Bill
                  </Button>
                  <Button variant="outline" size="sm" className="glass bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Statement
                  </Button>
                  <Button variant="outline" size="sm" className="glass bg-transparent">
                    <Lock className="w-4 h-4 mr-2" />
                    Block Card
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest credit card activity</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <div className="p-2 rounded-full bg-destructive/10 text-destructive">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium truncate">{transaction.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.date} • {transaction.cardNumber} • {transaction.category}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-destructive">-{formatCurrency(transaction.amount)}</div>
                        <Badge variant="outline" className="text-xs">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {creditCards.map((card) => (
              <Card key={card.id} className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>{card.name} Rewards</span>
                  </CardTitle>
                  <CardDescription>Your earned rewards and cashback</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Reward Points</div>
                      <div className="text-2xl font-bold text-primary">{card.rewardPoints.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Cashback Earned</div>
                      <div className="text-2xl font-bold text-primary">
                        {balanceVisible ? formatCurrency(card.cashback) : "৳ ••••••"}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="glass bg-transparent">
                      Redeem Points
                    </Button>
                    <Button variant="outline" size="sm" className="glass bg-transparent">
                      View Catalog
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
