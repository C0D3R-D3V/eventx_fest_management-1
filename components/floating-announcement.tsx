"use client"

import { useState, useEffect } from "react"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from 'next/link'

interface FloatingAnnouncementProps {
  message: string
  link?: {
    text: string
    href: string
  }
  variant?: "default" | "success" | "warning"
}

export function FloatingAnnouncement({
  message,
  link,
  variant = "default"
}: FloatingAnnouncementProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const [announcements] = useState([
    "🔥 Famous Singer just confirmed for Saturday night!",
    "⚡ Last 50 tickets remaining for the main event",
    "🏆 Cricket screening with Sachin Tendulkar - Sunday 3PM",
    "💻 Hackathon registration closes in 2 days"
  ])

  useEffect(() => {
    // Check if announcement was recently closed
    const wasRecentlyClosed = localStorage.getItem('announcement_closed')
    if (wasRecentlyClosed) {
      const closeTime = parseInt(wasRecentlyClosed)
      // Only consider it closed if it was closed in the last 24 hours
      if (Date.now() - closeTime < 24 * 60 * 60 * 1000) {
        setIsClosed(true)
        return
      }
    }

    // Show the announcement after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    // Store closed state in localStorage with timestamp
    localStorage.setItem('announcement_closed', Date.now().toString())
    // After animation completes, set as closed
    setTimeout(() => {
      setIsClosed(true)
    }, 300)
  }

  return (
    <>
      {/* Announcements Ticker */}
      <style jsx global>{`
        .announcements-ticker {
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          background-color: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          padding: 8px 0;
          overflow: hidden;
          z-index: 900;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .ticker-content {
          display: inline-flex;
          animation: ticker 30s linear infinite;
          white-space: nowrap;
          padding-left: 100%;
        }

        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-200%); }
        }

        .ticker-item {
          padding: 0 20px;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .announcements-ticker {
            top: 56px;
          }
        }
      `}</style>

      <div className="announcements-ticker">
        <div className="ticker-content">
          {[...announcements, ...announcements].map((announcement, index) => (
            <span key={index} className="ticker-item">{announcement}</span>
          ))}
        </div>
      </div>

      {/* Floating announcement */}
      {!isClosed && (
        <div
          className={cn(
            "fixed bottom-4 left-1/2 -translate-x-1/2 z-[901] max-w-md w-full px-4 transition-all duration-300 ease-in-out",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between rounded-lg shadow-lg p-4 border",
              variant === "default" && "bg-primary text-primary-foreground border-primary/20",
              variant === "success" && "bg-green-600 text-white border-green-700",
              variant === "warning" && "bg-amber-500 text-white border-amber-600"
            )}
          >
            <div className="flex-1 mr-4">
              <p className="text-sm font-medium">{message}</p>
              {link && (
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-semibold underline-offset-2 hover:underline mt-1 inline-block",
                    variant === "default" && "text-primary-foreground/90 hover:text-primary-foreground",
                    variant === "success" && "text-white/90 hover:text-white",
                    variant === "warning" && "text-white/90 hover:text-white"
                  )}
                >
                  {link.text}
                </Link>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className={cn(
                "h-6 w-6 hover:bg-white/10",
                variant === "default" && "text-primary-foreground",
                variant === "success" && "text-white",
                variant === "warning" && "text-white"
              )}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
