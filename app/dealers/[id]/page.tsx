"use client"
import { useState } from "react"
import { ArrowLeft, MapPin, Shield, Star, Phone, MessageCircle, Calendar, Car, Mail, Globe } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const mockDealer = {
  id: "1",
  name: "Premier Motors Kenya",
  location: "Nairobi, CBD",
  rating: 4.8,
  reviews: 127,
  totalListings: 45,
  coverImage: "/api/placeholder/1200/400",
  image: "/api/placeholder/300/200",
  verified: true,
  established: 2015,
  description: "Premier Motors Kenya has been serving customers across East Africa for over a decade. We specialize in luxury vehicles, premium automotive services, and provide comprehensive warranty coverage on all our vehicles. Our team of certified technicians ensures every vehicle meets the highest quality standards before delivery.",
  specialties: ["Luxury Cars", "SUVs", "Sedans", "4WD Vehicles"],
  businessType: "Authorized Dealer",
  county: "Nairobi",
  phone: "+254 722 123 456",
  whatsapp: "+254 722 123 456",
  email: "info@premiermotors.co.ke",
  website: "https://premiermotors.co.ke",
  address: "Mombasa Road, Industrial Area, Nairobi"
}

const mockVehicles = [
  {
    id: "1",
    title: "Toyota Land Cruiser Prado 2019",
    price: 4500000,
    images: ["/api/placeholder/300/200"],
    status: "active",
    mileage: "45,000 km",
    fuel: "Petrol",
    transmission: "Automatic",
    bodyType: "SUV"
  },
  {
    id: "2", 
    title: "Mercedes-Benz C200 2020",
    price: 3200000,
    images: ["/api/placeholder/300/200"],
    status: "active",
    mileage: "32,000 km",
    fuel: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan"
  },
  {
    id: "3",
    title: "BMW X5 2018",
    price: 5100000,
    images: ["/api/placeholder/300/200"],
    status: "active",
    mileage: "58,000 km",
    fuel: "Petrol",
    transmission: "Automatic",
    bodyType: "SUV"
  },
  {
    id: "4",
    title: "Audi A4 2021",
    price: 3800000,
    images: ["/api/placeholder/300/200"],
    status: "active",
    mileage: "28,000 km",
    fuel: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan"
  }
]

export default function DealerShowroomPage() {
  const dealer = mockDealer
  const dealerVehicles = mockVehicles
  const loading = false
  const vehiclesLoading = false
  const [activeTab, setActiveTab] = useState("vehicles")

  const formatPrice = (price: number) => {
    return `KES ${price.toLocaleString()}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-64 md:h-80 bg-slate-200 rounded-2xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="h-6 bg-slate-200 rounded mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3 mb-8"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-20 bg-slate-200 rounded-xl"></div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="h-64 bg-slate-200 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!dealer) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-slate-900 mb-2">Dealer Not Found</h1>
          <p className="text-sm text-slate-600 mb-4">The dealer you&aos;re looking for doesn&apos;t exist.</p>
          <button className="text-sm px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
            Back to Dealers
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Dealers</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xs">MK</span>
              </div>
              <span className="text-lg font-bold text-slate-900">Motoka Kenya</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="text-xs px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-1">
                <Phone className="w-3 h-3" />
                <span>Call</span>
              </button>
              <button className="text-xs px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-1">
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cover Section */}
      <div className="relative h-48 md:h-64">
        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
          <span className="text-slate-400 text-sm">Cover Image</span>
        </div>
        <div className="absolute inset-0 bg-slate-900/40 rounded-none" />
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-xl md:text-2xl font-bold">{dealer.name}</h1>
            {dealer.verified && (
              <div className="bg-emerald-600 text-white px-2 py-1 rounded-lg flex items-center space-x-1 text-xs">
                <Shield className="w-3 h-3" />
                <span>Verified</span>
              </div>
            )}
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            {dealer.location}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-slate-200">
                <Star className="w-5 h-5 mx-auto mb-1 text-yellow-400" />
                <div className="font-bold text-sm">{dealer.rating}</div>
                <div className="text-xs text-slate-600">Rating</div>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-slate-200">
                <MessageCircle className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                <div className="font-bold text-sm">{dealer.reviews}</div>
                <div className="text-xs text-slate-600">Reviews</div>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-slate-200">
                <Car className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                <div className="font-bold text-sm">{dealer.totalListings}</div>
                <div className="text-xs text-slate-600">Vehicles</div>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-slate-200">
                <Calendar className="w-5 h-5 mx-auto mb-1 text-purple-500" />
                <div className="font-bold text-sm">{dealer.established}</div>
                <div className="text-xs text-slate-600">Established</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1 mb-4">
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => setActiveTab("vehicles")}
                    className={`text-xs px-3 py-2 rounded-lg transition-colors ${
                      activeTab === "vehicles"
                        ? "bg-emerald-600 text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Vehicles ({dealerVehicles.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("about")}
                    className={`text-xs px-3 py-2 rounded-lg transition-colors ${
                      activeTab === "about"
                        ? "bg-emerald-600 text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    About
                  </button>
                </div>
              </div>

              {activeTab === "vehicles" && (
                <div>
                  {vehiclesLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-pulse">
                          <div className="bg-slate-200 h-40 w-full"></div>
                          <div className="p-4">
                            <div className="h-4 bg-slate-200 rounded mb-2"></div>
                            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : dealerVehicles.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-slate-500 text-sm">No vehicles available from this dealer.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dealerVehicles.map((vehicle) => (
                        <div key={vehicle.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                          <div className="relative">
                            <div className="w-full h-40 bg-slate-100 flex items-center justify-center">
                              <span className="text-slate-400 text-xs">Vehicle Image</span>
                            </div>
                            {vehicle.status === "active" && (
                              <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-lg text-xs">
                                Available
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-sm">{vehicle.title}</h3>
                              <span className="text-sm font-bold text-emerald-600">{formatPrice(vehicle.price)}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 mb-3">
                              <span>{vehicle.mileage}</span>
                              <span>{vehicle.fuel}</span>
                              <span>{vehicle.transmission}</span>
                              <span>{vehicle.bodyType}</span>
                            </div>
                            <div className="flex gap-2">
                              <button className="flex-1 text-xs px-3 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
                                <Link href={`/vehicle/${vehicle.id}`}>View Details</Link>
                              </button>
                              <button className="text-xs px-2 py-2 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
                                <Phone className="w-3 h-3" />
                              </button>
                              <button className="text-xs px-2 py-2 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
                                <MessageCircle className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {dealerVehicles.length > 0 && (
                    <div className="text-center mt-6">
                      <button className="text-xs px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
                       <Link href={`/browse?dealer=${dealer.id}`}>View All Vehicles</Link>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "about" && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-sm mb-2">About {dealer.name}</h3>
                      <p className="text-xs text-slate-700 leading-relaxed">{dealer.description}</p>
                    </div>

                    <hr className="border-slate-200" />

                    <div>
                      <h4 className="font-semibold text-xs mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {dealer.specialties.map((specialty) => (
                          <span key={specialty} className="bg-slate-100 text-slate-700 px-2 py-1 rounded-lg text-xs">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <hr className="border-slate-200" />

                    <div>
                      <h4 className="font-semibold text-xs mb-2">Business Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-slate-500">Business Type:</span>
                          <span className="ml-2 font-medium">{dealer.businessType}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Established:</span>
                          <span className="ml-2 font-medium">{dealer.established}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">County:</span>
                          <span className="ml-2 font-medium">{dealer.county}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Total Listings:</span>
                          <span className="ml-2 font-medium">{dealer.totalListings}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sticky top-20">
              <h3 className="font-semibold text-sm mb-4">Contact Information</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-slate-500" />
                  <span className="text-xs">{dealer.phone}</span>
                </div>
                {dealer.whatsapp && (
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-3 text-slate-500" />
                    <span className="text-xs">{dealer.whatsapp}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-slate-500" />
                  <span className="text-xs">{dealer.email}</span>
                </div>
                {dealer.website && (
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-3 text-slate-500" />
                    <a href={dealer.website} className="text-xs text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                  </div>
                )}
              </div>

              <hr className="border-slate-200 mb-4" />

              <div className="mb-4">
                <h4 className="font-semibold text-xs mb-2">Address</h4>
                <p className="text-xs text-slate-600">{dealer.address}</p>
              </div>

              <div className="space-y-2 mb-4">
                <button className="w-full text-xs px-3 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                  <Phone className="w-3 h-3" />
                  <span>Call Now</span>
                </button>
                {dealer.whatsapp && (
                  <button className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2">
                    <MessageCircle className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </button>
                )}
                <button className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2">
                  <Mail className="w-3 h-3" />
                  <span>Send Email</span>
                </button>
              </div>

              <hr className="border-slate-200 mb-4" />

              {/* Location Map Placeholder */}
              <div>
                <h4 className="font-semibold text-xs mb-2">Location</h4>
                <div className="bg-slate-100 h-24 rounded-xl flex items-center justify-center mb-2">
                  <div className="text-center text-slate-500">
                    <MapPin className="w-4 h-4 mx-auto mb-1" />
                    <p className="text-xs">Interactive Map</p>
                  </div>
                </div>
                <button className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}