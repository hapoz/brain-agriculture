import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface Producer {
  id: string;
  document: string;
  name: string;
  farms: Farm[];
}

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
  const selectedState = useSignal("");
  const selectedCrop = useSignal("");

  useEffect(() => {
    loadProducers();
  }, []);

  const loadProducers = async () => {
    try {
      // Mock data - in a real app this would be an API call
      const mockProducers: Producer[] = [
        {
          id: "1",
          document: "123.456.789-00",
          name: "João Silva",
          farms: [
            {
              id: "1",
              name: "Fazenda São João",
              city: "Ribeirão Preto",
              state: "São Paulo",
              totalArea: 500,
              arableArea: 400,
              vegetationArea: 100,
              crops: [
                { id: "1", name: "Soja", season: "Safra 2023", hectares: 300 },
                { id: "2", name: "Milho", season: "Safra 2023", hectares: 100 },
              ],
            },
          ],
        },
        {
          id: "2",
          document: "12.345.678/0001-90",
          name: "Maria Santos",
          farms: [
            {
              id: "2",
              name: "Fazenda Boa Vista",
              city: "Londrina",
              state: "Paraná",
              totalArea: 800,
              arableArea: 600,
              vegetationArea: 200,
              crops: [
                { id: "3", name: "Café", season: "Safra 2023", hectares: 400 },
                {
                  id: "4",
                  name: "Cana-de-açúcar",
                  season: "Safra 2023",
                  hectares: 200,
                },
              ],
            },
          ],
        },
        {
          id: "3",
          document: "987.654.321-00",
          name: "Pedro Oliveira",
          farms: [
            {
              id: "3",
              name: "Fazenda Santa Clara",
              city: "Cuiabá",
              state: "Mato Grosso",
              totalArea: 1200,
              arableArea: 900,
              vegetationArea: 300,
              crops: [
                { id: "5", name: "Soja", season: "Safra 2023", hectares: 600 },
                { id: "6", name: "Milho", season: "Safra 2023", hectares: 300 },
              ],
            },
            {
              id: "4",
              name: "Fazenda Nova Esperança",
              city: "Rondonópolis",
              state: "Mato Grosso",
              totalArea: 600,
              arableArea: 450,
              vegetationArea: 150,
              crops: [
                {
                  id: "7",
                  name: "Algodão",
                  season: "Safra 2023",
                  hectares: 300,
                },
                { id: "8", name: "Soja", season: "Safra 2023", hectares: 150 },
              ],
            },
          ],
        },
      ];

      producers.value = mockProducers;
    } catch (error) {
      console.error("Error loading producers:", error);
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

            {/* Summary Stats */}
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span class="text-green-600 text-lg">🏠</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Fazendas</p>
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
                    <p class="text-sm font-medium text-gray-500">Área Total</p>
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
                      <span class="text-yellow-600 text-lg">🌱</span>
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
                    <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span class="text-purple-600 text-lg">🌲</span>
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

            {/* Farms Grid */}
            {filteredFarms.length === 0
              ? (
                <div class="bg-white rounded-lg shadow p-8 text-center">
                  <div class="text-gray-500 mb-4">
                    <span class="text-4xl">🏠</span>
                  </div>
                  <h3 class="text-lg font-medium text-gray-900 mb-2">
                    Nenhuma fazenda encontrada
                  </h3>
                  <p class="text-gray-600">
                    Tente ajustar os filtros ou cadastre uma nova fazenda.
                  </p>
                </div>
              )
              : (
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFarms.map((farm) => (
                    <div
                      key={farm.id}
                      class="bg-white rounded-lg shadow overflow-hidden"
                    >
                      <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                          <div>
                            <h3 class="text-lg font-medium text-gray-900">
                              {farm.name}
                            </h3>
                            <p class="text-sm text-gray-600">
                              {farm.city}, {farm.state}
                            </p>
                          </div>
                          <div class="text-right">
                            <div class="text-sm text-gray-600">Área Total</div>
                            <div class="font-medium text-gray-900">
                              {formatNumber(farm.totalArea)} ha
                            </div>
                          </div>
                        </div>

                        <div class="mb-4">
                          <div class="text-sm text-gray-600 mb-2">Produtor</div>
                          <div class="font-medium text-gray-900">
                            {farm.producerName}
                          </div>
                          <div class="text-sm text-gray-500">
                            {farm.producerDocument}
                          </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div class="text-xs text-gray-500 uppercase tracking-wider">
                              Agricultável
                            </div>
                            <div class="text-sm font-medium text-gray-900">
                              {formatNumber(farm.arableArea)} ha
                            </div>
                          </div>
                          <div>
                            <div class="text-xs text-gray-500 uppercase tracking-wider">
                              Vegetação
                            </div>
                            <div class="text-sm font-medium text-gray-900">
                              {formatNumber(farm.vegetationArea)} ha
                            </div>
                          </div>
                        </div>

                        {farm.crops.length > 0 && (
                          <div>
                            <div class="text-sm font-medium text-gray-900 mb-2">
                              Culturas ({farm.crops.length})
                            </div>
                            <div class="space-y-1">
                              {farm.crops.map((crop) => (
                                <div
                                  key={crop.id}
                                  class="flex justify-between items-center text-sm"
                                >
                                  <span class="text-gray-700">{crop.name}</span>
                                  <span class="text-gray-500">
                                    {formatNumber(crop.hectares)} ha
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        )}
    </div>
  );
}
