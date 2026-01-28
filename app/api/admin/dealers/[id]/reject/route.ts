import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const { reason } = await request.json()

    // In a real app, you would update the dealer status in the database
    // For now, we'll just return a success response

    return NextResponse.json({
      message: "Dealer rejected",
      dealerId: id,
      status: "rejected",
      reason: reason || "Application does not meet requirements",
      rejectedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error rejecting dealer:", error)
    return NextResponse.json({ error: "Failed to reject dealer" }, { status: 500 })
  }
}
