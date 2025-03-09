import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, MapPin, Clock, Users, Bookmark, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for a single event
const eventData = {
  id: "hackathon-2024",
  title: "Hackathon 2024",
  description:
    "A 24-hour coding competition to build innovative solutions. Participants will work in teams to develop applications based on the theme revealed at the start of the event. The hackathon provides an excellent opportunity to showcase your coding skills, creativity, and teamwork.",
  date: "March 15, 2024",
  time: "9:00 AM - 9:00 AM (Next day)",
  venue: "Engineering Block, Room 101",
  category: "Technology",
  image: "/placeholder.svg?height=600&width=1200",
  registrationsOpen: true,
  teamSize: "1-4 members",
  featured: true,
  organizers: [
    {
      name: "Tech Club",
      contact: "techclub@college.edu",
    },
  ],
  prizes: ["First Prize: ₹50,000", "Second Prize: ₹30,000", "Third Prize: ₹20,000", "Special Categories: ₹10,000 each"],
  rules: [
    "Participants must be currently enrolled students.",
    "Teams can have 1-4 members from any department.",
    "The theme will be announced at the start of the hackathon.",
    "Teams are expected to develop a working prototype within 24 hours.",
    "Pre-built projects are not allowed.",
    "Teams can use any programming language or technology stack.",
    "Judges' decision will be final.",
  ],
  schedule: [
    {
      time: "9:00 AM - 10:00 AM",
      activity: "Registration and Team Formation",
    },
    {
      time: "10:00 AM - 10:30 AM",
      activity: "Theme Announcement and Rules Briefing",
    },
    {
      time: "10:30 AM - Next Day 8:00 AM",
      activity: "Coding Period",
    },
    {
      time: "8:00 AM - 9:00 AM",
      activity: "Presentations and Judging",
    },
    {
      time: "9:00 AM - 10:00 AM",
      activity: "Results and Prize Distribution",
    },
  ],
  resources: [
    "Wi-Fi access will be provided",
    "Power outlets for all teams",
    "Refreshments will be available throughout the event",
    "Mentors will be available for guidance",
  ],
}

export default function EventPage({ params }) {
  const { eventId } = params
  // In a real application, fetch event data based on eventId
  const event = eventData // Simulating fetched data

  return (
    <div className="container max-w-6xl py-10">
      <div className="relative h-[300px] md:h-[400px] mb-8 rounded-lg overflow-hidden">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="secondary">{event.category}</Badge>
            {event.featured && <Badge>Featured</Badge>}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{event.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">About the Event</h2>
                <p className="text-muted-foreground">{event.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Prizes</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {event.prizes.map((prize, index) => (
                    <li key={index}>{prize}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Organizers</h3>
                {event.organizers.map((organizer, index) => (
                  <div key={index} className="mb-2">
                    <div className="font-medium">{organizer.name}</div>
                    <div className="text-sm text-muted-foreground">{organizer.contact}</div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rules">
              <h2 className="text-2xl font-bold mb-4">Rules & Guidelines</h2>
              <ul className="list-disc pl-5 space-y-2">
                {event.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="schedule">
              <h2 className="text-2xl font-bold mb-4">Event Schedule</h2>
              <div className="space-y-4">
                {event.schedule.map((item, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4 py-2">
                    <div className="font-bold">{item.time}</div>
                    <div className="text-muted-foreground">{item.activity}</div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <h2 className="text-2xl font-bold mb-4">Resources Provided</h2>
              <ul className="list-disc pl-5 space-y-2">
                {event.resources.map((resource, index) => (
                  <li key={index}>{resource}</li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-bold">Event Information</h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Date</div>
                    <div className="text-muted-foreground">{event.date}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Time</div>
                    <div className="text-muted-foreground">{event.time}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Venue</div>
                    <div className="text-muted-foreground">{event.venue}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Team Size</div>
                    <div className="text-muted-foreground">{event.teamSize}</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <Button className="w-full" asChild>
                  <Link href={`/register?event=${event.id}`}>Register Now</Link>
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Related Events</h3>
            <div className="space-y-4">
              <RelatedEventCard title="Robowars" category="Technology" date="March 15, 2024" href="/events/robowars" />
              <RelatedEventCard
                title="Coding Contest"
                category="Technology"
                date="March 16, 2024"
                href="/events/coding-contest"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RelatedEventCard({ title, category, date, href }) {
  return (
    <Link href={href}>
      <div className="border rounded-lg p-4 hover:bg-muted transition-colors">
        <Badge variant="outline" className="mb-2">
          {category}
        </Badge>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
    </Link>
  )
}

