import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {

    
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'APPROVED';
    const county = searchParams.get('county');
    const specialty = searchParams.get('specialty');
    const limit = searchParams.get('limit') || '20';
    
    // Build query params for backend
    const queryParams = new URLSearchParams();
    if (status) queryParams.append('status', status);
    if (county) queryParams.append('county', county);
    if (specialty) queryParams.append('specialty', specialty);
    if (limit) queryParams.append('limit', limit);
    
    const backendUrl = `http://localhost:3001/dealers?${queryParams.toString()}`;
    console.log('Fetching from backend:', backendUrl);
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Backend response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error:', errorText);
      throw new Error(`Backend returned ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Fetched dealers:', data.length);
    
    return NextResponse.json(data, { 
      status: 200,
    });
    
  } catch (error: any) {
    console.error('Error fetching dealers:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch dealers',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}