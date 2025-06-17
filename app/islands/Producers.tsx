import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import ProducerForm from "../components/ProducerForm.tsx";
import ProducerList from "../components/ProducerList.tsx";
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

export default function Producers({ apiBaseUrl }: { apiBaseUrl: string }) {
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
      producers.value = await producerApi.getAll(apiBaseUrl);
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

  const handleCreate = async (producerData: Omit<Producer, "id">) => {
    try {
      await producerApi.create(apiBaseUrl, producerData);
      showForm.value = false;
      await loadProducers();
    } catch (err) {
      error.value = "Erro ao criar produtor";
    }
  };

  const handleEdit = (producer: Producer) => {
    editingProducer.value = producer;
    showForm.value = true;
  };

  const handleUpdate = async (producerData: Producer) => {
    try {
      await producerApi.update(apiBaseUrl, producerData.id, producerData);
      editingProducer.value = null;
      showForm.value = false;
      await loadProducers();
    } catch (err) {
      error.value = "Erro ao atualizar produtor";
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await producerApi.delete(apiBaseUrl, id);
      await loadProducers();
    } catch (err) {
      error.value = "Erro ao excluir produtor";
    }
  };

  return (
    <div class="space-y-8">
      {showForm.value
        ? (
          <ProducerForm
            producer={editingProducer.value}
            onSave={editingProducer.value ? handleUpdate : handleCreate}
            onCancel={() => {
              showForm.value = false;
              editingProducer.value = null;
            }}
          />
        )
        : (
          <button
            class="bg-green-600 text-white px-4 py-2 rounded mb-4"
            onClick={() => {
              editingProducer.value = null;
              showForm.value = true;
            }}
          >
            Novo Produtor
          </button>
        )}
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
          <ProducerList
            producers={producers.value}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
    </div>
  );
}
