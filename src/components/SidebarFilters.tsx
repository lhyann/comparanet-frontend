import PriceRangeSlider from "./PriceRangeSlider";
import PlatformRangeSlider from "./PlatformRangeSlider"; 

interface SidebarFiltersProps {
  showOnlyTop: boolean; setShowOnlyTop: (value: boolean) => void;
  selectedProviders: string[]; setSelectedProviders: (providers: string[]) => void;
  selectedSpeeds: number[]; setSelectedSpeeds: (speeds: number[]) => void;
  selectedPackTypes: string[]; setSelectedPackTypes: (types: string[]) => void;
  minPrice: string; setMinPrice: (value: string) => void;
  maxPrice: string; setMaxPrice: (value: string) => void;
  selectedWifiTypes: string[]; setSelectedWifiTypes: (types: string[]) => void;
  selectedInstallTypes: string[]; setSelectedInstallTypes: (types: string[]) => void;
  minPlatforms: string; setMinPlatforms: (value: string) => void;
  maxPlatforms: string; setMaxPlatforms: (value: string) => void;
}

export default function SidebarFilters(props: SidebarFiltersProps) {
  const providers = ["vtr", "movistar", "entel", "wom", "gtd"];
  const speeds = [300, 600, 800, 940];
  const packTypes = ["internet", "tv", "telefonía", "streaming"];
  const wifiTypes = ["WiFi 6","WiFi 7"]; 
  const installTypes = ["Gratis", "Pago"];

  const toggleArrayItem = (arr: string[], item: string, setFn: (val: string[]) => void) => {
    if (arr.includes(item)) setFn(arr.filter((i) => i !== item));
    else setFn([...arr, item]);
  };

  const renderCheckboxGroup = (title: string, items: any[], selected: any[], setFn: (val: any) => void, suffix = "") => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={selected.includes(item)}
                onChange={() => toggleArrayItem(selected, item, setFn)}
                className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-blue-600 checked:border-blue-600 transition-colors cursor-pointer"
              />
              <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-900 capitalize transition-colors">
              {item} {suffix}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <aside className="lg:w-72 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit shrink-0">
      <h2 className="text-lg font-bold text-black mb-6">Filtros</h2>

      {/* Botón de Ajuste Con Estilo Minimalista Azul */}
      <div className="mb-6">
        <button
          onClick={() => props.setShowOnlyTop(!props.showOnlyTop)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-colors ${
            props.showOnlyTop 
              ? 'bg-blue-50 border-blue-200 text-blue-700' 
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-2 text-sm font-semibold">
             <svg className={`w-4 h-4 ${props.showOnlyTop ? "text-blue-600" : "text-gray-400"}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
             Solo Top Opciones
          </div>
          <div className={`w-8 h-4.5 rounded-full p-0.5 flex items-center transition-colors ${props.showOnlyTop ? 'bg-blue-600' : 'bg-gray-300'}`}>
            <div className={`w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-transform ${props.showOnlyTop ? 'translate-x-3.5' : 'translate-x-0'}`}></div>
          </div>
        </button>
      </div>

      <hr className="my-6 border-gray-100" />
      
      <PriceRangeSlider 
        minPrice={props.minPrice} setMinPrice={props.setMinPrice}
        maxPrice={props.maxPrice} setMaxPrice={props.setMaxPrice}
      />
      <hr className="my-6 border-gray-100" />

      <PlatformRangeSlider
        minPlatforms={props.minPlatforms} setMinPlatforms={props.setMinPlatforms}
        maxPlatforms={props.maxPlatforms} setMaxPlatforms={props.setMaxPlatforms}
      />
      <hr className="my-6 border-gray-100" />

      {renderCheckboxGroup("Proveedor", providers, props.selectedProviders, props.setSelectedProviders)}
      {renderCheckboxGroup("Servicios Incluidos", packTypes, props.selectedPackTypes, props.setSelectedPackTypes)}
      {renderCheckboxGroup("Velocidad", speeds, props.selectedSpeeds, props.setSelectedSpeeds, "Mbps")}
      {renderCheckboxGroup("Tecnología WiFi", wifiTypes, props.selectedWifiTypes, props.setSelectedWifiTypes)}
      {renderCheckboxGroup("Instalación", installTypes, props.selectedInstallTypes, props.setSelectedInstallTypes)}
    </aside>
  );
}