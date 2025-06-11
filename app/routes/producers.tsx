import Header from "../components/Header.tsx";
import Producers from "../islands/Producers.tsx";

export default function ProducersPage() {
  return (
    <div class="min-h-screen bg-gray-50">
      <Header currentPage="producers" />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Producers />
      </div>
    </div>
  );
}
