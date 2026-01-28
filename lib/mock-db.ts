export interface User {
  id: number
  email: string
  password: string
  name: string
  phone: string
  role: "buyer" | "dealer" | "admin"
  verified: boolean
  dealerId?: number
  createdAt: string
  updatedAt: string
}

export interface RefreshToken {
  id: number
  userId: number
  token: string
  expiresAt: string
  createdAt: string
}

// Mock users database
export const mockUsers: User[] = [
  {
    id: 1,
    email: "admin@motokakenya.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS", // password: admin123
    name: "Admin User",
    phone: "+254700000000",
    role: "admin",
    verified: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    email: "dealer@premiummotors.co.ke",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS", // password: dealer123
    name: "John Kamau",
    phone: "+254700123456",
    role: "dealer",
    verified: true,
    dealerId: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 3,
    email: "dealer@coastauto.co.ke",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS", // password: dealer123
    name: "Mary Wanjiku",
    phone: "+254700654321",
    role: "dealer",
    verified: true,
    dealerId: 2,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 4,
    email: "buyer@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS", // password: buyer123
    name: "Peter Mwangi",
    phone: "+254700987654",
    role: "buyer",
    verified: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
]

// Mock refresh tokens database
export const mockRefreshTokens: RefreshToken[] = []

// Helper functions
export function findUserByEmail(email: string): User | undefined {
  return mockUsers.find((user) => user.email === email)
}

export function findUserById(id: number): User | undefined {
  return mockUsers.find((user) => user.id === id)
}

export function createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">): User {
  const newUser: User = {
    ...userData,
    id: mockUsers.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  mockUsers.push(newUser)
  return newUser
}

export function saveRefreshToken(userId: number, token: string): RefreshToken {
  const refreshToken: RefreshToken = {
    id: mockRefreshTokens.length + 1,
    userId,
    token,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    createdAt: new Date().toISOString(),
  }
  mockRefreshTokens.push(refreshToken)
  return refreshToken
}

export function findRefreshToken(token: string): RefreshToken | undefined {
  return mockRefreshTokens.find((rt) => rt.token === token && new Date(rt.expiresAt) > new Date())
}

export function deleteRefreshToken(token: string): void {
  const index = mockRefreshTokens.findIndex((rt) => rt.token === token)
  if (index > -1) {
    mockRefreshTokens.splice(index, 1)
  }
}

export function deleteUserRefreshTokens(userId: number): void {
  const indices = mockRefreshTokens
    .map((rt, index) => (rt.userId === userId ? index : -1))
    .filter((index) => index > -1)
    .reverse()

  indices.forEach((index) => mockRefreshTokens.splice(index, 1))
}
