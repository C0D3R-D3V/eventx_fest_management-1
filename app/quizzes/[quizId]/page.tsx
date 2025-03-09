"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Mock data for a quiz
const quizData = {
  id: "tech-trivia",
  title: "Tech Trivia Challenge",
  description: "Test your knowledge about technology, gadgets, and the digital world.",
  questions: [
    {
      id: 1,
      question: "What does CPU stand for?",
      options: [
        { id: "a", text: "Central Processing Unit" },
        { id: "b", text: "Computer Personal Unit" },
        { id: "c", text: "Central Process Unit" },
        { id: "d", text: "Computer Power Unit" },
      ],
      correctAnswer: "a",
    },
    {
      id: 2,
      question: "Which company created the iPhone?",
      options: [
        { id: "a", text: "Samsung" },
        { id: "b", text: "Microsoft" },
        { id: "c", text: "Apple" },
        { id: "d", text: "Google" },
      ],
      correctAnswer: "c",
    },
    {
      id: 3,
      question: "What year was the first website created?",
      options: [
        { id: "a", text: "1985" },
        { id: "b", text: "1991" },
        { id: "c", text: "1995" },
        { id: "d", text: "2000" },
      ],
      correctAnswer: "b",
    },
    {
      id: 4,
      question: "What does HTML stand for?",
      options: [
        { id: "a", text: "Hyperlink Text Markup Language" },
        { id: "b", text: "High Tech Modern Language" },
        { id: "c", text: "Hyper Text Markup Language" },
        { id: "d", text: "Home Tool Markup Language" },
      ],
      correctAnswer: "c",
    },
    {
      id: 5,
      question: "Which programming language is known as the 'mother of all languages'?",
      options: [
        { id: "a", text: "Java" },
        { id: "b", text: "C" },
        { id: "c", text: "Python" },
        { id: "d", text: "C++" },
      ],
      correctAnswer: "b",
    },
  ],
  duration: 300, // seconds
  passingScore: 60,
}

export default function QuizPage({ params }) {
  const { quizId } = params
  const { toast } = useToast()

  // In a real application, fetch quiz data based on quizId
  const quiz = quizData // Simulating fetched data

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(quiz.duration)
  const [results, setResults] = useState(null)

  // Timer functionality
  useEffect(() => {
    if (!quizStarted || quizCompleted) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizStarted, quizCompleted])

  const handleStartQuiz = () => {
    setQuizStarted(true)
    setTimeLeft(quiz.duration)
    setSelectedAnswers({})
    setCurrentQuestion(0)
    setQuizCompleted(false)
    setResults(null)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSelectAnswer = (questionId, optionId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }))
  }

  const handleSubmitQuiz = () => {
    const totalQuestions = quiz.questions.length
    const answeredQuestions = Object.keys(selectedAnswers).length

    if (answeredQuestions < totalQuestions) {
      const confirmation = window.confirm(
        `You've only answered ${answeredQuestions} out of ${totalQuestions} questions. Are you sure you want to submit?`,
      )
      if (!confirmation) return
    }

    // Calculate results
    let correctAnswers = 0
    quiz.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / totalQuestions) * 100)
    const passed = score >= quiz.passingScore

    setResults({
      score,
      correctAnswers,
      totalQuestions,
      passed,
    })

    setQuizCompleted(true)

    toast({
      title: "Quiz Completed!",
      description: `Your score: ${score}%`,
      variant: passed ? "default" : "destructive",
    })
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercentage = ((currentQuestion + 1) / quiz.questions.length) * 100

  if (quizCompleted) {
    return (
      <div className="container max-w-3xl py-10">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Quiz Results</CardTitle>
            <CardDescription>{quiz.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="w-48 h-48 rounded-full border-8 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl font-bold">{results.score}%</span>
                  <p className="text-muted-foreground">Your Score</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-2xl font-bold">{results.correctAnswers}</p>
                <p className="text-muted-foreground">Correct Answers</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-2xl font-bold">{results.totalQuestions - results.correctAnswers}</p>
                <p className="text-muted-foreground">Wrong Answers</p>
              </div>
            </div>

            <div className="text-center p-4 rounded-lg">
              {results.passed ? (
                <div className="text-primary">
                  <Badge className="text-lg py-1 px-3">Passed!</Badge>
                  <p className="mt-2">Congratulations! You've passed the quiz.</p>
                </div>
              ) : (
                <div className="text-destructive">
                  <Badge variant="destructive" className="text-lg py-1 px-3">
                    Not Passed
                  </Badge>
                  <p className="mt-2">You didn't meet the passing score of {quiz.passingScore}%. Try again!</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="justify-center gap-4">
            <Button onClick={handleStartQuiz}>Retry Quiz</Button>
            <Button variant="outline" asChild>
              <Link href="/quizzes">Back to Quizzes</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (!quizStarted) {
    return (
      <div className="container max-w-3xl py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{quiz.title}</CardTitle>
            <CardDescription>{quiz.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium">Questions</p>
                <p className="text-2xl font-bold">{quiz.questions.length}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium">Time Limit</p>
                <p className="text-2xl font-bold">{formatTime(quiz.duration)}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium">Passing Score</p>
                <p className="text-2xl font-bold">{quiz.passingScore}%</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium">Difficulty</p>
                <p className="text-2xl font-bold">Medium</p>
              </div>
            </div>

            <div className="flex p-4 gap-2 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div className="text-sm text-amber-800 dark:text-amber-300">
                <p className="font-medium">Instructions:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>You have {formatTime(quiz.duration)} to complete the quiz.</li>
                  <li>You can navigate between questions.</li>
                  <li>The timer will continue even if you navigate away.</li>
                  <li>Your answers are saved as you go.</li>
                  <li>Submit when you're done or when time runs out.</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-4">
            <Button variant="outline" asChild>
              <Link href="/quizzes">Back to Quizzes</Link>
            </Button>
            <Button onClick={handleStartQuiz}>Start Quiz</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const question = quiz.questions[currentQuestion]

  return (
    <div className="container max-w-3xl py-10">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center mb-2">
            <Badge variant="outline">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </Badge>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </CardHeader>
        <CardContent className="py-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-6">{question.question}</h2>
              <RadioGroup
                value={selectedAnswers[question.id] || ""}
                onValueChange={(value) => handleSelectAnswer(question.id, value)}
                className="space-y-3"
              >
                {question.options.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-muted"
                  >
                    <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                    <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
            Previous
          </Button>
          <div className="flex gap-2">
            {currentQuestion === quiz.questions.length - 1 ? (
              <Button onClick={handleSubmitQuiz}>Submit Quiz</Button>
            ) : (
              <Button onClick={handleNextQuestion}>Next</Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

