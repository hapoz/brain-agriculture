interface DashboardStatsProps {
  data: {
    totalFarms: number;
    totalHectares: number;
    stateDistribution: { state: string; count: number }[];
    cropDistribution: { crop: string; hectares: number }[];
    landUseDistribution: { type: string; hectares: number }[];
  };
}

export default function DashboardStats({ data }: DashboardStatsProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("pt-BR").format(num);
  };

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span class="text-green-600 text-lg">🏠</span>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total de Fazendas</p>
            <p class="text-2xl font-semibold text-gray-900">
              {formatNumber(data.totalFarms)}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span class="text-blue-600 text-lg">📏</span>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total de Hectares</p>
            <p class="text-2xl font-semibold text-gray-900">
              {formatNumber(data.totalHectares)} ha
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span class="text-yellow-600 text-lg">🌱</span>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Estados Atendidos</p>
            <p class="text-2xl font-semibold text-gray-900">
              {data.stateDistribution.length}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span class="text-purple-600 text-lg">🌾</span>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Culturas Diferentes</p>
            <p class="text-2xl font-semibold text-gray-900">
              {data.cropDistribution.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
