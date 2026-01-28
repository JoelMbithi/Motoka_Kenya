/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { ArrowLeft, Send, Phone, Mail, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useFormValidation } from "@/hooks/use-form-validation"
import { contactSchema } from "@/lib/validation"

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
}

export default function ContactPage() {
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
    reset,
  } = useFormValidation({
    schema: contactSchema,
    initialData: initialFormData,
    onSubmit: async (data) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Contact form submitted:", data)
      setSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false)
        reset()
      }, 3000)
    },
  })

  const renderFieldError = (field: keyof typeof formData) => {
    const error = getFieldError(field)
    return error ? <p className="text-sm text-red-600 mt-1">{error}</p> : null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MK</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Motoka Kenya</span>
            </Link>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about buying or selling a vehicle? We&apos;re here to help you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-gray-600">+254 700 123 456</p>
                      <p className="text-gray-600">+254 733 456 789</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-600">info@motokakenya.com</p>
                      <p className="text-gray-600">support@motokakenya.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-gray-600">
                        Westlands Office Park
                        <br />
                        Waiyaki Way, Nairobi
                        <br />
                        Kenya
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 8:00 AM - 6:00 PM
                        <br />
                        Saturday: 9:00 AM - 4:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <Alert>
                      <Send className="h-4 w-4" />
                      <AlertDescription>
                        Thank you for your message! We&apos;ll get back to you within 24 hours.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            onBlur={() => validateFieldOnBlur("name")}
                            placeholder="Your full name"
                            className={!isFieldValid("name") ? "border-red-500" : ""}
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
                          />
                          {renderFieldError("email")}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => updateField("phone", e.target.value)}
                            onBlur={() => validateFieldOnBlur("phone")}
                            placeholder="+254 700 123 456"
                            className={!isFieldValid("phone") ? "border-red-500" : ""}
                          />
                          {renderFieldError("phone")}
                        </div>

                        <div>
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => updateField("subject", e.target.value)}
                            onBlur={() => validateFieldOnBlur("subject")}
                            placeholder="What is this about?"
                            className={!isFieldValid("subject") ? "border-red-500" : ""}
                          />
                          {renderFieldError("subject")}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => updateField("message", e.target.value)}
                          onBlur={() => validateFieldOnBlur("message")}
                          placeholder="Tell us more about your inquiry..."
                          rows={6}
                          className={!isFieldValid("message") ? "border-red-500" : ""}
                        />
                        {renderFieldError("message")}
                        <p className="text-sm text-gray-500 mt-1">{formData.message.length}/1000 characters</p>
                      </div>

                      <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">How do I list my vehicle?</h3>
                    <p className="text-gray-600 text-sm">
                      Register as a dealer or individual seller, then use our easy listing form to add your vehicle with
                      photos and details.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Is there a listing fee?</h3>
                    <p className="text-gray-600 text-sm">
                      Basic listings are free for individual sellers. Premium features and dealer packages have
                      competitive rates.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">How do I schedule a test drive?</h3>
                    <p className="text-gray-600 text-sm">
                      Click the &quot;Test Drive&quot; button on any vehicle listing and fill out the form. The seller will
                      contact you directly.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Do you offer financing?</h3>
                    <p className="text-gray-600 text-sm">
                      Yes! We partner with leading financial institutions to offer competitive vehicle financing
                      options.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
