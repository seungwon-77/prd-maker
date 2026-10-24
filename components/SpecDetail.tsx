"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import SpecView from "./SpecView";
import type { Spec } from "@/lib/types";

export default function SpecDetail({ id }: { id: string }) {
  const [spec, setSpec] = useState<Spec | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    fetch(`/api/specs/${id}`).then(async res => { const data = await res.json(); if (!res.ok) throw new Error(data.error); if (active) setSpec(data.item.spec); }).catch(e => { if (active) setError(e.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);
  return <main className="mx-auto w-full max-w-2xl px-4 py-12"><Link href="/specs" className="mb-8 inline-block text-sm text-[var(--accent)]">← 내 PRD 목록</Link>{loading ? <p role="status">불러오는 중...</p> : error ? <p role="alert" className="error">{error}</p> : spec && <SpecView spec={spec} />}</main>;
}
