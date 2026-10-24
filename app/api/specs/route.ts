import { generateSpec } from "@/lib/openai";
import { getSupabase } from "@/lib/supabase";
import type { SpecInput } from "@/lib/types";
import { connection } from "next/server";

export const maxDuration = 60;
export async function POST(request: Request) {
  let body;
  try { body = await request.json(); } catch { return Response.json({ error: "올바른 JSON을 보내 주세요." }, { status: 400 }); }
  if (!body || typeof body !== "object") return Response.json({ error: "입력 내용을 확인해 주세요." }, { status: 400 });
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const problem = typeof body.problem === "string" ? body.problem.trim() : "";
  const target = typeof body.target === "string" ? body.target.trim() : "";
  if (!title || title.length > 100 || !problem || problem.length > 1000 || target.length > 500) return Response.json({ error: "아이디어 이름은 1~100자, 문제는 1~1000자, 타깃은 500자 이내로 입력해 주세요." }, { status: 400 });
  const input: SpecInput = { title, problem, target, timeframe: ["해커톤 24시간", "1주", "1달"].includes(body.timeframe) ? body.timeframe : "해커톤 24시간" };
  let db;
  try { db = getSupabase(); } catch (e) { return Response.json({ error: (e as Error).message }, { status: 500 }); }
  let spec;
  try { spec = await generateSpec(input); } catch (e) {
    const message = e instanceof Error && e.message.includes("환경변수") ? e.message : "AI 생성에 실패했어요. OpenAI 키·크레딧·모델 설정을 확인한 뒤 다시 시도해 주세요.";
    return Response.json({ error: message }, { status: 502 });
  }
  const { data, error } = await db.from("specs").insert({ ...input, product_name: spec.product_name, spec }).select("id,created_at").single();
  if (error) return Response.json({ error: "PRD 저장에 실패했어요. Supabase specs 테이블과 권한을 확인해 주세요." }, { status: 500 });
  return Response.json({ ...data, spec }, { status: 201 });
}

export async function GET() {
  await connection();
  try {
    const { data, error } = await getSupabase().from("specs").select("id,created_at,title,product_name,timeframe,one_liner:spec->>one_liner").order("created_at", { ascending: false }).limit(50);
    if (error) return Response.json({ error: "목록을 불러오지 못했어요. Supabase 테이블과 권한을 확인해 주세요." }, { status: 500 });
    return Response.json({ items: data });
  } catch (e) { return Response.json({ error: (e as Error).message }, { status: 500 }); }
}
