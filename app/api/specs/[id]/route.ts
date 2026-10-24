import { getSupabase } from "@/lib/supabase";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return Response.json({ error: "올바른 PRD 주소가 아니에요." }, { status: 400 });
  try {
    const { data, error } = await getSupabase().from("specs").select("*").eq("id", id).maybeSingle();
    if (error) return Response.json({ error: "PRD를 불러오지 못했어요." }, { status: 500 });
    if (!data) return Response.json({ error: "PRD를 찾을 수 없어요." }, { status: 404 });
    return Response.json({ item: data });
  } catch (e) { return Response.json({ error: (e as Error).message }, { status: 500 }); }
}
