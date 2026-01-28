/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect } from "react"
import { MapPin, Navigation, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Vehicle } from "@/lib/types"

interface MapComponentProps {
  vehicles: Vehicle[]
  onVehicleSelect?: (vehicle: Vehicle) => void
  className?: string
}

export default function MapComponent({ vehicles, onVehicleSelect, className = "" }: MapComponentProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Location access denied:", error)
        },
      )
    }
  }, [])

  const handleVehicleClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
    onVehicleSelect?.(vehicle)
  }

  const formatPrice = (price: number) => {
    return `KES ${price.toLocaleString()}`
  }

  return (
    <div className={`relative ${className} ${isFullscreen ? "fixed inset-0 z-50 bg-white" : ""}`}>
      <Card className="h-full">
        <CardContent className="p-0 h-full">
          <div className="relative h-full min-h-[400px] bg-gray-100 rounded-lg overflow-hidden">
            {/* Map Controls */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              <Button
                size="sm"
                variant="outline"
                className="bg-white shadow-md"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
              {userLocation && (
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white shadow-md"
                  onClick={() => {
                    // Center map on user location
                    console.log("Center on user location:", userLocation)
                  }}
                >
                  <Navigation className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Mock Map Interface */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
              <div className="text-center text-gray-600">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-green-600" />
                <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                <p className="text-sm">Vehicle locations across Kenya</p>
                <p className="text-xs mt-2">{vehicles.length} vehicles shown</p>
              </div>
            </div>

            {/* Vehicle Markers (Mock) */}
            <div className="absolute inset-0">
              {vehicles.slice(0, 6).map((vehicle, index) => (
                <div
                  key={vehicle.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${20 + index * 12}%`,
                    top: `${30 + index * 8}%`,
                  }}
                  onClick={() => handleVehicleClick(vehicle)}
                >
                  <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg hover:bg-green-700 transition-colors">
                    {formatPrice(vehicle.price)}
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Vehicle Info */}
            {selectedVehicle && (
              <div className="absolute bottom-4 left-4 right-4 md:left-4 md:right-auto md:w-80">
                <Card className="shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedVehicle.images[0] || "/placeholder.svg"}
                        alt={selectedVehicle.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{selectedVehicle.title}</h4>
                        <p className="text-sm text-gray-600">{selectedVehicle.location}</p>
                        <p className="text-green-600 font-bold">{formatPrice(selectedVehicle.price)}</p>
                      </div>
                      <Button size="sm" onClick={() => setSelectedVehicle(null)}>
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
