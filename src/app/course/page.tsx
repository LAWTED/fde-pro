"use client";

/* ============================================================
   /course · FDE 讲座全屏 slide deck
   讲者: Lawted (Mingze Wu) · HA7CH · 深圳大学
   形式蓝本: English of Design / Presentation 1 (slides.html)
   内核: fde-pro/SKILL.md (FDE = Echo + Delta, 缺一半都不是)

   交互: 键盘 ← → ↑ ↓ / 空格翻页, 数字键跳页, Home/End,
        点击屏幕下一页, 触摸左右滑动, 右上页码 + 可点圆点。
   样式: course.css, 全部 scoped 在 .course-root / .deck 容器内。
        不碰 globals.css / page.tsx / c/。

   ============================================================
   待讲者下周精修的 5 个点 (全部用页面可见 .todo 占位 + 本注释双标, 别编死):
   {{待定制·1 核心takeaway}}   → S04 主定理 & S18 收尾金句
   {{待定制·2 故事vs方法论比例}} → S04 (偏方法论则放慢) / 当前初稿约故事60% 方法40%
   {{待定制·3 听众背景与行动}}   → S16 第一步 (暑假找现场 / 扫码诊断 / 加群)
   {{待定制·4 非名校能否做FDE}}  → S07 机会论 & S14 三张牌 的基调松紧
   {{待定制·5 时长/形式/现场demo/金句}} → S08 后 demo 占位 + S01/S18 金句
   ============================================================ */

import { useCallback, useEffect, useRef, useState } from "react";
import "./course.css";

const TOTAL = 18;

function pad(n: number) {
  return (n < 10 ? "0" : "") + n;
}

export default function CoursePage() {
  const [current, setCurrent] = useState(0);
  const touch = useRef({ x: 0, y: 0 });

  const show = useCallback((n: number) => {
    setCurrent(((n % TOTAL) + TOTAL) % TOTAL);
  }, []);
  const next = useCallback(() => setCurrent((c) => (c + 1) % TOTAL), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + TOTAL) % TOTAL), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (k === "ArrowRight" || k === "ArrowDown" || k === " " || k === "Spacebar") {
        e.preventDefault();
        next();
      } else if (k === "ArrowLeft" || k === "ArrowUp") {
        e.preventDefault();
        prev();
      } else if (k === "Home") {
        e.preventDefault();
        show(0);
      } else if (k === "End") {
        e.preventDefault();
        show(TOTAL - 1);
      } else if (/^[1-9]$/.test(k)) {
        const idx = parseInt(k, 10) - 1;
        if (idx < TOTAL) {
          e.preventDefault();
          show(idx);
        }
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      touch.current = { x: t.clientX, y: t.clientY };
    };
    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      const dx = t.clientX - touch.current.x;
      const dy = t.clientY - touch.current.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) next();
        else prev();
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [next, prev, show]);

  const slides: React.ReactNode[] = [
    /* ---- S01 · 冷开场 (HOOK-B 故事悬念) ---- */
    <div className="col" key="s01">
      <div className="head">
        <div className="eyebrow stagger">深圳大学 · FDE 讲座</div>
        <h1 className="title big stagger">
          2026 年 3 月，深圳一间货代公司。
        </h1>
        <p className="sub stagger">
          我把一张真实提单 PDF，拖进了我自己做的那个东西。它当场把那张纸，变成了一行行结构化字段。坐我旁边那个跟单的姐姐，盯着屏幕看了三秒——然后脱口而出一句话。
        </p>
        <div className="todo stagger">
          <b>{`{{待定制·5 金句/形式}}`}</b>
          <span>讲者本人定开场用哪个 hook（故事冷开场 / 反噱头 / 对赌提问），以及要不要现场真机拖一张提单 PDF 演示。</span>
        </div>
      </div>
    </div>,

    /* ---- S02 · 一线那句话 (整屏大字) ---- */
    <div className="col center" key="s02">
      <div className="head">
        <h1 className="title big stagger">「这个，绝对能帮到我们。」</h1>
        <p className="sub stagger">
          那一刻我才真懂：FDE 不是一个 title。它的满分，由一线那张嘴判，不由我的代码判。
        </p>
      </div>
    </div>,

    /* ---- S03 · 我是谁 (主动降维, 撞名校焦虑) ---- */
    <div className="col" key="s03">
      <div className="head">
        <div className="eyebrow stagger">先把话说在前面</div>
        <h1 className="title stagger">一个“不够格”的本科生</h1>
        <p className="sub stagger">
          Queen Mary 电信工程本科 → 阿里 / Minimax / 腾讯前端实习 → 2026 秋
          Harvard 设计工程硕士（MDE）。
        </p>
      </div>
      <ul className="points">
        <li className="stagger">
          <span className="lead">我不是 CS 科班大神。</span>
          <span className="dim">
            {" "}
            我做那个货代项目的时候，和你们现在没区别——没团队、没预算、没人告诉我提单长什么样。我就是带着一个 Claude Code 账号，坐进了那间办公室。
          </span>
        </li>
        <li className="stagger">
          <span className="lead">你们缺的不是我这张文凭。</span>
          <span className="dim"> 是还没坐进那间办公室。</span>
        </li>
      </ul>
    </div>,

    /* ---- S04 · 主定理 FDE = Echo + Delta (全场最重要的一页) ---- */
    <div className="col" key="s04">
      <div className="head">
        <h1 className="title stagger">FDE = Echo + Delta（缺任何一半，都不是 FDE）</h1>
        <p className="sub stagger">
          Forward Deployed Engineer。判断一个新词是不是噱头，就一个办法：拆得开吗？FDE 拆开就两件事——这是今天唯一需要你记住的公式。
        </p>
      </div>
      <div className="two">
        <div className="cell stagger">
          <h3>Echo · 摸真需求</h3>
          <p>
            进真实现场，摸出真需求，
            <span className="accent">敢当面对老板说“你要的不是这个”</span>
            。“我要 AI 全自动”是陷阱。还要分清：谁拍板 ≠ 谁在用。
          </p>
        </div>
        <div className="cell stagger">
          <h3>Delta · 端到端做出来</h3>
          <p>
            你一个人，从输入到输出，
            <span className="accent">把能跑的东西端到端做出来</span>
            。用 Cursor / Claude Code 做出来，是合格的 Delta，不是减分项。
          </p>
        </div>
      </div>
      <p className="quote stagger">
        只会 Echo，你是咨询师；只会 Delta，你做的是别人喂的错需求；只会上台讲、东西跑不起来，你是卖 demo 的人。三种都不是 FDE。
      </p>
      <div className="todo stagger">
        <b>{`{{待定制·1 核心takeaway · 2 故事vs方法论比例}}`}</b>
        <span>
          若讲者想偏方法论：这页放慢、停顿提问；若想偏故事：可压成一句话 + 一张图。本场唯一想让学生带走的那句话也可锁在这里。
        </span>
      </div>
    </div>,

    /* ---- S05 · 拆 Echo ---- */
    <div className="col" key="s05">
      <div className="head">
        <div className="eyebrow stagger">拆开第一半 · Echo</div>
        <h1 className="title stagger">Echo 不是“懂行业”，是敢说“老板，你要的不对”</h1>
        <p className="sub stagger">
          大多数人以为摸需求 = 把甲方说的话记下来拆成功能。那是甲方式洞察，方向正好反了。
        </p>
      </div>
      <ul className="points">
        <li className="stagger">
          <span className="lead">假需求陷阱：</span>
          <span className="dim">
            {" "}
            老板第一句几乎都是“我要 AI 把所有事自动化”。真 FDE 接下来问的是——哪个环节最痛？谁每天在做？做错了谁挨骂？
          </span>
        </li>
        <li className="stagger">
          <span className="lead">谁拍板 ≠ 谁在用：</span>
          <span className="dim">
            {" "}
            主管说“这工具我一天就用一小时，没啥用”——别信。真正被解放的是一线高频用户，价值证据去工位旁边找。
          </span>
        </li>
        <li className="stagger">
          <span className="dim">
            我在货代公司，老板想要的是“整体换一套 AI+ERP”；和一线坐了几天才发现，他们真正的痛只是“手敲提单太慢、错一单要被追责”。老板要的，和一线痛的，根本不是一回事。
          </span>
        </li>
      </ul>
    </div>,

    /* ---- S06 · 拆 Delta ---- */
    <div className="col" key="s06">
      <div className="head">
        <div className="eyebrow stagger">拆开第二半 · Delta</div>
        <h1 className="title stagger">Delta 不是“会写代码”，是“今天就能跑给你看”</h1>
        <p className="sub stagger">
          不是规划中、不是 PPT、不是“我出方案让外包做”。是现在、当场、能演示。
        </p>
      </div>
      <ul className="points">
        <li className="stagger">
          <span className="lead">端到端：</span>
          <span className="dim">
            {" "}
            真实输入（真单据，不是 toy）→ 处理 → 看得见的输出，全程你自己主导。
          </span>
        </li>
        <li className="stagger">
          <span className="lead">把 build 甩给外包，正是 FDE 要灭掉的甲方习惯。</span>
          <span className="dim">
            {" "}
            “我负责需求，他们负责实现”这句话一出口，你就退回甲方了。
          </span>
        </li>
        <li className="stagger">
          <span className="lead">你们比很多大厂工程师更有 Delta 优势：</span>
          <span className="dim">
            {" "}
            你们是 AI 原生的，一个人一个周末就能把一条链路跑通。这在三年前要一个小团队。
          </span>
        </li>
      </ul>
    </div>,

    /* ---- S07 · 机会论 (撞"我的机会在哪") ---- */
    <div className="col" key="s07">
      <div className="head">
        <h1 className="title stagger">
          AI 时代最稀缺的，不是会写代码的人，是“一个人吃下整条链路”的人
        </h1>
        <p className="sub stagger">
          以前“发现问题 → 设计 → 开发 → 交付”是一条流水线、要一队人；AI 把这条流水线压进了一个人身上。
        </p>
      </div>
      <ul className="points">
        <li className="stagger">
          <span className="lead">代码越来越不值钱，</span>
          <span className="dim"> “知道一线那个人真正卡在哪”越来越值钱。而你们离一线，比大厂工程师近得多。</span>
        </li>
        <li className="stagger">
          <span className="dim">不灌鸡汤的一句：机会 ≠ 容易。机会 = 门口没人排队、你恰好能进去；进去之后能不能交付，还是看 Echo + Delta。</span>
        </li>
      </ul>
      <p className="quote stagger">
        大厂工程师手里有最好的锤子，却找不到钉子；你们钉子满地都是（身边的小老板），只是还没弯下腰去捡。
      </p>
      <div className="todo stagger">
        <b>{`{{待定制·4 非名校能否做FDE}}`}</b>
        <span>讲者本人定调：“普通院校反而更适合土 FDE” 还是更克制。此页措辞按最终定调微调。</span>
      </div>
    </div>,

    /* ---- S08 · 满分尺子 (全场高潮, 留白多) ---- */
    <div className="col center" key="s08">
      <div className="head">
        <div className="eyebrow stagger">满分尺子 · 全场高潮</div>
        <h1 className="title big stagger">
          怎么知道你做的算不算 FDE？拖一张真实提单 PDF 进去。
        </h1>
        <p className="sub stagger">
          当场解析成结构化字段（哪怕有错、有缺），让一线脱口而出“这能帮到我们”。四个关键词缺一不可：薄切片 · 真实单据 · 当场可验 · 有真实一线（外部）用户。
        </p>
        <div className="todo stagger">
          <b>{`{{待定制·3+5 现场 demo}}`}</b>
          <span>讲者决定要不要真的现场拖一个 PDF 演示。要 demo → 这页后插一页放实拍；不 demo → 用静态截图。</span>
        </div>
      </div>
    </div>,

    /* ---- S09 · 土 vs 大厂 (撞"和找工作的关系") ---- */
    <div className="col" key="s09">
      <div className="head">
        <h1 className="title stagger">两条路都叫 FDE，区别只有一个开关：你身后有没有平台</h1>
        <p className="sub stagger">
          不是中美之分、不是能力高低、不是技术栈——只看你交付时身后有没有平台 / 品牌 / 预算 / 团队。
        </p>
      </div>
      <div className="two">
        <div className="cell stagger">
          <h3>大厂 FDE</h3>
          <p>
            进飞书 / 字节 / Google / OpenAI / Anthropic，带成熟产品进客户现场。身后有品牌、预算、团队。
            <span className="accent">
              {" "}
              入场券 = Echo + 一个被外部一线用过的端到端真实案例（平台是入职后才给你的）。
            </span>
          </p>
        </div>
        <div className="cell stagger">
          <h3>土 FDE</h3>
          <p>
            你自己就是全部——一个人 Echo + Delta，直接对接中小企业小老板。
            <span className="accent"> 没有平台，只有你和一个真实现场。</span>
            我的货代驻场就是土 FDE。
          </p>
        </div>
      </div>
      <p className="quote stagger">
        大厂 FDE 的入场券，不在大厂手里，在你身边那个用 Excel 记单的小老板手里——你先去帮他做一个能跑的东西，那张单据就是你的敲门砖。
      </p>
    </div>,

    /* ---- S10 · 我做了什么 · Delta ---- */
    <div className="col" key="s10">
      <div className="head">
        <div className="eyebrow stagger">我的故事 · Delta</div>
        <h1 className="title stagger">一个人，做了三样东西</h1>
        <p className="sub stagger">
          Web SaaS（给团队用）+ 浏览器扩展（嵌进他们原来的系统）+ CLI（Gemini 批量解析提单 PDF）。零依赖、端到端，全是我一个人用 AI 写出来的——这就是 Delta。
        </p>
      </div>
      <figure className="figure stagger">
        <div className="frame">
          <div className="ph">
            <span>截图占位：驻场工位 / 提单 PDF 解析成结构化字段的界面</span>
          </div>
        </div>
      </figure>
      <div className="todo stagger">
        <b>{`{{待定制·5 现场 demo}}`}</b>
        <span>若要现场 demo，建议插在这页之后：当场拖一张提单 PDF，实时解析。</span>
      </div>
    </div>,

    /* ---- S11 · 踩坑反转 (最诚实的一页, 重点段) ---- */
    <div className="col" key="s11">
      <div className="head">
        <div className="eyebrow stagger">最诚实的一页</div>
        <h1 className="title stagger">我一开始，差点把这事搞砸</h1>
        <p className="sub stagger">
          最初我想卖的是“整套换成 AI + ERP 新系统”。老板礼貌点头，一线抵触，没人真用。
        </p>
      </div>
      <p className="quote stagger">
        撞墙之后我才悟出来：正确打法是做 AI 增量插件 / 数字员工，嵌进他们现有流程，不替换系统。反平台，是生死线。
      </p>
      <ul className="points">
        <li className="stagger">
          <span className="dim">
            FDE 不是来换掉你现在用的东西的，是来给它装一个不打扰它的外挂。卖“整体切换”必死在切换成本和售后上。
          </span>
        </li>
      </ul>
    </div>,

    /* ---- S12 · 三条现场真相 ---- */
    <div className="col" key="s12">
      <div className="head">
        <h1 className="title stagger">现场教我的三件事</h1>
        <p className="sub stagger">这三条，我自己全踩过，尤其第一条。</p>
      </div>
      <ul className="points">
        <li className="stagger">
          <span className="lead">① 不要卖换系统，要做能插进去的增量。</span>
          <span className="dim"> AI 增量插件 / 数字员工，别动他原系统。</span>
        </li>
        <li className="stagger">
          <span className="lead">② 价值在一线高频用户身上，不在拍板的老板。</span>
          <span className="dim"> 老板经常不懂自己厂里到底怎么干活。</span>
        </li>
        <li className="stagger">
          <span className="lead">③ 经济账自己算。</span>
          <span className="dim">
            {" "}
            老板说“能省 10 万”你别信（可能 2 万）。自己用“砍掉的人力工时 × 单位成本 × 10–20%”重算。
          </span>
        </li>
      </ul>
    </div>,

    /* ---- S13 · 数字 + 长尾复利 ---- */
    <div className="col" key="s13">
      <div className="head">
        <h1 className="title stagger">coordinator 提效 80% · 降本 64%</h1>
        <p className="sub stagger">
          但请注意：这两个数字不是老板拍脑袋给的，是我蹲在工位上、拿真实工时一笔笔算出来的——那个跟单姐姐真的每天少干两小时。
        </p>
      </div>
      <div className="stats">
        <div className="stat stagger">
          <div className="n">80%</div>
          <div className="l">coordinator 提效</div>
        </div>
        <div className="stat stagger">
          <div className="n">64%</div>
          <div className="l">降本</div>
        </div>
      </div>
      <p className="quote stagger">
        我把这段经历写到小红书，长成了中国最大的 FDE 频道：3K 粉 · 2K 人社群 · 20K+ 赞藏。下场的复利，比你想象的大。
      </p>
    </div>,

    /* ---- S14 · 为什么普通学生反而适合 (全场论点高点) ---- */
    <div className="col" key="s14">
      <div className="head">
        <h1 className="title stagger">你手里有三张大厂工程师没有的牌</h1>
        <p className="sub stagger">
          为什么我觉得——你，可能比大厂 P7 更适合做土 FDE？听我说完别急着不信。
        </p>
      </div>
      <ul className="points">
        <li className="stagger">
          <span className="lead">① 你有寒暑假。</span>
          <span className="dim"> 一整段不被 KPI 切割的时间，足够你下一个真实现场。大厂工程师没有。</span>
        </li>
        <li className="stagger">
          <span className="lead">② 你是 AI 原生的一代。</span>
          <span className="dim"> Cursor / Claude Code 对你不是新工具，是母语。一个人端到端做东西的门槛，被 AI 砸塌了。</span>
        </li>
        <li className="stagger">
          <span className="lead">③ 你身边就有现场。</span>
          <span className="dim"> 亲戚的厂、楼下的店、同学家的公司——那些天天用 Excel 手工干活的小老板，大厂的人反而进不去。</span>
        </li>
      </ul>
      <div className="todo stagger">
        <b>{`{{待定制·4 非名校基调}}`}</b>
        <span>“分数低只因还没开工，不是因为你不行”——这句的松紧度由讲者最终定。</span>
      </div>
    </div>,

    /* ---- S15 · 诚实泼冷水 (不神化, 守 SKILL 铁律) ---- */
    <div className="col" key="s15">
      <div className="head">
        <h1 className="title stagger">但别误会：光有这三张牌，你还不是 FDE</h1>
        <p className="sub stagger">这是诚实的坏消息，也是最好的好消息——因为这正好是你能补的。</p>
      </div>
      <ul className="check">
        <li className="stagger">没进过现场、没推翻过老板的表面需求 = 缺 Echo。</li>
        <li className="stagger">只会拼 toy、做不出被真人用过的端到端东西 = 缺 Delta。</li>
        <li className="stagger">没有一个真实的人因为你做的东西说过“这能帮到我” = 还没到满分尺子。</li>
      </ul>
      <p className="quote stagger">
        我不灌鸡汤——FDE 不是身份，是你做出来的那个被一线认可的薄切片。只想远程写代码、不愿坐到那个人旁边的，这条路不适合你。
      </p>
    </div>,

    /* ---- S16 · 第一步 (行动) ---- */
    <div className="col" key="s16">
      <div className="head">
        <h1 className="title stagger">这个暑假，你只需要做一件事</h1>
        <p className="sub stagger">
          别记 FDE 这三个字母。记住三步，今晚就能做第一步：
        </p>
      </div>
      <ul className="points">
        <li className="stagger">
          <span className="lead">① 列出身边 3 个还在手工干活的人 / 小生意。</span>
          <span className="dim"> 亲戚的厂、楼下的店、爸妈的公司。</span>
        </li>
        <li className="stagger">
          <span className="lead">② 挑一个，找借口去坐他旁边看半天。</span>
          <span className="dim"> 只看不做，看他最烦哪一张单子。</span>
        </li>
        <li className="stagger">
          <span className="lead">③ 打开 Claude Code，把那张单子做成“拖进去就出结果”的小东西。</span>
          <span className="dim"> 做出来那一刻，你就从“听过 FDE”变成“做过 FDE”。</span>
        </li>
      </ul>
      <div className="todo stagger">
        <b>{`{{待定制·3 听众背景与希望的行动}}`}</b>
        <span>讲者定：希望听众听完具体去做什么——暑假找现场 / 扫码用 fde-pro 诊断自己 / 加社群。三选一或全要。</span>
      </div>
    </div>,

    /* ---- S17 · 工具页 fde-pro (降低门槛, CTA 之一) ---- */
    <div className="col" key="s17">
      <div className="head">
        <h1 className="title stagger">不知道自己够不够格？有把尺子。</h1>
        <p className="sub stagger">
          我做了 fde-pro：一个诚实的 FDE 转型诊断。读你的经历，告诉你现在缺 Echo 还是缺 Delta、该走土路线还是大厂路线。它敢说“你现在不适合”。
        </p>
      </div>
      <ul className="points">
        <li className="stagger">
          <span className="lead">网页：</span>
          <span className="dim"> fde.ha7ch.com</span>
        </li>
        <li className="stagger">
          <span className="lead">装进 Claude Code：</span>
          <span className="dim"> redskill install fde-pro</span>
        </li>
      </ul>
      <figure className="figure stagger">
        <div className="frame">
          <div className="ph">
            <span>截图占位：fde-card 全息卡（总分 + 象限 + 七维迷你可视化）</span>
          </div>
        </div>
      </figure>
    </div>,

    /* ---- S18 · 终极金句 + 诚实收尾 (CTA) ---- */
    <div className="col center" key="s18">
      <div className="head">
        <h1 className="title big stagger">别人嫌脏活，你正好能下场。</h1>
        <p className="sub stagger">
          AI 没有抢走你的工作，它把“一个人端到端做出真东西”这件事，第一次交到了像你这样的普通学生手里。
        </p>
        <p className="sub stagger">
          但说句实话——如果你听完只是觉得“好燃”，回去继续刷题，那 FDE 跟你没关系。这条路只奖励真的下场的人。
        </p>
        <div className="todo stagger">
          <b>{`{{待定制·1 核心takeaway · 5 必放金句}}`}</b>
          <span>
            备选金句：① 别人嫌脏活，你正好能下场。② 代码越来越便宜，离真实问题越近的人越贵。③ 你缺的不是那张文凭，是还没坐进那间办公室。讲者本人锁一句收尾。
          </span>
        </div>
      </div>
    </div>,
  ];

  return (
    <div className="course-root">
      <div className="progress">
        <span aria-hidden="true">
          {pad(current + 1)} / {pad(TOTAL)}
        </span>
        <span className="dots" role="tablist" aria-label="Slides">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={"dot" + (i === current ? " on" : "")}
              aria-label={"Go to slide " + (i + 1)}
              onClick={(e) => {
                e.stopPropagation();
                show(i);
              }}
            />
          ))}
        </span>
      </div>

      <div className="deck">
        {slides.map((s, i) => (
          <section
            key={i}
            className={"slide" + (i === current ? " active" : "")}
            data-i={i}
            onClick={() => next()}
          >
            {s}
          </section>
        ))}
      </div>

      <div className="credit">Lawted · HA7CH · fde.ha7ch.com/course</div>
      <div className="hint">← → 翻页 · 点击下一页</div>
    </div>
  );
}
