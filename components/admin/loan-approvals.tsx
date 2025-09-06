"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Search, CreditCard, Eye, Check, X, Clock, User, DollarSign, FileText, Calculator } from "lucide-react"

export function LoanApprovals() {
  const [selectedLoan, setSelectedLoan] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const loanApplications = [
    {
      id: "LOAN-2024-001",
      customer: "John Doe",
      email: "john.doe@email.com",
      phone: "+880 1712-345678",
      loanType: "Personal Loan",
      amount: "৳500,000",
      tenure: "24 months",
      purpose: "Home renovation",
      status: "pending",
      applied: "2024-01-15 10:30 AM",
      creditScore: 750,
      monthlyIncome: "৳80,000",
      existingLoans: "৳200,000",
      employmentType: "Salaried",
      company: "ABC Corporation",
      riskLevel: "low",
      documents: ["Salary Certificate", "Bank Statement", "NID Copy"],
    },
    {
      id: "LOAN-2024-002",
      customer: "Sarah Khan",
      email: "sarah.khan@email.com",
      phone: "+880 1812-345678",
      loanType: "SME Loan",
      amount: "৳2,000,000",
      tenure: "36 months",
      purpose: "Business expansion",
      status: "review",
      applied: "2024-01-15 09:15 AM",
      creditScore: 680,
      monthlyIncome: "৳150,000",
      existingLoans: "৳500,000",
      employmentType: "Business Owner",
      company: "Khan Enterprises",
      riskLevel: "medium",
      documents: ["Business License", "Tax Returns", "Financial Statements"],
    },
    {
      id: "LOAN-2024-003",
      customer: "Ahmed Ali",
      email: "ahmed.ali@email.com",
      phone: "+880 1912-345678",
      loanType: "Education Loan",
      amount: "৳300,000",
      tenure: "48 months",
      purpose: "Masters degree abroad",
      status: "approved",
      applied: "2024-01-15 08:45 AM",
      creditScore: 720,
      monthlyIncome: "৳60,000",
      existingLoans: "৳0",
      employmentType: "Student",
      company: "University of Dhaka",
      riskLevel: "low",
      documents: ["Admission Letter", "Guardian Income Certificate", "Academic Transcripts"],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "review":
        return "outline"
      case "approved":
        return "default"
      case "rejected":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "default"
      case "medium":
        return "secondary"
      case "high":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return "text-primary"
    if (score >= 650) return "text-secondary"
    return "text-destructive"
  }

  const handleApprove = (loanId: string) => {
    console.log("[v0] Approving loan:", loanId)
    // Handle loan approval logic
  }

  const handleReject = (loanId: string, reason: string) => {
    console.log("[v0] Rejecting loan:", loanId, "Reason:", reason)
    // Handle loan rejection logic
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Loan Approvals</h2>
          <p className="text-muted-foreground">Review and approve loan applications</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search loan applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Loan Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-secondary">8</p>
              </div>
              <Clock className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved Today</p>
                <p className="text-2xl font-bold text-primary">5</p>
              </div>
              <Check className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold text-accent">৳12.5M</p>
              </div>
              <DollarSign className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approval Rate</p>
                <p className="text-2xl font-bold text-primary">78%</p>
              </div>
              <CreditCard className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loan Applications Table */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Loan Applications</CardTitle>
          <CardDescription>Customer loan requests awaiting approval decision</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loanApplications.map((loan) => (
              <div key={loan.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-muted-foreground">{loan.id}</span>
                      <Badge variant={getStatusColor(loan.status)}>{loan.status}</Badge>
                      <Badge variant={getRiskColor(loan.riskLevel)}>{loan.riskLevel} risk</Badge>
                    </div>
                    <h4 className="font-semibold text-foreground">{loan.customer}</h4>
                    <p className="text-sm text-muted-foreground">
                      {loan.loanType} • {loan.amount} • {loan.tenure}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {loan.employmentType}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {loan.applied}
                      </span>
                      <span className={`font-medium ${getCreditScoreColor(loan.creditScore)}`}>
                        Credit: {loan.creditScore}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedLoan(loan)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Loan Application Review - {loan.id}</DialogTitle>
                          <DialogDescription>Evaluate loan application and make approval decision</DialogDescription>
                        </DialogHeader>
                        <Tabs defaultValue="application" className="w-full">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="application">Application</TabsTrigger>
                            <TabsTrigger value="financial">Financial</TabsTrigger>
                            <TabsTrigger value="documents">Documents</TabsTrigger>
                            <TabsTrigger value="decision">Decision</TabsTrigger>
                          </TabsList>
                          <TabsContent value="application" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Customer Name</label>
                                <p className="text-sm text-muted-foreground">{loan.customer}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Loan Type</label>
                                <p className="text-sm text-muted-foreground">{loan.loanType}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Loan Amount</label>
                                <p className="text-sm font-semibold text-primary">{loan.amount}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Tenure</label>
                                <p className="text-sm text-muted-foreground">{loan.tenure}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Purpose</label>
                                <p className="text-sm text-muted-foreground">{loan.purpose}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Employment</label>
                                <p className="text-sm text-muted-foreground">
                                  {loan.employmentType} at {loan.company}
                                </p>
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="financial" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Credit Score</label>
                                <div className="flex items-center gap-2">
                                  <p className={`text-lg font-bold ${getCreditScoreColor(loan.creditScore)}`}>
                                    {loan.creditScore}
                                  </p>
                                  <Progress value={(loan.creditScore / 850) * 100} className="flex-1" />
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Monthly Income</label>
                                <p className="text-sm font-semibold text-primary">{loan.monthlyIncome}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Existing Loans</label>
                                <p className="text-sm text-muted-foreground">{loan.existingLoans}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Risk Assessment</label>
                                <Badge variant={getRiskColor(loan.riskLevel)}>{loan.riskLevel} risk</Badge>
                              </div>
                            </div>
                            <div className="border rounded-lg p-4 bg-muted/20">
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <Calculator className="w-4 h-4" />
                                Loan Calculation
                              </h4>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground">Monthly EMI</p>
                                  <p className="font-semibold">৳25,500</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Total Interest</p>
                                  <p className="font-semibold">৳112,000</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Total Amount</p>
                                  <p className="font-semibold">৳612,000</p>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="documents" className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-3">Submitted Documents</h4>
                              <div className="space-y-2">
                                {loan.documents.map((doc, index) => (
                                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-2">
                                      <FileText className="w-4 h-4 text-muted-foreground" />
                                      <span className="text-sm">{doc}</span>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">
                                        <Eye className="w-4 h-4 mr-2" />
                                        View
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        Download
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="decision" className="space-y-4">
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Approval Notes</label>
                                <Textarea placeholder="Add notes for approval/rejection decision..." className="mt-1" />
                              </div>
                              <div className="flex gap-3">
                                <Button className="flex-1" onClick={() => handleApprove(loan.id)}>
                                  <Check className="w-4 h-4 mr-2" />
                                  Approve Loan
                                </Button>
                                <Button
                                  variant="destructive"
                                  className="flex-1"
                                  onClick={() => handleReject(loan.id, "Insufficient income")}
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  Reject Loan
                                </Button>
                              </div>
                              <Button variant="outline" className="w-full bg-transparent">
                                Request Additional Information
                              </Button>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
