"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PiggyBank, TrendingUp, Plus, Download, RefreshCw, AlertCircle } from "lucide-react"

interface Deposit {
  id: string
  type: "FDR" | "DPS"
  accountNumber: string
  principalAmount: number
  currentValue: number
  interestRate: number
  tenure: number
  startDate: string
  maturityDate: string
  monthlyInstallment?: number
  status: "active" | "matured" | "closed"
  autoRenewal: boolean
}

const mockDeposits: Deposit[] = [
  {
    id: "1",
    type: "FDR",
    accountNumber: "FDR001234567",
    principalAmount: 500000,
    currentValue: 565000,
    interestRate: 8.5,
    tenure: 3,
    startDate: "2022-01-15",
    maturityDate: "2025-01-15",
    status: "active",
    autoRenewal: true,
  },
  {
    id: "2",
    type: "DPS",
    accountNumber: "DPS001234568",
    principalAmount: 120000,
    currentValue: 145000,
    interestRate: 9.0,
    tenure: 5,
    startDate: "2021-06-01",
    maturityDate: "2026-06-01",
    monthlyInstallment: 2000,
    status: "active",
    autoRenewal: false,
  },
  {
    id: "3",
    type: "FDR",
    accountNumber: "FDR001234569",
    principalAmount: 1000000,
    currentValue: 1280000,
    interestRate: 8.0,
    tenure: 2,
    startDate: "2022-12-01",
    maturityDate: "2024-12-01",
    status: "matured",
    autoRenewal: false,
  },
]

export default function FDRDPSManagement() {
  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null)
  const [showNewDeposit, setShowNewDeposit] = useState(false)
  const [newDepositType, setNewDepositType] = useState<"FDR" | "DPS">("FDR")

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
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "matured":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "closed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const calculateProgress = (startDate: string, maturityDate: string) => {
    const start = new Date(startDate).getTime()
    const end = new Date(maturityDate).getTime()
    const now = new Date().getTime()
    const progress = ((now - start) / (end - start)) * 100
    return Math.min(Math.max(progress, 0), 100)
  }

  const getDaysToMaturity = (maturityDate: string) => {
    const maturity = new Date(maturityDate).getTime()
    const now = new Date().getTime()
    const days = Math.ceil((maturity - now) / (1000 * 60 * 60 * 24))
    return days > 0 ? days : 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">FDR & DPS</h1>
            <Button onClick={() => setShowNewDeposit(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <PiggyBank className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-gray-300">Total Deposits</span>
              </div>
              <p className="text-xl font-bold text-white">3</p>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-gray-300">Total Value</span>
              </div>
              <p className="text-xl font-bold text-white">৳9.9L</p>
            </div>
          </div>
        </div>

        {/* Deposits List */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-xl border border-white/20">
            <TabsTrigger value="all" className="text-white data-[state=active]:bg-emerald-600">
              All
            </TabsTrigger>
            <TabsTrigger value="FDR" className="text-white data-[state=active]:bg-emerald-600">
              FDR
            </TabsTrigger>
            <TabsTrigger value="DPS" className="text-white data-[state=active]:bg-emerald-600">
              DPS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-4">
            {mockDeposits.map((deposit) => (
              <DepositCard key={deposit.id} deposit={deposit} onSelect={setSelectedDeposit} />
            ))}
          </TabsContent>

          <TabsContent value="FDR" className="space-y-4 mt-4">
            {mockDeposits
              .filter((d) => d.type === "FDR")
              .map((deposit) => (
                <DepositCard key={deposit.id} deposit={deposit} onSelect={setSelectedDeposit} />
              ))}
          </TabsContent>

          <TabsContent value="DPS" className="space-y-4 mt-4">
            {mockDeposits
              .filter((d) => d.type === "DPS")
              .map((deposit) => (
                <DepositCard key={deposit.id} deposit={deposit} onSelect={setSelectedDeposit} />
              ))}
          </TabsContent>
        </Tabs>

        {/* New Deposit Modal */}
        {showNewDeposit && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
            <div className="w-full max-w-md mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-3xl border-t border-white/20 p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Open New Deposit</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNewDeposit(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                {/* Deposit Type Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={newDepositType === "FDR" ? "default" : "outline"}
                    onClick={() => setNewDepositType("FDR")}
                    className={
                      newDepositType === "FDR"
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "border-white/20 text-white hover:bg-white/10"
                    }
                  >
                    FDR
                  </Button>
                  <Button
                    variant={newDepositType === "DPS" ? "default" : "outline"}
                    onClick={() => setNewDepositType("DPS")}
                    className={
                      newDepositType === "DPS"
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "border-white/20 text-white hover:bg-white/10"
                    }
                  >
                    DPS
                  </Button>
                </div>

                {/* Form Fields */}
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    {newDepositType === "FDR" ? "Deposit Amount" : "Monthly Installment"}
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Tenure (Years)</label>
                  <select className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white focus:border-emerald-500 focus:outline-none">
                    <option value="1">1 Year (8.0%)</option>
                    <option value="2">2 Years (8.5%)</option>
                    <option value="3">3 Years (9.0%)</option>
                    <option value="5">5 Years (9.5%)</option>
                  </select>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <h4 className="text-emerald-400 font-semibold mb-2">Projected Returns</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Principal Amount:</span>
                      <span className="text-white">৳5,00,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Interest Earned:</span>
                      <span className="text-white">৳1,35,000</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span className="text-emerald-400">Maturity Amount:</span>
                      <span className="text-emerald-400">৳6,35,000</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Open {newDepositType}</Button>
              </div>
            </div>
          </div>
        )}

        {/* Deposit Details Modal */}
        {selectedDeposit && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
            <div className="w-full max-w-md mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-3xl border-t border-white/20 p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">{selectedDeposit.type} Details</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedDeposit(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Account Number</span>
                      <span className="text-white font-mono">{selectedDeposit.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Principal Amount</span>
                      <span className="text-white">{formatCurrency(selectedDeposit.principalAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Current Value</span>
                      <span className="text-emerald-400 font-semibold">
                        {formatCurrency(selectedDeposit.currentValue)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Interest Rate</span>
                      <span className="text-white">{selectedDeposit.interestRate}% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Maturity Date</span>
                      <span className="text-white">{selectedDeposit.maturityDate}</span>
                    </div>
                    {selectedDeposit.monthlyInstallment && (
                      <div className="flex justify-between">
                        <span className="text-gray-300">Monthly Installment</span>
                        <span className="text-white">{formatCurrency(selectedDeposit.monthlyInstallment)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {selectedDeposit.status === "active" && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>Progress to Maturity</span>
                      <span>{getDaysToMaturity(selectedDeposit.maturityDate)} days left</span>
                    </div>
                    <Progress
                      value={calculateProgress(selectedDeposit.startDate, selectedDeposit.maturityDate)}
                      className="h-2 bg-white/10"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Statement
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Renew
                  </Button>
                </div>

                {selectedDeposit.status === "matured" && (
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                    Withdraw Maturity Amount
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Deposit Card Component
function DepositCard({ deposit, onSelect }: { deposit: Deposit; onSelect: (deposit: Deposit) => void }) {
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
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "matured":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "closed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getDaysToMaturity = (maturityDate: string) => {
    const maturity = new Date(maturityDate).getTime()
    const now = new Date().getTime()
    const days = Math.ceil((maturity - now) / (1000 * 60 * 60 * 24))
    return days > 0 ? days : 0
  }

  return (
    <Card
      className="backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
      onClick={() => onSelect(deposit)}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">{deposit.type}</Badge>
              <Badge className={getStatusColor(deposit.status)}>
                {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
              </Badge>
            </div>
            <p className="text-gray-300 text-sm font-mono">{deposit.accountNumber}</p>
          </div>
          {deposit.status === "matured" && <AlertCircle className="w-5 h-5 text-blue-400" />}
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">Current Value</span>
            <span className="text-white font-semibold text-lg">{formatCurrency(deposit.currentValue)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">Interest Rate</span>
            <span className="text-emerald-400 font-semibold">{deposit.interestRate}% p.a.</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">Maturity Date</span>
            <span className="text-white font-semibold">{deposit.maturityDate}</span>
          </div>
          {deposit.monthlyInstallment && (
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Monthly Installment</span>
              <span className="text-white font-semibold">{formatCurrency(deposit.monthlyInstallment)}</span>
            </div>
          )}
        </div>

        {deposit.status === "active" && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center justify-between text-sm">
              <span className="text-emerald-400">Days to Maturity</span>
              <span className="text-emerald-400 font-semibold">{getDaysToMaturity(deposit.maturityDate)} days</span>
            </div>
          </div>
        )}

        {deposit.status === "matured" && (
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-center justify-center text-sm">
              <span className="text-blue-400 font-semibold">Ready for Withdrawal</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
