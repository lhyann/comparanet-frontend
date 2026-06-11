export interface Plan {
  id: number;
  provider: string;
  title: string;
  speed: number | null;
  price: string;
  price_after: string | null;
  months_discount: number | null;
  pack_type?: string;
  all_content: string[];
  scraped_at: string;
}

export interface PlansResponse {
  count: number
  scraped_at: string
  plans: Plan[]
}