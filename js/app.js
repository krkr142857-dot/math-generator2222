// js/app.js - 중앙 관리
import { GRADE_UNITS } from './data/curriculum.js';
import { ri, shuf } from './utils.js';
import { initSidebar } from './ui/sidebar.js';
import { initKeyboards } from './ui/keyboard.js';
import { initWrongNoteEvents } from './ui/wrong-note.js';
import { mkCard, rm, selCard, renderRP, mkUpdate } from './ui/renderer.js';

export const state = {
    st: { grade: "고1", sub: "다항식", lv: 2, lvL: "기본", type: "OX형", cnt: 3 },
    problems: [], pst: [], selIdx: -1, mixMode: false, examMode: false, mixSubs: new Set()
};

// 데이터 로드
import * as g1_p from './data/g1/math1/polynomials.js';
import * as g1_e from './data/g1/math1/equations.js';
import * as g1_c from './data/g1/math1/combinations.js';
import * as g1_m from './data/g1/math1/matrices.js';
import * as g1_g from './data/g1/math2/geometry.js';
import * as g1_s from './data/g1/math2/set-logic.js';
import * as g1_f from './data/g1/math2/functions.js';
const DATA_MAP = { "고1": { "다항식": g1_p, "방정식과 부등식": g1_e, "경우의 수": g1_c, "행렬": g1_m, "도형의 방정식": g1_g, "집합과 명제": g1_s, "함수와 그래프": g1_f } };

function pick(grade, sub, lv, type, n) {
    const mod = (DATA_MAP[grade] && DATA_MAP[grade][sub]) || {};
    let pool = (type === 'OX형') ? (mod.ox || []) : ((mod.regular && mod.regular[lv]) || []);
    const gens = (mod.generators && mod.generators[lv]) ? mod.generators[lv].filter(g => {
        try { const t = g(); return t && t.type.includes(type); } catch(e) { return false; }
    }) : [];
    let results = [];
    for(let i=0; i<n; i++) {
        let prob = (gens.length > 0 && Math.random() < 0.8) ? gens[ri(0, gens.length-1)]() : (pool.length > 0 ? pool[ri(0, pool.length-1)] : null);
        if (prob) {
            let sCh = [], sCi = -1;
            if (type === '객관식' && prob.choices) {
                const si = shuf(prob.choices.map((_, j) => j));
                sCh = si.map(j => prob.choices[j]);
                sCi = si.indexOf(prob.ci);
            }
            results.push({ prob, sCh, sCi });
        }
    }
    return results;
}

window.generateProblems = () => {
    const cp = document.getElementById('cp');
    state.selIdx = -1;
    state.problems = pick(state.st.grade, state.st.sub, state.st.lv, state.st.type, state.st.cnt);
    state.pst = state.problems.map(() => ({ picked: -1, submitted: false, isOk: null }));
    cp.innerHTML = '';
    state.problems.forEach((_, i) => cp.appendChild(mkCard(i)));
    if (state.problems.length > 0) selCard(0);
    rm(cp);
};

document.addEventListener('DOMContentLoaded', () => {
    initSidebar(); initKeyboards(); initWrongNoteEvents();
    document.getElementById('genBtn').onclick = window.generateProblems;
    window.toggleTheme = () => {
        const h = document.documentElement;
        const next = h.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        h.setAttribute('data-theme', next);
    };
});
