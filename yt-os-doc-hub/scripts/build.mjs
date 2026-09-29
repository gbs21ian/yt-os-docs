import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const docsDir = path.join(root, 'docs');
const siteDir = path.join(root, 'site');
const distDir = path.join(root, 'dist');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function inline(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}

function slugify(text) {
  return text.toLowerCase().trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function renderMarkdown(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let inCode = false;
  let code = [];
  let inUl = false;
  let inOl = false;
  let inTable = false;
  let tableRows = [];

  const closeLists = () => {
    if (inUl) { out.push('</ul>'); inUl = false; }
    if (inOl) { out.push('</ol>'); inOl = false; }
  };
  const flushTable = () => {
    if (!inTable) return;
    if (tableRows.length) {
      const [head, ...rows] = tableRows;
      out.push('<div class="table-wrap"><table><thead><tr>' + head.map(c => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>');
      for (const row of rows) out.push('<tr>' + row.map(c => `<td>${inline(c)}</td>`).join('') + '</tr>');
      out.push('</tbody></table></div>');
    }
    tableRows = [];
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('```')) {
      closeLists(); flushTable();
      if (!inCode) { inCode = true; code = []; }
      else { out.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`); inCode = false; }
      continue;
    }
    if (inCode) { code.push(line); continue; }

    if (/^\|.*\|\s*$/.test(line)) {
      closeLists();
      const cells = line.trim().slice(1, -1).split('|').map(c => c.trim());
      const next = lines[i + 1] || '';
      if (!inTable) {
        inTable = true;
        tableRows.push(cells);
        if (/^\|(?:\s*:?-+:?\s*\|)+\s*$/.test(next)) i++;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else {
      flushTable();
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      closeLists();
      const level = heading[1].length;
      const title = heading[2].trim();
      out.push(`<h${level} id="${slugify(title)}">${inline(title)}</h${level}>`);
      continue;
    }
    if (/^---+$/.test(line.trim())) { closeLists(); out.push('<hr>'); continue; }
    if (/^>\s?/.test(line)) { closeLists(); out.push(`<blockquote>${inline(line.replace(/^>\s?/, ''))}</blockquote>`); continue; }
    const ul = line.match(/^\s*[-*]\s+(.+)$/);
    if (ul) {
      if (inOl) { out.push('</ol>'); inOl = false; }
      if (!inUl) { out.push('<ul>'); inUl = true; }
      out.push(`<li>${inline(ul[1])}</li>`); continue;
    }
    const ol = line.match(/^\s*\d+\.\s+(.+)$/);
    if (ol) {
      if (inUl) { out.push('</ul>'); inUl = false; }
      if (!inOl) { out.push('<ol>'); inOl = true; }
      out.push(`<li>${inline(ol[1])}</li>`); continue;
    }
    if (!line.trim()) { closeLists(); continue; }
    closeLists();
    out.push(`<p>${inline(line.trim())}</p>`);
  }
  closeLists(); flushTable();
  if (inCode) out.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
  return out.join('\n');
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---\n')) return [{}, raw];
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) return [{}, raw];
  const fm = raw.slice(4, end).split('\n');
  const meta = {};
  for (const row of fm) {
    const idx = row.indexOf(':');
    if (idx < 0) continue;
    const key = row.slice(0, idx).trim();
    let value = row.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    meta[key] = value;
  }
  return [meta, raw.slice(end + 5)];
}

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });
for (const file of walk(siteDir)) {
  const rel = path.relative(siteDir, file);
  const dest = path.join(distDir, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(file, dest);
}

const docs = walk(docsDir)
  .filter((file) => file.endsWith('.md'))
  .map((file) => {
    const raw = fs.readFileSync(file, 'utf8');
    const [meta, body] = parseFrontmatter(raw);
    const stat = fs.statSync(file);
    const titleMatch = body.match(/^#\s+(.+)$/m);
    const id = meta.id || path.relative(docsDir, file).replace(/\\/g, '/').replace(/\.md$/, '');
    return {
      id,
      title: meta.title || titleMatch?.[1] || path.basename(file, '.md'),
      category: meta.category || '기타',
      status: meta.status || '진행 중',
      updated: meta.updated || stat.mtime.toISOString().slice(0, 10),
      order: Number(meta.order || 999),
      summary: meta.summary || '',
      nextAction: meta.nextAction || '',
      tags: (meta.tags || '').split(',').map(v => v.trim()).filter(Boolean),
      source: meta.source || 'project',
      path: path.relative(root, file).replace(/\\/g, '/'),
      text: body.replace(/[#>*`_|\[\]()]/g, ' ').replace(/\s+/g, ' ').trim(),
      html: renderMarkdown(body)
    };
  })
  .sort((a, b) => a.order - b.order || b.updated.localeCompare(a.updated));

fs.writeFileSync(path.join(distDir, 'docs.json'), JSON.stringify({ generatedAt: new Date().toISOString(), docs }, null, 2));
console.log(`Built ${docs.length} docs -> ${distDir}`);
