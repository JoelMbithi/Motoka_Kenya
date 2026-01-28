import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    // In a real app, you would update the vehicle status in the database
    // For now, we'll just return a success response

    return NextResponse.json({
      message: "Vehicle listing approved successfully",
      vehicleId: id,
      status: "active",
      approvedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error approving vehicle:", error)
    return NextResponse.json({ error: "Failed to approve vehicle" }, { status: 500 })
  }
}
