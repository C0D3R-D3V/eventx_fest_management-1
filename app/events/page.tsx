import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { CalendarIcon, MapPin, Clock, Users, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for events
const events = [
  {
    id: "hackathon-2024",
    title: "Hackathon 2024",
    description: "A 24-hour coding competition to build innovative solutions.",
    date: "March 15, 2024",
    time: "9:00 AM - 9:00 AM (Next day)",
    venue: "Engineering Block, Room 101",
    category: "Technology",
    image: "/placeholder.svg?height=400&width=600",
    registrationsOpen: true,
    teamSize: "1-4 members",
    featured: true,
  },
  {
    id: "battle-of-bands",
    title: "Battle of Bands",
    description: "Showcase your musical talent and compete with other bands.",
    date: "March 16, 2024",
    time: "6:00 PM - 10:00 PM",
    venue: "College Auditorium",
    category: "Music",
    image: "/placeholder.svg?height=400&width=600",
    registrationsOpen: true,
    teamSize: "3-8 members",
    featured: true,
  },
  {
    id: "debating-championship",
    title: "Debating Championship",
    description: "Test your oratory skills in this competitive debating contest.",
    date: "March 17, 2024",
    time: "10:00 AM - 4:00 PM",
    venue: "Humanities Block, Conference Hall",
    category: "Literary",
    image: "/placeholder.svg?height=400&width=600",
    registrationsOpen: true,
    teamSize: "2 members",
    featured: false,
  },
  {
    id: "robowars",
    title: "Robowars",
    description: "Build your battle robot and compete in this exciting competition.",
    date: "March 15, 2024",
    time: "2:00 PM - 6:00 PM",
    venue: "Open Ground Area",
    category: "Technology",
    image: "/placeholder.svg?height=400&width=600",
    registrationsOpen: true,
    teamSize: "2-5 members",
    featured: false,
  },
  {
    id: "dance-competition",
    title: "Dance Competition",
    description: "Showcase your dance moves in solo or group performances.",
    date: "March 16, 2024",
    time: "5:00 PM - 8:00 PM",
    venue: "College Auditorium",
    category: "Cultural",
    image: "/placeholder.svg?height=400&width=600",
    registrationsOpen: true,
    teamSize: "1 or 5-10 members",
    featured: false,
  },
  {
    id: "photography-contest",
    title: "Photography Contest",
    description: "Capture the essence of the fest in this photography competition.",
    date: "March 15-17, 2024",
    time: "All day",
    venue: "College Campus",
    category: "Arts",
    image: "/placeholder.svg?height=400&width=600",
    registrationsOpen: true,
    teamSize: "Individual",
    featured: false,
  },
]

export default function EventsPage() {
  const categories = [...new Set(events.map((event) => event.category))]

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground mt-2">Discover and register for exciting events at FestX 2024</p>
        </div>
        <div className="flex items-center w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search events..." className="w-full md:w-[200px] lg:w-[300px] pl-8" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="featured">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events
              .filter((event) => event.featured)
              .map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
          </div>
        </TabsContent>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events
                .filter((event) => event.category === category)
                .map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function EventCard({ event }) {
  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="relative h-48">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
        <div className="absolute top-2 right-2">
          <Badge variant={event.registrationsOpen ? "default" : "secondary"}>
            {event.registrationsOpen ? "Registrations Open" : "Registrations Closed"}
          </Badge>
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline">{event.category}</Badge>
          {event.featured && <Badge variant="secondary">Featured</Badge>}
        </div>
        <CardTitle className="text-xl mt-2">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{event.teamSize}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button className="w-full" asChild>
          <Link href={`/events/${event.id}`}>View Details</Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/register?event=${event.id}`}>Register</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

