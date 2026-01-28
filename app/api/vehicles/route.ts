/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest, NextResponse } from "next/server"

// Mock data for vehicles
const mockVehicles = [
  {
    id: 1,
    title: "Toyota Camry 2020",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    price: 3200000,
    mileage: 45000,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "Silver",
    location: "Nairobi",
    county: "Nairobi",
    description: "Well maintained Toyota Camry in excellent condition. Single owner, full service history.",
    images: [
      "/placeholder.svg?height=300&width=400&text=Toyota+Camry+Front",
      "/placeholder.svg?height=300&width=400&text=Toyota+Camry+Interior",
      "/placeholder.svg?height=300&width=400&text=Toyota+Camry+Side",
    ],
    features: ["Air Conditioning", "Power Steering", "ABS", "Airbags", "Electric Windows"],
    dealerId: 1,
    dealer: {
      id: 1,
      name: "Premium Motors Ltd",
      location: "Nairobi",
      rating: 4.5,
      verified: true,
    },
    status: "active",
    views: 245,
    inquiries: 12,
    dateAdded: "2024-01-15",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Honda CR-V 2019",
    make: "Honda",
    model: "CR-V",
    year: 2019,
    price: 3800000,
    mileage: 32000,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "White",
    location: "Mombasa",
    county: "Mombasa",
    description: "Honda CR-V in pristine condition. Perfect for family use with excellent fuel economy.",
    images: [
      "/placeholder.svg?height=300&width=400&text=Honda+CR-V+Front",
      "/placeholder.svg?height=300&width=400&text=Honda+CR-V+Interior",
    ],
    features: ["4WD", "Sunroof", "Leather Seats", "Navigation System", "Backup Camera"],
    dealerId: 2,
    dealer: {
      id: 2,
      name: "Coast Auto Sales",
      location: "Mombasa",
      rating: 4.2,
      verified: true,
    },
    status: "active",
    views: 189,
    inquiries: 8,
    dateAdded: "2024-01-20",
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
  },
  {
    id: 3,
    title: "Nissan X-Trail 2021",
    make: "Nissan",
    model: "X-Trail",
    year: 2021,
    price: 4200000,
    mileage: 18000,
    fuelType: "Petrol",
    transmission: "CVT",
    bodyType: "SUV",
    color: "Black",
    location: "Kisumu",
    county: "Kisumu",
    description: "Almost new Nissan X-Trail with low mileage. Comes with warranty.",
    images: ["/placeholder.svg?height=300&width=400&text=Nissan+X-Trail+Front"],
    features: ["CVT Transmission", "7 Seater", "Climate Control", "Cruise Control"],
    dealerId: 1,
    dealer: {
      id: 1,
      name: "Premium Motors Ltd",
      location: "Nairobi",
      rating: 4.5,
      verified: true,
    },
    status: "active",
    views: 156,
    inquiries: 15,
    dateAdded: "2024-01-25",
    createdAt: "2024-01-25T10:00:00Z",
    updatedAt: "2024-01-25T10:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Extract filter parameters
    const make = searchParams.get("make")
    const model = searchParams.get("model")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const year = searchParams.get("year")
    const fuelType = searchParams.get("fuelType")
    const transmission = searchParams.get("transmission")
    const bodyType = searchParams.get("bodyType")
    const location = searchParams.get("location")
    const county = searchParams.get("county")
    const sortBy = searchParams.get("sortBy") || "dateAdded"
    const sortOrder = searchParams.get("sortOrder") || "desc"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")

    let filteredVehicles = [...mockVehicles]

    // Apply filters
    if (make) {
      filteredVehicles = filteredVehicles.filter((v) => v.make.toLowerCase().includes(make.toLowerCase()))
    }

    if (model) {
      filteredVehicles = filteredVehicles.filter((v) => v.model.toLowerCase().includes(model.toLowerCase()))
    }

    if (minPrice) {
      filteredVehicles = filteredVehicles.filter((v) => v.price >= Number.parseInt(minPrice))
    }

    if (maxPrice) {
      filteredVehicles = filteredVehicles.filter((v) => v.price <= Number.parseInt(maxPrice))
    }

    if (year) {
      filteredVehicles = filteredVehicles.filter((v) => v.year === Number.parseInt(year))
    }

    if (fuelType) {
      filteredVehicles = filteredVehicles.filter((v) => v.fuelType.toLowerCase() === fuelType.toLowerCase())
    }

    if (transmission) {
      filteredVehicles = filteredVehicles.filter((v) => v.transmission.toLowerCase() === transmission.toLowerCase())
    }

    if (bodyType) {
      filteredVehicles = filteredVehicles.filter((v) => v.bodyType.toLowerCase() === bodyType.toLowerCase())
    }

    if (location) {
      filteredVehicles = filteredVehicles.filter((v) => v.location.toLowerCase().includes(location.toLowerCase()))
    }

    if (county) {
      filteredVehicles = filteredVehicles.filter((v) => v.county.toLowerCase() === county.toLowerCase())
    }

    // Apply sorting
    filteredVehicles.sort((a, b) => {
      let aValue: any = a[sortBy as keyof typeof a]
      let bValue: any = b[sortBy as keyof typeof b]

      if (sortBy === "price" || sortBy === "year" || sortBy === "mileage") {
        aValue = Number(aValue)
        bValue = Number(bValue)
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedVehicles = filteredVehicles.slice(startIndex, endIndex)

    return NextResponse.json({
      vehicles: paginatedVehicles,
      pagination: {
        page,
        limit,
        total: filteredVehicles.length,
        totalPages: Math.ceil(filteredVehicles.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching vehicles:", error)
    return NextResponse.json({ error: "Failed to fetch vehicles" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const vehicleData = await request.json()

    const newVehicle = {
      id: mockVehicles.length + 1,
      ...vehicleData,
      status: "pending",
      views: 0,
      inquiries: 0,
      dateAdded: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockVehicles.push(newVehicle)

    return NextResponse.json(newVehicle, { status: 201 })
  } catch (error) {
    console.error("Error creating vehicle:", error)
    return NextResponse.json({ error: "Failed to create vehicle" }, { status: 500 })
  }
}
