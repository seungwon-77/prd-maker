import type { Spec } from "./types";

export function specToMarkdown(s: Spec) {
  const bullets = (items: string[]) => items.map(x => `- ${x}`).join("\n");
  return [
    `# ${s.product_name}\n\n${s.one_liner}`,
    `## 문제\n${s.problem}`,
    `## 타깃 유저\n${bullets(s.target_users.map(x => `${x.persona}: ${x.pain}`))}`,
    `## 핵심 기능\n${bullets(s.core_features.map(x => `[${x.priority}] ${x.name}: ${x.description}`))}`,
    `## 유저 플로우\n${s.user_flow.map((x, i) => `${i + 1}. ${x}`).join("\n")}`,
    `## 화면\n${bullets(s.screens.map(x => `${x.name}: ${x.purpose}`))}`,
    `## 데이터 모델\n${s.data_model.map(x => `### ${x.table}\n${bullets(x.columns)}`).join("\n\n")}`,
    `## API\n${bullets(s.api_endpoints.map(x => `${x.method} ${x.path}: ${x.description}`))}`,
    `## 이번에 안 하는 것\n${bullets(s.out_of_scope)}`,
    `## 리스크\n${bullets(s.risks)}`,
    `## 첫 프롬프트\n${s.first_prompt}`,
    `## 단계별 구현 순서\n${s.implementation_steps.map((x, i) => `### Step ${i + 1}. ${x.title}\n${x.goal}\n\n${x.prompt}`).join("\n\n")}`,
  ].join("\n\n") + "\n";
}
