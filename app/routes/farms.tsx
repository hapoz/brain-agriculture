import Header from "../components/Header.tsx";
import Farms from "../islands/Farms.tsx";

export default function FarmsPage() {
  const apiBaseUrl = Deno.env.get("API_BASE_URL") ?? "http://localhost:3000";
  return (
    <div class="min-h-screen bg-gray-50">
      <Header currentPage="farms" />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Farms apiBaseUrl={apiBaseUrl} />
      </div>
    </div>
  );
}
