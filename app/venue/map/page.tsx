"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Venue {
  id: string
  name: string
  description: string
  location: string
  capacity: number
  timings: string
  type: "Main" | "Workshop" | "Food" | "Activity" | "Support"
  facilities: string[]
}

const venues: Venue[] = [
  {
    id: "1",
    name: "Main Stage",
    description: "Primary venue for major performances and events",
    location: "Central Ground",
    capacity: 5000,
    timings: "9:00 AM - 10:00 PM",
    type: "Main",
    facilities: ["Seating", "Sound System", "LED Screens", "Backstage Area"]
  },
  {
    id: "2",
    name: "Workshop Hall",
    description: "Dedicated space for technical workshops and seminars",
    location: "Block B, First Floor",
    capacity: 200,
    timings: "10:00 AM - 6:00 PM",
    type: "Workshop",
    facilities: ["Projector", "Workstations", "Wi-Fi", "Air Conditioning"]
  },
  {
    id: "3",
    name: "Food Court",
    description: "Central area for food stalls and refreshments",
    location: "Near Block C",
    capacity: 1000,
    timings: "8:00 AM - 11:00 PM",
    type: "Food",
    facilities: ["Seating Area", "Water Stations", "Waste Bins", "Hand Wash Area"]
  },
  {
    id: "4",
    name: "Gaming Zone",
    description: "Area for gaming competitions and casual play",
    location: "Block D, Ground Floor",
    capacity: 150,
    timings: "10:00 AM - 8:00 PM",
    type: "Activity",
    facilities: ["Gaming PCs", "Consoles", "Tournament Area", "Lounge"]
  },
  {
    id: "5",
    name: "Help Desk",
    description: "Information and support center",
    location: "Main Entrance",
    capacity: 50,
    timings: "8:00 AM - 8:00 PM",
    type: "Support",
    facilities: ["Information Counter", "Lost & Found", "First Aid", "Security"]
  }
]

const typeColors = {
  Main: "bg-primary text-primary-foreground",
  Workshop: "bg-blue-500 text-white",
  Food: "bg-green-500 text-white",
  Activity: "bg-purple-500 text-white",
  Support: "bg-orange-500 text-white"
}

export default function CampusMapPage() {
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null)

  return (
    <div className="container py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map Section */}
          <div className="lg:w-2/3">
            <h1 className="text-3xl font-bold mb-6">Campus Map</h1>
            <Card>
              <CardContent className="p-6">
                <div className="relative w-full h-[600px] bg-muted rounded-lg">
                  {/* Replace this with an actual map component */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground">Interactive Map Coming Soon</p>
                  </div>
                  {/* Add map markers for each venue */}
                  {venues.map((venue) => (
                    <TooltipProvider key={venue.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className={`absolute ${getVenuePosition(venue.id)} hover:scale-110 transition-transform`}
                            onClick={() => setSelectedVenue(venue.id)}
                          >
                            <MapPin className={`h-4 w-4 ${selectedVenue === venue.id ? "text-primary" : ""}`} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{venue.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Venue List */}
          <div className="lg:w-1/3 space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Venues</h2>
            {venues.map((venue) => (
              <Card
                key={venue.id}
                className={`cursor-pointer transition-colors ${
                  selectedVenue === venue.id ? "border-primary" : ""
                }`}
                onClick={() => setSelectedVenue(venue.id)}
              >
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{venue.name}</CardTitle>
                      <CardDescription>{venue.description}</CardDescription>
                    </div>
                    <Badge className={typeColors[venue.type]}>{venue.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      {venue.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      {venue.timings}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      Capacity: {venue.capacity}
                    </div>
                    <div className="flex items-start">
                      <Info className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
                      <div>
                        <p className="font-medium mb-1">Facilities:</p>
                        <ul className="list-disc list-inside pl-2">
                          {venue.facilities.map((facility, index) => (
                            <li key={index}>{facility}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function getVenuePosition(venueId: string): string {
  // These positions would be adjusted based on the actual map
  const positions = {
    "1": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "2": "top-1/4 left-1/4",
    "3": "bottom-1/4 right-1/4",
    "4": "top-1/4 right-1/4",
    "5": "bottom-1/4 left-1/4"
  }
  return positions[venueId as keyof typeof positions]
} 