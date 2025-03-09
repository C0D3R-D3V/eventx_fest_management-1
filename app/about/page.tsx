import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Trophy, MapPin, Heart, Sparkles } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">About FestX</h1>
        <p className="text-muted-foreground text-lg">The story behind the ultimate college fest platform</p>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            FestX was created with a simple mission: to make college festivals more accessible, organized, and enjoyable for everyone involved.
          </p>
          <p className="text-lg mb-6">
            We believe that college fests are more than just events - they're experiences that shape student life and create lasting memories. Our platform brings together event management, ticketing, and participation in one seamless experience.
          </p>
          <Button asChild>
            <Link href="/register">Join FestX Today</Link>
          </Button>
        </div>
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
          <Image 
            src="/placeholder.svg?height=800&width=1200" 
            alt="College students at a festival" 
            fill 
            className="object-cover"
          />
        </div>
      </div>

      {/* Our Story */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-4">
            FestX began in 2020 when a group of college students experienced firsthand the challenges of organizing and participating in college festivals. From complicated registration processes to missed events due to poor communication, we knew there had to be a better way.
          </p>
          <p className="text-lg mb-4">
            What started as a simple event registration tool has evolved into a comprehensive platform that serves thousands of students across hundreds of colleges. Our team has grown from a small group of passionate students to a diverse team of developers, designers, and event management experts.
          </p>
          <p className="text-lg">
            Today, FestX is the go-to platform for college festivals nationwide, helping organizers create unforgettable experiences and enabling students to make the most of their college fest journey.
          </p>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-16 bg-muted py-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Student-First</h3>
                <p>We design every feature with students in mind, ensuring the platform is accessible, intuitive, and valuable.</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p>We continuously improve our platform, incorporating new technologies and features to enhance the fest experience.</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p>We believe in the power of college communities and strive to foster connections through our platform.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-10 text-center">What Makes FestX Special</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="bg-primary/10 p-3 h-fit rounded-full">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Comprehensive Event Management</h3>
              <p>From registration to attendance tracking, FestX provides all the tools organizers need to run successful events.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-primary/10 p-3 h-fit rounded-full">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Interactive Competitions</h3>
              <p>Our platform supports various competition formats, including quizzes, submissions, and live voting.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-primary/10 p-3 h-fit rounded-full">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Location Services</h3>
              <p>Never get lost at a fest again with our interactive maps and location-based notifications.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-primary/10 p-3 h-fit rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Community Building</h3>
              <p>Connect with fellow participants, form teams, and build lasting relationships through our platform.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Rahul Sharma", role: "Founder & CEO", image: "/placeholder.svg?height=300&width=300" },
            { name: "Priya Patel", role: "CTO", image: "/placeholder.svg?height=300&width=300" },
            { name: "Arjun Singh", role: "Head of Design", image: "/placeholder.svg?height=300&width=300" },
            { name: "Neha Gupta", role: "Marketing Director", image: "/placeholder.svg?height=300&width=300" }
          ].map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative h-40 w-40 rounded-full overflow-hidden mb-4">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Experience FestX?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Join thousands of students and organizers who are already using FestX to create and participate in amazing college festivals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Sign Up Now</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
