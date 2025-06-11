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

interface ProducerFormProps {
  producer?: Producer | null;
  onSave: (producer: Omit<Producer, "id">) => void;
  onCancel: () => void;
}

export default function ProducerForm(
  { producer, onSave, onCancel }: ProducerFormProps,
) {
  const formData = useSignal({
    document: "",
    name: "",
    farms: [] as Farm[],
  });
  const errors = useSignal<string[]>([]);

  useEffect(() => {
    if (producer) {
      formData.value = {
        document: producer.document,
        name: producer.name,
        farms: producer.farms,
      };
    }
  }, [producer]);

  const validateDocument = (document: string): boolean => {
    // Remove non-numeric characters
    const cleanDoc = document.replace(/\D/g, "");

    if (cleanDoc.length === 11) {
      // CPF validation
      if (
        cleanDoc === "00000000000" || cleanDoc === "11111111111" ||
        cleanDoc === "22222222222" || cleanDoc === "33333333333" ||
        cleanDoc === "44444444444" || cleanDoc === "55555555555" ||
        cleanDoc === "66666666666" || cleanDoc === "77777777777" ||
        cleanDoc === "88888888888" || cleanDoc === "99999999999"
      ) {
        return false;
      }

      // CPF validation algorithm
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanDoc.charAt(i)) * (10 - i);
      }
      let remainder = 11 - (sum % 11);
      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(cleanDoc.charAt(9))) return false;

      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanDoc.charAt(i)) * (11 - i);
      }
      remainder = 11 - (sum % 11);
      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(cleanDoc.charAt(10))) return false;

      return true;
    } else if (cleanDoc.length === 14) {
      // CNPJ validation
      if (
        cleanDoc === "00000000000000" || cleanDoc === "11111111111111" ||
        cleanDoc === "22222222222222" || cleanDoc === "33333333333333" ||
        cleanDoc === "44444444444444" || cleanDoc === "55555555555555" ||
        cleanDoc === "66666666666666" || cleanDoc === "77777777777777" ||
        cleanDoc === "88888888888888" || cleanDoc === "99999999999999"
      ) {
        return false;
      }

      // CNPJ validation algorithm
      let size = cleanDoc.length - 2;
      let numbers = cleanDoc.substring(0, size);
      const digits = cleanDoc.substring(size);
      let sum = 0;
      let pos = size - 7;

      for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * pos--;
        if (pos < 2) pos = 9;
      }

      let result = sum < 2 ? 0 : 11 - (sum % 11);
      if (result !== parseInt(digits.charAt(0))) return false;

      size = size + 1;
      numbers = cleanDoc.substring(0, size);
      sum = 0;
      pos = size - 7;

      for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * pos--;
        if (pos < 2) pos = 9;
      }

      result = sum < 2 ? 0 : 11 - (sum % 11);
      if (result !== parseInt(digits.charAt(1))) return false;

      return true;
    }

    return false;
  };

  const formatDocument = (document: string): string => {
    const cleanDoc = document.replace(/\D/g, "");
    if (cleanDoc.length === 11) {
      return cleanDoc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (cleanDoc.length === 14) {
      return cleanDoc.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5",
      );
    }
    return document;
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!formData.value.name.trim()) {
      newErrors.push("Nome do produtor é obrigatório");
    }

    if (!formData.value.document.trim()) {
      newErrors.push("CPF/CNPJ é obrigatório");
    } else if (!validateDocument(formData.value.document)) {
      newErrors.push("CPF/CNPJ inválido");
    }

    // Validate farm areas
    formData.value.farms.forEach((farm, index) => {
      if (farm.arableArea + farm.vegetationArea > farm.totalArea) {
        newErrors.push(
          `Fazenda ${farm.name}: Soma das áreas não pode ultrapassar a área total`,
        );
      }
    });

    errors.value = newErrors;
    return newErrors.length === 0;
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(formData.value);
    }
  };

  const addFarm = () => {
    const newFarm: Farm = {
      id: Date.now().toString(),
      name: "",
      city: "",
      state: "",
      totalArea: 0,
      arableArea: 0,
      vegetationArea: 0,
      crops: [],
    };
    formData.value.farms = [...formData.value.farms, newFarm];
  };

  const removeFarm = (index: number) => {
    formData.value.farms = formData.value.farms.filter((_, i) => i !== index);
  };

  const updateFarm = (index: number, field: keyof Farm, value: any) => {
    const updatedFarms = [...formData.value.farms];
    updatedFarms[index] = { ...updatedFarms[index], [field]: value };
    formData.value.farms = updatedFarms;
  };

  const addCrop = (farmIndex: number) => {
    const newCrop: Crop = {
      id: Date.now().toString(),
      name: "",
      season: "",
      hectares: 0,
    };
    const updatedFarms = [...formData.value.farms];
    updatedFarms[farmIndex].crops = [...updatedFarms[farmIndex].crops, newCrop];
    formData.value.farms = updatedFarms;
  };

  const removeCrop = (farmIndex: number, cropIndex: number) => {
    const updatedFarms = [...formData.value.farms];
    updatedFarms[farmIndex].crops = updatedFarms[farmIndex].crops.filter((
      _,
      i,
    ) => i !== cropIndex);
    formData.value.farms = updatedFarms;
  };

  const updateCrop = (
    farmIndex: number,
    cropIndex: number,
    field: keyof Crop,
    value: any,
  ) => {
    const updatedFarms = [...formData.value.farms];
    updatedFarms[farmIndex].crops[cropIndex] = {
      ...updatedFarms[farmIndex].crops[cropIndex],
      [field]: value,
    };
    formData.value.farms = updatedFarms;
  };

  return (
    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">
        {producer ? "Editar Produtor" : "Novo Produtor"}
      </h3>

      {errors.value.length > 0 && (
        <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          <ul class="list-disc list-inside">
            {errors.value.map((error, index) => <li key={index}>{error}</li>)}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nome do Produtor *
            </label>
            <input
              type="text"
              value={formData.value.name}
              onChange={(e) =>
                formData.value.name = (e.target as HTMLInputElement).value}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              CPF/CNPJ *
            </label>
            <input
              type="text"
              value={formData.value.document}
              onChange={(e) =>
                formData.value.document = formatDocument(
                  (e.target as HTMLInputElement).value,
                )}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="000.000.000-00 ou 00.000.000/0000-00"
              required
            />
          </div>
        </div>

        <div>
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-md font-medium text-gray-900">Fazendas</h4>
            <button
              type="button"
              onClick={addFarm}
              class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
            >
              + Adicionar Fazenda
            </button>
          </div>

          {formData.value.farms.map((farm, farmIndex) => (
            <div
              key={farm.id}
              class="border border-gray-200 rounded-lg p-4 mb-4"
            >
              <div class="flex justify-between items-center mb-4">
                <h5 class="font-medium text-gray-900">
                  Fazenda {farmIndex + 1}
                </h5>
                <button
                  type="button"
                  onClick={() => removeFarm(farmIndex)}
                  class="text-red-600 hover:text-red-800 text-sm"
                >
                  Remover
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Nome da Fazenda
                  </label>
                  <input
                    type="text"
                    value={farm.name}
                    onChange={(e) =>
                      updateFarm(
                        farmIndex,
                        "name",
                        (e.target as HTMLInputElement).value,
                      )}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Cidade
                  </label>
                  <input
                    type="text"
                    value={farm.city}
                    onChange={(e) =>
                      updateFarm(
                        farmIndex,
                        "city",
                        (e.target as HTMLInputElement).value,
                      )}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    value={farm.state}
                    onChange={(e) =>
                      updateFarm(
                        farmIndex,
                        "state",
                        (e.target as HTMLSelectElement).value,
                      )}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Selecione...</option>
                    <option value="São Paulo">São Paulo</option>
                    <option value="Mato Grosso">Mato Grosso</option>
                    <option value="Paraná">Paraná</option>
                    <option value="Rio Grande do Sul">Rio Grande do Sul</option>
                    <option value="Minas Gerais">Minas Gerais</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Área Total (ha)
                  </label>
                  <input
                    type="number"
                    value={farm.totalArea}
                    onChange={(e) =>
                      updateFarm(
                        farmIndex,
                        "totalArea",
                        parseFloat((e.target as HTMLInputElement).value) || 0,
                      )}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Área Agricultável (ha)
                  </label>
                  <input
                    type="number"
                    value={farm.arableArea}
                    onChange={(e) =>
                      updateFarm(
                        farmIndex,
                        "arableArea",
                        parseFloat((e.target as HTMLInputElement).value) || 0,
                      )}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Área de Vegetação (ha)
                  </label>
                  <input
                    type="number"
                    value={farm.vegetationArea}
                    onChange={(e) =>
                      updateFarm(
                        farmIndex,
                        "vegetationArea",
                        parseFloat((e.target as HTMLInputElement).value) || 0,
                      )}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              {farm.arableArea + farm.vegetationArea > farm.totalArea && (
                <div class="bg-yellow-50 border border-yellow-200 text-yellow-700 px-3 py-2 rounded mb-4">
                  Atenção: A soma das áreas agricultável e de vegetação não pode
                  ultrapassar a área total.
                </div>
              )}

              <div>
                <div class="flex justify-between items-center mb-2">
                  <h6 class="font-medium text-gray-900">Culturas</h6>
                  <button
                    type="button"
                    onClick={() => addCrop(farmIndex)}
                    class="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs"
                  >
                    + Adicionar Cultura
                  </button>
                </div>

                {farm.crops.map((crop, cropIndex) => (
                  <div
                    key={crop.id}
                    class="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2"
                  >
                    <input
                      type="text"
                      placeholder="Nome da cultura"
                      value={crop.name}
                      onChange={(e) =>
                        updateCrop(
                          farmIndex,
                          cropIndex,
                          "name",
                          (e.target as HTMLInputElement).value,
                        )}
                      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      placeholder="Safra (ex: Safra 2023)"
                      value={crop.season}
                      onChange={(e) =>
                        updateCrop(
                          farmIndex,
                          cropIndex,
                          "season",
                          (e.target as HTMLInputElement).value,
                        )}
                      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="number"
                      placeholder="Hectares"
                      value={crop.hectares}
                      onChange={(e) =>
                        updateCrop(
                          farmIndex,
                          cropIndex,
                          "hectares",
                          parseFloat((e.target as HTMLInputElement).value) || 0,
                        )}
                      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      min="0"
                      step="0.01"
                    />
                    <button
                      type="button"
                      onClick={() => removeCrop(farmIndex, cropIndex)}
                      class="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div class="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {producer ? "Atualizar" : "Cadastrar"}
          </button>
        </div>
      </form>
    </div>
  );
}
