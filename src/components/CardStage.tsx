"use client";

import dynamic from "next/dynamic";
import type { FdeCard } from "@/lib/fde-card";

// The card relies on pointer events / refs, so render it client-only.
const FdeCardView = dynamic(() => import("./FdeCardView"), {
  ssr: false,
  loading: () => <div className="stage-skeleton" aria-hidden />,
});

export default function CardStage({ card }: { card: FdeCard }) {
  return (
    <main className="stage">
      <div className="stage-glow" aria-hidden />
      <div className="stage-card">
        <FdeCardView card={card} />
      </div>
      <p className="stage-caption">
        移动鼠标，看全息流光随指针流动 · hover 卡片可 3D 倾斜
      </p>
      <p className="stage-brand">
        HA7CH <span>fde-pro</span> · FDE 转型诊断的卡片产物
      </p>
    </main>
  );
}
