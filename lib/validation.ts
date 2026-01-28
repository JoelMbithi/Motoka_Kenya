/* eslint-disable @typescript-eslint/no-unused-vars */
import { z, ZodError, ZodIssue } from "zod"

// Common validation patterns
const phoneRegex = /^\+254[17]\d{8}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const kraPin = /^P\d{9}[A-Z]$/
const businessRegNumber = /^C\.\d{6}$/
const drivingLicenseRegex = /^DL\d{9}$/
const idNumberRegex = /^\d{8}$/

// Base schemas
export const nameSchema = z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long")

export const emailSchema = z.string().email("Please enter a valid email address")

export const phoneSchema = z.string().regex(phoneRegex, "Please enter a valid Kenyan phone number (+254XXXXXXXXX)")

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")

// Dealer Registration Schema
export const dealerRegistrationSchema = z.object({
  // Business Information
  businessName: z.string().min(2, "Business name is required").max(100, "Business name is too long"),
  businessType: z.string().min(1, "Please select a business type"),
  registrationNumber: z.string().regex(businessRegNumber, "Please enter a valid registration number (C.123456)"),
  kraPin: z.string().regex(kraPin, "Please enter a valid KRA PIN (P123456789A)"),
  yearEstablished: z
    .number()
    .min(1950, "Year must be after 1950")
    .max(new Date().getFullYear(), "Year cannot be in the future"),

  // Contact Information
  contactPerson: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  whatsapp: z.string().optional(),
  website: z.string().url("Please enter a valid website URL").optional().or(z.literal("")),

  // Location
  county: z.string().min(1, "Please select a county"),
  town: z.string().min(2, "Town is required").max(50, "Town name is too long"),
  address: z.string().min(10, "Please provide a complete address").max(200, "Address is too long"),

  // Business Details
  description: z.string().min(50, "Description must be at least 50 characters").max(1000, "Description is too long"),
  specialties: z.array(z.string()).optional(),

  // Documents
  businessLicense: z.instanceof(File).optional().nullable(),
  kraDocument: z.instanceof(File).optional().nullable(),
  idCopy: z.instanceof(File).optional().nullable(),

  // Terms
  agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to the terms of service"),
  agreeToVerification: z
    .boolean()
    .refine((val) => val === true, "You must consent to verification of your information"),
})

// Test Drive Schema
export const testDriveSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  drivingLicense: z.string().regex(drivingLicenseRegex, "Please enter a valid driving license number (DL123456789)"),
  message: z.string().max(500, "Message is too long").optional(),
})

// Financing Schema
export const financingSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  idNumber: z.string().regex(idNumberRegex, "Please enter a valid 8-digit ID number"),
  employmentType: z.string().min(1, "Please select employment type"),
  employer: z.string().min(2, "Employer name is required").max(100, "Employer name is too long"),
  monthlyIncome: z.string().min(1, "Please select income range"),
  existingLoans: z.string().max(200, "Description is too long").optional(),
  message: z.string().max(500, "Message is too long").optional(),
})

// Contact Form Schema
export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  subject: z.string().min(5, "Subject must be at least 5 characters").max(100, "Subject is too long"),
  message: z.string().min(20, "Message must be at least 20 characters").max(1000, "Message is too long"),
})

// Login Schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
})

// Register Schema
export const registerSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to the terms of service"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

// Inquiry Schema
export const inquirySchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  message: z.string().min(10, "Message must be at least 10 characters").max(500, "Message is too long"),
})

// Utility functions for validation
export function validateForm<T>(schema: z.ZodSchema<T>, data: unknown) {
  try {
    const validatedData = schema.parse(data)
    return { isValid: true, data: validatedData, errors: {} }
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: Record<string, string> = {}
      error.issues.forEach((err: ZodIssue) => {
        const path = err.path.join(".")
        errors[path] = err.message
      })
      return { isValid: false, data: null, errors }
    }
    return { isValid: false, data: null, errors: { general: "Validation failed" } }
  }
}

export function validateField<T>(schema: z.ZodSchema<T>, value: unknown) {
  try {
    schema.parse(value)
    return { isValid: true, error: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.issues[0]?.message || "Invalid value" }
    }
    return { isValid: false, error: "Validation failed" }
  }
}