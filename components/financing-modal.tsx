/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState } from "react"
import { Calculator, Building, CreditCard, FileText, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import { useFormValidation } from "@/hooks/use-form-validation"
import { financingSchema } from "@/lib/validation"

interface FinancingModalProps {
  vehicle: {
    id: number
    title: string
    price: number
    dealer: {
      name: string
    }
  }
  children: React.ReactNode
}

const employmentTypes = [
  "Employed (Permanent)",
  "Employed (Contract)",
  "Self-Employed",
  "Business Owner",
  "Retired",
  "Other",
]

const monthlyIncomeRanges = [
  "Below KES 50,000",
  "KES 50,000 - 100,000",
  "KES 100,000 - 200,000",
  "KES 200,000 - 500,000",
  "Above KES 500,000",
]

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  idNumber: "",
  employmentType: "",
  employer: "",
  monthlyIncome: "",
  existingLoans: "",
  message: "",
}

export default function FinancingModal({ vehicle, children }: FinancingModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [downPayment, setDownPayment] = useState([vehicle.price * 0.2]) // 20% default
  const [loanTerm, setLoanTerm] = useState([60]) // 5 years default

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
    schema: financingSchema,
    initialData: initialFormData,
    onSubmit: async (data) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Financing request submitted:", data)
      setSubmitted(true)

      // Auto close after 3 seconds
      setTimeout(() => {
        setIsOpen(false)
        setSubmitted(false)
        reset()
      }, 3000)
    },
  })

  const calculateMonthlyPayment = () => {
    const principal = vehicle.price - downPayment[0]
    const monthlyRate = 0.12 / 12 // 12% annual rate
    const months = loanTerm[0]

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)

    return monthlyPayment
  }

  const formatPrice = (price: number) => {
    return `KES ${price.toLocaleString()}`
  }

  const renderFieldError = (field: keyof typeof formData) => {
    const error = getFieldError(field)
    return error ? <p className="text-xs text-red-500 mt-1.5 font-medium">{error}</p> : null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[95vh] overflow-y-auto bg-slate-50 border-0 shadow-2xl rounded-2xl p-0">
        <div className="bg-white rounded-t-2xl">
          <DialogHeader className="px-8 py-6 border-b border-slate-100">
            <DialogTitle className="flex items-center text-xl font-semibold text-slate-800">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                <CreditCard className="w-4 h-4 text-emerald-600" />
              </div>
              Request Financing
            </DialogTitle>
          </DialogHeader>
        </div>

        {submitted ? (
          <div className="px-8 py-12 bg-white">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Application Submitted!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Our financing team will review your application and contact you within 2 business days with pre-approval details.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-8 pb-8 space-y-6 bg-slate-50">
            {/* Vehicle & Loan Calculator */}
            <Card className="border-0 shadow-sm rounded-xl bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold text-slate-800 flex items-center">
                  <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center mr-2.5">
                    <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  Loan Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 pt-0">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="font-medium text-sm text-slate-800">{vehicle.title}</p>
                  <p className="text-xs text-slate-500 mt-1">Price: {formatPrice(vehicle.price)}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="text-xs font-medium text-slate-700 mb-2 block">
                      Down Payment: <span className="text-emerald-600 font-semibold">{formatPrice(downPayment[0])}</span>
                    </Label>
                    <Slider
                      value={downPayment}
                      onValueChange={setDownPayment}
                      max={vehicle.price * 0.5}
                      min={vehicle.price * 0.1}
                      step={50000}
                      className="[&_[role=slider]]:bg-emerald-600 [&_[role=slider]]:border-emerald-600 [&_.bg-primary]:bg-emerald-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1.5">
                      <span>10%</span>
                      <span>50%</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-slate-700 mb-2 block">
                      Loan Term: <span className="text-emerald-600 font-semibold">{loanTerm[0]} months</span>
                    </Label>
                    <Slider
                      value={loanTerm}
                      onValueChange={setLoanTerm}
                      max={84}
                      min={12}
                      step={12}
                      className="[&_[role=slider]]:bg-emerald-600 [&_[role=slider]]:border-emerald-600 [&_.bg-primary]:bg-emerald-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1.5">
                      <span>1 year</span>
                      <span>7 years</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Loan Amount</p>
                      <p className="font-bold text-sm text-slate-800">{formatPrice(vehicle.price - downPayment[0])}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Est. Monthly Payment</p>
                      <p className="font-bold text-sm text-emerald-700">{formatPrice(calculateMonthlyPayment())}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                    *Estimated at 12% annual interest rate. Actual rates may vary.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="border-0 shadow-sm rounded-xl bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-semibold text-slate-800">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs font-medium text-slate-700">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        onBlur={() => validateFieldOnBlur("name")}
                        placeholder="Your full name"
                        className={`h-9 text-sm border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-emerald-500 ${
                          !isFieldValid("name") ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                        }`}
                        required
                      />
                      {renderFieldError("name")}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="idNumber" className="text-xs font-medium text-slate-700">ID Number *</Label>
                      <Input
                        id="idNumber"
                        value={formData.idNumber}
                        onChange={(e) => updateField("idNumber", e.target.value.replace(/\D/g, ""))}
                        onBlur={() => validateFieldOnBlur("idNumber")}
                        placeholder="12345678"
                        maxLength={8}
                        className={`h-9 text-sm border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-emerald-500 ${
                          !isFieldValid("idNumber") ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                        }`}
                        required
                      />
                      {renderFieldError("idNumber")}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-medium text-slate-700">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        onBlur={() => validateFieldOnBlur("email")}
                        placeholder="your.email@example.com"
                        className={`h-9 text-sm border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-emerald-500 ${
                          !isFieldValid("email") ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                        }`}
                        required
                      />
                      {renderFieldError("email")}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-xs font-medium text-slate-700">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        onBlur={() => validateFieldOnBlur("phone")}
                        placeholder="+254 700 123 456"
                        className={`h-9 text-sm border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-emerald-500 ${
                          !isFieldValid("phone") ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                        }`}
                        required
                      />
                      {renderFieldError("phone")}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm rounded-xl bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-semibold text-slate-800 flex items-center">
                    <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center mr-2.5">
                      <Building className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    Employment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="employmentType" className="text-xs font-medium text-slate-700">Employment Type *</Label>
                      <Select
                        value={formData.employmentType}
                        onValueChange={(value) => updateField("employmentType", value)}
                      >
                        <SelectTrigger className={`h-9 text-sm border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-emerald-500 ${
                          !isFieldValid("employmentType") ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                        }`}>
                          <SelectValue placeholder="Select employment type" className="text-sm" />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg border-slate-200">
                          {employmentTypes.map((type) => (
                            <SelectItem key={type} value={type} className="text-sm rounded-md">
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {renderFieldError("employmentType")}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="employer" className="text-xs font-medium text-slate-700">Employer/Business Name *</Label>
                      <Input
                        id="employer"
                        value={formData.employer}
                        onChange={(e) => updateField("employer", e.target.value)}
                        onBlur={() => validateFieldOnBlur("employer")}
                        placeholder="Company or business name"
                        className={`h-9 text-sm border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-emerald-500 ${
                          !isFieldValid("employer") ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                        }`}
                        required
                      />
                      {renderFieldError("employer")}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="monthlyIncome" className="text-xs font-medium text-slate-700">Monthly Income Range *</Label>
                      <Select
                        value={formData.monthlyIncome}
                        onValueChange={(value) => updateField("monthlyIncome", value)}
                      >
                        <SelectTrigger className={`h-9 text-sm border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-emerald-500 ${
                          !isFieldValid("monthlyIncome") ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                        }`}>
                          <SelectValue placeholder="Select income range" className="text-sm" />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg border-slate-200">
                          {monthlyIncomeRanges.map((range) => (
                            <SelectItem key={range} value={range} className="text-sm rounded-md">
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {renderFieldError("monthlyIncome")}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="existingLoans" className="text-xs font-medium text-slate-700">Existing Loans (Optional)</Label>
                      <Input
                        id="existingLoans"
                        value={formData.existingLoans || ""}
                        onChange={(e) => updateField("existingLoans", e.target.value)}
                        onBlur={() => validateFieldOnBlur("existingLoans")}
                        placeholder="e.g., Mortgage, Personal loan"
                        className={`h-9 text-sm border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-emerald-500 ${
                          !isFieldValid("existingLoans") ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                        }`}
                      />
                      {renderFieldError("existingLoans")}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-xs font-medium text-slate-700">Additional Information (Optional)</Label>
                    <Textarea
                      id="message"
                      value={formData.message || ""}
                      onChange={(e) => updateField("message", e.target.value)}
                      onBlur={() => validateFieldOnBlur("message")}
                      placeholder="Any additional information that might help with your application..."
                      rows={3}
                      className={`text-sm border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-emerald-500 resize-none ${
                        !isFieldValid("message") ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                      }`}
                    />
                    {renderFieldError("message")}
                    <p className="text-xs text-slate-500 mt-1">{(formData.message || "").length}/500 characters</p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsOpen(false)} 
                  className="flex-1 h-10 text-sm border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="flex-1 h-10 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium shadow-sm"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}