"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Target, CreditCard } from "lucide-react"

export function FinancialSummary() {
  const summaryData = {
    monthlyIncome: 75000,
    monthlyExpenses: 45000,
    savingsGoal: 100000,
    currentSavings: 65000,
    creditUtilization: 35,
    investmentGrowth: 8.5,
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const savingsProgress = (summaryData.currentSavings / summaryData.savingsGoal) * 100

  return (
    <div className="space-y-6">
      {/* Monthly Overview */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Monthly Overview</span>
          </CardTitle>
          <CardDescription>January 2024</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Income</span>
              <span className="font-semibold text-primary">+{formatCurrency(summaryData.monthlyIncome)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Expenses</span>
              <span className="font-semibold">-{formatCurrency(summaryData.monthlyExpenses)}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Net Savings</span>
                <span className="font-bold text-primary">
                  +{formatCurrency(summaryData.monthlyIncome - summaryData.monthlyExpenses)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Savings Goal */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <span>Savings Goal</span>
          </CardTitle>
          <CardDescription>Emergency Fund Target</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{Math.round(savingsProgress)}%</span>
            </div>
            <Progress value={savingsProgress} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current</span>
              <span className="font-semibold">{formatCurrency(summaryData.currentSavings)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Target</span>
              <span className="font-semibold">{formatCurrency(summaryData.savingsGoal)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Credit Usage</span>
            </div>
            <div className="mt-2">
              <span className="text-lg font-bold">{summaryData.creditUtilization}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Investment</span>
            </div>
            <div className="mt-2">
              <span className="text-lg font-bold text-primary">+{summaryData.investmentGrowth}%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
