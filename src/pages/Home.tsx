import { useMemo, useState, useEffect } from "react";
import SidebarFilters from "../components/SidebarFilters";
import PlanCard from "../components/PlanCard";
import Header from "../components/Header";
import PlanDetailsModal from "../components/PlanDetailsModal"; // 引入弹窗
import { mockPlans } from "../data/mockPlans";
import { getPlanTags } from "../utils/planCategorizar"; // 引入分析工具
import type { Plan } from "../types/Plan";

export default function Home() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedSpeeds, setSelectedSpeeds] = useState<number[]>([]);
  const [selectedPackTypes, setSelectedPackTypes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // 弹窗状态
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortBy, selectedProviders, selectedSpeeds, selectedPackTypes, minPrice, maxPrice]);

  // 打开弹窗的处理函数
  const handleViewDetails = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const filteredPlans = useMemo(() => {
    let result = [...mockPlans];

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(plan => 
        plan.title.toLowerCase().includes(searchLower) ||
        plan.provider.toLowerCase().includes(searchLower) ||
        plan.all_content.some(item => item.toLowerCase().includes(searchLower))
      );
    }
    
    if (selectedProviders.length > 0) result = result.filter(p => selectedProviders.includes(p.provider));
    if (selectedSpeeds.length > 0) result = result.filter(p => p.speed !== null && selectedSpeeds.includes(p.speed));
    
    // 全新的 Pack Type 过滤逻辑
    if (selectedPackTypes.length > 0) {
      result = result.filter(plan => {
        const planTags = getPlanTags(plan);
        // 使用 .every()：意味着如果用户勾选了 internet 和 tv，就只显示同时包含这两者的套餐
        return selectedPackTypes.every(type => planTags.includes(type));
      });
    }

    result = result.filter(plan => {
      const price = Number(plan.price);
      const minMatch = !minPrice || price >= Number(minPrice);
      const maxMatch = !maxPrice || price <= Number(maxPrice);
      return minMatch && maxMatch;
    });

    switch (sortBy) {
      case "priceAsc": result.sort((a, b) => Number(a.price) - Number(b.price)); break;
      case "priceDesc": result.sort((a, b) => Number(b.price) - Number(a.price)); break;
      case "speedAsc": result.sort((a, b) => (a.speed || 0) - (b.speed || 0)); break;
      case "speedDesc": result.sort((a, b) => (b.speed || 0) - (a.speed || 0)); break;
      default: break;
    }
    return result;
  }, [search, sortBy, selectedProviders, selectedSpeeds, selectedPackTypes, minPrice, maxPrice]);

  const totalPages = Math.ceil(filteredPlans.length / itemsPerPage);
  const currentPlans = filteredPlans.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 selection:bg-blue-200">
      <Header />

      <main className="max-w-[1440px] mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <SidebarFilters
            search={search} setSearch={setSearch}
            sortBy={sortBy} setSortBy={setSortBy}
            selectedProviders={selectedProviders} setSelectedProviders={setSelectedProviders}
            selectedSpeeds={selectedSpeeds} setSelectedSpeeds={setSelectedSpeeds}
            selectedPackTypes={selectedPackTypes} setSelectedPackTypes={setSelectedPackTypes}
            minPrice={minPrice} setMinPrice={setMinPrice}
            maxPrice={maxPrice} setMaxPrice={setMaxPrice}
          />

          <section className="flex-1 w-full">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Planes Disponibles</h2>
                <p className="text-gray-500 mt-1">Encontramos {filteredPlans.length} resultados para ti.</p>
              </div>
            </div>

            {filteredPlans.length === 0 ? (
              // 空状态占位... (保持与上次代码一致)
              <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center h-[50vh]">
                {/* ... */}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentPlans.map((plan) => (
                    <PlanCard 
                      key={plan.id} 
                      plan={plan} 
                      onViewDetails={handleViewDetails} // 传入弹窗触发器
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  // 分页控件... (保持与上次代码一致)
                  <div className="flex justify-center items-center gap-2 mt-12 mb-8">
                    {/* ... */}
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>

      {/* 挂载弹窗组件 */}
      <PlanDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        plan={selectedPlan} 
      />
    </div>
  );
}