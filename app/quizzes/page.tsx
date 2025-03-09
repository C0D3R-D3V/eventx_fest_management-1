import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Trophy, Users, BookOpen } from "lucide-react"
import Link from "next/link"

// Mock data for quizzes
const quizzes = [
  {
    id: "tech-trivia",
    title: "Tech Trivia Challenge",
    description: "Test your knowledge about technology, gadgets, and the digital world.",
    questions: 30,
    duration: "45 minutes",
    difficulty: "Medium",
    participants: 120,
    category: "Technology",
    status: "active",
    event: "Hackathon 2024",
  },
  {
    id: "music-maestro",
    title: "Music Maestro Quiz",
    description: "How well do you know your music? From classical to contemporary, test your musical knowledge.",
    questions: 25,
    duration: "30 minutes",
    difficulty: "Hard",
    participants: 85,
    category: "Music",
    status: "active",
    event: "Battle of Bands",
  },
  {
    id: "general-knowledge",
    title: "General Knowledge Challenge",
    description: "A comprehensive quiz covering history, science, arts, sports, and current affairs.",
    questions: 50,
    duration: "60 minutes",
    difficulty: "Medium",
    participants: 205,
    category: "General",
    status: "active",
    event: null,
  },
  {
    id: "festx-trivia",
    title: "FestX Trivia",
    description: "How much do you know about FestX and its events? Test your knowledge and win exciting prizes.",
    questions: 20,
    duration: "20 minutes",
    difficulty: "Easy",
    participants: 310,
    category: "FestX",
    status: "active",
    event: null,
  },
  {
    id: "literary-legends",
    title: "Literary Legends",
    description: "A quiz for book lovers and literature enthusiasts. From classic novels to modern bestsellers.",
    questions: 30,
    duration: "40 minutes",
    difficulty: "Hard",
    participants: 65,
    category: "Literary",
    status: "upcoming",
    event: "Debating Championship",
  },
  {
    id: "sports-spectacular",
    title: "Sports Spectacular",
    description: "From cricket to football, tennis to basketball - test your sports knowledge across disciplines.",
    questions: 35,
    duration: "45 minutes",
    difficulty: "Medium",
    participants: 0,
    category: "Sports",
    status: "upcoming",
    event: null,
  },
]

export default function QuizzesPage() {
  const categories = [...new Set(quizzes.map((quiz) => quiz.category))]

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Quizzes & Challenges</h1>
        <p className="text-muted-foreground">Test your knowledge and compete with others in exciting quizzes</p>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Quizzes</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes
              .filter((quiz) => quiz.status === "active")
              .map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes
              .filter((quiz) => quiz.status === "upcoming")
              .map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
          </div>
        </TabsContent>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes
                .filter((quiz) => quiz.category === category)
                .map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="bg-muted rounded-lg p-8 mt-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Create Your Own Quiz</h2>
            <p className="text-muted-foreground">
              Are you a club or department representative? Create custom quizzes for your events.
            </p>
          </div>
          <Button size="lg" asChild>
            <Link href="/quizzes/create">Create Quiz</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function QuizCard({ quiz }) {
  const isActive = quiz.status === "active"

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline">{quiz.category}</Badge>
          <StatusBadge status={quiz.status} />
        </div>
        <CardTitle className="text-xl mt-2">{quiz.title}</CardTitle>
        <CardDescription>{quiz.description}</CardDescription>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>{quiz.questions} questions</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{quiz.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-muted-foreground" />
            <span>Difficulty: {quiz.difficulty}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{quiz.participants > 0 ? `${quiz.participants} participated` : "New"}</span>
          </div>
        </div>

        {quiz.event && (
          <div className="mt-4 p-2 bg-muted rounded text-sm">
            <span className="font-medium">Part of:</span> {quiz.event}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Button className="w-full" disabled={!isActive} asChild>
          <Link href={isActive ? `/quizzes/${quiz.id}` : "#"}>{isActive ? "Start Quiz" : "Coming Soon"}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function StatusBadge({ status }) {
  if (status === "active") {
    return <Badge>Active</Badge>
  }
  if (status === "upcoming") {
    return <Badge variant="secondary">Coming Soon</Badge>
  }
  return <Badge variant="outline">Closed</Badge>
}

