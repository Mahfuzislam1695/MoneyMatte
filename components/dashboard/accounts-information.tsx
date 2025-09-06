"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Download, ArrowUpRight, ArrowDownLeft, Calendar, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface AccountsInformationProps {
  balanceVisible: boolean
  onToggleBalance: () => void
}

export function AccountsInformation({ balanceVisible, onToggleBalance }: AccountsInformationProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const accounts = [
    {
      id: "1",
      name: "Primary Savings",
      number: "****1234",
      balance: 125750.5,
      type: "Savings",
      status: "Active",
    },
    {
      id: "2",
      name: "Current Account",
      number: "****5678",
      balance: 45200.0,
      type: "Current",
      status: "Active",
    },
  ]

  const transactions = [
    {
      id: "1",
      type: "credit",
      description: "Salary Deposit",
      amount: 85000,
      date: "2024-01-15",
      balance: 125750.5,
      reference: "SAL/2024/001",
    },
    {
      id: "2",
      type: "debit",
      description: "Utility Bill Payment",
      amount: 3500,
      date: "2024-01-14",
      balance: 40750.5,
      reference: "BILL/2024/045",
    },
    {
      id: "3",
      type: "debit",
      description: "ATM Withdrawal",
      amount: 5000,
      date: "2024-01-13",
      balance: 44250.5,
      reference: "ATM/2024/123",
    },
    {
      id: "4",
      type: "credit",
      description: "Fund Transfer Received",
      amount: 15000,
      date: "2024-01-12",
      balance: 49250.5,
      reference: "TXN/2024/789",
    },
  ]

  const statements = [
    { month: "December 2024", status: "Available", size: "2.1 MB" },
    { month: "November 2024", status: "Available", size: "1.8 MB" },
    { month: "October 2024", status: "Available", size: "2.3 MB" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-balance">Account Information</h2>
          <p className="text-muted-foreground">Manage your accounts and view transaction history</p>
        </div>
        <Button variant="outline" size="sm" onClick={onToggleBalance} className="glass bg-transparent w-fit">
          {balanceVisible ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
          {balanceVisible ? "Hide" : "Show"} Balances
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 glass">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="statements">Statements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {accounts.map((account) => (
              <Card key={account.id} className="glass">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg">{account.name}</CardTitle>
                      <CardDescription>Account {account.number}</CardDescription>
                    </div>
                    <Badge variant="outline" className="w-fit">
                      {account.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-2xl font-bold">
                        {balanceVisible ? formatCurrency(account.balance) : "৳ ••••••"}
                      </div>
                      <div className="text-sm text-muted-foreground">{account.type} Account</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="glass bg-transparent">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="glass bg-transparent">
                        <Download className="w-4 h-4 mr-2" />
                        Statement
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="pl-10 glass bg-transparent" />
            </div>
            <Button variant="outline" className="glass bg-transparent w-fit">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest account activity</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <div
                          className={`p-2 rounded-full ${
                            transaction.type === "credit"
                              ? "bg-primary/10 text-primary"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {transaction.type === "credit" ? (
                            <ArrowDownLeft className="w-4 h-4" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium truncate">{transaction.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.date} • {transaction.reference}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-bold ${transaction.type === "credit" ? "text-primary" : "text-destructive"}`}
                        >
                          {transaction.type === "credit" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Bal: {balanceVisible ? formatCurrency(transaction.balance) : "••••••"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statements" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>E-Statements</CardTitle>
              <CardDescription>Download your monthly account statements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {statements.map((statement, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/20"
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{statement.month}</div>
                      <div className="text-sm text-muted-foreground">Size: {statement.size}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{statement.status}</Badge>
                    <Button variant="outline" size="sm" className="glass bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
