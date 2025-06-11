interface HeaderProps {
  currentPage?: "dashboard" | "producers" | "farms";
}

export default function Header({ currentPage = "dashboard" }: HeaderProps) {
  const isActive = (page: string) => currentPage === page;

  return (
    <div class="bg-green-600 text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row justify-between items-center py-4 sm:py-6">
          <div class="flex items-center mb-4 sm:mb-0">
            <div class="flex-shrink-0">
              <h1 class="text-3xl font-bold">🌾 Brain Agriculture</h1>
            </div>
          </div>
          <nav class="flex flex-row space-x-2 sm:space-x-8">
            <a
              href="/"
              class={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive("dashboard")
                  ? "text-white bg-green-700"
                  : "text-green-200 hover:text-white hover:bg-green-700"
              }`}
            >
              Dashboard
            </a>
            <a
              href="/producers"
              class={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive("producers")
                  ? "text-white bg-green-700"
                  : "text-green-200 hover:text-white hover:bg-green-700"
              }`}
            >
              Produtores
            </a>
            <a
              href="/farms"
              class={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive("farms")
                  ? "text-white bg-green-700"
                  : "text-green-200 hover:text-white hover:bg-green-700"
              }`}
            >
              Fazendas
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
