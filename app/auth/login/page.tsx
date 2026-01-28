/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useFormValidation } from "@/hooks/use-form-validation"
import { loginSchema } from "@/lib/validation"

const initialFormData = {
  email: "",
  password: "",
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")

  const {
    data: formData,
    errors,
    isSubmitting,
    updateField,
    validateFieldOnBlur,
    handleSubmit,
    getFieldError,
    isFieldValid,
  } = useFormValidation({
    schema: loginSchema,
    initialData: initialFormData,
    onSubmit: async (data) => {
      setLoginError("")
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log("Login submitted:", data)

        // Simulate login error for demo
        if (data.email === "error@example.com") {
          throw new Error("Invalid credentials")
        }

        // Redirect to dashboard or home page
        window.location.href = "/"
      } catch (error) {
        setLoginError("Invalid email or password. Please try again.")
      }
    },
  })

  const renderFieldError = (field: keyof typeof formData) => {
    const error = getFieldError(field)
    return error ? <p className="text-sm text-red-500 mt-1">{error}</p> : null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xs">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-1 text-gray-500 hover:text-gray-700 mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link href="/" className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
              <span className="text-white font-semibold text-sm">MK</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">Motoka Kenya</span>
          </Link>
        </div>

        <Card className="shadow-sm border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-xl font-medium text-gray-800">
              Sign in to your account
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loginError && (
              <Alert variant="destructive" className="mb-4 text-sm">
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onBlur={() => validateFieldOnBlur("email")}
                  placeholder="your.email@example.com"
                  className={`text-sm ${!isFieldValid("email") ? "border-red-500" : "border-gray-300"}`}
                  autoComplete="email"
                />
                {renderFieldError("email")}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    onBlur={() => validateFieldOnBlur("password")}
                    placeholder="Enter your password"
                    className={`text-sm pr-10 ${!isFieldValid("password") ? "border-red-500" : "border-gray-300"}`}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {renderFieldError("password")}
              </div>

              <div className="flex items-center justify-between pt-1">
                <Link 
                  href="/auth/forgot-password" 
                  className="text-xs text-green-600 hover:text-green-700"
                >
                  Forgot your password?
                </Link>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Don&apos;t have an account?{" "}
                <Link 
                  href="/auth/register" 
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}