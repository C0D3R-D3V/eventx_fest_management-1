"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Trophy, Bell, Users, MapPin, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

// Mock data
const userEvents = [
  {
    id: "hackathon-2024",
    title: "Hackathon 2024",
    date: "March 15, 2024",
    time: "9:00 AM - 9:00 AM (Next day)",
    venue: "Engineering Block, Room 101",
    category: "Technology",
    status: "registered",
    teamName: "Code Ninjas",
    teamMembers: ["John Doe", "Jane Smith", "Robert Johnson"],
  },
  {
    id: "quiz-competition",
    title: "Quiz Competition",
    date: "March 16, 2024",
    time: "2:00 PM - 4:00 PM",
    venue: "Central Library, Conference Room",
    category: "General",
    status: "registered",
    teamName: null,
    teamMembers: null,
  },
]

const userQuizzes = [
  {
    id: "tech-trivia",
    title: "Tech Trivia Challenge",
    date: "March 12, 2024",
    category: "Technology",
    score: 85,
    totalQuestions: 30,
    correctAnswers: 25,
    status: "completed",
    passed: true,
  },
  {
    id: "festx-trivia",
    title: "FestX Trivia",
    date: "March 14, 2024",
    category: "FestX",
    score: 65,
    totalQuestions: 20,
    correctAnswers: 13,
    status: "completed",
    passed: true,
  },
  {
    id: "general-knowledge",
    title: "General Knowledge Challenge",
    date: null,
    category: "General",
    score: null,
    totalQuestions: 50,
    correctAnswers: null,
    status: "not-started",
    passed: null,
  },
]

const announcements = [
  {
    id: 1,
    title: "Schedule Change for Hackathon",
    content: "The start time for the Hackathon has been moved to 10:00 AM due to venue preparation.",
    date: "March 13, 2024",
    time: "2:30 PM",
    isRead: false,
    priority: "high",
  },
  {
    id: 2,
    title: "New Quiz Added",
    content: "A new Sports Spectacular quiz has been added. Test your sports knowledge now!",
    date: "March 12, 2024",
    time: "11:15 AM",
    isRead: true,
    priority: "medium",
  },
  {
    id: 3,
    title: "Food Options at FestX",
    content: "Various food stalls will be available throughout the campus. Check the map for locations.",
    date: "March 10, 2024",
    time: "4:45 PM",
    isRead: true,
    priority: "low",
  },
]

export default function DashboardPage() {
  const [readAnnouncements, setReadAnnouncements] = useState(
    () => new Set(announcements.filter((a) => a.isRead).map((a) => a.id)),
  )

  const markAsRead = (id) => {
    setReadAnnouncements((prev) => {
      const newSet = new Set(prev)
      newSet.add(id)
      return newSet
    })
  }

  const unreadCount = announcements.filter((a) => !readAnnouncements.has(a.id)).length

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your events, quizzes, and stay updated</p>
        </div>
        <div className="flex flex-col xs:flex-row gap-2">
          <Button asChild>
            <Link href="/events">Browse Events</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/quizzes">Take Quizzes</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="My Events" value={userEvents.length} icon={<Calendar className="h-6 w-6" />} />
        <DashboardCard
          title="Quizzes Completed"
          value={userQuizzes.filter((q) => q.status === "completed").length}
          icon={<CheckCircle className="h-6 w-6" />}
        />
        <DashboardCard
          title="Notifications"
          value={unreadCount}
          icon={<Bell className="h-6 w-6" />}
          highlight={unreadCount > 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="events">
            <TabsList className="mb-4">
              <TabsTrigger value="events">My Events</TabsTrigger>
              <TabsTrigger value="quizzes">My Quizzes</TabsTrigger>
            </TabsList>
            <TabsContent value="events">
              <div className="space-y-4">
                {userEvents.length > 0 ? (
                  userEvents.map((event) => <EventCard key={event.id} event={event} />)
                ) : (
                  <EmptyState
                    title="No events registered"
                    description="You haven't registered for any events yet."
                    action={
                      <Button asChild>
                        <Link href="/events">Browse Events</Link>
                      </Button>
                    }
                  />
                )}
              </div>
            </TabsContent>
            <TabsContent value="quizzes">
              <div className="space-y-4">
                {userQuizzes.length > 0 ? (
                  userQuizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)
                ) : (
                  <EmptyState
                    title="No quizzes taken"
                    description="You haven't taken any quizzes yet."
                    action={
                      <Button asChild>
                        <Link href="/quizzes">Browse Quizzes</Link>
                      </Button>
                    }
                  />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Announcements</CardTitle>
                {unreadCount > 0 && <Badge>{unreadCount} new</Badge>}
              </div>
              <CardDescription>Stay updated with the latest news</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.length > 0 ? (
                  announcements.map((announcement) => (
                    <AnnouncementCard
                      key={announcement.id}
                      announcement={announcement}
                      isRead={readAnnouncements.has(announcement.id)}
                      onMarkAsRead={() => markAsRead(announcement.id)}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No announcements yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=100&width=100" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">John Doe</h3>
                  <p className="text-muted-foreground">Computer Science</p>
                  <p className="text-sm text-muted-foreground">University of Technology</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/profile">View Profile</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/settings">Settings</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function DashboardCard({ title, value, icon, highlight = false }) {
  return (
    <Card className={highlight ? "border-primary" : ""}>
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
          </div>
          <div className={`p-3 rounded-full ${highlight ? "bg-primary/10 text-primary" : "bg-muted"}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function EventCard({ event }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2">
              {event.category}
            </Badge>
            <h3 className="text-lg font-bold">{event.title}</h3>
          </div>
          <StatusBadge status={event.status} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
          <div className="flex gap-2 items-start">
            <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-medium">Date</div>
              <div className="text-muted-foreground">{event.date}</div>
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-medium">Time</div>
              <div className="text-muted-foreground">{event.time}</div>
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-medium">Venue</div>
              <div className="text-muted-foreground">{event.venue}</div>
            </div>
          </div>
          {event.teamName && (
            <div className="flex gap-2 items-start">
              <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <div className="font-medium">Team</div>
                <div className="text-muted-foreground">{event.teamName}</div>
              </div>
            </div>
          )}
        </div>

        {event.teamMembers && (
          <div className="mt-4 pt-4 border-t">
            <div className="font-medium mb-2">Team Members</div>
            <div className="flex flex-wrap gap-2">
              {event.teamMembers.map((member, index) => (
                <Badge key={index} variant="secondary">
                  {member}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/events/${event.id}`}>View Event</Link>
          </Button>
          <Button size="sm">Join Now</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function QuizCard({ quiz }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2">
              {quiz.category}
            </Badge>
            <h3 className="text-lg font-bold">{quiz.title}</h3>
            {quiz.date && <p className="text-sm text-muted-foreground mt-1">Taken on {quiz.date}</p>}
          </div>
          <QuizStatusBadge status={quiz.status} passed={quiz.passed} />
        </div>

        {quiz.status === "completed" && (
          <div className="mt-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-muted p-2 rounded-lg">
                <p className="text-xs text-muted-foreground">Score</p>
                <p className="text-lg font-bold">{quiz.score}%</p>
              </div>
              <div className="bg-muted p-2 rounded-lg">
                <p className="text-xs text-muted-foreground">Correct</p>
                <p className="text-lg font-bold">
                  {quiz.correctAnswers}/{quiz.totalQuestions}
                </p>
              </div>
              <div className="bg-muted p-2 rounded-lg">
                <p className="text-xs text-muted-foreground">Questions</p>
                <p className="text-lg font-bold">{quiz.totalQuestions}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          {quiz.status === "completed" ? (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/quizzes/${quiz.id}/results`}>View Results</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={`/quizzes/${quiz.id}`}>Retry Quiz</Link>
              </Button>
            </>
          ) : (
            <Button size="sm" asChild>
              <Link href={`/quizzes/${quiz.id}`}>Start Quiz</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function AnnouncementCard({ announcement, isRead, onMarkAsRead }) {
  return (
    <div className={`border rounded-lg p-4 ${!isRead ? "border-primary" : ""}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <h4 className={`font-medium ${!isRead ? "text-primary" : ""}`}>{announcement.title}</h4>
          {!isRead && (
            <Badge variant="default" className="ml-2">
              New
            </Badge>
          )}
        </div>
        {getPriorityBadge(announcement.priority)}
      </div>
      <p className="text-sm text-muted-foreground mb-3">{announcement.content}</p>
      <div className="flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          {announcement.date} · {announcement.time}
        </div>
        {!isRead && (
          <Button variant="ghost" size="sm" onClick={onMarkAsRead}>
            Mark as read
          </Button>
        )}
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  if (status === "registered") {
    return <Badge variant="default">Registered</Badge>
  }
  if (status === "attended") {
    return <Badge variant="secondary">Attended</Badge>
  }
  if (status === "missed") {
    return <Badge variant="destructive">Missed</Badge>
  }
  return <Badge variant="outline">Unknown</Badge>
}

function QuizStatusBadge({ status, passed }) {
  if (status === "completed") {
    return passed ? (
      <Badge className="flex gap-1 items-center" variant="default">
        <CheckCircle className="h-3 w-3" /> Passed
      </Badge>
    ) : (
      <Badge className="flex gap-1 items-center" variant="destructive">
        <XCircle className="h-3 w-3" /> Failed
      </Badge>
    )
  }
  if (status === "in-progress") {
    return <Badge variant="secondary">In Progress</Badge>
  }
  if (status === "not-started") {
    return <Badge variant="outline">Not Started</Badge>
  }
  return <Badge variant="outline">Unknown</Badge>
}

function getPriorityBadge(priority) {
  if (priority === "high") {
    return <Badge variant="destructive">High</Badge>
  }
  if (priority === "medium") {
    return <Badge variant="default">Medium</Badge>
  }
  if (priority === "low") {
    return <Badge variant="secondary">Low</Badge>
  }
  return null
}

function EmptyState({ title, description, action }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <Trophy className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        {action}
      </CardContent>
    </Card>
  )
}

