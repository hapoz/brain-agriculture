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

interface ProducerListProps {
  producers: Producer[];
  onEdit: (producer: Producer) => void;
  onDelete: (id: string) => void;
}

export default function ProducerList(
  { producers, onEdit, onDelete }: ProducerListProps,
) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("pt-BR").format(num);
  };

  const getTotalHectares = (farms: Farm[]) => {
    return farms.reduce((total, farm) => total + farm.totalArea, 0);
  };

  const getTotalCrops = (farms: Farm[]) => {
    return farms.reduce((total, farm) => total + farm.crops.length, 0);
  };

  if (producers.length === 0) {
    return (
      <div class="bg-white rounded-lg shadow p-8 text-center">
        <div class="text-gray-500 mb-4">
          <span class="text-4xl">🌾</span>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Nenhum produtor cadastrado
        </h3>
        <p class="text-gray-600">
          Comece cadastrando o primeiro produtor rural.
        </p>
      </div>
    );
  }

  return (
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">
          Produtores Cadastrados
        </h3>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produtor
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Documento
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fazendas
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Área Total
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Culturas
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {producers.map((producer) => (
              <tr key={producer.id} class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {producer.name}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{producer.document}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {producer.farms.length}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {formatNumber(getTotalHectares(producer.farms))} ha
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {getTotalCrops(producer.farms)}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onEdit(producer)}
                    class="text-green-600 hover:text-green-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(producer.id)}
                    class="text-red-600 hover:text-red-900"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detailed view for each producer */}
      <div class="border-t border-gray-200">
        {producers.map((producer) => (
          <div
            key={producer.id}
            class="p-6 border-b border-gray-200 last:border-b-0"
          >
            <div class="flex justify-between items-start mb-4">
              <div>
                <h4 class="text-lg font-medium text-gray-900">
                  {producer.name}
                </h4>
                <p class="text-sm text-gray-600">{producer.document}</p>
              </div>
              <div class="flex space-x-2">
                <button
                  onClick={() => onEdit(producer)}
                  class="text-green-600 hover:text-green-900 text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(producer.id)}
                  class="text-red-600 hover:text-red-900 text-sm"
                >
                  Excluir
                </button>
              </div>
            </div>

            <div class="space-y-4">
              {producer.farms.map((farm) => (
                <div key={farm.id} class="bg-gray-50 rounded-lg p-4">
                  <div class="flex justify-between items-start mb-3">
                    <div>
                      <h5 class="font-medium text-gray-900">{farm.name}</h5>
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

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
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
                      <h6 class="text-sm font-medium text-gray-900 mb-2">
                        Culturas Plantadas:
                      </h6>
                      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {farm.crops.map((crop) => (
                          <div
                            key={crop.id}
                            class="bg-white rounded border p-2"
                          >
                            <div class="text-sm font-medium text-gray-900">
                              {crop.name}
                            </div>
                            <div class="text-xs text-gray-600">
                              {crop.season}
                            </div>
                            <div class="text-xs text-gray-500">
                              {formatNumber(crop.hectares)} ha
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
