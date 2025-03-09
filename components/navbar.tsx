// "use client"

// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { ModeToggle } from "@/components/mode-toggle"
// import { usePathname } from "next/navigation"
// import { useState } from "react"
// import { Menu, X, Bell } from "lucide-react"
// import { cn } from "@/lib/utils"

// export default function Navbar() {
//   const pathname = usePathname()
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   const routes = [
//     { href: "/", label: "Home" },
//     { href: "/events", label: "Events" },
//     { href: "/quizzes", label: "Quizzes" },
//     { href: "/dashboard", label: "Dashboard" },
//     { href: "/about", label: "About" },
//   ]

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center">
//         <div className="mr-4 flex">
//           <Link href="/" className="flex items-center space-x-2">
//             <span className="font-bold text-xl">FestX</span>
//           </Link>
//         </div>
//         <div className="flex flex-1 items-center justify-end space-x-2 md:justify-between">
//           <nav className="hidden md:flex items-center space-x-6">
//             {routes.map((route) => (
//               <Link
//                 key={route.href}
//                 href={route.href}
//                 className={cn(
//                   "text-sm font-medium transition-colors hover:text-primary",
//                   pathname === route.href ? "text-foreground" : "text-muted-foreground",
//                 )}
//               >
//                 {route.label}
//               </Link>
//             ))}
//           </nav>
//           <div className="flex items-center space-x-4">
//             <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
//               <Bell className="h-5 w-5" />
//               <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
//             </Button>
//             <ModeToggle />
//             <Button className="hidden md:flex" asChild>
//               <Link href="/register">Register</Link>
//             </Button>
//             <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//               {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </Button>
//           </div>
//         </div>
//       </div>
//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div className="md:hidden border-t">
//           <div className="container py-4 grid gap-4">
//             {routes.map((route) => (
//               <Link
//                 key={route.href}
//                 href={route.href}
//                 className={cn(
//                   "text-sm font-medium transition-colors hover:text-primary",
//                   pathname === route.href ? "text-foreground" : "text-muted-foreground",
//                 )}
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {route.label}
//               </Link>
//             ))}
//             <Button className="mt-2" asChild>
//               <Link href="/register" onClick={() => setIsMenuOpen(false)}>
//                 Register
//               </Link>
//             </Button>
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }


"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X, Bell, ShoppingBag, MapPin, Ticket, User, LogOut, Settings, ShoppingCart, HelpCircle, Pizza, ChevronDown } from 'lucide-react'
import { cn } from "@/lib/utils"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your event starts in 2 hours", read: false },
    { id: 2, text: "New quiz available: FestX Trivia", read: false },
    { id: 3, text: "Your food order is ready for pickup", read: false }
  ])
  const { toast } = useToast()

  const routes = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/quizzes", label: "Quizzes" },
  ]

  const unreadNotifications = notifications.filter(n => !n.read).length

  interface Notification {
    id: number;
    text: string;
    read: boolean;
  }

  interface Route {
    href: string;
    label: string;
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsLoggedIn(true);
    toast({
      title: "Logged in successfully",
      description: "Welcome back to FestX!",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false)
    toast({
      title: "Logged out successfully",
      description: "See you soon!",
    })
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
    toast({
      title: "Notifications cleared",
      description: "All notifications marked as read",
    })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">FestX</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 md:justify-between">
          <nav className="hidden md:flex items-center space-x-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {route.label}
              </Link>
            ))}
            
            {/* Food Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                <span>Food</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/food/order">
                    <Pizza className="mr-2 h-4 w-4" />
                    Order Online
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/food/stalls">
                    <MapPin className="mr-2 h-4 w-4" />
                    Food Stalls
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Merchandise Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                <span>Merchandise</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/merchandise/t-shirts">T-Shirts</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/merchandise/accessories">Accessories</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/merchandise/collectibles">Collectibles</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Venue Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                <span>Venue</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/venue/map">
                    <MapPin className="mr-2 h-4 w-4" />
                    Campus Map
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/venue/directions">Directions</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/venue/accommodation">Accommodation</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Tickets Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                <span>Tickets</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/tickets/buy">
                    <Ticket className="mr-2 h-4 w-4" />
                    Buy Tickets
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/tickets/pricing">Pricing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/tickets/faq">FAQ</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link
              href="/about"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/about" ? "text-foreground" : "text-muted-foreground",
              )}
            >
              About
            </Link>
            
            <Link
              href="/contact"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/contact" ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Contact
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex justify-between items-center">
                  <span>Notifications</span>
                  {unreadNotifications > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                      Mark all as read
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className={cn("flex flex-col items-start p-4", !notification.read && "bg-muted")}>
                      <div className="text-sm">{notification.text}</div>
                      <div className="text-xs text-muted-foreground mt-1">Just now</div>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">No notifications</div>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="justify-center">
                  <Link href="/notifications">View all notifications</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <ModeToggle />
            
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <User className="mr-2 h-4 w-4" />
                      Your Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Your Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/support">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Support
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Login</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Login to FestX</DialogTitle>
                      <DialogDescription>
                        Enter your credentials to access your account
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleLogin}>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="your@email.com" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" required />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Login</Button>
                      </DialogFooter>
                    </form>
                    <div className="mt-4 text-center text-sm">
                      <span className="text-muted-foreground">Don't have an account? </span>
                      <Link href="/register" className="text-primary hover:underline">
                        Register
                      </Link>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )}
            
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 grid gap-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.href ? "text-foreground" : "text-muted-foreground",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            <Link
              href="/food/order"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Food
            </Link>
            <Link
              href="/merchandise"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Merchandise
            </Link>
            <Link
              href="/venue/map"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Venue
            </Link>
            <Link
              href="/tickets/buy"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Tickets
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            {!isLoggedIn && (
              <div className="flex flex-col gap-2 mt-2">
                <Button asChild>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    Register
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
