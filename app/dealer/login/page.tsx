/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

export default function DealerLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("") // Clear error when user starts typing
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      console.log("Attempting login with:", { email: formData.email })
      
      const response = await fetch('/api/auth/business-dealer-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log("Login response status:", response.status)
      
      const result = await response.json()
      console.log("Login response data:", result)

      if (!response.ok) {
        throw new Error(result.message || result.error || 'Login failed')
      }

      // Save tokens and user data
      if (result.accessToken) {
        localStorage.setItem('accessToken', result.accessToken)
        localStorage.setItem('user', JSON.stringify(result.user))
        
        if (result.refreshToken) {
          localStorage.setItem('refreshToken', result.refreshToken)
        }
        
        if (result.business) {
          localStorage.setItem('business', JSON.stringify(result.business))
        }
        
        console.log("Login successful, redirecting to dashboard...")
        
        // Redirect to dashboard
        router.push('/dealer/dashboard')
        router.refresh() // Refresh to update auth state
      } else {
        throw new Error('No access token received')
      }
      
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-slate-600 hover:text-green-600 transition-colors duration-200">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xs">MK</span>
              </div>
              <span className="text-lg font-bold text-slate-800">Motoka Kenya</span>
            </Link>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16 max-w-sm">
        <Card className="border-0 shadow-xl shadow-green-100/20 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle className="text-xl font-bold text-slate-800">Dealer Login</CardTitle>
            <p className="text-sm text-slate-500 mt-1">Access your dealer dashboard</p>
          </CardHeader>
          
          <CardContent className="pt-0">
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50" variant="destructive">
                <AlertDescription className="text-sm">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 h-11 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-11 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange("rememberMe", checked)}
                    className="w-4 h-4 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <Label htmlFor="rememberMe" className="text-xs text-slate-600">
                    Remember me
                  </Label>
                </div>
                <Link href="/dealer/forgot-password" className="text-xs text-green-600 hover:text-green-700 font-medium transition-colors duration-200">
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="text-center">
                <p className="text-xs text-slate-600">
                  Don&apos;t have a dealer account?{" "}
                  <Link href="/dealer/register" className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200">
                    Apply to become a dealer
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Need Help?</h3>
          <div className="space-y-2 text-xs text-slate-600">
            <p>
              <Link href="/dealer/support" className="text-green-600 hover:text-green-700 transition-colors duration-200">
                Contact Dealer Support
              </Link>
            </p>
            <p>
              <Link href="/dealer/guide" className="text-green-600 hover:text-green-700 transition-colors duration-200">
                Getting Started Guide
              </Link>
            </p>
            <p>Call us: +254 700 000 000</p>
          </div>
        </div>
      </div>
    </div>
  )
}