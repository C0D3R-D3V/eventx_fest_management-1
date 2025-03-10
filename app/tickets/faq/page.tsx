"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"

interface FAQCategory {
  id: string
  name: string
  questions: FAQ[]
}

interface FAQ {
  id: string
  question: string
  answer: string
}

const faqCategories: FAQCategory[] = [
  {
    id: "tickets",
    name: "Tickets & Pricing",
    questions: [
      {
        id: "1",
        question: "What types of tickets are available?",
        answer: "We offer several ticket types: Single Day Pass, Regular Pass, and VIP Pass. Each comes with different benefits and access levels. Check our pricing page for detailed information about each ticket type."
      },
      {
        id: "2",
        question: "How can I purchase tickets?",
        answer: "Tickets can be purchased online through our website. We accept various payment methods including credit/debit cards and UPI. Simply visit the 'Buy Tickets' page and follow the instructions."
      },
      {
        id: "3",
        question: "Are there any student discounts?",
        answer: "Yes, students can avail a 10% discount on Regular Passes by showing their valid student ID during registration. This offer is not applicable on VIP or Single Day passes."
      },
      {
        id: "4",
        question: "Can I get a refund?",
        answer: "Refunds are available up to 7 days before the event. After that, tickets are non-refundable but can be transferred to another person. Contact our support team for assistance with refunds or transfers."
      }
    ]
  },
  {
    id: "access",
    name: "Event Access & Features",
    questions: [
      {
        id: "5",
        question: "What's included in the VIP Pass?",
        answer: "VIP Pass includes premium access to all events, exclusive merchandise, VIP lounge access, meet & greet passes, priority seating, and food coupons worth ₹1000. You also get dedicated support throughout the event."
      },
      {
        id: "6",
        question: "Can I upgrade my ticket?",
        answer: "Yes, you can upgrade your ticket by paying the difference in price. Contact our support team for assistance with ticket upgrades. Upgrades are subject to availability."
      },
      {
        id: "7",
        question: "How do I access different events?",
        answer: "Your ticket includes a unique QR code that will be scanned at event venues. Download our mobile app to access your digital ticket and event schedule."
      }
    ]
  },
  {
    id: "logistics",
    name: "Event Logistics",
    questions: [
      {
        id: "8",
        question: "What are the event timings?",
        answer: "The event runs from March 15-17, 2024. Daily timings are 9:00 AM to 10:00 PM. Some special events might have different timings, which will be mentioned in the schedule."
      },
      {
        id: "9",
        question: "Is there parking available?",
        answer: "Yes, we have ample parking space available at the venue. VIP Pass holders get access to premium parking areas. Regular parking is available on a first-come, first-served basis."
      },
      {
        id: "10",
        question: "What items are not allowed at the venue?",
        answer: "Prohibited items include outside food and beverages, professional cameras without permission, weapons, and illegal substances. A complete list will be shared with ticket holders."
      }
    ]
  },
  {
    id: "support",
    name: "Support & Assistance",
    questions: [
      {
        id: "11",
        question: "How can I contact support?",
        answer: "You can reach our support team through email at support@festx.com or call us at +91-XXXXXXXXXX. During the event, help desks will be available at multiple locations."
      },
      {
        id: "12",
        question: "What if I lose my ticket?",
        answer: "Don't worry! Your ticket is also available digitally. Login to your account on our website or app to access your digital ticket. You can also contact support for assistance."
      }
    ]
  }
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">
            Find answers to common questions about FestX tickets and event details
          </p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>
                  Common questions about {category.name.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold">Still have questions?</h3>
              <p className="text-muted-foreground">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <Button>Contact Support</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 