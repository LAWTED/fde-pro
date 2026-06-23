import Link from "next/link";
import type { Metadata } from "next";
import { getCard } from "@/lib/fde-card";
import CardStage from "@/components/CardStage";

type Params = { handle: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { handle } = await params;
  const card = await getCard(handle);
  if (!card) return { title: "未找到此 FDE 卡片 · HA7CH fde-pro" };
  return {
    title: `${card.name} (@${card.handle}) · FDE 全息卡片`,
    description: `${card.verdict} — ${card.subtitle}`,
  };
}

export default async function HandlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { handle } = await params;
  const card = await getCard(handle);

  if (!card) {
    return (
      <main className="empty">
        <div className="empty-glow" aria-hidden />
        <div className="empty-badge">404</div>
        <h1 className="empty-title">
          还没有 <span>@{handle}</span> 的 FDE 卡片
        </h1>
        <p className="empty-body">
          这张卡片由 HA7CH <strong>fde-pro</strong> 转型诊断生成。
          <br />
          做完诊断后，你的卡片会出现在 <code>fde.ha7ch.com/c/{handle}</code>。
        </p>
        <Link className="empty-cta" href="/c/lawted">
          看看 @lawted 的卡片 →
        </Link>
      </main>
    );
  }

  return <CardStage card={card} />;
}
