"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Globe, Palette, Moon, Sun, Monitor, Smartphone, AlertTriangle } from "lucide-react"

export function AccountSettings() {
  const [language, setLanguage] = useState("en")
  const [theme, setTheme] = useState("system")
  const [currency, setCurrency] = useState("BDT")
  const [seniorMode, setSeniorMode] = useState(false)
  const [autoLogout, setAutoLogout] = useState(true)
  const [dataUsage, setDataUsage] = useState("standard")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">Account Settings</h3>
        <p className="text-sm text-muted-foreground">Customize your app experience and preferences</p>
      </div>

      {/* Language & Region */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Globe className="w-4 h-4 text-primary" />
            </div>
            <span>Language & Region</span>
          </CardTitle>
          <CardDescription>Set your preferred language and regional settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                  <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                  <SelectItem value="ur">اردو (Urdu)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BDT">৳ Bangladeshi Taka (BDT)</SelectItem>
                  <SelectItem value="USD">$ US Dollar (USD)</SelectItem>
                  <SelectItem value="EUR">€ Euro (EUR)</SelectItem>
                  <SelectItem value="GBP">£ British Pound (GBP)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Palette className="w-4 h-4 text-primary" />
            </div>
            <span>Appearance</span>
          </CardTitle>
          <CardDescription>Customize the look and feel of your app</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Theme</Label>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                className="flex flex-col items-center space-y-2 h-auto p-4"
                onClick={() => setTheme("light")}
              >
                <Sun className="w-5 h-5" />
                <span className="text-sm">Light</span>
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                className="flex flex-col items-center space-y-2 h-auto p-4"
                onClick={() => setTheme("dark")}
              >
                <Moon className="w-5 h-5" />
                <span className="text-sm">Dark</span>
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                className="flex flex-col items-center space-y-2 h-auto p-4"
                onClick={() => setTheme("system")}
              >
                <Monitor className="w-5 h-5" />
                <span className="text-sm">System</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-primary" />
            </div>
            <span>Accessibility</span>
          </CardTitle>
          <CardDescription>Settings to improve app accessibility and usability</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Senior Mode</p>
              <p className="text-sm text-muted-foreground">Larger fonts, high contrast, and simplified navigation</p>
            </div>
            <Switch checked={seniorMode} onCheckedChange={setSeniorMode} />
          </div>

          {seniorMode && (
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-primary font-medium">Senior Mode Active</p>
              <p className="text-sm text-muted-foreground">
                The app interface has been optimized for easier use with larger text and simplified navigation.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-primary" />
            </div>
            <span>Privacy & Security</span>
          </CardTitle>
          <CardDescription>Control your privacy and security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Auto Logout</p>
              <p className="text-sm text-muted-foreground">Automatically log out after 15 minutes of inactivity</p>
            </div>
            <Switch checked={autoLogout} onCheckedChange={setAutoLogout} />
          </div>

          <div className="space-y-2">
            <Label>Data Usage</Label>
            <Select value={dataUsage} onValueChange={setDataUsage}>
              <SelectTrigger className="glass">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimal">Minimal - Save data usage</SelectItem>
                <SelectItem value="standard">Standard - Balanced experience</SelectItem>
                <SelectItem value="full">Full - Best experience</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="glass border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible account actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full text-destructive border-destructive/50 hover:bg-destructive/10 bg-transparent"
          >
            Deactivate Account
          </Button>
          <Button variant="destructive" className="w-full">
            Delete Account Permanently
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
