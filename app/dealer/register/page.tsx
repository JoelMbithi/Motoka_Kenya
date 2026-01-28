"use client"

import { useState, useRef } from "react"
import { ArrowLeft, Upload, Check, AlertCircle, Building2, User, MapPin, FileText, X, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

const counties = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale",
  "Machakos", "Meru", "Nyeri", "Embu", "Garissa", "Kakamega", "Kericho", "Kilifi",
]

const businessTypes = ["Car Dealership", "Auto Showroom", "Used Car Lot", "Import/Export", "Rental Company"]

// Define interface for file with preview
interface FileWithPreview {
  file: File
  preview: string
}

const initialFormData = {
  businessName: "",
  businessType: "",
  registrationNumber: "",
  kraPin: "",
  yearEstablished: new Date().getFullYear(),
  contactPerson: "",
  email: "",
  phone: "",
  whatsapp: "",
  website: "",
  county: "",
  town: "",
  address: "",
  description: "",
  specialties: [] as string[],
  password: "", 
  confirmPassword: "", 
  profileImage: null as FileWithPreview | null, // CONTACT PERSON PROFILE IMAGE
  businessLicense: null as FileWithPreview | null,
  kraDocument: null as FileWithPreview | null,
  idCopy: null as FileWithPreview | null,
  logoImage: null as FileWithPreview | null, // BUSINESS LOGO
  coverImage: null as FileWithPreview | null, // BUSINESS COVER IMAGE
  galleryImages: [] as FileWithPreview[], // BUSINESS GALLERY IMAGES
  agreeToTerms: false,
  agreeToVerification: false,
}

type FormDataType = typeof initialFormData
type FormFieldKey = keyof FormDataType

export default function DealerRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  
  const totalSteps = 5 // Steps: 1. Business, 2. Contact, 3. Location, 4. Images, 5. Documents
  const progress = (currentStep / totalSteps) * 100

  // Create refs for file inputs
  const fileInputRefs = {
    profileImage: useRef<HTMLInputElement>(null),
    businessLicense: useRef<HTMLInputElement>(null),
    kraDocument: useRef<HTMLInputElement>(null),
    idCopy: useRef<HTMLInputElement>(null),
    logoImage: useRef<HTMLInputElement>(null),
    coverImage: useRef<HTMLInputElement>(null),
    galleryImages: useRef<HTMLInputElement>(null),
  }

  const updateField = (field: FormFieldKey, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.businessName) newErrors.businessName = "Business name is required"
        if (!formData.businessType) newErrors.businessType = "Business type is required"
        if (!formData.registrationNumber) newErrors.registrationNumber = "Registration number is required"
        if (!formData.kraPin) newErrors.kraPin = "KRA PIN is required"
        break
      case 2:
        if (!formData.contactPerson) newErrors.contactPerson = "Contact person is required"
        if (!formData.email) newErrors.email = "Email is required"
        if (!formData.phone) newErrors.phone = "Phone number is required"
        if (!formData.profileImage) newErrors.profileImage = "Profile image is required"
        // Password validation
        if (formData.password && formData.password.length < 6) {
          newErrors.password = "Password must be at least 6 characters"
        }
        if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match"
        }
        break
      case 3:
        if (!formData.county) newErrors.county = "County is required"
        if (!formData.town) newErrors.town = "Town is required"
        if (!formData.address) newErrors.address = "Address is required"
        if (!formData.description) newErrors.description = "Business description is required"
        if (formData.specialties.length === 0) newErrors.specialties = "Please select at least one specialty"
        break
      case 4:
        // Business images validation
        if (!formData.logoImage) newErrors.logoImage = "Business logo is required"
        if (!formData.coverImage) newErrors.coverImage = "Cover image is required"
        if (formData.galleryImages.length < 3) newErrors.galleryImages = "Please upload at least 3 gallery images"
        break
      case 5:
        // Document validation
        if (!formData.businessLicense) newErrors.businessLicense = "Business license is required"
        if (!formData.kraDocument) newErrors.kraDocument = "KRA certificate is required"
        if (!formData.idCopy) newErrors.idCopy = "ID copy is required"
        if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms"
        if (!formData.agreeToVerification) newErrors.agreeToVerification = "You must agree to verification"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFileUpload = (field: FormFieldKey, files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]
    
    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    const validDocumentTypes = ['application/pdf', 'image/jpeg', 'image/png']
    
    if (field === 'businessLicense' || field === 'kraDocument' || field === 'idCopy') {
      if (!validDocumentTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, [field]: 'Please upload PDF, JPG, or PNG files only' }))
        return
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB
        setErrors(prev => ({ ...prev, [field]: 'File size must be less than 10MB' }))
        return
      }
    } else {
      if (!validImageTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, [field]: 'Please upload image files only (JPG, PNG, GIF, WebP)' }))
        return
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setErrors(prev => ({ ...prev, [field]: 'Image size must be less than 5MB' }))
        return
      }
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      const fileWithPreview = { file, preview: reader.result as string }
      
      if (field === 'galleryImages') {
        updateField(field, [...formData.galleryImages, fileWithPreview])
      } else {
        updateField(field, fileWithPreview)
      }
      
      // Clear error
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: "" }))
      }
    }
    reader.readAsDataURL(file)
  }

  const removeFile = (field: FormFieldKey, index?: number) => {
    if (field === 'galleryImages' && index !== undefined) {
      const updatedGallery = formData.galleryImages.filter((_, i) => i !== index)
      updateField(field, updatedGallery)
    } else {
      updateField(field, null)
    }
  }

  const triggerFileInput = (field: keyof typeof fileInputRefs) => {
    const ref = fileInputRefs[field]
    if (ref?.current) {
      ref.current.click()
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return
    
    setIsSubmitting(true)
    setUploadProgress(0)
    
    try {
      console.log('Starting registration with files...')
      
      // Create FormData to handle file uploads
      const formDataToSend = new FormData()
      
      // Add all text fields
      const textFields = [
        'businessName', 'businessType', 'registrationNumber', 'kraPin',
        'yearEstablished', 'contactPerson', 'email', 'phone', 'whatsapp',
        'website', 'county', 'town', 'address', 'description', 'password',
        'confirmPassword', 'agreeToTerms', 'agreeToVerification'
      ] as const
      
      textFields.forEach(field => {
        const value = formData[field]
        if (value !== null && value !== undefined) {
          if (field === 'agreeToTerms' || field === 'agreeToVerification') {
            formDataToSend.append(field, value ? 'true' : 'false')
          } else {
            formDataToSend.append(field, String(value))
          }
        }
      })
      
      // Add specialties separately
      if (formData.specialties && formData.specialties.length > 0) {
        formDataToSend.append('specialties', JSON.stringify(formData.specialties))
      }
      
      // Add files with progress tracking
      const addFileWithProgress = (fileData: FileWithPreview | null, fieldName: string, progressIncrement: number) => {
        if (fileData) {
          formDataToSend.append(fieldName, fileData.file)
          setUploadProgress(prev => prev + progressIncrement)
        }
      }
      
      // Add all files
      addFileWithProgress(formData.profileImage, 'profileImage', 5)
      addFileWithProgress(formData.businessLicense, 'businessLicense', 5)
      addFileWithProgress(formData.kraDocument, 'kraDocument', 5)
      addFileWithProgress(formData.idCopy, 'idCopy', 5)
      addFileWithProgress(formData.logoImage, 'logoImage', 10)
      addFileWithProgress(formData.coverImage, 'coverImage', 10)
      
      // Add gallery images
      formData.galleryImages.forEach((image, index) => {
        formDataToSend.append(`galleryImage${index}`, image.file)
      })
      setUploadProgress(65)
      
      console.log('Sending registration data with files...')
      
      // Use the file upload API endpoint
      const response = await fetch('/api/auth/business-dealer-register', {
        method: 'POST',
        body: formDataToSend,
      })

      console.log('Response status:', response.status)
      
      const result = await response.json()
      console.log('Response data:', result)

      if (!response.ok) {
        throw new Error(result.message || result.error || `Registration failed: ${response.status}`)
      }
      
      setUploadProgress(100)
      console.log('Registration successful:', result)
      setSubmitted(true)
      alert('Registration successful! Your account is under review.')
      
    } catch (error: any) {
      console.error('Registration error:', error)
      alert('Registration failed: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const stepIcons = [Building2, User, MapPin, ImageIcon, FileText] as const
  const stepTitles = ["Business Info", "Contact Details", "Location", "Images", "Documents"]

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-center text-green-600 flex items-center justify-center">
              <Check className="w-8 h-8 mr-2" />
              Registration Successful!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-slate-700">
              Your business dealer registration has been submitted successfully.
            </p>
            <p className="text-sm text-slate-600">
              Your application is now under review. You will receive an email notification once it's approved.
            </p>
            <div className="pt-4">
              <Button asChild className="w-full">
                <Link href="/dealers">Back to Dealers</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dealers" className="flex items-center space-x-2 text-slate-600 hover:text-green-600 transition-colors duration-200">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Dealers</span>
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

      <div className="container mx-auto px-6 py-12 max-w-2xl">
        {/* Progress Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Become a Verified Dealer</h1>
          <p className="text-slate-600 mb-6">Join Kenya&apos;s leading vehicle marketplace</p>
          
          {/* Step Indicators */}
          <div className="flex items-center justify-between mb-6">
            {Array.from({ length: totalSteps }, (_, i) => {
              const stepNum = i + 1
              const Icon = stepIcons[i]
              const isActive = currentStep === stepNum
              const isCompleted = currentStep > stepNum
              
              return (
                <div key={stepNum} className="flex flex-col items-center flex-1 relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted ? 'bg-green-600 text-white shadow-md' :
                    isActive ? 'bg-green-100 text-green-600 border-2 border-green-600' :
                    'bg-slate-100 text-slate-400'
                  }`}>
                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs font-medium mt-2 transition-colors duration-300 ${
                    isActive ? 'text-green-600' : isCompleted ? 'text-green-600' : 'text-slate-400'
                  }`}>
                    {stepTitles[i]}
                  </span>
                  {i < totalSteps - 1 && (
                    <div className={`hidden sm:block absolute h-0.5 w-16 top-5 left-10 transition-colors duration-300 ${
                      isCompleted ? 'bg-green-600' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>

          <div className="mb-2">
            <div className="flex justify-between text-xs text-slate-600 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-1.5 bg-slate-200" />
          </div>
        </div>

        {/* Step 1: Business Information */}
        {currentStep === 1 && (
          <Card className="border-0 shadow-xl shadow-green-100/20 bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                <Building2 className="w-5 h-5 text-green-600 mr-2" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName" className="text-sm font-medium text-slate-700">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => updateField("businessName", e.target.value)}
                    placeholder="e.g., Premium Motors Ltd"
                    className={`mt-1.5 h-10 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                      errors.businessName ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.businessName && <p className="text-xs text-red-600 mt-1">{errors.businessName}</p>}
                </div>
                <div>
                  <Label htmlFor="businessType" className="text-sm font-medium text-slate-700">Business Type *</Label>
                  <Select value={formData.businessType} onValueChange={(value) => updateField("businessType", value)}>
                    <SelectTrigger className={`mt-1.5 h-10 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 ${
                      errors.businessType ? 'border-red-300' : ''
                    }`}>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.businessType && <p className="text-xs text-red-600 mt-1">{errors.businessType}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="registrationNumber" className="text-sm font-medium text-slate-700">Registration Number *</Label>
                  <Input
                    id="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={(e) => updateField("registrationNumber", e.target.value.toUpperCase())}
                    placeholder="e.g., C.123456"
                    className={`mt-1.5 h-10 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                      errors.registrationNumber ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.registrationNumber && <p className="text-xs text-red-600 mt-1">{errors.registrationNumber}</p>}
                </div>
                <div>
                  <Label htmlFor="kraPin" className="text-sm font-medium text-slate-700">KRA PIN *</Label>
                  <Input
                    id="kraPin"
                    value={formData.kraPin}
                    onChange={(e) => updateField("kraPin", e.target.value.toUpperCase())}
                    placeholder="e.g., P123456789A"
                    className={`mt-1.5 h-10 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                      errors.kraPin ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.kraPin && <p className="text-xs text-red-600 mt-1">{errors.kraPin}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="yearEstablished" className="text-sm font-medium text-slate-700">Year Established *</Label>
                <Input
                  id="yearEstablished"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={formData.yearEstablished}
                  onChange={(e) => updateField("yearEstablished", Number.parseInt(e.target.value) || new Date().getFullYear())}
                  placeholder="e.g., 2015"
                  className="mt-1.5 h-10 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  onClick={nextStep}
                  className="px-8 h-10 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Next Step
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Contact Information with Profile Image */}
        {currentStep === 2 && (
          <Card className="border-0 shadow-xl shadow-green-100/20 bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                <User className="w-5 h-5 text-green-600 mr-2" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Profile Image Upload */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium text-slate-700">
                    Contact Person Photo *
                  </Label>
                  <span className="text-xs text-slate-500">Profile picture of contact person</span>
                </div>
                <input
                  type="file"
                  ref={fileInputRefs.profileImage}
                  onChange={(e) => handleFileUpload("profileImage", e.target.files)}
                  accept="image/*"
                  className="hidden"
                />
                
                {formData.profileImage ? (
                  <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-200 shadow-sm">
                      <img
                        src={formData.profileImage.preview}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => removeFile("profileImage")}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => triggerFileInput("profileImage")}
                    className="w-24 h-24 border-2 border-dashed border-slate-300 rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors"
                  >
                    <User className="w-8 h-8 text-slate-400 mb-1" />
                    <span className="text-xs text-slate-500 text-center">Upload Photo</span>
                  </div>
                )}
                {errors.profileImage && <p className="text-xs text-red-600 mt-2">{errors.profileImage}</p>}
              </div>

              <div>
                <Label htmlFor="contactPerson" className="text-sm font-medium text-slate-700">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => updateField("contactPerson", e.target.value)}
                  placeholder="Full name of primary contact"
                  className={`mt-1.5 h-10 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.contactPerson ? 'border-red-300' : ''
                  }`}
                />
                {errors.contactPerson && <p className="text-xs text-red-600 mt-1">{errors.contactPerson}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="business@example.com"
                    className={`mt-1.5 h-10 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                      errors.email ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+254 700 123 456"
                    className={`mt-1.5 h-10 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                      errors.phone ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password (Optional)</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    placeholder="Create a password"
                    className={`mt-1.5 h-10 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                      errors.password ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
                  <p className="text-xs text-slate-500 mt-1">Leave blank to auto-generate</p>
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">Confirm Password (Optional)</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                    placeholder="Confirm password"
                    className={`mt-1.5 h-10 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                      errors.confirmPassword ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="whatsapp" className="text-sm font-medium text-slate-700">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => updateField("whatsapp", e.target.value)}
                    placeholder="+254 700 123 456"
                    className="mt-1.5 h-10 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="website" className="text-sm font-medium text-slate-700">Website (Optional)</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => updateField("website", e.target.value)}
                    placeholder="https://www.yourwebsite.com"
                    className="mt-1.5 h-10 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  className="px-8 h-10 border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-all duration-200"
                >
                  Previous
                </Button>
                <Button 
                  onClick={nextStep}
                  className="px-8 h-10 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Next Step
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Location & Business Details */}
        {currentStep === 3 && (
          <Card className="border-0 shadow-xl shadow-green-100/20 bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                <MapPin className="w-5 h-5 text-green-600 mr-2" />
                Location & Business Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="county" className="text-sm font-medium text-slate-700">County *</Label>
                  <Select value={formData.county} onValueChange={(value) => updateField("county", value)}>
                    <SelectTrigger className={`mt-1.5 h-10 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 ${
                      errors.county ? 'border-red-300' : ''
                    }`}>
                      <SelectValue placeholder="Select county" />
                    </SelectTrigger>
                    <SelectContent>
                      {counties.map((county) => (
                        <SelectItem key={county} value={county}>{county}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.county && <p className="text-xs text-red-600 mt-1">{errors.county}</p>}
                </div>
                <div>
                  <Label htmlFor="town" className="text-sm font-medium text-slate-700">Town/City *</Label>
                  <Input
                    id="town"
                    value={formData.town}
                    onChange={(e) => updateField("town", e.target.value)}
                    placeholder="e.g., Westlands"
                    className={`mt-1.5 h-10 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                      errors.town ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.town && <p className="text-xs text-red-600 mt-1">{errors.town}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-sm font-medium text-slate-700">Physical Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  placeholder="Complete physical address of your showroom/office"
                  rows={3}
                  className={`mt-1.5 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none ${
                    errors.address ? 'border-red-300' : ''
                  }`}
                />
                {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium text-slate-700">Business Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Describe your business, services, and what makes you unique"
                  rows={4}
                  className={`mt-1.5 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none ${
                    errors.description ? 'border-red-300' : ''
                  }`}
                />
                {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
                <p className="text-xs text-slate-500 mt-1">{formData.description.length}/1000 characters</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-700">Specialties (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {[
                    "SUVs", "Sedans", "Luxury Cars", "Japanese Cars", "4WD Vehicles", 
                    "Hybrids", "Commercial Vehicles", "Motorcycles"
                  ].map((specialty) => (
                    <div key={specialty} className="flex items-center space-x-2">
                      <Checkbox
                        id={specialty}
                        checked={formData.specialties?.includes(specialty) || false}
                        onCheckedChange={(checked) => {
                          const currentSpecialties = formData.specialties || []
                          if (checked) {
                            updateField("specialties", [...currentSpecialties, specialty])
                          } else {
                            updateField("specialties", currentSpecialties.filter((s) => s !== specialty))
                          }
                        }}
                        className="w-4 h-4 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <Label htmlFor={specialty} className="text-xs text-slate-700 font-medium">
                        {specialty}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.specialties && <p className="text-xs text-red-600 mt-2">{errors.specialties}</p>}
              </div>

              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  className="px-8 h-10 border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-all duration-200"
                >
                  Previous
                </Button>
                <Button 
                  onClick={nextStep}
                  className="px-8 h-10 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Next Step
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Business Images */}
        {currentStep === 4 && (
          <Card className="border-0 shadow-xl shadow-green-100/20 bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                <ImageIcon className="w-5 h-5 text-green-600 mr-2" />
                Business Images
              </CardTitle>
              <p className="text-sm text-slate-600">Upload images to showcase your business</p>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Logo Image */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium text-slate-700">
                    Business Logo *
                  </Label>
                  <span className="text-xs text-slate-500">Square image recommended</span>
                </div>
                <input
                  type="file"
                  ref={fileInputRefs.logoImage}
                  onChange={(e) => handleFileUpload("logoImage", e.target.files)}
                  accept="image/*"
                  className="hidden"
                />
                
                {formData.logoImage ? (
                  <div className="relative inline-block">
                    <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-green-200 shadow-sm">
                      <img
                        src={formData.logoImage.preview}
                        alt="Logo preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => removeFile("logoImage")}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => triggerFileInput("logoImage")}
                    className="w-32 h-32 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors"
                  >
                    <Upload className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-xs text-slate-500 text-center">Upload Logo</span>
                  </div>
                )}
                {errors.logoImage && <p className="text-xs text-red-600 mt-2">{errors.logoImage}</p>}
              </div>

              {/* Cover Image */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium text-slate-700">
                    Cover Image *
                  </Label>
                  <span className="text-xs text-slate-500">16:9 ratio recommended</span>
                </div>
                <input
                  type="file"
                  ref={fileInputRefs.coverImage}
                  onChange={(e) => handleFileUpload("coverImage", e.target.files)}
                  accept="image/*"
                  className="hidden"
                />
                
                {formData.coverImage ? (
                  <div className="relative">
                    <div className="w-full h-48 rounded-lg overflow-hidden border-2 border-green-200 shadow-sm">
                      <img
                        src={formData.coverImage.preview}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => removeFile("coverImage")}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => triggerFileInput("coverImage")}
                    className="w-full h-48 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors"
                  >
                    <Upload className="w-12 h-12 text-slate-400 mb-3" />
                    <span className="text-sm text-slate-600">Upload Cover Image</span>
                    <span className="text-xs text-slate-500 mt-1">Recommended: 1200×400px</span>
                  </div>
                )}
                {errors.coverImage && <p className="text-xs text-red-600 mt-2">{errors.coverImage}</p>}
              </div>

              {/* Gallery Images */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium text-slate-700">
                    Gallery Images *
                    <span className="ml-2 text-xs font-normal text-slate-500">
                      ({formData.galleryImages.length}/10 uploaded)
                    </span>
                  </Label>
                  <span className="text-xs text-slate-500">At least 3 images required</span>
                </div>
                <input
                  type="file"
                  ref={fileInputRefs.galleryImages}
                  onChange={(e) => handleFileUpload("galleryImages", e.target.files)}
                  accept="image/*"
                  className="hidden"
                  multiple
                />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {formData.galleryImages.map((image, index) => (
                    <div key={index} className="relative">
                      <div className="aspect-square rounded-lg overflow-hidden border-2 border-green-200 shadow-sm">
                        <img
                          src={image.preview}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => removeFile("galleryImages", index)}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  
                  {formData.galleryImages.length < 10 && (
                    <div
                      onClick={() => triggerFileInput("galleryImages")}
                      className="aspect-square border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors"
                    >
                      <Upload className="w-6 h-6 text-slate-400 mb-1" />
                      <span className="text-xs text-slate-500 text-center">Add Image</span>
                    </div>
                  )}
                </div>
                
                {errors.galleryImages && <p className="text-xs text-red-600">{errors.galleryImages}</p>}
                
                <div className="text-xs text-slate-500">
                  <p>Upload images of your showroom, vehicles, or team. Minimum 3 images, maximum 10.</p>
                  <p>Each image should be less than 5MB. Supported formats: JPG, PNG, GIF, WebP.</p>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  className="px-8 h-10 border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-all duration-200"
                >
                  Previous
                </Button>
                <Button 
                  onClick={nextStep}
                  className="px-8 h-10 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Next Step
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Documents & Terms */}
        {currentStep === 5 && (
          <Card className="border-0 shadow-xl shadow-green-100/20 bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                <FileText className="w-5 h-5 text-green-600 mr-2" />
                Documents & Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-4">Required Documents</h3>
                <div className="space-y-6">
                  {/* Business License Upload */}
                  <div>
                    <Label className="text-sm font-medium text-slate-700 mb-3 block">
                      Business License *
                      <span className="ml-2 text-xs font-normal text-slate-500">PDF, JPG, PNG up to 10MB</span>
                    </Label>
                    <input
                      type="file"
                      ref={fileInputRefs.businessLicense}
                      onChange={(e) => handleFileUpload("businessLicense", e.target.files)}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                    
                    {formData.businessLicense ? (
                      <div className="relative p-4 border-2 border-green-200 rounded-lg bg-green-50">
                        <div className="flex items-center">
                          <FileText className="w-8 h-8 text-green-600 mr-3" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-800">{formData.businessLicense.file.name}</p>
                            <p className="text-xs text-slate-500">
                              {(formData.businessLicense.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <button
                            onClick={() => removeFile("businessLicense")}
                            className="p-1 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => triggerFileInput("businessLicense")}
                        className="p-8 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors"
                      >
                        <Upload className="w-12 h-12 text-slate-400 mb-3" />
                        <p className="text-sm text-slate-600 text-center">Click to upload Business License</p>
                        <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                      </div>
                    )}
                    {errors.businessLicense && <p className="text-xs text-red-600 mt-2">{errors.businessLicense}</p>}
                  </div>

                  {/* KRA Document Upload */}
                  <div>
                    <Label className="text-sm font-medium text-slate-700 mb-3 block">
                      KRA PIN Certificate *
                      <span className="ml-2 text-xs font-normal text-slate-500">PDF, JPG, PNG up to 10MB</span>
                    </Label>
                    <input
                      type="file"
                      ref={fileInputRefs.kraDocument}
                      onChange={(e) => handleFileUpload("kraDocument", e.target.files)}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                    
                    {formData.kraDocument ? (
                      <div className="relative p-4 border-2 border-green-200 rounded-lg bg-green-50">
                        <div className="flex items-center">
                          <FileText className="w-8 h-8 text-green-600 mr-3" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-800">{formData.kraDocument.file.name}</p>
                            <p className="text-xs text-slate-500">
                              {(formData.kraDocument.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <button
                            onClick={() => removeFile("kraDocument")}
                            className="p-1 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => triggerFileInput("kraDocument")}
                        className="p-8 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors"
                      >
                        <Upload className="w-12 h-12 text-slate-400 mb-3" />
                        <p className="text-sm text-slate-600 text-center">Click to upload KRA Certificate</p>
                        <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                      </div>
                    )}
                    {errors.kraDocument && <p className="text-xs text-red-600 mt-2">{errors.kraDocument}</p>}
                  </div>

                  {/* ID Copy Upload */}
                  <div>
                    <Label className="text-sm font-medium text-slate-700 mb-3 block">
                      ID Copy (Contact Person) *
                      <span className="ml-2 text-xs font-normal text-slate-500">PDF, JPG, PNG up to 10MB</span>
                    </Label>
                    <input
                      type="file"
                      ref={fileInputRefs.idCopy}
                      onChange={(e) => handleFileUpload("idCopy", e.target.files)}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                    
                    {formData.idCopy ? (
                      <div className="relative p-4 border-2 border-green-200 rounded-lg bg-green-50">
                        <div className="flex items-center">
                          <FileText className="w-8 h-8 text-green-600 mr-3" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-800">{formData.idCopy.file.name}</p>
                            <p className="text-xs text-slate-500">
                              {(formData.idCopy.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <button
                            onClick={() => removeFile("idCopy")}
                            className="p-1 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => triggerFileInput("idCopy")}
                        className="p-8 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors"
                      >
                        <Upload className="w-12 h-12 text-slate-400 mb-3" />
                        <p className="text-sm text-slate-600 text-center">Click to upload ID Copy</p>
                        <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                      </div>
                    )}
                    {errors.idCopy && <p className="text-xs text-red-600 mt-2">{errors.idCopy}</p>}
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => updateField("agreeToTerms", !!checked)}
                    className={`w-4 h-4 mt-0.5 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 ${
                      errors.agreeToTerms ? 'border-red-300' : ''
                    }`}
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm text-slate-700">
                    I agree to the{" "}
                    <Link href="/terms" className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {errors.agreeToTerms && <p className="text-xs text-red-600 ml-7">{errors.agreeToTerms}</p>}

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToVerification"
                    checked={formData.agreeToVerification}
                    onCheckedChange={(checked) => updateField("agreeToVerification", !!checked)}
                    className={`w-4 h-4 mt-0.5 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 ${
                      errors.agreeToVerification ? 'border-red-300' : ''
                    }`}
                  />
                  <Label htmlFor="agreeToVerification" className="text-sm text-slate-700">
                    I consent to verification of my business information and documents by Motoka Kenya
                  </Label>
                </div>
                {errors.agreeToVerification && <p className="text-xs text-red-600 ml-7">{errors.agreeToVerification}</p>}
              </div>

              {/* Progress bar during submission */}
              {isSubmitting && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Uploading files...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2 bg-slate-200" />
                </div>
              )}

              <Alert className="border-blue-200 bg-blue-50">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-sm text-blue-800">
                  Your application will be reviewed within 2-3 business days. You&apos;ll receive an email notification once approved.
                </AlertDescription>
              </Alert>

              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  className="px-8 h-10 border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-all duration-200"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.agreeToTerms || !formData.agreeToVerification}
                  className="px-8 h-10 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}