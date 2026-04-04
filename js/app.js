import { GRADE_UNITS } from './data/curriculum.js';
import { initSidebar } from './ui/sidebar.js';
import { initKeyboards } from './ui/keyboard.js';
import { initWrongNoteEvents } from './ui/wrong-note.js';
import { mkCard, rm, selCard, renderRP } from './ui/renderer.js';
import { startExamTimer, getExamScores, EXAM_DIST } from './ui/exam.js';

// --- 전역 상태 ---
export const state = {
    st: { grade: "고1", sub: "다항식", lv: 2, lvL: "기본", type: "OX형", cnt: 3 },
    problems: [],
    pst: [],
    selIdx: -1,
    apiKey: "",
    mixMode: false,
    mixSubs: new Set(),
    examMode: false,
    examTimerID: null,
    examRemain: 0,
    examMaxSec: 0
};

// --- 유틸리티 함수 ---
export function ri(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
export function shuf(a) {
    const b = [...a];
    for (let i = b.length - 1; i > 0; i--) {
        const j = 0 | Math.random() * (i + 1);
        [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
}
export function sp(n) { if (n === 0) return ''; return n > 0 ? '+' + n : String(n); }
export function spx(n) { if (n === 0) return ''; if (n === 1) return '+x'; if (n === -1) return '-x'; return n > 0 ? '+' + n + 'x' : n + 'x'; }
export function scx(n) { if (n === 0) return '0'; if (n === 1) return 'x'; if (n === -1) return '-x'; return n + 'x'; }
export function scx2(n) { if (n === 1) return 'x^2'; if (n === -1) return '-x^2'; return n + 'x^2'; }

// --- 데이터 맵핑 ---
import * as g1_p from './data/g1/math1/polynomials.js';
import * as g1_e from './data/g1/math1/equations.js';
import * as g1_c from './data/g1/math1/combinations.js';
import * as g1_m from './data/g1/math1/matrices.js';
import * as g1_g from './data/g1/math2/geometry.js';
import * as g1_s from './data/g1/math2/set-logic.js';
import * as g1_f from './data/g1/math2/functions.js';
import * as g2_l from './data/g2/algebra/log-exp.js';
import * as g2_t from './data/g2/algebra/trig.js';
import * as g2_s_ from './data/g2/algebra/sequences.js';
import * as g2_li from './data/g2/calculus1/limits.js';
import * as g2_d from './data/g2/calculus1/derivative.js';
import * as g2_i from './data/g2/calculus1/integral.js';
import * as g3_c_ from './data/g3/stats/cases.js';
import * as g3_p_ from './data/g3/stats/probability.js';
import * as g3_s_ from './data/g3/stats/statistics.js';
import * as g3_sl from './data/g3/calculus2/sequence-limits.js';
import * as g3_dm from './data/g3/calculus2/diff-methods.js';

const DATA_MAP = {
    "고1": { "다항식": g1_p, "방정식과 부등식": g1_e, "경우의 수": g1_c, "행렬": g1_m, "도형의 방정식": g1_g, "집합과 명제": g1_s, "함수와 그래프": g1_f },
    "고2": { "지수함수와 로그함수": g2_l, "삼각함수": g2_t, "수열": g2_s_, "함수의 극한과 연속": g2_li, "미분": g2_d, "적분": g2_i },
    "고3": { "경우의 수": g3_c_, "확률": g3_p_, "통계": g3_s_, "수열의 극한": g3_sl, "미분법": g3_dm }
};

function pick(grade, sub, lv, type, n) {
    const mod = (DATA_MAP[grade] && DATA_MAP[grade][sub]) || {};
    let pool = (type === 'OX형') ? (mod.ox || []) : ((mod.regular && mod.regular[lv]) ? mod.regular[lv].filter(p => p.type.includes(type)) : []);
    const gens = (mod.generators && mod.generators[lv]) ? mod.generators[lv].filter(g => {
        try { const t = g(); return t && t.type.includes(type); } catch(e) { return false; }
    }) : [];

    let results = [];
    for(let i=0; i<n; i++) {
        let prob = null;
        if (gens.length > 0 && Math.random() < 0.85) prob = gens[ri(0, gens.length - 1)]();
        if (!prob && pool.length > 0) prob = pool[ri(0, pool.length - 1)];
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
    const rp = document.getElementById('rp');
    if (state.examTimerID) { clearInterval(state.examTimerID); state.examTimerID = null; }
    state.selIdx = -1;
    
    if (state.examMode) {
        let all = [];
        Object.keys(DATA_MAP[state.st.grade]).forEach(s => {
            ['객관식', 'OX형', '단답형', '서술형'].forEach(t => {
                all = all.concat(pick(state.st.grade, s, state.st.lv, t, 2));
            });
        });
        state.problems = shuf(all).slice(0, state.st.cnt);
    } else {
        state.problems = pick(state.st.grade, state.st.sub, state.st.lv, state.st.type, state.st.cnt);
    }

    state.pst = state.problems.map(() => ({ picked: -1, submitted: false, isOk: null, userText: '' }));
    cp.innerHTML = '';
    
    if (state.problems.length === 0) {
        cp.innerHTML = '<div class="empty-st"><div class="empty-tx">문제가 없습니다.</div></div>';
        return;
    }

    if (state.examMode) {
        const bar = document.createElement('div');
        bar.id = 'examBarEl'; bar.className = 'exam-bar';
        bar.innerHTML = `<div class="exam-bar-left"><div class="exam-bar-label">시험 진행 중</div><div class="exam-bar-timer-box"><div class="exam-bar-timer" id="examBarTimer">00:00</div></div></div><div class="exam-bar-info" id="examBarInfo"></div><button class="exam-bar-submit" onclick="window.doSubmitExam(false)">시험지 제출</button>`;
        cp.appendChild(bar);
        startExamTimer();
    }

    state.problems.forEach((_, i) => {
        const card = mkCard(i);
        cp.appendChild(card);
        rm(card);
    });
    selCard(0);
};

document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initKeyboards();
    initWrongNoteEvents();
    document.getElementById('genBtn')?.addEventListener('click', window.generateProblems);
    
    window.toggleTheme = () => {
        const html = document.documentElement;
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        document.getElementById('themeBtn').textContent = next === 'dark' ? '☀️' : '🌙';
    };
});
