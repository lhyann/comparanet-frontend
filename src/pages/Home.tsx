import { useMemo, useState, useEffect } from "react";
import SidebarFilters from "../components/SidebarFilters";
import PlanCard from "../components/PlanCard";
import Header from "../components/Header";
import PlanDetailsModal from "../components/PlanDetailsModal"; 
//import { mockPlans } from "../data/mockPlans";
import { usePlans } from "../hooks/usePlans";
import { getPlanTags } from "../utils/planCategorizer"; 
import type { Plan } from "../types/Plan";

export default function Home() {
  const { plans: fetchedPlans, loading, error } = usePlans();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedSpeeds, setSelectedSpeeds] = useState<number[]>([]);
  const [selectedPackTypes, setSelectedPackTypes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedWifiTypes, setSelectedWifiTypes] = useState<string[]>([]);
  const [selectedInstallTypes, setSelectedInstallTypes] = useState<string[]>([]);
  // Estatos de paginas
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Estados de modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortBy, selectedProviders, selectedSpeeds, selectedPackTypes, minPrice, maxPrice]);

  // funcion para abrir modal
  const handleViewDetails = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const filteredPlans = useMemo(() => {
    //let result = [...mockPlans];
    let result = [...fetchedPlans];

    // SEARCH
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(plan => 
        plan.title.toLowerCase().includes(searchLower) ||
        plan.provider.toLowerCase().includes(searchLower) ||
        (plan.description && plan.description.toLowerCase().includes(searchLower))
      );
    }
    
    // BASIC FILTERS
    if (selectedProviders.length > 0) result = result.filter(p => selectedProviders.includes(p.provider));
    if (selectedSpeeds.length > 0) result = result.filter(p => p.speed !== null && selectedSpeeds.includes(p.speed));
    if (selectedPackTypes.length > 0) {
      result = result.filter(plan => {
        const planTags = getPlanTags(plan);
        return selectedPackTypes.every(type => planTags.includes(type));
      });
    }

    // NEW FILTER: WiFi Type
    if (selectedWifiTypes.length > 0) {
      result = result.filter(plan => 
        plan.wifi_type && selectedWifiTypes.some(wifi => plan.wifi_type!.includes(wifi))
      );
    }

    // NEW FILTER: Installation Cost (Gratis vs Pago)
    if (selectedInstallTypes.length > 0) {
      result = result.filter(plan => {
        const isFree = plan.installation_cost === null || plan.installation_cost === 0;
        const wantsFree = selectedInstallTypes.includes("Gratis");
        const wantsPaid = selectedInstallTypes.includes("Pago");
        
        if (wantsFree && wantsPaid) return true; 
        if (wantsFree) return isFree;
        if (wantsPaid) return !isFree;
        return true;
      });
    }

    // PRICE RANGE
    result = result.filter(plan => {
      const price = Number(plan.price);
      const minMatch = !minPrice || price >= Number(minPrice);
      const maxMatch = !maxPrice || price <= Number(maxPrice);
      return minMatch && maxMatch;
    });

    // UPDATED SORTING
    switch (sortBy) {
      case "priceAsc": 
        result.sort((a, b) => Number(a.price) - Number(b.price)); break;
      case "priceDesc": 
        result.sort((a, b) => Number(b.price) - Number(a.price)); break;
      case "speedAsc": 
        result.sort((a, b) => (a.speed || 0) - (b.speed || 0)); break;
      case "speedDesc": 
        result.sort((a, b) => (b.speed || 0) - (a.speed || 0)); break;
      case "pricePerMbpsAsc": 
        result.sort((a, b) => Number(a.price_per_mb || 99999) - Number(b.price_per_mb || 99999)); break;
      case "pricePerMbpsDesc": 
        result.sort((a, b) => Number(b.price_per_mb || 0) - Number(a.price_per_mb || 0)); break;
      default: break;
    }
    return result;
  }, [fetchedPlans, search, sortBy, selectedProviders, selectedSpeeds, selectedPackTypes, minPrice, maxPrice, selectedWifiTypes, selectedInstallTypes]);

  const totalPages = Math.ceil(filteredPlans.length / itemsPerPage);
  const currentPlans = filteredPlans.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 selection:bg-blue-200">
      <Header />

      <main className="max-w-full mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-1 lg:flex-row gap-8 items-start">
          <SidebarFilters
            search={search} setSearch={setSearch}
            sortBy={sortBy} setSortBy={setSortBy}
            selectedProviders={selectedProviders} setSelectedProviders={setSelectedProviders}
            selectedSpeeds={selectedSpeeds} setSelectedSpeeds={setSelectedSpeeds}
            selectedPackTypes={selectedPackTypes} setSelectedPackTypes={setSelectedPackTypes}
            minPrice={minPrice} setMinPrice={setMinPrice}
            maxPrice={maxPrice} setMaxPrice={setMaxPrice}
            selectedWifiTypes={selectedWifiTypes} setSelectedWifiTypes={setSelectedWifiTypes}
            selectedInstallTypes={selectedInstallTypes} setSelectedInstallTypes={setSelectedInstallTypes}
          />

          <section className="flex-1 w-full">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Planes Disponibles</h2>
                <p className="text-gray-500 mt-1">
                  {loading ? "Buscando planes..." : `Encontramos ${filteredPlans.length} resultados para ti.`}
                </p>
              </div>
            </div>

            {loading ? (
              <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <h3 className="text-xl font-bold text-gray-900">Cargando planes...</h3>
                <p className="text-gray-500 mt-2">Conectando con proveedores de internet en Chile.</p>
              </div>
            ) 

            : error ? (
              <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-red-100 flex flex-col items-center justify-center h-[50vh]">
                <div className="bg-red-50 p-4 rounded-full mb-4 text-red-500">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">¡Ups! Algo salió mal</h3>
                <p className="text-gray-500">{error}</p>
              </div>
            )

            : filteredPlans.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center h-[50vh]">
                <div className="bg-gray-50 p-4 rounded-full mb-4 text-gray-400">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No encontramos planes</h3>
                <p className="text-gray-500">Intenta ajustar o limpiar los filtros para ver más opciones.</p>
              </div>
            ) 

            : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentPlans.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} onViewDetails={handleViewDetails} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12 mb-8">
                    <button 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition"
                    >
                      Anterior
                    </button>
                    
                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                            currentPage === i + 1 
                              ? "bg-blue-600 text-white shadow-md" 
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition"
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>

      {/* componente modal */}
      <PlanDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        plan={selectedPlan} 
      />
    </div>
  );
}