import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="container max-w-md mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Login to FestX Events</h1>
      <p className="text-gray-500 mb-6">Enter your credentials to access your account.</p>
      <LoginForm />
    </div>
  )
}

