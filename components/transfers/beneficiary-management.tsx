"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Search, Edit3, Trash2, Star, Building2, Smartphone, User, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Beneficiary {
  id: string
  name: string
  accountNumber: string
  type: "bank" | "mobile-wallet" | "other-bank"
  bankName?: string
  walletType?: string
  isFavorite: boolean
  lastUsed: Date
  nickname?: string
}

export default function BeneficiaryManagement() {
  const [view, setView] = useState<"list" | "add" | "edit">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [editingBeneficiary, setEditingBeneficiary] = useState<Beneficiary | null>(null)

  // Form states for adding/editing beneficiaries
  const [formData, setFormData] = useState({
    name: "",
    accountNumber: "",
    type: "bank" as "bank" | "mobile-wallet" | "other-bank",
    bankName: "",
    walletType: "",
    nickname: "",
  })

  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    {
      id: "1",
      name: "John Doe",
      accountNumber: "1234567890",
      type: "bank",
      bankName: "MoneyMatte Bank",
      isFavorite: true,
      lastUsed: new Date("2024-01-15"),
      nickname: "Brother",
    },
    {
      id: "2",
      name: "Sarah Ahmed",
      accountNumber: "01712345678",
      type: "mobile-wallet",
      walletType: "bKash",
      isFavorite: false,
      lastUsed: new Date("2024-01-10"),
      nickname: "Office",
    },
    {
      id: "3",
      name: "Mike Wilson",
      accountNumber: "9876543210",
      type: "other-bank",
      bankName: "Dutch-Bangla Bank",
      isFavorite: true,
      lastUsed: new Date("2024-01-12"),
    },
    {
      id: "4",
      name: "Lisa Khan",
      accountNumber: "01987654321",
      type: "mobile-wallet",
      walletType: "Nagad",
      isFavorite: false,
      lastUsed: new Date("2024-01-08"),
    },
  ])

  const filteredBeneficiaries = beneficiaries.filter((beneficiary) => {
    const matchesSearch =
      beneficiary.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beneficiary.accountNumber.includes(searchQuery) ||
      beneficiary.nickname?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = filterType === "all" || beneficiary.type === filterType

    return matchesSearch && matchesFilter
  })

  const toggleFavorite = (id: string) => {
    setBeneficiaries((prev) => prev.map((b) => (b.id === id ? { ...b, isFavorite: !b.isFavorite } : b)))
  }

  const deleteBeneficiary = (id: string) => {
    setBeneficiaries((prev) => prev.filter((b) => b.id !== id))
  }

  const handleEdit = (beneficiary: Beneficiary) => {
    setEditingBeneficiary(beneficiary)
    setFormData({
      name: beneficiary.name,
      accountNumber: beneficiary.accountNumber,
      type: beneficiary.type,
      bankName: beneficiary.bankName || "",
      walletType: beneficiary.walletType || "",
      nickname: beneficiary.nickname || "",
    })
    setView("edit")
  }

  const handleSave = () => {
    if (editingBeneficiary) {
      // Update existing beneficiary
      setBeneficiaries((prev) =>
        prev.map((b) =>
          b.id === editingBeneficiary.id
            ? {
                ...b,
                ...formData,
              }
            : b,
        ),
      )
    } else {
      // Add new beneficiary
      const newBeneficiary: Beneficiary = {
        id: Date.now().toString(),
        ...formData,
        isFavorite: false,
        lastUsed: new Date(),
      }
      setBeneficiaries((prev) => [...prev, newBeneficiary])
    }

    // Reset form and view
    setFormData({
      name: "",
      accountNumber: "",
      type: "bank",
      bankName: "",
      walletType: "",
      nickname: "",
    })
    setEditingBeneficiary(null)
    setView("list")
  }

  const getBeneficiaryIcon = (type: string) => {
    switch (type) {
      case "bank":
      case "other-bank":
        return Building2
      case "mobile-wallet":
        return Smartphone
      default:
        return User
    }
  }

  const getWalletColor = (walletType?: string) => {
    switch (walletType) {
      case "bKash":
        return "bg-pink-500"
      case "Nagad":
        return "bg-orange-500"
      case "Rocket":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  if (view === "add" || view === "edit") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setView("list")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              {view === "add" ? "Add Beneficiary" : "Edit Beneficiary"}
            </h1>
          </div>

          <div className="space-y-6">
            {/* Beneficiary Type */}
            <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Beneficiary Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Same Bank Account</SelectItem>
                    <SelectItem value="other-bank">Other Bank Account</SelectItem>
                    <SelectItem value="mobile-wallet">Mobile Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Beneficiary Details */}
            <Card className="backdrop-blur-sm bg-white/70 border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Beneficiary Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <Input
                  placeholder={formData.type === "mobile-wallet" ? "Mobile number" : "Account number"}
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                />

                {formData.type === "mobile-wallet" && (
                  <Select
                    value={formData.walletType}
                    onValueChange={(value) => setFormData({ ...formData, walletType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select wallet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bKash">bKash</SelectItem>
                      <SelectItem value="Nagad">Nagad</SelectItem>
                      <SelectItem value="Rocket">Rocket</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                {formData.type === "other-bank" && (
                  <Select
                    value={formData.bankName}
                    onValueChange={(value) => setFormData({ ...formData, bankName: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dutch-Bangla Bank">Dutch-Bangla Bank</SelectItem>
                      <SelectItem value="BRAC Bank">BRAC Bank</SelectItem>
                      <SelectItem value="City Bank">City Bank</SelectItem>
                      <SelectItem value="Eastern Bank">Eastern Bank</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                <Input
                  placeholder="Nickname (optional)"
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                />
              </CardContent>
            </Card>
          </div>

          <Button
            onClick={handleSave}
            className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
            disabled={!formData.name || !formData.accountNumber}
          >
            {view === "add" ? "Add Beneficiary" : "Update Beneficiary"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Beneficiaries</h1>
          </div>
          <Button
            size="icon"
            className="rounded-full bg-emerald-600 hover:bg-emerald-700"
            onClick={() => setView("add")}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search beneficiaries..."
              className="pl-10 backdrop-blur-sm bg-white/70"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              size="sm"
              className={filterType === "all" ? "bg-emerald-600" : "bg-transparent"}
              onClick={() => setFilterType("all")}
            >
              All
            </Button>
            <Button
              variant={filterType === "bank" ? "default" : "outline"}
              size="sm"
              className={filterType === "bank" ? "bg-emerald-600" : "bg-transparent"}
              onClick={() => setFilterType("bank")}
            >
              Same Bank
            </Button>
            <Button
              variant={filterType === "other-bank" ? "default" : "outline"}
              size="sm"
              className={filterType === "other-bank" ? "bg-emerald-600" : "bg-transparent"}
              onClick={() => setFilterType("other-bank")}
            >
              Other Banks
            </Button>
            <Button
              variant={filterType === "mobile-wallet" ? "default" : "outline"}
              size="sm"
              className={filterType === "mobile-wallet" ? "bg-emerald-600" : "bg-transparent"}
              onClick={() => setFilterType("mobile-wallet")}
            >
              Wallets
            </Button>
          </div>
        </div>

        {/* Favorites Section */}
        {beneficiaries.some((b) => b.isFavorite) && (
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Favorites</h2>
            <div className="space-y-3">
              {beneficiaries
                .filter((b) => b.isFavorite)
                .map((beneficiary) => {
                  const Icon = getBeneficiaryIcon(beneficiary.type)
                  return (
                    <Card key={beneficiary.id} className="backdrop-blur-sm bg-white/70 border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-emerald-100 rounded-full">
                            <Icon className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-gray-900 truncate">{beneficiary.name}</h3>
                              {beneficiary.nickname && (
                                <Badge variant="secondary" className="text-xs">
                                  {beneficiary.nickname}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {beneficiary.type === "mobile-wallet"
                                ? `${beneficiary.walletType} - ${beneficiary.accountNumber}`
                                : `${beneficiary.bankName || "MoneyMatte Bank"} - ${beneficiary.accountNumber}`}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => toggleFavorite(beneficiary.id)}
                            >
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(beneficiary)}>
                                  <Edit3 className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => deleteBeneficiary(beneficiary.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </div>
        )}

        {/* All Beneficiaries */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-3">All Beneficiaries</h2>
          <div className="space-y-3">
            {filteredBeneficiaries.map((beneficiary) => {
              const Icon = getBeneficiaryIcon(beneficiary.type)
              return (
                <Card key={beneficiary.id} className="backdrop-blur-sm bg-white/70 border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="p-3 bg-gray-100 rounded-full">
                          <Icon className="h-5 w-5 text-gray-600" />
                        </div>
                        {beneficiary.type === "mobile-wallet" && (
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${getWalletColor(beneficiary.walletType)}`}
                          ></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-900 truncate">{beneficiary.name}</h3>
                          {beneficiary.nickname && (
                            <Badge variant="secondary" className="text-xs">
                              {beneficiary.nickname}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {beneficiary.type === "mobile-wallet"
                            ? `${beneficiary.walletType} - ${beneficiary.accountNumber}`
                            : `${beneficiary.bankName || "MoneyMatte Bank"} - ${beneficiary.accountNumber}`}
                        </p>
                        <p className="text-xs text-gray-500">Last used: {beneficiary.lastUsed.toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => toggleFavorite(beneficiary.id)}
                        >
                          <Star
                            className={`h-4 w-4 ${beneficiary.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
                          />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(beneficiary)}>
                              <Edit3 className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => deleteBeneficiary(beneficiary.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {filteredBeneficiaries.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No beneficiaries found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? "Try adjusting your search" : "Add your first beneficiary to get started"}
            </p>
            <Button onClick={() => setView("add")} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Beneficiary
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
