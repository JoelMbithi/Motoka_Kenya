import { NextResponse } from "next/server"

const pendingDealers = [
  {
    id: 4,
    name: "Westlands Auto Hub",
    email: "info@westlandsauto.co.ke",
    phone: "+254 700 456789",
    location: "Nairobi",
    county: "Nairobi",
    address: "Westlands, Nairobi",
    description: "New dealership specializing in luxury vehicles and premium service.",
    specialties: ["Luxury Cars", "Sports Cars", "Premium SUVs"],
    established: 2023,
    website: "https://westlandsauto.co.ke",
    documents: [
      { type: "business_license", url: "/documents/business_license.pdf" },
      { type: "tax_certificate", url: "/documents/tax_cert.pdf" },
    ],
    status: "pending",
    applicationDate: "2024-01-25",
    createdAt: "2024-01-25T10:00:00Z",
  },
  {
    id: 5,
    name: "Eldoret Motors",
    email: "sales@eldoretmotors.co.ke",
    phone: "+254 700 654987",
    location: "Eldoret",
    county: "Uasin Gishu",
    address: "Uganda Road, Eldoret",
    description: "Serving the North Rift region with quality affordable vehicles.",
    specialties: ["Economy Cars", "Commercial Vehicles", "Motorcycles"],
    established: 2023,
    website: "https://eldoretmotors.co.ke",
    documents: [{ type: "business_license", url: "/documents/business_license_2.pdf" }],
    status: "pending",
    applicationDate: "2024-01-28",
    createdAt: "2024-01-28T14:30:00Z",
  },
]

export async function GET() {
  try {
    return NextResponse.json(pendingDealers)
  } catch (error) {
    console.error("Error fetching pending dealers:", error)
    return NextResponse.json({ error: "Failed to fetch pending dealers" }, { status: 500 })
  }
}
