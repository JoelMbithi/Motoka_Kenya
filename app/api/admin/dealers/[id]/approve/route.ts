import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    // In a real app, you would update the dealer status in the database
    // For now, we'll just return a success response

    return NextResponse.json({
      message: "Dealer approved successfully",
      dealerId: id,
      status: "approved",
      approvedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error approving dealer:", error)
    return NextResponse.json({ error: "Failed to approve dealer" }, { status: 500 })
  }
}
