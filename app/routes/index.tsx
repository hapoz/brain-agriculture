import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import DashboardStats from "../components/DashboardStats.tsx";
import FarmChart from "../components/FarmChart.tsx";

interface FarmData {
  totalFarms: number;
  totalHectares: number;
  stateDistribution: { state: string; count: number }[];
  cropDistribution: { crop: string; hectares: number }[];
  landUseDistribution: { type: string; hectares: number }[];
}

export default function Home() {
  const farmData = useSignal<FarmData>({
    totalFarms: 0,
    totalHectares: 0,
    stateDistribution: [],
    cropDistribution: [],
    landUseDistribution: [],
  });
  const loading = useSignal(true);

  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboardData = async () => {
      try {
        // In a real app, this would be an API call
        const mockData: FarmData = {
          totalFarms: 156,
          totalHectares: 45230,
          stateDistribution: [
            { state: "São Paulo", count: 45 },
            { state: "Mato Grosso", count: 38 },
            { state: "Paraná", count: 32 },
            { state: "Rio Grande do Sul", count: 28 },
            { state: "Minas Gerais", count: 13 },
          ],
          cropDistribution: [
            { crop: "Soja", hectares: 18500 },
            { crop: "Milho", hectares: 12300 },
            { crop: "Café", hectares: 8900 },
            { crop: "Cana-de-açúcar", hectares: 5530 },
          ],
          landUseDistribution: [
            { type: "Área Agricultável", hectares: 36184 },
            { type: "Área de Vegetação", hectares: 9046 },
          ],
        };

        farmData.value = mockData;
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        loading.value = false;
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div class="min-h-screen bg-gray-50">
      <div class="bg-green-600 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <h1 class="text-3xl font-bold">🌾 Brain Agriculture</h1>
              </div>
            </div>
            <nav class="flex space-x-8">
              <a
                href="/"
                class="text-white hover:text-green-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </a>
              <a
                href="/producers"
                class="text-green-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Produtores
              </a>
              <a
                href="/farms"
                class="text-green-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Fazendas
              </a>
            </nav>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p class="text-gray-600">Visão geral do sistema de gestão agrícola</p>
        </div>

        {loading.value
          ? (
            <div class="flex justify-center items-center h-64">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600">
              </div>
            </div>
          )
          : (
            <div class="space-y-8">
              <DashboardStats data={farmData.value} />

              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="bg-white rounded-lg shadow p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">
                    Distribuição por Estado
                  </h3>
                  <FarmChart
                    data={farmData.value.stateDistribution}
                    type="pie"
                    colors={[
                      "#10B981",
                      "#3B82F6",
                      "#F59E0B",
                      "#EF4444",
                      "#8B5CF6",
                    ]}
                  />
                </div>

                <div class="bg-white rounded-lg shadow p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">
                    Culturas Plantadas
                  </h3>
                  <FarmChart
                    data={farmData.value.cropDistribution}
                    type="pie"
                    colors={["#059669", "#DC2626", "#7C3AED", "#EA580C"]}
                  />
                </div>

                <div class="bg-white rounded-lg shadow p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">
                    Uso do Solo
                  </h3>
                  <FarmChart
                    data={farmData.value.landUseDistribution}
                    type="pie"
                    colors={["#10B981", "#059669"]}
                  />
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
