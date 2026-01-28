/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "./auth"

export function withAuth(handler: (request: NextRequest, user: any) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const user = getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return handler(request, user)
  }
}

export function withRole(roles: string[]) {
  return (handler: (request: NextRequest, user: any) => Promise<NextResponse>) => async (request: NextRequest) => {
    const user = getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!roles.includes(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return handler(request, user)
  }
}

export function withDealer(handler: (request: NextRequest, user: any) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const user = getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.role !== "dealer" && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden - Dealer access required" }, { status: 403 })
    }

    return handler(request, user)
  }
}

export function withAdmin(handler: (request: NextRequest, user: any) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const user = getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 })
    }

    return handler(request, user)
  }
}
