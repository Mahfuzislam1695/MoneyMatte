"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, CreditCard, Building2, Smartphone, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type TransferType = "own" | "bank" | "other-bank" | "mobile-wallet"

interface Account {
  id: string
  name: string
  number: string
  balance: number
  type: string
}

export default function FundTransfer() {
  const [step, setStep] = useState(1)
  const [transferType, setTransferType] = useState<TransferType>("own")
  const [amount, setAmount] = useState("")
  const [selectedAccount, setSelectedAccount] = useState("")
  const [recipientAccount, setRecipientAccount] = useState("")
  const [purpose, setPurpose] = useState("")
  const [pin, setPin] = useState("")

  const ownAccounts: Account[] = [
    { id: "1", name: "Savings Account", number: "****1234", balance: 50000, type: "Savings" },
    { id: "2", name: "Current Account", number: "****5678", balance: 25000, type: "Current" },
    { id: "3", name: "Fixed Deposit", number: "****9012", balance: 100000, type: "FD" },
  ]

  const transferTypes = [
    { id: "own", name: "Own Accounts", icon: CreditCard, description: "Transfer between your accounts" },
    { id: "bank", name: "Same Bank", icon: Building2, description: "Transfer within MoneyMatte Bank" },
    { id: "other-bank", name: "Other Banks", icon: Building2, description: "BEFTN/NPSB transfers" },
    { id: "mobile-wallet", name: "Mobile Wallets", icon: Smartphone, description: "bKash, Nagad, Rocket" },
  ]

  const mobileWallets = [
    { id: "bkash", name: "bKash", color: "bg-pink-500" },
    { id: "nagad", name: "Nagad", color: "bg-orange-500" },
    { id: "rocket", name: "Rocket", color: "bg-purple-500" },
  ]

  const handleTransfer = () => {
    // Simulate transfer processing
    setStep(4)
    setTimeout(() => setStep(5), 2000)
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Fund Transfer</h1>
          </div>

          {/* Transfer Type Selection */}
          <div className="space-y-3">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Select Transfer Type</h2>
            {transferTypes.map((type) => {
              const Icon = type.icon
              return (
                <Card
                  key={type.id}
                  className={`cursor-pointer transition-all duration-200 border-2 backdrop-blur-sm bg-white/70 hover:bg-white/90 ${
                    transferType === type.id ? "border-emerald-500 bg-emerald-50/70" : "border-gray-200"
                  }`}
                  onClick={() => setTransferType(type.id as TransferType)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-full ${transferType === type.id ? "bg-emerald-500" : "bg-gray-100"}`}
                      >
                        <Icon className={`h-6 w-6 ${transferType === type.id ? "text-white" : "text-gray-600"}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{type.name}</h3>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                      {transferType === type.id && <Check className="h-5 w-5 text-emerald-500" />}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Button onClick={() => setStep(2)} className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setStep(1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Transfer Details</h1>
          </div>

          <div className="space-y-6">
            {/* From Account */}
            <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">From Account</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    {ownAccounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        <div className="flex justify-between items-center w-full">
                          <span>
                            {account.name} {account.number}
                          </span>
                          <span className="text-sm text-gray-600">৳{account.balance.toLocaleString()}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* To Account */}
            <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  {transferType === "own"
                    ? "To Account"
                    : transferType === "mobile-wallet"
                      ? "Mobile Wallet"
                      : "Recipient Account"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {transferType === "own" && (
                  <Select value={recipientAccount} onValueChange={setRecipientAccount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination account" />
                    </SelectTrigger>
                    <SelectContent>
                      {ownAccounts
                        .filter((acc) => acc.id !== selectedAccount)
                        .map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.name} {account.number}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}

                {transferType === "mobile-wallet" && (
                  <>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select wallet" />
                      </SelectTrigger>
                      <SelectContent>
                        {mobileWallets.map((wallet) => (
                          <SelectItem key={wallet.id} value={wallet.id}>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${wallet.color}`}></div>
                              {wallet.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input placeholder="Mobile number (01XXXXXXXXX)" />
                  </>
                )}

                {(transferType === "bank" || transferType === "other-bank") && (
                  <>
                    <Input placeholder="Account number" />
                    <Input placeholder="Account holder name" />
                    {transferType === "other-bank" && (
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dutch-bangla">Dutch-Bangla Bank</SelectItem>
                          <SelectItem value="brac">BRAC Bank</SelectItem>
                          <SelectItem value="city">City Bank</SelectItem>
                          <SelectItem value="eastern">Eastern Bank</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Amount */}
            <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Amount</CardTitle>
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
                  {[1000, 5000, 10000].map((preset) => (
                    <Button
                      key={preset}
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => setAmount(preset.toString())}
                    >
                      ৳{preset.toLocaleString()}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Purpose */}
            <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Purpose (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Enter transfer purpose"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                />
              </CardContent>
            </Card>
          </div>

          <Button
            onClick={() => setStep(3)}
            className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
            disabled={!selectedAccount || !amount}
          >
            Review Transfer
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  if (step === 3) {
    const fromAccount = ownAccounts.find((acc) => acc.id === selectedAccount)
    const toAccount = ownAccounts.find((acc) => acc.id === recipientAccount)

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setStep(2)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Confirm Transfer</h1>
          </div>

          <div className="space-y-6">
            {/* Transfer Summary */}
            <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">Transfer Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">From</span>
                  <span className="font-medium">
                    {fromAccount?.name} {fromAccount?.number}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">To</span>
                  <span className="font-medium">
                    {transferType === "own"
                      ? `${toAccount?.name} ${toAccount?.number}`
                      : transferType === "mobile-wallet"
                        ? "bKash - 01712345678"
                        : "Dutch-Bangla Bank - 1234567890"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-medium text-lg">৳{Number.parseInt(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fee</span>
                  <span className="font-medium">
                    {transferType === "own" ? "Free" : transferType === "mobile-wallet" ? "৳5" : "৳15"}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>
                    ৳
                    {(
                      Number.parseInt(amount) + (transferType === "own" ? 0 : transferType === "mobile-wallet" ? 5 : 15)
                    ).toLocaleString()}
                  </span>
                </div>
                {purpose && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Purpose</span>
                    <span className="font-medium">{purpose}</span>
                  </div>
                )}
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
            onClick={handleTransfer}
            className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
            disabled={pin.length !== 4}
          >
            Confirm Transfer
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
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Processing Transfer</h2>
          <p className="text-gray-600">Please wait while we process your transaction...</p>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Transfer Successful!</h1>
            <p className="text-gray-600">Your money has been transferred successfully</p>
          </div>

          {/* Receipt */}
          <Card className="backdrop-blur-sm bg-white/70 border border-gray-200 mb-6">
            <CardHeader>
              <CardTitle className="text-center">Transaction Receipt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-mono">TXN123456789</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date & Time</span>
                <span>{new Date().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-semibold">৳{Number.parseInt(amount).toLocaleString()}</span>
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
                setAmount("")
                setSelectedAccount("")
                setRecipientAccount("")
                setPurpose("")
                setPin("")
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Make Another Transfer
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
