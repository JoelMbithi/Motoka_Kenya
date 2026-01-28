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
    id: 2,
    vehicleId: 2,
    vehicle: {
      id: 2,
      title: "Honda CR-V 2019",
      price: 3800000,
      images: ["/placeholder.svg?height=300&width=400&text=Honda+CR-V"],
    },
    dealerId: 2,
    customerName: "Jane Smith",
    customerEmail: "jane.smith@email.com",
    customerPhone: "+254 700 333444",
    type: "financing",
    message: "What financing options do you have for this vehicle?",
    status: "responded",
    date: "2024-01-27",
    createdAt: "2024-01-27T14:30:00Z",
    updatedAt: "2024-01-27T16:45:00Z",
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dealerId = searchParams.get("dealerId")
    const status = searchParams.get("status")
    const type = searchParams.get("type")

    let filteredInquiries = [...mockInquiries]

    if (dealerId) {
      filteredInquiries = filteredInquiries.filter((i) => i.dealerId === Number.parseInt(dealerId))
    }

    if (status) {
      filteredInquiries = filteredInquiries.filter((i) => i.status === status)
    }

    if (type) {
      filteredInquiries = filteredInquiries.filter((i) => i.type === type)
    }

    // Sort by most recent first
    filteredInquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json(filteredInquiries)
  } catch (error) {
    console.error("Error fetching inquiries:", error)
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const inquiryData = await request.json()

    const newInquiry = {
      id: mockInquiries.length + 1,
      ...inquiryData,
      status: "new",
      date: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockInquiries.push(newInquiry)

    return NextResponse.json(newInquiry, { status: 201 })
  } catch (error) {
    console.error("Error creating inquiry:", error)
    return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 })
  }
}
