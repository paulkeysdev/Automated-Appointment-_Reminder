"use client"

import { useState } from "react"
import { Calendar, User, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function NewAppointment() {
  const [reminderSettings, setReminderSettings] = useState({
    sms: true,
    whatsapp: false,
    email: true,
    timing: "24h",
  })

  const doctors = [
    { id: "1", name: "Dr. Sarah Smith", specialty: "Cardiology" },
    { id: "2", name: "Dr. Michael Wilson", specialty: "Dermatology" },
    { id: "3", name: "Dr. Emily Brown", specialty: "Pediatrics" },
  ]

  const patients = [
    { id: "1", name: "John Doe", phone: "+1234567890" },
    { id: "2", name: "Jane Smith", phone: "+1234567891" },
    { id: "3", name: "Mike Johnson", phone: "+1234567892" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/">← Back to Dashboard</Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">New Appointment</h1>
              <p className="text-gray-600">Schedule a new appointment with automatic reminders</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>Fill in the appointment information and reminder preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patient">Patient</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{patient.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doctor">Doctor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          <div className="flex items-center gap-2">
                            <UserCheck className="h-4 w-4" />
                            <div>
                              <div>{doctor.name}</div>
                              <div className="text-xs text-gray-500">{doctor.specialty}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input type="date" id="date" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input type="time" id="time" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea id="notes" placeholder="Any additional notes about the appointment..." rows={3} />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">Reminder Settings</Label>

                <div className="space-y-2">
                  <Label htmlFor="timing">Reminder Timing</Label>
                  <Select
                    value={reminderSettings.timing}
                    onValueChange={(value) => setReminderSettings((prev) => ({ ...prev, timing: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">1 hour before</SelectItem>
                      <SelectItem value="2h">2 hours before</SelectItem>
                      <SelectItem value="24h">24 hours before</SelectItem>
                      <SelectItem value="48h">48 hours before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Notification Channels</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sms"
                        checked={reminderSettings.sms}
                        onCheckedChange={(checked) =>
                          setReminderSettings((prev) => ({ ...prev, sms: checked as boolean }))
                        }
                      />
                      <Label htmlFor="sms" className="flex items-center gap-2">
                        📱 SMS Text Message
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="whatsapp"
                        checked={reminderSettings.whatsapp}
                        onCheckedChange={(checked) =>
                          setReminderSettings((prev) => ({ ...prev, whatsapp: checked as boolean }))
                        }
                      />
                      <Label htmlFor="whatsapp" className="flex items-center gap-2">
                        💬 WhatsApp
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="email"
                        checked={reminderSettings.email}
                        onCheckedChange={(checked) =>
                          setReminderSettings((prev) => ({ ...prev, email: checked as boolean }))
                        }
                      />
                      <Label htmlFor="email" className="flex items-center gap-2">
                        📧 Email
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Cancel</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
