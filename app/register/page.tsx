"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  college: z.string().min(2, "College name must be at least 2 characters"),
  eventId: z.string().min(1, "Please select an event"),
  teamName: z.string().optional(),
  teamSize: z.string().optional(),
  teamMembers: z.string().optional(),
  participationType: z.enum(["individual", "team"]),
  notes: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
})

// Mock data for events
const events = [
  { id: "hackathon-2024", name: "Hackathon 2024", type: "team" },
  { id: "battle-of-bands", name: "Battle of Bands", type: "team" },
  { id: "debating-championship", name: "Debating Championship", type: "team" },
  { id: "photography-contest", name: "Photography Contest", type: "individual" },
  { id: "quiz-competition", name: "Quiz Competition", type: "individual" },
  { id: "dance-competition", name: "Dance Competition", type: "both" },
]

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const preselectedEvent = searchParams.get("event")
  const { toast } = useToast()

  const [currentStep, setCurrentStep] = useState(1)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      college: "",
      eventId: preselectedEvent || "",
      teamName: "",
      teamSize: "",
      teamMembers: "",
      participationType: "individual",
      notes: "",
      termsAccepted: false,
    },
  })

  const watchEventId = form.watch("eventId")
  const watchParticipationType = form.watch("participationType")

  // Get event type (individual/team/both)
  const selectedEvent = events.find((event) => event.id === watchEventId)
  const eventType = selectedEvent?.type || "individual"

  // Check if team fields should be shown
  const showTeamFields = watchParticipationType === "team" && (eventType === "team" || eventType === "both")

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Registration Successful!",
      description: "You have successfully registered for the event.",
    })
  }

  return (
    <div className="container max-w-3xl py-10">
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register for FestX Events</CardTitle>
          <CardDescription>Fill in the details below to register for your favorite events.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="eventId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an event" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {events.map((event) => (
                              <SelectItem key={event.id} value={event.id}>
                                {event.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>Choose the event you want to participate in.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watchEventId && eventType === "both" && (
                    <FormField
                      control={form.control}
                      name="participationType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Participation Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="individual" />
                                </FormControl>
                                <FormLabel className="font-normal">Individual Participation</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="team" />
                                </FormControl>
                                <FormLabel className="font-normal">Team Participation</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="youremail@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Your contact number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="college"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>College/University</FormLabel>
                        <FormControl>
                          <Input placeholder="Your college or university name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  {showTeamFields && (
                    <>
                      <FormField
                        control={form.control}
                        name="teamName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Team Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your team name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="teamSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Team Size</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Number of team members" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[2, 3, 4, 5, 6, 7, 8].map((size) => (
                                  <SelectItem key={size} value={size.toString()}>
                                    {size} members
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="teamMembers"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Team Members</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter the names and emails of your team members (one per line)"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>Format: Name, Email, College (one member per line)</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional information you'd like to provide"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>I accept the terms and conditions</FormLabel>
                          <FormDescription>
                            By accepting, you agree to follow all event rules and guidelines.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <CardFooter className="flex justify-between px-0">
                {currentStep === 2 && (
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                    Previous
                  </Button>
                )}

                {currentStep === 1 && (
                  <Button
                    type="button"
                    onClick={() => {
                      form.trigger(["fullName", "email", "phone", "college", "eventId"]).then((isValid) => {
                        if (isValid) setCurrentStep(2)
                      })
                    }}
                    className="ml-auto"
                  >
                    Next
                  </Button>
                )}

                {currentStep === 2 && <Button type="submit">Complete Registration</Button>}
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

