"use client"

import { useState } from "react"
import { Bell, Clock, Calendar, Settings, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function RemindersPage() {
  const [reminderSettings, setReminderSettings] = useState({
    autoReminders: true,
    defaultTiming: "24h",
    patientReminders: true,
    doctorReminders: true,
    confirmationRequired: true,
  })

  const scheduledReminders = [
    {
      id: 1,
      patient: "Sarah Johnson",
      doctor: "Dr. Smith",
      appointmentDate: "2025-01-15",
      appointmentTime: "09:00",
      reminderTime: "2025-01-14 09:00",
      channels: ["SMS", "Email"],
      status: "scheduled",
    },
    {
      id: 2,
      patient: "Mike Chen",
      doctor: "Dr. Wilson",
      appointmentDate: "2025-01-15",
      appointmentTime: "10:30",
      reminderTime: "2025-01-14 10:30",
      channels: ["WhatsApp"],
      status: "sent",
    },
    {
      id: 3,
      patient: "Emma Davis",
      doctor: "Dr. Brown",
      appointmentDate: "2025-01-16",
      appointmentTime: "14:00",
      reminderTime: "2025-01-15 14:00",
      channels: ["SMS", "Email"],
      status: "scheduled",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/">← Back to Dashboard</Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reminder Settings</h1>
              <p className="text-gray-600">Configure automatic reminder preferences and schedules</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>Configure default reminder behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-reminders">Automatic Reminders</Label>
                    <p className="text-sm text-gray-600">Send reminders automatically for all appointments</p>
                  </div>
                  <Switch
                    id="auto-reminders"
                    checked={reminderSettings.autoReminders}
                    onCheckedChange={(checked) => setReminderSettings((prev) => ({ ...prev, autoReminders: checked }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Default Reminder Timing</Label>
                  <Select
                    value={reminderSettings.defaultTiming}
                    onValueChange={(value) => setReminderSettings((prev) => ({ ...prev, defaultTiming: value }))}
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

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="patient-reminders">Patient Reminders</Label>
                    <p className="text-sm text-gray-600">Send reminders to patients</p>
                  </div>
                  <Switch
                    id="patient-reminders"
                    checked={reminderSettings.patientReminders}
                    onCheckedChange={(checked) =>
                      setReminderSettings((prev) => ({ ...prev, patientReminders: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="doctor-reminders">Doctor Reminders</Label>
                    <p className="text-sm text-gray-600">Send reminders to doctors</p>
                  </div>
                  <Switch
                    id="doctor-reminders"
                    checked={reminderSettings.doctorReminders}
                    onCheckedChange={(checked) =>
                      setReminderSettings((prev) => ({ ...prev, doctorReminders: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="confirmation-required">Confirmation Required</Label>
                    <p className="text-sm text-gray-600">Require patients to confirm appointments</p>
                  </div>
                  <Switch
                    id="confirmation-required"
                    checked={reminderSettings.confirmationRequired}
                    onCheckedChange={(checked) =>
                      setReminderSettings((prev) => ({ ...prev, confirmationRequired: checked }))
                    }
                  />
                </div>

                <Button className="w-full">Save Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reminder Statistics</CardTitle>
                <CardDescription>Overview of reminder performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">94%</div>
                    <div className="text-sm text-gray-600">Delivery Rate</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">87%</div>
                    <div className="text-sm text-gray-600">Response Rate</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">156</div>
                    <div className="text-sm text-gray-600">This Week</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">12</div>
                    <div className="text-sm text-gray-600">Failed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scheduled Reminders */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Scheduled Reminders
                </CardTitle>
                <CardDescription>Upcoming and recent reminder activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledReminders.map((reminder) => (
                    <div key={reminder.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-medium">{reminder.patient}</div>
                          <div className="text-sm text-gray-600">{reminder.doctor}</div>
                        </div>
                        <Badge className={getStatusColor(reminder.status)}>{reminder.status}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Calendar className="h-3 w-3" />
                            Appointment: {reminder.appointmentDate} at {reminder.appointmentTime}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Clock className="h-3 w-3" />
                            Reminder: {reminder.reminderTime}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex gap-1">
                          {reminder.channels.map((channel, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {channel}
                            </Badge>
                          ))}
                        </div>

                        {reminder.status === "scheduled" && (
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Play className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Pause className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common reminder management tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Send Test Reminder
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  View Reminder History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Bulk Reminder Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
