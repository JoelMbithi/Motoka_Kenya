"use client"

import { useState, useEffect } from "react"
import { Shield, Users, Car, AlertTriangle, CheckCircle, XCircle, Eye, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { adminApi } from "@/lib/api-client"
import type { Dealer, Vehicle } from "@/lib/types"

interface AdminStats {
  totalDealers: number
  pendingDealers: number
  totalListings: number
  pendingListings: number
  flaggedListings: number
  totalUsers: number
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [pendingDealers, setPendingDealers] = useState<Dealer[]>([])
  const [pendingListings, setPendingListings] = useState<Vehicle[]>([])
  const [flaggedListings, setFlaggedListings] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      setLoading(true)

      // Fetch admin stats
      const statsResponse = await adminApi.getStats()
      setStats(statsResponse.data)

      // Fetch pending dealers
      const pendingDealersResponse = await adminApi.getPendingDealers()
      setPendingDealers(pendingDealersResponse.data)

      // Fetch pending listings
      const pendingListingsResponse = await adminApi.getPendingListings()
      setPendingListings(pendingListingsResponse.data)

      // Fetch flagged listings
      const flaggedListingsResponse = await adminApi.getFlaggedListings()
      setFlaggedListings(flaggedListingsResponse.data)
    } catch (error) {
      console.error("Error fetching admin data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApproveDealer = async (dealerId: number) => {
    try {
      await adminApi.approveDealer(dealerId)
      setPendingDealers((prev) => prev.filter((dealer) => dealer.id !== dealerId))
      // Update stats
      if (stats) {
        setStats({
          ...stats,
          pendingDealers: stats.pendingDealers - 1,
          totalDealers: stats.totalDealers + 1,
        })
      }
    } catch (error) {
      console.error("Error approving dealer:", error)
    }
  }

  const handleRejectDealer = async (dealerId: number) => {
    try {
      await adminApi.rejectDealer(dealerId)
      setPendingDealers((prev) => prev.filter((dealer) => dealer.id !== dealerId))
      // Update stats
      if (stats) {
        setStats({
          ...stats,
          pendingDealers: stats.pendingDealers - 1,
        })
      }
    } catch (error) {
      console.error("Error rejecting dealer:", error)
    }
  }

  const handleApproveVehicle = async (vehicleId: number) => {
    try {
      await adminApi.approveVehicle(vehicleId)
      setPendingListings((prev) => prev.filter((vehicle) => vehicle.id !== vehicleId))
      // Update stats
      if (stats) {
        setStats({
          ...stats,
          pendingListings: stats.pendingListings - 1,
          totalListings: stats.totalListings + 1,
        })
      }
    } catch (error) {
      console.error("Error approving vehicle:", error)
    }
  }

  const handleRejectVehicle = async (vehicleId: number) => {
    try {
      await adminApi.rejectVehicle(vehicleId)
      setPendingListings((prev) => prev.filter((vehicle) => vehicle.id !== vehicleId))
      // Update stats
      if (stats) {
        setStats({
          ...stats,
          pendingListings: stats.pendingListings - 1,
        })
      }
    } catch (error) {
      console.error("Error rejecting vehicle:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MK</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Motoka Kenya</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="font-medium">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Settings</Button>
              <Button variant="outline">Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage the Motoka Kenya platform</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="dealers">Dealers</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Dealers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalDealers || 0}</div>
                  <p className="text-xs text-muted-foreground">{stats?.pendingDealers || 0} pending approval</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalListings.toLocaleString() || 0}</div>
                  <p className="text-xs text-muted-foreground">{stats?.pendingListings || 0} pending review</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Flagged Content</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.flaggedListings || 0}</div>
                  <p className="text-xs text-muted-foreground">Requires attention</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Platform Users</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalUsers.toLocaleString() || 0}</div>
                  <p className="text-xs text-muted-foreground">Active users</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Dealer Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingDealers.slice(0, 3).map((dealer) => (
                      <div key={dealer.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{dealer.name}</p>
                          <p className="text-sm text-gray-600">{dealer.location}</p>
                          <p className="text-xs text-gray-500">Applied recently</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleApproveDealer(dealer.id)}>
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleRejectDealer(dealer.id)}>
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {pendingDealers.length === 0 && (
                      <p className="text-gray-500 text-sm">No pending dealer applications</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm">New dealer application received</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm">Vehicle listing approved</p>
                        <p className="text-xs text-gray-500">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div>
                        <p className="text-sm">Listing flagged for review</p>
                        <p className="text-xs text-gray-500">6 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="dealers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Dealer Management</h2>
              <div className="flex gap-2">
                <Input placeholder="Search dealers..." className="w-64" />
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dealer Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Listings</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingDealers.map((dealer) => (
                    <TableRow key={dealer.id}>
                      <TableCell className="font-medium">{dealer.name}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{dealer.email}</p>
                          <p className="text-xs text-gray-500">{dealer.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{dealer.location}</TableCell>
                      <TableCell>{dealer.totalListings}</TableCell>
                      <TableCell>
                        <Badge variant="outline">Pending</Badge>
                      </TableCell>
                      <TableCell>Recent</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleApproveDealer(dealer.id)}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => handleRejectDealer(dealer.id)}>
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {pendingDealers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        No pending dealer applications
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Listing Management</h2>
              <div className="flex gap-2">
                <Input placeholder="Search listings..." className="w-64" />
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Dealer</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingListings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Image
                            src={listing.images[0] || "/placeholder.svg"}
                            alt={listing.title}
                            width={60}
                            height={40}
                            className="rounded object-cover"
                          />
                          <span className="font-medium">{listing.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{listing.dealer.name}</TableCell>
                      <TableCell className="font-medium">KES {listing.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline">Pending Review</Badge>
                      </TableCell>
                      <TableCell>{listing.dateAdded}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Review
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleApproveVehicle(listing.id)}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => handleRejectVehicle(listing.id)}>
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {pendingListings.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No pending vehicle listings
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-6">
            <h2 className="text-xl font-semibold">Content Moderation</h2>

            <Card>
              <CardHeader>
                <CardTitle>Flagged Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Dealer</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Date Reported</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flaggedListings.map((listing) => (
                      <TableRow key={listing.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Image
                              src={listing.images[0] || "/placeholder.svg"}
                              alt={listing.title}
                              width={60}
                              height={40}
                              className="rounded object-cover"
                            />
                            <span className="font-medium">{listing.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{listing.dealer.name}</TableCell>
                        <TableCell>Suspicious pricing</TableCell>
                        <TableCell>Recent</TableCell>
                        <TableCell>
                          <Badge variant="outline">Under Review</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Review
                            </Button>
                            <Button size="sm" variant="outline">
                              Resolve
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {flaggedListings.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No flagged listings
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
