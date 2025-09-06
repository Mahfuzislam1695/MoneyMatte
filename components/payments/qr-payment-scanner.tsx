"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ArrowLeft, Scan, Camera, Upload, MapPin, Star, Clock, Check, Receipt, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Merchant {
  id: string
  name: string
  category: string
  location: string
  rating: number
  distance: string
  qrId: string
  isFavorite: boolean
}

interface PaymentTransaction {
  id: string
  merchantName: string
  merchantCategory: string
  amount: number
  date: Date
  status: string
  transactionId: string
}

export default function QRPaymentScanner() {
  const [activeTab, setActiveTab] = useState("scan")
  const [scanning, setScanning] = useState(false)
  const [scannedMerchant, setScannedMerchant] = useState<any>(null)
  const [amount, setAmount] = useState("")
  const [step, setStep] = useState(1)
  const [pin, setPin] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const nearbyMerchants: Merchant[] = [
    {
      id: "1",
      name: "Cafe Dhaka",
      category: "Restaurant",
      location: "Dhanmondi 27",
      rating: 4.5,
      distance: "50m",
      qrId: "MERCHANT001",
      isFavorite: true,
    },
    {
      id: "2",
      name: "Tech Store BD",
      category: "Electronics",
      location: "New Market",
      rating: 4.2,
      distance: "200m",
      qrId: "MERCHANT002",
      isFavorite: false,
    },
    {
      id: "3",
      name: "Fresh Mart",
      category: "Grocery",
      location: "Gulshan 2",
      rating: 4.7,
      distance: "300m",
      qrId: "MERCHANT003",
      isFavorite: true,
    },
  ]

  const recentPayments: PaymentTransaction[] = [
    {
      id: "1",
      merchantName: "Cafe Dhaka",
      merchantCategory: "Restaurant",
      amount: 850,
      date: new Date("2024-01-15"),
      status: "completed",
      transactionId: "PAY123456789",
    },
    {
      id: "2",
      merchantName: "Uber Ride",
      merchantCategory: "Transportation",
      amount: 320,
      date: new Date("2024-01-14"),
      status: "completed",
      transactionId: "PAY123456788",
    },
    {
      id: "3",
      merchantName: "Fresh Mart",
      merchantCategory: "Grocery",
      amount: 1250,
      date: new Date("2024-01-13"),
      status: "completed",
      transactionId: "PAY123456787",
    },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setScanning(true)
      setTimeout(() => {
        setScannedMerchant({
          name: "Cafe Dhaka",
          category: "Restaurant",
          location: "Dhanmondi 27, Dhaka",
          rating: 4.5,
          qrId: "MERCHANT001",
          businessHours: "9:00 AM - 11:00 PM",
          phone: "+880 1712-345678",
        })
        setScanning(false)
        setStep(2)
      }, 1500)
    }
  }

  const startCameraScanning = () => {
    setScanning(true)
    setTimeout(() => {
      setScannedMerchant({
        name: "Tech Store BD",
        category: "Electronics",
        location: "New Market, Dhaka",
        rating: 4.2,
        qrId: "MERCHANT002",
        businessHours: "10:00 AM - 9:00 PM",
        phone: "+880 1987-654321",
      })
      setScanning(false)
      setStep(2)
    }, 3000)
  }

  const handlePayment = () => {
    setStep(4)
    setTimeout(() => setStep(5), 2000)
  }

  const toggleFavorite = (merchantId: string) => {
    // Toggle favorite logic here
  }

  if (scanning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setScanning(false)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Scanning Merchant QR</h1>
          </div>

          <div className="text-center">
            <div className="relative mx-auto mb-6 w-64 h-64 bg-black/10 rounded-2xl backdrop-blur-sm border-2 border-dashed border-emerald-300 flex items-center justify-center">
              <div className="absolute inset-4 border-2 border-emerald-500 rounded-xl"></div>
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-emerald-500"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-emerald-500"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-emerald-500"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-emerald-500"></div>

              <div className="animate-pulse">
                <Scan className="h-16 w-16 text-emerald-600" />
              </div>
            </div>

            <h2 className="text-lg font-semibold text-gray-900 mb-2">Scan Merchant QR Code</h2>
            <p className="text-gray-600 mb-6">Point your camera at the merchant's QR code to pay</p>

            <Button variant="outline" className="w-full bg-transparent" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Upload QR Image
            </Button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </div>
        </div>
      </div>
    )
  }

  if (step === 2 && scannedMerchant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setStep(1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Merchant Details</h1>
          </div>

          <div className="space-y-6">
            {/* Merchant Info */}
            <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Receipt className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{scannedMerchant.name}</h2>
                  <p className="text-gray-600">{scannedMerchant.category}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{scannedMerchant.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{scannedMerchant.businessHours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{scannedMerchant.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-700">{scannedMerchant.rating} rating</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amount Input */}
            <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Payment Amount</CardTitle>
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
                <div className="flex gap-2 mt-3">
                  {[100, 500, 1000, 2000].map((preset) => (
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
              </CardContent>
            </Card>
          </div>

          <Button
            onClick={() => setStep(3)}
            className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
            disabled={!amount}
          >
            Continue to Payment
          </Button>
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
            <h1 className="text-xl font-semibold text-gray-900">Confirm Payment</h1>
          </div>

          <div className="space-y-6">
            {/* Payment Summary */}
            <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Merchant</span>
                  <span className="font-medium">{scannedMerchant.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{scannedMerchant.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-medium text-lg">৳{Number.parseInt(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fee</span>
                  <span className="font-medium">Free</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>৳{Number.parseInt(amount).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* PIN Entry */}
            <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
              <CardHeader>
                <CardTitle className="text-base">Enter Transaction PIN</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="password"
                  placeholder="Enter 4-digit PIN"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                />
              </CardContent>
            </Card>
          </div>

          <Button
            onClick={handlePayment}
            className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
            disabled={pin.length !== 4}
          >
            Pay Now
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
          <p className="text-gray-600">Please wait while we process your merchant payment...</p>
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
            <p className="text-gray-600">Your payment has been processed successfully</p>
          </div>

          {/* Receipt */}
          <Card className="backdrop-blur-sm bg-white/70 border border-gray-200 mb-6">
            <CardHeader>
              <CardTitle className="text-center">Payment Receipt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Merchant</span>
                <span className="font-medium">{scannedMerchant.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-semibold">৳{Number.parseInt(amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-mono">PAY123456789</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date & Time</span>
                <span>{new Date().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="text-emerald-600 font-medium">Completed</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button variant="outline" className="w-full bg-transparent">
              Download Receipt
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Share Receipt
            </Button>
            <Button
              onClick={() => {
                setStep(1)
                setScannedMerchant(null)
                setAmount("")
                setPin("")
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Make Another Payment
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
          <h1 className="text-xl font-semibold text-gray-900">QR Payments</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 backdrop-blur-sm bg-white/70">
            <TabsTrigger value="scan">Scan & Pay</TabsTrigger>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="scan" className="space-y-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
                <Scan className="h-16 w-16 text-emerald-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Scan Merchant QR</h2>
              <p className="text-gray-600 mb-6">Scan QR codes at shops, restaurants, and businesses to pay instantly</p>
            </div>

            <div className="space-y-3">
              <Button onClick={startCameraScanning} className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Camera className="h-4 w-4 mr-2" />
                Scan with Camera
              </Button>
              <Button variant="outline" className="w-full bg-transparent" onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Upload QR Image
              </Button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </div>
          </TabsContent>

          <TabsContent value="nearby" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Nearby Merchants</h2>
              <Badge variant="secondary">{nearbyMerchants.length} found</Badge>
            </div>

            <div className="space-y-3">
              {nearbyMerchants.map((merchant) => (
                <Card key={merchant.id} className="backdrop-blur-sm bg-white/70 border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-full">
                          <Receipt className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900">{merchant.name}</h3>
                            {merchant.isFavorite && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                          </div>
                          <p className="text-sm text-gray-600">{merchant.category}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-gray-500" />
                              <span className="text-xs text-gray-500">{merchant.distance}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-gray-500">{merchant.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        Pay
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
              <Badge variant="secondary">{recentPayments.length} payments</Badge>
            </div>

            <div className="space-y-3">
              {recentPayments.map((payment) => (
                <Card key={payment.id} className="backdrop-blur-sm bg-white/70 border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Receipt className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{payment.merchantName}</h3>
                          <p className="text-sm text-gray-600">{payment.merchantCategory}</p>
                          <p className="text-xs text-gray-500">{payment.date.toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">৳{payment.amount.toLocaleString()}</p>
                        <Badge variant={payment.status === "completed" ? "default" : "secondary"} className="text-xs">
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
