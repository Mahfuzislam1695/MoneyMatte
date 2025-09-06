"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Mail, Phone, Eye, EyeOff, Shield } from "lucide-react"
import { OtpVerification } from "./otp-verification"
import { KycVerification } from "./kyc-verification"

interface SignUpFormProps {
  onBack: () => void
  onSwitchToLogin: () => void
  onComplete?: () => void
}

export function SignUpForm({ onBack, onSwitchToLogin, onComplete }: SignUpFormProps) {
  const [step, setStep] = useState<"form" | "otp" | "kyc">("form")
  const [registrationType, setRegistrationType] = useState<"email" | "phone">("email")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("otp")
  }

  if (step === "otp") {
    return (
      <OtpVerification
        contactInfo={registrationType === "email" ? formData.email : formData.phone}
        type={registrationType}
        onBack={() => setStep("form")}
        onVerified={() => setStep("kyc")}
      />
    )
  }

  if (step === "kyc") {
    return (
      <KycVerification
        onBack={() => setStep("otp")}
        onComplete={() => {
          onComplete?.()
        }}
      />
    )
  }

  return (
    <div className="min-h-screen gradient-bg-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="glass-strong">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>Join MoneyMatte and take control of your finances</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Registration Type Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
              <Button
                type="button"
                variant={registrationType === "email" ? "default" : "ghost"}
                size="sm"
                className="text-sm"
                onClick={() => setRegistrationType("email")}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button
                type="button"
                variant={registrationType === "phone" ? "default" : "ghost"}
                size="sm"
                className="text-sm"
                onClick={() => setRegistrationType("phone")}
              >
                <Phone className="w-4 h-4 mr-2" />
                Phone
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  className="glass"
                  required
                />
              </div>

              {/* Email or Phone */}
              {registrationType === "email" ? (
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="glass"
                    required
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+880 1XXX-XXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="glass"
                    required
                  />
                </div>
              )}

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    className="glass pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  className="glass"
                  required
                />
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>

              {/* Security Notice */}
              <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-primary">Bank-level Security</p>
                  <p className="text-muted-foreground">
                    Your data is encrypted and protected with industry-standard security measures.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full gradient-bg text-white hover:opacity-90 transition-opacity"
                disabled={!formData.agreeToTerms}
              >
                Create Account
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            </form>

            {/* Switch to Login */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Button variant="link" className="p-0 h-auto text-primary hover:underline" onClick={onSwitchToLogin}>
                  Sign in here
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
