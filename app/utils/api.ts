const API_BASE_URL = "http://localhost:3000";

// API interfaces (matching the backend)
export interface ApiProducer {
  id: string;
  cpfCnpj: string;
  name: string;
  farms: ApiFarm[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiFarm {
  id: string;
  name: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  producerId: string;
  harvests: ApiHarvest[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiHarvest {
  id: string;
  year: string;
  farmId: string;
  crops: ApiCrop[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiCrop {
  id: string;
  name: string;
  harvestId: string;
  createdAt: string;
  updatedAt: string;
}

// Component interfaces (matching the frontend expectations)
export interface Producer {
  id: string;
  document: string;
  name: string;
  farms: Farm[];
}

export interface Farm {
  id: string;
  name: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  crops: Crop[];
}

export interface Crop {
  id: string;
  name: string;
  season: string;
  hectares: number;
}

export interface DashboardStats {
  totalFarms: number;
  totalHectares: number;
  stateDistribution: { state: string; count: number }[];
  cropDistribution: { crop: string; hectares: number }[];
  landUseDistribution: { type: string; hectares: number }[];
}

export interface CreateProducerDto {
  cpfCnpj: string;
  name: string;
}

export interface UpdateProducerDto {
  cpfCnpj?: string;
  name?: string;
}

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = "ApiError";
  }
}

// Adapter functions to transform API data to component format
function adaptApiProducer(apiProducer: ApiProducer): Producer {
  return {
    id: apiProducer.id,
    document: apiProducer.cpfCnpj,
    name: apiProducer.name,
    farms: apiProducer.farms.map(adaptApiFarm),
  };
}

function adaptApiFarm(apiFarm: ApiFarm): Farm {
  // Transform harvests and crops to the expected format
  const crops: Crop[] = [];

  apiFarm.harvests.forEach((harvest) => {
    harvest.crops.forEach((crop) => {
      crops.push({
        id: crop.id,
        name: crop.name,
        season: harvest.year,
        hectares: 0, // API doesn't have hectares, using 0 as default
      });
    });
  });

  return {
    id: apiFarm.id,
    name: apiFarm.name,
    city: apiFarm.city,
    state: apiFarm.state,
    totalArea: apiFarm.totalArea,
    arableArea: apiFarm.arableArea,
    vegetationArea: apiFarm.vegetationArea,
    crops,
  };
}

function adaptApiDashboardStats(apiStats: any): DashboardStats {
  // Transform the API dashboard stats to match the expected format
  return {
    totalFarms: apiStats.totalFarms,
    totalHectares: apiStats.totalHectares,
    stateDistribution: apiStats.areaByState?.map((item: any) => ({
      state: item.state,
      count: Math.floor(item.totalArea / 100), // Convert area to count for visualization
    })) || [],
    cropDistribution: apiStats.cropsCount?.map((item: any) => ({
      crop: item.crop,
      hectares: item.count * 100, // Convert count to hectares for visualization
    })) || [],
    landUseDistribution: apiStats.areaBySoilUse
      ? [
        {
          type: "Área Agricultável",
          hectares: apiStats.areaBySoilUse.arableArea,
        },
        {
          type: "Área de Vegetação",
          hectares: apiStats.areaBySoilUse.vegetationArea,
        },
      ]
      : [],
  };
}

async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      error: "Unknown error",
    }));
    throw new ApiError(
      errorData.error || `HTTP ${response.status}`,
      response.status,
    );
  }

  return response.json();
}

// Producer API calls
export const producerApi = {
  getAll: async (): Promise<Producer[]> => {
    const apiProducers = await apiCall<ApiProducer[]>("/producer");
    return apiProducers.map(adaptApiProducer);
  },
  getById: async (id: string): Promise<Producer> => {
    const apiProducer = await apiCall<ApiProducer>(`/producer/${id}`);
    return adaptApiProducer(apiProducer);
  },
  create: (data: CreateProducerDto) =>
    apiCall<ApiProducer>("/producer", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: UpdateProducerDto) =>
    apiCall<ApiProducer>(`/producer/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiCall<{ message: string }>(`/producer/${id}`, {
      method: "DELETE",
    }),
};

// Dashboard API calls
export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const apiStats = await apiCall<any>("/dashboard");
    return adaptApiDashboardStats(apiStats);
  },
};

export { ApiError };
