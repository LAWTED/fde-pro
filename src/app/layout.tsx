import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "fde.pro — 你现在是不是 FDE，一个真驻过场的人帮你诚实诊断",
  description:
    "上传简历或描述经历,一个真正驻过场的 FDE 帮你诚实诊断:你现在是不是 FDE、缺哪半(Echo 摸真需求 / Delta 端到端做出来)、该走土 FDE 还是大厂 FDE、未来 30 天该干什么。敢说「你现在不适合」。",
  metadataBase: new URL("https://fde.ha7ch.com"),
  openGraph: {
    title: "fde.pro · FDE PRO",
    description:
      "FDE = Echo + Delta,缺任一半都不是 FDE。一个真驻过场的 FDE 帮你诚实诊断,敢说你现在不适合。",
    url: "https://fde.ha7ch.com",
  },
  keywords: [
    "FDE", "Forward Deployed Engineer", "前向部署工程师", "驻场工程师",
    "土 FDE", "大厂 FDE", "Echo", "Delta", "AI 落地工程师",
    "fde-pro", "FDE Pro", "Palantir FDE", "Claude Code", "SkillHub",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <head>
        {/* Inter — landing page (ha7ch editorial). Chakra Petch / Geist Mono
            stay for the /c holographic card route — do not remove them. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;460;540;600&family=Playfair+Display:wght@400;700&family=Noto+Serif+SC:wght@400;700&family=Geist+Mono&family=Chakra+Petch:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
