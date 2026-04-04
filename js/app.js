// js/app.js - 데이터 로드 및 상태 중앙 관리
import { GRADE_UNITS } from './data/curriculum.js';
import { ri, shuf } from './utils.js';
import { initSidebar } from './ui/sidebar.js';
import { initKeyboards } from './ui/keyboard.js';
import { mkCard, rm, selCard, renderRP } from './ui/renderer.js';

export const state = {
    st: { grade: "고1", sub: "다항식", lv: 2, lvL: "기본", type: "OX형", cnt: 3 },
    problems: [], pst: [], selIdx: -1, mixMode: false, examMode: false, mixSubs: new Set()
};

// 모든 데이터 파일 import (확장자 필수)
import * as g1_p from './data/g1/math1/polynomials.js';
import * as g1_e from './data/g1/math1/equations.js';
import * as g1_c from './data/g1/math1/combinations.js';
import * as g1_m from './data/g1/math1/matrices.js';
import * as g1_g from './data/g1/math2/geometry.js';
import * as g1_s from './data/g1/math2/set-logic.js';
import * as g1_f from './data/g1/math2/functions.js';
// ... (나머지 g2, g3 파일들도 동일한 방식으로 추가)

const DATA_MAP = {
    "고1": { "다항식": g1_p, "방정식과 부등식": g1_e, "경우의 수": g1_c, "행렬": g1_m, "도형의 방정식": g1_g, "집합과 명제": g1_s, "함수와 그래프": g1_f }
};

window.generateProblems = () => {
    const cp = document.getElementById('cp');
    state.selIdx = -1;
    const mod = (DATA_MAP[state.st.grade] && DATA_MAP[state.st.grade][state.st.sub]) || {};
    let pool = (state.st.type === 'OX형') ? (mod.ox || []) : (mod.regular ? (mod.regular[state.st.lv] || []) : []);
    
    state.problems = shuf(pool).slice(0, state.st.cnt).map(p => {
        let sCh = [], sCi = -1;
        if (state.st.type === '객관식' && p.choices) {
            const si = shuf(p.choices.map((_, j) => j));
            sCh = si.map(j => p.choices[j]);
            sCi = si.indexOf(p.ci);
        }
        return { prob: p, sCh, sCi };
    });

    state.pst = state.problems.map(() => ({ picked: -1, submitted: false }));
    cp.innerHTML = '';
    state.problems.forEach((_, i) => cp.appendChild(mkCard(i)));
    if (state.problems.length > 0) selCard(0);
    rm(cp);
};

document.addEventListener('DOMContentLoaded', () => {
    initSidebar(); initKeyboards();
    document.getElementById('genBtn').onclick = window.generateProblems;
    window.toggleTheme = () => {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
    };
});
