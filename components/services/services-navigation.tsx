"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeftRight,
  Receipt,
  QrCode,
  PiggyBank,
  Shield,
  Banknote,
  Calculator,
  TrendingUp,
  Clock,
  FileText,
  Smartphone,
  Building,
  User,
  Zap,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface ServiceItem {
  id: string
  title: string
  description: string
  icon: any
  route: string
  badge?: string
  category: string
  color: string
}

const services: ServiceItem[] = [
  // Transfer Services
  {
    id: "fund-transfer",
    title: "Fund Transfer",
    description: "Transfer money between accounts, banks & wallets",
    icon: ArrowLeftRight,
    route: "/transfers",
    category: "transfers",
    color: "emerald",
  },
  {
    id: "qr-transfer",
    title: "QR Transfer",
    description: "Send & receive money using QR codes",
    icon: QrCode,
    route: "/qr-transfer",
    category: "transfers",
    color: "blue",
  },

  // Payment Services
  {
    id: "bill-payment",
    title: "Bill Payment",
    description: "Pay utility bills, mobile recharge & more",
    icon: Receipt,
    route: "/bill-payment",
    badge: "3 Due",
    category: "payments",
    color: "purple",
  },
  {
    id: "qr-payment",
    title: "QR Payments",
    description: "Scan & pay at merchants instantly",
    icon: Smartphone,
    route: "/qr-payments",
    category: "payments",
    color: "orange",
  },

  // Loan & EMI Services
  {
    id: "online-loan",
    title: "Online Loan",
    description: "Apply for personal, SME & education loans",
    icon: Banknote,
    route: "/online-loan",
    category: "loans",
    color: "green",
  },
  {
    id: "emi-tracking",
    title: "EMI Tracking",
    description: "Track loan EMIs & repayment history",
    icon: Clock,
    route: "/emi-tracking",
    badge: "2 Active",
    category: "loans",
    color: "red",
  },

  // Investment Services
  {
    id: "fdr-dps",
    title: "FDR & DPS",
    description: "Open fixed deposits & pension schemes",
    icon: PiggyBank,
    route: "/fdr-dps",
    category: "investments",
    color: "teal",
  },
  {
    id: "shonchoy-potro",
    title: "Shonchoy Potro",
    description: "Government savings certificates",
    icon: Shield,
    route: "/shonchoy-potro",
    category: "investments",
    color: "indigo",
  },

  // Tools & Calculators
  {
    id: "loan-calculator",
    title: "Loan Calculator",
    description: "Calculate EMI for different loan types",
    icon: Calculator,
    route: "/calculators/loan",
    category: "tools",
    color: "pink",
  },
  {
    id: "investment-calculator",
    title: "Investment Calculator",
    description: "Calculate returns on FDR, DPS & certificates",
    icon: TrendingUp,
    route: "/calculators/investment",
    category: "tools",
    color: "cyan",
  },
]

const categories = [
  {
    id: "transfers",
    name: "Transfers",
    icon: ArrowLeftRight,
    description: "Money transfer services",
  },
  {
    id: "payments",
    name: "Payments",
    icon: Receipt,
    description: "Bill payments & merchant transactions",
  },
  {
    id: "loans",
    name: "Loans & EMI",
    icon: Banknote,
    description: "Loan applications & EMI management",
  },
  {
    id: "investments",
    name: "Investments",
    icon: PiggyBank,
    description: "Deposits & savings certificates",
  },
  {
    id: "tools",
    name: "Tools",
    icon: Calculator,
    description: "Financial calculators & utilities",
  },
]

export default function ServicesNavigation() {
  const router = useRouter()

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      orange: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      green: "bg-green-500/20 text-green-400 border-green-500/30",
      red: "bg-red-500/20 text-red-400 border-red-500/30",
      teal: "bg-teal-500/20 text-teal-400 border-teal-500/30",
      indigo: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      pink: "bg-pink-500/20 text-pink-400 border-pink-500/30",
      cyan: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    }
    return colorMap[color] || "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }

  const handleServiceClick = (route: string) => {
    router.push(route)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
          <h1 className="text-2xl font-bold text-white mb-2">All Services</h1>
          <p className="text-gray-300 text-sm">Access all your financial services in one place</p>
        </div>

        {/* Quick Actions */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleServiceClick("/transfers")}
              className="h-16 bg-emerald-600 hover:bg-emerald-700 text-white flex-col gap-1"
            >
              <ArrowLeftRight className="w-5 h-5" />
              <span className="text-xs">Transfer</span>
            </Button>
            <Button
              onClick={() => handleServiceClick("/bill-payment")}
              className="h-16 bg-purple-600 hover:bg-purple-700 text-white flex-col gap-1"
            >
              <Receipt className="w-5 h-5" />
              <span className="text-xs">Pay Bills</span>
            </Button>
            <Button
              onClick={() => handleServiceClick("/qr-payments")}
              className="h-16 bg-orange-600 hover:bg-orange-700 text-white flex-col gap-1"
            >
              <QrCode className="w-5 h-5" />
              <span className="text-xs">QR Pay</span>
            </Button>
            <Button
              onClick={() => handleServiceClick("/online-loan")}
              className="h-16 bg-green-600 hover:bg-green-700 text-white flex-col gap-1"
            >
              <Banknote className="w-5 h-5" />
              <span className="text-xs">Loans</span>
            </Button>
          </div>
        </div>

        {/* Services by Category */}
        {categories.map((category) => {
          const categoryServices = services.filter((service) => service.category === category.id)
          const CategoryIcon = category.icon

          return (
            <div key={category.id} className="space-y-4">
              {/* Category Header */}
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <CategoryIcon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                    <p className="text-gray-300 text-sm">{category.description}</p>
                  </div>
                </div>
              </div>

              {/* Category Services */}
              <div className="space-y-3">
                {categoryServices.map((service) => {
                  const ServiceIcon = service.icon
                  return (
                    <Card
                      key={service.id}
                      className="backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                      onClick={() => handleServiceClick(service.route)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl border flex items-center justify-center ${getColorClasses(service.color)}`}
                          >
                            <ServiceIcon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-white">{service.title}</h4>
                              {service.badge && (
                                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                  {service.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-300 text-sm">{service.description}</p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                            <ArrowLeftRight className="w-4 h-4 text-gray-400 rotate-45" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Additional Services */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">More Services</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-20 border-white/20 text-white hover:bg-white/10 bg-transparent flex-col gap-2"
              onClick={() => handleServiceClick("/beneficiaries")}
            >
              <User className="w-5 h-5" />
              <span className="text-xs">Beneficiaries</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 border-white/20 text-white hover:bg-white/10 bg-transparent flex-col gap-2"
              onClick={() => handleServiceClick("/statements")}
            >
              <FileText className="w-5 h-5" />
              <span className="text-xs">Statements</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 border-white/20 text-white hover:bg-white/10 bg-transparent flex-col gap-2"
            >
              <Building className="w-5 h-5" />
              <span className="text-xs">Branch Locator</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 border-white/20 text-white hover:bg-white/10 bg-transparent flex-col gap-2"
            >
              <Zap className="w-5 h-5" />
              <span className="text-xs">Quick Support</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
