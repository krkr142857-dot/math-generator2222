import { state } from '../app.js';
import { normalizeKaTeXDisplayText as normDisp } from '../utils.js'; // 유틸리티 사용

export function rm(el) {
    if (window.renderMathInElement) renderMathInElement(el, { delimiters: [{ left: '$', right: '$', display: false }] });
}

export function renderMixedLatex(text, el) {
    if (!text) return;
    el.innerHTML = text.replace(/\$([^$]+)\$/g, (m, g1) => {
        try { return katex.renderToString(g1); } catch (e) { return g1; }
    });
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
    rp.innerHTML = `<div class="rpl">문제 ${idx+1} 풀이</div><div class="abox open">정답: ${p.ans}</div><div class="sbox open">${p.sol}</div>`;
    rm(rp);
}

export function mkCard(idx) {
    const pObj = state.problems[idx];
    const card = document.createElement('div');
    card.className = 'pcard';
    card.innerHTML = `<div class="cnum">문제 ${idx+1}</div><div class="card-q">${pObj.prob.q}</div>`;
    card.onclick = () => selCard(idx);
    return card;
}
