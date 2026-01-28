import { NextResponse } from "next/server"

const flaggedListings = [
  {
    id: 6,
    title: "Toyota Hilux 2018",
    make: "Toyota",
    model: "Hilux",
    year: 2018,
    price: 3800000,
    mileage: 85000,
    fuelType: "Diesel",
    transmission: "Manual",
    bodyType: "Pickup",
    color: "White",
    location: "Kisumu",
    county: "Kisumu",
    description: "Toyota Hilux pickup truck in good working condition.",
    images: ["/placeholder.svg?height=300&width=400&text=Toyota+Hilux"],
    features: ["4WD", "Air Conditioning", "Power Steering"],
    dealerId: 3,
    dealer: {
      id: 3,
      name: "Rift Valley Motors",
      location: "Nakuru",
      verified: true,
    },
    status: "flagged",
    flagReason: "Suspicious pricing - significantly below market value",
    flaggedBy: "system",
    flaggedDate: "2024-01-27",
    createdAt: "2024-01-26T13:00:00Z",
  },
]

export async function GET() {
  try {
    return NextResponse.json(flaggedListings)
  } catch (error) {
    console.error("Error fetching flagged listings:", error)
    return NextResponse.json({ error: "Failed to fetch flagged listings" }, { status: 500 })
  }
}
