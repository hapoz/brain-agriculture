import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { ApiError, type Producer, producerApi } from "../utils/api.ts";

interface Farm {
  id: string;
  name: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  crops: Crop[];
}

interface Crop {
  id: string;
  name: string;
  season: string;
  hectares: number;
}

export default function Farms() {
  const producers = useSignal<Producer[]>([]);
  const loading = useSignal(true);
  const error = useSignal<string | null>(null);
  const selectedState = useSignal("");
  const selectedCrop = useSignal("");

  useEffect(() => {
    loadProducers();
  }, []);

  const loadProducers = async () => {
    try {
      loading.value = true;
      error.value = null;
      const data = await producerApi.getAll();
      producers.value = data;
    } catch (err) {
      console.error("Error loading producers:", err);
      if (err instanceof ApiError) {
        error.value = `Erro ao carregar produtores: ${err.message}`;
      } else {
        error.value = "Erro inesperado ao carregar produtores";
      }
    } finally {
      loading.value = false;
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("pt-BR").format(num);
  };

  const getAllFarms = () => {
    return producers.value.flatMap((producer) =>
      producer.farms.map((farm) => ({
        ...farm,
        producerName: producer.name,
        producerDocument: producer.document,
      }))
    );
  };

  const getFilteredFarms = () => {
    let farms = getAllFarms();

    if (selectedState.value) {
      farms = farms.filter((farm) => farm.state === selectedState.value);
    }

    if (selectedCrop.value) {
      farms = farms.filter((farm) =>
        farm.crops.some((crop) =>
          crop.name.toLowerCase().includes(selectedCrop.value.toLowerCase())
        )
      );
    }

    return farms;
  };

  const getStates = () => {
    const states = new Set(getAllFarms().map((farm) => farm.state));
    return Array.from(states).sort();
  };

  const getTotalHectares = () => {
    return getFilteredFarms().reduce(
      (total, farm) => total + farm.totalArea,
      0,
    );
  };

  const getTotalArableArea = () => {
    return getFilteredFarms().reduce(
      (total, farm) => total + farm.arableArea,
      0,
    );
  };

  const getTotalVegetationArea = () => {
    return getFilteredFarms().reduce(
      (total, farm) => total + farm.vegetationArea,
      0,
    );
  };

  const filteredFarms = getFilteredFarms();

  return (
    <div class="space-y-6">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          Gestão de Fazendas
        </h2>
        <p class="text-gray-600">
          Visualize e gerencie todas as fazendas cadastradas
        </p>
      </div>

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
          <div class="space-y-6">
            {/* Filters */}
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Filtros</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Estado
                  </label>
                  <select
                    value={selectedState.value}
                    onChange={(e) =>
                      selectedState.value =
                        (e.target as HTMLSelectElement).value}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Todos os estados</option>
                    {getStates().map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Cultura
                  </label>
                  <input
                    type="text"
                    value={selectedCrop.value}
                    onChange={(e) =>
                      selectedCrop.value = (e.target as HTMLInputElement).value}
                    placeholder="Digite o nome da cultura..."
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span class="text-green-600 text-lg">🏠</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">
                      Fazendas
                    </p>
                    <p class="text-2xl font-semibold text-gray-900">
                      {filteredFarms.length}
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
                    <p class="text-sm font-medium text-gray-500">
                      Área Total
                    </p>
                    <p class="text-2xl font-semibold text-gray-900">
                      {formatNumber(getTotalHectares())} ha
                    </p>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <span class="text-yellow-600 text-lg">🌾</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">
                      Área Agricultável
                    </p>
                    <p class="text-2xl font-semibold text-gray-900">
                      {formatNumber(getTotalArableArea())} ha
                    </p>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span class="text-green-600 text-lg">🌳</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">
                      Área de Vegetação
                    </p>
                    <p class="text-2xl font-semibold text-gray-900">
                      {formatNumber(getTotalVegetationArea())} ha
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Farms List */}
            <div class="bg-white rounded-lg shadow overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-medium text-gray-900">
                  Fazendas ({filteredFarms.length})
                </h3>
              </div>

              {filteredFarms.length === 0
                ? (
                  <div class="p-8 text-center">
                    <div class="text-gray-500 mb-4">
                      <span class="text-4xl">🌾</span>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">
                      Nenhuma fazenda encontrada
                    </h3>
                    <p class="text-gray-600">
                      Tente ajustar os filtros para ver mais resultados.
                    </p>
                  </div>
                )
                : (
                  <div class="divide-y divide-gray-200">
                    {filteredFarms.map((farm) => (
                      <div key={farm.id} class="p-6">
                        <div class="flex justify-between items-start mb-4">
                          <div>
                            <h4 class="text-lg font-medium text-gray-900">
                              {farm.name}
                            </h4>
                            <p class="text-sm text-gray-600">
                              {farm.city}, {farm.state}
                            </p>
                            <p class="text-sm text-gray-500">
                              Produtor: {farm.producerName}{" "}
                              ({farm.producerDocument})
                            </p>
                          </div>
                          <div class="text-right">
                            <div class="text-sm text-gray-600">Área Total</div>
                            <div class="font-medium text-gray-900">
                              {formatNumber(farm.totalArea)} ha
                            </div>
                          </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <div class="text-xs text-gray-500 uppercase tracking-wider">
                              Área Agricultável
                            </div>
                            <div class="text-sm font-medium text-gray-900">
                              {formatNumber(farm.arableArea)} ha
                            </div>
                          </div>
                          <div>
                            <div class="text-xs text-gray-500 uppercase tracking-wider">
                              Área de Vegetação
                            </div>
                            <div class="text-sm font-medium text-gray-900">
                              {formatNumber(farm.vegetationArea)} ha
                            </div>
                          </div>
                          <div>
                            <div class="text-xs text-gray-500 uppercase tracking-wider">
                              Culturas
                            </div>
                            <div class="text-sm font-medium text-gray-900">
                              {farm.crops.length}
                            </div>
                          </div>
                        </div>

                        {farm.crops.length > 0 && (
                          <div>
                            <div class="text-xs text-gray-500 uppercase tracking-wider mb-2">
                              Culturas Plantadas
                            </div>
                            <div class="flex flex-wrap gap-2">
                              {farm.crops.map((crop) => (
                                <span
                                  key={crop.id}
                                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                >
                                  {crop.name} ({crop.season})
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>
        )}
    </div>
  );
}
