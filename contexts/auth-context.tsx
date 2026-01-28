/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  email: string
  name: string
  phone: string
  role: "buyer" | "dealer" | "admin"
  verified: boolean
  dealerId?: number
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: (logoutAll?: boolean) => Promise<void>
  refreshToken: () => Promise<boolean>
  isAuthenticated: boolean
  isDealer: boolean
  isAdmin: boolean
}

interface RegisterData {
  email: string
  password: string
  name: string
  phone: string
  role?: "buyer" | "dealer"
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Get tokens from localStorage
  const getAccessToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken")
    }
    return null
  }

  const getRefreshTokenValue = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("refreshToken")
    }
    return null
  }

  // Set tokens in localStorage
  const setTokens = (accessToken: string, refreshToken: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
    }
  }

  // Clear tokens from localStorage
  const clearTokens = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    }
  }

  // Refresh access token
  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshTokenValue = getRefreshTokenValue()
      if (!refreshTokenValue) return false

      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: refreshTokenValue }),
      })

      if (response.ok) {
        const data = await response.json()
        setTokens(data.accessToken, data.refreshToken)
        return true
      } else {
        clearTokens()
        setUser(null)
        return false
      }
    } catch (error) {
      console.error("Token refresh failed:", error)
      clearTokens()
      setUser(null)
      return false
    }
  }

  // Get current user
  const getCurrentUser = async () => {
    try {
      const accessToken = getAccessToken()
      if (!accessToken) {
        setLoading(false)
        return
      }

      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else if (response.status === 401) {
        // Try to refresh token
        const refreshed = await refreshToken()
        if (refreshed) {
          // Retry getting user
          await getCurrentUser()
        }
      } else {
        clearTokens()
        setUser(null)
      }
    } catch (error) {
      console.error("Get current user failed:", error)
      clearTokens()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/business-dealer-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setTokens(data.accessToken, data.refreshToken)
        setUser(data.user)

        // Redirect based on role
        if (data.user.role === "admin") {
          router.push("/admin")
        } else if (data.user.role === "dealer") {
          router.push("/dealer/dashboard")
        } else {
          router.push("/")
        }
      } else {
        throw new Error(data.error || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  // Register function
  const register = async (userData: RegisterData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (response.ok) {
        if (data.accessToken && data.refreshToken) {
          // User is verified and logged in
          setTokens(data.accessToken, data.refreshToken)
          setUser(data.user)
          router.push("/")
        } else {
          // User needs verification (dealer)
          router.push("/auth/verification-pending")
        }
      } else {
        throw new Error(data.error || "Registration failed")
      }
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  // Logout function
  const logout = async (logoutAll = false) => {
    try {
      const refreshTokenValue = getRefreshTokenValue()

      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(getAccessToken() && { Authorization: `Bearer ${getAccessToken()}` }),
        },
        body: JSON.stringify({
          refreshToken: refreshTokenValue,
          logoutAll,
        }),
      })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      clearTokens()
      setUser(null)
      router.push("/")
    }
  }

  // Initialize auth state
  useEffect(() => {
    getCurrentUser()
  }, [])

  // Set up token refresh interval
  useEffect(() => {
    if (user) {
      const interval = setInterval(
        () => {
          refreshToken()
        },
        14 * 60 * 1000,
      ) // Refresh every 14 minutes

      return () => clearInterval(interval)
    }
  }, [user])

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    refreshToken,
    isAuthenticated: !!user,
    isDealer: user?.role === "dealer",
    isAdmin: user?.role === "admin",
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
