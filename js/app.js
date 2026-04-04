// ============================================================================
// [최종 통합 컨트롤러] js/app.js
// ============================================================================

import { GRADE_UNITS } from './data/curriculum.js';
import { initSidebar } from './ui/sidebar.js';
import { initKeyboards, mkUpdate } from './ui/keyboard.js';
import { initWrongNoteEvents } from './ui/wrong-note.js';

// --- UI 모듈에서 함수 가져오기 ---
import { mkCard, rm, selCard, renderRP, renderMixedLatex, normalizeKaTeXDisplayText } from './ui/renderer.js';
import { startExamTimer, toggleExamMode } from './ui/exam.js';

// --- 다른 모듈(keyboard.js 등)이 사용할 수 있도록 함수 재배출 (이게 없어서 오류난 것임) ---
export { renderMixedLatex, rm, mkCard, selCard, renderRP, normalizeKaTeXDisplayText };

// 1. 전역 상태 관리 객체
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

// 2. 수학 및 유틸리티 함수
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

// 3. 데이터 모듈 로드
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

// 문제 추출기
function pick(grade, sub, lv, type, n) {
    const mod = (DATA_MAP[grade] && DATA_MAP[grade][sub]) || {};
    let pool = (type === 'OX형') ? (mod.ox || []) : 
               ((mod.regular && mod.regular[lv]) ? mod.regular[lv].filter(p => p.type.includes(type)) : []);
    
    const gens = (mod.generators && mod.generators[lv]) ? mod.generators[lv].filter(g => {
        try { const t = g(); return t && t.type.includes(type); } catch(e) { return false; }
    }) : [];

    let results = [];
    for(let i=0; i<n; i++) {
        let prob = null;
        if (gens.length > 0 && Math.random() < 0.8) {
            const gfn = gens[ri(0, gens.length - 1)];
            prob = gfn();
        }
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

// 4. 전역 함수 바인딩 (index.html에서 접근 가능하도록)
window.generateProblems = () => {
    const cp = document.getElementById('cp');
    const rp = document.getElementById('rp');
    if (state.examTimerID) { clearInterval(state.examTimerID); state.examTimerID = null; }

    state.selIdx = -1;
    const mkInputEl = document.getElementById('mkInput');
    if (mkInputEl) mkInputEl.value = '';
    mkUpdate();

    if (state.examMode) {
        // 시험 모드 배분 로직
        const types = ['객관식', 'OX형', '단답형', '서술형'];
        let all = [];
        Object.keys(DATA_MAP[state.st.grade]).forEach(s => {
            types.forEach(t => { all = all.concat(pick(state.st.grade, s, state.st.lv, t, 2)); });
        });
        state.problems = shuf(all).slice(0, state.st.cnt);
    } else {
        state.problems = pick(state.st.grade, state.st.sub, state.st.lv, state.st.type, state.st.cnt);
    }

    state.pst = state.problems.map(() => ({ picked: -1, submitted: false, isOk: null, userText: '' }));
    
    if (cp) cp.innerHTML = '';
    if (rp) rp.innerHTML = '<div class="rp-empty"><div class="rp-empty-ico">👆</div><div class="rp-empty-tx">문제를 클릭하면<br>힌트·정답·풀이가<br>여기에 나옵니다</div></div>';

    if (state.problems.length === 0) {
        cp.innerHTML = '<div class="empty-st"><div class="empty-tx">선택한 단원에 문제가 없습니다.</div></div>';
        return;
    }

    state.problems.forEach((_, i) => {
        const card = mkCard(i);
        cp.appendChild(card);
        rm(card);
    });
    selCard(0);
};

// 5. 초기화
document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initKeyboards();
    initWrongNoteEvents();
    
    // 버튼 직접 연결
    document.getElementById('genBtn')?.addEventListener('click', window.generateProblems);
});
