import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const { reason } = await request.json()

    // In a real app, you would update the vehicle status in the database
    // For now, we'll just return a success response

    return NextResponse.json({
      message: "Vehicle listing rejected",
      vehicleId: id,
      status: "rejected",
      reason: reason || "Listing does not meet quality standards",
      rejectedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error rejecting vehicle:", error)
    return NextResponse.json({ error: "Failed to reject vehicle" }, { status: 500 })
  }
}
