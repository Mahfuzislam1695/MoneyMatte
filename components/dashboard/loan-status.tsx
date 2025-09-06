"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, DollarSign, FileText, Bell, CheckCircle } from "lucide-react"

interface LoanStatusProps {
  balanceVisible: boolean
}

export function LoanStatus({ balanceVisible }: LoanStatusProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const loans = [
    {
      id: "1",
      type: "Home Loan",
      loanAmount: 5000000,
      outstandingBalance: 3750000,
      emiAmount: 45000,
      interestRate: 9.5,
      tenure: 20,
      remainingTenure: 15,
      nextEmiDate: "2024-02-01",
      status: "Active",
      accountNumber: "HL****5678",
      paidEmis: 60,
      totalEmis: 240,
    },
    {
      id: "2",
      type: "Car Loan",
      loanAmount: 1500000,
      outstandingBalance: 850000,
      emiAmount: 28000,
      interestRate: 11.0,
      tenure: 7,
      remainingTenure: 3.5,
      nextEmiDate: "2024-02-05",
      status: "Active",
      accountNumber: "CL****9012",
      paidEmis: 42,
      totalEmis: 84,
    },
    {
      id: "3",
      type: "Personal Loan",
      loanAmount: 500000,
      outstandingBalance: 125000,
      emiAmount: 12500,
      interestRate: 14.5,
      tenure: 4,
      remainingTenure: 1,
      nextEmiDate: "2024-01-28",
      status: "Active",
      accountNumber: "PL****3456",
      paidEmis: 36,
      totalEmis: 48,
    },
  ]

  const emiHistory = [
    { date: "2024-01-01", amount: 85500, status: "Paid", loans: ["Home", "Car", "Personal"] },
    { date: "2023-12-01", amount: 85500, status: "Paid", loans: ["Home", "Car", "Personal"] },
    { date: "2023-11-01", amount: 85500, status: "Paid", loans: ["Home", "Car", "Personal"] },
    { date: "2023-10-01", amount: 85500, status: "Paid", loans: ["Home", "Car", "Personal"] },
  ]

  const upcomingEmis = loans.filter((loan) => {
    const emiDate = new Date(loan.nextEmiDate)
    const today = new Date()
    const diffTime = emiDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7
  })

  const totalOutstanding = loans.reduce((sum, loan) => sum + loan.outstandingBalance, 0)
  const totalEmi = loans.reduce((sum, loan) => sum + loan.emiAmount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-balance">Loan Status</h2>
          <p className="text-muted-foreground">Manage your loans and EMI payments</p>
        </div>
        <Button variant="outline" size="sm" className="glass bg-transparent w-fit">
          <FileText className="w-4 h-4 mr-2" />
          Apply New Loan
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{balanceVisible ? formatCurrency(totalOutstanding) : "৳ ••••••"}</div>
            <div className="text-sm text-muted-foreground">{loans.length} Active Loans</div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly EMI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {balanceVisible ? formatCurrency(totalEmi) : "৳ ••••••"}
            </div>
            <div className="text-sm text-muted-foreground">Total Monthly Payment</div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next EMI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Jan 28</div>
            <div className="text-sm text-muted-foreground">Personal Loan Due</div>
          </CardContent>
        </Card>
      </div>

      {/* EMI Reminders */}
      {upcomingEmis.length > 0 && (
        <Card className="glass border-amber-200 bg-amber-50/10">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-amber-500" />
              <CardTitle className="text-amber-700">Upcoming EMI Payments</CardTitle>
            </div>
            <CardDescription>EMIs due within 7 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEmis.map((loan) => (
              <div
                key={loan.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-lg bg-amber-100/20"
              >
                <div>
                  <div className="font-medium">{loan.type}</div>
                  <div className="text-sm text-muted-foreground">
                    Due: {loan.nextEmiDate} • Account: {loan.accountNumber}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{balanceVisible ? formatCurrency(loan.emiAmount) : "৳ ••••••"}</div>
                  <Button variant="outline" size="sm" className="mt-2 glass bg-transparent">
                    Pay Now
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2 glass">
          <TabsTrigger value="active">Active Loans</TabsTrigger>
          <TabsTrigger value="history">EMI History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {loans.map((loan) => (
            <Card key={loan.id} className="glass">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{loan.type}</span>
                      <Badge variant="outline">{loan.status}</Badge>
                    </CardTitle>
                    <CardDescription>
                      Account: {loan.accountNumber} • Rate: {loan.interestRate}% p.a.
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Next EMI</div>
                    <div className="font-bold">{loan.nextEmiDate}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Loan Amount</div>
                    <div className="font-bold">{balanceVisible ? formatCurrency(loan.loanAmount) : "৳ ••••••"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Outstanding</div>
                    <div className="font-bold text-destructive">
                      {balanceVisible ? formatCurrency(loan.outstandingBalance) : "৳ ••••••"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Monthly EMI</div>
                    <div className="font-bold">{balanceVisible ? formatCurrency(loan.emiAmount) : "৳ ••••••"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Remaining Tenure</div>
                    <div className="font-medium">{loan.remainingTenure} years</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Repayment Progress</span>
                    <span>
                      {loan.paidEmis}/{loan.totalEmis} EMIs
                    </span>
                  </div>
                  <Progress value={(loan.paidEmis / loan.totalEmis) * 100} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="glass bg-transparent">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Pay EMI
                  </Button>
                  <Button variant="outline" size="sm" className="glass bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    EMI Schedule
                  </Button>
                  <Button variant="outline" size="sm" className="glass bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Statements
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>EMI Payment History</CardTitle>
              <CardDescription>Your recent EMI payment records</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {emiHistory.map((payment, index) => (
                  <div key={index} className="p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium">EMI Payment</div>
                          <div className="text-sm text-muted-foreground">
                            {payment.date} • {payment.loans.join(", ")} Loans
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{balanceVisible ? formatCurrency(payment.amount) : "৳ ••••••"}</div>
                        <Badge variant="outline" className="text-xs">
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
