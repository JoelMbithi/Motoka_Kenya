/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useFormValidation } from "@/hooks/use-form-validation"
import { registerSchema } from "@/lib/validation"

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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
    schema: registerSchema,
    initialData: initialFormData,
  onSubmit: async (data) => {
  try {
    const response = await fetch('/api/auth/business-dealer-register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || result.error || 'Registration failed');
    }
    
    console.log('Registration successful:', result);
    setSubmitted(true);
  } catch (error) {
    console.error('Registration error:', error);
    alert( 'Registration failed. Please try again.');
  }
},
  })

  const renderFieldError = (field: keyof typeof formData) => {
    const error = getFieldError(field)
    return error ? <p className="text-sm text-red-600 mt-1">{error}</p> : null
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card>
            <CardContent className="pt-6">
              <Alert>
                <AlertDescription>
                  Registration successful! Please check your email to verify your account before signing in.
                </AlertDescription>
              </Alert>
              <div className="mt-6 text-center">
                <Link href="/auth/login">
                  <Button>Go to Sign In</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">MK</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Motoka Kenya</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Create your account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  onBlur={() => validateFieldOnBlur("name")}
                  placeholder="Your full name"
                  className={!isFieldValid("name") ? "border-red-500" : ""}
                  autoComplete="name"
                />
                {renderFieldError("name")}
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onBlur={() => validateFieldOnBlur("email")}
                  placeholder="your.email@example.com"
                  className={!isFieldValid("email") ? "border-red-500" : ""}
                  autoComplete="email"
                />
                {renderFieldError("email")}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  onBlur={() => validateFieldOnBlur("phone")}
                  placeholder="+254 700 123 456"
                  className={!isFieldValid("phone") ? "border-red-500" : ""}
                  autoComplete="tel"
                />
                {renderFieldError("phone")}
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    onBlur={() => validateFieldOnBlur("password")}
                    placeholder="Create a strong password"
                    className={`pr-10 ${!isFieldValid("password") ? "border-red-500" : ""}`}
                    autoComplete="new-password"
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
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters with uppercase, lowercase, and number
                </p>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                    onBlur={() => validateFieldOnBlur("confirmPassword")}
                    placeholder="Confirm your password"
                    className={`pr-10 ${!isFieldValid("confirmPassword") ? "border-red-500" : ""}`}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {renderFieldError("confirmPassword")}
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => updateField("agreeToTerms", checked)}
                  className={!isFieldValid("agreeToTerms") ? "border-red-500" : ""}
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-green-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-green-600 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {renderFieldError("agreeToTerms")}

              <Button type="submit" disabled={isSubmitting || !formData.agreeToTerms} className="w-full">
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-green-600 hover:text-green-500 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
