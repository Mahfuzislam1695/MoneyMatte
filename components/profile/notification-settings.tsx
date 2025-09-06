"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Bell, Mail, Smartphone, CreditCard, TrendingUp, Shield, Clock } from "lucide-react"

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [transactionAlerts, setTransactionAlerts] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [investmentUpdates, setInvestmentUpdates] = useState(true)
  const [quietHours, setQuietHours] = useState("22:00-08:00")
  const [alertFrequency, setAlertFrequency] = useState("immediate")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">Notification Settings</h3>
        <p className="text-sm text-muted-foreground">Control how and when you receive notifications</p>
      </div>

      {/* Notification Channels */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Bell className="w-4 h-4 text-primary" />
            </div>
            <span>Notification Channels</span>
          </CardTitle>
          <CardDescription>Choose how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div className="space-y-1">
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
            </div>
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-muted-foreground" />
              <div className="space-y-1">
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">Receive important alerts via SMS</p>
              </div>
            </div>
            <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div className="space-y-1">
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
              </div>
            </div>
            <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
          </div>
        </CardContent>
      </Card>

      {/* Transaction Alerts */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-primary" />
            </div>
            <span>Transaction Alerts</span>
          </CardTitle>
          <CardDescription>Get notified about your financial activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">All Transactions</p>
              <p className="text-sm text-muted-foreground">Get alerts for all incoming and outgoing transactions</p>
            </div>
            <Switch checked={transactionAlerts} onCheckedChange={setTransactionAlerts} />
          </div>

          <div className="space-y-2">
            <Label>Alert Frequency</Label>
            <Select value={alertFrequency} onValueChange={setAlertFrequency}>
              <SelectTrigger className="glass">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="hourly">Hourly Summary</SelectItem>
                <SelectItem value="daily">Daily Summary</SelectItem>
                <SelectItem value="weekly">Weekly Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Security Alerts */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <span>Security Alerts</span>
          </CardTitle>
          <CardDescription>Important security and account notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Security Notifications</p>
              <p className="text-sm text-muted-foreground">Login attempts, password changes, and security events</p>
            </div>
            <Switch checked={securityAlerts} onCheckedChange={setSecurityAlerts} />
          </div>

          {!securityAlerts && (
            <div className="p-3 bg-destructive/5 rounded-lg border border-destructive/20">
              <p className="text-sm text-destructive font-medium">Security alerts are disabled</p>
              <p className="text-sm text-muted-foreground">
                We strongly recommend keeping security alerts enabled for account protection.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Investment & Market Updates */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <span>Investment Updates</span>
          </CardTitle>
          <CardDescription>Market news and investment performance notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Investment Performance</p>
              <p className="text-sm text-muted-foreground">Updates on your investments and portfolio performance</p>
            </div>
            <Switch checked={investmentUpdates} onCheckedChange={setInvestmentUpdates} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Marketing Communications</p>
              <p className="text-sm text-muted-foreground">Product updates, offers, and financial tips</p>
            </div>
            <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <span>Quiet Hours</span>
          </CardTitle>
          <CardDescription>Set times when you don't want to receive non-urgent notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Quiet Hours Period</Label>
            <Select value={quietHours} onValueChange={setQuietHours}>
              <SelectTrigger className="glass">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No quiet hours</SelectItem>
                <SelectItem value="22:00-08:00">10:00 PM - 8:00 AM</SelectItem>
                <SelectItem value="23:00-07:00">11:00 PM - 7:00 AM</SelectItem>
                <SelectItem value="00:00-09:00">12:00 AM - 9:00 AM</SelectItem>
                <SelectItem value="21:00-09:00">9:00 PM - 9:00 AM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {quietHours !== "none" && (
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-primary font-medium">Quiet hours active</p>
              <p className="text-sm text-muted-foreground">
                Only urgent security alerts will be delivered during quiet hours ({quietHours}).
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
