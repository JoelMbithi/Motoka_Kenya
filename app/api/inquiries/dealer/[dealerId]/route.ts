import { type NextRequest, NextResponse } from "next/server"

const mockInquiries = [
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
    customerName: "John Doe",
    customerEmail: "john.doe@email.com",
    customerPhone: "+254 700 111222",
    type: "general",
    message: "I'm interested in this vehicle. Is it still available?",
    status: "new",
    date: "2024-01-28",
    createdAt: "2024-01-28T10:00:00Z",
    updatedAt: "2024-01-28T10:00:00Z",
  },
  {
    id: 3,
    vehicleId: 1,
    vehicle: {
      id: 1,
      title: "Toyota Camry 2020",
      price: 3200000,
      images: ["/placeholder.svg?height=300&width=400&text=Toyota+Camry"],
    },
    dealerId: 1,
    customerName: "Mike Johnson",
    customerEmail: "mike.johnson@email.com",
    customerPhone: "+254 700 555666",
    type: "test_drive",
    message: "I would like to schedule a test drive for this weekend.",
    status: "new",
    date: "2024-01-26",
    createdAt: "2024-01-26T09:15:00Z",
    updatedAt: "2024-01-26T09:15:00Z",
  },
]

export async function GET(request: NextRequest, { params }: { params: { dealerId: string } }) {
  try {
    const dealerId = Number.parseInt(params.dealerId)
    const dealerInquiries = mockInquiries.filter((i) => i.dealerId === dealerId)

    // Sort by most recent first
    dealerInquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json(dealerInquiries)
  } catch (error) {
    console.error("Error fetching dealer inquiries:", error)
    return NextResponse.json({ error: "Failed to fetch dealer inquiries" }, { status: 500 })
  }
}
