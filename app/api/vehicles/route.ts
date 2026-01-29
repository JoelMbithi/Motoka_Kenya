// app/api/vehicles/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const search = searchParams.get('search') || '';
    const county = searchParams.get('county') || '';
    const dealerId = searchParams.get('dealerId') || '';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const minYear = searchParams.get('minYear') || '';
    const maxYear = searchParams.get('maxYear') || '';
    const fuel = searchParams.get('fuel') || '';
    const transmission = searchParams.get('transmission') || '';
    const bodyType = searchParams.get('bodyType') || '';
    const limit = searchParams.get('limit') || '20';
    
    // Build query params for NestJS backend
    const queryParams = new URLSearchParams();
    
    if (search) queryParams.append('search', search);
    if (county) queryParams.append('county', county);
    if (dealerId) queryParams.append('dealerId', dealerId);
    if (minPrice) queryParams.append('minPrice', minPrice);
    if (maxPrice) queryParams.append('maxPrice', maxPrice);
    if (minYear) queryParams.append('minYear', minYear);
    if (maxYear) queryParams.append('maxYear', maxYear);
    if (fuel) queryParams.append('fuel', fuel);
    if (transmission) queryParams.append('transmission', transmission);
    if (bodyType) queryParams.append('bodyType', bodyType);
    if (limit) queryParams.append('limit', limit);
    
    const backendUrl = `http://localhost:3001/vehicles?${queryParams.toString()}`;
    console.log('Fetching from:', backendUrl);
    
    const response = await fetch(backendUrl);
    
    if (!response.ok) {
      throw new Error(`NestJS error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error('Error fetching vehicles:', error);
    
    // Return empty array on error
    return NextResponse.json([]);
  }
}