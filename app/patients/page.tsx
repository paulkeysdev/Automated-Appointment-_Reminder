"use client"

import { useState } from "react"
import { User, Phone, Mail, Plus, Search, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const patients = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+254734567890",
      whatsapp: "+254734567890",
      preferredChannel: "SMS",
      totalAppointments: 12,
      upcomingAppointments: 1,
      lastVisit: "2024-01-10",
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      phone: "+254734567891",
      whatsapp: "+254734567891",
      preferredChannel: "WhatsApp",
      totalAppointments: 8,
      upcomingAppointments: 2,
      lastVisit: "2025-01-08",
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma.davis@email.com",
      phone: "+254734567892",
      whatsapp: null,
      preferredChannel: "Email",
      totalAppointments: 15,
      upcomingAppointments: 0,
      lastVisit: "2025-01-12",
    },
    {
      id: 4,
      name: "John Wilson",
      email: "john.wilson@email.com",
      phone: "+254734567893",
      whatsapp: "+254734567893",
      preferredChannel: "SMS",
      totalAppointments: 5,
      upcomingAppointments: 1,
      lastVisit: "2025-01-05",
    },
  ]

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm),
  )

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case "SMS":
        return "bg-blue-100 text-blue-800"
      case "WhatsApp":
        return "bg-green-100 text-green-800"
      case "Email":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
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
                <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
                <p className="text-gray-600">Manage patient information and communication preferences</p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Patient
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Patient</DialogTitle>
                  <DialogDescription>Enter patient information and communication preferences</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="patient-name">Full Name</Label>
                    <Input id="patient-name" placeholder="Enter patient name" />
                  </div>
                  <div>
                    <Label htmlFor="patient-email">Email</Label>
                    <Input id="patient-email" type="email" placeholder="patient@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="patient-phone">Phone Number</Label>
                    <Input id="patient-phone" placeholder="+254734567890" />
                  </div>
                  <div>
                    <Label htmlFor="patient-whatsapp">WhatsApp Number (Optional)</Label>
                    <Input id="patient-whatsapp" placeholder="+254734567890" />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setIsAddDialogOpen(false)}>Add Patient</Button>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patients ({filteredPatients.length})</CardTitle>
            <CardDescription>Manage patient profiles and communication settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{patient.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {patient.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {patient.phone}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{patient.upcomingAppointments} upcoming</div>
                        <div className="text-xs text-gray-600">{patient.totalAppointments} total appointments</div>
                        <div className="text-xs text-gray-600">Last visit: {patient.lastVisit}</div>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <Badge className={getChannelColor(patient.preferredChannel)}>{patient.preferredChannel}</Badge>
                        <div className="flex gap-1">
                          {patient.whatsapp && (
                            <div className="w-2 h-2 bg-green-500 rounded-full" title="WhatsApp available" />
                          )}
                          <div className="w-2 h-2 bg-blue-500 rounded-full" title="SMS available" />
                          <div className="w-2 h-2 bg-purple-500 rounded-full" title="Email available" />
                        </div>
                      </div>

                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredPatients.length === 0 && (
                <div className="text-center py-8 text-gray-500">No patients found matching your search criteria.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
