"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MessageSquare, Phone, Mail, Clock, User, AlertCircle, CheckCircle } from "lucide-react"

export function CustomerSupport() {
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const tickets = [
    {
      id: "#CS-1234",
      customer: "John Doe",
      email: "john.doe@email.com",
      phone: "+880 1712-345678",
      issue: "Transaction Failed",
      description: "Money was deducted but transaction shows failed",
      priority: "high",
      status: "open",
      created: "2024-01-15 10:30 AM",
      category: "transaction",
      amount: "৳5,000",
    },
    {
      id: "#CS-1235",
      customer: "Sarah Khan",
      email: "sarah.khan@email.com",
      phone: "+880 1812-345678",
      issue: "Account Access Issue",
      description: "Cannot login to mobile app after password reset",
      priority: "medium",
      status: "in-progress",
      created: "2024-01-15 09:15 AM",
      category: "account",
      amount: null,
    },
    {
      id: "#CS-1236",
      customer: "Ahmed Ali",
      email: "ahmed.ali@email.com",
      phone: "+880 1912-345678",
      issue: "KYC Document Question",
      description: "Wants to know why KYC was rejected",
      priority: "low",
      status: "pending",
      created: "2024-01-15 08:45 AM",
      category: "kyc",
      amount: null,
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "destructive"
      case "in-progress":
        return "secondary"
      case "pending":
        return "outline"
      case "resolved":
        return "default"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Customer Support</h2>
          <p className="text-muted-foreground">Manage customer tickets and support requests</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Support Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Tickets</p>
                <p className="text-2xl font-bold text-destructive">12</p>
              </div>
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-secondary">8</p>
              </div>
              <Clock className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
                <p className="text-2xl font-bold text-primary">24</p>
              </div>
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold text-accent">2.5h</p>
              </div>
              <MessageSquare className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets Table */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Support Tickets</CardTitle>
          <CardDescription>All customer support requests and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-muted-foreground">{ticket.id}</span>
                      <Badge variant={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                      <Badge variant={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                    </div>
                    <h4 className="font-semibold text-foreground">{ticket.issue}</h4>
                    <p className="text-sm text-muted-foreground">{ticket.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {ticket.customer}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {ticket.created}
                      </span>
                      {ticket.amount && <span className="font-medium text-primary">{ticket.amount}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedTicket(ticket)}>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Ticket Details - {ticket.id}</DialogTitle>
                          <DialogDescription>Customer support ticket information and actions</DialogDescription>
                        </DialogHeader>
                        <Tabs defaultValue="details" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="communication">Communication</TabsTrigger>
                            <TabsTrigger value="actions">Actions</TabsTrigger>
                          </TabsList>
                          <TabsContent value="details" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Customer Name</label>
                                <p className="text-sm text-muted-foreground">{ticket.customer}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Email</label>
                                <p className="text-sm text-muted-foreground">{ticket.email}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Phone</label>
                                <p className="text-sm text-muted-foreground">{ticket.phone}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Priority</label>
                                <Badge variant={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Issue Description</label>
                              <p className="text-sm text-muted-foreground mt-1">{ticket.description}</p>
                            </div>
                          </TabsContent>
                          <TabsContent value="communication" className="space-y-4">
                            <div className="space-y-3">
                              <div className="flex gap-3">
                                <Button variant="outline" size="sm">
                                  <Phone className="w-4 h-4 mr-2" />
                                  Call Customer
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Mail className="w-4 h-4 mr-2" />
                                  Send Email
                                </Button>
                              </div>
                              <Textarea placeholder="Add internal note or customer response..." />
                              <Button className="w-full">Send Response</Button>
                            </div>
                          </TabsContent>
                          <TabsContent value="actions" className="space-y-4">
                            <div className="space-y-3">
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Change Status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="open">Open</SelectItem>
                                  <SelectItem value="in-progress">In Progress</SelectItem>
                                  <SelectItem value="pending">Pending Customer</SelectItem>
                                  <SelectItem value="resolved">Resolved</SelectItem>
                                </SelectContent>
                              </Select>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Change Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button className="w-full" variant="destructive">
                                Escalate to Super Admin
                              </Button>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
