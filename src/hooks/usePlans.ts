import { useEffect, useState } from "react"
import { getPlans } from "../api/plansApi"
import type { Plan } from "../types/Plan"

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlans() {
      try {
        const data = await getPlans()

        setPlans(data.plans)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  return { plans, loading }
}