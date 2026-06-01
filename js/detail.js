// 详情视图:概述、模型详解、核心创新、术语卡片、架构图(SVG)、技术规格、影响与局限、参考文献
import { MODELS } from './data.js';
import { renderDiagram, renderLegend } from './diagram.js';
import { renderConceptCards } from './glossary.js';

function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function inlineFormat(text) {
  const parts = text.split(/`([^`]+)`/);
  return parts.map((part, i) => {
    if (i % 2 === 1) return '<span class="md-math">$' + part + '$</span>';
    let s = esc(part);
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    return s;
  }).join('');
}

function renderMarkdown(md) {
  if (!md) return '';
  return md.split('\n').map(line => {
    if (/^### (.+)/.test(line)) return `<h4 class="md-h4">${inlineFormat(line.slice(4))}</h4>`;
    if (/^## (.+)/.test(line)) return `<h3 class="md-h3">${inlineFormat(line.slice(3))}</h3>`;
    if (/^[-*] (.+)/.test(line)) return `<li class="md-li">${inlineFormat(line.slice(2))}</li>`;
    if (/^\d+\. (.+)/.test(line)) return `<li class="md-li md-ol">${inlineFormat(line.replace(/^\d+\. /, ''))}</li>`;
    if (line.trim() === '') return '';
    return `<p class="md-p">${inlineFormat(line)}</p>`;
  }).join('\n');
}

export function renderDetail(id) {
  const m = MODELS.find(x => x.id === id);
  if (!m) {
    return `<div class="detail"><a class="back" href="#/">← 返回时间轴</a>
      <p class="notfound">未找到该模型(id: ${esc(id)})。</p></div>`;
  }

  const sorted = [...MODELS].sort((a, b) => a.year - b.year);
  const idx = sorted.findIndex(x => x.id === id);
  const prev = sorted[idx - 1];
  const next = sorted[idx + 1];

  const innovations = m.innovations.map(item => {
    if (typeof item === 'string') return `<li>${esc(item)}</li>`;
    return `<li><strong>${esc(item.title)}</strong><p class="innov-detail">${esc(item.detail)}</p></li>`;
  }).join('');
  const specs = Object.entries(m.specs)
    .map(([k, v]) => `<div class="spec"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
  const refs = m.references
    .map(r => `<li><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)}</a></li>`).join('');

  let html = `<div class="detail">
    <a class="back" href="#/">← 返回时间轴</a>
    <header class="d-head">
      <span class="d-year">${esc(m.year)}</span>
      <h1>${esc(m.name)}</h1>
      <span class="d-cat">${esc(m.category)}</span>
      <p class="d-tag">${esc(m.tagline)}</p>
    </header>

    <div class="d-grid">
      <section class="d-main">
        <h2>概述</h2>
        <p>${esc(m.overview)}</p>

        ${m.description ? `<h2>模型详解</h2><div class="model-desc">${renderMarkdown(m.description)}</div>` : ''}

        <h2>核心创新</h2>
        <ul class="innov">${innovations}</ul>

        ${renderConceptCards(m.id)}

        <h2>影响</h2>
        <p>${esc(m.impact)}</p>

        <h2>局限</h2>
        <p>${esc(m.limitations)}</p>

        <h2>参考文献</h2>
        <ul class="refs">${refs}</ul>
      </section>

      <aside class="d-side">
        <h2>架构示意</h2>
        <div class="arch-wrap">${renderDiagram(m.architecture)}</div>
        ${renderLegend(m.architecture)}

        <h2>技术规格</h2>
        <dl class="specs">${specs}</dl>
      </aside>
    </div>

    <nav class="d-nav">
      ${prev ? `<a href="#/model/${esc(prev.id)}">← ${esc(prev.year)} ${esc(prev.name)}</a>` : '<span></span>'}
      ${next ? `<a href="#/model/${esc(next.id)}">${esc(next.year)} ${esc(next.name)} →</a>` : '<span></span>'}
    </nav>
  </div>`;
  return html;
}
