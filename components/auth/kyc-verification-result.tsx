"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, RefreshCw, ArrowRight, Shield, Clock, AlertTriangle } from "lucide-react"

interface KycVerificationResultProps {
  status: "success" | "failed"
  onRetry: () => void
  onComplete: () => void
}

export function KycVerificationResult({ status, onRetry, onComplete }: KycVerificationResultProps) {
  const isSuccess = status === "success"

  return (
    <div className="min-h-screen gradient-bg-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="glass-strong">
          <CardHeader className="text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isSuccess ? "bg-primary/10" : "bg-destructive/10"
              }`}
            >
              {isSuccess ? (
                <CheckCircle className="w-8 h-8 text-primary" />
              ) : (
                <XCircle className="w-8 h-8 text-destructive" />
              )}
            </div>

            <CardTitle className="text-2xl font-bold">
              {isSuccess ? "Verification Successful!" : "Verification Failed"}
            </CardTitle>

            <CardDescription className="text-balance">
              {isSuccess
                ? "Your identity has been successfully verified. You can now access all MoneyMatte features."
                : "We couldn't verify your identity with the provided documents. Please try again with clearer photos."}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {isSuccess ? (
              <>
                {/* Success Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <span className="font-medium">Identity Verified</span>
                    </div>
                    <Badge variant="default" className="bg-primary text-white">
                      Approved
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm">Verification completed</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Just now</span>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-medium text-primary mb-2">What's Next?</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Access your personalized dashboard</li>
                    <li>• Start making secure transactions</li>
                    <li>• Explore investment opportunities</li>
                    <li>• Set up your financial goals</li>
                  </ul>
                </div>

                <Button
                  onClick={onComplete}
                  className="w-full gradient-bg text-white hover:opacity-90 transition-opacity"
                >
                  Continue to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            ) : (
              <>
                {/* Failure Reasons */}
                <div className="space-y-3">
                  <div className="p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                      <div className="space-y-1">
                        <p className="font-medium text-destructive">Common Issues:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Document photo is blurry or unclear</li>
                          <li>• Information doesn't match between documents</li>
                          <li>• Document appears to be expired</li>
                          <li>• Selfie doesn't match document photo</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Retry Options */}
                <div className="space-y-3">
                  <Button
                    onClick={onRetry}
                    className="w-full gradient-bg text-white hover:opacity-90 transition-opacity"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>

                  <Button variant="outline" className="w-full glass bg-transparent">
                    Contact Support
                  </Button>
                </div>

                {/* Help Text */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Need help? Our support team is available 24/7 to assist you with the verification process.
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
