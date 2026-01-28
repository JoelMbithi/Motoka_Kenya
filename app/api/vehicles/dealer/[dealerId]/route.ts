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
    description: "Well maintained Toyota Camry in excellent condition.",
    images: ["/placeholder.svg?height=300&width=400&text=Toyota+Camry"],
    features: ["Air Conditioning", "Power Steering", "ABS", "Airbags"],
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
    description: "Almost new Nissan X-Trail with low mileage.",
    images: ["/placeholder.svg?height=300&width=400&text=Nissan+X-Trail"],
    features: ["CVT Transmission", "7 Seater", "Climate Control"],
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
  },
]

export async function GET(request: NextRequest, { params }: { params: { dealerId: string } }) {
  try {
    const dealerId = Number.parseInt(params.dealerId)
    const dealerVehicles = mockVehicles.filter((v) => v.dealerId === dealerId)

    return NextResponse.json(dealerVehicles)
  } catch (error) {
    console.error("Error fetching dealer vehicles:", error)
    return NextResponse.json({ error: "Failed to fetch dealer vehicles" }, { status: 500 })
  }
}
