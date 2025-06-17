import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import DashboardStats from "../components/DashboardStats.tsx";
import FarmChart from "../components/FarmChart.tsx";
import {
  ApiError,
  dashboardApi,
  type DashboardStats as DashboardStatsType,
} from "../utils/api.ts";

export default function Dashboard() {
  const farmData = useSignal<DashboardStatsType>({
    totalFarms: 0,
    totalHectares: 0,
    stateDistribution: [],
    cropDistribution: [],
    landUseDistribution: [],
  });
  const loading = useSignal(true);
  const error = useSignal<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      loading.value = true;
      error.value = null;
      const data = await dashboardApi.getStats();
      farmData.value = data;
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      if (err instanceof ApiError) {
        error.value = `Erro ao carregar dados do dashboard: ${err.message}`;
      } else {
        error.value = "Erro inesperado ao carregar dados do dashboard";
      }
    } finally {
      loading.value = false;
    }
  };

  return (
    <div class="space-y-8">
      {error.value && (
        <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error.value}
        </div>
      )}

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
