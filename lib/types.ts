export interface Vehicle {
  id: number
  title: string
  make: string
  model: string
  year: number
  price: number
  location: string
  county: string
  mileage: string
  fuel: string
  transmission: string
  bodyType: string
  color: string
  engine: string
  drivetrain: string
  seats: number
  description: string
  features: string[]
  images: string[]
  dealerId: number
  dealer: Dealer
  verified: boolean
  status: "active" | "sold" | "pending"
  views: number
  inquiries: number
  dateAdded: string
  lat?: number
  lng?: number
}

export interface Dealer {
  id: number
  name: string
  email: string
  phone: string
  whatsapp?: string
  website?: string
  location: string
  county: string
  address: string
  businessType: string
  description: string
  specialties: string[]
  rating: number
  reviews: number
  totalListings: number
  verified: boolean
  established: string
  image?: string
  coverImage?: string
}

export interface User {
  id: number
  name: string
  email: string
  phone: string
  role: "buyer" | "dealer" | "admin"
  verified: boolean
}

export interface Inquiry {
  id: number
  vehicleId: number
  vehicle: Vehicle
  customerName: string
  customerEmail: string
  customerPhone: string
  type: "phone" | "whatsapp" | "email" | "test_drive" | "financing"
  message: string
  status: "new" | "responded" | "scheduled" | "closed"
  date: string
}

export interface TestDriveRequest {
  id: number
  vehicleId: number
  vehicle: Vehicle
  customerName: string
  customerEmail: string
  customerPhone: string
  drivingLicense: string
  preferredDate: string
  preferredTime: string
  message?: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  dateRequested: string
}

export interface FinancingRequest {
  id: number
  vehicleId: number
  vehicle: Vehicle
  customerName: string
  customerEmail: string
  customerPhone: string
  idNumber: string
  employmentType: string
  employer: string
  monthlyIncome: string
  downPayment: number
  loanTerm: number
  existingLoans?: string
  message?: string
  status: "pending" | "approved" | "rejected" | "processing"
  dateRequested: string
}

export interface InspectionReport {
  id: number
  vehicleId: number
  date: string
  score: number
  engine: string
  transmission: string
  brakes: string
  suspension: string
  electrical: string
  body: string
  interior: string
  reportNumber: string
  location: string
  inspector: {
    name: string
    company: string
    license: string
    phone: string
    email: string
    experience: string
    certifications: string[]
  }
}

export interface SearchFilters {
  searchQuery?: string
  priceRange?: [number, number]
  yearRange?: [number, number]
  mileageRange?: [number, number]
  makes?: string[]
  bodyTypes?: string[]
  fuelTypes?: string[]
  transmissions?: string[]
  counties?: string[]
  features?: string[]
  dealerId?: number
}
