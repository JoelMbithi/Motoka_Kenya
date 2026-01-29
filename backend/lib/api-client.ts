// lib/api-client.ts - COMPLETE REPLACEMENT
import { InspectionReport, SearchFilters, Vehicle } from "./types";

export const vehicleApi = {
  // Get all vehicles
  getAll: async (filters: SearchFilters = {}): Promise<{ data: Vehicle[] }> => {
    try {
      const params = new URLSearchParams();
      
      if (filters.searchQuery) params.append('search', filters.searchQuery);
      if (filters.counties?.length) params.append('county', filters.counties[0]);
      if (filters.dealerId) params.append('dealerId', filters.dealerId.toString());
      if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
      if (filters.yearRange) {
        params.append('minYear', filters.yearRange.min.toString());
        params.append('maxYear', filters.yearRange.max.toString());
      }
      if (filters.fuelType) params.append('fuel', filters.fuelType);
      if (filters.transmission) params.append('transmission', filters.transmission);
      if (filters.bodyType) params.append('bodyType', filters.bodyType);
      
      const url = `/api/vehicles${params.toString() ? '?' + params.toString() : ''}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        data: Array.isArray(data) ? data : []
      };
      
    } catch (error: any) {
      console.error('Error fetching vehicles:', error);
      return { data: [] };
    }
  },

  // Get single vehicle - FIXED: Uses /api/vehicles/:id
  getById: async (id: string | number): Promise<{ data: Vehicle | null; error?: string }> => {
    try {
      // IMPORTANT: This calls /api/vehicles/:id (Next.js API route)
      const url = `/api/vehicles/${id}`;
      console.log('🚗 Calling:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 404) {
          return { data: null, error: "Vehicle not found" };
        }
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      return { data };
      
    } catch (error: any) {
      console.error('Error fetching vehicle:', error);
      return { data: null, error: error.message };
    }
  },

  // Increment view count
  incrementViews: async (id: string | number): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`/api/vehicles/${id}/views`, {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      return { success: true };
      
    } catch (error: any) {
      console.error('Error incrementing views:', error);
      return { success: false, error: error.message };
    }
  },

  // Get featured vehicles
  getFeatured: async (): Promise<Vehicle[]> => {
    try {
      const response = await fetch('/api/vehicles/featured');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
      
    } catch (error: any) {
      console.error('Error:', error);
      return [];
    }
  }
};

export const inspectionApi = {
  getByVehicle: async (vehicleId: string | number): Promise<{ data: InspectionReport | null; error?: string }> => {
    try {
      const response = await fetch(`/api/inspections/vehicle/${vehicleId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return { data: null, error: "Inspection not found" };
        }
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      return { data };
      
    } catch (error: any) {
      console.error('Error fetching inspection:', error);
      return { data: null, error: error.message };
    }
  }
};