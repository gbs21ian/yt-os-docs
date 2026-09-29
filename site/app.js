const state = { docs: [], category: '전체', status: '전체', activeId: null, generatedAt: null };
const $ = (s) => document.querySelector(s);
const el = (tag, cls, html='') => { const n = document.createElement(tag); if (cls) n.className = cls; n.innerHTML = html; return n; };
const escapeHtml = (s='') => String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

function statusClass(status) {
  if (/완료|확정/.test(status)) return 'done';
  if (/진행|설계|작성/.test(status)) return 'active';
  return 'todo';
}
function categories() { return ['전체', ...new Set(state.docs.map(d => d.category))]; }
function statuses() { return ['전체', ...new Set(state.docs.map(d => d.status))]; }
function filteredDocs() { return state.docs.filter(d => (state.category === '전체' || d.category === state.category) && (state.status === '전체' || d.status === state.status)); }

function renderFilters() {
  const render = (root, items, key) => {
    root.innerHTML = '';
    items.forEach(item => {
      const count = item === '전체' ? state.docs.length : state.docs.filter(d => d[key] === item).length;
      const b = el('button', `filter-btn ${state[key] === item ? 'active' : ''}`, `<span>${escapeHtml(item)}</span><span class="count">${count}</span>`);
      b.onclick = () => { state[key] = item; renderAll(); };
      root.appendChild(b);
    });
  };
  render($('#categoryFilters'), categories(), 'category');
  render($('#statusFilters'), statuses(), 'status');
}

function docCard(d) {
  const b = el('button', 'doc-card');
  b.innerHTML = `<div class="card-top"><span class="category">${escapeHtml(d.category)}</span><span class="badge ${statusClass(d.status)}">${escapeHtml(d.status)}</span></div>
    <h3>${escapeHtml(d.title)}</h3><p>${escapeHtml(d.summary || '요약 없음')}</p>
    <div class="card-foot"><span>${escapeHtml(d.updated)}</span>${d.tags.slice(0,2).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>`;
  b.onclick = () => openDoc(d.id);
  return b;
}

function renderOverview() {
  const docs = filteredDocs();
  const completed = state.docs.filter(d => /완료|확정/.test(d.status)).length;
  const active = state.docs.filter(d => /진행|설계|작성/.test(d.status)).length;
  const todo = state.docs.length - completed - active;
  const root = $('#overview');
  root.innerHTML = `<div class="hero"><span class="eyebrow">Creator workspace knowledge base</span><h1>YT OS의 생각과 결정을 한 곳에서.</h1><p>기획, 개발 명세, 편집기 설계, 로드맵을 한 화면에서 확인합니다. <code>docs/</code> 폴더에 문서를 추가하면 다음 배포 빌드에서 자동으로 인덱싱됩니다.</p></div>
  <div class="stat-row">
    <div class="stat"><span>전체 문서</span><strong>${state.docs.length}</strong></div>
    <div class="stat"><span>완료/확정</span><strong>${completed}</strong></div>
    <div class="stat"><span>진행 중</span><strong>${active}</strong></div>
    <div class="stat"><span>다음 작업 대기</span><strong>${todo}</strong></div>
  </div>
  <div class="section-head"><h2>문서</h2><span>${docs.length}개 표시 중</span></div>
  <div class="doc-cards" id="docCards"></div>`;
  const cards = $('#docCards');
  if (!docs.length) cards.innerHTML = '<div class="empty">현재 필터에 맞는 문서가 없습니다.</div>';
  docs.forEach(d => cards.appendChild(docCard(d)));
}

function renderRightRail() {
  const tasks = state.docs.filter(d => d.nextAction).slice(0, 6);
  const completed = state.docs.filter(d => /완료|확정/.test(d.status)).length;
  const pct = state.docs.length ? Math.round(completed / state.docs.length * 100) : 0;
  $('#rightRail').innerHTML = `<div class="rail-section"><h3>Project progress</h3><div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div><div class="progress-meta"><span>${completed}/${state.docs.length} 문서 확정</span><strong>${pct}%</strong></div></div>
    <div class="rail-section"><h3>Next actions</h3>${tasks.map(d => `<div class="next-card"><strong>${escapeHtml(d.title)}</strong><p>${escapeHtml(d.nextAction)}</p></div>`).join('') || '<div class="empty">등록된 다음 작업이 없습니다.</div>'}</div>
    <div class="rail-section"><h3>자동 업데이트 규칙</h3><div class="next-card"><p><code>docs/*.md</code> 추가 또는 수정 → Git push → Cloudflare Pages 재빌드 → 문서 허브 갱신</p></div></div>`;
}

function renderAll() {
  renderFilters();
  renderOverview();
  renderRightRail();
  $('#docCount').textContent = `${state.docs.length} documents`;
}

function openDoc(id, push=true) {
  const d = state.docs.find(x => x.id === id); if (!d) return;
  state.activeId = id;
  $('#overview').classList.add('hidden');
  $('#docView').classList.remove('hidden');
  $('#breadcrumbTitle').textContent = d.title;
  $('#docView').innerHTML = `<div class="doc-head"><div class="doc-meta"><span class="category">${escapeHtml(d.category)}</span><span class="badge ${statusClass(d.status)}">${escapeHtml(d.status)}</span><span>${escapeHtml(d.updated)}</span>${d.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div><h1>${escapeHtml(d.title)}</h1><div class="summary">${escapeHtml(d.summary)}</div></div><div class="markdown-body">${d.html}</div>`;
  if (push) history.pushState({id}, '', `#${encodeURIComponent(id)}`);
  window.scrollTo({top:0, behavior:'smooth'});
  $('#sidebar').classList.remove('open');
}

function showOverview(push=true) {
  state.activeId = null;
  $('#docView').classList.add('hidden');
  $('#overview').classList.remove('hidden');
  $('#breadcrumbTitle').textContent = '문서 허브';
  if (push) history.pushState({}, '', location.pathname);
  window.scrollTo({top:0, behavior:'smooth'});
}

function openSearch() {
  $('#searchModal').classList.remove('hidden');
  $('#searchInput').value = '';
  renderSearch('');
  setTimeout(() => $('#searchInput').focus(), 10);
}
function closeSearch() { $('#searchModal').classList.add('hidden'); }
function renderSearch(q) {
  q = q.trim().toLowerCase();
  const matches = state.docs.filter(d => !q || [d.title,d.summary,d.text,d.category,d.tags.join(' ')].join(' ').toLowerCase().includes(q));
  $('#searchResults').innerHTML = '';
  matches.slice(0,12).forEach(d => {
    const b = el('button', 'search-result', `<strong>${escapeHtml(d.title)}</strong><span>${escapeHtml(d.category)} · ${escapeHtml(d.summary)}</span>`);
    b.onclick = () => { closeSearch(); openDoc(d.id); };
    $('#searchResults').appendChild(b);
  });
  if (!matches.length) $('#searchResults').innerHTML = '<div class="empty">검색 결과가 없습니다.</div>';
}

async function init() {
  const res = await fetch('./docs.json', {cache:'no-store'});
  const data = await res.json();
  state.docs = data.docs; state.generatedAt = data.generatedAt;
  const dt = new Date(data.generatedAt);
  $('#buildTime').textContent = `최근 인덱스 ${dt.toLocaleString('ko-KR', {dateStyle:'short', timeStyle:'short'})}`;
  renderAll();
  const id = decodeURIComponent(location.hash.slice(1));
  if (id) openDoc(id, false);
}

$('#showOverview').onclick = () => showOverview();
$('#openSearch').onclick = openSearch;
$('#searchInput').oninput = e => renderSearch(e.target.value);
$('#searchModal').onclick = e => { if (e.target.id === 'searchModal') closeSearch(); };
$('#themeToggle').onclick = () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next; localStorage.setItem('theme', next);
};
$('#openSidebar').onclick = () => $('#sidebar').classList.add('open');
$('#closeSidebar').onclick = () => $('#sidebar').classList.remove('open');
window.onpopstate = () => { const id = decodeURIComponent(location.hash.slice(1)); id ? openDoc(id, false) : showOverview(false); };
document.addEventListener('keydown', e => {
  if (e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) { e.preventDefault(); openSearch(); }
  if (e.key === 'Escape') closeSearch();
});
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
init().catch(err => { document.body.innerHTML = `<pre style="padding:24px">문서 인덱스를 불러오지 못했습니다.\n${escapeHtml(err.message)}</pre>`; });
