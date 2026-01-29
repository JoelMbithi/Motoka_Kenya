import { NextRequest, NextResponse } from 'next/server';

// Helper function to calculate seats based on body type
function calculateSeats(vehicle: any): number {
  const bodyType = vehicle.bodyType?.toUpperCase();
  
  // Check existing seats first
  if (vehicle.seats !== undefined && vehicle.seats !== null) {
    return Number(vehicle.seats);
  }
  
  // Seat mapping based on body type
  const seatMap: Record<string, number> = {
    'SUV': 7,
    'SEDAN': 5,
    'HATCHBACK': 5,
    'STATION WAGON': 5,
    'PICKUP': 5,
    'PICKUP TRUCK': 5,
    'MINIVAN': 8,
    'VAN': 8,
    'COUPE': 4,
    'CONVERTIBLE': 4,
    'SPORTS': 2,
    'TRUCK': 3,
  };
  
  if (bodyType && seatMap[bodyType]) {
    return seatMap[bodyType];
  }
  
  // Partial matches
  if (bodyType?.includes('SUV')) return 7;
  if (bodyType?.includes('MINIVAN') || bodyType?.includes('VAN')) return 8;
  if (bodyType?.includes('COUPE')) return 4;
  if (bodyType?.includes('CONVERTIBLE')) return 4;
  if (bodyType?.includes('SPORTS')) return 2;
  if (bodyType?.includes('TRUCK') || bodyType?.includes('PICKUP')) return 5;
  
  return 5; // default
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the ID from params
    const id = (await params).id;
    console.log(' Fetching vehicle with ID:', id);
    
    // Fetch all vehicles from your real backend
    const backendUrl = 'http://localhost:3001/vehicles';
    console.log(' Calling backend URL:', backendUrl);
    
    const response = await fetch(backendUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error(' Backend error:', response.status, response.statusText);
      return NextResponse.json(
        { error: `Backend error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }
    
    const vehicles = await response.json();
    console.log(` Received ${Array.isArray(vehicles) ? vehicles.length : 0} vehicles from backend`);
    
    // Make sure vehicles is an array
    if (!Array.isArray(vehicles)) {
      console.error(' Backend response is not an array:', typeof vehicles);
      return NextResponse.json(
        { error: 'Invalid response format from backend' },
        { status: 500 }
      );
    }
    
    // Log first vehicle to see its structure
    if (vehicles.length > 0) {
      console.log(' First vehicle from backend:', {
        id: vehicles[0].id,
        hasSeats: 'seats' in vehicles[0],
        seatsValue: vehicles[0].seats,
        bodyType: vehicles[0].bodyType,
        allKeys: Object.keys(vehicles[0])
      });
    }
    
    // Find the vehicle by ID
    let vehicle = vehicles.find(v => v.id === id);
    
    // Try case-insensitive match if exact match fails
    if (!vehicle) {
      vehicle = vehicles.find(v => 
        v.id?.toString().toLowerCase() === id.toLowerCase()
      );
    }
    
    // Try numeric match if ID can be parsed as a number
    if (!vehicle && !isNaN(Number(id))) {
      vehicle = vehicles.find(v => 
        v.id === Number(id) || v.id?.toString() === id
      );
    }
    
    if (!vehicle) {
      console.log(` Vehicle with ID "${id}" not found in backend data`);
      return NextResponse.json(
        { error: `Vehicle with ID "${id}" not found` },
        { status: 404 }
      );
    }
    
    console.log(` Found vehicle: ${vehicle.title} (${vehicle.id})`);
    console.log(` Vehicle has seats field:`, 'seats' in vehicle);
    console.log(` Vehicle seats value:`, vehicle.seats);
    console.log(` Vehicle bodyType:`, vehicle.bodyType);
    
    //  CRITICAL FIX: Calculate seats if missing
    const seatsValue = vehicle.seats || calculateSeats(vehicle);
    console.log(` Seats value to use: ${seatsValue}`);
    
    // Ensure the vehicle has all required fields for your frontend
    const formattedVehicle = {
      id: vehicle.id,
      title: vehicle.title || '',
      price: vehicle.price || 0,
      mileage: vehicle.mileage || '',
      fuel: vehicle.fuel || '',
      year: vehicle.year || 0,
      location: vehicle.location || '',
      verified: vehicle.verified || false,
      images: Array.isArray(vehicle.images) ? vehicle.images : [vehicle.image || '/placeholder.svg'].filter(Boolean),
      dealer: {
        id: vehicle.dealer?.id || 'unknown',
        name: vehicle.dealer?.name || 'Unknown Dealer',
        rating: vehicle.dealer?.rating || 0,
        phone: vehicle.dealer?.phone || '',
        location: vehicle.dealer?.location || vehicle.location || '',
        reviews: vehicle.dealer?.reviews || 0,
        verified: vehicle.dealer?.verified || false,
      },
      description: vehicle.description || '',
      features: Array.isArray(vehicle.features) ? vehicle.features : [],
      make: vehicle.make || '',
      model: vehicle.model || '',
      transmission: vehicle.transmission || '',
      engine: vehicle.engine || '',
      color: vehicle.color || '',
      bodyType: vehicle.bodyType || '',
      drivetrain: vehicle.drivetrain || '',
      //  ADD SEATS HERE - either from DB or calculated
      seats: seatsValue,
      views: vehicle.views || 0,
    };
    
    console.log(' Final formatted vehicle seats:', formattedVehicle.seats);
    
    return NextResponse.json(formattedVehicle);
    
  } catch (error) {
    console.error(' Error in vehicle API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}