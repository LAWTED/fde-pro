import Image from "next/image";

type Row = {
  label?: string;
  title: string;
  desc?: string;
  meta?: string;
  href?: string;
};

// 能力(用列表条目,不用彩卡)
const MODULES: Row[] = [
  {
    label: "01",
    title: "诊断打分",
    desc: "七维锚点,每分挂简历 / 访谈原文。先判路线,再打分,最后给象限 —— 三者不许互相打架。",
  },
  {
    label: "02",
    title: "找 FDE 岗",
    desc: "走大厂线就调 job-pro,直连国内大厂官方 API,搜在招的 FDE / 解决方案 / AI 落地 / 交付岗,绝不凭记忆编岗位。",
  },
  {
    label: "03",
    title: "大厂面试参考",
    desc: "decomposition 框架、企业约束(VPC · SSO · HIPAA)、各家 loop —— 投 Palantir / OpenAI / Anthropic / Google 可当实战手册。",
  },
  {
    label: "04",
    title: "FDE 全息卡片",
    desc: "一张可晒的诊断结果卡:总分 + 象限 + 招牌战绩 + 七维迷你可视化。无战绩不编造,诚实就是底牌。",
  },
];

// 七维尺子
const DIMS: Row[] = [
  { title: "薄切片落地(Echo + Delta 合一)", meta: "/ 30" },
  { title: "看穿真需求 Echo", meta: "/ 20" },
  { title: "经济账与定价(可辩护 ROI)", meta: "/ 15" },
  { title: "现场 Conduct", meta: "/ 15" },
  { title: "ToB 真实交付经验", meta: "/ 10" },
  { title: "案例与作品", meta: "/ 10" },
  { title: "现场入口", meta: "/ 10" },
];

// 链接
const LINKS: Row[] = [
  {
    title: "GitHub",
    desc: "github.com/LAWTED/fde-pro · 源码与 skill",
    meta: "Repo",
    href: "https://github.com/LAWTED/fde-pro",
  },
  {
    title: "小红书 SkillHub",
    desc: "RedSkill 商店,搜索 fde-pro 一键安装",
    meta: "Store",
    href: "https://github.com/LAWTED/fde-pro",
  },
  {
    title: "FDE 卡片示例",
    desc: "fde.ha7ch.com/c/lawted · 全息诊断卡",
    meta: "Card",
    href: "https://fde.ha7ch.com/c/lawted",
  },
];

const UPDATED = "Jun 24, 2026";

function Section({ title, items }: { title: string; items: Row[] }) {
  return (
    <section className="fde-section">
      <h2 className="fde-section-title">{title}</h2>
      <ul className="fde-list">
        {items.map((item) => {
          const inner = (
            <>
              {item.label ? <span className="fde-row-label">{item.label}</span> : null}
              <span className="fde-row-copy">
                <span className="fde-row-title">{item.title}</span>
                {item.desc ? <span className="fde-row-desc">{item.desc}</span> : null}
              </span>
              {item.meta ? <span className="fde-row-meta">{item.meta}</span> : null}
            </>
          );
          const key = item.href ?? item.title;
          return (
            <li key={key}>
              {item.href ? (
                <a
                  className="fde-row"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <div className="fde-row">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function Home() {
  return (
    <main className="fde-home">
      {/* Header — ha7ch logo (black) + wordmark + updated */}
      <header className="fde-head">
        <h1 className="fde-h1">
          <Image
            className="fde-logo"
            src="/ha7ch.svg"
            alt=""
            width={487}
            height={78}
            loading="eager"
            aria-hidden="true"
          />
          <span className="sr-only">
            fde-pro · HA7CH 的 FDE 转型诊断
          </span>
        </h1>
        <span className="fde-wordmark">fde-pro</span>
        <time dateTime="2026-06-24">Updated {UPDATED}</time>
      </header>

      {/* Intro prose — clipped, editorial */}
      <div className="fde-intro">
        <p>
          上传简历或描述经历,一个真正驻过场的 FDE 帮你诚实诊断 ——{" "}
          <strong>敢说你现在不适合。</strong>
        </p>

        <p>
          FDE = <span className="fde-em">Echo</span>(进现场摸真需求、推翻老板的表面需求)
          + <span className="fde-em">Delta</span>(本人零依赖、端到端做出能跑的东西)。
        </p>

        <p>缺一半都不是 FDE:只会 Echo 是咨询,只会 Delta 是工程师。两半都在,才算。</p>

        <p>
          两条路,区别只在身后有没有平台 —— <span className="fde-em">土 FDE</span>:一个人
          = 销售 + 交付 + 售后,对接中小企业老板;<span className="fde-em">大厂 FDE</span>:
          带成熟产品进客户现场(飞书 / 钉钉 / Google / OpenAI / Anthropic)。
        </p>

        <p>不是 AI 职业鸡汤,不神化 FDE。该说不适合就直接说。</p>
      </div>

      {/* 能力 */}
      <Section title="能做什么" items={MODULES} />

      {/* 七维尺子 */}
      <Section title="七维尺子" items={DIMS} />

      {/* 底牌 — single editorial paragraph, no card */}
      <section className="fde-section">
        <h2 className="fde-section-title">底牌</h2>
        <div className="fde-intro">
          <p>
            背后是一个真驻过场的 FDE 的一手判断力 —— 给深圳货代做过提单 PDF → AI 解析、
            跟过一线跟单员、踩过「卖整体系统卖不动」的坑。
          </p>
          <p>
            所以这台诊断器认死理:
            <strong>反平台是生死线、经济账自己算、价值在一线不在拍板主管。</strong>
          </p>
        </div>
      </section>

      {/* 怎么用 — RedSkill 口令 */}
      <section className="fde-section">
        <h2 className="fde-section-title">怎么用</h2>
        <div className="fde-intro">
          <p>在小红书 RedSkill 商店一键安装:</p>
          <div className="fde-command">
            <span className="fde-command-prompt">$</span>
            <code>redskill install fde-pro</code>
          </div>
          <p className="fde-command-note">
            或者:在 Claude Code 里装好后直接说「帮我看看我适不适合做 FDE」触发{" "}
            <span className="fde-code-inline">fde-pro</span>;也可在小红书 SkillHub
            搜索 fde-pro 体验。
          </p>
        </div>
      </section>

      {/* 链接 */}
      <Section title="链接" items={LINKS} />

      {/* Footer */}
      <footer className="fde-footer">
        <a className="fde-link" href="https://github.com/LAWTED/fde-pro" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <span aria-hidden>·</span>
        <a className="fde-link" href="https://fde.ha7ch.com/c/lawted" target="_blank" rel="noopener noreferrer">
          fde.ha7ch.com
        </a>
        <span aria-hidden>·</span>
        <a className="fde-link" href="https://ha7ch.com" target="_blank" rel="noopener noreferrer">
          ha7ch.com
        </a>
      </footer>
    </main>
  );
}
