interface SortSelectorProps {
  value: string;
  onChange: (value: string) => void;
}


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
        <div className="mb-6">
      <label
        className="
        block
        text-sm
        font-semibold
        mb-2
      "
      >
        Ordenar por
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
        w-full
        border
        rounded-lg
        p-2
        "
      >
        <option value="">
          Relevancia
        </option>

        <option value="pricePerMbpsAsc">
          Mejor Precio/Mbps
        </option>

        <option value="pricePerMbpsDesc">
          Peor Precio/Mbps
        </option>
      </select>
    </div>
      </div>
    </div>
  );
}


