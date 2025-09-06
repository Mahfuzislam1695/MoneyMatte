"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, TrendingUp, Plus, Download, Bell, CheckCircle, Clock, AlertTriangle } from "lucide-react"

interface Certificate {
  id: string
  name: string
  type: string
  interestRate: number
  tenure: number
  minInvestment: number
  maxInvestment: number
  description: string
  features: string[]
  eligibility: string[]
}

interface MyCertificate {
  id: string
  certificateType: string
  certificateNumber: string
  purchaseAmount: number
  currentValue: number
  purchaseDate: string
  maturityDate: string
  interestRate: number
  status: "active" | "matured" | "encashed"
  nextInterestDate: string
}

const availableCertificates: Certificate[] = [
  {
    id: "1",
    name: "5-Year Bangladesh Sanchayapatra",
    type: "5-Year",
    interestRate: 11.28,
    tenure: 5,
    minInvestment: 100000,
    maxInvestment: 3000000,
    description: "Long-term government savings certificate with attractive returns",
    features: ["Tax-free interest", "Quarterly interest payment", "Premature encashment allowed"],
    eligibility: ["Bangladeshi citizen", "Age 18+", "Valid NID required"],
  },
  {
    id: "2",
    name: "3-Year Bangladesh Sanchayapatra",
    type: "3-Year",
    interestRate: 10.2,
    tenure: 3,
    minInvestment: 100000,
    maxInvestment: 3000000,
    description: "Medium-term government savings certificate",
    features: ["Tax-free interest", "Half-yearly interest payment", "Government guaranteed"],
    eligibility: ["Bangladeshi citizen", "Age 18+", "Valid NID required"],
  },
  {
    id: "3",
    name: "Pensioner Sanchayapatra",
    type: "Pensioner",
    interestRate: 11.76,
    tenure: 5,
    minInvestment: 150000,
    maxInvestment: 5000000,
    description: "Special certificate for pensioners with higher returns",
    features: ["Highest interest rate", "Monthly interest payment", "Exclusive for pensioners"],
    eligibility: ["Government pensioner", "Age 57+", "Pension certificate required"],
  },
  {
    id: "4",
    name: "Family Sanchayapatra",
    type: "Family",
    interestRate: 11.52,
    tenure: 5,
    minInvestment: 100000,
    maxInvestment: 4500000,
    description: "Family savings certificate with joint ownership",
    features: ["Joint ownership allowed", "Quarterly interest payment", "Nomination facility"],
    eligibility: ["Bangladeshi family", "Joint account holders", "Valid NID required"],
  },
]

const myCertificates: MyCertificate[] = [
  {
    id: "1",
    certificateType: "5-Year Bangladesh Sanchayapatra",
    certificateNumber: "SP2023001234567",
    purchaseAmount: 500000,
    currentValue: 625000,
    purchaseDate: "2023-01-15",
    maturityDate: "2028-01-15",
    interestRate: 11.28,
    status: "active",
    nextInterestDate: "2024-04-15",
  },
  {
    id: "2",
    certificateType: "3-Year Bangladesh Sanchayapatra",
    certificateNumber: "SP2022001234568",
    purchaseAmount: 300000,
    currentValue: 390000,
    purchaseDate: "2022-06-01",
    maturityDate: "2025-06-01",
    interestRate: 10.2,
    status: "active",
    nextInterestDate: "2024-06-01",
  },
  {
    id: "3",
    certificateType: "Family Sanchayapatra",
    certificateNumber: "SP2021001234569",
    purchaseAmount: 1000000,
    currentValue: 1576000,
    purchaseDate: "2021-12-01",
    maturityDate: "2026-12-01",
    interestRate: 11.52,
    status: "matured",
    nextInterestDate: "2026-12-01",
  },
]

export default function ShonchoyPotro() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [selectedMyCertificate, setSelectedMyCertificate] = useState<MyCertificate | null>(null)
  const [showPurchase, setShowPurchase] = useState(false)
  const [purchaseAmount, setPurchaseAmount] = useState("")

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
      case "encashed":
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
            <h1 className="text-2xl font-bold text-white">Shonchoy Potro</h1>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-semibold">Govt. Guaranteed</span>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-gray-300">My Certificates</span>
              </div>
              <p className="text-xl font-bold text-white">3</p>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-gray-300">Total Value</span>
              </div>
              <p className="text-xl font-bold text-white">৳15.9L</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-xl border border-white/20">
            <TabsTrigger value="available" className="text-white data-[state=active]:bg-emerald-600">
              Available
            </TabsTrigger>
            <TabsTrigger value="my-certificates" className="text-white data-[state=active]:bg-emerald-600">
              My Certificates
            </TabsTrigger>
          </TabsList>

          {/* Available Certificates */}
          <TabsContent value="available" className="space-y-4 mt-4">
            {availableCertificates.map((certificate) => (
              <Card
                key={certificate.id}
                className="backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedCertificate(certificate)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-white text-lg">{certificate.name}</h3>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mt-1">
                        {certificate.type}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-400">{certificate.interestRate}%</p>
                      <p className="text-xs text-gray-300">Interest Rate</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Tenure</span>
                      <span className="text-white">{certificate.tenure} years</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Min Investment</span>
                      <span className="text-white">{formatCurrency(certificate.minInvestment)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Max Investment</span>
                      <span className="text-white">{formatCurrency(certificate.maxInvestment)}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4">{certificate.description}</p>

                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedCertificate(certificate)
                      setShowPurchase(true)
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Purchase Certificate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* My Certificates */}
          <TabsContent value="my-certificates" className="space-y-4 mt-4">
            {myCertificates.map((certificate) => (
              <Card
                key={certificate.id}
                className="backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedMyCertificate(certificate)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-white">{certificate.certificateType}</h3>
                      <p className="text-gray-300 text-sm font-mono">{certificate.certificateNumber}</p>
                    </div>
                    <Badge className={getStatusColor(certificate.status)}>
                      {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">Current Value</span>
                      <span className="text-white font-semibold">{formatCurrency(certificate.currentValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">Purchase Amount</span>
                      <span className="text-white">{formatCurrency(certificate.purchaseAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">Interest Rate</span>
                      <span className="text-emerald-400">{certificate.interestRate}% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">Maturity Date</span>
                      <span className="text-white">{certificate.maturityDate}</span>
                    </div>
                  </div>

                  {certificate.status === "active" && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-300">
                        <span>Progress to Maturity</span>
                        <span>{getDaysToMaturity(certificate.maturityDate)} days left</span>
                      </div>
                      <Progress
                        value={calculateProgress(certificate.purchaseDate, certificate.maturityDate)}
                        className="h-2 bg-white/10"
                      />
                    </div>
                  )}

                  {certificate.status === "matured" && (
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 mt-4">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 font-semibold text-sm">Ready for Encashment</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Certificate Details Modal */}
        {selectedCertificate && !showPurchase && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
            <div className="w-full max-w-md mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-3xl border-t border-white/20 p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">{selectedCertificate.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCertificate(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-400">{selectedCertificate.interestRate}%</p>
                    <p className="text-emerald-400 text-sm">Annual Interest Rate</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Features</h4>
                  {selectedCertificate.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Eligibility</h4>
                  {selectedCertificate.eligibility.map((criteria, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300 text-sm">{criteria}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => setShowPurchase(true)}
                >
                  Purchase This Certificate
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Purchase Modal */}
        {showPurchase && selectedCertificate && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
            <div className="w-full max-w-md mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-3xl border-t border-white/20 p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Purchase Certificate</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowPurchase(false)
                    setSelectedCertificate(null)
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-white font-semibold mb-2">{selectedCertificate.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Interest Rate:</span>
                      <span className="text-emerald-400">{selectedCertificate.interestRate}% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Tenure:</span>
                      <span className="text-white">{selectedCertificate.tenure} years</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Investment Amount</label>
                  <input
                    type="number"
                    value={purchaseAmount}
                    onChange={(e) => setPurchaseAmount(e.target.value)}
                    placeholder={`Min: ${formatCurrency(selectedCertificate.minInvestment)}`}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Range: {formatCurrency(selectedCertificate.minInvestment)} -{" "}
                    {formatCurrency(selectedCertificate.maxInvestment)}
                  </p>
                </div>

                {purchaseAmount && Number(purchaseAmount) >= selectedCertificate.minInvestment && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <h4 className="text-emerald-400 font-semibold mb-2">Projected Returns</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Investment Amount:</span>
                        <span className="text-white">{formatCurrency(Number(purchaseAmount))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Total Interest:</span>
                        <span className="text-white">
                          {formatCurrency(
                            (Number(purchaseAmount) * selectedCertificate.interestRate * selectedCertificate.tenure) /
                              100,
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-emerald-400">Maturity Amount:</span>
                        <span className="text-emerald-400">
                          {formatCurrency(
                            Number(purchaseAmount) +
                              (Number(purchaseAmount) * selectedCertificate.interestRate * selectedCertificate.tenure) /
                                100,
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={!purchaseAmount || Number(purchaseAmount) < selectedCertificate.minInvestment}
                >
                  Confirm Purchase
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* My Certificate Details Modal */}
        {selectedMyCertificate && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
            <div className="w-full max-w-md mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-3xl border-t border-white/20 p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Certificate Details</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMyCertificate(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Certificate Number</span>
                      <span className="text-white font-mono">{selectedMyCertificate.certificateNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Purchase Amount</span>
                      <span className="text-white">{formatCurrency(selectedMyCertificate.purchaseAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Current Value</span>
                      <span className="text-emerald-400 font-semibold">
                        {formatCurrency(selectedMyCertificate.currentValue)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Interest Rate</span>
                      <span className="text-white">{selectedMyCertificate.interestRate}% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Purchase Date</span>
                      <span className="text-white">{selectedMyCertificate.purchaseDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Maturity Date</span>
                      <span className="text-white">{selectedMyCertificate.maturityDate}</span>
                    </div>
                  </div>
                </div>

                {selectedMyCertificate.status === "active" && (
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Bell className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 font-semibold text-sm">Next Interest Payment</span>
                    </div>
                    <p className="text-white">{selectedMyCertificate.nextInterestDate}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Certificate
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    <Clock className="w-4 h-4 mr-2" />
                    History
                  </Button>
                </div>

                {selectedMyCertificate.status === "matured" && (
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Encash Certificate</Button>
                )}

                {selectedMyCertificate.status === "active" && (
                  <Button
                    variant="outline"
                    className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Premature Encashment
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
