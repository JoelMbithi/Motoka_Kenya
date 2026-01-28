
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('=== LOGIN API CALLED ===');
  
  try {
    const body = await request.json();
    console.log('Received login data:', body);
    
    const response = await fetch('http://localhost:3001/auth/business-dealer-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log('Backend response:', data);
    
    return NextResponse.json(data, { 
      status: response.status,
    });
    
  } catch (error: any) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Login failed',
        details: error.message 
      },
      { status: 500 }
    );
  }
}