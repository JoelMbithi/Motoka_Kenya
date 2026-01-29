/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Shield, Star, Phone, MessageCircle, Grid, List, Map, SlidersHorizontal, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import MapComponent from "@/components/map-component"
import SearchFilters from "@/components/search-filters"
import { vehicleApi } from "@/lib/api-client"
import type { Vehicle, SearchFilters as SearchFiltersType } from "@/lib/types"

const counties = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale"]

export default function BrowsePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("newest")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCounty, setSelectedCounty] = useState("All Counties")
  const [currentFilters, setCurrentFilters] = useState<SearchFiltersType>({})
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const search = urlParams.get("search") || ""
    const county = urlParams.get("county") || ""
    const dealerId = urlParams.get("dealer") ? Number.parseInt(urlParams.get("dealer")!) : undefined

    setSearchQuery(search)
    setSelectedCounty(county || "All Counties")

    const initialFilters: SearchFiltersType = {
      searchQuery: search,
      counties: county ? [county] : [],
      dealerId,
    }

    setCurrentFilters(initialFilters)
    fetchVehicles(initialFilters)
  }, [])

 const fetchVehicles = async (filters: SearchFiltersType = {}) => {
  try {
    setLoading(true)
    console.log("Fetching vehicles with filters:", filters);
    
    const response = await vehicleApi.getAll(filters)
    console.log("API Response:", response);
    
    // Check if response.data is an array
    if (Array.isArray(response.data)) {
      console.log("Number of vehicles:", response.data.length);
      console.log("First vehicle:", response.data[0]);
      setVehicles(response.data)
    } else {
      console.error("response.data is not an array:", response.data);
      setVehicles([])
    }
  } catch (error) {
    console.error("Error fetching vehicles:", error)
    setVehicles([])
  } finally {
    setLoading(false)
  }
}
  const handleFiltersChange = (filters: SearchFiltersType) => {
    setCurrentFilters(filters)
    fetchVehicles(filters)
  }

  const handleSearch = () => {
    const filters = {
      ...currentFilters,
      searchQuery,
      counties: selectedCounty === "All Counties" ? [] : [selectedCounty],
    }
    handleFiltersChange(filters)
  }

  const formatPrice = (price: number) => {
    return `KES ${price.toLocaleString()}`
  }

  const sortVehicles = (vehicles: Vehicle[], sortBy: string) => {
    switch (sortBy) {
      case "price-low":
        return [...vehicles].sort((a, b) => a.price - b.price)
      case "price-high":
        return [...vehicles].sort((a, b) => b.price - a.price)
      case "year-new":
        return [...vehicles].sort((a, b) => b.year - a.year)
      case "year-old":
        return [...vehicles].sort((a, b) => a.year - b.year)
      case "mileage":
        return [...vehicles].sort((a, b) => Number.parseInt(a.mileage) - Number.parseInt(b.mileage))
      default:
        return vehicles
    }
  }

  const sortedVehicles = sortVehicles(vehicles, sortBy) || []

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Modern Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">MK</span>
              </div>
              <span className="text-xl font-semibold text-slate-800">Motoka Kenya</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/browse" className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
                Browse Cars
              </Link>
              <Link href="/dealers" className="text-slate-600 hover:text-slate-800 transition-colors">
                Dealers
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-slate-800 transition-colors">
                About
              </Link>
              <Button variant="outline" size="sm" asChild className="border-slate-200 hover:bg-slate-50">
                <Link href="/dealer/login">Dealer Login</Link>
              </Button>
            </nav>
            
            <Button variant="ghost" size="sm" className="md:hidden p-2">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Mobile Search Bar */}
        <div className="md:hidden mb-6">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 border-slate-200 focus:border-emerald-300 focus:ring-emerald-200 rounded-xl"
              />
            </div>
            <Button onClick={handleSearch} size="sm" className="px-4 h-10 bg-emerald-500 hover:bg-emerald-600 rounded-xl shadow-sm">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search by make, model, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 border-slate-200 focus:border-emerald-300 focus:ring-emerald-200 rounded-xl"
              />
            </div>
            <Select value={selectedCounty} onValueChange={setSelectedCounty}>
              <SelectTrigger className="h-11 border-slate-200 rounded-xl">
                <SelectValue placeholder="Select County" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200">
                <SelectItem value="All Counties">All Counties</SelectItem>
                {counties.map((county) => (
                  <SelectItem key={county} value={county}>
                    {county}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="h-11 bg-emerald-500 hover:bg-emerald-600 rounded-xl shadow-sm" onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <SearchFilters onFiltersChange={handleFiltersChange} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-slate-800">Browse Vehicles</h1>
                <p className="text-slate-500">
                  {loading ? "Loading..." : `${sortedVehicles.length} vehicles found`}
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Mobile Filter */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden border-slate-200 hover:bg-slate-50 rounded-xl">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full sm:w-80 overflow-y-auto">
                    <SheetHeader className="mb-6">
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <SearchFilters onFiltersChange={handleFiltersChange} />
                  </SheetContent>
                </Sheet>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-44 h-9 border-slate-200 rounded-xl text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="year-new">Year: Newest</SelectItem>
                    <SelectItem value="year-old">Year: Oldest</SelectItem>
                    <SelectItem value="mileage">Lowest Mileage</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex bg-slate-100 rounded-xl p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`h-8 w-8 p-0 rounded-lg ${
                      viewMode === "grid" 
                        ? "bg-white shadow-sm text-emerald-600" 
                        : "hover:bg-slate-200 text-slate-600"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`h-8 w-8 p-0 rounded-lg ${
                      viewMode === "list" 
                        ? "bg-white shadow-sm text-emerald-600" 
                        : "hover:bg-slate-200 text-slate-600"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "map" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("map")}
                    className={`h-8 w-8 p-0 rounded-lg ${
                      viewMode === "map" 
                        ? "bg-white shadow-sm text-emerald-600" 
                        : "hover:bg-slate-200 text-slate-600"
                    }`}
                  >
                    <Map className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Content based on view mode */}
            {viewMode === "map" ? (
              <div className="h-[500px] md:h-[600px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <MapComponent
                  vehicles={sortedVehicles}
                  onVehicleSelect={(vehicle) => {
                    console.log("Selected vehicle:", vehicle)
                  }}
                  className="h-full"
                />
              </div>
            ) : (
              <>
                {/* Vehicle Grid/List */}
                {loading ? (
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                        : "space-y-4"
                    }
                  >
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <Card key={i} className="overflow-hidden animate-pulse border-slate-200 rounded-2xl shadow-sm">
                        <div className="bg-slate-200 h-48 w-full"></div>
                        <CardContent className="p-5">
                          <div className="h-5 bg-slate-200 rounded-lg mb-3"></div>
                          <div className="h-4 bg-slate-200 rounded-lg w-2/3 mb-3"></div>
                          <div className="h-4 bg-slate-200 rounded-lg w-1/2"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : sortedVehicles.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500 mb-6">No vehicles found matching your criteria.</p>
                    <Button 
                      variant="outline" 
                      className="border-slate-200 hover:bg-slate-50 rounded-xl" 
                      onClick={() => handleFiltersChange({})}
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                        : "space-y-4"
                    }
                  >
                    {Array.isArray(sortedVehicles) && sortedVehicles.map((vehicle) => (
                      <Card
                        key={vehicle.id}
                        className={`overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200 rounded-2xl group ${
                          viewMode === "list" ? "flex flex-col sm:flex-row" : ""
                        }`}
                      >
                        <div className={`relative ${viewMode === "list" ? "sm:w-64 sm:flex-shrink-0" : ""}`}>
                          <Image
                            src={vehicle.images[0] || "/placeholder.svg"}
                            alt={vehicle.title}
                            width={400}
                            height={300}
                            className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                              viewMode === "list" ? "w-full h-48 sm:h-full" : "w-full h-48"
                            }`}
                          />
                          {vehicle.verified && (
                            <Badge className="absolute top-3 left-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg px-2 py-1">
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <CardContent className={`p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-slate-800 line-clamp-2 flex-1 pr-2">{vehicle.title}</h3>
                            <span className="text-lg font-bold text-emerald-600 flex-shrink-0">
                              {formatPrice(vehicle.price)}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-sm text-slate-500 mb-4">
                            <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-emerald-500" />
                            <span className="truncate">{vehicle.location}</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 mb-4">
                            <div className="bg-slate-50 rounded-lg p-2 text-center">
                              <div className="font-medium">{vehicle.mileage}</div>
                              <div className="text-xs text-slate-500">Mileage</div>
                            </div>
                            <div className="bg-slate-50 rounded-lg p-2 text-center">
                              <div className="font-medium">{vehicle.fuel}</div>
                              <div className="text-xs text-slate-500">Fuel</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center text-sm">
                              <div className="flex items-center bg-amber-50 text-amber-700 px-2 py-1 rounded-lg">
                                <Star className="w-4 h-4 text-amber-500 mr-1" />
                                <span className="font-medium">{vehicle.dealer.rating}</span>
                              </div>
                              <span className="text-slate-500 ml-3 truncate">{vehicle.dealer.name}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-emerald-500 hover:bg-emerald-600 rounded-xl h-9" asChild>
                              <Link href={`/vehicle/${vehicle.id}`}>View Details</Link>
                            </Button>
                            <Button size="sm" variant="outline" className="p-0 w-9 h-9 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl">
                              <Phone className="w-4 h-4 text-emerald-600" />
                            </Button>
                            <Button size="sm" variant="outline" className="p-0 w-9 h-9 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl">
                              <MessageCircle className="w-4 h-4 text-emerald-600" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {!loading && sortedVehicles.length > 0 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex gap-2 bg-white rounded-xl p-2 border border-slate-200 shadow-sm">
                      <Button variant="outline" disabled size="sm" className="w-9 h-9 p-0 border-0 hover:bg-slate-100 rounded-lg">
                        &lt;
                      </Button>
                      <Button size="sm" className="w-9 h-9 p-0 bg-emerald-500 hover:bg-emerald-600 rounded-lg">
                        1
                      </Button>
                      <Button variant="outline" size="sm" className="w-9 h-9 p-0 border-0 hover:bg-slate-100 rounded-lg">
                        2
                      </Button>
                      <Button variant="outline" size="sm" className="w-9 h-9 p-0 border-0 hover:bg-slate-100 rounded-lg">
                        3
                      </Button>
                      <Button variant="outline" size="sm" className="w-9 h-9 p-0 border-0 hover:bg-slate-100 rounded-lg">
                        &gt;
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}