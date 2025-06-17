import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import ProducerForm from "../components/ProducerForm.tsx";
import ProducerList from "../components/ProducerList.tsx";
import {
  ApiError,
  type CreateProducerDto,
  type Producer,
  producerApi,
} from "../utils/api.ts";

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

export default function Producers() {
  const producers = useSignal<Producer[]>([]);
  const loading = useSignal(true);
  const error = useSignal<string | null>(null);
  const showForm = useSignal(false);
  const editingProducer = useSignal<Producer | null>(null);

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

  const handleAddProducer = () => {
    editingProducer.value = null;
    showForm.value = true;
  };

  const handleEditProducer = (producer: Producer) => {
    editingProducer.value = producer;
    showForm.value = true;
  };

  const handleDeleteProducer = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este produtor?")) {
      try {
        await producerApi.delete(id);
        await loadProducers(); // Reload the list
      } catch (err) {
        console.error("Error deleting producer:", err);
        if (err instanceof ApiError) {
          alert(`Erro ao excluir produtor: ${err.message}`);
        } else {
          alert("Erro inesperado ao excluir produtor");
        }
      }
    }
  };

  const handleSaveProducer = async (
    producerData: { document: string; name: string; farms: any[] },
  ) => {
    try {
      // Transform component format to API format
      const apiData: CreateProducerDto = {
        cpfCnpj: producerData.document,
        name: producerData.name,
      };

      if (editingProducer.value) {
        // Update existing producer
        await producerApi.update(editingProducer.value.id, apiData);
      } else {
        // Add new producer
        await producerApi.create(apiData);
      }

      showForm.value = false;
      editingProducer.value = null;
      await loadProducers(); // Reload the list
    } catch (err) {
      console.error("Error saving producer:", err);
      if (err instanceof ApiError) {
        alert(`Erro ao salvar produtor: ${err.message}`);
      } else {
        alert("Erro inesperado ao salvar produtor");
      }
    }
  };

  return (
    <div class="space-y-6">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            Gestão de Produtores
          </h2>
          <p class="text-gray-600">Cadastre e gerencie produtores rurais</p>
        </div>
        <button
          onClick={handleAddProducer}
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <span class="mr-2">+</span>
          Novo Produtor
        </button>
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
            {showForm.value && (
              <ProducerForm
                producer={editingProducer.value}
                onSave={handleSaveProducer}
                onCancel={() => {
                  showForm.value = false;
                  editingProducer.value = null;
                }}
              />
            )}

            <ProducerList
              producers={producers.value}
              onEdit={handleEditProducer}
              onDelete={handleDeleteProducer}
            />
          </div>
        )}
    </div>
  );
}
