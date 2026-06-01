// 多分类时间轴视图:标签页切换 + 沿中轴交替排布节点卡片
import { MODELS } from './data.js';

export const CATEGORIES = [
  { key: 'all',              label: '全部' },
  { key: 'visual-backbone',  label: '图像分类与视觉骨干' },
  { key: 'object-detection', label: '目标检测' },
  { key: 'segmentation',    label: '语义分割' },
  { key: 'image-generation', label: '图像生成' },
  { key: 'video',           label: '视频理解与生成' },
  { key: 'multimodal',      label: '多模态' },
  { key: 'llm',             label: '大语言模型' },
  { key: 'speech-audio',    label: '语音与音频' },
  { key: 'rl-game',         label: '强化学习与博弈' },
  { key: 'ai-science',      label: 'AI for Science' },
];

function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function countModels(key) {
  if (key === 'all') return MODELS.length;
  return MODELS.filter(m => (m.cats || []).includes(key)).length;
}

export function renderTimeline(cat = 'all') {
  const models = cat === 'all'
    ? [...MODELS]
    : MODELS.filter(m => (m.cats || []).includes(cat));
  models.sort((a, b) => a.year - b.year);

  let html = `<header class="hero">
    <h1>AI 模型架构演进时间轴</h1>
  </header>`;

  html += `<div class="tl-layout">`;
  html += `<div class="timeline">`;
  if (models.length === 0) {
    html += `<p class="tl-empty">该分类暂无数据。</p>`;
  }
  models.forEach((m, i) => {
    const side = i % 2 === 0 ? 'left' : 'right';
    html += `<div class="tl-row ${side}">
      <a class="tl-card" href="#/model/${esc(m.id)}">
        <div class="tl-year">${esc(String(m.year))}</div>
        <div class="tl-name">${esc(m.name)}</div>
        <div class="tl-cat">${esc(m.category)}</div>
        <div class="tl-tag">${esc(m.tagline)}</div>
        <span class="tl-more">查看架构与详解 →</span>
      </a>
      <span class="tl-dot" aria-hidden="true"></span>
    </div>`;
  });
  html += `</div>`;
  html += `</div>`; // .tl-layout
  html += `<footer class="page-foot">
    当前共 <strong>${MODELS.length}</strong> 个模型,覆盖 <strong>${CATEGORIES.length - 1}</strong> 个子领域。数据可扩展:在 <code>js/data.js</code> 追加记录即可。
  </footer>`;
  return html;
}

export function renderSidebar(cat = 'all') {
  let html = `<aside class="sidebar" id="sidebar">`;
  html += `<div class="sidebar-header"><span class="sidebar-title">分类目录</span><button class="sidebar-close" id="sidebar-close" aria-label="收起侧栏">&times;</button></div>`;
  html += `<nav class="tabs"><div class="tabs-inner">`;
  for (const c of CATEGORIES) {
    const active = c.key === cat ? ' active' : '';
    const n = countModels(c.key);
    html += `<a class="tab${active}" href="#/category/${esc(c.key)}">
      <span class="tab-label">${esc(c.label)}</span>
      <span class="tab-sub">${n} 项</span>
    </a>`;
  }
  html += `</div></nav>`;
  html += `<div class="sidebar-footer"><a class="sidebar-glossary" href="#/glossary">术语表</a></div>`;
  html += `</aside>`;
  html += `<button class="sidebar-toggle" id="sidebar-open" aria-label="展开侧栏">&#9776;</button>`;
  return html;
}
