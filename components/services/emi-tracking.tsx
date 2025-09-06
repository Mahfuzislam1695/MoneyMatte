"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { CreditCard, DollarSign, Clock, Bell, Calculator, Download, Settings } from "lucide-react"

interface EMI {
  id: string
  loanType: string
  bankName: string
  principalAmount: number
  emiAmount: number
  remainingAmount: number
  nextDueDate: string
  totalEMIs: number
  paidEMIs: number
  interestRate: number
  autoDebit: boolean
  status: "active" | "overdue" | "completed"
}

const mockEMIs: EMI[] = [
  {
    id: "1",
    loanType: "Home Loan",
    bankName: "ABC Bank",
    principalAmount: 5000000,
    emiAmount: 45000,
    remainingAmount: 3200000,
    nextDueDate: "2024-01-15",
    totalEMIs: 240,
    paidEMIs: 48,
    interestRate: 8.5,
    autoDebit: true,
    status: "active",
  },
  {
    id: "2",
    loanType: "Car Loan",
    bankName: "XYZ Bank",
    principalAmount: 1500000,
    emiAmount: 28000,
    remainingAmount: 840000,
    nextDueDate: "2024-01-20",
    totalEMIs: 60,
    paidEMIs: 24,
    interestRate: 12.0,
    autoDebit: false,
    status: "active",
  },
  {
    id: "3",
    loanType: "Personal Loan",
    bankName: "DEF Bank",
    principalAmount: 300000,
    emiAmount: 8500,
    remainingAmount: 0,
    nextDueDate: "2023-12-10",
    totalEMIs: 36,
    paidEMIs: 36,
    interestRate: 15.0,
    autoDebit: true,
    status: "completed",
  },
]

export default function EMITracking() {
  const [selectedEMI, setSelectedEMI] = useState<EMI | null>(null)
  const [showCalculator, setShowCalculator] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-600 text-white border-emerald-600"
      case "overdue":
        return "bg-red-600 text-white border-red-600"
      case "completed":
        return "bg-blue-600 text-white border-blue-600"
      default:
        return "bg-gray-600 text-white border-gray-600"
    }
  }

  const calculateProgress = (paid: number, total: number) => {
    return (paid / total) * 100
  }

  const toggleAutoDebit = (emiId: string) => {
    // Handle auto-debit toggle
    console.log("[v0] Toggle auto-debit for EMI:", emiId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">EMI Tracking</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCalculator(!showCalculator)}
              className="text-emerald-400 hover:bg-emerald-500/20"
            >
              <Calculator className="w-5 h-5" />
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-gray-300">Active EMIs</span>
              </div>
              <p className="text-xl font-bold text-white">2</p>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-gray-300">Monthly EMI</span>
              </div>
              <p className="text-xl font-bold text-white">৳73,000</p>
            </div>
          </div>
        </div>

        {/* EMI Calculator */}
        {showCalculator && (
          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-400" />
                EMI Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Loan Amount</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Interest Rate (%)</label>
                  <input
                    type="number"
                    placeholder="Enter rate"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Tenure (Years)</label>
                  <input
                    type="number"
                    placeholder="Enter years"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Calculate EMI</Button>
            </CardContent>
          </Card>
        )}

        {/* EMI List */}
        <div className="space-y-4">
          {mockEMIs.map((emi) => (
            <Card
              key={emi.id}
              className="backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-white text-lg">{emi.loanType}</h3>
                    <p className="text-gray-300 text-sm">{emi.bankName}</p>
                  </div>
                  <Badge className={getStatusColor(emi.status)}>
                    {emi.status.charAt(0).toUpperCase() + emi.status.slice(1)}
                  </Badge>
                </div>

                {/* EMI Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">EMI Amount</span>
                    <span className="text-white font-semibold">{formatCurrency(emi.emiAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Next Due Date</span>
                    <span className="text-white font-semibold">{emi.nextDueDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Remaining Amount</span>
                    <span className="text-white font-semibold">{formatCurrency(emi.remainingAmount)}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-300 mb-2">
                    <span>Progress</span>
                    <span>
                      {emi.paidEMIs}/{emi.totalEMIs} EMIs
                    </span>
                  </div>
                  <Progress value={calculateProgress(emi.paidEMIs, emi.totalEMIs)} className="h-2 bg-white/10" />
                </div>

                {/* Auto-debit Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-emerald-400" />
                    <span className="text-white text-sm">Auto-debit</span>
                  </div>
                  <Switch checked={emi.autoDebit} onCheckedChange={() => toggleAutoDebit(emi.id)} />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-emerald-400 hover:bg-emerald-500/20"
                    onClick={() => setSelectedEMI(emi)}
                  >
                    <Clock className="w-4 h-4 mr-1" />
                    History
                  </Button>
                  <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-blue-500/20">
                    <Bell className="w-4 h-4 mr-1" />
                    Remind
                  </Button>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:bg-purple-500/20">
                    <Download className="w-4 h-4 mr-1" />
                    Receipt
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment History Modal */}
        {selectedEMI && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
            <div className="w-full max-w-md mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-3xl border-t border-white/20 p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Payment History</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedEMI(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div>
                      <p className="text-white font-medium">EMI #{selectedEMI.paidEMIs - i}</p>
                      <p className="text-gray-300 text-sm">Dec {15 - i}, 2023</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{formatCurrency(selectedEMI.emiAmount)}</p>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">Paid</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
