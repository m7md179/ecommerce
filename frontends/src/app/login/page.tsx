"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { register, login } from "@/services/auth.service"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function Login() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {
    try {
      await register({ email, password })
      // Handle successful registration, e.g., store user data in local storage
      console.log("Registered user:", { email, password })
    } catch (error) {
      console.error("Registration error:", error)
    }
  }

  const handleLogin = async () => {
    try {
      await login({ email, password })
      // Handle successful login, e.g., store user data in local storage
      console.log("Logged in user:", { email, password })
      router.push("/")
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Tabs
        defaultValue={selectedTab}
        onValueChange={(value) => setSelectedTab(value as "login" | "register")}
        className="w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className=" bg-slate-200 shadow-md rounded-2xl p-4">
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
          <Card className=" bg-slate-200 shadow-md rounded-2xl p-4">
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
