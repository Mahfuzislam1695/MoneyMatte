"use client"

import { useState } from "react"
import { ArrowLeft, Zap, Fuel, Smartphone, Wifi, Shield, Building, Plus, Clock, Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BillCategory {
  id: string
  name: string
  icon: any
  color: string
  providers: string[]
}

interface SavedBiller {
  id: string
  category: string
  provider: string
  accountNumber: string
  nickname: string
  lastAmount: number
  dueDate?: string
  isFavorite: boolean
}

export default function BillPayment() {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedProvider, setSelectedProvider] = useState<string>("")
  const [accountNumber, setAccountNumber] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [step, setStep] = useState<number>(1)
  const [activeTab, setActiveTab] = useState("categories")

  const billCategories: BillCategory[] = [
    {
      id: "electricity",
      name: "Electricity",
      icon: Zap,
      color: "bg-yellow-500",
      providers: ["DESCO", "DPDC", "BPDB", "REB", "WZPDCL"],
    },
    {
      id: "gas",
      name: "Gas",
      icon: Fuel,
      color: "bg-blue-500",
      providers: ["Titas Gas", "Jalalabad Gas", "Bakhrabad Gas", "Paschimanchal Gas"],
    },
    {
      id: "mobile",
      name: "Mobile",
      icon: Smartphone,
      color: "bg-green-500",
      providers: ["Grameenphone", "Robi", "Banglalink", "Teletalk", "Airtel"],
    },
    {
      id: "internet",
      name: "Internet",
      icon: Wifi,
      color: "bg-purple-500",
      providers: ["BTCL", "Link3", "Carnival", "Amber IT", "Dot Internet"],
    },
    {
      id: "insurance",
      name: "Insurance",
      icon: Shield,
      color: "bg-red-500",
      providers: ["Sadharan Bima", "Jibon Bima", "Pragati Insurance", "Green Delta"],
    },
    {
      id: "tax",
      name: "Tax & Govt",
      icon: Building,
      color: "bg-gray-500",
      providers: ["NBR", "City Corporation", "Passport Fee", "Driving License"],
    },
  ]

  const savedBillers: SavedBiller[] = [
    {
      id: "1",
      category: "electricity",
      provider: "DESCO",
      accountNumber: "123456789",
      nickname: "Home Electricity",
      lastAmount: 2500,
      dueDate: "2024-01-25",
      isFavorite: true,
    },
    {
      id: "2",
      category: "mobile",
      provider: "Grameenphone",
      accountNumber: "01712345678",
      nickname: "My Mobile",
      lastAmount: 500,
      isFavorite: true,
    },
    {
      id: "3",
      category: "gas",
      provider: "Titas Gas",
      accountNumber: "987654321",
      nickname: "Home Gas",
      lastAmount: 800,
      dueDate: "2024-01-20",
      isFavorite: false,
    },
  ]

  const recentPayments = [
    {
      id: "1",
      category: "electricity",
      provider: "DESCO",
      amount: 2500,
      date: new Date("2024-01-15"),
      status: "completed",
    },
    {
      id: "2",
      category: "mobile",
      provider: "Grameenphone",
      amount: 500,
      date: new Date("2024-01-14"),
      status: "completed",
    },
    {
      id: "3",
      category: "internet",
      provider: "Link3",
      amount: 1200,
      date: new Date("2024-01-12"),
      status: "completed",
    },
  ]

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedProvider("")
    setStep(2)
  }

  const handleProviderSelect = (provider: string) => {
    setSelectedProvider(provider)
    setStep(3)
  }

  const handlePayment = () => {
    setStep(4)
    setTimeout(() => setStep(5), 2000)
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = billCategories.find((cat) => cat.id === categoryId)
    return category?.icon || Building
  }

  const getCategoryColor = (categoryId: string) => {
    const category = billCategories.find((cat) => cat.id === categoryId)
    return category?.color || "bg-gray-500"
  }

  if (step === 2) {
    const category = billCategories.find((cat) => cat.id === selectedCategory)
    if (!category) return null

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setStep(1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">{category.name} Bills</h1>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Select Provider</h2>
            {category.providers.map((provider) => (
              <Card
                key={provider}
                className="cursor-pointer transition-all duration-200 border-2 backdrop-blur-sm bg-white/70 hover:bg-white/90 border-gray-200 hover:border-emerald-300"
                onClick={() => handleProviderSelect(provider)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${category.color}`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{provider}</h3>
                      <p className="text-sm text-gray-600">{category.name} Bill Payment</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setStep(2)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Bill Details</h1>
          </div>

          <div className="space-y-6">
            {/* Provider Info */}
            <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${getCategoryColor(selectedCategory)}`}>
                    {(() => {
                      const Icon = getCategoryIcon(selectedCategory)
                      return <Icon className="h-6 w-6 text-white" />
                    })()}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedProvider}</h3>
                    <p className="text-sm text-gray-600">
                      {billCategories.find((cat) => cat.id === selectedCategory)?.name} Bill
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Number */}
            <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  {selectedCategory === "mobile" ? "Mobile Number" : "Account/Customer Number"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder={selectedCategory === "mobile" ? "01XXXXXXXXX" : "Enter account number"}
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </CardContent>
            </Card>

            {/* Amount */}
            <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  {selectedCategory === "mobile" ? "Recharge Amount" : "Bill Amount"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">৳</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="pl-8 text-lg font-medium"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                {selectedCategory === "mobile" && (
                  <div className="flex gap-2 mt-3">
                    {[100, 200, 500, 1000].map((preset) => (
                      <Button
                        key={preset}
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => setAmount(preset.toString())}
                      >
                        ৳{preset}
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Save Biller Option */}
            <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="save-biller" className="rounded" />
                  <label htmlFor="save-biller" className="text-sm text-gray-700">
                    Save this biller for future payments
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button
            onClick={() => setStep(4)}
            className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
            disabled={!accountNumber || !amount}
          >
            {selectedCategory === "mobile" ? "Recharge Now" : "Pay Bill"}
          </Button>
        </div>
      </div>
    )
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600 mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Processing Payment</h2>
          <p className="text-gray-600">Please wait while we process your bill payment...</p>
        </div>
      </div>
    )
  }

  if (step === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-10 w-10 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600">Your bill has been paid successfully</p>
          </div>

          {/* Receipt */}
          <Card className="backdrop-blur-sm bg-white/70 border border-gray-200 mb-6">
            <CardHeader>
              <CardTitle className="text-center">Payment Receipt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Provider</span>
                <span className="font-medium">{selectedProvider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account</span>
                <span className="font-medium">{accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-semibold">৳{Number.parseInt(amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-mono">TXN123456789</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date & Time</span>
                <span>{new Date().toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button variant="outline" className="w-full bg-transparent">
              Download Receipt
            </Button>
            <Button
              onClick={() => {
                setStep(1)
                setSelectedCategory("")
                setSelectedProvider("")
                setAccountNumber("")
                setAmount("")
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Pay Another Bill
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">Bill Payment</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 backdrop-blur-sm bg-white/70">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="saved">Saved Bills</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {billCategories.map((category) => {
                const Icon = category.icon
                return (
                  <Card
                    key={category.id}
                    className="cursor-pointer transition-all duration-200 backdrop-blur-sm bg-white/70 hover:bg-white/90 border border-gray-200 hover:border-emerald-300"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-medium text-gray-900 text-sm">{category.name}</h3>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Saved Billers</h2>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>

            <div className="space-y-3">
              {savedBillers.map((biller) => {
                const Icon = getCategoryIcon(biller.category)
                return (
                  <Card key={biller.id} className="backdrop-blur-sm bg-white/70 border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${getCategoryColor(biller.category)}`}>
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-gray-900">{biller.nickname}</h3>
                              {biller.isFavorite && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                            </div>
                            <p className="text-sm text-gray-600">
                              {biller.provider} - {biller.accountNumber}
                            </p>
                            {biller.dueDate && (
                              <div className="flex items-center gap-1 mt-1">
                                <Clock className="h-3 w-3 text-orange-500" />
                                <span className="text-xs text-orange-600">Due: {biller.dueDate}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Last paid</p>
                          <p className="font-semibold">৳{biller.lastAmount.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
              <Badge variant="secondary">{recentPayments.length} payments</Badge>
            </div>

            <div className="space-y-3">
              {recentPayments.map((payment) => {
                const Icon = getCategoryIcon(payment.category)
                return (
                  <Card key={payment.id} className="backdrop-blur-sm bg-white/70 border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${getCategoryColor(payment.category)}`}>
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{payment.provider}</h3>
                            <p className="text-sm text-gray-600">{payment.date.toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">৳{payment.amount.toLocaleString()}</p>
                          <Badge
                            variant={payment.status === "completed" ? "default" : "secondary"}
                            className={
                              payment.status === "completed" ? "bg-emerald-600 text-white" : "bg-gray-600 text-white"
                            }
                          >
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
