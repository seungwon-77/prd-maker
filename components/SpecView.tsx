"use client";
import { useState } from "react";
import { specToMarkdown } from "@/lib/markdown";
import type { Spec } from "@/lib/types";

export default function SpecView({ spec }: { spec: Spec }) {
  const [notice, setNotice] = useState("");
  async function copy() {
    try { await navigator.clipboard.writeText(specToMarkdown(spec)); setNotice("마크다운을 복사했어요."); }
    catch { setNotice("복사하지 못했어요. .md 다운로드를 이용해 주세요."); }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([specToMarkdown(spec)], { type: "text/markdown;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = "PRD.md"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("PRD.md 다운로드를 시작했어요.");
  }
  return <article className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-8">
    <p className="mb-3 text-xs font-semibold tracking-widest text-[var(--accent)]">YOUR PRODUCT BRIEF</p>
    <h2 className="font-serif text-3xl font-semibold">{spec.product_name}</h2>
    <p className="mt-3 text-[var(--muted)]">{spec.one_liner}</p>
    <div className="mt-5 flex flex-wrap gap-2"><button className="secondary" onClick={copy}>마크다운 복사</button><button className="secondary" onClick={download}>.md 다운로드</button></div>
    <p role="status" className="mt-2 text-sm text-[var(--accent)]">{notice}</p>
    <section className="section"><h3>문제</h3><p>{spec.problem}</p></section>
    <section className="section"><h3>타깃 유저</h3><ul>{spec.target_users.map((x, i) => <li key={i}><strong>{x.persona}</strong> — {x.pain}</li>)}</ul></section>
    <section className="section"><h3>핵심 기능</h3><div className="space-y-4">{spec.core_features.map((x, i) => <div key={i}><span className={`mr-2 rounded px-2 py-1 text-xs font-semibold ${x.priority === "P0" ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "bg-[var(--bg)] text-[var(--muted)]"}`}>{x.priority}</span><strong>{x.name}</strong><p className="mt-2 text-sm text-[var(--muted)]">{x.description}</p></div>)}</div></section>
    <section className="section"><h3>유저 플로우</h3><ol className="list-decimal space-y-2 pl-5">{spec.user_flow.map((x, i) => <li key={i}>{x}</li>)}</ol></section>
    <section className="section"><h3>화면</h3><ul>{spec.screens.map((x, i) => <li key={i}><strong>{x.name}</strong> — {x.purpose}</li>)}</ul></section>
    <section className="section"><h3>데이터 모델</h3>{spec.data_model.map((x, i) => <div className="mb-3 rounded-lg bg-[var(--bg)] p-3 font-mono text-sm" key={i}><strong>{x.table}</strong><ul>{x.columns.map((c, j) => <li key={j}>{c}</li>)}</ul></div>)}</section>
    <section className="section"><h3>API</h3><ul className="font-mono text-sm">{spec.api_endpoints.map((x, i) => <li key={i}><strong>{x.method} {x.path}</strong><p>{x.description}</p></li>)}</ul></section>
    <section className="section"><h3>이번에 안 하는 것</h3><ul>{spec.out_of_scope.map((x, i) => <li key={i}>{x}</li>)}</ul></section>
    <section className="section"><h3>리스크</h3><ul>{spec.risks.map((x, i) => <li key={i}>{x}</li>)}</ul></section>
    <section className="section"><h3>첫 프롬프트</h3><p className="whitespace-pre-wrap rounded-lg bg-[var(--bg)] p-4 font-mono text-sm">{spec.first_prompt}</p></section>
    <section className="section"><h3>단계별 구현 순서</h3>{spec.implementation_steps.map((x, i) => <div key={i} className="mb-5"><h4 className="font-semibold text-[var(--accent)]">Step {i + 1}. {x.title}</h4><p className="my-2 text-sm">{x.goal}</p><p className="whitespace-pre-wrap rounded-lg bg-[var(--bg)] p-4 font-mono text-sm">{x.prompt}</p></div>)}</section>
  </article>;
}
