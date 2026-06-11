import type { Plan } from "../types/Plan";
import vtrLogo from "../assets/vtr.png";
import movistarLogo from "../assets/movistar.svg";
import entelLogo from "../assets/Entel.svg"; 

const providerLogos: Record<string, string> = {
  vtr: vtrLogo,
  movistar: movistarLogo,
  entel: entelLogo,
  claro: "/providers/claro.svg", 
  mundo: "/providers/mundo.svg",
};

interface Props {
  plan: Plan;
  onViewDetails: (plan: Plan) => void; // 新增 prop
}

export default function PlanCard({ plan, onViewDetails }: Props) {
  const price = Number(plan.price);
  const pricePerMbps = plan.speed !== null ? price / plan.speed : null;

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

        {pricePerMbps !== null && pricePerMbps < 30 && (
          <span className="bg-blue-50 text-blue-700 font-bold text-xs px-3 py-1.5 rounded-full">
            Top Opción
          </span>
        )}
      </div>

      <div className="px-6 flex-1">
        <h2 className="text-gray-900 font-semibold mb-4 line-clamp-1" title={plan.title}>{plan.title}</h2>
        
        {/* 修复：判断 speed 是否为 null */}
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
      </div>

      <div className="bg-gray-50/50 p-6 mt-auto border-t border-gray-100">
        <ul className="space-y-2 mb-6">
          {plan.all_content.slice(0, 3).map((content, idx) => ( 
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="leading-tight line-clamp-1">{content}</span>
            </li>
          ))}
        </ul>
        <button 
          onClick={() => onViewDetails(plan)} // 点击触发弹窗
          className="w-full bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold py-2.5 rounded-xl transition-colors"
        >
          Ver Detalles
        </button>
      </div>
    </div>
  );
}