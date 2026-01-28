// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward to NestJS backend
    const response = await fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Forward any auth headers if needed
        ...Object.fromEntries(request.headers.entries()),
      },
      body: JSON.stringify(body),
    });
    
    // Get response data
    const data = await response.json();
    
    // Return the exact response from NestJS
    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        // Forward any headers from NestJS
        ...Object.fromEntries(response.headers.entries()),
      },
    });
    
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}