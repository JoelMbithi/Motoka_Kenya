"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Shield, Users, Star, Phone, MessageCircle, Menu, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { vehicleApi } from "@/lib/api-client"
import type { Vehicle } from "@/lib/types"

const counties = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale"]

export default function HomePage() {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCounty, setSelectedCounty] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

useEffect(() => {
  const fetchFeaturedVehicles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get vehicles directly
      const response = await vehicleApi.getFeatured();
      
      // Extract data from axios response
      setFeaturedVehicles(response.data);
      
      if (response.data.length === 0) {
        setError('No vehicles found in database');
      }
      
    } catch (error: any) {
      console.error('Error:', error);
      setError('Failed to load vehicles');
      setFeaturedVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  fetchFeaturedVehicles();
}, []);
  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("search", searchQuery)
    if (selectedCounty) params.set("county", selectedCounty)

    window.location.href = `/browse?${params.toString()}`
  }

  const formatPrice = (price: number) => {
    return `KES ${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Modern Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">MK</span>
              </div>
              <span className="text-2xl font-bold text-slate-800">Motoka Kenya</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/browse" className="text-slate-600 hover:text-slate-800 font-medium transition-colors">
                Browse Cars
              </Link>
              <Link href="/dealers" className="text-slate-600 hover:text-slate-800 font-medium transition-colors">
                Dealers
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-slate-800 font-medium transition-colors">
                About
              </Link>
              <Button variant="outline" asChild className="border-slate-200 hover:bg-slate-50 rounded-xl">
                <Link href="/dealer/login">Dealer Login</Link>
              </Button>
              <Button asChild className="bg-emerald-500 hover:bg-emerald-600 rounded-xl shadow-sm">
                <Link href="/dealer/register">List Your Cars</Link>
              </Button>
            </nav>
            
            <Button variant="ghost" size="sm" className="md:hidden p-2">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Find Your Perfect Car
              <span className="block text-emerald-500">in Kenya</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Browse thousands of verified vehicles from trusted dealers across Kenya. From Nairobi to Mombasa, find
              quality cars with detailed inspections and transparent pricing.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search by make, model, or keyword..."
                  className="h-14 border-slate-200 focus:border-emerald-300 focus:ring-emerald-200 rounded-xl text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedCounty} onValueChange={setSelectedCounty}>
                <SelectTrigger className="h-14 border-slate-200 rounded-xl text-lg">
                  <SelectValue placeholder="Select County" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200">
                  {counties.map((county) => (
                    <SelectItem key={county} value={county.toLowerCase()}>
                      {county}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                className="h-14 bg-emerald-500 hover:bg-emerald-600 rounded-xl shadow-sm text-lg font-medium" 
                onClick={handleSearch}
              >
                <Search className="w-5 h-5 mr-2" />
                Search Cars
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Why Choose Motoka Kenya?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We connect you with verified dealers and provide comprehensive vehicle information to make your car buying journey seamless
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                <Shield className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-800">Verified Dealers</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                All dealers are verified and licensed to ensure your safety and peace of mind when purchasing
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <MapPin className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-800">Nationwide Coverage</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Find cars in all 47 counties across Kenya with detailed location information
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <Users className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-800">Trusted Community</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Join thousands of satisfied customers who found their perfect car through our platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-3">Featured Vehicles</h2>
              <p className="text-xl text-slate-600">Handpicked cars from our top-rated dealers</p>
            </div>
            <Button variant="outline" asChild className="border-slate-200 hover:bg-slate-50 rounded-xl h-12 px-6">
              <Link href="/browse" className="flex items-center">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden animate-pulse border-slate-200 rounded-2xl">
                  <div className="bg-slate-200 h-56 w-full"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-slate-200 rounded-lg mb-3"></div>
                    <div className="h-5 bg-slate-200 rounded-lg w-2/3 mb-3"></div>
                    <div className="h-5 bg-slate-200 rounded-lg w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-semibold text-slate-700 mb-2">Error Loading Vehicles</h3>
              <p className="text-slate-500 mb-6">{error}</p>
              <Button 
                onClick={() => window.location.reload()}
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                Try Again
              </Button>
            </div>
          ) : featuredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-slate-200 rounded-2xl group">
                  <div className="relative overflow-hidden">
                    <Image
                      src={vehicle.images?.[0] || "/placeholder.svg"}
                      alt={vehicle.title}
                      width={400}
                      height={300}
                      className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {vehicle.verified && (
                      <Badge className="absolute top-4 left-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg px-3 py-1.5">
                        <Shield className="w-4 h-4 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-xl text-slate-800 line-clamp-2 flex-1 pr-2">
                        {vehicle.title || "Untitled Vehicle"}
                      </h3>
                      <span className="text-2xl font-bold text-emerald-600 flex-shrink-0">
                        {formatPrice(vehicle.price || 0)}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-slate-500 mb-4">
                      <MapPin className="w-5 h-5 mr-2 text-emerald-500" />
                      <span className="text-lg">{vehicle.location || "Location not specified"}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-slate-50 rounded-lg p-3 text-center">
                        <div className="font-semibold text-slate-800">{vehicle.mileage || "N/A"}</div>
                        <div className="text-sm text-slate-500">Mileage</div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3 text-center">
                        <div className="font-semibold text-slate-800">{vehicle.fuel || "N/A"}</div>
                        <div className="text-sm text-slate-500">Fuel Type</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="flex items-center bg-amber-50 text-amber-700 px-3 py-2 rounded-lg">
                          <Star className="w-4 h-4 text-amber-500 mr-2" />
                          <span className="font-semibold">{vehicle.dealer?.rating || 4.5}</span>
                        </div>
                        <span className="text-slate-500 ml-4 truncate">
                          {vehicle.dealer?.name || "Unknown Dealer"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 rounded-xl h-11" 
                        asChild
                      >
                        <Link href={`/vehicle/${vehicle.id}`}>View Details</Link>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="p-0 w-11 h-11 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl"
                      >
                        <Phone className="w-5 h-5 text-emerald-600" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="p-0 w-11 h-11 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl"
                      >
                        <MessageCircle className="w-5 h-5 text-emerald-600" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-2xl font-semibold text-slate-700 mb-2">No Featured Vehicles Yet</h3>
              <p className="text-slate-500 mb-6">Check back soon for featured vehicles from our dealers.</p>
              <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
                <Link href="/browse">Browse All Vehicles</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Debug Info (Remove in production) */}
      <section className="py-6 bg-gray-50 border-t">
        <div className="container mx-auto px-6">
          <details className="bg-white p-4 rounded-lg border">
            <summary className="cursor-pointer font-semibold text-sm text-gray-600">
              Debug Info (Click to expand)
            </summary>
            <div className="mt-3 text-sm space-y-2">
              <p>Vehicles loaded: {featuredVehicles.length}</p>
              <p>Loading state: {loading ? "true" : "false"}</p>
              <p>Error: {error || "None"}</p>
              <button 
                onClick={() => {
                  console.log("Featured Vehicles:", featuredVehicles)
                  console.log("First vehicle:", featuredVehicles[0])
                }}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs"
              >
                Log to Console
              </button>
            </div>
          </details>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Sell Your Car?</h2>
          <p className="text-2xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join hundreds of verified dealers on Motoka Kenya and reach thousands of potential buyers
          </p>
          <Button size="lg" variant="secondary" asChild className="h-14 px-8 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all">
            <Link href="/dealer/register" className="flex items-center">
              Become a Dealer
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">MK</span>
                </div>
                <span className="text-2xl font-bold">Motoka Kenya</span>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed">
                Kenya&apos;s trusted vehicle marketplace connecting buyers with verified dealers nationwide.
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="font-semibold text-xl">For Buyers</h3>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <Link href="/browse" className="hover:text-white transition-colors text-lg">
                    Browse Cars
                  </Link>
                </li>
                <li>
                  <Link href="/dealers" className="hover:text-white transition-colors text-lg">
                    Find Dealers
                  </Link>
                </li>
                <li>
                  <Link href="/financing" className="hover:text-white transition-colors text-lg">
                    Car Financing
                  </Link>
                </li>
                <li>
                  <Link href="/insurance" className="hover:text-white transition-colors text-lg">
                    Car Insurance
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h3 className="font-semibold text-xl">For Dealers</h3>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <Link href="/dealer/register" className="hover:text-white transition-colors text-lg">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/dealer/login" className="hover:text-white transition-colors text-lg">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/dealer/pricing" className="hover:text-white transition-colors text-lg">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/dealer/support" className="hover:text-white transition-colors text-lg">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h3 className="font-semibold text-xl">Contact</h3>
              <ul className="space-y-3 text-slate-400 text-lg">
                <li>+254 700 000 000</li>
                <li>info@motokakenya.com</li>
                <li>Nairobi, Kenya</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p className="text-slate-400 text-lg">&copy; 2024 Motoka Kenya. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}