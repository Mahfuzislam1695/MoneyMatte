"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Smartphone, Fingerprint, Key, Eye, EyeOff, CheckCircle, AlertTriangle, Lock } from "lucide-react"

export function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [biometricEnabled, setBiometricEnabled] = useState(false)
  const [loginNotifications, setLoginNotifications] = useState(true)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const securityLevel = 85 // Mock security score

  const getSecurityLevelColor = (level: number) => {
    if (level >= 80) return "text-primary"
    if (level >= 60) return "text-yellow-600"
    return "text-destructive"
  }

  const getSecurityLevelBg = (level: number) => {
    if (level >= 80) return "bg-primary/10"
    if (level >= 60) return "bg-yellow-100"
    return "bg-destructive/10"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">Security Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your account security and authentication methods</p>
      </div>

      {/* Security Score */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <span>Security Score</span>
            </div>
            <Badge className={`${getSecurityLevelBg(securityLevel)} ${getSecurityLevelColor(securityLevel)} border-0`}>
              {securityLevel}%
            </Badge>
          </CardTitle>
          <CardDescription>Your account security strength based on enabled features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Security Level</span>
              <span className={getSecurityLevelColor(securityLevel)}>
                {securityLevel >= 80 ? "Excellent" : securityLevel >= 60 ? "Good" : "Needs Improvement"}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  securityLevel >= 80 ? "bg-primary" : securityLevel >= 60 ? "bg-yellow-500" : "bg-destructive"
                }`}
                style={{ width: `${securityLevel}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-primary" />
            </div>
            <span>Two-Factor Authentication</span>
            {twoFactorEnabled && (
              <Badge variant="default" className="bg-primary text-white">
                <CheckCircle className="w-3 h-3 mr-1" />
                Enabled
              </Badge>
            )}
          </CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">SMS Authentication</p>
              <p className="text-sm text-muted-foreground">Receive codes via SMS to your registered phone</p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>

          {twoFactorEnabled && (
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium text-primary">2FA is Active</p>
                  <p className="text-sm text-muted-foreground">Codes will be sent to +880 17**-***678</p>
                </div>
              </div>
            </div>
          )}

          {!twoFactorEnabled && (
            <div className="p-3 bg-destructive/5 rounded-lg border border-destructive/20">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                <div className="space-y-2">
                  <p className="font-medium text-destructive">2FA Disabled</p>
                  <p className="text-sm text-muted-foreground">
                    Your account is less secure without two-factor authentication
                  </p>
                  <Button size="sm" className="gradient-bg text-white">
                    Setup 2FA
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Biometric Authentication */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Fingerprint className="w-4 h-4 text-primary" />
            </div>
            <span>Biometric Authentication</span>
          </CardTitle>
          <CardDescription>Use fingerprint or face recognition for quick access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Biometric Login</p>
              <p className="text-sm text-muted-foreground">Enable fingerprint or face unlock</p>
            </div>
            <Switch checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
          </div>

          {biometricEnabled && (
            <Button variant="outline" className="w-full glass bg-transparent">
              <Fingerprint className="w-4 h-4 mr-2" />
              Configure Biometric Settings
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Password Management */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Key className="w-4 h-4 text-primary" />
            </div>
            <span>Password Management</span>
          </CardTitle>
          <CardDescription>Change your password and manage login credentials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                  className="glass pr-10"
                  placeholder="Enter current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                  className="glass pr-10"
                  placeholder="Enter new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                className="glass"
                placeholder="Confirm new password"
              />
            </div>

            <Button className="w-full gradient-bg text-white">
              <Lock className="w-4 h-4 mr-2" />
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Login Notifications */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <span>Login Notifications</span>
          </CardTitle>
          <CardDescription>Get notified about account access and security events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Login Alerts</p>
              <p className="text-sm text-muted-foreground">Receive notifications for new device logins</p>
            </div>
            <Switch checked={loginNotifications} onCheckedChange={setLoginNotifications} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
