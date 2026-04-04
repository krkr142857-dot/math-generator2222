import { state, setters, rm as globalRm } from '../app.js';
import { wnSaveProblem } from './wrong-note.js';

export function rm(el) {
    if (typeof renderMathInElement === 'function') {
        renderMathInElement(el, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ],
            throwOnError: false
        });
    }
}

export function normalizeKaTeXDisplayText(s) {
    if (s === null || s === undefined) return '';
    let r = String(s);
    r = r.replace(/;\s*<-\s*/g, '');
    r = r.replace(/(^|[^\\])dfrac\s*\{/g, (m, p1) => p1 + '\\dfrac{');
    r = r.replace(/(^|[^\\])int\s*<-\s*/g, (m, p1) => p1 + '\\int ');
    r = r.replace(/(^|[^\\])\*\s*/g, (m, p1) => p1 + '\\cdot ');
    r = r.replace(/x\^(\d+|\{[^}]+\})x(?!\^)/g, 'x^$1\\cdot x');
    r = r.replace(/(^|[^\\])cdot\b/g, (m, p1) => p1 + '\\cdot ');
    return r;
}

export function norm(s) {
    return (s || '')
        .replace(/;\s*<-\s*/g, '')
        .replace(/\$/g, '')
        .replace(/\s+/g, '')
        .replace(/\\cdot|\\times|×|\*/g, '')
        .replace(/\\sqrt\{([^}]+)\}/g, 'sqrt($1)')
        .replace(/\\dfrac\{([^}]*)\}\{([^}]*)\}/g, '($1)/($2)')
        .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '($1)/($2)')
        .replace(/\^{(\w+)}/g, '^$1')
        .replace(/\\pi/gi, 'π')
        .replace(/\\sin/g, 'sin')
        .replace(/\\cos/g, 'cos')
        .replace(/\\tan/g, 'tan')
        .toLowerCase();
}

export function fuzzyMatch(userAns, correctSa) {
    if (!userAns || !correctSa) return false;
    const n1 = norm(userAns), n2 = norm(correctSa);
    if (n1 === n2) return true;
    const toNum = s => {
        s = String(s).replace(/[()]/g, '');
        const frac = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
        if (frac) return parseFloat(frac[1]) / parseFloat(frac[2]);
        const v = parseFloat(s.replace(/[^0-9.\-]/g, ''));
        return isNaN(v) ? NaN : v;
    };
    const v1 = toNum(n1), v2 = toNum(n2);
    if (!isNaN(v1) && !isNaN(v2) && Math.abs(v1 - v2) < 0.01) return true;
    return false;
}

export function renderRP(idx) {
    const rp = document.getElementById('rp');
    const { prob } = state.problems[idx];
    const uid = 'u' + idx;

    if (state.examMode && !state.problems._examDone) {
        rp.innerHTML = '<div class="rp-empty">🔒 시험 제출 후 공개됩니다.</div>';
        return;
    }

    const ansN = normalizeKaTeXDisplayText(prob.ans);
    const solN = normalizeKaTeXDisplayText(prob.sol || '');
    const hints = Array.isArray(prob.hints) ? prob.hints : [];

    rp.innerHTML = `
        <div class="rpl">💡 문제 ${idx + 1} 풀이</div>
        <div class="fl">힌트</div>
        ${hints.map((hi, i) => `
            <div class="hint-item">
                <button class="htog" onclick="window.thint('${uid}h${i}',this)">힌트 ${i + 1} <span class="arr">▼</span></button>
                <div class="hbd" id="${uid}h${i}">${normalizeKaTeXDisplayText(hi)}</div>
            </div>`).join('')}
        <button class="rvb rva" onclick="window.trev('${uid}-a',this)">정답 확인</button>
        <div class="abox" id="${uid}-a">정답: ${ansN}</div>
        <button class="rvb rvs" onclick="window.trev('${uid}-s',this)">풀이 보기</button>
        <div class="sbox" id="${uid}-s">${solN}</div>
    `;
    rm(rp);
}

export function mkCard(idx) {
    const { prob, sCh, sCi } = state.problems[idx];
    const card = document.createElement('div');
    card.className = 'pcard';
    const qN = normalizeKaTeXDisplayText(prob.q);

    let h = `
        <div class="ox"></div>
        <div class="ctop">
            <div class="cnum">문제 ${idx + 1}</div>
            <button class="retry-btn" onclick="window.retry(${idx})">↺ 다시</button>
            <button class="wn-save-btn" onclick="window.wnSaveProblem(${idx})">📕 저장</button>
        </div>
        <div class="card-q">${qN}</div>
    `;

    const type = (state.examMode || state.mixMode) ? (prob.type[0] || "객관식") : state.st.type;

    if (type === '객관식') {
        h += `<div class="choices">${sCh.map((c, i) => `
            <div class="cho" data-i="${i}"><span class="cn">${"①②③④⑤"[i]}</span>${normalizeKaTeXDisplayText(c)}</div>`).join('')}
        </div><div class="crow"><button class="cfm-btn" disabled>확인</button></div>`;
    } else if (type === 'OX형') {
        h += `<div class="ox-btns">
            <button class="ox-choice" data-i="0">O</button>
            <button class="ox-choice" data-i="1">X</button>
        </div><div class="crow"><button class="cfm-btn" disabled>확인</button></div>`;
    } else if (type === '단답형') {
        h += `<div class="short-wrap"><input class="sin" type="text" placeholder="답안 입력"/><div class="ans-rendered"></div><button class="ssub">확인</button></div><div class="fb"></div>`;
    } else {
        h += `<div class="essay-wrap"><textarea class="ein" placeholder="풀이와 답 입력"></textarea><button class="esub">채점</button></div><div class="fb"></div>`;
    }

    card.innerHTML = h;
    card.onclick = () => selCard(idx);
    
    // 이벤트 바인딩 (간략화된 예시, 실제 원본 로직 유지 필요)
    card.querySelectorAll('.cho').forEach(el => el.onclick = (e) => {
        e.stopPropagation();
        card.querySelectorAll('.cho').forEach(c => c.classList.remove('pk'));
        el.classList.add('pk');
        state.pst[idx].picked = +el.dataset.i;
        card.querySelector('.cfm-btn').disabled = false;
    });

    return card;
}

export function selCard(idx) {
    state.selIdx = idx;
    document.querySelectorAll('.pcard').forEach((c, i) => c.classList.toggle('sel', i === idx));
    renderRP(idx);
}

window.thint = (id, btn) => {
    const el = document.getElementById(id);
    el.classList.toggle('open');
    btn.querySelector('.arr').textContent = el.classList.contains('open') ? '▲' : '▼';
};
window.trev = (id, btn) => {
    document.getElementById(id).classList.toggle('open');
};
window.wnSaveProblem = wnSaveProblem;