"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, CreditCard, Plane, Eye, Shield, Clock } from "lucide-react"
import { DocumentUpload } from "./document-upload"
import { SelfieCapture } from "./selfie-capture"
import { KycVerificationResult } from "./kyc-verification-result"

interface KycVerificationProps {
  onBack: () => void
  onComplete: () => void
}

type KycStep = "document-type" | "document-upload" | "selfie" | "verification" | "result"
type DocumentType = "nid" | "passport" | "driving-license"

export function KycVerification({ onBack, onComplete }: KycVerificationProps) {
  const [currentStep, setCurrentStep] = useState<KycStep>("document-type")
  const [documentType, setDocumentType] = useState<DocumentType>("nid")
  const [uploadedDocuments, setUploadedDocuments] = useState<{
    front?: File
    back?: File
    selfie?: File
  }>({})
  const [verificationProgress, setVerificationProgress] = useState(0)
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "success" | "failed">("pending")

  const documentTypes = [
    {
      id: "nid" as const,
      name: "National ID Card",
      description: "Government issued National Identity Card",
      icon: FileText,
      requiresBack: true,
    },
    {
      id: "passport" as const,
      name: "Passport",
      description: "Valid passport with photo page",
      icon: Plane,
      requiresBack: false,
    },
    {
      id: "driving-license" as const,
      name: "Driving License",
      description: "Valid driving license",
      icon: CreditCard,
      requiresBack: true,
    },
  ]

  const getStepProgress = () => {
    switch (currentStep) {
      case "document-type":
        return 20
      case "document-upload":
        return 40
      case "selfie":
        return 60
      case "verification":
        return 80
      case "result":
        return 100
      default:
        return 0
    }
  }

  const handleDocumentTypeNext = () => {
    setCurrentStep("document-upload")
  }

  const handleDocumentsUploaded = (documents: { front?: File; back?: File }) => {
    setUploadedDocuments((prev) => ({ ...prev, ...documents }))
    setCurrentStep("selfie")
  }

  const handleSelfieCapture = (selfie: File) => {
    setUploadedDocuments((prev) => ({ ...prev, selfie }))
    setCurrentStep("verification")
    simulateVerification()
  }

  const simulateVerification = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      setVerificationProgress(Math.min(progress, 100))

      if (progress >= 100) {
        clearInterval(interval)
        // Simulate verification result (90% success rate)
        const isSuccess = Math.random() > 0.1
        setVerificationStatus(isSuccess ? "success" : "failed")
        setCurrentStep("result")
      }
    }, 500)
  }

  const selectedDocumentType = documentTypes.find((doc) => doc.id === documentType)

  if (currentStep === "result") {
    return (
      <KycVerificationResult
        status={verificationStatus}
        onRetry={() => {
          setCurrentStep("document-type")
          setVerificationProgress(0)
          setVerificationStatus("pending")
          setUploadedDocuments({})
        }}
        onComplete={onComplete}
      />
    )
  }

  return (
    <div className="min-h-screen gradient-bg-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="glass-strong">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle className="text-2xl font-bold">Identity Verification</CardTitle>
                <CardDescription>Secure your account with government-issued ID verification</CardDescription>
              </div>
              <Badge variant="outline" className="glass">
                Step{" "}
                {currentStep === "document-type"
                  ? 1
                  : currentStep === "document-upload"
                    ? 2
                    : currentStep === "selfie"
                      ? 3
                      : 4}{" "}
                of 4
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>{getStepProgress()}%</span>
              </div>
              <Progress value={getStepProgress()} className="h-2" />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Document Type Selection */}
            {currentStep === "document-type" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">Select your document type</Label>
                  <RadioGroup value={documentType} onValueChange={(value) => setDocumentType(value as DocumentType)}>
                    <div className="space-y-3">
                      {documentTypes.map((doc) => {
                        const Icon = doc.icon
                        return (
                          <div key={doc.id} className="flex items-center space-x-3">
                            <RadioGroupItem value={doc.id} id={doc.id} />
                            <Label
                              htmlFor={doc.id}
                              className="flex items-center space-x-3 flex-1 p-4 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors"
                            >
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Icon className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{doc.name}</div>
                                <div className="text-sm text-muted-foreground">{doc.description}</div>
                              </div>
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                  </RadioGroup>
                </div>

                {/* Requirements */}
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-start space-x-3">
                    <Eye className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="space-y-2">
                      <h4 className="font-medium text-primary">Document Requirements</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Clear, high-quality photo</li>
                        <li>• All text must be readable</li>
                        <li>• Document must be valid and not expired</li>
                        {selectedDocumentType?.requiresBack && <li>• Both front and back sides required</li>}
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleDocumentTypeNext}
                  className="w-full gradient-bg text-white hover:opacity-90 transition-opacity"
                >
                  Continue with {selectedDocumentType?.name}
                </Button>
              </div>
            )}

            {/* Document Upload */}
            {currentStep === "document-upload" && (
              <DocumentUpload
                documentType={documentType}
                requiresBack={selectedDocumentType?.requiresBack || false}
                onUploadComplete={handleDocumentsUploaded}
                onBack={() => setCurrentStep("document-type")}
              />
            )}

            {/* Selfie Capture */}
            {currentStep === "selfie" && (
              <SelfieCapture onCapture={handleSelfieCapture} onBack={() => setCurrentStep("document-upload")} />
            )}

            {/* Verification in Progress */}
            {currentStep === "verification" && (
              <div className="space-y-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-primary animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Verifying Your Identity</h3>
                  <p className="text-muted-foreground">
                    We're securely processing your documents using advanced AI verification
                  </p>
                </div>

                <div className="space-y-3">
                  <Progress value={verificationProgress} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    {verificationProgress < 30
                      ? "Analyzing document authenticity..."
                      : verificationProgress < 60
                        ? "Extracting personal information..."
                        : verificationProgress < 90
                          ? "Cross-referencing with government database..."
                          : "Finalizing verification..."}
                  </p>
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>This usually takes 30-60 seconds</span>
                </div>
              </div>
            )}

            {/* Security Notice */}
            <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-primary">Your Privacy is Protected</p>
                <p className="text-muted-foreground">
                  All documents are encrypted and processed securely. We comply with data protection regulations and
                  never store unnecessary personal information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
