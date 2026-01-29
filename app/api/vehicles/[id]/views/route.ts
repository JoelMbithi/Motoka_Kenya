// app/api/vehicles/[id]/views/route.ts
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log(`Views incremented for vehicle ${id}`);
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("Error incrementing views:", error);
    return NextResponse.json(
      { error: "Failed to increment views" },
      { status: 500 }
    );
  }
}