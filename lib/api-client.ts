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

// VEHICLE API WITH FALLBACK FOR SINGLE VEHICLE
export const vehicleApi = {
  getAll: (filters?: SearchFilters) => api.get<Vehicle[]>("/vehicles", { params: filters }),

  // UPDATED: Uses Next.js API route for single vehicles since /vehicles/:id doesn't exist in backend
  getById: async (id: string | number) => {
    console.log(" DEBUG: Fetching vehicle with ID:", id);
    const stringId = String(id);
    
    try {
      // First try the direct backend endpoint (in case it gets added later)
      try {
        return await api.get<Vehicle>(`/vehicles/${stringId}`);
      } catch (directError: any) {
        console.log(" DEBUG: Direct endpoint failed, using Next.js API route...");
        
        // Fallback to Next.js API route
        const response = await fetch(`/api/vehicles/${stringId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Vehicle with ID ${stringId} not found`);
          }
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const vehicleData = await response.json();
        
        // Return in the same format as axios response
        return {
          data: vehicleData,
          status: response.status,
          statusText: response.statusText,
          headers: {},
          config: {}
        };
      }
    } catch (error: any) {
      console.error(" DEBUG: Error fetching vehicle:", error);
      throw error;
    }
  },

  getFeatured: () => api.get<Vehicle[]>("/vehicles/featured"),

  getByDealer: (dealerId: string | number) => {
    const stringId = String(dealerId);
    return api.get<Vehicle[]>(`/vehicles/dealer/${stringId}`);
  },

  create: (data: Partial<Vehicle>) => api.post<Vehicle>("/vehicles", data),

  update: (id: string | number, data: Partial<Vehicle>) => {
    const stringId = String(id);
    return api.put<Vehicle>(`/vehicles/${stringId}`, data);
  },

  delete: (id: string | number) => {
    const stringId = String(id);
    return api.delete(`/vehicles/${stringId}`);
  },

  incrementViews: (id: string | number) => {
    const stringId = String(id);
    return api.post(`/vehicles/${stringId}/views`);
  },
}

// Dealer API - Use string IDs as they are
export const dealerApi = {
  getAll: (filters?: { county?: string; specialty?: string; sortBy?: string }) =>
    api.get<Dealer[]>("/dealers", { params: filters }),

  getById: (id: string | number) => {
    const stringId = String(id);
    return api.get<Dealer>(`/dealers/${stringId}`);
  },

  register: (data: Partial<Dealer>) => api.post<Dealer>("/dealers/register", data),

  login: (email: string, password: string) =>
    api.post<{ dealer: Dealer; token: string }>("/dealers/login", { email, password }),

  update: (id: string | number, data: Partial<Dealer>) => {
    const stringId = String(id);
    return api.put<Dealer>(`/dealers/${stringId}`, data);
  },

  getStats: (dealerId: string | number) => {
    const stringId = String(dealerId);
    return api.get(`/dealers/${stringId}/stats`);
  },
}

// INSPECTION API WITH FALLBACK
export const inspectionApi = {
  // UPDATED: With fallback to Next.js API route
  getByVehicle: async (vehicleId: string | number) => {
    const stringId = String(vehicleId);
    
    try {
      // First try direct backend
      try {
        return await api.get<InspectionReport>(`/inspections/vehicle/${stringId}`);
      } catch (directError: any) {
        console.log(" DEBUG: Direct inspection endpoint failed, using fallback...");
        
        // Fallback to Next.js API route if you create one
        // For now, return null or mock data
        return {
          data: null,
          status: 404,
          statusText: "Not Found",
          headers: {},
          config: {}
        };
      }
    } catch (error: any) {
      console.error(" DEBUG: Error fetching inspection:", error);
      throw error;
    }
  },

  create: (data: Partial<InspectionReport>) => api.post<InspectionReport>("/inspections", data),
}

// Inquiry API - Use string IDs as they are
export const inquiryApi = {
  create: (data: Partial<Inquiry>) => api.post<Inquiry>("/inquiries", data),

  getByDealer: (dealerId: string | number) => {
    const stringId = String(dealerId);
    return api.get<Inquiry[]>(`/inquiries/dealer/${stringId}`);
  },

  updateStatus: (id: string | number, status: string) => {
    const stringId = String(id);
    return api.put(`/inquiries/${stringId}/status`, { status });
  },
}

// Test Drive API - Use string IDs as they are
export const testDriveApi = {
  create: (data: Partial<TestDriveRequest>) => api.post<TestDriveRequest>("/test-drives", data),

  getByDealer: (dealerId: string | number) => {
    const stringId = String(dealerId);
    return api.get<TestDriveRequest[]>(`/test-drives/dealer/${stringId}`);
  },

  updateStatus: (id: string | number, status: string) => {
    const stringId = String(id);
    return api.put(`/test-drives/${stringId}/status`, { status });
  },
}

// Financing API - Use string IDs as they are
export const financingApi = {
  create: (data: Partial<FinancingRequest>) => api.post<FinancingRequest>("/financing", data),

  getByDealer: (dealerId: string | number) => {
    const stringId = String(dealerId);
    return api.get<FinancingRequest[]>(`/financing/dealer/${stringId}`);
  },

  updateStatus: (id: string | number, status: string) => {
    const stringId = String(id);
    return api.put(`/financing/${stringId}/status`, { status });
  },
}

// Admin API - Use string IDs as they are
export const adminApi = {
  getStats: () => api.get("/admin/stats"),

  getPendingDealers: () => api.get<Dealer[]>("/admin/dealers/pending"),

  getPendingListings: () => api.get<Vehicle[]>("/admin/listings/pending"),

  getFlaggedListings: () => api.get<Vehicle[]>("/admin/listings/flagged"),

  approveDealer: (id: string | number) => {
    const stringId = String(id);
    return api.put(`/admin/dealers/${stringId}/approve`);
  },

  rejectDealer: (id: string | number) => {
    const stringId = String(id);
    return api.put(`/admin/dealers/${stringId}/reject`);
  },

  approveVehicle: (id: string | number) => {
    const stringId = String(id);
    return api.put(`/admin/vehicles/${stringId}/approve`);
  },

  rejectVehicle: (id: string | number) => {
    const stringId = String(id);
    return api.put(`/admin/vehicles/${stringId}/reject`);
  },
}

// Upload API (no changes needed - doesn't use IDs)
export const uploadApi = {
  uploadImages: (files: File[]) => {
    const formData = new FormData()
    files.forEach((file) => {
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

// ALTERNATIVE: Simple fetch-based API for vehicle detail page only
// Use this if you want to keep the original vehicleApi unchanged
export const vehicleDetailApi = {
  getById: async (id: string | number): Promise<Vehicle | null> => {
    try {
      const response = await fetch(`/api/vehicles/${id}`);
      
      if (!response.ok) {
        console.error('Failed to fetch vehicle:', response.status);
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      return null;
    }
  }
}