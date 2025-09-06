"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft, Smartphone, Receipt, CreditCard, MoreHorizontal } from "lucide-react"

export function RecentTransactions() {
  const transactions = [
    {
      id: "1",
      type: "received",
      description: "Salary Credit",
      amount: 75000,
      date: "2024-01-20",
      time: "09:30 AM",
      status: "completed",
      category: "income",
      icon: ArrowDownLeft,
    },
    {
      id: "2",
      type: "sent",
      description: "Rent Payment",
      amount: -25000,
      date: "2024-01-19",
      time: "02:15 PM",
      status: "completed",
      category: "expense",
      icon: ArrowUpRight,
    },
    {
      id: "3",
      type: "sent",
      description: "bKash Transfer",
      amount: -2500,
      date: "2024-01-19",
      time: "11:45 AM",
      status: "completed",
      category: "transfer",
      icon: Smartphone,
    },
    {
      id: "4",
      type: "sent",
      description: "Electricity Bill",
      amount: -3200,
      date: "2024-01-18",
      time: "04:20 PM",
      status: "completed",
      category: "bill",
      icon: Receipt,
    },
    {
      id: "5",
      type: "sent",
      description: "Credit Card Payment",
      amount: -15000,
      date: "2024-01-17",
      time: "10:00 AM",
      status: "pending",
      category: "payment",
      icon: CreditCard,
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(Math.abs(amount))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-emerald-600 text-white border-emerald-600">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-600 text-yellow-700 bg-yellow-50">
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive" className="bg-red-600 text-white border-red-600">
            Failed
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="glass">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activities</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="glass bg-transparent">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => {
            const Icon = transaction.icon
            const isPositive = transaction.amount > 0

            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isPositive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{transaction.date}</span>
                      <span>•</span>
                      <span>{transaction.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className={`font-semibold ${isPositive ? "text-primary" : "text-foreground"}`}>
                      {isPositive ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </p>
                    {getStatusBadge(transaction.status)}
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
