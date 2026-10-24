"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import SpecView from "@/components/SpecView";
import type { Spec } from "@/lib/types";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ id: string; spec: Spec } | null>(null);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    const input = Object.fromEntries(new FormData(e.currentTarget));
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/api/specs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "생성에 실패했어요.");
      setResult(data);
    } catch (e) { setError(e instanceof Error ? e.message : "네트워크 연결을 확인해 주세요."); }
    finally { setLoading(false); }
  }
  return <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-16">
    <header className="mb-10 flex flex-wrap items-start justify-between gap-4"><div><p className="mb-2 text-xs font-semibold tracking-widest text-[var(--accent)]">POPUP / PRODUCT STUDIO</p><h1 className="font-serif text-3xl font-semibold">팝업 PRD 메이커</h1><p className="mt-3 text-sm text-[var(--muted)]">팝업 발견의 아이디어를, 바로 만들 수 있는 계획으로.</p></div><Link className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline" href="/specs">내 PRD 목록 →</Link></header>
    <form onSubmit={submit} className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-8">
      <div className="mb-6 flex items-center gap-3"><span className="text-sm font-mono text-[var(--accent)]">01</span><h2 className="text-lg font-semibold">어떤 서비스를 만들까요?</h2></div>
      <fieldset disabled={loading} className="space-y-5 disabled:opacity-70">
        <label className="block text-sm font-medium">아이디어 이름 <span className="text-[var(--accent)]">*</span><input name="title" required maxLength={100} placeholder="이번 주말 성수 팝업 지도" className="field" /></label>
        <label className="block text-sm font-medium">해결하려는 문제 <span className="text-[var(--accent)]">*</span><textarea name="problem" required maxLength={1000} rows={4} placeholder="팝업 정보가 SNS에 흩어져 있어 위치와 운영 기간을 한눈에 비교하기 어려워요." className="field resize-y" /></label>
        <label className="block text-sm font-medium">타깃 유저 <span className="font-normal text-[var(--muted)]">선택</span><input name="target" maxLength={500} placeholder="주말에 팝업스토어를 방문하는 20대" className="field" /></label>
        <label className="block text-sm font-medium">개발 기간<select name="timeframe" defaultValue="1주" className="field"><option>해커톤 24시간</option><option>1주</option><option>1달</option></select></label>
        <button type="submit" className="w-full rounded-xl bg-[var(--accent)] px-4 py-3.5 font-semibold text-[var(--card)] disabled:cursor-wait" disabled={loading}>{loading ? "PRD 작성 중... (10~30초)" : "PRD 만들기 →"}</button>
      </fieldset>
      <p className="mt-4 text-center text-xs leading-5 text-[var(--muted)]">1인 개발에 맞춘 기능 우선순위와 단계별 코딩 프롬프트를 만들어요.<br />생성된 PRD는 자동 저장됩니다.</p>
    </form>
    {error && <div role="alert" className="error mb-6">{error}</div>}
    {loading && <p role="status" aria-live="polite" className="mb-6 text-center text-sm text-[var(--accent)]">아이디어를 읽고 구현 순서를 정리하고 있어요…</p>}
    {result ? <><p className="mb-3 text-sm text-[var(--accent)]">저장 완료 · <Link className="underline" href={`/specs/${result.id}`}>저장한 PRD 열기</Link></p><SpecView spec={result.spec} /></> : !loading && <div className="border-t border-[var(--border)] pt-6 text-sm text-[var(--muted)]"><p className="mb-2 font-medium text-[var(--text)]">아이디어 다음에 필요한 것까지.</p><p>핵심 기능 · 화면 · 데이터 모델 · API · 단계별 구현 프롬프트</p></div>}
  </main>;
}
