"use client"

import { useState } from "react"
import { MessageSquare, Phone, Mail, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function ChannelsPage() {
  const [channels, setChannels] = useState({
    sms: {
      enabled: true,
      configured: true,
      provider: "Twilio",
      lastTest: "2025-01-10",
    },
    whatsapp: {
      enabled: false,
      configured: false,
      provider: "WhatsApp Business API",
      lastTest: null,
    },
    email: {
      enabled: true,
      configured: true,
      provider: "SendGrid",
      lastTest: "2025-01-12",
    },
  })

  const [templates, setTemplates] = useState({
    sms: "Hi {patient_name}, this is a reminder for your appointment with {doctor_name} on {date} at {time}. Reply CONFIRM to confirm.",
    whatsapp:
      "Hello {patient_name}! 👋\n\nThis is a friendly reminder about your upcoming appointment:\n\n🏥 Doctor: {doctor_name}\n📅 Date: {date}\n⏰ Time: {time}\n\nPlease reply with CONFIRM to confirm your attendance.",
    email:
      "Dear {patient_name},\n\nThis is a reminder for your upcoming appointment:\n\nDoctor: {doctor_name}\nDate: {date}\nTime: {time}\n\nPlease confirm your attendance by replying to this email.\n\nBest regards,\nMediRemind Team",
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/">← Back to Dashboard</Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Communication Channels</h1>
              <p className="text-gray-600">Configure SMS, WhatsApp, and email settings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Channel Configuration */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  SMS Configuration
                </CardTitle>
                <CardDescription>Configure SMS messaging via Twilio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-enabled">Enable SMS Reminders</Label>
                  <div className="flex items-center gap-2">
                    {channels.sms.configured ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Configured
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Not Configured
                      </Badge>
                    )}
                    <Switch
                      id="sms-enabled"
                      checked={channels.sms.enabled}
                      onCheckedChange={(checked) =>
                        setChannels((prev) => ({
                          ...prev,
                          sms: { ...prev.sms, enabled: checked },
                        }))
                      }
                    />
                  </div>
                </div>

                {channels.sms.enabled && (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="twilio-sid">Twilio Account SID</Label>
                      <Input id="twilio-sid" placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
                    </div>
                    <div>
                      <Label htmlFor="twilio-token">Twilio Auth Token</Label>
                      <Input id="twilio-token" type="password" placeholder="••••••••••••••••" />
                    </div>
                    <div>
                      <Label htmlFor="twilio-phone">Twilio Phone Number</Label>
                      <Input id="twilio-phone" placeholder="+1234567890" />
                    </div>
                    <Button size="sm" variant="outline">
                      Test SMS
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  WhatsApp Configuration
                </CardTitle>
                <CardDescription>Configure WhatsApp Business API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="whatsapp-enabled">Enable WhatsApp Reminders</Label>
                  <div className="flex items-center gap-2">
                    {channels.whatsapp.configured ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Configured
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Not Configured
                      </Badge>
                    )}
                    <Switch
                      id="whatsapp-enabled"
                      checked={channels.whatsapp.enabled}
                      onCheckedChange={(checked) =>
                        setChannels((prev) => ({
                          ...prev,
                          whatsapp: { ...prev.whatsapp, enabled: checked },
                        }))
                      }
                    />
                  </div>
                </div>

                {channels.whatsapp.enabled && (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="whatsapp-token">WhatsApp Access Token</Label>
                      <Input id="whatsapp-token" type="password" placeholder="••••••••••••••••" />
                    </div>
                    <div>
                      <Label htmlFor="whatsapp-phone">WhatsApp Phone Number ID</Label>
                      <Input id="whatsapp-phone" placeholder="1234567890123456" />
                    </div>
                    <Button size="sm" variant="outline">
                      Test WhatsApp
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Configuration
                </CardTitle>
                <CardDescription>Configure email via SendGrid</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-enabled">Enable Email Reminders</Label>
                  <div className="flex items-center gap-2">
                    {channels.email.configured ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Configured
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Not Configured
                      </Badge>
                    )}
                    <Switch
                      id="email-enabled"
                      checked={channels.email.enabled}
                      onCheckedChange={(checked) =>
                        setChannels((prev) => ({
                          ...prev,
                          email: { ...prev.email, enabled: checked },
                        }))
                      }
                    />
                  </div>
                </div>

                {channels.email.enabled && (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="sendgrid-key">SendGrid API Key</Label>
                      <Input id="sendgrid-key" type="password" placeholder="SG.••••••••••••••••" />
                    </div>
                    <div>
                      <Label htmlFor="from-email">From Email Address</Label>
                      <Input id="from-email" placeholder="noreply@yourdomain.com" />
                    </div>
                    <div>
                      <Label htmlFor="from-name">From Name</Label>
                      <Input id="from-name" placeholder="MediRemind" />
                    </div>
                    <Button size="sm" variant="outline">
                      Test Email
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Message Templates */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Message Templates</CardTitle>
                <CardDescription>Customize reminder messages for each channel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="sms-template">SMS Template</Label>
                  <Textarea
                    id="sms-template"
                    value={templates.sms}
                    onChange={(e) => setTemplates((prev) => ({ ...prev, sms: e.target.value }))}
                    rows={3}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Available variables: {"{patient_name}"}, {"{doctor_name}"}, {"{date}"}, {"{time}"}
                  </p>
                </div>

                <div>
                  <Label htmlFor="whatsapp-template">WhatsApp Template</Label>
                  <Textarea
                    id="whatsapp-template"
                    value={templates.whatsapp}
                    onChange={(e) => setTemplates((prev) => ({ ...prev, whatsapp: e.target.value }))}
                    rows={6}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Available variables: {"{patient_name}"}, {"{doctor_name}"}, {"{date}"}, {"{time}"}
                  </p>
                </div>

                <div>
                  <Label htmlFor="email-template">Email Template</Label>
                  <Textarea
                    id="email-template"
                    value={templates.email}
                    onChange={(e) => setTemplates((prev) => ({ ...prev, email: e.target.value }))}
                    rows={8}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Available variables: {"{patient_name}"}, {"{doctor_name}"}, {"{date}"}, {"{time}"}
                  </p>
                </div>

                <Button className="w-full">Save Templates</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Status</CardTitle>
                <CardDescription>Overview of communication channel health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">SMS</div>
                        <div className="text-sm text-gray-600">Last test: {channels.sms.lastTest}</div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium">WhatsApp</div>
                        <div className="text-sm text-gray-600">Not configured</div>
                      </div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-sm text-gray-600">Last test: {channels.email.lastTest}</div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
