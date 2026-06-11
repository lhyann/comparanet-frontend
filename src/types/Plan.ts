export interface Plan {
  id: number;
  provider: string;
  title: string;
  speed: number | null;
  price: string;
  price_after: string | null;
  months_discount: number | null;
  description: string | null;
  wifi_type: string | null;
  installation_cost: number | null;
  installation_text: string | null;
  value_ratio: string | null;
  price_per_mb: string | null;
  all_content: string[];
  source_url: string | null;
  scraped_at: string;
}

export interface PlansResponse {
  count: number;
  scraped_at: string;
  plans: Plan[];
}