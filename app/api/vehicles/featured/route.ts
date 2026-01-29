// app/api/vehicles/featured/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch from NestJS backend
    const response = await fetch('http://localhost:3001/vehicles/featured');
    
    if (!response.ok) {
      throw new Error(`NestJS error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Return the array
    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error('Error:', error);
    
    // Return empty array on error
    return NextResponse.json([]);
  }
}