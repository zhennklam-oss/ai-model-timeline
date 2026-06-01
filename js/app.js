// 应用入口 + hash 路由
import { renderTimeline, renderSidebar } from './timeline.js';
import { renderDetail } from './detail.js';
import { renderGlossary } from './glossary.js';

const app = document.getElementById('app');

// Sidebar container (lives outside #app, fixed to viewport left)
const sidebarContainer = document.createElement('div');
sidebarContainer.id = 'sidebar-container';
document.body.prepend(sidebarContainer);

function renderMath() {
  if (window.renderMathInElement) {
    renderMathInElement(app, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }], throwOnError: false });
  }
}

function getCurrentCat() {
  const hash = location.hash || '#/';
  const catMatch = hash.match(/^#\/category\/(.+)$/);
  return catMatch ? decodeURIComponent(catMatch[1]) : 'all';
}

function updateSidebar() {
  const hash = location.hash || '#/';
  const isTimeline = !hash.match(/^#\/model\//) && !hash.match(/^#\/glossary/);
  sidebarContainer.innerHTML = renderSidebar(getCurrentCat());
  if (!isTimeline) {
    sidebarContainer.querySelector('.sidebar')?.classList.add('collapsed');
    document.body.classList.remove('sidebar-open');
  } else {
    document.body.classList.add('sidebar-open');
  }
  bindSidebarEvents();
}

function bindSidebarEvents() {
  const sidebar = document.getElementById('sidebar');
  const closeBtn = document.getElementById('sidebar-close');
  const openBtn = document.getElementById('sidebar-open');
  if (closeBtn) {
    closeBtn.onclick = () => {
      sidebar.classList.add('collapsed');
      document.body.classList.remove('sidebar-open');
    };
  }
  if (openBtn) {
    openBtn.onclick = () => {
      sidebar.classList.remove('collapsed');
      document.body.classList.add('sidebar-open');
    };
  }
}

function route() {
  const hash = location.hash || '#/';
  const modelMatch = hash.match(/^#\/model\/(.+)$/);
  const catMatch = hash.match(/^#\/category\/(.+)$/);
  const glossaryMatch = hash.match(/^#\/glossary(?:\/(.+))?$/);
  if (modelMatch) {
    app.innerHTML = renderDetail(decodeURIComponent(modelMatch[1]));
  } else if (glossaryMatch) {
    app.innerHTML = renderGlossary(glossaryMatch[1] ? decodeURIComponent(glossaryMatch[1]) : null);
  } else if (catMatch) {
    app.innerHTML = renderTimeline(decodeURIComponent(catMatch[1]));
  } else {
    app.innerHTML = renderTimeline('all');
  }
  updateSidebar();
  window.scrollTo(0, 0);
  renderMath();
}

app.addEventListener('click', (e) => {
  const btn = e.target.closest('.cc-expand');
  if (btn) {
    const card = btn.closest('.concept-card');
    const detail = card.querySelector('.cc-detail');
    detail.classList.toggle('hidden');
    btn.textContent = detail.classList.contains('hidden') ? '展开详解 ↓' : '收起 ↑';
    if (!detail.classList.contains('hidden')) renderMath();
  }
  const filter = e.target.closest('.gl-filter');
  if (filter) {
    const cat = filter.dataset.cat;
    document.querySelectorAll('.gl-filter').forEach(f => f.classList.remove('active'));
    filter.classList.add('active');
    document.querySelectorAll('.concept-card').forEach(card => {
      card.style.display = (cat === 'all' || card.querySelector('.cc-cat')?.textContent === (filter.textContent)) ? '' : 'none';
    });
  }
});

app.addEventListener('input', (e) => {
  if (e.target.classList.contains('glossary-input')) {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.concept-card').forEach(card => {
      const text = (card.querySelector('.cc-term')?.textContent || '') + (card.querySelector('.cc-term-en')?.textContent || '');
      card.style.display = text.toLowerCase().includes(q) ? '' : 'none';
    });
  }
});

window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', route);
route();
