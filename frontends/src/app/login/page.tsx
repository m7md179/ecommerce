"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { register, login, isLoggedIn, getUserId } from "@/services/auth.service"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useShoppingCart } from "@/context/ShoppingCartContext"
import { toast } from "@/components/ui/use-toast"

export default function Login() {
  const router = useRouter()
  const { setUserId } = useShoppingCart()
  const [selectedTab, setSelectedTab] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isLoggedIn()) {
      const userId = getUserId()
      if (userId) {
        setUserId(userId)
        router.push("/")
      }
    }
  }, [])

  const handleRegister = async () => {
    try {
      setError(null)
      const response = await register({ email, password })
      console.log("Registered user:", response)
      toast({
        title: "Registration successful",
        description: "Please log in with your new account.",
      })
      setSelectedTab("login")
    } catch (error) {
      console.error("Registration error:", error)
      setError("Registration failed. Please try again.")
    }
  }

  const handleLogin = async () => {
    try {
      setError(null)
      const response = await login({ email, password })
      console.log("Logged in user:", response)
      setUserId(response.userId)
      toast({
        title: "Login successful",
        description: "Welcome back!",
      })
      router.push("/")
    } catch (error) {
      console.error("Login error:", error)
      setError("Login failed. Please check your credentials and try again.")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Tabs
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value as "login" | "register")}
        className="w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <TabsContent value="login">
          <Card className="bg-slate-200 shadow-md rounded-2xl p-4">
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-10">
              <div className="space-y-2">
                <Label htmlFor="email" className="mb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[35px] rounded-2xl p-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="mb-2">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[35px] rounded-2xl p-2"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleLogin} className="w-full space-y-4">
                Login
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card className="bg-slate-200 shadow-md rounded-2xl p-4">
            <CardHeader>
              <CardTitle>Register</CardTitle>
            </CardHeader>
            <CardContent className="space-y-10">
              <div className="space-y-2">
                <Label htmlFor="email" className="mb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[35px] rounded-2xl p-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="mb-2">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[35px] rounded-2xl p-2"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleRegister} className="w-full space-y-4">
                Register
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
