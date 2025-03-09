// import type React from "react"
// import "@/app/globals.css"
// import { Inter } from "next/font/google"
// import { ThemeProvider } from "@/components/theme-provider"
// import Navbar from "@/components/navbar"
// import { Toaster } from "@/components/ui/toaster"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata = {
//   title: "FestX - College Fest Management Platform",
//   description: "The ultimate platform for college fest management",
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
//           <div className="min-h-screen flex flex-col">
//             <Navbar />
//             <main className="flex-1">{children}</main>
//             <Toaster />
//           </div>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }

import type React from "react"
import "@/app/globals.css"
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import { FloatingAnnouncement } from "@/components/floating-announcement"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FestX - College Fest Management Platform",
  description: "The ultimate platform for college fest management",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Toaster />
            <FloatingAnnouncement 
              message="Early bird tickets now available! Get 15% off with code EARLY15." 
              link={{ text: "Buy tickets now", href: "/tickets/buy" }}
            />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
