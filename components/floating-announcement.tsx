"use client"

import { useState, useEffect } from "react"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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

  useEffect(() => {
    // Show the announcement after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    // After animation completes, set as closed
    setTimeout(() => {
      setIsClosed(true)
    }, 300)
  }

  if (isClosed) return null

  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4 transition-all duration-300 ease-in-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between rounded-lg shadow-lg p-4 border",
          variant === "default" && "bg-primary text-primary-foreground border-primary",
          variant === "success" && "bg-green-600 text-white border-green-700",
          variant === "warning" && "bg-amber-500 text-white border-amber-600"
        )}
      >
        <div className="flex-1 mr-4">
          <p className="text-sm font-medium">{message}</p>
          {link && (
            <a
              href={link.href}
              className={cn(
                "text-sm underline mt-1 inline-block",
                variant === "default" && "text-primary-foreground/90 hover:text-primary-foreground",
                variant === "success" && "text-white/90 hover:text-white",
                variant === "warning" && "text-white/90 hover:text-white"
              )}
            >
              {link.text}
            </a>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className={cn(
            "h-6 w-6",
            variant === "default" && "hover:bg-primary-foreground/20 text-primary-foreground",
            variant === "success" && "hover:bg-white/20 text-white",
            variant === "warning" && "hover:bg-white/20 text-white"
          )}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>
  )
}
