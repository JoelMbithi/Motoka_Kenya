import { type NextRequest, NextResponse } from "next/server"

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
    description:
      "Well maintained Toyota Camry in excellent condition. Single owner, full service history. This vehicle has been regularly serviced and is in pristine condition both mechanically and cosmetically.",
    images: [
      "/placeholder.svg?height=300&width=400&text=Toyota+Camry+Front",
      "/placeholder.svg?height=300&width=400&text=Toyota+Camry+Interior",
      "/placeholder.svg?height=300&width=400&text=Toyota+Camry+Side",
      "/placeholder.svg?height=300&width=400&text=Toyota+Camry+Engine",
    ],
    features: [
      "Air Conditioning",
      "Power Steering",
      "ABS Brakes",
      "Dual Airbags",
      "Electric Windows",
      "Central Locking",
      "Alloy Wheels",
      "CD Player",
    ],
    dealerId: 1,
    dealer: {
      id: 1,
      name: "Premium Motors Ltd",
      location: "Nairobi",
      phone: "+254 700 123456",
      email: "info@premiummotors.co.ke",
      rating: 4.5,
      verified: true,
      address: "Mombasa Road, Industrial Area, Nairobi",
    },
    status: "active",
    views: 245,
    inquiries: 12,
    dateAdded: "2024-01-15",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    engineSize: "2.5L",
    drivetrain: "FWD",
    condition: "Used",
    warranty: "6 months",
    financing: true,
    exchange: true,
    inspection: {
      available: true,
      report: {
        overall: "Excellent",
        engine: "Good",
        transmission: "Excellent",
        brakes: "Good",
        suspension: "Good",
        electrical: "Excellent",
      },
    },
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
      phone: "+254 700 654321",
      email: "sales@coastauto.co.ke",
      rating: 4.2,
      verified: true,
      address: "Nyali, Mombasa",
    },
    status: "active",
    views: 189,
    inquiries: 8,
    dateAdded: "2024-01-20",
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
    engineSize: "1.5L Turbo",
    drivetrain: "AWD",
    condition: "Used",
    warranty: "12 months",
    financing: true,
    exchange: true,
    inspection: {
      available: true,
      report: {
        overall: "Good",
        engine: "Excellent",
        transmission: "Good",
        brakes: "Good",
        suspension: "Excellent",
        electrical: "Good",
      },
    },
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const vehicle = mockVehicles.find((v) => v.id === id)

    if (!vehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 })
    }

    return NextResponse.json(vehicle)
  } catch (error) {
    console.error("Error fetching vehicle:", error)
    return NextResponse.json({ error: "Failed to fetch vehicle" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const updateData = await request.json()

    const vehicleIndex = mockVehicles.findIndex((v) => v.id === id)
    if (vehicleIndex === -1) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 })
    }

    mockVehicles[vehicleIndex] = {
      ...mockVehicles[vehicleIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(mockVehicles[vehicleIndex])
  } catch (error) {
    console.error("Error updating vehicle:", error)
    return NextResponse.json({ error: "Failed to update vehicle" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const vehicleIndex = mockVehicles.findIndex((v) => v.id === id)

    if (vehicleIndex === -1) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 })
    }

    mockVehicles.splice(vehicleIndex, 1)

    return NextResponse.json({ message: "Vehicle deleted successfully" })
  } catch (error) {
    console.error("Error deleting vehicle:", error)
    return NextResponse.json({ error: "Failed to delete vehicle" }, { status: 500 })
  }
}
