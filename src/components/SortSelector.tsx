interface SortSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortSelector({ value, onChange }: SortSelectorProps) {
  const activeClass = "bg-blue-50 border-blue-200 text-blue-700 font-semibold";
  const inactiveClass = "bg-white border-gray-200 text-gray-600 hover:bg-gray-50";

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Ordenar por</h3>
      
      <div className="space-y-3">
        {/* Precio */}
        <div>
          <span className="text-xs text-gray-500 block mb-1 uppercase tracking-wide">Precio</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onChange(value === "priceAsc" ? "" : "priceAsc")}
              className={`flex items-center justify-center gap-1 py-2 px-3 border rounded-lg text-sm transition-colors ${value === "priceAsc" ? activeClass : inactiveClass}`}
            >
              Menor <span>↑</span>
            </button>
            <button
              onClick={() => onChange(value === "priceDesc" ? "" : "priceDesc")}
              className={`flex items-center justify-center gap-1 py-2 px-3 border rounded-lg text-sm transition-colors ${value === "priceDesc" ? activeClass : inactiveClass}`}
            >
              Mayor <span>↓</span>
            </button>
          </div>
        </div>

        {/* Velocidad */}
        <div>
          <span className="text-xs text-gray-500 block mb-1 uppercase tracking-wide">Velocidad</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onChange(value === "speedDesc" ? "" : "speedDesc")}
              className={`flex items-center justify-center gap-1 py-2 px-3 border rounded-lg text-sm transition-colors ${value === "speedDesc" ? activeClass : inactiveClass}`}
            >
              Mayor <span>↑</span>
            </button>
            <button
              onClick={() => onChange(value === "speedAsc" ? "" : "speedAsc")}
              className={`flex items-center justify-center gap-1 py-2 px-3 border rounded-lg text-sm transition-colors ${value === "speedAsc" ? activeClass : inactiveClass}`}
            >
              Menor <span>↓</span>
            </button>
          </div>
        </div>
        {/* Precio / Mbps */}
        <div>
          <span className="text-xs text-gray-500 block mb-1 uppercase tracking-wide">Precio/Mbps</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onChange(value === "pricePerMbpsAsc" ? "recommended" : "pricePerMbpsAsc")}
              className={`flex items-center justify-center gap-1 py-2 px-3 border rounded-lg text-sm transition-colors ${value === "pricePerMbpsAsc" ? activeClass : inactiveClass}`}
            >
              Mejor <span>↑</span>
            </button>
            <button
              onClick={() => onChange(value === "pricePerMbpsDesc" ? "recommended" : "pricePerMbpsDesc")}
              className={`flex items-center justify-center gap-1 py-2 px-3 border rounded-lg text-sm transition-colors ${value === "pricePerMbpsDesc" ? activeClass : inactiveClass}`}
            >
              Peor <span>↓</span>
            </button>
          </div>
        </div>

        {/* Recomendado */}
        <div>
          <span className="text-xs text-gray-500 block mb-1 uppercase tracking-wide">Destacado</span>
          <button
            onClick={() => onChange("recommended")}
            className={`w-full flex items-center justify-center gap-1 py-2 px-3 border rounded-lg text-sm transition-colors ${(!value || value === "recommended") ? activeClass : inactiveClass}`}
          >
            ★ Recomendado
          </button>
        </div>
      </div>
    </div>
  );
}


