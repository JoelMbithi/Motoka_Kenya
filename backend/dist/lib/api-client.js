"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inspectionApi = exports.vehicleApi = void 0;
exports.vehicleApi = {
    getAll: async (filters = {}) => {
        try {
            const params = new URLSearchParams();
            if (filters.searchQuery)
                params.append('search', filters.searchQuery);
            if (filters.counties?.length)
                params.append('county', filters.counties[0]);
            if (filters.dealerId)
                params.append('dealerId', filters.dealerId.toString());
            if (filters.minPrice)
                params.append('minPrice', filters.minPrice.toString());
            if (filters.maxPrice)
                params.append('maxPrice', filters.maxPrice.toString());
            if (filters.yearRange) {
                params.append('minYear', filters.yearRange.min.toString());
                params.append('maxYear', filters.yearRange.max.toString());
            }
            if (filters.fuelType)
                params.append('fuel', filters.fuelType);
            if (filters.transmission)
                params.append('transmission', filters.transmission);
            if (filters.bodyType)
                params.append('bodyType', filters.bodyType);
            const url = `/api/vehicles${params.toString() ? '?' + params.toString() : ''}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const data = await response.json();
            return {
                data: Array.isArray(data) ? data : []
            };
        }
        catch (error) {
            console.error('Error fetching vehicles:', error);
            return { data: [] };
        }
    },
    getById: async (id) => {
        try {
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
        }
        catch (error) {
            console.error('Error fetching vehicle:', error);
            return { data: null, error: error.message };
        }
    },
    incrementViews: async (id) => {
        try {
            const response = await fetch(`/api/vehicles/${id}/views`, {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return { success: true };
        }
        catch (error) {
            console.error('Error incrementing views:', error);
            return { success: false, error: error.message };
        }
    },
    getFeatured: async () => {
        try {
            const response = await fetch('/api/vehicles/featured');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const data = await response.json();
            return Array.isArray(data) ? data : [];
        }
        catch (error) {
            console.error('Error:', error);
            return [];
        }
    }
};
exports.inspectionApi = {
    getByVehicle: async (vehicleId) => {
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
        }
        catch (error) {
            console.error('Error fetching inspection:', error);
            return { data: null, error: error.message };
        }
    }
};
//# sourceMappingURL=api-client.js.map