import type { Plan } from "../types/Plan";

export function getPlanTags(plan: Plan): string[] {
  const tags: string[] = [];

  const contentToSearch = (plan.title + " " + plan.all_content.join(" ")).toLowerCase();

  // 1. 是否包含宽带网络
  if (plan.speed !== null || contentToSearch.includes("fibra") || contentToSearch.includes("internet")) {
    tags.push("internet");
  }
  

  if (contentToSearch.includes("tv") || contentToSearch.includes("canales") || contentToSearch.includes("d-box") || contentToSearch.includes("pack")) {
    tags.push("tv");
  }
  

  if (contentToSearch.includes("telefonía") || contentToSearch.includes("minutos a móviles")) {
    tags.push("telefonía");
  }
  

  if (contentToSearch.includes("stream") || contentToSearch.includes("disney+") || contentToSearch.includes("plataformas")) {
    tags.push("streaming");
  }

  return tags;
}