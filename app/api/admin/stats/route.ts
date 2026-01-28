import { NextResponse } from "next/server"

export async function GET() {
  try {
    const stats = {
      totalVehicles: 1247,
      activeListings: 1089,
      totalDealers: 156,
      verifiedDealers: 142,
      pendingApprovals: 23,
      totalInquiries: 3456,
      thisMonthSales: 89,
      revenue: 245000000,
      growth: {
        vehicles: 12.5,
        dealers: 8.3,
        inquiries: 15.7,
        sales: 22.1,
      },
      recentActivity: [
        { type: "dealer_registration", message: "New dealer registered: Coast Motors", time: "2 hours ago" },
        { type: "vehicle_listing", message: "15 new vehicles listed today", time: "4 hours ago" },
        { type: "inquiry", message: "89 new inquiries this week", time: "1 day ago" },
        { type: "sale", message: "Vehicle sold: Toyota Prado 2021", time: "2 days ago" },
      ],
      topPerformingDealers: [
        { id: 1, name: "Premium Motors Ltd", sales: 23, revenue: 45000000 },
        { id: 2, name: "Coast Auto Sales", sales: 18, revenue: 32000000 },
        { id: 3, name: "Rift Valley Motors", sales: 15, revenue: 28000000 },
      ],
      popularVehicleTypes: [
        { type: "SUV", count: 342, percentage: 27.4 },
        { type: "Sedan", count: 298, percentage: 23.9 },
        { type: "Hatchback", count: 245, percentage: 19.6 },
        { type: "Pickup", count: 189, percentage: 15.2 },
        { type: "Other", count: 173, percentage: 13.9 },
      ],
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Failed to fetch admin stats" }, { status: 500 })
  }
}
