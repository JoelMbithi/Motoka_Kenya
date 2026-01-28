import { NextResponse } from "next/server"

const pendingListings = [
  {
    id: 4,
    title: "BMW X5 2020",
    make: "BMW",
    model: "X5",
    year: 2020,
    price: 6500000,
    mileage: 35000,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "Black",
    location: "Nairobi",
    county: "Nairobi",
    description: "Luxury BMW X5 in excellent condition with full service history.",
    images: ["/placeholder.svg?height=300&width=400&text=BMW+X5"],
    features: ["Leather Seats", "Sunroof", "Navigation", "4WD"],
    dealerId: 1,
    dealer: {
      id: 1,
      name: "Premium Motors Ltd",
      location: "Nairobi",
      verified: true,
    },
    status: "pending",
    submissionDate: "2024-01-29",
    createdAt: "2024-01-29T09:00:00Z",
  },
  {
    id: 5,
    title: "Mercedes C-Class 2019",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2019,
    price: 5200000,
    mileage: 42000,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "Silver",
    location: "Mombasa",
    county: "Mombasa",
    description: "Luxury Mercedes C-Class with premium features and low mileage.",
    images: ["/placeholder.svg?height=300&width=400&text=Mercedes+C-Class"],
    features: ["Leather Interior", "Premium Sound", "Climate Control", "AMG Package"],
    dealerId: 2,
    dealer: {
      id: 2,
      name: "Coast Auto Sales",
      location: "Mombasa",
      verified: true,
    },
    status: "pending",
    submissionDate: "2024-01-28",
    createdAt: "2024-01-28T11:30:00Z",
  },
]

export async function GET() {
  try {
    return NextResponse.json(pendingListings)
  } catch (error) {
    console.error("Error fetching pending listings:", error)
    return NextResponse.json({ error: "Failed to fetch pending listings" }, { status: 500 })
  }
}
