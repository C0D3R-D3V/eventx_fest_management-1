"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

interface Accessory {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  inStock: boolean
}

const accessories: Accessory[] = [
  {
    id: "1",
    name: "FestX Backpack",
    description: "Stylish and spacious backpack with FestX branding",
    price: 999,
    image: "/images/backpack.jpg",
    category: "Bags",
    inStock: true
  },
  {
    id: "2",
    name: "Event Lanyard",
    description: "Official event lanyard with ID holder",
    price: 149,
    image: "/images/lanyard.jpg",
    category: "Essentials",
    inStock: true
  },
  {
    id: "3",
    name: "Tech Sticker Pack",
    description: "Set of 10 cool tech-themed stickers",
    price: 199,
    image: "/images/stickers.jpg",
    category: "Stickers",
    inStock: true
  },
  {
    id: "4",
    name: "FestX Cap",
    description: "Adjustable cap with embroidered logo",
    price: 399,
    image: "/images/cap.jpg",
    category: "Headwear",
    inStock: false
  },
  {
    id: "5",
    name: "Event Wristband",
    description: "Silicone wristband with glow-in-dark feature",
    price: 99,
    image: "/images/wristband.jpg",
    category: "Accessories",
    inStock: true
  },
  {
    id: "6",
    name: "FestX Water Bottle",
    description: "Stainless steel bottle with event branding",
    price: 599,
    image: "/images/bottle.jpg",
    category: "Essentials",
    inStock: true
  }
]

export default function AccessoriesPage() {
  const { toast } = useToast()

  const handleAddToCart = (accessory: Accessory) => {
    if (!accessory.inStock) {
      toast({
        title: "Out of Stock",
        description: "This item is currently unavailable.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Added to cart!",
      description: `${accessory.name} has been added to your cart.`
    })
  }

  return (
    <div className="container py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Accessories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accessories.map((accessory) => (
            <Card key={accessory.id} className="flex flex-col">
              <div className="relative h-64">
                <Image
                  src={accessory.image}
                  alt={accessory.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Badge>{accessory.category}</Badge>
                  {!accessory.inStock && (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </div>
              </div>
              <CardHeader>
                <CardTitle>{accessory.name}</CardTitle>
                <CardDescription>{accessory.description}</CardDescription>
                <p className="text-lg font-bold mt-2">₹{accessory.price}</p>
              </CardHeader>
              <CardContent>
                {/* Additional content can be added here */}
              </CardContent>
              <CardFooter className="mt-auto">
                <Button 
                  className="w-full" 
                  onClick={() => handleAddToCart(accessory)}
                  disabled={!accessory.inStock}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {accessory.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 