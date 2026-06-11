import type { Plan } from "../types/Plan"

interface Props {
  plan: Plan
}

export default function PlanCard({
  plan,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-4">

      <h2 className="font-bold text-xl">
        {plan.title}
      </h2>

      <p>{plan.provider}</p>

      <p className="text-blue-600 text-3xl">
        {plan.speed} Mbps
      </p>

      <p className="font-bold text-2xl">
        ${plan.price}
      </p>

      <p className="text-gray-500">
        Luego ${plan.price_after}
      </p>

    </div>
  )
}