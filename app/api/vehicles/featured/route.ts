import { NextResponse } from "next/server"

const featuredVehicles = [
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
    featured: true,
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
    description: "Honda CR-V in pristine condition.",
    images: ["/placeholder.svg?height=300&width=400&text=Honda+CR-V"],
    features: ["4WD", "Sunroof", "Leather Seats", "Navigation System"],
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
    featured: true,
  },
]

export async function GET() {
  try {
    return NextResponse.json(featuredVehicles)
  } catch (error) {
    console.error("Error fetching featured vehicles:", error)
    return NextResponse.json({ error: "Failed to fetch featured vehicles" }, { status: 500 })
  }
}
