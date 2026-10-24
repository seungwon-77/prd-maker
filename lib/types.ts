export type Spec = {
  product_name: string;
  one_liner: string;
  problem: string;
  target_users: { persona: string; pain: string }[];
  core_features: { name: string; description: string; priority: "P0" | "P1" }[];
  user_flow: string[];
  screens: { name: string; purpose: string }[];
  data_model: { table: string; columns: string[] }[];
  api_endpoints: { method: "GET" | "POST" | "PATCH" | "DELETE"; path: string; description: string }[];
  out_of_scope: string[];
  risks: string[];
  first_prompt: string;
  implementation_steps: { title: string; goal: string; prompt: string }[];
};
export type SpecInput = { title: string; problem: string; target: string; timeframe: string };
export type SpecSummary = { id: string; created_at: string; title: string; product_name: string; timeframe: string; one_liner: string };
