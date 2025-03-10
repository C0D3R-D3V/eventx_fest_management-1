"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import Link from "next/link"

interface PricingTier {
  id: string
  name: string
  price: number
  description: string
  features: {
    included: string[]
    excluded: string[]
  }
  recommended?: boolean
  earlyBird?: {
    available: boolean
    discount: number
    endsIn: string
  }
}

const pricingTiers: PricingTier[] = [
  {
    id: "basic",
    name: "Single Day Pass",
    price: 699,
    description: "Perfect for those who want to experience a specific day",
    features: {
      included: [
        "Access to all events for one day",
        "Basic welcome kit",
        "Food coupons worth ₹200",
        "Access to common areas",
        "Event schedule"
      ],
      excluded: [
        "Multi-day access",
        "VIP lounge access",
        "Meet & Greet passes",
        "Premium merchandise",
        "Priority seating"
      ]
    }
  },
  {
    id: "regular",
    name: "Regular Pass",
    price: 1499,
    description: "Most popular choice for full event access",
    features: {
      included: [
        "Access to all events for all days",
        "Standard welcome kit",
        "Food coupons worth ₹300",
        "Access to common areas",
        "Event schedule",
        "Workshop access"
      ],
      excluded: [
        "VIP lounge access",
        "Meet & Greet passes",
        "Premium merchandise",
        "Priority seating"
      ]
    },
    recommended: true,
    earlyBird: {
      available: true,
      discount: 33,
      endsIn: "3 days"
    }
  },
  {
    id: "vip",
    name: "VIP Pass",
    price: 2999,
    description: "Premium experience with exclusive benefits",
    features: {
      included: [
        "Access to all events for all days",
        "Premium welcome kit",
        "Food coupons worth ₹1000",
        "Access to common areas",
        "Event schedule",
        "Workshop access",
        "VIP lounge access",
        "Meet & Greet passes",
        "Exclusive merchandise",
        "Priority seating",
        "Dedicated support"
      ],
      excluded: []
    }
  }
]

export default function PricingPage() {
  return (
    <div className="container py-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-4xl font-bold">Ticket Pricing</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect ticket that suits your needs. All tickets include basic amenities and access to common areas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.id}
              className={`relative ${tier.recommended ? "border-primary shadow-lg" : ""}`}
            >
              {tier.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Recommended
                  </Badge>
                </div>
              )}
              <CardHeader>
                <div className="space-y-2">
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">₹{tier.price}</span>
                    {tier.earlyBird?.available && (
                      <div className="ml-4">
                        <Badge variant="secondary" className="text-green-600">
                          {tier.earlyBird.discount}% off
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Early bird ends in {tier.earlyBird.endsIn}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {tier.features.included.length > 0 && (
                  <div>
                    <p className="font-medium mb-2">What's Included:</p>
                    <ul className="space-y-2">
                      {tier.features.included.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {tier.features.excluded.length > 0 && (
                  <div>
                    <p className="font-medium mb-2">Not Included:</p>
                    <ul className="space-y-2">
                      {tier.features.excluded.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <X className="h-4 w-4 mr-2 text-red-500 mt-1" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/tickets/buy">
                    Buy {tier.name}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card>
            <CardContent className="py-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Need help choosing?</h3>
                <p className="text-muted-foreground">
                  Contact our support team for assistance in selecting the right ticket for you
                </p>
                <Button variant="outline">Contact Support</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 