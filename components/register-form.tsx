"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { registerUser } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function RegisterForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)

    // Debug registration data
    console.log("Registering user with data:", {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      password: formData.get("password"),
      phoneNumber: formData.get("phoneNumber"),
      college: formData.get("college"),
    })

    try {
      const result = await registerUser(formData)

      if (result.success) {
        toast({
          title: "Registration successful",
          description: "You can now log in with your credentials",
        })
        router.push("/login")
      } else {
        toast({
          title: "Registration failed",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Registration error:", error) // Debug unexpected errors
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" name="fullName" placeholder="Your full name" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="youremail@example.com" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" placeholder="Create a password" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input id="phoneNumber" name="phoneNumber" placeholder="Your contact number" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="college">College/University</Label>
        <Input id="college" name="college" placeholder="Your college or university name" required />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </Button>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-primary underline">
          Login
        </Link>
      </div>
    </form>
  )
}

