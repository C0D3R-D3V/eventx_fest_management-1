// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Calendar, Users, Trophy, Bell } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import Image from "next/image"

// export default function Home() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Hero Section */}
//       <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white overflow-hidden">
//         <div className="container px-4 md:px-6 relative z-10">
//           <div className="flex flex-col items-center gap-4 text-center">
//             <Badge className="py-1.5 text-sm bg-primary hover:bg-primary" variant="default">
//               FestX 2024 • March 15-17
//             </Badge>
//             <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
//               The Ultimate College Fest Experience
//             </h1>
//             <p className="max-w-[700px] text-muted-foreground text-zinc-400 md:text-xl">
//               Discover, register, and participate in the most exciting college fest events all in one place.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 mt-8">
//               <Button size="lg" asChild>
//                 <Link href="/events">Explore Events</Link>
//               </Button>
//               <Button size="lg" variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800" asChild>
//                 <Link href="/register">Register Now</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//         {/* Animated background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-black z-0">
//           <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-10 bg-center bg-cover"></div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-center gap-4 text-center mb-12">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//               Everything You Need in One Platform
//             </h2>
//             <p className="max-w-[700px] text-muted-foreground md:text-xl">
//               FestX simplifies college fest management with powerful features designed for participants and organizers.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             <FeatureCard
//               icon={<Calendar className="h-10 w-10 text-primary" />}
//               title="Event Listings"
//               description="Browse through all events with detailed information, schedules, and venues."
//             />
//             <FeatureCard
//               icon={<Users className="h-10 w-10 text-primary" />}
//               title="Easy Registration"
//               description="Simple and quick registration process for individuals and teams."
//             />
//             <FeatureCard
//               icon={<Trophy className="h-10 w-10 text-primary" />}
//               title="Interactive Quizzes"
//               description="Participate in exciting quizzes and challenges to earn points."
//             />
//             <FeatureCard
//               icon={<Bell className="h-10 w-10 text-primary" />}
//               title="Real-time Updates"
//               description="Get instant notifications about event changes and announcements."
//             />
//           </div>
//         </div>
//       </section>

//       {/* Upcoming Events Preview */}
//       <section className="w-full py-12 md:py-24 bg-muted">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
//             <h2 className="text-3xl font-bold tracking-tighter">Upcoming Events</h2>
//             <Button variant="outline" asChild>
//               <Link href="/events">View All Events</Link>
//             </Button>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <EventCard
//               title="Hackathon 2024"
//               date="March 15, 2024"
//               category="Technology"
//               image="/placeholder.svg?height=400&width=600"
//               registrationsOpen={true}
//             />
//             <EventCard
//               title="Battle of Bands"
//               date="March 16, 2024"
//               category="Music"
//               image="/placeholder.svg?height=400&width=600"
//               registrationsOpen={true}
//             />
//             <EventCard
//               title="Debating Championship"
//               date="March 17, 2024"
//               category="Literary"
//               image="/placeholder.svg?height=400&width=600"
//               registrationsOpen={true}
//             />
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
//         <div className="container px-4 md:px-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//             <div className="flex flex-col gap-4">
//               <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//                 Ready to Be Part of the Biggest College Fest?
//               </h2>
//               <p className="text-primary-foreground/80 md:text-xl">
//                 Join thousands of students from across the country for three days of learning, competing, and
//                 networking.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 mt-4">
//                 <Button size="lg" variant="secondary" asChild>
//                   <Link href="/register">Register Now</Link>
//                 </Button>
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
//                   asChild
//                 >
//                   <Link href="/events">Learn More</Link>
//                 </Button>
//               </div>
//             </div>
//             <div className="relative h-[300px] lg:h-[500px] rounded-xl overflow-hidden">
//               <Image src="/placeholder.svg?height=600&width=800" alt="College Fest" fill className="object-cover" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="w-full py-12 md:py-24 bg-background">
//         <div className="container px-4 md:px-6">
//           <h2 className="text-3xl font-bold tracking-tighter text-center mb-10">What Participants Say</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <TestimonialCard
//               quote="The fest was perfectly organized. The registration was seamless, and the quiz platform was top-notch!"
//               author="Rahul Sharma"
//               role="Engineering Student"
//             />
//             <TestimonialCard
//               quote="Real-time updates kept me informed about all events. The dashboard was incredibly useful to track my registrations."
//               author="Priya Patel"
//               role="Arts Student"
//             />
//             <TestimonialCard
//               quote="The variety of events was amazing. The platform made it so easy to discover and register for multiple competitions."
//               author="Arjun Singh"
//               role="Business Student"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="w-full py-6 bg-background border-t">
//         <div className="container px-4 md:px-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div className="flex flex-col gap-2">
//               <h3 className="text-lg font-semibold">FestX</h3>
//               <p className="text-sm text-muted-foreground">The ultimate college fest management platform.</p>
//             </div>
//             <div className="flex flex-col gap-2">
//               <h3 className="text-lg font-semibold">Quick Links</h3>
//               <Link href="/events" className="text-sm text-muted-foreground hover:text-primary">
//                 Events
//               </Link>
//               <Link href="/register" className="text-sm text-muted-foreground hover:text-primary">
//                 Register
//               </Link>
//               <Link href="/quizzes" className="text-sm text-muted-foreground hover:text-primary">
//                 Quizzes
//               </Link>
//             </div>
//             <div className="flex flex-col gap-2">
//               <h3 className="text-lg font-semibold">Resources</h3>
//               <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
//                 FAQ
//               </Link>
//               <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
//                 Contact Us
//               </Link>
//               <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
//                 About
//               </Link>
//             </div>
//             <div className="flex flex-col gap-2">
//               <h3 className="text-lg font-semibold">Connect</h3>
//               <p className="text-sm text-muted-foreground">Stay updated with the latest announcements.</p>
//               <div className="flex gap-4 mt-2">
//                 <Link href="#" className="text-muted-foreground hover:text-primary">
//                   Twitter
//                 </Link>
//                 <Link href="#" className="text-muted-foreground hover:text-primary">
//                   Instagram
//                 </Link>
//                 <Link href="#" className="text-muted-foreground hover:text-primary">
//                   Facebook
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
//             © {new Date().getFullYear()} FestX. All rights reserved.
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

// function FeatureCard({ icon, title, description }) {
//   return (
//     <div className="flex flex-col items-center text-center bg-card p-6 rounded-lg border shadow-sm">
//       <div className="mb-4">{icon}</div>
//       <h3 className="text-xl font-bold mb-2">{title}</h3>
//       <p className="text-muted-foreground">{description}</p>
//     </div>
//   )
// }

// function EventCard({ title, date, category, image, registrationsOpen }) {
//   return (
//     <div className="flex flex-col bg-card rounded-lg overflow-hidden border shadow-sm">
//       <div className="relative h-48">
//         <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
//         <div className="absolute top-2 right-2">
//           <Badge variant={registrationsOpen ? "default" : "secondary"}>{registrationsOpen ? "Open" : "Closed"}</Badge>
//         </div>
//       </div>
//       <div className="p-4 flex flex-col gap-2">
//         <div className="text-sm text-muted-foreground">{date}</div>
//         <h3 className="text-xl font-bold">{title}</h3>
//         <div className="flex items-center gap-2">
//           <Badge variant="outline">{category}</Badge>
//         </div>
//         <div className="mt-2">
//           <Button variant="outline" className="w-full" asChild>
//             <Link href={`/events/${title.toLowerCase().replace(/\s+/g, "-")}`}>View Details</Link>
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// function TestimonialCard({ quote, author, role }) {
//   return (
//     <div className="flex flex-col p-6 bg-card rounded-lg border shadow-sm">
//       <div className="text-lg italic mb-4">"{quote}"</div>
//       <div className="mt-auto">
//         <div className="font-semibold">{author}</div>
//         <div className="text-sm text-muted-foreground">{role}</div>
//       </div>
//     </div>
//   )
// }



import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Trophy, Bell, CheckCircle } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <Badge className="py-1.5 text-sm bg-primary hover:bg-primary" variant="default">
              FestX 2024 • March 15-17
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              The Ultimate College Fest Experience
            </h1>
            <p className="max-w-[700px] text-muted-foreground text-zinc-400 md:text-xl">
              Discover, register, and participate in the most exciting college fest events all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button size="lg" asChild>
                <Link href="/events">Explore Events</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800" asChild>
                <Link href="/register">Register Now</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-black z-0">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-10 bg-center bg-cover"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You Need in One Platform
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              FestX simplifies college fest management with powerful features designed for participants and organizers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-primary" />}
              title="Event Listings"
              description="Browse through all events with detailed information, schedules, and venues."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="Easy Registration"
              description="Simple and quick registration process for individuals and teams."
            />
            <FeatureCard
              icon={<Trophy className="h-10 w-10 text-primary" />}
              title="Interactive Quizzes"
              description="Participate in exciting quizzes and challenges to earn points."
            />
            <FeatureCard
              icon={<Bell className="h-10 w-10 text-primary" />}
              title="Real-time Updates"
              description="Get instant notifications about event changes and announcements."
            />
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold tracking-tighter">Upcoming Events</h2>
            <Button variant="outline" asChild>
              <Link href="/events">View All Events</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EventCard
              title="Hackathon 2024"
              date="March 15, 2024"
              category="Technology"
              image="/placeholder.svg?height=400&width=600"
              registrationsOpen={true}
            />
            <EventCard
              title="Battle of Bands"
              date="March 16, 2024"
              category="Music"
              image="/placeholder.svg?height=400&width=600"
              registrationsOpen={true}
            />
            <EventCard
              title="Debating Championship"
              date="March 17, 2024"
              category="Literary"
              image="/placeholder.svg?height=400&width=600"
              registrationsOpen={true}
            />
          </div>
        </div>
      </section>

      {/* Ticket Information Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ticket Information
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Choose the perfect ticket option for your FestX experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Day Pass */}
            <div className="flex flex-col p-6 bg-card rounded-lg border shadow-sm">
              <div className="text-xl font-bold mb-2">Day Pass</div>
              <div className="text-3xl font-bold mb-4">₹499</div>
              <ul className="mb-6 space-y-2 flex-grow">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Access to all events for one day</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Free refreshments</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Button className="w-full mb-4" size="lg">Buy Now</Button>
                <div className="text-sm text-muted-foreground">
                  Pay with:
                  <div className="flex justify-center gap-4 mt-2">
                    <span className="text-2xl" title="Credit Card">💳</span>
                    <span className="text-2xl" title="Bank Transfer">🏦</span>
                    <span className="text-2xl" title="Mobile Payment">📱</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Festival Pass */}
            <div className="flex flex-col p-6 bg-card rounded-lg border-2 border-primary shadow-lg relative">
              <div className="absolute -top-3 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                Best Value
              </div>
              <div className="text-xl font-bold mb-2">Full Festival Pass</div>
              <div className="text-3xl font-bold mb-4">₹1299</div>
              <ul className="mb-6 space-y-2 flex-grow">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Access to all events for all 3 days</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>VIP seating for concert</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Free merchandise</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Free refreshments</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Button className="w-full mb-4" size="lg">Buy Now</Button>
                <div className="text-sm text-muted-foreground">
                  Pay with:
                  <div className="flex justify-center gap-4 mt-2">
                    <span className="text-2xl" title="Credit Card">💳</span>
                    <span className="text-2xl" title="Bank Transfer">🏦</span>
                    <span className="text-2xl" title="Mobile Payment">📱</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Concert Only */}
            <div className="flex flex-col p-6 bg-card rounded-lg border shadow-sm">
              <div className="text-xl font-bold mb-2">Concert Only</div>
              <div className="text-3xl font-bold mb-4">₹799</div>
              <ul className="mb-6 space-y-2 flex-grow">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Access to concert night only</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Free refreshments</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Button className="w-full mb-4" size="lg">Buy Now</Button>
                <div className="text-sm text-muted-foreground">
                  Pay with:
                  <div className="flex justify-center gap-4 mt-2">
                    <span className="text-2xl" title="Credit Card">💳</span>
                    <span className="text-2xl" title="Bank Transfer">🏦</span>
                    <span className="text-2xl" title="Mobile Payment">📱</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 p-4 bg-muted rounded-lg text-center">
            <p className="text-lg font-semibold">Early Bird Offer! 🎉</p>
            <p>Register before March 1st and get 15% off on all ticket types. Use code <span className="font-bold">EARLY15</span></p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Be Part of the Biggest College Fest?
              </h2>
              <p className="text-primary-foreground/80 md:text-xl">
                Join thousands of students from across the country for three days of learning, competing, and
                networking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/register">Register Now</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="/events">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] lg:h-[500px] rounded-xl overflow-hidden">
              <Image src="/placeholder.svg?height=600&width=800" alt="College Fest" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-10">What Participants Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="The fest was perfectly organized. The registration was seamless, and the quiz platform was top-notch!"
              author="Rahul Sharma"
              role="Engineering Student"
            />
            <TestimonialCard
              quote="Real-time updates kept me informed about all events. The dashboard was incredibly useful to track my registrations."
              author="Priya Patel"
              role="Arts Student"
            />
            <TestimonialCard
              quote="The variety of events was amazing. The platform made it so easy to discover and register for multiple competitions."
              author="Arjun Singh"
              role="Business Student"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">FestX</h3>
              <p className="text-sm text-muted-foreground">The ultimate college fest management platform.</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <Link href="/events" className="text-sm text-muted-foreground hover:text-primary">
                Events
              </Link>
              <Link href="/register" className="text-sm text-muted-foreground hover:text-primary">
                Register
              </Link>
              <Link href="/quizzes" className="text-sm text-muted-foreground hover:text-primary">
                Quizzes
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Resources</h3>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
                FAQ
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                Contact Us
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                About
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Connect</h3>
              <p className="text-sm text-muted-foreground">Stay updated with the latest announcements.</p>
              <div className="flex gap-4 mt-2">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Twitter
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Instagram
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Facebook
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} FestX. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center bg-card p-6 rounded-lg border shadow-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

interface EventCardProps {
  title: string;
  date: string;
  category: string;
  image: string;
  registrationsOpen: boolean;
}

function EventCard({ title, date, category, image, registrationsOpen }: EventCardProps) {
  return (
    <div className="flex flex-col bg-card rounded-lg overflow-hidden border shadow-sm">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute top-2 right-2">
          <Badge variant={registrationsOpen ? "default" : "secondary"}>{registrationsOpen ? "Open" : "Closed"}</Badge>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="text-sm text-muted-foreground">{date}</div>
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{category}</Badge>
        </div>
        <div className="mt-2">
          <Button variant="outline" className="w-full" asChild>
            <Link href={`/events/${title.toLowerCase().replace(/\s+/g, "-")}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <div className="flex flex-col p-6 bg-card rounded-lg border shadow-sm">
      <div className="text-lg italic mb-4">"{quote}"</div>
      <div className="mt-auto">
        <div className="font-semibold">{author}</div>
        <div className="text-sm text-muted-foreground">{role}</div>
      </div>
    </div>
  )
}
