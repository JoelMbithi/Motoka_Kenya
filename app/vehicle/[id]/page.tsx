// app/vehicle/[id]/page.tsx
"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  MapPin,
  Shield,
  Star,
  Phone,
  MessageCircle,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Eye,
  Heart,
  Share2,
  User,
  Mail,
  Users,
  CheckCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { vehicleApi, inspectionApi } from "@/lib/api-client"
import type { Vehicle, InspectionReport } from "@/lib/types"

interface VehicleDetailPageProps {
  params: {
    id: string
  }
}

export default function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [inspection, setInspection] = useState<InspectionReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

useEffect(() => {
  const fetchVehicleData = async () => {
    try {
      const vehicleId = params.id;
      
      if (!vehicleId) {
        setError("Invalid vehicle ID");
        setLoading(false);
        return;
      }
      
      console.log("Fetching vehicle with ID:", vehicleId);
      
      // OPTION 1: Use the updated vehicleApi.getById() with fallback
      const vehicleResponse = await vehicleApi.getById(vehicleId);
      const vehicleData = vehicleResponse.data;
      
      // OPTION 2: Or use the simpler vehicleDetailApi
      // const vehicleData = await vehicleDetailApi.getById(vehicleId);
      
      if (!vehicleData) {
        setError("Vehicle not found");
        setLoading(false);
        return;
      }
      
      setVehicle(vehicleData);
      
      // Fetch inspection (optional - might not exist)
      try {
        const inspectionResponse = await inspectionApi.getByVehicle(vehicleId);
        const inspectionData = inspectionResponse.data;
        if (inspectionData) {
          setInspection(inspectionData);
        }
      } catch (inspectionError) {
        console.warn("No inspection found");
      }
      
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      setError("Failed to load vehicle details");
    } finally {
      setLoading(false);
    }
  }

  fetchVehicleData();
}, [params.id]);

  const formatPrice = (price: number) => {
    return `KES ${price.toLocaleString()}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-3 py-4 max-w-7xl">
          <div className="animate-pulse">
            <div className="h-80 bg-slate-200 rounded-2xl mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <div className="h-6 bg-slate-200 rounded-xl mb-3"></div>
                <div className="h-4 bg-slate-200 rounded-lg w-2/3 mb-6"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-20 bg-slate-200 rounded-xl"></div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="h-56 bg-slate-200 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md">
          <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-rose-500" />
          </div>
          <h1 className="text-xl font-semibold text-slate-900 mb-2">Vehicle Not Found</h1>
          <p className="text-slate-600 text-sm mb-6">
            {error || "The vehicle you're looking for doesn't exist."}
          </p>
          <div className="flex gap-2 justify-center">
            <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
              <Link href="/browse">Back to Browse</Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="rounded-xl">
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-3 py-3 max-w-7xl">
          <div className="flex items-center justify-between">
            <Link href="/browse" className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-semibold text-xs">MK</span>
              </div>
              <span className="text-lg font-semibold text-slate-900">Motoka Kenya</span>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50 rounded-xl p-2">
                <Heart className="w-4 h-4 text-slate-600" />
              </Button>
              <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50 rounded-xl p-2">
                <Share2 className="w-4 h-4 text-slate-600" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Image Gallery */}
            <div className="mb-6">
              <div className="relative mb-3">
                <Image
                  src={vehicle.images[0] || "/placeholder.svg"}
                  alt={vehicle.title}
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover rounded-2xl shadow-sm"
                />
                {vehicle.verified && (
                  <Badge className="absolute top-3 left-3 bg-emerald-600 hover:bg-emerald-600 text-white text-xs px-2 py-1 rounded-lg shadow-sm">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
                <div className="absolute bottom-3 right-3 bg-slate-900/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                  1 / {vehicle.images.length}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {vehicle.images.slice(1, 5).map((image, index) => (
                  <Image
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${vehicle.title} ${index + 2}`}
                    width={150}
                    height={100}
                    className="w-full h-16 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity shadow-sm"
                  />
                ))}
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="mb-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-semibold text-slate-900 mb-1">{vehicle.title}</h1>
                  <div className="flex items-center text-slate-600">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span className="text-sm">{vehicle.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold text-emerald-600 mb-1">{formatPrice(vehicle.price)}</div>
                  {vehicle.views && (
                    <div className="flex items-center text-xs text-slate-600">
                      <Eye className="w-3 h-3 mr-1" />
                      <span>{vehicle.views} views</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="text-center p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <Calendar className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                  <div className="font-medium text-sm">{vehicle.year}</div>
                  <div className="text-xs text-slate-600">Year</div>
                </div>
                <div className="text-center p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <Gauge className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                  <div className="font-medium text-sm">{vehicle.mileage}</div>
                  <div className="text-xs text-slate-600">Mileage</div>
                </div>
                <div className="text-center p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <Fuel className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                  <div className="font-medium text-sm">{vehicle.fuel}</div>
                  <div className="text-xs text-slate-600">Fuel Type</div>
                </div>
                <div className="text-center p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <Settings className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                  <div className="font-medium text-sm">{vehicle.transmission}</div>
                  <div className="text-xs text-slate-600">Transmission</div>
                </div>
                  <div className="text-center p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <Users className="w-5 h-5 mx-auto mb-1 text-emerald-600" /> {/* Add Users icon */}
                  <div className="font-medium text-sm">{vehicle.seats || 'N/A'}</div>
                  <div className="text-xs text-slate-600">Seats</div>
                </div>
              </div>

              {/* Detailed Specs */}
              <Card className="mb-6 border-slate-200 shadow-sm rounded-2xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium text-slate-900">Vehicle Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-slate-600">Make</span>
                      <span className="font-medium text-slate-900">{vehicle.make}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-600">Model</span>
                      <span className="font-medium text-slate-900">{vehicle.model}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-600">Body Type</span>
                      <span className="font-medium text-slate-900">{vehicle.bodyType}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-600">Color</span>
                      <span className="font-medium text-slate-900">{vehicle.color}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-600">Engine</span>
                      <span className="font-medium text-slate-900">{vehicle.engine}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-600">Drivetrain</span>
                      <span className="font-medium text-slate-900">{vehicle.drivetrain}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-600">Seats</span>
                      <span className="font-medium text-slate-900">{vehicle.seats || 'N/A'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs */}
              <Tabs defaultValue="description" className="mb-6">
                <TabsList className="grid w-full grid-cols-3 bg-slate-100 rounded-xl p-1 mb-4">
                  <TabsTrigger value="description" className="text-xs font-medium rounded-lg">Description</TabsTrigger>
                  <TabsTrigger value="features" className="text-xs font-medium rounded-lg">Features</TabsTrigger>
                  <TabsTrigger value="inspection" className="text-xs font-medium rounded-lg">Inspection</TabsTrigger>
                </TabsList>
                <TabsContent value="description">
                  <Card className="border-slate-200 shadow-sm rounded-2xl">
                    <CardContent className="pt-4">
                      <p className="text-slate-700 leading-relaxed text-sm">{vehicle.description}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="features">
                  <Card className="border-slate-200 shadow-sm rounded-2xl">
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {vehicle.features.map((feature, index) => (
                          <div key={index} className="flex items-center py-1">
                            <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2 flex-shrink-0"></div>
                            <span className="text-sm text-slate-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="inspection">
                  <Card className="border-slate-200 shadow-sm rounded-2xl">
                    <CardContent className="pt-4">
                      {inspection ? (
                        <div className="space-y-6">
                          {/* Overall Score */}
                          <div className="text-center bg-emerald-50 rounded-xl p-4">
                            <div className="text-2xl font-semibold text-emerald-600 mb-1">{inspection.score}/10</div>
                            <div className="text-sm font-medium text-slate-900 mb-1">Overall Score</div>
                            <div className="text-xs text-slate-600">
                              Inspected {new Date(inspection.date).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-slate-600">Report: {inspection.reportNumber}</div>
                          </div>

                          <Separator className="bg-slate-200" />

                          {/* Inspection Results */}
                          <div>
                            <h4 className="font-medium mb-3 text-sm text-slate-900">Inspection Results</h4>
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                { label: 'Engine', value: inspection.engine },
                                { label: 'Transmission', value: inspection.transmission },
                                { label: 'Brakes', value: inspection.brakes },
                                { label: 'Suspension', value: inspection.suspension },
                                { label: 'Electrical', value: inspection.electrical },
                                { label: 'Body', value: inspection.body }
                              ].map((item, index) => (
                                <div key={index} className="flex justify-between items-center py-1">
                                  <span className="text-sm text-slate-600">{item.label}:</span>
                                  <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 rounded-lg">
                                    {item.value}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator className="bg-slate-200" />

                          {/* Inspector Information */}
                          <div>
                            <h4 className="font-medium mb-3 text-sm text-slate-900 flex items-center">
                              <User className="w-4 h-4 mr-2 text-emerald-600" />
                              Inspector Information
                            </h4>
                            <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-sm text-slate-900">{inspection.inspector.name}</p>
                                  <p className="text-xs text-slate-600">{inspection.inspector.company}</p>
                                </div>
                                <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-lg">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Certified
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                <div className="flex justify-between">
                                  <span className="text-slate-600">License:</span>
                                  <span className="font-medium text-slate-900">{inspection.inspector.license}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Experience:</span>
                                  <span className="font-medium text-slate-900">{inspection.inspector.experience}</span>
                                </div>
                                <div className="flex items-center">
                                  <Phone className="w-3 h-3 mr-1 text-slate-600" />
                                  <span>{inspection.inspector.phone}</span>
                                </div>
                                <div className="flex items-center">
                                  <Mail className="w-3 h-3 mr-1 text-slate-600" />
                                  <span>{inspection.inspector.email}</span>
                                </div>
                              </div>

                              <div>
                                <p className="text-xs text-slate-600 mb-2">Certifications:</p>
                                <div className="flex flex-wrap gap-1">
                                  {inspection.inspector.certifications.map((cert, index) => (
                                    <Badge key={index} variant="outline" className="text-xs px-2 py-0.5 border-slate-200 text-slate-700 rounded-lg">
                                      {cert}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="text-xs">
                                <span className="text-slate-600">Location:</span>
                                <p className="font-medium text-slate-900">{inspection.location}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-500">
                          <p className="text-sm">No inspection report available for this vehicle.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2">
            {/* Dealer Info */}
            <Card className="mb-4 sticky top-20 border-slate-200 shadow-sm rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-slate-900">Contact Dealer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm text-slate-900">{vehicle.dealer.name}</h3>
                    {vehicle.dealer.verified && (
                      <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-lg">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-slate-600 mb-2">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <span>
                      {vehicle.dealer.rating} ({vehicle.dealer.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-slate-600">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{vehicle.dealer.location}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call {vehicle.dealer.phone}
                  </Button>
                  <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50 rounded-xl" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>

                  {/* Note: You need to create these modal components */}
                  {/* 
                  <TestDriveModal vehicle={vehicle}>
                    <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50 rounded-xl text-xs">
                      Schedule Test Drive
                    </Button>
                  </TestDriveModal>

                  <FinancingModal vehicle={vehicle}>
                    <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50 rounded-xl text-xs">
                      Request Financing
                    </Button>
                  </FinancingModal>
                  */}
                </div>

                <Separator className="my-4 bg-slate-200" />

                <div className="text-center">
                  <p className="text-xs text-slate-600 mb-2">Interested in this vehicle?</p>
                  <Button variant="link" className="text-emerald-600 hover:text-emerald-700 text-xs p-0" asChild>
                    <Link href={`/dealers/${vehicle.dealer.id}`}>View More from This Dealer</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Location Map */}
            <Card className="border-slate-200 shadow-sm rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-slate-900">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 h-40 rounded-xl flex items-center justify-center mb-3">
                  <div className="text-center text-slate-500">
                    <MapPin className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                    <p className="text-sm font-medium">Interactive Map</p>
                    <p className="text-xs">{vehicle.location}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50 rounded-xl" size="sm">
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}