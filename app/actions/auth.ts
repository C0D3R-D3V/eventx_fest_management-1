"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// This is a simple in-memory storage for demonstration purposes
// In a real application, you would use a database
type User = {
  id: string
  fullName: string
  email: string
  password: string
  phoneNumber: string
  college: string
  event?: string
  createdAt: Date
  isAdmin?: boolean
}

// In-memory storage (this will reset when the server restarts)
// In a real app, use a database like MongoDB, PostgreSQL, etc.
const users: User[] = [
  {
    id: "admin-default",
    fullName: "Admin User",
    email: "earthbhangdia@gmail.com",
    password: "Earth@1234",
    phoneNumber: "",
    college: "",
    isAdmin: true,
    createdAt: new Date(),
  },
]

export async function registerUser(formData: FormData) {
  const fullName = formData.get("fullName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const phoneNumber = formData.get("phoneNumber") as string
  const college = formData.get("college") as string

  // Validate inputs
  if (!fullName || !email || !password || !phoneNumber || !college) {
    return { success: false, error: "All fields are required" }
  }

  // Check if user already exists
  const existingUser = users.find((user) => user.email === email)
  if (existingUser) {
    return { success: false, error: "User with this email already exists" }
  }

  // In a real app, you would hash the password before storing it
  // For example: const hashedPassword = await bcrypt.hash(password, 10)

  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    fullName,
    email,
    // In a real app, store the hashed password instead
    password,
    phoneNumber,
    college,
    createdAt: new Date(),
  }

  // Store the user
  users.push(newUser)

  return { success: true }
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  console.log("Login attempt:", { email, password }) // Add logging
  console.log(
    "Available users:",
    users.map((u) => ({ email: u.email, password: u.password })),
  ) // Debug users

  // Validate inputs
  if (!email || !password) {
    return { success: false, error: "Email and password are required" }
  }

  // Find the user
  const user = users.find((user) => user.email === email)
  console.log("Found user:", user) // Debug found user

  // Check if user exists
  if (!user) {
    return { success: false, error: "Not registered. Please register first." }
  }

  // Check if password matches
  if (user.password !== password) {
    return { success: false, error: "Invalid password. Please try again." }
  }

  // Set a session cookie
  const session = {
    userId: user.id,
    email: user.email,
    fullName: user.fullName,
    isAdmin: user.isAdmin || false,
  }

  cookies().set("session", JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return { success: true }
}

export async function logoutUser() {
  cookies().delete("session")
  redirect("/login")
}

export async function getSession() {
  const session = cookies().get("session")?.value
  if (!session) return null

  try {
    return JSON.parse(session)
  } catch {
    return null
  }
}

export async function getAllUsers() {
  // This would typically be protected by an admin middleware
  return users
}

export async function adminLogin(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Validate inputs
  if (!email || !password) {
    return { success: false, error: "Email and password are required" }
  }

  // Check if it's the default admin
  if (email === "earthbhangdia@gmail.com" && password === "Earth@1234") {
    // Create admin user if it doesn't exist
    let adminUser = users.find((user) => user.email === email)

    if (!adminUser) {
      adminUser = {
        id: "admin-" + Date.now().toString(),
        fullName: "Admin User",
        email: "earthbhangdia@gmail.com",
        password: "Earth@1234",
        phoneNumber: "",
        college: "",
        isAdmin: true,
        createdAt: new Date(),
      }
      users.push(adminUser)
    }

    // Set admin session
    const session = {
      userId: adminUser.id,
      email: adminUser.email,
      fullName: adminUser.fullName || "Admin",
      isAdmin: true,
    }

    cookies().set("session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return { success: true }
  }

  // Check for other admin users
  const adminUser = users.find((user) => user.email === email && user.isAdmin)
  if (adminUser && adminUser.password === password) {
    const session = {
      userId: adminUser.id,
      email: adminUser.email,
      fullName: adminUser.fullName,
      isAdmin: true,
    }

    cookies().set("session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return { success: true }
  }

  return { success: false, error: "Invalid details. Access denied." }
}

export async function createAdmin(formData: FormData) {
  const session = await getSession()

  // Check if the current user is an admin
  if (!session || !session.isAdmin) {
    return { success: false, error: "Unauthorized" }
  }

  const fullName = formData.get("fullName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Validate inputs
  if (!fullName || !email || !password) {
    return { success: false, error: "All fields are required" }
  }

  // Check if user already exists
  const existingUser = users.find((user) => user.email === email)
  if (existingUser) {
    return { success: false, error: "User with this email already exists" }
  }

  // Create new admin user
  const newAdmin: User = {
    id: "admin-" + Date.now().toString(),
    fullName,
    email,
    password,
    phoneNumber: "",
    college: "",
    isAdmin: true,
    createdAt: new Date(),
  }

  // Store the admin
  users.push(newAdmin)

  return { success: true }
}

