"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Wifi, Coffee, Car, Star, Phone } from "lucide-react"
import Image from "next/image"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Accommodation {
  id: string
  name: string
  description: string
  type: "Hotel" | "Hostel" | "Guest House"
  price: number
  distance: string
  rating: number
  amenities: string[]
  image: string
  contact: string
  address: string
  availability: "High" | "Medium" | "Low"
}

const accommodations: Accommodation[] = [
  {
    id: "1",
    name: "Grand Hotel",
    description: "Luxury hotel with modern amenities",
    type: "Hotel",
    price: 3500,
    distance: "1.5 km from venue",
    rating: 4.5,
    amenities: ["Free Wi-Fi", "Restaurant", "Parking", "Room Service"],
    image: "/images/hotel-1.jpg",
    contact: "+91 9876543210",
    address: "123, Hotel Road, City",
    availability: "Medium"
  },
  {
    id: "2",
    name: "Student Hostel",
    description: "Budget-friendly accommodation for students",
    type: "Hostel",
    price: 800,
    distance: "0.5 km from venue",
    rating: 4.0,
    amenities: ["Wi-Fi", "Common Room", "Laundry", "Security"],
    image: "/images/hostel-1.jpg",
    contact: "+91 9876543211",
    address: "45, College Road, City",
    availability: "High"
  },
  {
    id: "3",
    name: "Campus Guest House",
    description: "Comfortable stay within campus",
    type: "Guest House",
    price: 1500,
    distance: "On campus",
    rating: 4.2,
    amenities: ["Wi-Fi", "Breakfast", "Parking", "Garden"],
    image: "/images/guesthouse-1.jpg",
    contact: "+91 9876543212",
    address: "Campus Guest House, College",
    availability: "Low"
  }
]

const availabilityColors = {
  High: "bg-green-500 text-white",
  Medium: "bg-yellow-500 text-white",
  Low: "bg-red-500 text-white"
}

export default function AccommodationPage() {
  const [selectedType, setSelectedType] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("price")

  const filteredAccommodations = accommodations
    .filter(acc => selectedType === "all" || acc.type === selectedType)
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price
      if (sortBy === "distance") return a.distance.localeCompare(b.distance)
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })

  const renderRating = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <div className="container py-10">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Accommodation</h1>
            <p className="text-muted-foreground mt-2">
              Find comfortable stays near the FestX venue
            </p>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">
                    Accommodation Type
                  </label>
                  <Select
                    value={selectedType}
                    onValueChange={setSelectedType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Hotel">Hotels</SelectItem>
                      <SelectItem value="Hostel">Hostels</SelectItem>
                      <SelectItem value="Guest House">Guest Houses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">
                    Sort By
                  </label>
                  <Select
                    value={sortBy}
                    onValueChange={setSortBy}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accommodations List */}
          <div className="grid gap-6">
            {filteredAccommodations.map((acc) => (
              <Card key={acc.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="relative w-full md:w-72 h-48">
                    <Image
                      src={acc.image}
                      alt={acc.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{acc.name}</CardTitle>
                          <CardDescription>{acc.description}</CardDescription>
                        </div>
                        <Badge className={availabilityColors[acc.availability]}>
                          {acc.availability} Availability
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        {renderRating(acc.rating)}
                        <span className="text-sm text-muted-foreground ml-2">
                          {acc.rating} / 5
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          {acc.address} • {acc.distance}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          {acc.contact}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {acc.amenities.map((amenity, index) => (
                            <Badge key={index} variant="secondary">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold">₹{acc.price}</p>
                        <p className="text-sm text-muted-foreground">per night</p>
                      </div>
                      <Button>Book Now</Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <p className="font-medium">Need Assistance?</p>
                <p className="text-sm text-muted-foreground">
                  Our accommodation team is here to help you find the perfect stay
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