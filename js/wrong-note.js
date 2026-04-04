import { state, ri, shuf } from '../app.js';
import { GRADE_UNITS } from '../data/curriculum.js';
import { mkCard, rm, selCard } from './renderer.js';

const WN_KEY = 'mathWrongNote';

export function wnLoad() { 
    try { return JSON.parse(localStorage.getItem(WN_KEY) || '[]'); } 
    catch(e) { return []; } 
}

export function wnSave(items) { 
    localStorage.setItem(WN_KEY, JSON.stringify(items)); 
    wnUpdateCount(); 
}

export function wnUpdateCount() {
    const n = wnLoad().length;
    const el = document.getElementById('wnCount');
    if (el) el.textContent = n;
}

export function wnSaveProblem(idx) {
    const items = wnLoad();
    const prob = state.problems[idx].prob;
    const qHash = prob.q; // 단순화를 위한 해시
    if (items.some(i => i.q === qHash)) return alert("이미 저장된 문제입니다.");
    
    items.push({
        grade: state.st.grade,
        sub: state.st.sub,
        q: prob.q,
        ans: prob.ans,
        sol: prob.sol
    });
    wnSave(items);
    alert("오답 노트에 저장되었습니다.");
}

export function wnOpen() {
    document.getElementById('wnPanel').classList.add('open');
    document.getElementById('wnOverlay').classList.add('show');
    wnRender();
}

export function wnRender() {
    const items = wnLoad();
    const list = document.getElementById('wnList');
    if (!list) return;
    if (items.length === 0) {
        list.innerHTML = '<div class="wn-empty">저장된 오답이 없습니다.</div>';
        return;
    }
    list.innerHTML = items.map((item, i) => `
        <div class="wn-card">
            <div class="wn-card-head">
                <span class="wn-card-grade">${item.grade}</span>
                <span class="wn-card-sub">${item.sub}</span>
                <button onclick="window.wnDelete(${i})">✕</button>
            </div>
            <div class="wn-card-q">${item.q}</div>
        </div>
    `).join('');
    rm(list);
}

// HTML 인라인 호출을 위해 window 객체에 등록
window.wnOpen = wnOpen;
window.wnClose = () => {
    document.getElementById('wnPanel').classList.remove('open');
    document.getElementById('wnOverlay').classList.remove('show');
};
window.wnDelete = (i) => {
    const items = wnLoad();
    items.splice(i, 1);
    wnSave(items);
    wnRender();
};
window.wnSaveProblem = wnSaveProblem;