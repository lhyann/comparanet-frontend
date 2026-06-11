export interface Plan {
  id: number
  provider: string
  title: string
  speed: number
  price: string
  price_after: string
  months_discount: number
  all_content: string[]
  scraped_at: string
}

export interface PlansResponse {
  count: number
  scraped_at: string
  plans: Plan[]
}