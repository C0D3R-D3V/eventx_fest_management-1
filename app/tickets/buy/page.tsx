"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Calendar, Clock, Users, Tag, CreditCard } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TicketType {
  id: string
  name: string
  description: string
  price: number
  features: string[]
  maxQuantity: number
  available: boolean
  earlyBird?: boolean
}

const ticketTypes: TicketType[] = [
  {
    id: "1",
    name: "Early Bird Pass",
    description: "Full event access at a discounted rate",
    price: 999,
    features: [
      "Access to all events",
      "Welcome kit",
      "Food coupons worth ₹500",
      "Priority seating"
    ],
    maxQuantity: 2,
    available: true,
    earlyBird: true
  },
  {
    id: "2",
    name: "Regular Pass",
    description: "Standard event access",
    price: 1499,
    features: [
      "Access to all events",
      "Welcome kit",
      "Food coupons worth ₹300"
    ],
    maxQuantity: 5,
    available: true
  },
  {
    id: "3",
    name: "VIP Pass",
    description: "Premium access with exclusive benefits",
    price: 2999,
    features: [
      "Access to all events",
      "Premium welcome kit",
      "Food coupons worth ₹1000",
      "VIP lounge access",
      "Meet & Greet passes",
      "Exclusive merchandise"
    ],
    maxQuantity: 2,
    available: true
  },
  {
    id: "4",
    name: "Single Day Pass",
    description: "Access for one day of your choice",
    price: 699,
    features: [
      "Single day access",
      "Basic welcome kit",
      "Food coupons worth ₹200"
    ],
    maxQuantity: 5,
    available: true
  }
]

interface CartItem {
  ticketId: string
  quantity: number
  day?: string
}

export default function BuyTicketsPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedDay, setSelectedDay] = useState<string>("")
  const { toast } = useToast()

  const addToCart = (ticket: TicketType) => {
    if (ticket.id === "4" && !selectedDay) {
      toast({
        title: "Please select a day",
        description: "You need to select a day for Single Day Pass",
        variant: "destructive"
      })
      return
    }

    const existingItem = cart.find(item => item.ticketId === ticket.id)
    if (existingItem) {
      if (existingItem.quantity >= ticket.maxQuantity) {
        toast({
          title: "Maximum limit reached",
          description: `You can only purchase up to ${ticket.maxQuantity} tickets of this type`,
          variant: "destructive"
        })
        return
      }
      setCart(cart.map(item =>
        item.ticketId === ticket.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { 
        ticketId: ticket.id, 
        quantity: 1,
        day: ticket.id === "4" ? selectedDay : undefined
      }])
    }

    toast({
      title: "Added to cart",
      description: `${ticket.name} has been added to your cart`
    })
  }

  const removeFromCart = (ticketId: string) => {
    setCart(cart.filter(item => item.ticketId !== ticketId))
  }

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const ticket = ticketTypes.find(t => t.id === item.ticketId)
      return total + (ticket?.price || 0) * item.quantity
    }, 0)
  }

  const handleCheckout = () => {
    toast({
      title: "Processing payment",
      description: "Please wait while we process your payment"
    })
    // Add payment processing logic here
  }

  return (
    <div className="container py-10">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Buy Tickets</h1>
            <p className="text-muted-foreground mt-2">
              Select your tickets for FestX 2024
            </p>
          </div>

          {/* Ticket Types */}
          <div className="grid gap-6 md:grid-cols-2">
            {ticketTypes.map((ticket) => (
              <Card key={ticket.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{ticket.name}</CardTitle>
                      <CardDescription>{ticket.description}</CardDescription>
                    </div>
                    {ticket.earlyBird && (
                      <Badge className="bg-green-500 text-white">Early Bird</Badge>
                    )}
                  </div>
                  <p className="text-2xl font-bold mt-2">₹{ticket.price}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ul className="space-y-2">
                      {ticket.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Tag className="h-4 w-4 mr-2 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {ticket.id === "4" && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Select Day</label>
                        <Select
                          value={selectedDay}
                          onValueChange={setSelectedDay}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a day" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="day1">Day 1 - March 15</SelectItem>
                            <SelectItem value="day2">Day 2 - March 16</SelectItem>
                            <SelectItem value="day3">Day 3 - March 17</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => addToCart(ticket)}
                    disabled={!ticket.available}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Cart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item) => {
                    const ticket = ticketTypes.find(t => t.id === item.ticketId)
                    if (!ticket) return null
                    return (
                      <div key={item.ticketId} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{ticket.name}</p>
                          {item.day && (
                            <p className="text-sm text-muted-foreground">
                              Selected day: {item.day}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity} × ₹{ticket.price}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-bold">₹{ticket.price * item.quantity}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(item.ticketId)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <p className="font-bold">Total Amount</p>
                      <p className="text-2xl font-bold">₹{getTotal()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Image
                      src="/images/visa.png"
                      alt="Visa"
                      width={60}
                      height={40}
                      className="object-contain"
                    />
                    <Image
                      src="/images/mastercard.png"
                      alt="Mastercard"
                      width={60}
                      height={40}
                      className="object-contain"
                    />
                    <Image
                      src="/images/upi.png"
                      alt="UPI"
                      width={60}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <Button className="w-full" onClick={handleCheckout}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Proceed to Payment
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 