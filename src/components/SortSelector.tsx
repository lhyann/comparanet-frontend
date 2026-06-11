interface SortSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortSelector({ value, onChange }: SortSelectorProps) {
  const activeClass = "bg-blue-50 border-blue-300 text-blue-700 font-bold z-10 relative";
  const inactiveClass = "bg-white border-gray-200 text-gray-600 hover:bg-gray-50";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full">
      <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Ordenar:</span>
      
      <div className="flex rounded-xl shadow-sm w-full">
        <button 
          onClick={() => onChange(value === "priceAsc" ? "" : "priceAsc")} 
          className={`flex-1 sm:flex-none px-3 py-2.5 border rounded-l-xl text-sm transition-colors ${value === "priceAsc" ? activeClass : inactiveClass}`}
        >
          Precio ↑
        </button>
        <button 
          onClick={() => onChange(value === "priceDesc" ? "" : "priceDesc")} 
          className={`flex-1 sm:flex-none px-3 py-2.5 border-y border-r border-l-0 text-sm transition-colors ${value === "priceDesc" ? activeClass : inactiveClass}`}
        >
          Precio ↓
        </button>
        <button 
          onClick={() => onChange(value === "speedDesc" ? "" : "speedDesc")} 
          className={`flex-1 sm:flex-none px-3 py-2.5 border-y border-r border-l-0 text-sm transition-colors ${value === "speedDesc" ? activeClass : inactiveClass}`}
        >
          Velocidad ↑
        </button>
        <button 
          onClick={() => onChange(value === "speedAsc" ? "" : "speedAsc")} 
          className={`flex-1 sm:flex-none px-3 py-2.5 border-y border-r border-l-0 rounded-r-xl text-sm transition-colors ${value === "speedAsc" ? activeClass : inactiveClass}`}
        >
          Velocidad ↓
        </button>
      </div>
    </div>
  );
}
