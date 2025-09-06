"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Shield, FileText, Settings, Bell } from "lucide-react"
import { PersonalInfo } from "./personal-info"
import { SecuritySettings } from "./security-settings"
import { KycManagement } from "./kyc-management"
import { AccountSettings } from "./account-settings"
import { NotificationSettings } from "./notification-settings"

interface ProfileManagementProps {
  onBack: () => void
}

export function ProfileManagement({ onBack }: ProfileManagementProps) {
  const [activeTab, setActiveTab] = useState("personal")

  // Mock user data
  const userStatus = {
    isVerified: true,
    verificationLevel: "Level 3",
    accountType: "Premium",
    memberSince: "January 2024",
  }

  return (
    <div className="min-h-screen gradient-bg-subtle">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex items-center space-x-3">
            <Badge variant="default" className="bg-primary text-white">
              {userStatus.verificationLevel}
            </Badge>
            <Badge variant="outline" className="glass">
              {userStatus.accountType}
            </Badge>
          </div>
        </div>

        {/* Profile Header Card */}
        <Card className="glass-strong">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">John Doe</CardTitle>
                  <CardDescription className="text-base">john.doe@example.com</CardDescription>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <span>Member since {userStatus.memberSince}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Verified Account</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Profile Management Tabs */}
        <Card className="glass-strong">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <CardHeader className="pb-4">
              <TabsList className="grid w-full grid-cols-5 bg-muted/50">
                <TabsTrigger value="personal" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Personal</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger value="kyc" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">KYC</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center space-x-2">
                  <Bell className="w-4 h-4" />
                  <span className="hidden sm:inline">Alerts</span>
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="space-y-6">
              <TabsContent value="personal" className="space-y-6 mt-0">
                <PersonalInfo />
              </TabsContent>

              <TabsContent value="security" className="space-y-6 mt-0">
                <SecuritySettings />
              </TabsContent>

              <TabsContent value="kyc" className="space-y-6 mt-0">
                <KycManagement />
              </TabsContent>

              <TabsContent value="settings" className="space-y-6 mt-0">
                <AccountSettings />
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6 mt-0">
                <NotificationSettings />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
