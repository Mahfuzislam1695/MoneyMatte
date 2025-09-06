"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Mail, Phone, Shield, RefreshCw } from "lucide-react"

interface OtpVerificationProps {
  contactInfo: string
  type: "email" | "phone"
  onBack: () => void
  onVerified: () => void
}

export function OtpVerification({ contactInfo, type, onBack, onVerified }: OtpVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpCode = otp.join("")
    if (otpCode.length === 6) {
      // Verify OTP
      console.log("Verifying OTP:", otpCode)
      onVerified()
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setTimeLeft(120)
    setIsResending(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen gradient-bg-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="glass-strong">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              {type === "email" ? (
                <Mail className="w-8 h-8 text-primary" />
              ) : (
                <Phone className="w-8 h-8 text-primary" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold">Verify Your {type === "email" ? "Email" : "Phone"}</CardTitle>
            <CardDescription className="text-balance">
              We've sent a 6-digit verification code to{" "}
              <span className="font-medium text-foreground">
                {type === "email"
                  ? contactInfo.replace(/(.{2})(.*)(@.*)/, "$1***$3")
                  : contactInfo.replace(/(\+\d{3})(\d{4})(\d{6})/, "$1 $2-***$3")}
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* OTP Input */}
              <div className="space-y-2">
                <div className="flex justify-center space-x-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-lg font-bold glass"
                    />
                  ))}
                </div>
              </div>

              {/* Timer and Resend */}
              <div className="text-center space-y-3">
                {timeLeft > 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Code expires in <span className="font-medium text-foreground">{formatTime(timeLeft)}</span>
                  </p>
                ) : (
                  <p className="text-sm text-destructive">Code has expired. Please request a new one.</p>
                )}

                <Button
                  type="button"
                  variant="link"
                  className="text-primary hover:underline"
                  onClick={handleResend}
                  disabled={timeLeft > 0 || isResending}
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Resend Code"
                  )}
                </Button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full gradient-bg text-white hover:opacity-90 transition-opacity"
                disabled={otp.join("").length !== 6}
              >
                Verify & Continue
              </Button>
            </form>

            {/* Security Notice */}
            <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-primary">Secure Verification</p>
                <p className="text-muted-foreground">This code is valid for 2 minutes and can only be used once.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
