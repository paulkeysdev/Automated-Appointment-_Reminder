import { Calendar, Clock, MessageSquare, Users, Bell } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Dashboard() {
  const stats = [
    {
      title: "Today's Appointments",
      value: "12",
      description: "3 pending reminders",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Reminders Sent",
      value: "48",
      description: "This week",
      icon: Bell,
      color: "text-green-600",
    },
    {
      title: "Active Patients",
      value: "156",
      description: "2 new this week",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Response Rate",
      value: "94%",
      description: "Confirmation rate",
      icon: MessageSquare,
      color: "text-orange-600",
    },
  ]

  const upcomingAppointments = [
    {
      id: 1,
      patient: "Sarah Johnson",
      doctor: "Dr. Smith",
      time: "09:00 AM",
      date: "Today",
      status: "confirmed",
      reminderSent: true,
    },
    {
      id: 2,
      patient: "Mike Chen",
      doctor: "Dr. Wilson",
      time: "10:30 AM",
      date: "Today",
      status: "pending",
      reminderSent: true,
    },
    {
      id: 3,
      patient: "Emma Davis",
      doctor: "Dr. Brown",
      time: "02:00 PM",
      date: "Tomorrow",
      status: "pending",
      reminderSent: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MediRemind</h1>
              <p className="text-gray-600">Appointment Reminder System</p>
            </div>
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/appointments/new">New Appointment</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/settings">Settings</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Next appointments requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{appointment.patient}</span>
                        <span className="text-sm text-gray-600">{appointment.doctor}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm font-medium">{appointment.time}</div>
                        <div className="text-xs text-gray-600">{appointment.date}</div>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            appointment.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                        {appointment.reminderSent ? (
                          <span className="text-xs text-green-600">✓ Reminded</span>
                        ) : (
                          <span className="text-xs text-gray-500">Pending</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/appointments">View All Appointments</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/appointments/new">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule New Appointment
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/patients">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Patients
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/reminders">
                  <Bell className="mr-2 h-4 w-4" />
                  Reminder Settings
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/channels">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Communication Channels
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/reports">
                  <Clock className="mr-2 h-4 w-4" />
                  View Reports
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
