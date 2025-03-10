"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Phone } from "lucide-react"
import Image from "next/image"

interface FoodStall {
  id: string
  name: string
  description: string
  location: string
  timings: string
  contact: string
  specialties: string[]
  image: string
}

const foodStalls: FoodStall[] = [
  {
    id: "1",
    name: "Biryani Paradise",
    description: "Authentic Hyderabadi biryani and kebabs",
    location: "Block A, Near Main Stage",
    timings: "11:00 AM - 10:00 PM",
    contact: "+91 9876543210",
    specialties: ["Hyderabadi Biryani", "Chicken Kebabs", "Mutton Curry"],
    image: "/images/Food-Biryani.jpg"
  },
  {
    id: "2",
    name: "Street Food Corner",
    description: "Popular Indian street food delicacies",
    location: "Food Court, Zone 2",
    timings: "10:00 AM - 11:00 PM",
    contact: "+91 9876543211",
    specialties: ["Pav Bhaji", "Chole Bhature", "Samosa"],
    image: "/images/Food-pav-bhaji.jpg"
  },
  {
    id: "3",
    name: "Asian Delights",
    description: "Pan-Asian cuisine including momos and noodles",
    location: "Block C, Near Workshop Area",
    timings: "12:00 PM - 9:00 PM",
    contact: "+91 9876543212",
    specialties: ["Momos", "Noodles", "Spring Rolls"],
    image: "/images/Food-momos.jpeg"
  },
  {
    id: "4",
    name: "Sweet Tooth",
    description: "Traditional Indian sweets and desserts",
    location: "Block B, Central Area",
    timings: "10:00 AM - 10:00 PM",
    contact: "+91 9876543213",
    specialties: ["Gulab Jamun", "Rasmalai", "Ice Cream"],
    image: "/images/Food-Dessert.jpg"
  },
  {
    id: "5",
    name: "Beverage Station",
    description: "Refreshing drinks and beverages",
    location: "Multiple Locations",
    timings: "9:00 AM - 11:00 PM",
    contact: "+91 9876543214",
    specialties: ["Cold Coffee", "Fresh Juices", "Milkshakes"],
    image: "/images/Food-Beverages.jpg"
  }
]

export default function FoodStallsPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Food Stalls</h1>
        <div className="space-y-6">
          {foodStalls.map((stall) => (
            <Card key={stall.id}>
              <div className="md:flex">
                <div className="relative w-full md:w-48 h-48">
                  <Image
                    src={stall.image}
                    alt={stall.name}
                    fill
                    className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  />
                </div>
                <div className="flex-1">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{stall.name}</CardTitle>
                        <CardDescription>{stall.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        {stall.location}
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        {stall.timings}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        {stall.contact}
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {stall.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 