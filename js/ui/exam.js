import { state, ri, shuf } from '../app.js';

export const EXAM_DIST = { 10: {ox:2, mc:5, sa:1, es:2}, 15: {ox:3, mc:7, sa:2, es:3}, 20: {ox:4, mc:10, sa:2, es:4}, 25: {ox:5, mc:12, sa:3, es:5}, 30: {ox:6, mc:14, sa:4, es:6} };

export function startExamTimer() {
    state.examRemain = Math.round(3300 * state.st.cnt / 30);
    state.examTimerID = setInterval(() => {
        state.examRemain--;
        const t = document.getElementById('examBarTimer');
        if (t) t.textContent = `${String(Math.floor(state.examRemain/60)).padStart(2,'0')}:${String(state.examRemain%60).padStart(2,'0')}`;
        if (state.examRemain <= 0) { clearInterval(state.examTimerID); window.doSubmitExam(true); }
    }, 1000);
}

export function getExamScores(cnt) { /* 원본 점수 계산 로직 */ return {oxPts:[2], mcPts:[4], saPts:[3], esPts:[6]}; }
