/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Clock, User, Phone, Mail, Car, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useFormValidation } from "@/hooks/use-form-validation"
import { testDriveSchema } from "@/lib/validation"

interface TestDriveModalProps {
  vehicle: {
    id: number
    title: string
    dealer: {
      name: string
      phone: string
      location: string
    }
  }
  children: React.ReactNode
}

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  message: "",
  drivingLicense: "",
}

export default function TestDriveModal({ vehicle, children }: TestDriveModalProps) {
  const [isOpen, setIsOpen] = useState(false)
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
    schema: testDriveSchema,
    initialData: initialFormData,
    onSubmit: async (data) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Test drive request submitted:", data)
      setSubmitted(true)

      // Auto close after 3 seconds
      setTimeout(() => {
        setIsOpen(false)
        setSubmitted(false)
        reset()
      }, 3000)
    },
  })

  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  const renderFieldError = (field: keyof typeof formData) => {
    const error = getFieldError(field)
    return error ? (
      <p className="text-xs text-red-500 mt-1 font-medium animate-in fade-in duration-200">
        {error}
      </p>
    ) : null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[95vh] overflow-y-auto bg-white border-0 shadow-2xl rounded-2xl">
        <DialogHeader className="pb-4 border-b border-slate-100">
          <DialogTitle className="flex items-center text-slate-800 text-lg font-semibold">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
              <Car className="w-4 h-4 text-emerald-600" />
            </div>
            Schedule Test Drive
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 px-2 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <Alert className="border-emerald-200 bg-emerald-50 text-center">
              <AlertDescription className="text-emerald-700 font-medium">
                Test drive request submitted successfully! {vehicle.dealer.name} will contact you within 24 hours to
                confirm your appointment.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
            {/* Vehicle Info */}
            <Card className="border-slate-200 shadow-sm rounded-xl bg-slate-50">
              <CardContent className="p-4">
                <div className="text-sm space-y-1">
                  <p className="font-semibold text-slate-800 text-base">{vehicle.title}</p>
                  <p className="text-slate-600 font-medium">{vehicle.dealer.name}</p>
                  <p className="text-slate-500">{vehicle.dealer.location}</p>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Personal Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-xs font-semibold text-slate-700 mb-2 block">
                    Full Name *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      onBlur={() => validateFieldOnBlur("name")}
                      placeholder="Your full name"
                      className={`pl-10 h-10 text-sm border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                        !isFieldValid("name") ? "border-red-300 focus:ring-red-500 focus:border-red-500" : ""
                      }`}
                      required
                    />
                  </div>
                  {renderFieldError("name")}
                </div>

                <div>
                  <Label htmlFor="email" className="text-xs font-semibold text-slate-700 mb-2 block">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      onBlur={() => validateFieldOnBlur("email")}
                      placeholder="your.email@example.com"
                      className={`pl-10 h-10 text-sm border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                        !isFieldValid("email") ? "border-red-300 focus:ring-red-500 focus:border-red-500" : ""
                      }`}
                      required
                    />
                  </div>
                  {renderFieldError("email")}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-xs font-semibold text-slate-700 mb-2 block">
                    Phone Number *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      onBlur={() => validateFieldOnBlur("phone")}
                      placeholder="+254 700 123 456"
                      className={`pl-10 h-10 text-sm border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                        !isFieldValid("phone") ? "border-red-300 focus:ring-red-500 focus:border-red-500" : ""
                      }`}
                      required
                    />
                  </div>
                  {renderFieldError("phone")}
                </div>

                <div>
                  <Label htmlFor="drivingLicense" className="text-xs font-semibold text-slate-700 mb-2 block">
                    Driving License *
                  </Label>
                  <Input
                    id="drivingLicense"
                    value={formData.drivingLicense}
                    onChange={(e) => updateField("drivingLicense", e.target.value.toUpperCase())}
                    onBlur={() => validateFieldOnBlur("drivingLicense")}
                    placeholder="DL123456789"
                    className={`h-10 text-sm border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                      !isFieldValid("drivingLicense") ? "border-red-300 focus:ring-red-500 focus:border-red-500" : ""
                    }`}
                    required
                  />
                  {renderFieldError("drivingLicense")}
                </div>
              </div>
            </div>

            {/* Date and Time */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Preferred Schedule</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-xs font-semibold text-slate-700 mb-2 block">
                    Date *
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => updateField("date", e.target.value)}
                      onBlur={() => validateFieldOnBlur("date")}
                      min={getTomorrowDate()}
                      className={`pl-10 h-10 text-sm border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                        !isFieldValid("date") ? "border-red-300 focus:ring-red-500 focus:border-red-500" : ""
                      }`}
                      required
                    />
                  </div>
                  {renderFieldError("date")}
                </div>

                <div>
                  <Label htmlFor="time" className="text-xs font-semibold text-slate-700 mb-2 block">
                    Time *
                  </Label>
                  <Select value={formData.time} onValueChange={(value) => updateField("time", value)}>
                    <SelectTrigger 
                      className={`h-10 text-sm border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                        !isFieldValid("time") ? "border-red-300 focus:ring-red-500 focus:border-red-500" : ""
                      }`}
                    >
                      <Clock className="w-4 h-4 mr-2 text-slate-400" />
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200">
                      {timeSlots.map((time) => (
                        <SelectItem 
                          key={time} 
                          value={time}
                          className="text-sm rounded-lg hover:bg-emerald-50 focus:bg-emerald-50"
                        >
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {renderFieldError("time")}
                </div>
              </div>
            </div>

            {/* Additional Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-xs font-semibold text-slate-700">
                Additional Message (Optional)
              </Label>
              <Textarea
                id="message"
                value={formData.message || ""}
                onChange={(e) => updateField("message", e.target.value)}
                placeholder="Any specific requirements or questions..."
                rows={3}
                className={`text-sm border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                  !isFieldValid("message") ? "border-red-300 focus:ring-red-500 focus:border-red-500" : ""
                }`}
              />
              {renderFieldError("message")}
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-500">{(formData.message || "").length}/500 characters</p>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-slate-100">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)} 
                className="flex-1 h-10 text-sm border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-all"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="flex-1 h-10 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-sm transition-all disabled:opacity-60"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  "Schedule Test Drive"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}