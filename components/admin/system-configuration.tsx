"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Settings, DollarSign, CreditCard, Globe, Shield, Zap, Save, RefreshCw, Edit, Plus } from "lucide-react"

export function SystemConfiguration() {
  const [activeTab, setActiveTab] = useState("limits")
  const [isEditingIntegration, setIsEditingIntegration] = useState(false)

  // Transaction Limits Configuration
  const transactionLimits = [
    {
      type: "Daily Transfer Limit",
      individual: "৳500,000",
      business: "৳2,000,000",
      description: "Maximum daily transfer amount per user",
    },
    {
      type: "Monthly Transfer Limit",
      individual: "৳2,000,000",
      business: "৳10,000,000",
      description: "Maximum monthly transfer amount per user",
    },
    {
      type: "Single Transaction Limit",
      individual: "৳100,000",
      business: "৳500,000",
      description: "Maximum amount per single transaction",
    },
    {
      type: "Bill Payment Limit",
      individual: "৳50,000",
      business: "৳200,000",
      description: "Maximum bill payment amount per transaction",
    },
  ]

  // Service Charges Configuration
  const serviceCharges = [
    {
      service: "Fund Transfer (Same Bank)",
      charge: "Free",
      type: "Fixed",
      description: "No charge for same bank transfers",
    },
    {
      service: "Fund Transfer (Other Banks)",
      charge: "৳15",
      type: "Fixed",
      description: "Fixed charge for interbank transfers",
    },
    {
      service: "Mobile Wallet Transfer",
      charge: "1.5%",
      type: "Percentage",
      description: "Percentage-based charge with ৳5 minimum",
    },
    {
      service: "Bill Payment",
      charge: "৳5",
      type: "Fixed",
      description: "Fixed charge for utility bill payments",
    },
    {
      service: "Loan Processing Fee",
      charge: "2%",
      type: "Percentage",
      description: "Processing fee for loan applications",
    },
  ]

  // Integration Status
  const integrations = [
    {
      name: "BEFTN",
      type: "Banking",
      status: "active",
      endpoint: "https://api.beftn.gov.bd/v1",
      lastSync: "2024-01-15 10:30 AM",
      description: "Bangladesh Electronic Fund Transfer Network",
    },
    {
      name: "NPSB",
      type: "Banking",
      status: "active",
      endpoint: "https://api.npsb.gov.bd/v2",
      lastSync: "2024-01-15 10:25 AM",
      description: "National Payment Switch Bangladesh",
    },
    {
      name: "bKash",
      type: "Mobile Wallet",
      status: "active",
      endpoint: "https://api.bkash.com/v1",
      lastSync: "2024-01-15 10:35 AM",
      description: "bKash Mobile Financial Services",
    },
    {
      name: "Nagad",
      type: "Mobile Wallet",
      status: "active",
      endpoint: "https://api.nagad.com.bd/v1",
      lastSync: "2024-01-15 10:28 AM",
      description: "Nagad Digital Financial Services",
    },
    {
      name: "Rocket",
      type: "Mobile Wallet",
      status: "inactive",
      endpoint: "https://api.rocket.com.bd/v1",
      lastSync: "2024-01-10 03:15 PM",
      description: "Dutch-Bangla Bank Rocket",
    },
  ]

  // System Modules
  const systemModules = [
    {
      name: "QR Payments",
      description: "QR code-based payment system",
      enabled: true,
      category: "Payments",
    },
    {
      name: "Health Portal",
      description: "Healthcare services integration",
      enabled: false,
      category: "Services",
    },
    {
      name: "Investment Portal",
      description: "Investment and trading services",
      enabled: true,
      category: "Financial",
    },
    {
      name: "Insurance Services",
      description: "Insurance product integration",
      enabled: true,
      category: "Services",
    },
    {
      name: "Cryptocurrency",
      description: "Digital currency trading",
      enabled: false,
      category: "Financial",
    },
    {
      name: "Merchant Portal",
      description: "Business merchant services",
      enabled: true,
      category: "Business",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      case "error":
        return "destructive"
      default:
        return "outline"
    }
  }

  const handleSaveConfiguration = () => {
    console.log("[v0] Saving system configuration")
    // Handle configuration save logic
  }

  const handleTestIntegration = (integrationName: string) => {
    console.log("[v0] Testing integration:", integrationName)
    // Handle integration testing logic
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">System Configuration</h2>
          <p className="text-muted-foreground">Manage system settings, limits, and integrations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-transparent">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Status
          </Button>
          <Button onClick={handleSaveConfiguration}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Configuration Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="limits">Transaction Limits</TabsTrigger>
          <TabsTrigger value="charges">Service Charges</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="modules">System Modules</TabsTrigger>
          <TabsTrigger value="security">Security Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="limits" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Transaction Limits Configuration
              </CardTitle>
              <CardDescription>Set maximum transaction amounts for different user types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {transactionLimits.map((limit, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-foreground">{limit.type}</h4>
                        <p className="text-sm text-muted-foreground">{limit.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">Individual Users</Label>
                        <Input value={limit.individual} className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm">Business Users</Label>
                        <Input value={limit.business} className="mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Limit Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charges" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Service Charges Management
              </CardTitle>
              <CardDescription>Configure fees and charges for various services</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Charge</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serviceCharges.map((charge, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{charge.service}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{charge.charge}</Badge>
                      </TableCell>
                      <TableCell>{charge.type}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{charge.description}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button className="w-full mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add New Service Charge
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Banking & MFS Integrations
              </CardTitle>
              <CardDescription>Manage external service integrations and API connections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.map((integration, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-foreground">{integration.name}</h4>
                          <Badge variant={getStatusColor(integration.status)}>{integration.status}</Badge>
                          <Badge variant="outline">{integration.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{integration.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Endpoint: </span>
                            <span className="font-mono text-xs">{integration.endpoint}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Last Sync: </span>
                            <span>{integration.lastSync}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleTestIntegration(integration.name)}>
                          <Zap className="w-4 h-4 mr-2" />
                          Test
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setIsEditingIntegration(true)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Integration - {integration.name}</DialogTitle>
                              <DialogDescription>Configure integration settings and credentials</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Integration Name</Label>
                                  <Input value={integration.name} />
                                </div>
                                <div className="space-y-2">
                                  <Label>Status</Label>
                                  <Select defaultValue={integration.status}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="active">Active</SelectItem>
                                      <SelectItem value="inactive">Inactive</SelectItem>
                                      <SelectItem value="maintenance">Maintenance</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>API Endpoint</Label>
                                <Input value={integration.endpoint} />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>API Key</Label>
                                  <Input type="password" placeholder="••••••••••••••••" />
                                </div>
                                <div className="space-y-2">
                                  <Label>Secret Key</Label>
                                  <Input type="password" placeholder="••••••••••••••••" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Configuration Notes</Label>
                                <Textarea placeholder="Add any configuration notes or special instructions..." />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                              <Button variant="outline" onClick={() => setIsEditingIntegration(false)}>
                                Cancel
                              </Button>
                              <Button onClick={() => setIsEditingIntegration(false)}>Save Changes</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Integration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                System Modules Management
              </CardTitle>
              <CardDescription>Enable or disable system features and modules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(
                  systemModules.reduce(
                    (acc, module) => {
                      if (!acc[module.category]) {
                        acc[module.category] = []
                      }
                      acc[module.category].push(module)
                      return acc
                    },
                    {} as Record<string, typeof systemModules>,
                  ),
                ).map(([category, modules]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="font-medium text-foreground border-b border-border pb-2">{category} Modules</h4>
                    <div className="space-y-3">
                      {modules.map((module, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border border-border rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h5 className="font-medium text-foreground">{module.name}</h5>
                              <Badge variant={module.enabled ? "default" : "secondary"}>
                                {module.enabled ? "Enabled" : "Disabled"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Switch checked={module.enabled} />
                            <Button variant="outline" size="sm">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Configuration
              </CardTitle>
              <CardDescription>Configure system security settings and policies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">Authentication Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Two-Factor Authentication</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Biometric Login</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Session Timeout (30 min)</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Password Policy</Label>
                        <Select defaultValue="strong">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                            <SelectItem value="medium">Medium (8+ chars, mixed case)</SelectItem>
                            <SelectItem value="strong">Strong (12+ chars, symbols)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">Transaction Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Real-time Fraud Detection</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Velocity Checks</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Geo-location Validation</span>
                        <Switch />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Risk Threshold</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low Sensitivity</SelectItem>
                            <SelectItem value="medium">Medium Sensitivity</SelectItem>
                            <SelectItem value="high">High Sensitivity</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">API Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Rate Limiting</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">IP Whitelisting</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">API Key Rotation</span>
                        <Switch />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Encryption Level</Label>
                        <Select defaultValue="aes256">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aes128">AES-128</SelectItem>
                            <SelectItem value="aes256">AES-256</SelectItem>
                            <SelectItem value="rsa2048">RSA-2048</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">Compliance Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">AML Monitoring</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">KYC Validation</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Regulatory Reporting</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Data Retention (months)</Label>
                        <Input type="number" defaultValue="84" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
