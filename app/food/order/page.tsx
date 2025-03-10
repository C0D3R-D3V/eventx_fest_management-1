"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus } from "lucide-react"

interface FoodItem {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
}

const foodItems: FoodItem[] = [
  {
    id: "1",
    name: "Biryani",
    price: 180,
    image: "/images/Food-Biryani.jpg",
    description: "Fragrant rice dish with aromatic spices and tender meat",
    category: "Main Course"
  },
  {
    id: "2",
    name: "Pav Bhaji",
    price: 120,
    image: "/images/Food-pav-bhaji.jpg",
    description: "Spiced vegetable mash served with buttered bread",
    category: "Street Food"
  },
  {
    id: "3",
    name: "Momos",
    price: 100,
    image: "/images/Food-momos.jpeg",
    description: "Steamed dumplings filled with vegetables or meat",
    category: "Snacks"
  },
  {
    id: "4",
    name: "Chole Bhature",
    price: 150,
    image: "/images/Food-Chole-Bhature.jpg",
    description: "Spiced chickpeas served with fried bread",
    category: "Main Course"
  },
  {
    id: "5",
    name: "Pasta",
    price: 160,
    image: "/images/Food-pasta.jpg",
    description: "Italian pasta with creamy sauce and vegetables",
    category: "Main Course"
  },
  {
    id: "6",
    name: "Samosa",
    price: 30,
    image: "/images/Food-samosa.webp",
    description: "Crispy pastry filled with spiced potatoes",
    category: "Snacks"
  },
  {
    id: "7",
    name: "Dessert",
    price: 120,
    image: "/images/Food-Dessert.jpg",
    description: "Assorted Indian sweets and desserts",
    category: "Desserts"
  },
  {
    id: "8",
    name: "Beverages",
    price: 60,
    image: "/images/Food-Beverages.jpg",
    description: "Soft drinks, juices, and hot beverages",
    category: "Drinks"
  }
]

interface CartItem extends FoodItem {
  quantity: number
}

export default function OrderPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const { toast } = useToast()

  const addToCart = (item: FoodItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === itemId)
      if (existingItem?.quantity === 1) {
        return prevCart.filter(item => item.id !== itemId)
      }
      return prevCart.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    })
  }

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handleCheckout = () => {
    toast({
      title: "Order placed successfully!",
      description: "Your food will be ready for pickup soon.",
    })
    setCart([])
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Food Items Grid */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Order Food</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{item.name}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                    <Badge>{item.category}</Badge>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <p className="text-lg font-bold">₹{item.price}</p>
                  <Button onClick={() => addToCart(item)}>
                    <Plus className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="md:w-80">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Your Cart
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-muted-foreground text-center py-6">
                  Your cart is empty
                </p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">₹{item.price} × {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>₹{getTotalAmount()}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={cart.length === 0}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
} 