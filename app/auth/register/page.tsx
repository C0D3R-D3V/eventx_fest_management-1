"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { registerUser } from "@/app/actions/auth"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      const result = await registerUser(formData)

      if (result.success) {
        toast({
          title: "Registration successful",
          description: "You can now log in with your credentials",
        })
        router.push("/auth/login")
      } else {
        toast({
          title: "Registration failed",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
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
    <div className="max-w-[600px] mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Register for FestX Events</h1>
      <p className="text-gray-600 mb-6">
        Fill in the details below to register for your favorite events.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            name="fullName"
            type="text"
            placeholder="Your full name"
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="youremail@example.com"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              name="phoneNumber"
              type="tel"
              placeholder="Your contact number"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Create a password"
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">College/University</label>
          <input
            name="college"
            type="text"
            placeholder="Your college or university name"
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none"
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}

