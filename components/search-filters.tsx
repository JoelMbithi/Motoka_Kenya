/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Search, MapPin, DollarSign, Calendar, Fuel } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void
  className?: string
}

const makes = ["Toyota", "Honda", "Nissan", "Mazda", "Subaru", "BMW", "Mercedes", "Audi", "Volkswagen", "Ford"]
const bodyTypes = ["SUV", "Sedan", "Hatchback", "Pickup", "Coupe", "Convertible", "Wagon"]
const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"]
const transmissions = ["Manual", "Automatic", "CVT"]
const counties = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale"]

export default function SearchFilters({ onFiltersChange, className = "" }: SearchFiltersProps) {
  const [filters, setFilters] = useState({
    searchQuery: "",
    priceRange: [0, 10000000],
    yearRange: [2000, new Date().getFullYear()],
    mileageRange: [0, 200000],
    makes: [] as string[],
    bodyTypes: [] as string[],
    fuelTypes: [] as string[],
    transmissions: [] as string[],
    counties: [] as string[],
    features: [] as string[],
  })

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)

    // Update active filters for display
    updateActiveFilters(newFilters)
  }

  const updateActiveFilters = (currentFilters: typeof filters) => {
    const active: string[] = []

    if (currentFilters.searchQuery) active.push(`Search: ${currentFilters.searchQuery}`)
    if (currentFilters.priceRange[0] > 0 || currentFilters.priceRange[1] < 10000000) {
      active.push(
        `Price: KES ${currentFilters.priceRange[0].toLocaleString()} - ${currentFilters.priceRange[1].toLocaleString()}`,
      )
    }
    if (currentFilters.makes.length > 0) active.push(`Makes: ${currentFilters.makes.join(", ")}`)
    if (currentFilters.bodyTypes.length > 0) active.push(`Body: ${currentFilters.bodyTypes.join(", ")}`)
    if (currentFilters.fuelTypes.length > 0) active.push(`Fuel: ${currentFilters.fuelTypes.join(", ")}`)
    if (currentFilters.counties.length > 0) active.push(`Location: ${currentFilters.counties.join(", ")}`)

    setActiveFilters(active)
  }

  const clearAllFilters = () => {
    const resetFilters = {
      searchQuery: "",
      priceRange: [0, 10000000],
      yearRange: [2000, new Date().getFullYear()],
      mileageRange: [0, 200000],
      makes: [],
      bodyTypes: [],
      fuelTypes: [],
      transmissions: [],
      counties: [],
      features: [],
    }
    setFilters(resetFilters)
    setActiveFilters([])
    onFiltersChange(resetFilters)
  }

  const toggleArrayFilter = (key: string, value: string) => {
    const currentArray = filters[key as keyof typeof filters] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilter(key, newArray)
  }

  return (
    <div className={className}>
      {/* Search Bar */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by make, model, or keyword..."
              value={filters.searchQuery}
              onChange={(e) => updateFilter("searchQuery", e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Active Filters</span>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {filter}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <DollarSign className="w-4 h-4 mr-2" />
            Price Range
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter("priceRange", value)}
            max={10000000}
            step={100000}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>KES {filters.priceRange[0].toLocaleString()}</span>
            <span>KES {filters.priceRange[1].toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-2">
            {counties.map((county) => (
              <div key={county} className="flex items-center space-x-2">
                <Checkbox
                  id={`county-${county}`}
                  checked={filters.counties.includes(county)}
                  onCheckedChange={() => toggleArrayFilter("counties", county)}
                />
                <Label htmlFor={`county-${county}`} className="text-sm">
                  {county}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Make */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Make</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {makes.map((make) => (
              <div key={make} className="flex items-center space-x-2">
                <Checkbox
                  id={`make-${make}`}
                  checked={filters.makes.includes(make)}
                  onCheckedChange={() => toggleArrayFilter("makes", make)}
                />
                <Label htmlFor={`make-${make}`} className="text-sm">
                  {make}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Body Type */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Body Type</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-2">
            {bodyTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`body-${type}`}
                  checked={filters.bodyTypes.includes(type)}
                  onCheckedChange={() => toggleArrayFilter("bodyTypes", type)}
                />
                <Label htmlFor={`body-${type}`} className="text-sm">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fuel Type */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Fuel className="w-4 h-4 mr-2" />
            Fuel Type
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-2">
            {fuelTypes.map((fuel) => (
              <div key={fuel} className="flex items-center space-x-2">
                <Checkbox
                  id={`fuel-${fuel}`}
                  checked={filters.fuelTypes.includes(fuel)}
                  onCheckedChange={() => toggleArrayFilter("fuelTypes", fuel)}
                />
                <Label htmlFor={`fuel-${fuel}`} className="text-sm">
                  {fuel}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Year Range */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Year Range
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Slider
            value={filters.yearRange}
            onValueChange={(value) => updateFilter("yearRange", value)}
            min={2000}
            max={new Date().getFullYear()}
            step={1}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{filters.yearRange[0]}</span>
            <span>{filters.yearRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Transmission */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Transmission</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {transmissions.map((transmission) => (
              <div key={transmission} className="flex items-center space-x-2">
                <Checkbox
                  id={`trans-${transmission}`}
                  checked={filters.transmissions.includes(transmission)}
                  onCheckedChange={() => toggleArrayFilter("transmissions", transmission)}
                />
                <Label htmlFor={`trans-${transmission}`} className="text-sm">
                  {transmission}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
