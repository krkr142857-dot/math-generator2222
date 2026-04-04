import { state } from '../app.js';

const WN_KEY = 'mathWrongNote';

export function wnLoad() { try { return JSON.parse(localStorage.getItem(WN_KEY) || '[]'); } catch(e) { return []; } }
export function wnSave(items) { localStorage.setItem(WN_KEY, JSON.stringify(items)); wnUpdateCount(); }

export function wnUpdateCount() {
    const n = wnLoad().length;
    const el = document.getElementById('wnCount');
    if (el) el.textContent = n;
}

export function initWrongNoteEvents() {
    wnUpdateCount();
}

export function wnSaveProblem(idx) {
    const items = wnLoad();
    const { prob } = state.problems[idx];
    if (items.some(i => i.q === prob.q)) return alert("이미 저장됨");
    items.push({ grade: state.st.grade, sub: state.st.sub, q: prob.q, ans: prob.ans, sol: prob.sol });
    wnSave(items);
    alert("저장완료");
}

window.wnOpen = () => { document.getElementById('wnPanel').classList.add('open'); document.getElementById('wnOverlay').classList.add('show'); };
window.wnClose = () => { document.getElementById('wnPanel').classList.remove('open'); document.getElementById('wnOverlay').classList.remove('show'); };
