import SearchBox from "./SearchBox";
import SortSelector from "./SortSelector";
import PriceRangeSlider from "./PriceRangeSlider";

interface SidebarFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  selectedProviders: string[];
  setSelectedProviders: (providers: string[]) => void;
  selectedSpeeds: number[];
  setSelectedSpeeds: (speeds: number[]) => void;
  selectedPackTypes: string[];
  setSelectedPackTypes: (types: string[]) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  selectedWifiTypes: string[]; 
  setSelectedWifiTypes: (types: string[]) => void;
  selectedInstallTypes: string[]; 
  setSelectedInstallTypes: (types: string[]) => void;
}

export default function SidebarFilters(props: SidebarFiltersProps) {
  const providers = ["vtr", "movistar", "entel", "gtd", "wom"];
  const speeds = [300, 600, 800, 940];
  const packTypes = ["internet", "tv", "telefonía", "streaming"];
  const wifiTypes = [ "WiFi 6","WiFi 7"];
  const installTypes = ["Gratis", "Pago"];

  const toggleArrayItem = (arr: any[], item: any, setFn: (val: any) => void) => {
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
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Filtros</h2>
        <SearchBox value={props.search} onChange={props.setSearch} />
      </div>

      <SortSelector value={props.sortBy} onChange={props.setSortBy} />
      <hr className="my-6 border-gray-100" />
      <PriceRangeSlider 
        minPrice={props.minPrice} setMinPrice={props.setMinPrice}
        maxPrice={props.maxPrice} setMaxPrice={props.setMaxPrice}
      />
      <hr className="my-6 border-gray-100" />

      {renderCheckboxGroup("Proveedor", providers, props.selectedProviders, props.setSelectedProviders)}
      {renderCheckboxGroup("Velocidad", speeds, props.selectedSpeeds, props.setSelectedSpeeds, "Mbps")}
      {renderCheckboxGroup("Servicios Incluidos", packTypes, props.selectedPackTypes, props.setSelectedPackTypes)}
      {renderCheckboxGroup("Tecnología WiFi", wifiTypes, props.selectedWifiTypes, props.setSelectedWifiTypes)}
      {renderCheckboxGroup("Instalación", installTypes, props.selectedInstallTypes, props.setSelectedInstallTypes)}
    </aside>
  );
}