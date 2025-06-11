import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import ProducerForm from "../components/ProducerForm.tsx";
import ProducerList from "../components/ProducerList.tsx";

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

export default function Producers() {
  const producers = useSignal<Producer[]>([]);
  const loading = useSignal(true);
  const showForm = useSignal(false);
  const editingProducer = useSignal<Producer | null>(null);

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
      ];

      producers.value = mockProducers;
    } catch (error) {
      console.error("Error loading producers:", error);
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
        // In a real app, this would be an API call
        producers.value = producers.value.filter((p) => p.id !== id);
      } catch (error) {
        console.error("Error deleting producer:", error);
      }
    }
  };

  const handleSaveProducer = async (producerData: Omit<Producer, "id">) => {
    try {
      if (editingProducer.value) {
        // Update existing producer
        const updatedProducers = producers.value.map((p) =>
          p.id === editingProducer.value!.id ? { ...producerData, id: p.id } : p
        );
        producers.value = updatedProducers;
      } else {
        // Add new producer
        const newProducer: Producer = {
          ...producerData,
          id: Date.now().toString(),
        };
        producers.value = [...producers.value, newProducer];
      }

      showForm.value = false;
      editingProducer.value = null;
    } catch (error) {
      console.error("Error saving producer:", error);
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
