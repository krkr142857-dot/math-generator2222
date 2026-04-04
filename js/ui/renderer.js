import { state } from '../app.js';
import { wnSaveProblem } from './wrong-note.js';

// --- [중요] 다른 파일에서 직접 쓸 수 있게 export ---
export function renderMixedLatex(text, el) {
    if (!text || !text.trim()) {
        el.innerHTML = '<span class="mk-ph">수식 미리보기</span>';
        return;
    }
    const tokens = [];
    let rest = text;
    while (rest.length > 0) {
        const m1 = rest.match(/^\$([^$]+)\$/);
        if (m1) {
            tokens.push({ type: 'latex', v: m1[1] });
            rest = rest.slice(m1[0].length);
            continue;
        }
        const m2 = rest.match(/^((?:\\[a-zA-Z]+(?:\{[^}]*\}|\[[^\]]*\])*|[^가-힣ㄱ-ㅎㅏ-ㅣ$\n])+)/);
        if (m2 && (/\\[a-zA-Z]/.test(m2[1]) || /[\^_{}]/.test(m2[1]))) {
            tokens.push({ type: 'latex', v: m2[1] });
            rest = rest.slice(m2[0].length);
            continue;
        }
        const m3 = rest.match(/^[^$\\]*/);
        if (m3 && m3[0].length > 0) {
            tokens.push({ type: 'text', v: m3[0] });
            rest = rest.slice(m3[0].length);
            continue;
        }
        tokens.push({ type: 'text', v: rest[0] });
        rest = rest.slice(1);
    }
    el.innerHTML = tokens.map(t => {
        if (t.type === 'latex') {
            try { return katex.renderToString(t.v, { throwOnError: false, displayMode: false }); }
            catch (e) { return `<span>${t.v}</span>`; }
        }
        return t.v.replace(/\n/g, '<br>');
    }).join('');
}

export function rm(el) {
    if (typeof renderMathInElement === 'function') {
        renderMathInElement(el, {
            delimiters: [{ left: '$', right: '$', display: false }],
            throwOnError: false
        });
    }
}

export function normalizeKaTeXDisplayText(s) {
    if (!s) return '';
    return String(s).replace(/\\dfrac\s*{/g, '\\dfrac{').replace(/\*/g, '\\cdot ');
}

// --- 카드 생성 및 선택 로직 ---
export function selCard(idx) {
    state.selIdx = idx;
    document.querySelectorAll('.pcard').forEach((c, i) => c.classList.toggle('sel', i === idx));
    renderRP(idx);
}

export function renderRP(idx) {
    const rp = document.getElementById('rp');
    if (!state.problems[idx]) return;
    const prob = state.problems[idx].prob;
    rp.innerHTML = `<div>정답: ${normalizeKaTeXDisplayText(prob.ans)}</div>`;
    rm(rp);
}

export function mkCard(idx) {
    const { prob, sCh } = state.problems[idx];
    const card = document.createElement('div');
    card.className = 'pcard';
    card.innerHTML = `<div class="card-q">${normalizeKaTeXDisplayText(prob.q)}</div>`;
    card.onclick = () => selCard(idx);
    return card;
}

// 전역 바인딩
window.thint = (id, btn) => { document.getElementById(id).classList.toggle('open'); };
window.trev = (id, btn) => { document.getElementById(id).classList.toggle('open'); };
window.wnSaveProblem = wnSaveProblem;
