import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const dealerId = params.id;
    
    // Fetch from NestJS backend
    const response = await fetch(`http://localhost:3001/dealers/${dealerId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { success: false, error: 'Dealer not found' },
          { status: 404 }
        );
      }
      throw new Error(`Backend error: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error('Error fetching dealer:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}