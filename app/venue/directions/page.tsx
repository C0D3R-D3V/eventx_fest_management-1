"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Car, Bus, Train, Plane } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface TransportMode {
  id: string
  name: string
  description: string
  routes: Route[]
  tips: string[]
  icon: any // This would be a Lucide icon component
}

interface Route {
  from: string
  instructions: string[]
  duration: string
  frequency: string
}

const transportModes: TransportMode[] = [
  {
    id: "car",
    name: "By Car",
    description: "Driving directions from major locations",
    icon: Car,
    routes: [
      {
        from: "City Center",
        instructions: [
          "Take Main Highway 101 towards North",
          "Exit at College Road Junction",
          "Turn right at the first signal",
          "Follow campus signs to main entrance"
        ],
        duration: "30-45 minutes",
        frequency: "N/A"
      },
      {
        from: "Airport",
        instructions: [
          "Take Airport Express Highway",
          "Follow signs to City Bypass",
          "Take exit 15 towards College Area",
          "Turn left at College Road"
        ],
        duration: "45-60 minutes",
        frequency: "N/A"
      }
    ],
    tips: [
      "Parking available at Block A and B",
      "Carpool parking available with special rates",
      "Follow digital signs for real-time parking availability"
    ]
  },
  {
    id: "bus",
    name: "By Bus",
    description: "Public bus routes to the venue",
    icon: Bus,
    routes: [
      {
        from: "Central Bus Station",
        instructions: [
          "Take Bus Route 201 or 202",
          "Get down at College Main Gate stop",
          "Walk 2 minutes to the entrance"
        ],
        duration: "40 minutes",
        frequency: "Every 15 minutes"
      }
    ],
    tips: [
      "Special event buses available during peak hours",
      "Buy bus passes in advance to save time",
      "Show your event ticket for discounted fare"
    ]
  },
  {
    id: "train",
    name: "By Train",
    description: "Train connections to nearby stations",
    icon: Train,
    routes: [
      {
        from: "Central Station",
        instructions: [
          "Take Metro Line 1 towards North",
          "Get down at College Station",
          "Use Exit B for shortest walk to venue"
        ],
        duration: "20 minutes",
        frequency: "Every 10 minutes"
      }
    ],
    tips: [
      "Metro cards available at all stations",
      "Follow the event signage from the station",
      "Special metro timings during event days"
    ]
  },
  {
    id: "plane",
    name: "By Air",
    description: "Directions from the airport",
    icon: Plane,
    routes: [
      {
        from: "International Airport",
        instructions: [
          "Take Airport Express train to City Center",
          "Transfer to Metro Line 1",
          "Follow directions for train route"
        ],
        duration: "1 hour 15 minutes",
        frequency: "Airport Express every 30 minutes"
      }
    ],
    tips: [
      "Pre-book airport transfers for groups",
      "Airport helpdesk available for event inquiries",
      "Shuttle services available with advance booking"
    ]
  }
]

export default function DirectionsPage() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">How to Reach</h1>
            <p className="text-muted-foreground mt-2">
              Find the best way to reach the FestX venue from your location
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <div>
                  <CardTitle>Venue Address</CardTitle>
                  <CardDescription>
                    FestX Campus, College Road, City - 123456
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 text-sm">
                <p>
                  The venue is easily accessible by various modes of transport.
                  Choose the most convenient option below.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            {transportModes.map((mode) => (
              <Card key={mode.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <mode.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>{mode.name}</CardTitle>
                      <CardDescription>{mode.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {mode.routes.map((route, index) => (
                      <AccordionItem key={index} value={`route-${index}`}>
                        <AccordionTrigger>
                          From {route.from}
                          <Badge variant="outline" className="ml-2">
                            {route.duration}
                          </Badge>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-2">
                            <div>
                              <p className="font-medium mb-2">Instructions:</p>
                              <ol className="list-decimal list-inside space-y-1">
                                {route.instructions.map((instruction, i) => (
                                  <li key={i}>{instruction}</li>
                                ))}
                              </ol>
                            </div>
                            {route.frequency !== "N/A" && (
                              <p className="text-sm text-muted-foreground">
                                Frequency: {route.frequency}
                              </p>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                    <AccordionItem value="tips">
                      <AccordionTrigger>Useful Tips</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc list-inside space-y-1">
                          {mode.tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <p className="font-medium">Need More Help?</p>
                <p className="text-sm text-muted-foreground">
                  Contact our support team for assistance with directions
                </p>
                <Button className="mt-4">Contact Support</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 