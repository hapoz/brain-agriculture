import Header from "../components/Header.tsx";
import Dashboard from "../islands/Dashboard.tsx";

export default function Home() {
  return (
    <div class="min-h-screen bg-gray-50">
      <Header currentPage="dashboard" />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p class="text-gray-600">Visão geral do sistema de gestão agrícola</p>
        </div>

        <Dashboard />
      </div>
    </div>
  );
}
