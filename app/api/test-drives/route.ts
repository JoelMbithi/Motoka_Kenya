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
    customerName: "Bob Wilson",
    customerEmail: "bob.wilson@email.com",
    customerPhone: "+254 700 999000",
    preferredDate: "2024-02-02",
    preferredTime: "2:00 PM",
    message: "Available for test drive this Friday afternoon.",
    status: "confirmed",
    createdAt: "2024-01-28T15:20:00Z",
    updatedAt: "2024-01-29T09:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dealerId = searchParams.get("dealerId")
    const status = searchParams.get("status")

    let filteredTestDrives = [...mockTestDrives]

    if (dealerId) {
      filteredTestDrives = filteredTestDrives.filter((td) => td.dealerId === Number.parseInt(dealerId))
    }

    if (status) {
      filteredTestDrives = filteredTestDrives.filter((td) => td.status === status)
    }

    // Sort by most recent first
    filteredTestDrives.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json(filteredTestDrives)
  } catch (error) {
    console.error("Error fetching test drives:", error)
    return NextResponse.json({ error: "Failed to fetch test drives" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const testDriveData = await request.json()

    const newTestDrive = {
      id: mockTestDrives.length + 1,
      ...testDriveData,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockTestDrives.push(newTestDrive)

    return NextResponse.json(newTestDrive, { status: 201 })
  } catch (error) {
    console.error("Error creating test drive request:", error)
    return NextResponse.json({ error: "Failed to create test drive request" }, { status: 500 })
  }
}
