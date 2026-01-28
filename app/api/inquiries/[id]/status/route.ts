import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const { status } = await request.json()

    // In a real app, you would update the inquiry status in the database
    // For now, we'll just return a success response

    return NextResponse.json({
      message: "Inquiry status updated",
      inquiryId: id,
      newStatus: status,
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error updating inquiry status:", error)
    return NextResponse.json({ error: "Failed to update inquiry status" }, { status: 500 })
  }
}
