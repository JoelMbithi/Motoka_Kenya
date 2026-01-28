import { type NextRequest, NextResponse } from "next/server"

const mockTestDrives = [
  {
    id: 1,
    vehicleId: 1,
    vehicle: {
      id: 1,
      title: "Toyota Camry 2020",
      price: 3200000,
      images: ["/placeholder.svg?height=300&width=400&text=Toyota+Camry"],
    },
    dealerId: 1,
    customerName: "Alice Brown",
    customerEmail: "alice.brown@email.com",
    customerPhone: "+254 700 777888",
    preferredDate: "2024-02-01",
    preferredTime: "10:00 AM",
    message: "I would like to test drive this vehicle on Thursday morning.",
    status: "pending",
    createdAt: "2024-01-29T08:30:00Z",
    updatedAt: "2024-01-29T08:30:00Z",
  },
]

export async function GET(request: NextRequest, { params }: { params: { dealerId: string } }) {
  try {
    const dealerId = Number.parseInt(params.dealerId)
    const dealerTestDrives = mockTestDrives.filter((td) => td.dealerId === dealerId)

    // Sort by most recent first
    dealerTestDrives.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json(dealerTestDrives)
  } catch (error) {
    console.error("Error fetching dealer test drives:", error)
    return NextResponse.json({ error: "Failed to fetch dealer test drives" }, { status: 500 })
  }
}
