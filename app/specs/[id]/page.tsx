import { Suspense } from "react";
import SpecDetail from "@/components/SpecDetail";

export default function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <Suspense fallback={<p className="p-8">불러오는 중...</p>}><Detail params={params} /></Suspense>;
}
async function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SpecDetail id={id} />;
}
