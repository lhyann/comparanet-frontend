import api from "../services/axios"
import type { PlansResponse } from "../types/Plan"

export const getPlans = async () => {
  const response =
    await api.get<PlansResponse>("/plans")

  return response.data
}