"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, CheckCircle, Clock, AlertTriangle, Upload, Eye, Download, RefreshCw, Shield } from "lucide-react"

export function KycManagement() {
  const [documents] = useState([
    {
      id: "nid",
      name: "National ID Card",
      status: "verified",
      uploadDate: "2024-01-15",
      expiryDate: "2029-01-15",
      verificationDate: "2024-01-16",
    },
    {
      id: "selfie",
      name: "Identity Selfie",
      status: "verified",
      uploadDate: "2024-01-15",
      verificationDate: "2024-01-16",
    },
    {
      id: "address",
      name: "Address Proof",
      status: "pending",
      uploadDate: "2024-01-20",
    },
  ])

  const verificationLevel = 85 // Mock verification progress

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-primary" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "rejected":
        return <AlertTriangle className="w-4 h-4 text-destructive" />
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="default" className="bg-primary text-white">
            Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-600 text-yellow-600">
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive" className="bg-destructive text-white">
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Not Uploaded
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">KYC Management</h3>
        <p className="text-sm text-muted-foreground">Manage your identity verification documents and status</p>
      </div>

      {/* Verification Status */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <span>Verification Status</span>
            </div>
            <Badge variant="default" className="bg-primary text-white">
              Level 3 Verified
            </Badge>
          </CardTitle>
          <CardDescription>Your identity verification progress and current level</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Verification Progress</span>
              <span className="text-primary font-medium">{verificationLevel}%</span>
            </div>
            <Progress value={verificationLevel} className="h-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/20">
              <CheckCircle className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="font-medium text-primary">Identity Verified</p>
              <p className="text-xs text-muted-foreground">Government ID confirmed</p>
            </div>
            <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/20">
              <CheckCircle className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="font-medium text-primary">Biometric Match</p>
              <p className="text-xs text-muted-foreground">Selfie verification passed</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <Clock className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
              <p className="font-medium text-yellow-600">Address Pending</p>
              <p className="text-xs text-muted-foreground">Under review</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Management */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <span>Document Management</span>
          </CardTitle>
          <CardDescription>View and manage your uploaded verification documents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg glass">
              <div className="flex items-center space-x-3">
                {getStatusIcon(doc.status)}
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Uploaded: {doc.uploadDate}</span>
                    {doc.verificationDate && <span>Verified: {doc.verificationDate}</span>}
                    {doc.expiryDate && <span>Expires: {doc.expiryDate}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {getStatusBadge(doc.status)}
                <div className="flex space-x-1">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
                    <Download className="w-3 h-3" />
                  </Button>
                  {doc.status === "rejected" && (
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
                      <RefreshCw className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Upload New Document */}
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 hover:bg-accent/50 transition-colors">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="font-medium mb-1">Upload Additional Documents</p>
            <p className="text-sm text-muted-foreground mb-4">Add more documents to increase your verification level</p>
            <Button variant="outline" className="glass bg-transparent">
              <Upload className="w-4 h-4 mr-2" />
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Verification Benefits */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-primary" />
            </div>
            <span>Verification Benefits</span>
          </CardTitle>
          <CardDescription>Unlock more features with higher verification levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-medium">Higher Transaction Limits</span>
              </div>
              <Badge variant="default" className="bg-primary text-white">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-medium">International Transfers</span>
              </div>
              <Badge variant="default" className="bg-primary text-white">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-muted-foreground">Premium Investment Options</span>
              </div>
              <Badge variant="outline" className="text-muted-foreground">
                Level 4 Required
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
