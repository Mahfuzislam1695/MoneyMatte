"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Smartphone, CreditCard, PiggyBank, Users, Zap } from "lucide-react"
import { SignUpForm } from "./auth/sign-up-form"
import { LoginForm } from "./auth/login-form"
import { MainDashboard } from "./dashboard/main-dashboard"

export function WelcomeScreen() {
  const [currentView, setCurrentView] = useState<"welcome" | "signup" | "login" | "dashboard">("welcome")

  if (currentView === "signup") {
    return (
      <SignUpForm
        onBack={() => setCurrentView("welcome")}
        onSwitchToLogin={() => setCurrentView("login")}
        onComplete={() => setCurrentView("dashboard")}
      />
    )
  }

  if (currentView === "login") {
    return (
      <LoginForm
        onBack={() => setCurrentView("welcome")}
        onSwitchToSignUp={() => setCurrentView("signup")}
        onComplete={() => setCurrentView("dashboard")}
      />
    )
  }

  if (currentView === "dashboard") {
    return <MainDashboard />
  }

  return (
    <div className="min-h-screen gradient-bg-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

        <div className="relative px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-foreground">MoneyMatte</h1>
              </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              Your Complete
              <span className="text-primary block">Financial Partner</span>
            </h2>

            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto mb-8">
              Secure banking, seamless transfers, smart investments, and personalized financial management - all in one
              powerful platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                size="lg"
                className="gradient-bg text-white hover:opacity-90 transition-opacity px-8 py-6 text-lg"
                onClick={() => setCurrentView("signup")}
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="glass px-8 py-6 text-lg bg-transparent"
                onClick={() => setCurrentView("login")}
              >
                Sign In
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Bank-level Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-primary" />
                <span>500K+ Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Instant Transfers</span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Card className="glass-strong hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Smart Banking</CardTitle>
                <CardDescription>
                  Complete banking services with real-time notifications and intelligent insights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-strong hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <ArrowRight className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-xl">Instant Transfers</CardTitle>
                <CardDescription>Send money to any bank, mobile wallet, or pay with QR codes instantly</CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-strong hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <PiggyBank className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Smart Savings</CardTitle>
                <CardDescription>
                  FDR, DPS, and government savings certificates with automated management
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Trusted by leading financial institutions</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <Badge variant="outline" className="glass px-4 py-2">
                Central Bank Approved
              </Badge>
              <Badge variant="outline" className="glass px-4 py-2">
                ISO 27001 Certified
              </Badge>
              <Badge variant="outline" className="glass px-4 py-2">
                PCI DSS Compliant
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
