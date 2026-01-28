/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react"
import { ArrowLeft, Upload, X, Save, CheckCircle } from "lucide-react"

const makes = ["Toyota", "Honda", "Nissan", "Mazda", "Subaru", "BMW", "Mercedes", "Audi", "Volkswagen", "Ford"]
const bodyTypes = ["SUV", "Sedan", "Hatchback", "Pickup", "Coupe", "Convertible", "Wagon", "Van"]
const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"]
const transmissions = ["Manual", "Automatic", "CVT"]
const counties = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale"]

const features = [
  "Air Conditioning", "Power Steering", "Power Windows", "Central Locking", "ABS Brakes", "Airbags",
  "Alloy Wheels", "Sunroof", "Leather Seats", "Navigation System", "Bluetooth", "Backup Camera",
  "Cruise Control", "Fog Lights", "Parking Sensors", "Keyless Entry",
]

export default function ModernizedAddListing() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<{
    make: string; model: string; year: string; bodyType: string; color: string; 
    mileage: string; engine: string; fuelType: string; transmission: string; 
    drivetrain: string; seats: string; price: string; negotiable: boolean;
    county: string; town: string; title: string; description: string; 
    features: string[]; images: File[]; contactPerson: string; phone: string; 
    whatsapp: string; showOnListing: boolean;
  }>({
    make: "", model: "", year: "", bodyType: "", color: "", mileage: "", engine: "",
    fuelType: "", transmission: "", drivetrain: "", seats: "", price: "", negotiable: false,
    county: "", town: "", title: "", description: "", features: [], images: [],
    contactPerson: "", phone: "", whatsapp: "", showOnListing: true,
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: keyof typeof formData, value: string | number | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files).slice(0, 10 - formData.images.length)
      setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }))
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const nextStep = () => currentStep < totalSteps && setCurrentStep(currentStep + 1)
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1)
  const handleSubmit = () => console.log("Listing submitted:", formData)

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-3 py-3">
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-2 text-stone-600 hover:text-stone-800 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-xs">MK</span>
              </div>
              <span className="text-lg font-semibold text-stone-800">Motoka Kenya</span>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-3 py-6">
        {/* Progress Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-stone-800 mb-1">Add New Vehicle Listing</h1>
          <p className="text-stone-600 text-sm mb-4">Fill in the details to create your vehicle listing</p>
          
          {/* Progress Indicator */}
          <div className="relative mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-stone-600">Step {currentStep} of {totalSteps}</span>
              <span className="text-xs text-stone-600">{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-1.5">
              <div 
                className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {/* Step indicators */}
            <div className="flex justify-between mt-2">
              {[1,2,3,4].map(step => (
                <div key={step} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 ${
                  step <= currentStep 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-stone-200 text-stone-500'
                }`}>
                  {step < currentStep ? <CheckCircle className="w-3 h-3" /> : step}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 1: Vehicle Information */}
        {currentStep === 1 && (
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Vehicle Information</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-stone-700 mb-1 block">Make *</label>
                  <select 
                    value={formData.make} 
                    onChange={(e) => handleInputChange("make", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  >
                    <option value="">Select make</option>
                    {makes.map(make => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-700 mb-1 block">Model *</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => handleInputChange("model", e.target.value)}
                    placeholder="e.g., Prado"
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-stone-700 mb-1 block">Year *</label>
                  <input
                    type="number"
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    value={formData.year}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                    placeholder="2020"
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-700 mb-1 block">Body Type *</label>
                  <select 
                    value={formData.bodyType} 
                    onChange={(e) => handleInputChange("bodyType", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  >
                    <option value="">Select type</option>
                    {bodyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-700 mb-1 block">Color *</label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                    placeholder="e.g., White"
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-stone-700 mb-1 block">Mileage (km) *</label>
                  <input
                    type="number"
                    value={formData.mileage}
                    onChange={(e) => handleInputChange("mileage", e.target.value)}
                    placeholder="45000"
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-700 mb-1 block">Engine Size *</label>
                  <input
                    type="text"
                    value={formData.engine}
                    onChange={(e) => handleInputChange("engine", e.target.value)}
                    placeholder="e.g., 2.7L"
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-stone-700 mb-1 block">Fuel Type *</label>
                  <select 
                    value={formData.fuelType} 
                    onChange={(e) => handleInputChange("fuelType", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  >
                    <option value="">Select fuel</option>
                    {fuelTypes.map(fuel => (
                      <option key={fuel} value={fuel}>{fuel}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-700 mb-1 block">Transmission *</label>
                  <select
                    value={formData.transmission}
                    onChange={(e) => handleInputChange("transmission", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  >
                    <option value="">Select transmission</option>
                    {transmissions.map(trans => (
                      <option key={trans} value={trans}>{trans}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-700 mb-1 block">Seats</label>
                  <input
                    type="number"
                    min="2"
                    max="9"
                    value={formData.seats}
                    onChange={(e) => handleInputChange("seats", e.target.value)}
                    placeholder="5"
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-stone-700 mb-1 block">Drivetrain</label>
                <select 
                  value={formData.drivetrain} 
                  onChange={(e) => handleInputChange("drivetrain", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                >
                  <option value="">Select drivetrain</option>
                  <option value="FWD">Front Wheel Drive (FWD)</option>
                  <option value="RWD">Rear Wheel Drive (RWD)</option>
                  <option value="AWD">All Wheel Drive (AWD)</option>
                  <option value="4WD">4 Wheel Drive (4WD)</option>
                </select>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  onClick={nextStep}
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Pricing & Location */}
        {currentStep === 2 && (
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Pricing & Location</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-stone-700 mb-1 block">Price (KES) *</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="4500000"
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    id="negotiable"
                    checked={formData.negotiable}
                    onChange={(e) => handleInputChange("negotiable", e.target.checked)}
                    className="w-3 h-3 text-emerald-600 bg-stone-100 border-stone-300 rounded focus:ring-emerald-500 focus:ring-1"
                  />
                  <label htmlFor="negotiable" className="text-xs text-stone-700">
                    Price is negotiable
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-stone-700 mb-1 block">County *</label>
                  <select 
                    value={formData.county} 
                    onChange={(e) => handleInputChange("county", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  >
                    <option value="">Select county</option>
                    {counties.map(county => (
                      <option key={county} value={county}>{county}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-700 mb-1 block">Town/Area *</label>
                  <input
                    type="text"
                    value={formData.town}
                    onChange={(e) => handleInputChange("town", e.target.value)}
                    placeholder="e.g., Westlands"
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button 
                  onClick={prevStep}
                  className="px-4 py-2 text-sm font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                >
                  Previous
                </button>
                <button 
                  onClick={nextStep}
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Description & Features */}
        {currentStep === 3 && (
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Description & Features</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-stone-700 mb-1 block">Listing Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., Toyota Prado 2020 - Excellent Condition"
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-700 mb-1 block">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe the vehicle's condition, history, and any special features..."
                  rows={5}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-700 mb-2 block">Features & Equipment</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto border border-stone-200 rounded-lg p-3 bg-stone-50">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={feature}
                        checked={formData.features.includes(feature)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleInputChange("features", [...formData.features, feature])
                          } else {
                            handleInputChange("features", formData.features.filter(f => f !== feature))
                          }
                        }}
                        className="w-3 h-3 text-emerald-600 bg-white border-stone-300 rounded focus:ring-emerald-500 focus:ring-1"
                      />
                      <label htmlFor={feature} className="text-xs text-stone-700">
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button 
                  onClick={prevStep}
                  className="px-4 py-2 text-sm font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                >
                  Previous
                </button>
                <button 
                  onClick={nextStep}
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Images & Contact */}
        {currentStep === 4 && (
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Images & Contact Information</h3>
            
            <div className="space-y-5">
              <div>
                <label className="text-xs font-medium text-stone-700 mb-2 block">Vehicle Images * (Max 10 images)</label>
                <div className="border-2 border-dashed border-stone-300 rounded-lg p-4 text-center bg-stone-50 hover:bg-stone-100 transition-colors">
                  <Upload className="mx-auto h-8 w-8 text-stone-400 mb-2" />
                  <div className="space-y-1">
                    <label className="cursor-pointer bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 inline-block text-sm font-medium transition-colors">
                      Choose Images
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => handleImageUpload(e.target.files)}
                      />
                    </label>
                    <p className="text-xs text-stone-500">
                      Upload high-quality images (JPG, PNG) - First image will be the main photo
                    </p>
                  </div>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-3">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-16 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 text-xs"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-1 left-1 bg-emerald-600 text-white text-xs px-1 rounded">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-stone-800 mb-3">Contact Information</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-stone-700 mb-1 block">Contact Person *</label>
                      <input
                        type="text"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                        placeholder="Your name"
                        className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-700 mb-1 block">Phone Number *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+254 700 123 456"
                        className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-700 mb-1 block">WhatsApp Number</label>
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                      placeholder="+254 700 123 456"
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="showOnListing"
                      checked={formData.showOnListing}
                      onChange={(e) => handleInputChange("showOnListing", e.target.checked)}
                      className="w-3 h-3 text-emerald-600 bg-stone-100 border-stone-300 rounded focus:ring-emerald-500 focus:ring-1"
                    />
                    <label htmlFor="showOnListing" className="text-xs text-stone-700">
                      Show contact information on listing
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Save className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-emerald-800">
                    Your listing will be reviewed within 24 hours before going live. You&apos;ll receive an email notification once approved.
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button 
                  onClick={prevStep}
                  className="px-4 py-2 text-sm font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                >
                  Previous
                </button>
                <button 
                  onClick={handleSubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Submit Listing</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}