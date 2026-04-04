// js/ui/renderer.js
import { state } from '../app.js';
import { normalizeKaTeXDisplayText as nd } from '../utils.js';

export function rm(el) { if (window.renderMathInElement) renderMathInElement(el, { delimiters: [{ left: '$', right: '$', display: false }], throwOnError: false }); }

export function renderMixedLatex(text, el) {
    if (!text || !text.trim()) { el.innerHTML = '<span class="mk-ph">미리보기</span>'; return; }
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
            try { return katex.renderToString(t.v, { throwOnError: false }); } catch (e) { return t.v; }
        }
        return t.v.replace(/\n/g, '<br>');
    }).join('');
}

export function mkUpdate() {
    const val = document.getElementById('mkInput')?.value || "";
    renderMixedLatex(val, document.getElementById('mkRendered'));
}

export function selCard(idx) {
    state.selIdx = idx;
    document.querySelectorAll('.pcard').forEach((c, i) => c.classList.toggle('sel', i === idx));
    renderRP(idx);
}

export function renderRP(idx) {
    const rp = document.getElementById('rp');
    const p = state.problems[idx].prob;
    rp.innerHTML = `<div class="rpl">문제 ${idx+1} 정답 및 해설</div><div class="abox open">정답: ${p.ans}</div><div class="sbox open">${p.sol}</div>`;
    rm(rp);
}

export function mkCard(idx) {
    const pObj = state.problems[idx];
    const card = document.createElement('div');
    card.className = 'pcard';
    card.innerHTML = `<div class="ox"></div><div class="ctop"><div class="cnum">문제 ${idx+1}</div></div><div class="card-q">${pObj.prob.q}</div>`;
    card.onclick = () => selCard(idx);
    return card;
}

window.thint = (id, btn) => document.getElementById(id).classList.toggle('open');
window.trev = (id, btn) => document.getElementById(id).classList.toggle('open');
