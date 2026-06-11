import type { Plan } from "../types/Plan";
import vtrLogo from "../assets/vtr.png";
import movistarLogo from "../assets/movistar.svg";
import entelLogo from "../assets/Entel.svg";
import womLogo from "../assets/wom.png";
import gtdLogo from "../assets/Gtd.png";

const providerLogos: Record<string, string> = {
  vtr: vtrLogo,
  movistar: movistarLogo,
  entel: entelLogo,
  gtd: womLogo, 
  wom: gtdLogo,
};

interface Props {
  plan: Plan;
  onViewDetails: (plan: Plan) => void;
}

export default function PlanCard({ plan, onViewDetails }: Props) {
  const price = Number(plan.price);
  const isFreeInstall = plan.installation_cost === null || plan.installation_cost === 0;
  const shortDescription = plan.description 
    ? plan.description.split("|").map(item => item.trim()).filter(Boolean)
    : [];
  const isTopOption = plan.price_per_mb && Number(plan.price_per_mb) < 50;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      
      <div className="p-6 pb-4 flex justify-between items-start">
        <div className="h-10 w-24 flex items-center justify-start">
          {providerLogos[plan.provider] ? (
            <img src={providerLogos[plan.provider]} alt={plan.provider} className="max-h-full max-w-full object-contain" />
          ) : (
            <span className="font-bold text-gray-400 uppercase tracking-widest">{plan.provider}</span>
          )}
        </div>

        {isTopOption && (
          <span className="bg-blue-50 text-blue-700 font-bold text-xs px-3 py-1.5 rounded-full">
            Top Opción
          </span>
        )}
      </div>

      <div className="px-6 flex-1">
        <h2 className="text-gray-900 font-semibold mb-4 line-clamp-1" title={plan.title}>{plan.title}</h2>
        
        {plan.speed !== null ? (
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-5xl font-black text-gray-900 tracking-tighter">{plan.speed}</span>
            <span className="text-lg font-medium text-gray-500">Mbps</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-6 h-[60px]">
            <span className="text-2xl font-bold text-gray-400 tracking-tight">Otros Servicios</span>
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-blue-600">${price.toLocaleString("es-CL")}</span>
            <span className="text-sm text-gray-500 font-medium">/mes</span>
          </div>
          
          {plan.price_after && (
            <div className="text-sm text-gray-400 mt-1">
              Luego ${Number(plan.price_after).toLocaleString("es-CL")}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {plan.wifi_type && (
            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>
              {plan.wifi_type}
            </span>
          )}
          <span className={`inline-flex items-center text-xs font-semibold px-2 py-1 rounded ${isFreeInstall ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-700"}`}>
            {isFreeInstall ? "Instalación Gratis" : "Costo de Instalación Aplica"}
          </span>
        </div>
      </div>

      <div className="bg-gray-50/50 p-6 mt-auto border-t border-gray-100">
        <ul className="space-y-2 mb-6">
          {shortDescription.slice(0, 3).map((desc, idx) => ( 
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="leading-tight line-clamp-2">{desc}</span>
            </li>
          ))}
        </ul>
        <button 
          onClick={() => onViewDetails(plan)} 
          className="w-full bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold py-2.5 rounded-xl transition-colors"
        >
          Ver Detalles
        </button>
      </div>
    </div>
  );
}