import { type NextRequest, NextResponse } from "next/server"

const mockFinancingRequests = [
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
    customerName: "David Lee",
    customerEmail: "david.lee@email.com",
    customerPhone: "+254 700 123789",
    loanAmount: 2500000,
    downPayment: 700000,
    loanTerm: 48,
    monthlyIncome: 150000,
    employment: "Software Engineer",
    status: "pending",
    createdAt: "2024-01-29T11:00:00Z",
    updatedAt: "2024-01-29T11:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dealerId = searchParams.get("dealerId")
    const status = searchParams.get("status")

    let filteredRequests = [...mockFinancingRequests]

    if (dealerId) {
      filteredRequests = filteredRequests.filter((fr) => fr.dealerId === Number.parseInt(dealerId))
    }

    if (status) {
      filteredRequests = filteredRequests.filter((fr) => fr.status === status)
    }

    // Sort by most recent first
    filteredRequests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json(filteredRequests)
  } catch (error) {
    console.error("Error fetching financing requests:", error)
    return NextResponse.json({ error: "Failed to fetch financing requests" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const financingData = await request.json()

    const newFinancingRequest = {
      id: mockFinancingRequests.length + 1,
      ...financingData,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockFinancingRequests.push(newFinancingRequest)

    return NextResponse.json(newFinancingRequest, { status: 201 })
  } catch (error) {
    console.error("Error creating financing request:", error)
    return NextResponse.json({ error: "Failed to create financing request" }, { status: 500 })
  }
}
