"use client"

import { useState } from "react"
import { Calendar, Clock, Filter, Search, MessageSquare, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function AppointmentsPage() {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const appointments = [
    {
      id: 1,
      patient: "Sarah Kimani",
      doctor: "Dr. Smith",
      date: "2025-01-15",
      time: "09:00",
      status: "confirmed",
      reminderSent: true,
      channels: ["sms", "email"],
      phone: "+254734567890",
    },
    {
      id: 2,
      patient: "Mike Kamau",
      doctor: "Dr. Wilson",
      date: "2025-01-15",
      time: "10:30",
      status: "pending",
      reminderSent: true,
      channels: ["whatsapp"],
      phone: "+254734567891",
    },
    {
      id: 3,
      patient: "Emma Davis",
      doctor: "Dr. Brown",
      date: "2025-01-16",
      time: "14:00",
      status: "pending",
      reminderSent: false,
      channels: ["sms", "email"],
      phone: "+254734567892",
    },
    {
      id: 4,
      patient: "John Wilson",
      doctor: "Dr. Smith",
      date: "2025-01-16",
      time: "11:00",
      status: "cancelled",
      reminderSent: true,
      channels: ["sms"],
      phone: "+254734567893",
    },
  ]

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesFilter = filter === "all" || appointment.status === filter
    const matchesSearch =
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "sms":
        return <MessageSquare className="h-3 w-3" />
      case "whatsapp":
        return <Phone className="h-3 w-3" />
      case "email":
        return <Mail className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/">← Back to Dashboard</Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Appointments</h1>
                <p className="text-gray-600">Manage and track appointment reminders</p>
              </div>
            </div>
            <Button asChild>
              <Link href="/appointments/new">New Appointment</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search patients or doctors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appointments ({filteredAppointments.length})</CardTitle>
            <CardDescription>Track appointment status and reminder delivery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-lg">{appointment.patient}</span>
                        <span className="text-sm text-gray-600">{appointment.doctor}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Calendar className="h-4 w-4" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          {appointment.time}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>

                        <div className="flex items-center gap-1">
                          {appointment.reminderSent ? (
                            <>
                              <span className="text-xs text-green-600">✓ Reminded via:</span>
                              <div className="flex gap-1">
                                {appointment.channels.map((channel, index) => (
                                  <div key={index} className="text-green-600">
                                    {getChannelIcon(channel)}
                                  </div>
                                ))}
                              </div>
                            </>
                          ) : (
                            <span className="text-xs text-gray-500">Reminder pending</span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        {!appointment.reminderSent && (
                          <Button size="sm" variant="default">
                            Send Reminder
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredAppointments.length === 0 && (
                <div className="text-center py-8 text-gray-500">No appointments found matching your criteria.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
