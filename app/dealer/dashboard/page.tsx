"use client"
import React, { useState } from "react"
import { Plus, Car, Eye, Edit, Trash2, TrendingUp, MessageSquare, Star, Phone,  } from "lucide-react"

// Mock data - replace with real API calls
const mockStats = {
  totalListings: 24,
  activeListings: 20,
  totalViews: 12450,
  inquiries: 38,
  rating: 4.8,
  reviews: 156
}

const mockListings = [
  {
    id: 1,
    title: "Toyota Prado 2020 - Excellent Condition",
    price: 4500000,
    status: "active",
    views: 245,
    inquiries: 8,
    dateAdded: "2024-01-15",
    image: "/api/placeholder/200/120"
  },
  {
    id: 2,
    title: "Honda CR-V 2019 - Low Mileage",
    price: 3200000,
    status: "active",
    views: 189,
    inquiries: 5,
    dateAdded: "2024-01-12",
    image: "/api/placeholder/200/120"
  },
  {
    id: 3,
    title: "BMW X5 2021 - Premium Package",
    price: 6800000,
    status: "sold",
    views: 356,
    inquiries: 12,
    dateAdded: "2024-01-10",
    image: "/api/placeholder/200/120"
  }
]

const mockInquiries = [
  {
    id: 1,
    customerName: "John Kamau",
    vehicleTitle: "Toyota Prado 2020",
    type: "Phone Call",
    date: "2024-01-16",
    status: "new",
    phone: "+254 722 123 456"
  },
  {
    id: 2,
    customerName: "Mary Wanjiku",
    vehicleTitle: "Honda CR-V 2019",
    type: "WhatsApp",
    date: "2024-01-15",
    status: "responded",
    phone: "+254 733 987 654"
  },
  {
    id: 3,
    customerName: "Peter Ochieng",
    vehicleTitle: "BMW X5 2021",
    type: "Email",
    date: "2024-01-14",
    status: "new",
    phone: "+254 711 555 777"
  }
]

export default function ModernizedDealerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [stats] = useState(mockStats)
  const [listings, setListings] = useState(mockListings)
  const [inquiries, setInquiries] = useState(mockInquiries)

  interface StatCardProps {
    icon: React.ElementType;
    title: string;
    value: string;
    subtitle?: string;
    trend?: number;
  }

  const handleDeleteVehicle = (vehicleId: number) => {
    setListings(prev => prev.filter(vehicle => vehicle.id !== vehicleId))
  }

  const handleUpdateInquiryStatus = (inquiryId: number, status: string) => {
    setInquiries(prev =>
      prev.map(inquiry => 
        inquiry.id === inquiryId ? { ...inquiry, status } : inquiry
      )
    )
  }

  const StatCard = ({ icon: Icon, title, value, subtitle, trend }: StatCardProps) => (
    <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <Icon className="h-4 w-4 text-emerald-600" />
        </div>
        {trend && (
          <div className="text-xs text-emerald-600 font-medium">+{trend}%</div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-xs font-medium text-stone-600 uppercase tracking-wide">{title}</h3>
        <p className="text-2xl font-bold text-stone-800">{value}</p>
        {subtitle && <p className="text-xs text-stone-500">{subtitle}</p>}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">MK</span>
                </div>
                <span className="text-lg font-semibold text-stone-800">Motoka Kenya</span>
              </div>
              <span className="text-stone-400">|</span>
              <span className="font-medium text-stone-700 text-sm">Dealer Dashboard</span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center space-x-1.5">
                <Plus className="w-3 h-3" />
                <span>Add Listing</span>
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors">
                Profile
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-stone-800 mb-1">Welcome back!</h1>
          <p className="text-stone-600 text-sm">Manage your vehicle listings and track your performance</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-stone-200">
            <nav className="flex space-x-6 overflow-x-auto">
              {[
                { id: "overview", label: "Overview" },
                { id: "listings", label: "My Listings" },
                { id: "inquiries", label: "Inquiries" },
                { id: "analytics", label: "Analytics" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard 
                icon={Car} 
                title="Total Listings" 
                value={stats.totalListings.toString()} 
                subtitle={`${stats.activeListings} active`}
              />
              <StatCard 
                icon={Eye} 
                title="Total Views" 
                value={stats.totalViews.toLocaleString()} 
                subtitle="This month"
                trend={12}
              />
              <StatCard 
                icon={MessageSquare} 
                title="Inquiries" 
                value={stats.inquiries.toString()} 
                subtitle="5 new this week"
              />
              <StatCard 
                icon={Star} 
                title="Rating" 
                value={stats.rating.toString()} 
                subtitle={`${stats.reviews} reviews`}
              />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Listings */}
              <div className="bg-white rounded-xl border border-stone-200 shadow-sm">
                <div className="p-4 border-b border-stone-100">
                  <h3 className="font-semibold text-stone-800">Recent Listings</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {listings.slice(0, 3).map((listing) => (
                      <div key={listing.id} className="flex items-center space-x-3 p-2 hover:bg-stone-50 rounded-lg transition-colors">
                        <div className="w-12 h-8 bg-stone-200 rounded overflow-hidden">
                          <div className="w-full h-full bg-stone-300"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-stone-800 truncate">{listing.title}</p>
                          <p className="text-xs text-stone-600">KES {listing.price.toLocaleString()}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          listing.status === "active"
                            ? "bg-emerald-100 text-emerald-700"
                            : listing.status === "sold"
                              ? "bg-stone-100 text-stone-700"
                              : "bg-amber-100 text-amber-700"
                        }`}>
                          {listing.status}
                        </span>
                      </div>
                    ))}
                    {listings.length === 0 && (
                      <p className="text-stone-500 text-sm text-center py-4">No listings yet</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Recent Inquiries */}
              <div className="bg-white rounded-xl border border-stone-200 shadow-sm">
                <div className="p-4 border-b border-stone-100">
                  <h3 className="font-semibold text-stone-800">Recent Inquiries</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {inquiries.slice(0, 3).map((inquiry) => (
                      <div key={inquiry.id} className="flex items-center justify-between p-2 hover:bg-stone-50 rounded-lg transition-colors">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-stone-800">{inquiry.customerName}</p>
                          <p className="text-xs text-stone-600 truncate">{inquiry.vehicleTitle}</p>
                          <p className="text-xs text-stone-500">
                            {inquiry.type} • {inquiry.date}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          inquiry.status === "new" 
                            ? "bg-emerald-100 text-emerald-700" 
                            : "bg-stone-100 text-stone-700"
                        }`}>
                          {inquiry.status}
                        </span>
                      </div>
                    ))}
                    {inquiries.length === 0 && (
                      <p className="text-stone-500 text-sm text-center py-4">No inquiries yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === "listings" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-stone-800">My Listings</h2>
              <button className="px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center space-x-1.5">
                <Plus className="w-3 h-3" />
                <span>Add New Listing</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-stone-200">
                  <thead className="bg-stone-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wide">Vehicle</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wide">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wide">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wide">Views</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wide">Inquiries</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wide">Date Added</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-stone-500 uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-stone-200">
                    {listings.map((listing) => (
                      <tr key={listing.id} className="hover:bg-stone-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-8 bg-stone-200 rounded overflow-hidden">
                              <div className="w-full h-full bg-stone-300"></div>
                            </div>
                            <span className="font-medium text-sm text-stone-800">{listing.title}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium text-sm text-stone-800">KES {listing.price.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            listing.status === "active"
                              ? "bg-emerald-100 text-emerald-700"
                              : listing.status === "sold"
                                ? "bg-stone-100 text-stone-700"
                                : "bg-amber-100 text-amber-700"
                          }`}>
                            {listing.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-stone-600">{listing.views}</td>
                        <td className="px-4 py-3 text-sm text-stone-600">{listing.inquiries}</td>
                        <td className="px-4 py-3 text-sm text-stone-600">{listing.dateAdded}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="p-1 text-stone-400 hover:text-emerald-600 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-stone-400 hover:text-blue-600 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteVehicle(listing.id)}
                              className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {listings.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-stone-500">
                          <p>No listings yet.</p>
                          <button className="text-emerald-600 hover:underline text-sm mt-1">
                            Add your first listing
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Inquiries Tab */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-stone-800">Customer Inquiries</h2>

            <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-stone-200">
                  <thead className="bg-stone-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wide">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wide">Vehicle</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wide">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wide">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wide">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-stone-500 uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-stone-200">
                    {inquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="hover:bg-stone-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-sm text-stone-800">{inquiry.customerName}</td>
                        <td className="px-4 py-3 text-sm text-stone-600">{inquiry.vehicleTitle}</td>
                        <td className="px-4 py-3 text-sm text-stone-600">{inquiry.type}</td>
                        <td className="px-4 py-3 text-sm text-stone-600">{inquiry.date}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            inquiry.status === "new" 
                              ? "bg-emerald-100 text-emerald-700" 
                              : "bg-stone-100 text-stone-700"
                          }`}>
                            {inquiry.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handleUpdateInquiryStatus(inquiry.id, "responded")}
                              className="px-3 py-1 text-xs font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors"
                            >
                              Reply
                            </button>
                            <button className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors flex items-center space-x-1">
                              <Phone className="w-3 h-3" />
                              <span>Call</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {inquiries.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-stone-500">
                          No inquiries yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-stone-800">Performance Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
                <h3 className="font-semibold text-stone-800 mb-4">Views Over Time</h3>
                <div className="h-48 bg-stone-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-stone-500">
                    <TrendingUp className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm">Analytics Chart</p>
                    <p className="text-xs">Views trend visualization</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
                <h3 className="font-semibold text-stone-800 mb-4">Top Performing Listings</h3>
                <div className="space-y-3">
                  {listings.slice(0, 3).map((listing, index) => (
                    <div key={listing.id} className="flex items-center justify-between p-2 hover:bg-stone-50 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-bold text-stone-400">#{index + 1}</span>
                        <div>
                          <p className="font-medium text-sm text-stone-800">{listing.title}</p>
                          <p className="text-xs text-stone-600">{listing.views} views</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                        {listing.inquiries} inquiries
                      </span>
                    </div>
                  ))}
                  {listings.length === 0 && (
                    <p className="text-stone-500 text-sm text-center py-4">No data available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}