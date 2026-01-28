import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("document") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // In a real app, you would upload the document to cloud storage
    // For now, we'll return a mock URL
    const url = `/documents/${file.name}`

    return NextResponse.json({
      url,
      message: "Document uploaded successfully",
      filename: file.name,
      size: file.size,
    })
  } catch (error) {
    console.error("Error uploading document:", error)
    return NextResponse.json({ error: "Failed to upload document" }, { status: 500 })
  }
}
