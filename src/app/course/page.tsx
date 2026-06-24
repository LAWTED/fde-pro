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
   讲者 Lawted 已定稿的 5 个点 (占位全部填实, 不再有 .todo):
   1 核心takeaway → S04 主定理 & S18 收尾金句:
     「未来的程序员都会变成 FDE, 人的 scope 会越来越大;
      高主动性需要主动培养——无论软技能还是硬技能。」
   2 故事 → 货代(Shipform) + 车队 两段亲身 FDE 经历 (S03/S05/S09/S10/S11/S13)
   3 行动 → S16: 鼓励学生都去试一次、做一次 FDE、去体验
   4 基调 → 鼓励下场、降门槛, 但保留诚实 (缺 Echo/Delta 就不是 FDE)
   5 形式 → 不做现场 demo (货代系统不能给大家看), 全部口述描述, 无 live demo 页
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
    <div className="col center" key="s01">
      <div className="head">
        <div className="eyebrow stagger">深圳大学 · FDE 讲座</div>
        <h1 className="title hero stagger">
          2026 年 3 月
          <br />
          深圳，一间货代公司
        </h1>
        <p className="sub stagger">一张提单 PDF，拖进我做的那个东西。</p>
      </div>
    </div>,

    /* ---- S02 · 一线那句话 (整屏大字) ---- */
    <div className="col center" key="s02">
      <div className="head">
        <h1 className="title big stagger">「这个，绝对能帮到我们。」</h1>
        <p className="sub stagger">FDE 的满分，由一线那张嘴判，不由我的代码判。</p>
      </div>
    </div>,

    /* ---- S03 · 我是谁 (主动降维, 撞名校焦虑) ---- */
    <div className="col" key="s03">
      <div className="head">
        <div className="eyebrow stagger">先把话说在前面</div>
        <h1 className="title stagger">一个“不够格”的本科生</h1>
        <p className="sub stagger">
          北邮本科 → 阿里 2 年正式 + 斯坦福 1 年 RA → 2026 秋 Harvard MDE。
        </p>
      </div>
      <ul className="points">
        <li className="stagger">不是 CS 科班大神，做货代时也没团队、没预算。</li>
        <li className="stagger">你们缺的不是文凭，是还没坐进那间办公室。</li>
      </ul>
    </div>,

    /* ---- S04 · 主定理 FDE = Echo + Delta (全场最重要的一页) ---- */
    <div className="col" key="s04">
      <div className="head">
        <h1 className="title stagger">FDE = Echo + Delta</h1>
        <p className="sub stagger">缺任何一半，都不是 FDE。今天唯一要记住的公式。</p>
      </div>
      <div className="two">
        <div className="cell stagger">
          <h3>Echo · 摸真需求</h3>
          <p>进现场，敢当面说“你要的不是这个”。</p>
        </div>
        <div className="cell stagger">
          <h3>Delta · 端到端做出来</h3>
          <p>一个人，从输入到输出，做出能跑的东西。</p>
        </div>
      </div>
      <p className="quote stagger">
        只会 Echo 是咨询师，只会 Delta 是做错需求，只会上台讲是卖 demo。
      </p>
    </div>,

    /* ---- S07 · 机会论 (撞"我的机会在哪") ---- */
    <div className="col" key="s07">
      <div className="head">
        <h1 className="title stagger">最稀缺的，是一个人吃下整条链路的人</h1>
        <p className="sub stagger">
          发现 → 设计 → 开发 → 交付，AI 把这条流水线压进了一个人身上。
        </p>
      </div>
      <p className="quote stagger">
        大厂有最好的锤子却找不到钉子；你们钉子满地，只是还没弯腰去捡。
      </p>
    </div>,

    /* ---- S07b · FDE 是头部大厂正在发生的真实趋势 (PM-as-FDE + 新人 FDE 试练) ---- */
    <div className="col" key="s07b">
      <div className="head">
        <div className="eyebrow stagger">这不是我一个人的判断</div>
        <h1 className="title stagger">头部大厂，已经在这么干了</h1>
        <p className="sub stagger">杭州的 ToB 大厂，正从两头往 FDE 上靠。</p>
      </div>
      <ul className="points">
        <li className="stagger">把 PM 当 FDE 用——推到客户现场摸需求、推交付。</li>
        <li className="stagger">把新人先丢去做一段 FDE 试练。</li>
      </ul>
      <p className="quote stagger">先攒一两段 FDE 经历，就是进大厂实打实的敲门砖。</p>
    </div>,

    /* ---- S08 · 满分尺子 (全场高潮, 留白多) ---- */
    <div className="col center" key="s08">
      <div className="head">
        <div className="eyebrow stagger">满分尺子</div>
        <h1 className="title big stagger">让一线脱口而出“这能帮到我们”</h1>
        <p className="sub stagger">
          薄切片 · 真实单据 · 当场可验 · 真实一线用户——缺一不可。
        </p>
      </div>
    </div>,

    /* ---- S09 · 土 vs 大厂 (撞"和找工作的关系") ---- */
    <div className="col" key="s09">
      <div className="head">
        <h1 className="title stagger">两条路都叫 FDE，只差一个开关</h1>
        <p className="sub stagger">区别只看：你交付时身后有没有平台。</p>
      </div>
      <div className="two">
        <div className="cell stagger">
          <h3>大厂 FDE</h3>
          <p>带成熟产品进现场，身后有品牌、预算、团队。</p>
        </div>
        <div className="cell stagger">
          <h3>土 FDE</h3>
          <p>你自己就是全部，直接对接小老板。我的货代驻场就是。</p>
        </div>
      </div>
      <p className="quote stagger">
        大厂 FDE 的入场券，在你身边那个用 Excel 记单的小老板手里。
      </p>
    </div>,

    /* ---- S10 · 我做了什么 · Delta (口述, 不做现场 demo) ---- */
    <div className="col" key="s10">
      <div className="head">
        <div className="eyebrow stagger">我的故事 · Delta</div>
        <h1 className="title stagger">一个人，做了三样东西</h1>
        <p className="sub stagger">不现场演示——跑的是真实单据，不能给大家看。</p>
      </div>
      <ul className="points">
        <li className="stagger">Web SaaS——上传 PDF 出结构化字段。</li>
        <li className="stagger">浏览器扩展——嵌进原系统，不替换。</li>
        <li className="stagger">CLI——批量解析整批提单。</li>
      </ul>
      <p className="quote stagger">零依赖、端到端，一个人用 AI 写出来——这就是 Delta。</p>
    </div>,

    /* ---- S11 · 踩坑反转 (最诚实的一页, 重点段) ---- */
    <div className="col" key="s11">
      <div className="head">
        <div className="eyebrow stagger">最诚实的一页</div>
        <h1 className="title stagger">我一开始，差点搞砸</h1>
        <p className="sub stagger">想卖“整套换成 AI + ERP”——老板点头，一线抵触，没人真用。</p>
      </div>
      <p className="quote stagger">
        正确打法：做嵌进现有流程的 AI 增量插件，不替换系统。反平台，是生死线。
      </p>
    </div>,

    /* ---- S12 · 三条现场真相 ---- */
    <div className="col" key="s12">
      <div className="head">
        <h1 className="title stagger">现场教我的三件事</h1>
      </div>
      <ul className="points">
        <li className="stagger">不卖换系统，做能插进去的增量。</li>
        <li className="stagger">价值在一线高频用户，不在拍板的老板。</li>
        <li className="stagger">经济账自己算——老板说省 10 万，可能只有 2 万。</li>
      </ul>
    </div>,

    /* ---- S13 · 数字 + 长尾复利 ---- */
    <div className="col" key="s13">
      <div className="head">
        <h1 className="title stagger">coordinator 提效 80% · 降本 64%</h1>
        <p className="sub stagger">不是老板拍脑袋，是我蹲在工位上拿真实工时算出来的。</p>
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
        写到小红书，长成中国最大的 FDE 频道：3K 粉 · 2K 社群 · 20K+ 赞藏。
      </p>
    </div>,

    /* ---- S14 · 第二段经历 · 车队 (FDE 不止货代一个行业, 我还在持续做) ---- */
    <div className="col" key="s14b">
      <div className="head">
        <div className="eyebrow stagger">我的故事 · 第二段，正在进行</div>
        <h1 className="title stagger">现在，我在给一支赛车队做 FDE——不驻场也能做</h1>
        <p className="sub stagger">换个完全不同的行业、换个形态，同一套方法照样成立。</p>
      </div>
      <ul className="points">
        <li className="stagger">没驻场，远程帮他们用飞书搭了个知识库。</li>
        <li className="stagger">酒店后勤、轮胎、赛场天气，各数据源全接进飞书。</li>
        <li className="stagger">公关、车队经理现在直接在飞书里问。</li>
      </ul>
      <p className="quote stagger">
        货代是第一个佐证，赛车队是第二个——换行业、换形态、不驻场，Echo + Delta 这把尺子不变。
      </p>
    </div>,

    /* ---- S15 · 为什么普通学生反而适合 (全场论点高点) ---- */
    <div className="col" key="s14">
      <div className="head">
        <h1 className="title stagger">你手里有三张大厂工程师没有的牌</h1>
        <p className="sub stagger">你，可能比大厂 P7 更适合做土 FDE。</p>
      </div>
      <ul className="points">
        <li className="stagger">你有寒暑假——一整段不被 KPI 切割的时间。</li>
        <li className="stagger">你是 AI 原生一代——Claude Code 是你的母语。</li>
        <li className="stagger">你身边就有现场——大厂的人反而进不去。</li>
      </ul>
      <p className="quote stagger">
        差距常常不是“你不行”，只是你还没开工。
      </p>
    </div>,

    /* ---- S15 · 诚实泼冷水 (不神化, 守 SKILL 铁律) ---- */
    <div className="col" key="s15">
      <div className="head">
        <h1 className="title stagger">但光有这三张牌，你还不是 FDE</h1>
        <p className="sub stagger">坏消息，也是好消息——因为这正好是你能补的。</p>
      </div>
      <ul className="check">
        <li className="stagger">没进过现场 = 缺 Echo。</li>
        <li className="stagger">做不出被真人用过的东西 = 缺 Delta。</li>
        <li className="stagger">没人说过“这能帮到我” = 还没到满分尺子。</li>
      </ul>
    </div>,

    /* ---- S16 · 第一步 (行动) ---- */
    <div className="col" key="s16">
      <div className="head">
        <h1 className="title stagger">这个暑假，只需做一件事</h1>
        <p className="sub stagger">记住三步，今晚就能做第一步。</p>
      </div>
      <ul className="points">
        <li className="stagger">列出身边 3 个还在手工干活的小生意。</li>
        <li className="stagger">挑一个，去坐他旁边看半天，看他最烦哪张单。</li>
        <li className="stagger">用 Claude Code，把那张单做成“拖进去就出结果”。</li>
      </ul>
      <p className="quote stagger">
        我只有一个请求：每个人都去做一次、去体验一次 FDE。
      </p>
    </div>,

    /* ---- S17 · 工具页 fde-pro (降低门槛, CTA 之一) ---- */
    <div className="col" key="s17">
      <div className="head">
        <h1 className="title stagger">不知道够不够格？有把尺子。</h1>
        <p className="sub stagger">
          fde-pro：诚实的 FDE 转型诊断。它敢说“你现在不适合”。
        </p>
      </div>
      <ul className="points">
        <li className="stagger">网页 · fde.ha7ch.com</li>
        <li className="stagger">Claude Code · redskill install fde-pro</li>
      </ul>
      <p className="sub stagger">
        最后给你一张 fde-card：总分 + 象限 + 七维迷你雷达。
      </p>
    </div>,

    /* ---- S18 · 终极金句 + 诚实收尾 (CTA) ---- */
    <div className="col center" key="s18">
      <div className="head">
        <h1 className="title big stagger">别人嫌脏活，你正好能下场。</h1>
        <p className="quote stagger">
          未来的程序员都会变成 FDE，scope 越来越大；高主动性没人发给你，是你自己练出来的。
        </p>
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
