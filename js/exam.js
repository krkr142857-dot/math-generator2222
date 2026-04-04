import { state, setters, ri, shuf } from '../app.js';
import { GRADE_UNITS } from '../data/curriculum.js';
import { mkCard, rm, selCard } from './renderer.js';

export const EXAM_DIST = {
    10: {ox:2, mc:5, sa:1, es:2},
    15: {ox:3, mc:7, sa:2, es:3},
    20: {ox:4, mc:10, sa:2, es:4},
    25: {ox:5, mc:12, sa:3, es:5},
    30: {ox:6, mc:14, sa:4, es:6},
};

export function startExamTimer() {
    const examTimeSec = Math.round(3300 * state.st.cnt / 30);
    state.examMaxSec = examTimeSec;
    state.examRemain = examTimeSec;
    updateExamBar();
    if (state.examTimerID) clearInterval(state.examTimerID);
    state.examTimerID = setInterval(() => {
        state.examRemain--;
        updateExamBar();
        if (state.examRemain <= 0) {
            clearInterval(state.examTimerID);
            state.examTimerID = null;
            window.doSubmitExam(true);
        }
    }, 1000);
}

export function updateExamBar() {
    const t = document.getElementById('examBarTimer');
    if (!t) return;
    const m = String(Math.floor(state.examRemain / 60)).padStart(2, '0');
    const s = String(state.examRemain % 60).padStart(2, '0');
    t.textContent = `${m}:${s}`;
    t.classList.toggle('warn', state.examRemain <= state.examMaxSec * 0.2);
    
    const info = document.getElementById('examBarInfo');
    if (info) {
        const answered = state.pst.filter(p => p.picked !== -1 || p.submitted).length;
        info.textContent = `${answered}/${state.problems.length} 문항 입력됨`;
    }
}

export function lockAllExamInputs() {
    document.querySelectorAll('.pcard .cho').forEach(c => c.classList.add('dis'));
    document.querySelectorAll('.pcard input, .pcard textarea, .pcard button').forEach(el => el.disabled = true);
}

export function toggleExamMode(on) {
    state.examMode = on;
    document.getElementById('examBtn').classList.toggle('on', on);
    const units = GRADE_UNITS[state.st.grade];
    if (on) {
        document.querySelectorAll('#subG .sub-btn').forEach(b => b.classList.add('on'));
        if (state.st.cnt < 10) {
            state.st.cnt = 10;
            document.getElementById('cDsp').textContent = '10';
        }
    } else {
        document.querySelectorAll('#subG .sub-btn').forEach((b, i) => b.classList.toggle('on', i === 0));
        if (state.examTimerID) clearInterval(state.examTimerID);
    }
}

window.doSubmitExam = (forced) => {
    if (!forced && !confirm("시험지를 제출하시겠습니까?")) return;
    if (state.examTimerID) clearInterval(state.examTimerID);
    lockAllExamInputs();
    alert("제출되었습니다. 채점 결과를 확인하세요.");
    // 전체 채점 실행 로직...
};