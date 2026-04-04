// ============================================================================
// [최종 통합 컨트롤러] js/app.js
// ============================================================================

import { GRADE_UNITS } from './data/curriculum.js';
import { initSidebar } from './ui/sidebar.js';
import { initKeyboards, mkUpdate } from './ui/keyboard.js';
import { initWrongNoteEvents } from './ui/wrong-note.js';
import { mkCard, rm, selCard } from './ui/renderer.js';
import { startExamTimer, getExamScores, EXAM_DIST } from './ui/exam.js';

// 1. 전역 상태 관리 객체 (모든 모듈이 이 객체를 공유함)
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

// 2. 상태 변경용 Setter 함수 (모듈 환경의 읽기 전용 제약 해결)
export const setters = {
    setSelIdx: (val) => { state.selIdx = val; },
    setApiKey: (val) => { state.apiKey = val; },
    setMixMode: (val) => { state.mixMode = val; },
    setExamMode: (val) => { state.examMode = val; },
    setProblems: (val) => { state.problems = val; },
    setPst: (val) => { state.pst = val; }
};

// 3. 수학 계산 및 문자열 유틸리티
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

// 4. 데이터 모듈 통합 로드 (뱅크 구축)
import * as g1_poly from './data/g1/math1/polynomials.js';
import * as g1_eq from './data/g1/math1/equations.js';
import * as g1_comb from './data/g1/math1/combinations.js';
import * as g1_mat from './data/g1/math1/matrices.js';
import * as g1_geo from './data/g1/math2/geometry.js';
import * as g1_set from './data/g1/math2/set-logic.js';
import * as g1_fn from './data/g1/math2/functions.js';
import * as g2_log from './data/g2/algebra/log-exp.js';
import * as g2_trig from './data/g2/algebra/trig.js';
import * as g2_seq from './data/g2/algebra/sequences.js';
import * as g2_lim from './data/g2/calculus1/limits.js';
import * as g2_der from './data/g2/calculus1/derivative.js';
import * as g2_int from './data/g2/calculus1/integral.js';
import * as g3_case from './data/g3/stats/cases.js';
import * as g3_prob from './data/g3/stats/probability.js';
import * as g3_stat from './data/g3/stats/statistics.js';
import * as g3_slim from './data/g3/calculus2/sequence-limits.js';
import * as g3_diff from './data/g3/calculus2/diff-methods.js';

const DATA_MAP = {
    "고1": { "다항식": g1_poly, "방정식과 부등식": g1_eq, "경우의 수": g1_comb, "행렬": g1_mat, "도형의 방정식": g1_geo, "집합과 명제": g1_set, "함수와 그래프": g1_fn },
    "고2": { "지수함수와 로그함수": g2_log, "삼각함수": g2_trig, "수열": g2_seq, "함수의 극한과 연속": g2_lim, "미분": g2_der, "적분": g2_int },
    "고3": { "경우의 수": g3_case, "확률": g3_prob, "통계": g3_stat, "수열의 극한": g3_slim, "미분법": g3_diff }
};

// 문제 추출 핵심 함수
function pick(grade, sub, lv, type, n) {
    const mod = (DATA_MAP[grade] && DATA_MAP[grade][sub]) || {};
    let pool = [];
    if (type === 'OX형') pool = mod.ox || [];
    else pool = (mod.regular && mod.regular[lv]) ? mod.regular[lv].filter(p => p.type.includes(type)) : [];

    const gens = (mod.generators && mod.generators[lv]) ? mod.generators[lv].filter(g => {
        try { const t = g(); return t && t.type.includes(type); } catch(e) { return false; }
    }) : [];

    let results = [];
    for(let i=0; i<n; i++) {
        let prob = null;
        if (gens.length > 0 && Math.random() < 0.8) prob = gens[ri(0, gens.length-1)]();
        if (!prob && pool.length > 0) prob = pool[ri(0, pool.length-1)];
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

// 5. 초기화 및 이벤트 바인딩
document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initKeyboards();
    initWrongNoteEvents();

    document.getElementById('genBtn')?.addEventListener('click', generateProblems);
    
    // 테마 설정
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    window.toggleTheme = () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const next = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        document.getElementById('themeBtn').textContent = next === 'dark' ? '☀️' : '🌙';
    };
});

// 6. 메인 로직: 문제 생성
function generateProblems() {
    const cp = document.getElementById('cp');
    const rp = document.getElementById('rp');
    if (state.examTimerID) { clearInterval(state.examTimerID); state.examTimerID = null; }

    state.selIdx = -1;
    const mkInputEl = document.getElementById('mkInput');
    if (mkInputEl) mkInputEl.value = '';
    mkUpdate();

    if (state.examMode) {
        // 시험 모드 로직 (생략 - 필요시 추가 가능)
    } else if (state.mixMode) {
        // 혼합 모드 로직 (생략)
    } else {
        state.problems = pick(state.st.grade, state.st.sub, state.st.lv, state.st.type, state.st.cnt);
    }

    state.pst = state.problems.map(() => ({ picked: -1, submitted: false, isOk: null, userText: '' }));
    
    if (cp) cp.innerHTML = '';
    if (rp) rp.innerHTML = '<div class="rp-empty"><div class="rp-empty-ico">👆</div><div class="rp-empty-tx">문제를 클릭하면<br>힌트·정답·풀이가<br>여기에 나옵니다</div></div>';

    if (state.problems.length === 0) {
        cp.innerHTML = '<div class="empty-st"><div class="empty-ico">😅</div><div class="empty-tx">문제가 없습니다.</div></div>';
        return;
    }

    state.problems.forEach((_, i) => {
        const card = mkCard(i);
        cp.appendChild(card);
        rm(card);
    });
    selCard(0);
}
