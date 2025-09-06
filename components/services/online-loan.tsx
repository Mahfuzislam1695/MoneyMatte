"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CreditCard,
  Calculator,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Upload,
  TrendingUp,
  User,
  Building,
  GraduationCap,
  Home,
} from "lucide-react"

interface LoanProduct {
  id: string
  name: string
  type: "personal" | "sme" | "education" | "home"
  interestRate: number
  maxAmount: number
  maxTenure: number
  processingFee: number
  description: string
  features: string[]
  eligibility: string[]
  documents: string[]
}

interface LoanApplication {
  id: string
  loanType: string
  amount: number
  tenure: number
  interestRate: number
  applicationDate: string
  status: "pending" | "approved" | "rejected" | "disbursed"
  applicationNumber: string
  emi: number
  nextStep?: string
}

const loanProducts: LoanProduct[] = [
  {
    id: "1",
    name: "Personal Loan",
    type: "personal",
    interestRate: 12.5,
    maxAmount: 1000000,
    maxTenure: 5,
    processingFee: 2,
    description: "Quick personal loan for your immediate needs",
    features: ["No collateral required", "Quick approval", "Flexible repayment", "Minimal documentation"],
    eligibility: ["Age 21-60 years", "Monthly income ৳25,000+", "Employment history 2+ years"],
    documents: ["NID copy", "Salary certificate", "Bank statement", "Passport size photo"],
  },
  {
    id: "2",
    name: "SME Loan",
    type: "sme",
    interestRate: 10.5,
    maxAmount: 5000000,
    maxTenure: 7,
    processingFee: 1.5,
    description: "Business loan for small and medium enterprises",
    features: ["Competitive rates", "Business growth support", "Flexible terms", "Expert guidance"],
    eligibility: ["Business age 2+ years", "Annual turnover ৳10L+", "Valid trade license"],
    documents: ["Trade license", "Financial statements", "Bank statements", "Business plan"],
  },
  {
    id: "3",
    name: "Education Loan",
    type: "education",
    interestRate: 8.5,
    maxAmount: 2000000,
    maxTenure: 10,
    processingFee: 1,
    description: "Education loan for higher studies and skill development",
    features: ["Low interest rate", "Moratorium period", "Study abroad support", "Flexible repayment"],
    eligibility: ["Age 18-35 years", "Admission confirmation", "Co-applicant required"],
    documents: ["Admission letter", "Fee structure", "Academic transcripts", "Co-applicant documents"],
  },
  {
    id: "4",
    name: "Home Loan",
    type: "home",
    interestRate: 9.5,
    maxAmount: 10000000,
    maxTenure: 20,
    processingFee: 1,
    description: "Home loan for purchasing or constructing your dream home",
    features: ["Long tenure", "Property insurance", "Top-up facility", "Tax benefits"],
    eligibility: ["Age 21-65 years", "Stable income", "Property documents"],
    documents: ["Property papers", "Income proof", "Bank statements", "Valuation report"],
  },
]

const myApplications: LoanApplication[] = [
  {
    id: "1",
    loanType: "Personal Loan",
    amount: 500000,
    tenure: 3,
    interestRate: 12.5,
    applicationDate: "2024-01-10",
    status: "approved",
    applicationNumber: "PL2024001234",
    emi: 16680,
    nextStep: "Visit branch for disbursement",
  },
  {
    id: "2",
    loanType: "SME Loan",
    amount: 2000000,
    tenure: 5,
    interestRate: 10.5,
    applicationDate: "2024-01-05",
    status: "pending",
    applicationNumber: "SME2024001235",
    emi: 42900,
    nextStep: "Document verification in progress",
  },
  {
    id: "3",
    loanType: "Education Loan",
    amount: 800000,
    tenure: 8,
    interestRate: 8.5,
    applicationDate: "2023-12-20",
    status: "disbursed",
    applicationNumber: "EDU2023001236",
    emi: 12450,
  },
]

export default function OnlineLoan() {
  const [selectedLoan, setSelectedLoan] = useState<LoanProduct | null>(null)
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null)
  const [showApplication, setShowApplication] = useState(false)
  const [showCalculator, setShowCalculator] = useState(false)
  const [loanAmount, setLoanAmount] = useState("")
  const [loanTenure, setLoanTenure] = useState("")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "disbursed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "rejected":
        return <AlertCircle className="w-4 h-4" />
      case "disbursed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getLoanIcon = (type: string) => {
    switch (type) {
      case "personal":
        return <User className="w-6 h-6 text-emerald-400" />
      case "sme":
        return <Building className="w-6 h-6 text-emerald-400" />
      case "education":
        return <GraduationCap className="w-6 h-6 text-emerald-400" />
      case "home":
        return <Home className="w-6 h-6 text-emerald-400" />
      default:
        return <CreditCard className="w-6 h-6 text-emerald-400" />
    }
  }

  const calculateEMI = (principal: number, rate: number, tenure: number) => {
    const monthlyRate = rate / 12 / 100
    const months = tenure * 12
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    return Math.round(emi)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Online Loans</h1>
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
                <FileText className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-gray-300">Applications</span>
              </div>
              <p className="text-xl font-bold text-white">3</p>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-gray-300">Active Loans</span>
              </div>
              <p className="text-xl font-bold text-white">1</p>
            </div>
          </div>
        </div>

        {/* EMI Calculator */}
        {showCalculator && (
          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-400" />
                EMI Calculator
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Loan Amount</label>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
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
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(e.target.value)}
                    placeholder="Enter years"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                {loanAmount && loanTenure && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-emerald-400">
                        {formatCurrency(calculateEMI(Number(loanAmount), 12, Number(loanTenure)))}
                      </p>
                      <p className="text-emerald-400 text-sm">Monthly EMI</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-xl border border-white/20">
            <TabsTrigger value="products" className="text-white data-[state=active]:bg-emerald-600">
              Loan Products
            </TabsTrigger>
            <TabsTrigger value="applications" className="text-white data-[state=active]:bg-emerald-600">
              My Applications
            </TabsTrigger>
          </TabsList>

          {/* Loan Products */}
          <TabsContent value="products" className="space-y-4 mt-4">
            {loanProducts.map((loan) => (
              <Card
                key={loan.id}
                className="backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedLoan(loan)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getLoanIcon(loan.type)}
                      <div>
                        <h3 className="font-semibold text-white text-lg">{loan.name}</h3>
                        <p className="text-gray-300 text-sm">{loan.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-emerald-400">{loan.interestRate}%</p>
                      <p className="text-xs text-gray-300">Interest Rate</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-white font-semibold">{formatCurrency(loan.maxAmount)}</p>
                      <p className="text-gray-300 text-xs">Max Amount</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-white font-semibold">{loan.maxTenure} Years</p>
                      <p className="text-gray-300 text-xs">Max Tenure</p>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedLoan(loan)
                      setShowApplication(true)
                    }}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* My Applications */}
          <TabsContent value="applications" className="space-y-4 mt-4">
            {myApplications.map((application) => (
              <Card
                key={application.id}
                className="backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedApplication(application)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-white">{application.loanType}</h3>
                      <p className="text-gray-300 text-sm font-mono">{application.applicationNumber}</p>
                    </div>
                    <Badge className={getStatusColor(application.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(application.status)}
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </div>
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">Loan Amount</span>
                      <span className="text-white font-semibold">{formatCurrency(application.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">EMI</span>
                      <span className="text-white font-semibold">{formatCurrency(application.emi)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">Tenure</span>
                      <span className="text-white">{application.tenure} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">Application Date</span>
                      <span className="text-white">{application.applicationDate}</span>
                    </div>
                  </div>

                  {application.nextStep && (
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <p className="text-blue-400 text-sm font-semibold">Next Step:</p>
                      <p className="text-blue-400 text-sm">{application.nextStep}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Loan Product Details Modal */}
        {selectedLoan && !showApplication && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
            <div className="w-full max-w-md mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-3xl border-t border-white/20 p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">{selectedLoan.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedLoan(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-400">{selectedLoan.interestRate}%</p>
                    <p className="text-emerald-400 text-sm">Interest Rate (Reducing)</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-white font-semibold">{formatCurrency(selectedLoan.maxAmount)}</p>
                    <p className="text-gray-300 text-xs">Max Amount</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-white font-semibold">{selectedLoan.maxTenure} Years</p>
                    <p className="text-gray-300 text-xs">Max Tenure</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Features</h4>
                  {selectedLoan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Eligibility</h4>
                  {selectedLoan.eligibility.map((criteria, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300 text-sm">{criteria}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => setShowApplication(true)}
                >
                  Apply for This Loan
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Loan Application Modal */}
        {showApplication && selectedLoan && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
            <div className="w-full max-w-md mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-3xl border-t border-white/20 p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Apply for {selectedLoan.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowApplication(false)
                    setSelectedLoan(null)
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-white font-semibold mb-2">{selectedLoan.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Interest Rate:</span>
                      <span className="text-emerald-400">{selectedLoan.interestRate}% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Processing Fee:</span>
                      <span className="text-white">{selectedLoan.processingFee}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Loan Amount</label>
                    <input
                      type="number"
                      placeholder={`Max: ${formatCurrency(selectedLoan.maxAmount)}`}
                      className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Tenure (Years)</label>
                    <select className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white focus:border-emerald-500 focus:outline-none">
                      <option value="">Select tenure</option>
                      {Array.from({ length: selectedLoan.maxTenure }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} Year{i > 0 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Purpose</label>
                    <textarea
                      placeholder="Describe the purpose of loan"
                      className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none h-20 resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Required Documents</h4>
                  {selectedLoan.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
                    >
                      <span className="text-gray-300 text-sm">{doc}</span>
                      <Button variant="ghost" size="sm" className="text-emerald-400 hover:bg-emerald-500/20">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Submit Application</Button>
              </div>
            </div>
          </div>
        )}

        {/* Application Details Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
            <div className="w-full max-w-md mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-3xl border-t border-white/20 p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Application Details</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Application Number</span>
                      <span className="text-white font-mono">{selectedApplication.applicationNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Loan Type</span>
                      <span className="text-white">{selectedApplication.loanType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Loan Amount</span>
                      <span className="text-white">{formatCurrency(selectedApplication.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">EMI</span>
                      <span className="text-emerald-400 font-semibold">{formatCurrency(selectedApplication.emi)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Interest Rate</span>
                      <span className="text-white">{selectedApplication.interestRate}% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Tenure</span>
                      <span className="text-white">{selectedApplication.tenure} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Application Date</span>
                      <span className="text-white">{selectedApplication.applicationDate}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getStatusColor(selectedApplication.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(selectedApplication.status)}
                        {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                      </div>
                    </Badge>
                  </div>
                  {selectedApplication.nextStep && (
                    <p className="text-gray-300 text-sm">{selectedApplication.nextStep}</p>
                  )}
                </div>

                {selectedApplication.status === "approved" && (
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Accept Loan Offer</Button>
                )}

                {selectedApplication.status === "disbursed" && (
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                      View Schedule
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                      Make Payment
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
