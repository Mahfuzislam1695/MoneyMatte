import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Home, Search, CreditCard } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Main 404 Card */}
        <Card className="glass-strong p-8 md:p-12 mb-8">
          {/* 404 Number with Gold Accent */}
          <div className="mb-6">
            <h1 className="text-8xl md:text-9xl font-bold text-primary mb-2">
              4<span className="text-accent">0</span>4
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">Page Not Found</h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's get you back to managing your finances.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Go Home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Dashboard
              </Link>
            </Button>
          </div>
        </Card>

        {/* Quick Links */}
        <Card className="glass p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Popular Destinations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/transfers"
              className="flex flex-col items-center p-3 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-accent/20 transition-colors">
                <ArrowLeft className="w-5 h-5 text-accent rotate-180" />
              </div>
              <span className="text-sm font-medium text-foreground">Transfers</span>
            </Link>

            <Link
              href="/bill-payment"
              className="flex flex-col items-center p-3 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-accent/20 transition-colors">
                <CreditCard className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm font-medium text-foreground">Bills</span>
            </Link>

            <Link
              href="/services"
              className="flex flex-col items-center p-3 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-accent/20 transition-colors">
                <Search className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm font-medium text-foreground">Services</span>
            </Link>

            <Link
              href="/qr-payments"
              className="flex flex-col items-center p-3 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-accent/20 transition-colors">
                <div className="w-5 h-5 border-2 border-accent rounded"></div>
              </div>
              <span className="text-sm font-medium text-foreground">QR Pay</span>
            </Link>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            Need help? Contact our{" "}
            <Link href="/support" className="text-accent hover:underline font-medium">
              customer support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
