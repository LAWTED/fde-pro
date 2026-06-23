"use client";

import { useState } from "react";

const PROMPT = `读我的简历/经历,用 fde-pro 的尺子诚实判断我:

1. 我现在到底是不是 FDE?
2. 我缺哪半 —— Echo(进现场摸真需求、推翻表面需求) 还是 Delta(本人零依赖端到端把能跑的东西做出来)?
3. 我该走土 FDE(一个人对接老板) 还是大厂 FDE(带平台进客户现场)?
4. 未来 30 天我具体该干什么?

别给我职业鸡汤。该说"你现在不适合"就直接说。`;

// FDE = Echo + Delta. 缺任一半都不是 FDE。
const HALVES = [
  {
    axis: "Echo",
    color: "var(--echo)",
    title: "摸出真需求",
    line: "进真实现场,主动推翻老板/甲方的表面需求。",
    detail:
      "分清「谁拍板」≠「谁在用」,价值证据去一线找。按需求文档拆解、承接甲方需求、为签单顺着老板走 —— 那是甲方式/销售式洞察,方向相反,不是 Echo。",
    only: "只会 Echo = 咨询 / 甲方",
  },
  {
    axis: "Delta",
    color: "var(--delta)",
    title: "端到端做出来",
    line: "本人主导,零依赖把能跑的东西做出来。",
    detail:
      "输入 → 处理 → 输出全链路,本人对结果负责。用 Cursor / Claude Code 把端到端做出来是合格 Delta,不是减分项 —— AI-native build 正是这个时代一个人能端到端的核心杠杆。",
    only: "只会 Delta = 工程师",
  },
];

type RouteCard = {
  tag: string;
  name: string;
  backed: string;
  client: string;
  cycle: string;
  risk: string;
};

const ROUTES: RouteCard[] = [
  {
    tag: "平台型",
    name: "大厂 FDE",
    backed: "成熟产品 + 品牌 + 预算 + 工程团队 + 合规",
    client: "中大型企业,有 IT / 采购 / 安全",
    cycle: "进飞书 / 钉钉 / Google / OpenAI / Anthropic,带成熟产品进客户现场",
    risk: "最怕沦为「只会塞产品的卖平台的人」",
  },
  {
    tag: "FDOPC",
    name: "土 FDE",
    backed: "什么都没有,只有你这个人",
    client: "真实中小企业,老板一人说了算",
    cycle: "你自己 = 销售 + 交付 + 售后,靠一个肉眼可见的 demo 打动人",
    risk: "最怕过早平台化 / 沦为低价外包 / 沦为转包中介",
  },
];

type Dim = { label: string; max: number; axis: "E" | "D" | "B" };
const DIMS: Dim[] = [
  { label: "薄切片落地(Echo+Delta 合一)", max: 30, axis: "B" },
  { label: "看穿真需求 Echo", max: 20, axis: "E" },
  { label: "经济账与定价(可辩护 ROI)", max: 15, axis: "E" },
  { label: "现场 Conduct", max: 15, axis: "E" },
  { label: "ToB 真实交付经验", max: 10, axis: "D" },
  { label: "案例与作品", max: 10, axis: "D" },
  { label: "现场入口", max: 10, axis: "E" },
];

const FEATURES = [
  {
    kicker: "01",
    name: "诊断打分",
    desc: "七维锚点,每分挂简历/访谈原文。先判路线,再打分,最后给象限 —— 三者不许互相打架。",
  },
  {
    kicker: "02",
    name: "找 FDE 岗",
    desc: "走大厂线就调 job-pro,直连国内大厂官方 API,搜在招的 FDE / 解决方案 / AI 落地 / 交付岗,绝不凭记忆编岗位。",
  },
  {
    kicker: "03",
    name: "大厂面试参考",
    desc: "decomposition 框架、企业约束(VPC · SSO · HIPAA)、各家 loop —— 投 Palantir / OpenAI / Anthropic / Google 可当实战手册。",
  },
  {
    kicker: "04",
    name: "FDE 全息卡片",
    desc: "一张可晒的诊断结果卡:总分 + 象限 + 招牌战绩 + 七维迷你可视化,球星卡质感。无战绩不编造,诚实就是底牌。",
  },
];

const SIBLINGS = [
  { name: "大厂 JOB", href: "https://job.ha7ch.com", desc: "互联网 / 大厂在招岗位" },
  { name: "在线简历 CV", href: "https://cv.ha7ch.com", desc: "把简历做成活页面,按公司定向" },
];

function AxisTag({ axis }: { axis: "E" | "D" | "B" }) {
  if (axis === "B") {
    return (
      <span className="dim-axis dim-axis-both">
        Echo<span>+</span>Delta
      </span>
    );
  }
  return (
    <span className={axis === "E" ? "dim-axis dim-axis-e" : "dim-axis dim-axis-d"}>
      {axis === "E" ? "Echo" : "Delta"}
    </span>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="page">
      {/* Hero */}
      <div className="brand-row">
        <span className="brand-mark" aria-hidden>
          <span className="dot dot-echo" />
          <span className="dot dot-delta" />
        </span>
        <span className="brand-series">HA7CH PRO 系列</span>
      </div>
      <h1 className="brand">
        FDE <span className="brand-pro">Pro</span>
      </h1>
      <p className="lede">$ Echo + Delta · 缺任一半都不是 FDE</p>
      <p className="tagline">
        上传简历或描述经历,一个<strong>真正驻过场的 FDE</strong> 帮你诚实诊断 ——
        你现在是不是 FDE、缺哪半、该走土 FDE 还是大厂 FDE、未来 30 天该干什么。
        不是 AI 职业鸡汤,不神化 FDE,<strong>敢说「你现在不适合」</strong>。
      </p>

      {/* Prompt Card */}
      <div className="prompt-card">
        <div className="prompt-header">
          <span>复制到 Claude Code / Codex / Cursor</span>
          <button className="copy-btn" onClick={handleCopy}>
            {copied ? "✓ 已复制" : "⧉ 复制"}
          </button>
        </div>
        <div className="prompt-body">{PROMPT}</div>
      </div>

      {/* Echo + Delta 概念 */}
      <p className="section-label">The Core · FDE = Echo + Delta</p>
      <div className="halves-grid">
        {HALVES.map((h) => (
          <div className="half-card" key={h.axis} style={{ ["--axis" as string]: h.color }}>
            <div className="half-head">
              <span className="half-axis">{h.axis}</span>
              <span className="half-title">{h.title}</span>
            </div>
            <p className="half-line">{h.line}</p>
            <p className="half-detail">{h.detail}</p>
            <p className="half-only">{h.only}</p>
          </div>
        ))}
      </div>
      <p className="half-verdict">
        只会谈客户不会做 = 卖 demo 的人。<strong>两半都在,才是 FDE。</strong>
      </p>

      {/* 两条路线 */}
      <p className="section-label">Two Routes · 走土还是走大厂</p>
      <p className="routes-intro">
        区别不在中美、不在能力高低、不在技术栈,只在一个开关:你交付时
        <strong>身后有没有平台 / 品牌 / 预算 / 交付体系</strong>。
      </p>
      <div className="routes-grid">
        {ROUTES.map((r) => (
          <div className="route-card" key={r.name}>
            <div className="route-head">
              <span className="route-name">{r.name}</span>
              <span className="route-tag">{r.tag}</span>
            </div>
            <dl className="route-list">
              <div>
                <dt>身后依托</dt>
                <dd>{r.backed}</dd>
              </div>
              <div>
                <dt>客户</dt>
                <dd>{r.client}</dd>
              </div>
              <div>
                <dt>进场链路</dt>
                <dd>{r.cycle}</dd>
              </div>
              <div>
                <dt>最大风险</dt>
                <dd>{r.risk}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      {/* 功能模块 */}
      <p className="section-label">Modules · 它能为你做什么</p>
      <div className="features-grid">
        {FEATURES.map((f) => (
          <div className="feature-card" key={f.kicker}>
            <span className="feature-kicker">{f.kicker}</span>
            <span className="feature-name">{f.name}</span>
            <p className="feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* 七维尺子 */}
      <p className="section-label">The Ruler · 七维锚点</p>
      <table className="dim-table">
        <tbody>
          {DIMS.map((d) => (
            <tr key={d.label}>
              <td className="dim-label">{d.label}</td>
              <td className="dim-axis-cell">
                <AxisTag axis={d.axis} />
              </td>
              <td className="dim-max">/ {d.max}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 底牌 */}
      <p className="section-label">Why Trust It · 底牌</p>
      <p className="bottom-card">
        背后是一个真驻过场的 FDE 的一手判断力 —— 给深圳货代做过提单 PDF → AI 解析、
        跟过一线跟单员、踩过「卖整体系统卖不动」的坑。所以这台诊断器认死理:
        <strong>反平台是生死线、经济账自己算、价值在一线不在拍板主管</strong>。
      </p>

      {/* 怎么用 */}
      <p className="section-label">How · 两种用法</p>
      <div className="how-grid">
        <a className="how-card" href="https://github.com/LAWTED/fde-pro">
          <span className="how-step">A</span>
          <span className="how-body">
            <span className="how-title">在 Claude Code 里触发</span>
            <span className="how-desc">装好 skill 后直接说「帮我看看我适不适合做 FDE」</span>
          </span>
        </a>
        <a className="how-card" href="https://github.com/LAWTED/fde-pro">
          <span className="how-step">B</span>
          <span className="how-body">
            <span className="how-title">小红书 SkillHub 搜 fde-pro</span>
            <span className="how-desc">已上线、原创,搜索 fde-pro 即可体验</span>
          </span>
        </a>
      </div>

      {/* CTA */}
      <div className="cta">
        <a className="cta-primary" href="https://github.com/LAWTED/fde-pro">
          在小红书 SkillHub 体验
        </a>
        <a className="cta-secondary" href="https://github.com/LAWTED/fde-pro">
          看 GitHub ↗
        </a>
      </div>

      {/* Siblings */}
      <p className="section-label">同系列</p>
      <div className="siblings">
        {SIBLINGS.map((s) => (
          <a className="sibling" key={s.href} href={s.href}>
            <span>
              <span className="sibling-name">{s.name}</span>
              <span className="sibling-desc">{s.desc}</span>
            </span>
            <span className="sibling-arrow">↗</span>
          </a>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <a href="https://github.com/LAWTED/fde-pro">GitHub</a>
        <span style={{ margin: "0 0.5rem" }}>&middot;</span>
        <a href="https://fde.ha7ch.com">fde.ha7ch.com</a>
        <span style={{ margin: "0 0.5rem" }}>&middot;</span>
        <a href="https://ha7ch.com">ha7ch.com</a>
      </footer>
    </main>
  );
}
