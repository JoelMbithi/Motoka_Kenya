/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState, useEffect } from "react"
import { Search, MapPin, Shield, Star, Phone, MessageCircle, Menu } from "lucide-react"
import Link from "next/link"

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
  userImage?: string
  coverImage?: string
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
}

const counties = ["All Counties", "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Kiambu", "Uasin Gishu"]
const specialties = ["All Specialties", "SUVs", "Sedans", "Luxury Cars", "Japanese Cars", "4WD Vehicles", "Hybrids", "Motorcycles", "Commercial Vehicles"]

export default function DealersPage() {
  const [dealers, setDealers] = useState<Dealer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCounty, setSelectedCounty] = useState("All Counties")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [sortBy, setSortBy] = useState("rating")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Fetch dealers from API
  const fetchDealers = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams()
      if (selectedCounty !== "All Counties") params.append('county', selectedCounty)
      if (selectedSpecialty !== "All Specialties") params.append('specialty', selectedSpecialty)
      
      const response = await fetch(`/api/dealers?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch dealers: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success === false) {
        throw new Error(data.error || 'Failed to fetch dealers')
      }
      
      // Debug: Check what data is returned
      console.log('Dealers data received:', data.length, 'dealers');
      if (data.length > 0) {
        console.log('First dealer:', {
          name: data[0].name,
          image: data[0].image,
          logoUrl: data[0].logoUrl,
          coverImage: data[0].coverImage,
          userImage: data[0].userImage
        });
      }
      
      setDealers(data)
    } catch (err: any) {
      console.error('Error fetching dealers:', err)
      setError(err.message || 'Failed to load dealers')
      setDealers([])
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchDealers()
  }, [selectedCounty, selectedSpecialty])

  // Filter dealers based on search query
  const filteredDealers = dealers.filter(dealer => {
    if (!searchQuery.trim()) return true
    
    const query = searchQuery.toLowerCase()
    return (
      dealer.name.toLowerCase().includes(query) ||
      dealer.location.toLowerCase().includes(query) ||
      dealer.description.toLowerCase().includes(query) ||
      dealer.specialties.some(s => s.toLowerCase().includes(query))
    )
  })

  // Sort dealers
  const sortedDealers = [...filteredDealers].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "reviews":
        return b.reviews - a.reviews
      case "listings":
        return b.totalListings - a.totalListings
      case "newest":
        return b.established - a.established
      default:
        return 0
    }
  })

  const handleClearFilters = () => {
    setSelectedCounty("All Counties")
    setSelectedSpecialty("All Specialties")
    setSearchQuery("")
  }

  // Format phone number for display
  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
  }

  // Get WhatsApp link
  const getWhatsAppLink = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '')
    return `https://wa.me/${cleanPhone}`
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header - same as before */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        {/* ... keep your existing header code ... */}
      </header>

      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Find Trusted Car Dealers
            </h1>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Connect with verified dealers across Kenya. Browse showrooms, check ratings, and find your perfect vehicle.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Search dealers by name, location, or specialty..."
                className="text-sm px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              <select 
                value={selectedCounty} 
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="text-sm px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                {counties.map((county) => (
                  <option key={county} value={county}>{county}</option>
                ))}
              </select>
              
              <button 
                onClick={() => fetchDealers()}
                className="text-sm px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">Verified Dealers</h2>
            <p className="text-xs text-slate-500">
              {loading ? 'Loading...' : `${sortedDealers.length} dealers found`}
            </p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <select 
              value={selectedSpecialty} 
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 flex-1 md:w-40"
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 flex-1 md:w-32"
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="listings">Most Listings</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            <p className="mt-2 text-sm text-slate-500">Loading dealers...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => fetchDealers()}
              className="text-xs px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Dealers Grid */}
        {!loading && !error && sortedDealers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500 mb-4">No dealers found matching your criteria.</p>
            <button
              onClick={handleClearFilters}
              className="text-xs px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          !loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedDealers.map((dealer) => (
                <div key={dealer.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-200">
                  {/* Cover Image with Logo Badge */}
                  <div className="relative h-40">
                    {/* Cover Image */}
                    {dealer.image && dealer.image !== '/api/placeholder/300/200' ? (
                      <div className="w-full h-full overflow-hidden">
                        <img 
                          src={dealer.image} 
                          alt={`${dealer.name} cover`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            // Show fallback
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center"><span class="text-slate-400 text-xs">Cover Image</span></div>';
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
                        <span className="text-slate-400 text-xs">Cover Image</span>
                      </div>
                    )}
                    
                    {/* Logo Badge in corner */}
                    {dealer.logoUrl && (
                      <div className="absolute top-2 left-2 w-10 h-10 bg-white rounded-full p-1 shadow-md border border-slate-200 flex items-center justify-center">
                        <img 
                          src={dealer.logoUrl} 
                          alt={`${dealer.name} logo`}
                          className="w-full h-full object-contain rounded-full"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            // Show fallback icon
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.innerHTML = '<div class="w-full h-full rounded-full bg-emerald-100 flex items-center justify-center"><svg class="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg></div>';
                            }
                          }}
                        />
                      </div>
                    )}
                    
                    {/* User Profile Image Badge (if available) */}
                    {dealer.userImage && (
                      <div className="absolute bottom-2 left-2 w-8 h-8 bg-white rounded-full p-0.5 shadow-md border border-slate-200">
                        <img 
                          src={dealer.userImage} 
                          alt="Contact person"
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    {/* Verified Badge */}
                    {dealer.verified && (
                      <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-1 rounded-lg flex items-center space-x-1 text-xs">
                        <Shield className="w-3 h-3" />
                        <span>Verified</span>
                      </div>
                    )}
                    
                    {/* Established Year */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-lg text-xs backdrop-blur-sm">
                      Est. {dealer.established}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="font-semibold text-slate-900 mb-1 text-sm">{dealer.name}</h3>
                      <div className="flex items-center text-xs text-slate-500 mb-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        {dealer.location}
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 mr-1" />
                          <span className="font-medium text-xs">{dealer.rating.toFixed(1)}</span>
                          <span className="text-slate-500 ml-1 text-xs">({dealer.reviews} reviews)</span>
                        </div>
                        <span className="text-xs text-slate-500">{dealer.totalListings} listings</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                      {dealer.description || `${dealer.businessType} located in ${dealer.town}, ${dealer.county}.`}
                    </p>

                    {/* Specialties */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {dealer.specialties.slice(0, 2).map((specialty) => (
                          <span key={specialty} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg text-xs">
                            {specialty}
                          </span>
                        ))}
                        {dealer.specialties.length > 2 && (
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg text-xs">
                            +{dealer.specialties.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Link 
                        href={`/dealers/${dealer.id}`}
                        className="block w-full text-xs px-3 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors text-center"
                      >
                        View Showroom
                      </Link>
                      <div className="grid grid-cols-2 gap-2">
                        <a 
                          href={`tel:${dealer.phone}`}
                          className="text-xs px-3 py-2 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center space-x-1"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call</span>
                        </a>
                        {dealer.whatsapp && (
                          <a 
                            href={getWhatsAppLink(dealer.whatsapp)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-3 py-2 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center space-x-1"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* Pagination - Add when you have pagination in backend */}
        {!loading && !error && sortedDealers.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <button className="px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-400 cursor-not-allowed">
                Previous
              </button>
              <button className="px-3 py-2 text-xs bg-emerald-600 text-white rounded-lg">
                1
              </button>
              <button className="px-3 py-2 text-xs border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                2
              </button>
              <button className="px-3 py-2 text-xs border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="py-12 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-bold mb-2 text-white">Want to Join Our Network?</h2>
          <p className="text-sm mb-6 text-emerald-100">
            Become a verified dealer and reach thousands of potential customers
          </p>
          <Link 
            href="/dealer/register"
            className="inline-block text-sm px-6 py-3 bg-white text-emerald-600 rounded-xl hover:bg-slate-50 transition-colors font-medium"
          >
            Apply to Become a Dealer
          </Link>
        </div>
      </section>
    </div>
  )
}