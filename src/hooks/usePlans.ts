import { useState, useEffect } from "react";
import api from "../services/axios"; 
import type { Plan, PlansResponse } from "../types/Plan";
import { mockPlans } from "../data/mockPlans"; // 引入假数据作为后备

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.get<PlansResponse>("/plans", {
          timeout: 15000 // 15秒超时
        });
        
        if (response.data && response.data.plans) {
          setPlans(response.data.plans);
        } else {
          throw new Error("Formato de datos incorrecto");
        }
      } catch (err: any) {
        console.error("Error al obtener los planes:", err);
        console.warn("Usando datos de prueba (Mock) debido al error del servidor.");
        setPlans(mockPlans); 
        
        
        // setError("No pudimos conectar con el servidor. Mostrando datos de respaldo.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return { plans, loading, error };
}