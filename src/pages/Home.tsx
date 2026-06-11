import { usePlans } from "../hooks/usePlans"
import PlanCard from "../components/PlanCard"

export default function Home() {
  const { plans, loading } = usePlans()

  if (loading) {
    return <p>Cargando...</p>
  }

  return (
    <div className="container mx-auto p-6">

      <h1 className="text-4xl font-bold mb-6">
        ComparaNet Chile
      </h1>

      <div className="grid md:grid-cols-3 gap-4">

        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
          />
        ))}

      </div>

    </div>
  )
}