"use client"
import { useState, useEffect } from "react"
import { ArrowLeft, MapPin, Shield, Star, Phone, MessageCircle, Calendar, Car, Mail, Globe, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Types
interface Dealer {
  id: string
  name: string
  location: string
  rating: number
  reviews: number
  totalListings: number
  image: string
  logoUrl?: string
  coverImage?: string
  userImage?: string
  verified: boolean
  established: number
  description: string
  specialties: string[]
  contactPerson: string
  phone: string
  email: string
  whatsapp?: string
  website?: string
  address: string
  county: string
  town: string
  businessType: string
  registrationNumber?: string
  kraPin: string
  userId: string
  businessLicensePath?: string
  kraDocumentPath?: string
  idCopyPath?: string
  gallery?: string[]
}

interface Vehicle {
  id: string
  title: string
  price: number
  images: string[]
  status: string
  mileage: string
  fuel: string
  transmission: string
  bodyType: string
  year: number
  make: string
  model: string
}

export default function DealerShowroomPage() {
  const params = useParams()
  const dealerId = params.id as string
  
  const [dealer, setDealer] = useState<Dealer | null>(null)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [vehiclesLoading, setVehiclesLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("vehicles")

  // Fetch dealer data
  useEffect(() => {
    const fetchDealer = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/dealers/${dealerId}`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch dealer: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data.success === false) {
          throw new Error(data.error || 'Failed to fetch dealer')
        }
        
        console.log('Dealer data:', data)
        setDealer(data)
      } catch (err: any) {
        console.error('Error fetching dealer:', err)
        setDealer(null)
      } finally {
        setLoading(false)
      }
    }

    if (dealerId) {
      fetchDealer()
    }
  }, [dealerId])

  // Fetch dealer vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setVehiclesLoading(true)
        const response = await fetch(`/api/dealers/${dealerId}/vehicles`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch vehicles: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data.success === false) {
          throw new Error(data.error || 'Failed to fetch vehicles')
        }
        
        setVehicles(data)
      } catch (err: any) {
        console.error('Error fetching vehicles:', err)
        setVehicles([])
      } finally {
        setVehiclesLoading(false)
      }
    }

    if (dealerId && dealer) {
      fetchVehicles()
    }
  }, [dealerId, dealer])

  const formatPrice = (price: number) => {
    return `KES ${price.toLocaleString()}`
  }

  const getWhatsAppLink = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '')
    return `https://wa.me/${cleanPhone}`
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
          <p className="text-sm text-slate-600 mb-4">The dealer you're looking for doesn't exist.</p>
          <Link 
            href="/dealers"
            className="inline-block text-sm px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Back to Dealers
          </Link>
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
            <Link 
              href="/dealers" 
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Dealers</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xs">MK</span>
              </div>
              <span className="text-lg font-bold text-slate-900">Motoka Kenya</span>
            </div>
            
            <div className="flex items-center gap-2">
              <a 
                href={`tel:${dealer.phone}`}
                className="text-xs px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-1"
              >
                <Phone className="w-3 h-3" />
                <span>Call</span>
              </a>
              {dealer.whatsapp && (
                <a 
                  href={getWhatsAppLink(dealer.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-1"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Cover Section - Using dealer's cover image */}
      <div className="relative h-48 md:h-64">
        {dealer.coverImage ? (
          <div className="w-full h-full overflow-hidden">
            <img 
              src={dealer.coverImage} 
              alt={`${dealer.name} cover`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.parentElement) {
                  e.currentTarget.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-r from-slate-200 to-slate-300 flex items-center justify-center"><span class="text-slate-400 text-sm">Cover Image</span></div>';
                }
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-slate-200 to-slate-300 flex items-center justify-center">
            <span className="text-slate-400 text-sm">Cover Image</span>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-slate-900/40" />
        
        {/* Logo badge on cover */}
        {dealer.logoUrl && (
          <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full p-2 shadow-lg">
            <img 
              src={dealer.logoUrl} 
              alt={`${dealer.name} logo`}
              className="w-full h-full object-contain rounded-full"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.parentElement) {
                  e.currentTarget.parentElement.innerHTML = '<div class="w-full h-full rounded-full bg-emerald-100 flex items-center justify-center"><ImageIcon className="w-8 h-8 text-emerald-600" /></div>';
                }
              }}
            />
          </div>
        )}
        
        {/* Dealer info on cover */}
        <div className="absolute bottom-4 right-4 text-white text-right">
          <div className="flex items-center justify-end gap-3 mb-2">
            {dealer.verified && (
              <div className="bg-emerald-600 text-white px-2 py-1 rounded-lg flex items-center space-x-1 text-xs">
                <Shield className="w-3 h-3" />
                <span>Verified</span>
              </div>
            )}
            <h1 className="text-xl md:text-2xl font-bold">{dealer.name}</h1>
          </div>
          <div className="flex items-center justify-end text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            {dealer.location || `${dealer.town}, ${dealer.county}`}
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
                <div className="font-bold text-sm">{dealer.rating.toFixed(1)}</div>
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
                    Vehicles ({vehicles.length})
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
                  ) : vehicles.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-slate-500 text-sm">No vehicles available from this dealer.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {vehicles.map((vehicle) => (
                        <div key={vehicle.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                          <div className="relative">
                            {vehicle.images && vehicle.images.length > 0 ? (
                              <div className="w-full h-40 overflow-hidden">
                                <img 
                                  src={vehicle.images[0]} 
                                  alt={vehicle.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    if (e.currentTarget.parentElement) {
                                      e.currentTarget.parentElement.innerHTML = '<div class="w-full h-full bg-slate-100 flex items-center justify-center"><span class="text-slate-400 text-xs">Vehicle Image</span></div>';
                                    }
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="w-full h-40 bg-slate-100 flex items-center justify-center">
                                <span className="text-slate-400 text-xs">Vehicle Image</span>
                              </div>
                            )}
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
                              <span>{vehicle.year} • {vehicle.mileage}</span>
                              <span>{vehicle.fuel}</span>
                              <span>{vehicle.transmission}</span>
                              <span>{vehicle.bodyType}</span>
                            </div>
                            <div className="flex gap-2">
                              <Link 
                                href={`/vehicle/${vehicle.id}`}
                                className="flex-1 text-xs px-3 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors text-center"
                              >
                                View Details
                              </Link>
                              <a 
                                href={`tel:${dealer.phone}`}
                                className="text-xs px-2 py-2 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center"
                              >
                                <Phone className="w-3 h-3" />
                              </a>
                              {dealer.whatsapp && (
                                <a 
                                  href={getWhatsAppLink(dealer.whatsapp)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs px-2 py-2 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center"
                                >
                                  <MessageCircle className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {vehicles.length > 0 && (
                    <div className="text-center mt-6">
                      <Link 
                        href={`/browse?dealer=${dealer.id}`}
                        className="text-xs px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors inline-block"
                      >
                        View All Vehicles
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "about" && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-sm mb-2">About {dealer.name}</h3>
                      <p className="text-xs text-slate-700 leading-relaxed">{dealer.description || `${dealer.businessType} located in ${dealer.town}, ${dealer.county}.`}</p>
                    </div>

                    <hr className="border-slate-200" />

                    <div>
                      <h4 className="font-semibold text-xs mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {dealer.specialties && dealer.specialties.length > 0 ? (
                          dealer.specialties.map((specialty) => (
                            <span key={specialty} className="bg-slate-100 text-slate-700 px-2 py-1 rounded-lg text-xs">
                              {specialty}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-500 text-xs">No specialties listed</span>
                        )}
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
                          <span className="text-slate-500">Town:</span>
                          <span className="ml-2 font-medium">{dealer.town}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Contact Person:</span>
                          <span className="ml-2 font-medium">{dealer.contactPerson}</span>
                        </div>
                        {dealer.registrationNumber && (
                          <div>
                            <span className="text-slate-500">Registration:</span>
                            <span className="ml-2 font-medium">{dealer.registrationNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Gallery Section */}
                    {dealer.gallery && dealer.gallery.length > 0 && (
                      <>
                        <hr className="border-slate-200" />
                        <div>
                          <h4 className="font-semibold text-xs mb-2">Gallery</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {dealer.gallery.slice(0, 6).map((image, index) => (
                              <div key={index} className="aspect-square rounded-lg overflow-hidden">
                                <img 
                                  src={image} 
                                  alt={`Gallery ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    if (e.currentTarget.parentElement) {
                                      e.currentTarget.parentElement.innerHTML = '<div class="w-full h-full bg-slate-100 flex items-center justify-center"><ImageIcon className="w-4 h-4 text-slate-400" /></div>';
                                    }
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
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
                  <a href={`tel:${dealer.phone}`} className="text-xs hover:text-emerald-600 transition-colors">
                    {dealer.phone}
                  </a>
                </div>
                {dealer.whatsapp && (
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-3 text-slate-500" />
                    <a 
                      href={getWhatsAppLink(dealer.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs hover:text-emerald-600 transition-colors"
                    >
                      {dealer.whatsapp}
                    </a>
                  </div>
                )}
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-slate-500" />
                  <a href={`mailto:${dealer.email}`} className="text-xs hover:text-emerald-600 transition-colors">
                    {dealer.email}
                  </a>
                </div>
                {dealer.website && (
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-3 text-slate-500" />
                    <a 
                      href={dealer.website} 
                      className="text-xs text-emerald-600 hover:underline" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>

              <hr className="border-slate-200 mb-4" />

              <div className="mb-4">
                <h4 className="font-semibold text-xs mb-2">Address</h4>
                <p className="text-xs text-slate-600">{dealer.address || `${dealer.town}, ${dealer.county}`}</p>
              </div>

              <div className="space-y-2 mb-4">
                <a 
                  href={`tel:${dealer.phone}`}
                  className="block w-full text-xs px-3 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call Now</span>
                </a>
                {dealer.whatsapp && (
                  <a 
                    href={getWhatsAppLink(dealer.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                )}
                <a 
                  href={`mailto:${dealer.email}`}
                  className="block w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Mail className="w-3 h-3" />
                  <span>Send Email</span>
                </a>
              </div>

              <hr className="border-slate-200 mb-4" />

              {/* Location Map Placeholder */}
              <div>
                <h4 className="font-semibold text-xs mb-2">Location</h4>
                <div className="bg-slate-100 h-24 rounded-xl flex items-center justify-center mb-2">
                  <div className="text-center text-slate-500">
                    <MapPin className="w-4 h-4 mx-auto mb-1" />
                    <p className="text-xs">{dealer.town}, {dealer.county}</p>
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