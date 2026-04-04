import { state, shuf, ri } from '../app.js';
import { wnSaveProblem } from './wrong-note.js';

// --- KaTeX 렌더러 ---
export function rm(el) {
    if (typeof renderMathInElement === 'function') {
        renderMathInElement(el, {
            delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
            throwOnError: false
        });
    }
}

// 수식+텍스트 혼합 렌더링 (QWERTY 및 수식입력기용)
export function renderMixedLatex(text, el) {
    if (!text || !text.trim()) { el.innerHTML = '<span class="mk-ph">수식 미리보기</span>'; return; }
    const tokens = [];
    let rest = text;
    while (rest.length > 0) {
        const m1 = rest.match(/^\$([^$]+)\$/);
        if (m1) { tokens.push({ type: 'latex', v: m1[1] }); rest = rest.slice(m1[0].length); continue; }
        const m2 = rest.match(/^((?:\\[a-zA-Z]+(?:\{[^}]*\}|\[[^\]]*\])*|[^가-힣ㄱ-ㅎㅏ-ㅣ$\n])+)/);
        if (m2 && (/\\[a-zA-Z]/.test(m2[1]) || /[\^_{}]/.test(m2[1]))) { tokens.push({ type: 'latex', v: m2[1] }); rest = rest.slice(m2[0].length); continue; }
        const m3 = rest.match(/^[^$\\]*/);
        if (m3 && m3[0].length > 0) { tokens.push({ type: 'text', v: m3[0] }); rest = rest.slice(m3[0].length); continue; }
        tokens.push({ type: 'text', v: rest[0] }); rest = rest.slice(1);
    }
    el.innerHTML = tokens.map(t => {
        if (t.type === 'latex') {
            try { return katex.renderToString(t.v, { throwOnError: false, displayMode: false }); }
            catch (e) { return `<span>${t.v}</span>`; }
        }
        return t.v.replace(/\n/g, '<br>');
    }).join('');
}

// 입력 상자 업데이트용 (keyboard.js에서 사용)
export function mkUpdate() {
    const val = document.getElementById('mkInput')?.value || "";
    const preview = document.getElementById('mkRendered');
    if (preview) renderMixedLatex(val, preview);
}

export function normalizeKaTeXDisplayText(s) {
    if (!s) return '';
    return String(s).replace(/(^|[^\\])dfrac\s*\{/g, (m, p1) => p1 + '\\dfrac{').replace(/\*/g, '\\cdot ');
}

// --- 카드 제어 로직 ---
export function selCard(idx) {
    state.selIdx = idx;
    document.querySelectorAll('.pcard').forEach((c, i) => c.classList.toggle('sel', i === idx));
    renderRP(idx);
}

export function renderRP(idx) {
    const rp = document.getElementById('rp');
    if (!state.problems[idx]) return;
    const { prob } = state.problems[idx];
    const uid = 'u' + idx;
    if (state.examMode && !state.problems._examDone) {
        rp.innerHTML = '<div class="rp-empty">🔒 시험 제출 후 정답이 공개됩니다.</div>'; return;
    }
    const hints = Array.isArray(prob.hints) ? prob.hints : [];
    rp.innerHTML = `
        <div class="rpl">💡 문제 ${idx + 1} 풀이</div>
        <div class="fl">힌트</div>
        ${hints.map((hi, i) => `<div class="hint-item"><button class="htog" onclick="window.thint('${uid}h${i}',this)">힌트 ${i + 1} <span class="arr">▼</span></button><div class="hbd" id="${uid}h${i}">${normalizeKaTeXDisplayText(hi)}</div></div>`).join('')}
        <div><button class="rvb rva" onclick="window.trev('${uid}-a',this)">정답 확인</button><div class="abox" id="${uid}-a">정답: ${normalizeKaTeXDisplayText(prob.ans)}</div></div>
        <div><button class="rvb rvs" onclick="window.trev('${uid}-s',this)">풀이 보기</button><div class="sbox" id="${uid}-s">${normalizeKaTeXDisplayText(prob.sol)}</div></div>
    `;
    rm(rp);
}

export function mkCard(idx) {
    const { prob, sCh, sCi } = state.problems[idx];
    const card = document.createElement('div');
    card.className = 'pcard';
    const type = (state.examMode || state.mixMode) ? (prob.type.includes('OX형') ? 'OX형' : (sCh && sCh.length ? '객관식' : '단답형')) : state.st.type;

    let h = `<div class="ox"></div><div class="ctop"><div class="cnum">문제 ${idx+1}</div><button class="retry-btn" onclick="window.retry(${idx})">↺ 다시</button><button class="wn-save-btn" onclick="window.wnSaveProblem(${idx})">📕 저장</button></div><div class="card-q">${normalizeKaTeXDisplayText(prob.q)}</div>`;

    if (type === '객관식') {
        h += `<div class="choices">${sCh.map((c, i) => `<div class="cho" data-i="${i}"><span class="cn">${"①②③④⑤"[i]}</span>${normalizeKaTeXDisplayText(c)}</div>`).join('')}</div><div class="crow"><button class="cfm-btn" disabled>확인</button></div>`;
    } else if (type === 'OX형') {
        h += `<div class="ox-btns"><button class="ox-choice" data-i="0">O</button><button class="ox-choice" data-i="1">X</button></div><div class="crow"><button class="cfm-btn" disabled>확인</button></div>`;
    } else if (type === '단답형') {
        h += `<div class="short-wrap"><input class="sin" type="text" placeholder="정답 입력"/><button class="ssub" onclick="window.doSubmit(${idx})">확인</button></div><div class="fb"></div>`;
    } else {
        h += `<div class="essay-wrap"><textarea class="ein" placeholder="풀이 과정 입력"></textarea><button class="esub" onclick="window.doSubmit(${idx})">채점</button></div><div class="fb"></div>`;
    }
    card.innerHTML = h;
    
    // 이벤트 바인딩
    card.onclick = () => selCard(idx);
    card.querySelectorAll('.cho, .ox-choice').forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation(); if (state.pst[idx].submitted) return;
            card.querySelectorAll('.cho, .ox-choice').forEach(b => b.classList.remove('pk'));
            btn.classList.add('pk'); state.pst[idx].picked = +btn.dataset.i;
            const cfm = card.querySelector('.cfm-btn'); if (cfm) cfm.disabled = false;
        };
    });
    const cfm = card.querySelector('.cfm-btn'); if (cfm) cfm.onclick = (e) => { e.stopPropagation(); window.doSubmit(idx); };

    return card;
}

// --- 전역 함수 등록 ---
window.thint = (id, btn) => { const el = document.getElementById(id); el.classList.toggle('open'); btn.querySelector('.arr').textContent = el.classList.contains('open') ? '▲' : '▼'; };
window.trev = (id, btn) => { document.getElementById(id).classList.toggle('open'); };
window.retry = (idx) => { state.pst[idx] = { picked: -1, submitted: false, isOk: null, userText: '' }; window.generateProblems(); };
window.doSubmit = (idx) => {
    const ps = state.pst[idx]; if (ps.submitted) return;
    const { prob, sCi } = state.problems[idx]; const card = document.querySelectorAll('.pcard')[idx];
    ps.submitted = true; const isOk = ps.picked === sCi;
    card.classList.add(isOk ? 'ok' : 'ng');
    const stamp = card.querySelector('.ox'); if (stamp) { stamp.textContent = isOk ? '○' : '✕'; stamp.className = `ox ${isOk ? 'so' : 'sx'}`; }
    if (state.selIdx === idx) renderRP(idx);
};
window.wnSaveProblem = wnSaveProblem;
