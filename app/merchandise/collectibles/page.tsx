"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star } from "lucide-react"

interface Collectible {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  limited: boolean
  edition: string
  rating: number
}

const collectibles: Collectible[] = [
  {
    id: "1",
    name: "FestX Trophy",
    description: "Limited edition commemorative trophy",
    price: 1999,
    image: "/images/trophy.jpg",
    category: "Limited Edition",
    limited: true,
    edition: "1/100",
    rating: 5
  },
  {
    id: "2",
    name: "Event Medal Set",
    description: "Set of 3 medals from main competitions",
    price: 899,
    image: "/images/medals.jpg",
    category: "Memorabilia",
    limited: false,
    edition: "Standard",
    rating: 4.5
  },
  {
    id: "3",
    name: "Signature Wall Frame",
    description: "Framed piece with celebrity signatures",
    price: 1499,
    image: "/images/frame.jpg",
    category: "Exclusive",
    limited: true,
    edition: "1/50",
    rating: 5
  },
  {
    id: "4",
    name: "Event Poster Collection",
    description: "Set of 5 artistic event posters",
    price: 699,
    image: "/images/posters.jpg",
    category: "Art",
    limited: false,
    edition: "Standard",
    rating: 4
  },
  {
    id: "5",
    name: "FestX Coin",
    description: "Commemorative metal coin with event logo",
    price: 299,
    image: "/images/coin.jpg",
    category: "Memorabilia",
    limited: true,
    edition: "1/200",
    rating: 4.5
  }
]

export default function CollectiblesPage() {
  const { toast } = useToast()

  const handleAddToCart = (collectible: Collectible) => {
    toast({
      title: "Added to cart!",
      description: `${collectible.name} has been added to your cart.`
    })
  }

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
        <h1 className="text-3xl font-bold mb-6">Collectibles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collectibles.map((collectible) => (
            <Card key={collectible.id} className="flex flex-col">
              <div className="relative h-64">
                <Image
                  src={collectible.image}
                  alt={collectible.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Badge>{collectible.category}</Badge>
                  {collectible.limited && (
                    <Badge variant="secondary">Limited Edition</Badge>
                  )}
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{collectible.name}</CardTitle>
                    <CardDescription>{collectible.description}</CardDescription>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {collectible.edition}
                  </div>
                </div>
                <p className="text-lg font-bold mt-2">₹{collectible.price}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1">
                  {renderRating(collectible.rating)}
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button 
                  className="w-full" 
                  onClick={() => handleAddToCart(collectible)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 