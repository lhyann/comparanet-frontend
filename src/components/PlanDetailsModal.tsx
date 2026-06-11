import { useEffect } from "react";
import type { Plan } from "../types/Plan";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
}

export default function PlanDetailsModal({ isOpen, onClose, plan }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !plan) return null;

  const isFreeInstall = plan.installation_cost === null || plan.installation_cost === 0;
  const shortDescription = plan.description 
    ? plan.description.split("|").map(item => item.trim()).filter(Boolean)
    : [];
    
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
             <span className="bg-blue-50 text-blue-700 font-bold text-xs px-3 py-1 rounded-md uppercase tracking-wide">
               {plan.provider}
             </span>
             <h2 className="text-xl font-bold text-black">{plan.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          
          {/* Main Stats Banner */}
          <div className="flex flex-wrap gap-6 mb-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
            <div className="flex-1 min-w-[120px]">
              <p className="text-sm text-gray-500 font-medium mb-1">Precio Mensual</p>
              <p className="text-3xl font-bold text-blue-600">${Number(plan.price).toLocaleString("es-CL")}</p>
              {plan.price_after && (
                <p className="text-sm text-gray-400 mt-1">Luego ${Number(plan.price_after).toLocaleString("es-CL")}</p>
              )}
            </div>
            
            <div className="w-px bg-gray-200 hidden md:block"></div>

            <div className="flex-1 min-w-[120px]">
              <p className="text-sm text-gray-500 font-medium mb-1">Velocidad</p>
              {plan.speed !== null ? (
                 <p className="text-3xl font-black text-gray-900">{plan.speed} <span className="text-lg font-medium text-gray-500">Mbps</span></p>
              ) : (
                 <p className="text-xl font-bold text-gray-600 mt-1">N/A</p>
              )}
            </div>
          </div>

          {/* New Technical Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
             <div className="bg-white border border-gray-200 p-4 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Instalación</p>
                <p className={`font-semibold ${isFreeInstall ? 'text-green-600' : 'text-gray-900'}`}>
                  {plan.installation_text || (isFreeInstall ? "Gratis" : `$${plan.installation_cost}`)}
                </p>
             </div>
             <div className="bg-white border border-gray-200 p-4 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Tecnología WiFi</p>
                <p className="font-semibold text-black">
                  {plan.wifi_type ? plan.wifi_type : (plan.speed !== null ? "Estándar" : "N/A")}
                </p>
             </div>
             <div className="bg-white border border-gray-200 p-4 rounded-xl col-span-2 md:col-span-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Valor x Mbps</p>
                <p className="font-semibold text-gray-900">{plan.price_per_mb ? `$${Number(plan.price_per_mb).toFixed(1)}` : "N/A"}</p>
             </div>
          </div>

          {/* Full Features List */}
          <h3 className="text-lg font-bold text-gray-900 mb-4">¿Qué incluye este plan?</h3>
          <ul className="space-y-4">
            {shortDescription.slice(0, 100).map((desc, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-0.5 bg-green-100 p-1 rounded-full text-green-600 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium leading-snug">{desc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 flex justify-end gap-3 z-10">
          <button onClick={onClose} className="px-5 py-2.5 text-gray-600 font-semibold hover:bg-gray-100 rounded-xl transition-colors">
            Cerrar
          </button>
          
          {/* Si no hay link no muestra boton*/}
          {plan.source_url ? (
            <a 
              href={plan.source_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center gap-2"
            >
              Contratar Plan
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          ) : (
            <button disabled className="px-6 py-2.5 bg-gray-300 text-white font-bold rounded-xl cursor-not-allowed">
              No Disponible
            </button>
          )}
        </div>

      </div>
    </div>
  );
}