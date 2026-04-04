import { state } from './app.js'; // 자기 참조용이 아니라 아래 export를 위함
import { GRADE_UNITS } from './data/curriculum.js';
import { ri, shuf } from './utils.js'; // 유틸리티 분리
import { initSidebar } from './ui/sidebar.js';
import { initKeyboards } from './ui/keyboard.js';
import { initWrongNoteEvents } from './ui/wrong-note.js';
import { mkCard, rm, selCard, renderRP, mkUpdate } from './ui/renderer.js';
import { startExamTimer } from './ui/exam.js';

export const state = {
    st: { grade: "고1", sub: "다항식", lv: 2, lvL: "기본", type: "OX형", cnt: 3 },
    problems: [], pst: [], selIdx: -1, apiKey: "",
    mixMode: false, mixSubs: new Set(),
    examMode: false, examTimerID: null, examRemain: 0, examMaxSec: 0
};

// 데이터 모듈 로드 (경로 및 확장자 확인)
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

window.generateProblems = () => {
    const cp = document.getElementById('cp');
    state.selIdx = -1;
    const mod = (DATA_MAP[state.st.grade] && DATA_MAP[state.st.grade][state.st.sub]) || {};
    let raw = (state.st.type === 'OX형') ? (mod.ox || []) : ((mod.regular && mod.regular[state.st.lv]) || []);
    
    // 문제 추출 (간소화된 핵심 로직)
    state.problems = shuf(raw).slice(0, state.st.cnt).map(p => {
        let sCh = [], sCi = -1;
        if (state.st.type === '객관식' && p.choices) {
            const si = shuf(p.choices.map((_, j) => j));
            sCh = si.map(j => p.choices[j]);
            sCi = si.indexOf(p.ci);
        }
        return { prob: p, sCh, sCi };
    });

    state.pst = state.problems.map(() => ({ picked: -1, submitted: false, isOk: null }));
    cp.innerHTML = '';
    state.problems.forEach((_, i) => { cp.appendChild(mkCard(i)); });
    selCard(0);
    rm(cp);
};

document.addEventListener('DOMContentLoaded', () => {
    initSidebar(); initKeyboards(); initWrongNoteEvents();
    document.getElementById('genBtn')?.addEventListener('click', window.generateProblems);
});
