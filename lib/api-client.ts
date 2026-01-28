import api from "./api"
import type {
  Vehicle,
  Dealer,
  Inquiry,
  TestDriveRequest,
  FinancingRequest,
  InspectionReport,
  SearchFilters,
} from "./types"

// Vehicle API
export const vehicleApi = {
  getAll: (filters?: SearchFilters) => api.get<Vehicle[]>("/vehicles", { params: filters }),

  getById: (id: number) => api.get<Vehicle>(`/vehicles/${id}`),

  getFeatured: () => api.get<Vehicle[]>("/vehicles/featured"),

  getByDealer: (dealerId: number) => api.get<Vehicle[]>(`/vehicles/dealer/${dealerId}`),

  create: (data: Partial<Vehicle>) => api.post<Vehicle>("/vehicles", data),

  update: (id: number, data: Partial<Vehicle>) => api.put<Vehicle>(`/vehicles/${id}`, data),

  delete: (id: number) => api.delete(`/vehicles/${id}`),

  incrementViews: (id: number) => api.post(`/vehicles/${id}/views`),
}

// Dealer API
export const dealerApi = {
  getAll: (filters?: { county?: string; specialty?: string; sortBy?: string }) =>
    api.get<Dealer[]>("/dealers", { params: filters }),

  getById: (id: number) => api.get<Dealer>(`/dealers/${id}`),

  register: (data: Partial<Dealer>) => api.post<Dealer>("/dealers/register", data),

  login: (email: string, password: string) =>
    api.post<{ dealer: Dealer; token: string }>("/dealers/login", { email, password }),

  update: (id: number, data: Partial<Dealer>) => api.put<Dealer>(`/dealers/${id}`, data),

  getStats: (dealerId: number) => api.get(`/dealers/${dealerId}/stats`),
}

// Inquiry API
export const inquiryApi = {
  create: (data: Partial<Inquiry>) => api.post<Inquiry>("/inquiries", data),

  getByDealer: (dealerId: number) => api.get<Inquiry[]>(`/inquiries/dealer/${dealerId}`),

  updateStatus: (id: number, status: string) => api.put(`/inquiries/${id}/status`, { status }),
}

// Test Drive API
export const testDriveApi = {
  create: (data: Partial<TestDriveRequest>) => api.post<TestDriveRequest>("/test-drives", data),

  getByDealer: (dealerId: number) => api.get<TestDriveRequest[]>(`/test-drives/dealer/${dealerId}`),

  updateStatus: (id: number, status: string) => api.put(`/test-drives/${id}/status`, { status }),
}

// Financing API
export const financingApi = {
  create: (data: Partial<FinancingRequest>) => api.post<FinancingRequest>("/financing", data),

  getByDealer: (dealerId: number) => api.get<FinancingRequest[]>(`/financing/dealer/${dealerId}`),

  updateStatus: (id: number, status: string) => api.put(`/financing/${id}/status`, { status }),
}

// Inspection API
export const inspectionApi = {
  getByVehicle: (vehicleId: number) => api.get<InspectionReport>(`/inspections/vehicle/${vehicleId}`),

  create: (data: Partial<InspectionReport>) => api.post<InspectionReport>("/inspections", data),
}

// Admin API
export const adminApi = {
  getStats: () => api.get("/admin/stats"),

  getPendingDealers: () => api.get<Dealer[]>("/admin/dealers/pending"),

  getPendingListings: () => api.get<Vehicle[]>("/admin/listings/pending"),

  getFlaggedListings: () => api.get<Vehicle[]>("/admin/listings/flagged"),

  approveDealer: (id: number) => api.put(`/admin/dealers/${id}/approve`),

  rejectDealer: (id: number) => api.put(`/admin/dealers/${id}/reject`),

  approveVehicle: (id: number) => api.put(`/admin/vehicles/${id}/approve`),

  rejectVehicle: (id: number) => api.put(`/admin/vehicles/${id}/reject`),
}

// Upload API
export const uploadApi = {
  uploadImages: (files: File[]) => {
    const formData = new FormData()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    files.forEach((file, index) => {
      formData.append(`images`, file)
    })
    return api.post<{ urls: string[] }>("/upload/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  },

  uploadDocument: (file: File) => {
    const formData = new FormData()
    formData.append("document", file)
    return api.post<{ url: string }>("/upload/document", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  },
}
