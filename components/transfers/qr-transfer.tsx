"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ArrowLeft, QrCode, Scan, Share2, Download, Copy, Check, Camera, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function QRTransfer() {
  const [activeTab, setActiveTab] = useState("receive")
  const [receiveAmount, setReceiveAmount] = useState("")
  const [purpose, setPurpose] = useState("")
  const [qrGenerated, setQrGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [scannedData, setScannedData] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mock QR data
  const qrData = {
    accountNumber: "1234567890",
    accountName: "John Doe",
    bankName: "MoneyMatte Bank",
    amount: receiveAmount,
    purpose: purpose,
    qrId: "QR123456789",
  }

  const recentQRTransactions = [
    {
      id: "1",
      type: "received",
      amount: 5000,
      from: "Sarah Ahmed",
      date: new Date("2024-01-15"),
      status: "completed",
    },
    {
      id: "2",
      type: "sent",
      amount: 2500,
      to: "Mike Wilson",
      date: new Date("2024-01-14"),
      status: "completed",
    },
    {
      id: "3",
      type: "received",
      amount: 1500,
      from: "Lisa Khan",
      date: new Date("2024-01-13"),
      status: "completed",
    },
  ]

  const generateQR = () => {
    setQrGenerated(true)
  }

  const copyQRLink = () => {
    navigator.clipboard.writeText(`https://moneymatte.app/qr/${qrData.qrId}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simulate QR code scanning from image
      setTimeout(() => {
        setScannedData({
          accountNumber: "9876543210",
          accountName: "Jane Smith",
          bankName: "MoneyMatte Bank",
          amount: "",
          purpose: "",
          qrId: "QR987654321",
        })
        setScanning(false)
      }, 1500)
    }
  }

  const startCameraScanning = () => {
    setScanning(true)
    // Simulate camera scanning
    setTimeout(() => {
      setScannedData({
        accountNumber: "5555666677",
        accountName: "Alex Johnson",
        bankName: "MoneyMatte Bank",
        amount: "1000",
        purpose: "Lunch payment",
        qrId: "QR555666777",
      })
      setScanning(false)
    }, 3000)
  }

  if (scanning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setScanning(false)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Scanning QR Code</h1>
          </div>

          <div className="text-center">
            <div className="relative mx-auto mb-6 w-64 h-64 bg-black/10 rounded-2xl backdrop-blur-sm border-2 border-dashed border-emerald-300 flex items-center justify-center">
              <div className="absolute inset-4 border-2 border-emerald-500 rounded-xl"></div>
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-emerald-500"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-emerald-500"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-emerald-500"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-emerald-500"></div>

              <div className="animate-pulse">
                <QrCode className="h-16 w-16 text-emerald-600" />
              </div>
            </div>

            <h2 className="text-lg font-semibold text-gray-900 mb-2">Position QR code in the frame</h2>
            <p className="text-gray-600 mb-6">Make sure the QR code is clearly visible and well-lit</p>

            <div className="space-y-3">
              <Button variant="outline" className="w-full bg-transparent" onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Upload from Gallery
              </Button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (scannedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setScannedData(null)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Confirm Transfer</h1>
          </div>

          <div className="space-y-6">
            {/* Recipient Info */}
            <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">Transfer To</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name</span>
                  <span className="font-medium">{scannedData.accountName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account</span>
                  <span className="font-medium">{scannedData.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank</span>
                  <span className="font-medium">{scannedData.bankName}</span>
                </div>
              </CardContent>
            </Card>

            {/* Amount Input */}
            <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">৳</span>
                  <Input
                    type="number"
                    placeholder={scannedData.amount || "0.00"}
                    className="pl-8 text-lg font-medium"
                    defaultValue={scannedData.amount}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Purpose */}
            <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Purpose</CardTitle>
              </CardHeader>
              <CardContent>
                <Input placeholder="Enter purpose" defaultValue={scannedData.purpose} />
              </CardContent>
            </Card>
          </div>

          <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700">Proceed to Transfer</Button>
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
          <h1 className="text-xl font-semibold text-gray-900">QR Transfer</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 backdrop-blur-sm bg-white/70">
            <TabsTrigger value="receive">Receive</TabsTrigger>
            <TabsTrigger value="send">Send</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="receive" className="space-y-6">
            {!qrGenerated ? (
              <>
                {/* Amount Input */}
                <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Amount to Receive (Optional)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">৳</span>
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="pl-8 text-lg font-medium"
                        value={receiveAmount}
                        onChange={(e) => setReceiveAmount(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Purpose */}
                <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Purpose (Optional)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Input placeholder="Enter purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
                  </CardContent>
                </Card>

                <Button onClick={generateQR} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate QR Code
                </Button>
              </>
            ) : (
              <>
                {/* Generated QR Code */}
                <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
                  <CardContent className="p-6 text-center">
                    <div className="w-48 h-48 mx-auto mb-4 bg-white rounded-2xl p-4 shadow-lg">
                      {/* QR Code Placeholder */}
                      <div className="w-full h-full bg-black/10 rounded-xl flex items-center justify-center">
                        <QrCode className="h-24 w-24 text-gray-600" />
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your QR Code</h3>
                    <p className="text-gray-600 mb-4">
                      Share this QR code to receive{" "}
                      {receiveAmount ? `৳${Number.parseInt(receiveAmount).toLocaleString()}` : "money"}
                    </p>

                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 bg-transparent" onClick={copyQRLink}>
                          {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                          {copied ? "Copied!" : "Copy Link"}
                        </Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Download QR
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  variant="outline"
                  onClick={() => {
                    setQrGenerated(false)
                    setReceiveAmount("")
                    setPurpose("")
                  }}
                  className="w-full bg-transparent"
                >
                  Generate New QR
                </Button>
              </>
            )}
          </TabsContent>

          <TabsContent value="send" className="space-y-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
                <Scan className="h-16 w-16 text-emerald-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Scan QR Code</h2>
              <p className="text-gray-600 mb-6">Scan a QR code to send money instantly</p>
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

          <TabsContent value="history" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">QR Transactions</h2>
              <Badge variant="secondary">{recentQRTransactions.length} transactions</Badge>
            </div>

            <div className="space-y-3">
              {recentQRTransactions.map((transaction) => (
                <Card key={transaction.id} className="backdrop-blur-sm bg-white/70 border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            transaction.type === "received" ? "bg-green-100" : "bg-blue-100"
                          }`}
                        >
                          <QrCode
                            className={`h-4 w-4 ${
                              transaction.type === "received" ? "text-green-600" : "text-blue-600"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {transaction.type === "received" ? `From ${transaction.from}` : `To ${transaction.to}`}
                          </p>
                          <p className="text-sm text-gray-600">{transaction.date.toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            transaction.type === "received" ? "text-green-600" : "text-blue-600"
                          }`}
                        >
                          {transaction.type === "received" ? "+" : "-"}৳{transaction.amount.toLocaleString()}
                        </p>
                        <Badge
                          variant={transaction.status === "completed" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {recentQRTransactions.length === 0 && (
              <div className="text-center py-12">
                <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No QR transactions yet</h3>
                <p className="text-gray-600">Your QR transfer history will appear here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
