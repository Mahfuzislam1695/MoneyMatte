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
import { Search, Eye, Check, X, Clock, User, AlertTriangle, Download } from "lucide-react"

export function KYCVerification() {
  const [selectedKYC, setSelectedKYC] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const kycSubmissions = [
    {
      id: "KYC-2024-001",
      customer: "John Doe",
      email: "john.doe@email.com",
      phone: "+880 1712-345678",
      documentType: "National ID",
      documentNumber: "1234567890123",
      status: "pending",
      submitted: "2024-01-15 10:30 AM",
      frontImage: "/nid-front.jpg",
      backImage: "/nid-back.jpg",
      selfieImage: "/casual-outdoor-selfie.png",
      riskScore: "low",
      autoVerification: "passed",
    },
    {
      id: "KYC-2024-002",
      customer: "Sarah Khan",
      email: "sarah.khan@email.com",
      phone: "+880 1812-345678",
      documentType: "Passport",
      documentNumber: "BP1234567",
      status: "review",
      submitted: "2024-01-15 09:15 AM",
      frontImage: "/passport-front.jpg",
      backImage: "/passport-back.jpg",
      selfieImage: "/selfie-2.jpg",
      riskScore: "medium",
      autoVerification: "manual-review",
    },
    {
      id: "KYC-2024-003",
      customer: "Ahmed Ali",
      email: "ahmed.ali@email.com",
      phone: "+880 1912-345678",
      documentType: "Driving License",
      documentNumber: "DL-987654321",
      status: "rejected",
      submitted: "2024-01-15 08:45 AM",
      frontImage: "/license-front.jpg",
      backImage: "/license-back.jpg",
      selfieImage: "/selfie-3.jpg",
      riskScore: "high",
      autoVerification: "failed",
      rejectionReason: "Document image quality too low",
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

  const handleApprove = (kycId: string) => {
    console.log("[v0] Approving KYC:", kycId)
    // Handle KYC approval logic
  }

  const handleReject = (kycId: string, reason: string) => {
    console.log("[v0] Rejecting KYC:", kycId, "Reason:", reason)
    // Handle KYC rejection logic
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">KYC Verification</h2>
          <p className="text-muted-foreground">Review and verify customer identity documents</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search KYC submissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* KYC Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-secondary">24</p>
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
                <p className="text-2xl font-bold text-primary">18</p>
              </div>
              <Check className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-destructive">3</p>
              </div>
              <X className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Risk</p>
                <p className="text-2xl font-bold text-accent">2</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KYC Submissions Table */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>KYC Submissions</CardTitle>
          <CardDescription>Identity verification documents awaiting review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {kycSubmissions.map((kyc) => (
              <div key={kyc.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-muted-foreground">{kyc.id}</span>
                      <Badge variant={getStatusColor(kyc.status)}>{kyc.status}</Badge>
                      <Badge variant={getRiskColor(kyc.riskScore)}>{kyc.riskScore} risk</Badge>
                    </div>
                    <h4 className="font-semibold text-foreground">{kyc.customer}</h4>
                    <p className="text-sm text-muted-foreground">
                      {kyc.documentType} • {kyc.documentNumber}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {kyc.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {kyc.submitted}
                      </span>
                      <span
                        className={`font-medium ${kyc.autoVerification === "passed" ? "text-primary" : kyc.autoVerification === "failed" ? "text-destructive" : "text-secondary"}`}
                      >
                        Auto: {kyc.autoVerification}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedKYC(kyc)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>KYC Review - {kyc.id}</DialogTitle>
                          <DialogDescription>Verify customer identity documents and information</DialogDescription>
                        </DialogHeader>
                        <Tabs defaultValue="documents" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="documents">Documents</TabsTrigger>
                            <TabsTrigger value="verification">Verification</TabsTrigger>
                            <TabsTrigger value="decision">Decision</TabsTrigger>
                          </TabsList>
                          <TabsContent value="documents" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2">Document Front</h4>
                                <div className="border rounded-lg p-2">
                                  <img
                                    src={kyc.frontImage || "/placeholder.svg"}
                                    alt="Document Front"
                                    className="w-full h-48 object-cover rounded"
                                  />
                                  <Button variant="outline" size="sm" className="mt-2 w-full bg-transparent">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                  </Button>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Document Back</h4>
                                <div className="border rounded-lg p-2">
                                  <img
                                    src={kyc.backImage || "/placeholder.svg"}
                                    alt="Document Back"
                                    className="w-full h-48 object-cover rounded"
                                  />
                                  <Button variant="outline" size="sm" className="mt-2 w-full bg-transparent">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="max-w-xs mx-auto">
                              <h4 className="font-medium mb-2 text-center">Selfie Photo</h4>
                              <div className="border rounded-lg p-2">
                                <img
                                  src={kyc.selfieImage || "/placeholder.svg"}
                                  alt="Selfie"
                                  className="w-full h-48 object-cover rounded"
                                />
                                <Button variant="outline" size="sm" className="mt-2 w-full bg-transparent">
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="verification" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Customer Name</label>
                                <p className="text-sm text-muted-foreground">{kyc.customer}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Document Type</label>
                                <p className="text-sm text-muted-foreground">{kyc.documentType}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Document Number</label>
                                <p className="text-sm text-muted-foreground">{kyc.documentNumber}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Risk Assessment</label>
                                <Badge variant={getRiskColor(kyc.riskScore)}>{kyc.riskScore} risk</Badge>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Auto Verification</label>
                                <p
                                  className={`text-sm font-medium ${kyc.autoVerification === "passed" ? "text-primary" : kyc.autoVerification === "failed" ? "text-destructive" : "text-secondary"}`}
                                >
                                  {kyc.autoVerification}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Submission Date</label>
                                <p className="text-sm text-muted-foreground">{kyc.submitted}</p>
                              </div>
                            </div>
                            {kyc.rejectionReason && (
                              <div>
                                <label className="text-sm font-medium">Previous Rejection Reason</label>
                                <p className="text-sm text-destructive">{kyc.rejectionReason}</p>
                              </div>
                            )}
                          </TabsContent>
                          <TabsContent value="decision" className="space-y-4">
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Verification Notes</label>
                                <Textarea
                                  placeholder="Add verification notes or reasons for decision..."
                                  className="mt-1"
                                />
                              </div>
                              <div className="flex gap-3">
                                <Button className="flex-1" onClick={() => handleApprove(kyc.id)}>
                                  <Check className="w-4 h-4 mr-2" />
                                  Approve KYC
                                </Button>
                                <Button
                                  variant="destructive"
                                  className="flex-1"
                                  onClick={() => handleReject(kyc.id, "Manual review required")}
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  Reject KYC
                                </Button>
                              </div>
                              <Button variant="outline" className="w-full bg-transparent">
                                Request Additional Documents
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
