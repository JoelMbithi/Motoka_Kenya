import { type NextRequest, NextResponse } from "next/server"

const mockInspectionReports = [
  {
    id: 1,
    vehicleId: 1,
    inspectorName: "Kenya Auto Inspection Services",
    inspectionDate: "2024-01-20",
    overallRating: "Excellent",
    report: {
      engine: {
        rating: "Good",
        notes: "Engine runs smoothly, no unusual noises or leaks detected.",
      },
      transmission: {
        rating: "Excellent",
        notes: "Transmission shifts smoothly in all gears.",
      },
      brakes: {
        rating: "Good",
        notes: "Brake pads have 70% life remaining. Brake fluid clean.",
      },
      suspension: {
        rating: "Good",
        notes: "Suspension components in good condition, no excessive wear.",
      },
      electrical: {
        rating: "Excellent",
        notes: "All electrical systems functioning properly.",
      },
      exterior: {
        rating: "Good",
        notes: "Minor scratches on rear bumper, otherwise excellent condition.",
      },
      interior: {
        rating: "Excellent",
        notes: "Interior is well maintained with minimal wear.",
      },
      tires: {
        rating: "Good",
        notes: "Tires have 60% tread remaining, even wear pattern.",
      },
    },
    recommendations: ["Replace brake pads within 6 months", "Minor paint touch-up recommended for rear bumper"],
    certificateNumber: "KAIS-2024-001234",
    validUntil: "2024-07-20",
    createdAt: "2024-01-20T14:00:00Z",
  },
]

export async function GET(request: NextRequest, { params }: { params: { vehicleId: string } }) {
  try {
    const vehicleId = Number.parseInt(params.vehicleId)
    const inspection = mockInspectionReports.find((ir) => ir.vehicleId === vehicleId)

    if (!inspection) {
      return NextResponse.json({ error: "Inspection report not found" }, { status: 404 })
    }

    return NextResponse.json(inspection)
  } catch (error) {
    console.error("Error fetching inspection report:", error)
    return NextResponse.json({ error: "Failed to fetch inspection report" }, { status: 500 })
  }
}
