// 数据驱动的 SVG 架构图渲染器
// 支持线性堆叠、虚线分组、跳跃连接（⊕合并）、并行分支

const KIND_COLORS = {
  io:      { fill: '#e2e8f0', stroke: '#64748b', text: '#1e293b' },
  conv:    { fill: '#dbeafe', stroke: '#2563eb', text: '#1e3a8a' },
  pool:    { fill: '#cffafe', stroke: '#0891b2', text: '#155e75' },
  norm:    { fill: '#f1f5f9', stroke: '#94a3b8', text: '#334155' },
  attn:    { fill: '#ede9fe', stroke: '#7c3aed', text: '#5b21b6' },
  ffn:     { fill: '#ccfbf1', stroke: '#0d9488', text: '#115e59' },
  embed:   { fill: '#fef3c7', stroke: '#d97706', text: '#92400e' },
  recur:   { fill: '#ffedd5', stroke: '#ea580c', text: '#9a3412' },
  special: { fill: '#fce7f3', stroke: '#db2777', text: '#9d174d' },
};

const KIND_LABELS = {
  io: '输入/输出', conv: '卷积', pool: '池化', norm: '归一化/残差',
  attn: '注意力', ffn: '前馈', embed: '嵌入', recur: '循环', special: '复合/特殊',
};

function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

const W = 420, GAP = 26, PAD = 28;
const BLOCK_W = 280;
const SKIP_X = PAD + BLOCK_W + 40;
const MERGE_R = 11;
const GROUP_PAD = 10;
function blockH(b) { return b.sublabel ? 60 : 46; }
function blockX() { return (W - BLOCK_W) / 2 - 10; }
function blockCX() { return blockX() + BLOCK_W / 2; }

function computePositions(blocks) {
  const positions = [];
  let y = PAD;
  for (let i = 0; i < blocks.length; i++) {
    positions.push(y);
    y += blockH(blocks[i]) + GAP;
  }
  return positions;
}

function drawArrow(svg, x1, y1, x2, y2) {
  return svg + `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#94a3b8" stroke-width="1.8" marker-end="url(#arrowM)"/>`;
}

function formatSublabel(text, cx, y, baseColor) {
  const tokens = text.match(/[\d.]+[²³]?|[×→·+=/\\|]+|[,，:：\s]+|[A-Za-z_]+|[^\x00-\x7F]+/g) || [text];
  let tspans = '';
  for (const tok of tokens) {
    if (/^[×→·+=\\/|]+$/.test(tok)) {
      tspans += `<tspan fill="${baseColor}" opacity="0.45" font-weight="400"> ${esc(tok)} </tspan>`;
    } else if (/^[\d.]+[²³]?$/.test(tok)) {
      tspans += `<tspan font-family="'JetBrains Mono','Fira Code',monospace" font-weight="700" fill="${baseColor}">${esc(tok)}</tspan>`;
    } else if (/^[,，:：\s]+$/.test(tok)) {
      tspans += `<tspan fill="${baseColor}" opacity="0.6">${esc(tok)}</tspan>`;
    } else {
      tspans += `<tspan fill="${baseColor}" opacity="0.85">${esc(tok)}</tspan>`;
    }
  }
  const fontSize = text.length > 28 ? 9.5 : 10.5;
  return `<text x="${cx}" y="${y}" text-anchor="middle" font-size="${fontSize}">${tspans}</text>`;
}

function drawBlock(b, yPos) {
  const c = KIND_COLORS[b.kind] || KIND_COLORS.io;
  const bx = blockX();
  const h = blockH(b);
  const labelSize = (b.label && b.label.length > 22) ? 12 : 13.5;
  let s = `<g>`;
  s += `<rect x="${bx}" y="${yPos}" width="${BLOCK_W}" height="${h}" rx="8" fill="${c.fill}" stroke="${c.stroke}" stroke-width="1.8"/>`;
  s += `<text x="${blockCX()}" y="${yPos + (b.sublabel ? 24 : h / 2 + 5)}" text-anchor="middle" fill="${c.text}" font-size="${labelSize}" font-weight="600">${esc(b.label)}</text>`;
  if (b.sublabel) {
    s += formatSublabel(b.sublabel, blockCX(), yPos + 43, c.text);
  }
  if (b.repeat) {
    const rx = bx + BLOCK_W + 6;
    const ry = yPos + h / 2 - 10;
    s += `<rect x="${rx}" y="${ry}" width="38" height="20" rx="5" fill="${c.stroke}" opacity="0.9"/>`;
    s += `<text x="${rx + 19}" y="${ry + 14}" text-anchor="middle" fill="#fff" font-size="10.5" font-weight="700">${esc(b.repeat)}</text>`;
  }
  s += `</g>`;
  return s;
}

function drawGroup(yStart, yEnd, hEnd, label, repeat) {
  const gx = blockX() - GROUP_PAD;
  const gy = yStart - GROUP_PAD;
  const gw = BLOCK_W + GROUP_PAD * 2;
  const gh = (yEnd + hEnd) - yStart + GROUP_PAD * 2;
  let s = `<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="10" fill="rgba(99,102,241,0.03)" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="6 4" fill-opacity="0.5"/>`;
  if (label) {
    s += `<text x="${gx + 8}" y="${gy - 5}" fill="#6366f1" font-size="10.5" font-weight="600">${esc(label)}</text>`;
  }
  if (repeat) {
    s += `<rect x="${gx + gw - 42}" y="${gy - 14}" width="42" height="18" rx="4" fill="#6366f1"/>`;
    s += `<text x="${gx + gw - 21}" y="${gy - 1}" text-anchor="middle" fill="#fff" font-size="10" font-weight="700">${esc(repeat)}</text>`;
  }
  return s;
}

function drawSkipConnection(fromY, fromH, toY, toH, label, merge) {
  const sx = blockX() + BLOCK_W + 8;
  const ex = SKIP_X;
  const startY = fromY + fromH / 2;
  const endY = toY + toH / 2;
  const r = 8;
  let s = `<path d="M${sx},${startY} L${ex - r},${startY} Q${ex},${startY} ${ex},${startY + r} L${ex},${endY - r} Q${ex},${endY} ${ex - r},${endY} L${sx + 20},${endY}" fill="none" stroke="#6366f1" stroke-width="1.8" stroke-dasharray="5 3"/>`;
  if (label) {
    const midY = (startY + endY) / 2;
    s += `<text x="${ex + 8}" y="${midY + 4}" fill="#6366f1" font-size="11" font-weight="600">${esc(label)}</text>`;
  }
  if (merge === 'add') {
    s += `<circle cx="${sx + 10}" cy="${endY}" r="${MERGE_R}" fill="#fff" stroke="#6366f1" stroke-width="1.8"/>`;
    s += `<text x="${sx + 10}" y="${endY + 5}" text-anchor="middle" fill="#6366f1" font-size="14" font-weight="700">+</text>`;
  } else if (merge === 'concat') {
    s += `<circle cx="${sx + 10}" cy="${endY}" r="${MERGE_R}" fill="#fff" stroke="#0d9488" stroke-width="1.8"/>`;
    s += `<text x="${sx + 10}" y="${endY + 4}" text-anchor="middle" fill="#0d9488" font-size="11" font-weight="700">C</text>`;
  }
  return s;
}

export function renderDiagram(architecture) {
  const blocks = architecture.blocks || [];
  const topo = architecture.topology || null;
  const n = blocks.length;
  if (n === 0) return '';

  const positions = computePositions(blocks);
  const lastBlock = blocks[n - 1];
  const H = positions[n - 1] + blockH(lastBlock) + PAD;

  let svg = `<svg viewBox="0 0 ${W} ${H}" class="arch-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="模型架构图">`;
  svg += `<defs>`;
  svg += `<marker id="arrowM" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8"/></marker>`;
  svg += `<marker id="arrowB" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#6366f1"/></marker>`;
  svg += `</defs>`;

  if (topo && topo.groups) {
    for (const g of topo.groups) {
      const [s, e] = g.range;
      svg += drawGroup(positions[s], positions[e], blockH(blocks[e]), g.label, g.repeat);
    }
  }

  const cx = blockCX();
  for (let i = 1; i < n; i++) {
    const yPrev = positions[i - 1] + blockH(blocks[i - 1]);
    const yCur = positions[i];
    svg = drawArrow(svg, cx, yPrev, cx, yCur);
  }

  if (topo && topo.skips) {
    for (const sk of topo.skips) {
      svg += drawSkipConnection(positions[sk.from], blockH(blocks[sk.from]), positions[sk.to], blockH(blocks[sk.to]), sk.label, sk.merge);
    }
  }

  blocks.forEach((b, i) => {
    svg += drawBlock(b, positions[i]);
  });

  svg += `</svg>`;
  return svg;
}

export function renderLegend(architecture) {
  const kinds = [...new Set((architecture.blocks || []).map(b => b.kind))];
  const items = kinds.map(k => {
    const c = KIND_COLORS[k] || KIND_COLORS.io;
    return `<span class="legend-item"><span class="legend-swatch" style="background:${c.fill};border-color:${c.stroke}"></span>${esc(KIND_LABELS[k] || k)}</span>`;
  }).join('');
  return `<div class="legend">${items}</div>`;
}
