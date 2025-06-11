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

export default function Dashboard() {
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
    const loadDashboardData = () => {
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
    <div class="space-y-8">
      {loading.value
        ? (
          <div class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600">
            </div>
          </div>
        )
        : (
          <>
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
          </>
        )}
    </div>
  );
}
