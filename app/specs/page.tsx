"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { SpecSummary } from "@/lib/types";

export default function SpecsPage() {
  const [items, setItems] = useState<SpecSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    fetch("/api/specs").then(async res => { const data = await res.json(); if (!res.ok) throw new Error(data.error); if (active) setItems(data.items); }).catch(e => { if (active) setError(e.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  return <main className="mx-auto w-full max-w-2xl px-4 py-12"><Link href="/" className="text-sm text-[var(--accent)]">← 새 PRD 만들기</Link><h1 className="mb-3 mt-8 font-serif text-3xl font-semibold">내 PRD 목록</h1><p className="mb-8 text-sm text-[var(--muted)]">아이디어가 실행 계획이 된 기록. 최근 50개를 보여드려요.</p>
    {loading ? <p role="status">불러오는 중...</p> : error ? <p role="alert" className="error">{error}</p> : items.length === 0 ? <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center"><p>아직 만든 PRD가 없어요.</p><Link href="/" className="mt-4 inline-block text-[var(--accent)] underline">첫 PRD 만들기 →</Link></div> : <div className="space-y-4">{items.map(x => <Link key={x.id} href={`/specs/${x.id}`} className="block rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-colors hover:border-[var(--accent)]"><p className="mb-3 text-xs text-[var(--muted)]">{x.timeframe} · {new Date(x.created_at).toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul" })}</p><h2 className="text-xl font-semibold">{x.product_name}</h2><p className="mt-2 text-sm text-[var(--muted)]">{x.one_liner}</p><span className="mt-4 inline-block text-sm text-[var(--accent)]">PRD 열기 →</span></Link>)}</div>}
  </main>;
}
