const str = { type: "string" };
const strings = { type: "array", items: str };
const object = (properties: Record<string, unknown>) => ({ type: "object", additionalProperties: false, properties, required: Object.keys(properties) });
const list = (properties: Record<string, unknown>) => ({ type: "array", items: object(properties) });
export const specSchema = object({
  product_name: str, one_liner: str, problem: str,
  target_users: list({ persona: str, pain: str }),
  core_features: list({ name: str, description: str, priority: { type: "string", enum: ["P0", "P1"] } }),
  user_flow: strings, screens: list({ name: str, purpose: str }),
  data_model: list({ table: str, columns: strings }),
  api_endpoints: list({ method: { type: "string", enum: ["GET", "POST", "PATCH", "DELETE"] }, path: str, description: str }),
  out_of_scope: strings, risks: strings, first_prompt: str,
  implementation_steps: list({ title: str, goal: str, prompt: str }),
});
