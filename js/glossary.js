// 术语卡片渲染模块：详情页内嵌卡片 + 全局术语索引页
import { CONCEPTS } from './concepts.js';
import { MODELS } from './data.js';

function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

const CAT_LABELS = {
  activation: '激活函数', regularization: '正则化', normalization: '归一化',
  attention: '注意力机制', loss: '损失函数', optimization: '优化算法',
  architecture: '网络结构', encoding: '编码/表示', training: '训练策略',
  pooling: '池化', convolution: '卷积', generation: '生成模型',
  detection: '检测', embedding: '嵌入', decoding: '解码',
};

function getModelName(id) {
  const m = MODELS.find(x => x.id === id);
  return m ? m.name : id;
}

function getModelYear(id) {
  const m = MODELS.find(x => x.id === id);
  return m ? m.year : '';
}

function getConceptsForModel(modelId) {
  return CONCEPTS.filter(c =>
    c.originModel === modelId || (c.relatedModels && c.relatedModels.includes(modelId))
  );
}

function renderCardHTML(c, showOrigin) {
  const catLabel = CAT_LABELS[c.category] || c.category;
  const formula = c.formula ? `<div class="cc-formula">$$${c.formula}$$</div>` : '';
  let detailHTML = '';
  if (c.explanation) {
    detailHTML += `<div class="cc-explanation">${c.explanation}</div>`;
  }
  if (c.formulaDetails && c.formulaDetails.length) {
    detailHTML += c.formulaDetails.map(f =>
      `<div class="cc-fd"><span class="cc-fd-label">${esc(f.label)}</span><div class="cc-fd-tex">$$${f.tex}$$</div></div>`
    ).join('');
  }
  const originLink = showOrigin
    ? `<div class="cc-origin">首次引入: <a href="#/model/${esc(c.originModel)}">${esc(getModelName(c.originModel))} (${getModelYear(c.originModel)})</a></div>`
    : '';
  return `<div class="concept-card" data-concept-id="${esc(c.id)}">
    <div class="cc-header">
      <span class="cc-cat">${esc(catLabel)}</span>
      <h3 class="cc-term">${esc(c.term)}</h3>
      ${c.termEn ? `<span class="cc-term-en">${esc(c.termEn)}</span>` : ''}
    </div>
    <p class="cc-summary">${esc(c.summary)}</p>
    ${formula}
    ${originLink}
    <button class="cc-expand">展开详解 ↓</button>
    <div class="cc-detail hidden">${detailHTML}</div>
  </div>`;
}

export function renderConceptCards(modelId) {
  const concepts = getConceptsForModel(modelId);
  if (!concepts.length) return '';
  const cards = concepts.map(c => renderCardHTML(c, c.originModel !== modelId)).join('');
  return `<h2>关键术语解析</h2><div class="concept-cards">${cards}</div>`;
}

export function renderGlossary(focusId) {
  const cats = [...new Set(CONCEPTS.map(c => c.category))];
  const catFilters = cats.map(cat =>
    `<button class="gl-filter" data-cat="${esc(cat)}">${esc(CAT_LABELS[cat] || cat)}</button>`
  ).join('');

  const cards = CONCEPTS.map(c => renderCardHTML(c, true)).join('');

  return `<div class="glossary">
    <a class="back" href="#/">← 返回时间轴</a>
    <header class="gl-header">
      <h1>术语表</h1>
      <p class="gl-sub">AI 领域核心概念与数学原理（共 ${CONCEPTS.length} 个术语）</p>
    </header>
    <div class="glossary-search">
      <input class="glossary-input" type="text" placeholder="搜索术语..." />
      <div class="glossary-filters">
        <button class="gl-filter active" data-cat="all">全部</button>
        ${catFilters}
      </div>
    </div>
    <div class="concept-cards glossary-grid">${cards}</div>
  </div>`;
}
