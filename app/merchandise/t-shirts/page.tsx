"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

interface TShirt {
  id: string
  name: string
  description: string
  price: number
  sizes: string[]
  colors: string[]
  image: string
  category: string
}

const tshirts: TShirt[] = [
  {
    id: "1",
    name: "FestX Logo Tee",
    description: "Classic FestX logo t-shirt in premium cotton",
    price: 499,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Navy"],
    image: "/images/tshirt-1.jpg",
    category: "Classic"
  },
  {
    id: "2",
    name: "Event Special Edition",
    description: "Limited edition t-shirt for FestX 2024",
    price: 699,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Blue", "Grey"],
    image: "/images/tshirt-2.jpg",
    category: "Limited Edition"
  },
  {
    id: "3",
    name: "Tech Fest Geek",
    description: "Cool tech-themed design for the geeks",
    price: 599,
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "Grey"],
    image: "/images/tshirt-3.jpg",
    category: "Themed"
  },
  {
    id: "4",
    name: "Cultural Night Special",
    description: "Commemorative t-shirt for the cultural night",
    price: 649,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Purple", "Black"],
    image: "/images/tshirt-4.jpg",
    category: "Event Special"
  }
]

export default function TShirtsPage() {
  const { toast } = useToast()
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({})
  const [selectedColors, setSelectedColors] = useState<{ [key: string]: string }>({})

  const handleAddToCart = (tshirt: TShirt) => {
    const size = selectedSizes[tshirt.id]
    const color = selectedColors[tshirt.id]

    if (!size || !color) {
      toast({
        title: "Please select options",
        description: "You must select both size and color before adding to cart.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Added to cart!",
      description: `${tshirt.name} (${size}, ${color}) has been added to your cart.`
    })
  }

  return (
    <div className="container py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">T-Shirts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tshirts.map((tshirt) => (
            <Card key={tshirt.id} className="flex flex-col">
              <div className="relative h-64">
                <Image
                  src={tshirt.image}
                  alt={tshirt.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 right-2">{tshirt.category}</Badge>
              </div>
              <CardHeader>
                <CardTitle>{tshirt.name}</CardTitle>
                <CardDescription>{tshirt.description}</CardDescription>
                <p className="text-lg font-bold mt-2">₹{tshirt.price}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Size</label>
                  <Select
                    value={selectedSizes[tshirt.id]}
                    onValueChange={(value) => 
                      setSelectedSizes(prev => ({ ...prev, [tshirt.id]: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {tshirt.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Color</label>
                  <Select
                    value={selectedColors[tshirt.id]}
                    onValueChange={(value) => 
                      setSelectedColors(prev => ({ ...prev, [tshirt.id]: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {tshirt.colors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className="w-full" onClick={() => handleAddToCart(tshirt)}>
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