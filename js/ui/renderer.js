import { state, setters, shuf, ri } from '../app.js';
import { wnSaveProblem } from './wrong-note.js';

// --- 1. 수식 및 텍스트 렌더링 엔진 ---

// KaTeX 자동 렌더링 함수
export function rm(el) {
    if (typeof renderMathInElement === 'function') {
        renderMathInElement(el, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ],
            throwOnError: false
        });
    }
}

// 텍스트와 수식이 섞인 입력을 KaTeX로 변환 (중요: keyboard.js에서 호출함)
export function renderMixedLatex(text, el) {
    if (!text || !text.trim()) {
        el.innerHTML = '<span class="mk-ph">수식 미리보기</span>';
        return;
    }
    
    // 1) $...$ 블록 및 일반 텍스트 분리 토큰화
    const tokens = [];
    let rest = text;
    while (rest.length > 0) {
        const m1 = rest.match(/^\$([^$]+)\$/);
        if (m1) {
            tokens.push({ type: 'latex', v: m1[1] });
            rest = rest.slice(m1[0].length);
            continue;
        }
        const m2 = rest.match(/^((?:\\[a-zA-Z]+(?:\{[^}]*\}|\[[^\]]*\])*|[^가-힣ㄱ-ㅎㅏ-ㅣ$\n])+)/);
        if (m2 && (/\\[a-zA-Z]/.test(m2[1]) || /[\^_{}]/.test(m2[1]))) {
            tokens.push({ type: 'latex', v: m2[1] });
            rest = rest.slice(m2[0].length);
            continue;
        }
        const m3 = rest.match(/^[^$\\]*/);
        if (m3 && m3[0].length > 0) {
            tokens.push({ type: 'text', v: m3[0] });
            rest = rest.slice(m3[0].length);
            continue;
        }
        tokens.push({ type: 'text', v: rest[0] });
        rest = rest.slice(1);
    }

    el.innerHTML = tokens.map(t => {
        if (t.type === 'latex') {
            try { return katex.renderToString(t.v, { throwOnError: false, displayMode: false }); }
            catch (e) { return `<span>${t.v}</span>`; }
        }
        return t.v.replace(/\n/g, '<br>');
    }).join('');
}

export function normalizeKaTeXDisplayText(s) {
    if (!s) return '';
    let r = String(s);
    r = r.replace(/;\s*<-\s*/g, '');
    r = r.replace(/(^|[^\\])dfrac\s*\{/g, (m, p1) => p1 + '\\dfrac{');
    r = r.replace(/(^|[^\\])int\s*<-\s*/g, (m, p1) => p1 + '\\int ');
    r = r.replace(/(^|[^\\])\*\s*/g, (m, p1) => p1 + '\\cdot ');
    r = r.replace(/x\^(\d+|\{[^}]+\})x(?!\^)/g, 'x^$1\\cdot x');
    return r;
}

// --- 2. 정답 판정 및 채점 로직 ---

export function norm(s) {
    return (s || '').replace(/\$/g, '').replace(/\s+/g, '').toLowerCase();
}

export function fuzzyMatch(userAns, correctSa) {
    if (!userAns || !correctSa) return false;
    const n1 = norm(userAns), n2 = norm(correctSa);
    if (n1 === n2) return true;
    
    const toNum = s => {
        const v = parseFloat(String(s).replace(/[^0-9.\-]/g, ''));
        return isNaN(v) ? NaN : v;
    };
    const v1 = toNum(n1), v2 = toNum(n2);
    if (!isNaN(v1) && !isNaN(v2) && Math.abs(v1 - v2) < 0.01) return true;
    return false;
}

// --- 3. UI 업데이트 및 카드 생성 ---

export function renderRP(idx) {
    const rp = document.getElementById('rp');
    if (!state.problems[idx]) return;
    const { prob } = state.problems[idx];
    const uid = 'u' + idx;

    if (state.examMode && !state.problems._examDone) {
        rp.innerHTML = '<div class="rp-empty">🔒 제출 후 공개</div>';
        return;
    }

    const hints = Array.isArray(prob.hints) ? prob.hints : [];
    rp.innerHTML = `
        <div class="rpl">💡 문제 ${idx + 1} 풀이</div>
        <div class="fl">힌트</div>
        ${hints.map((hi, i) => `
            <div class="hint-item">
                <button class="htog" onclick="window.thint('${uid}h${i}',this)">힌트 ${i + 1} <span class="arr">▼</span></button>
                <div class="hbd" id="${uid}h${i}">${normalizeKaTeXDisplayText(hi)}</div>
            </div>`).join('')}
        <div><button class="rvb rva" onclick="window.trev('${uid}-a',this)">정답 확인</button>
        <div class="abox" id="${uid}-a">정답: ${normalizeKaTeXDisplayText(prob.ans)}</div></div>
        <div><button class="rvb rvs" onclick="window.trev('${uid}-s',this)">풀이 보기</button>
        <div class="sbox" id="${uid}-s">${normalizeKaTeXDisplayText(prob.sol)}</div></div>
    `;
    rm(rp);
}

export function selCard(idx) {
    state.selIdx = idx;
    document.querySelectorAll('.pcard').forEach((c, i) => c.classList.toggle('sel', i === idx));
    renderRP(idx);
}

export function mkCard(idx) {
    const { prob, sCh, sCi } = state.problems[idx];
    const card = document.createElement('div');
    card.className = 'pcard';
    const qN = normalizeKaTeXDisplayText(prob.q);

    let h = `
        <div class="ox"></div>
        <div class="ctop">
            <div class="cnum">문제 ${idx + 1}</div>
            ${state.examMode ? '' : `<button class="retry-btn" onclick="window.retry(${idx})">↺ 다시</button>`}
            <button class="wn-save-btn" onclick="window.wnSaveProblem(${idx})">📕 저장</button>
        </div>
        <div class="card-q">${qN}</div>
    `;

    const cardType = (state.examMode || state.mixMode) ? 
        (prob.type.includes('OX형') ? 'OX형' : (sCh && sCh.length ? '객관식' : '단답형')) : state.st.type;

    if (cardType === '객관식') {
        h += `<div class="choices">${sCh.map((c, i) => `
            <div class="cho" data-i="${i}"><span class="cn">${"①②③④⑤"[i]}</span>${normalizeKaTeXDisplayText(c)}</div>`).join('')}
        </div><div class="crow"><button class="cfm-btn" disabled>정답 확인</button></div>`;
    } else if (cardType === 'OX형') {
        h += `<div class="ox-btns">
            <button class="ox-choice" data-i="0">O</button>
            <button class="ox-choice" data-i="1">X</button>
        </div><div class="crow"><button class="cfm-btn" disabled>정답 확인</button></div>`;
    } else if (cardType === '단답형') {
        h += `<div class="short-wrap"><input class="sin" type="text" placeholder="정답 입력"/><div class="ans-rendered"></div></div><div class="fb"></div>`;
    } else {
        h += `<div class="essay-wrap"><textarea class="ein" placeholder="풀이 과정 입력"></textarea><button class="esub">채점하기</button></div><div class="fb"></div>`;
    }

    card.innerHTML = h;

    // --- 이벤트 바인딩 ---
    card.onclick = () => selCard(idx);

    // 객관식 클릭
    card.querySelectorAll('.cho').forEach(el => {
        el.onclick = (e) => {
            e.stopPropagation();
            if (state.pst[idx].submitted) return;
            card.querySelectorAll('.cho').forEach(c => c.classList.remove('pk'));
            el.classList.add('pk');
            state.pst[idx].picked = +el.dataset.i;
            card.querySelector('.cfm-btn').disabled = false;
        };
    });

    // OX 클릭
    card.querySelectorAll('.ox-choice').forEach(el => {
        el.onclick = (e) => {
            e.stopPropagation();
            if (state.pst[idx].submitted) return;
            card.querySelectorAll('.ox-choice').forEach(c => c.classList.remove('pk'));
            el.classList.add('pk');
            state.pst[idx].picked = +el.dataset.i;
            card.querySelector('.cfm-btn').disabled = false;
        };
    });

    // 확인 버튼 (제출)
    const cfmBtn = card.querySelector('.cfm-btn');
    if (cfmBtn) cfmBtn.onclick = (e) => {
        e.stopPropagation();
        window.doSubmit(idx);
    };

    return card;
}

// --- 4. 전역 함수 바인딩 (index.html에서 호출 가능하도록) ---

window.thint = (id, btn) => {
    const el = document.getElementById(id);
    el.classList.toggle('open');
    btn.querySelector('.arr').textContent = el.classList.contains('open') ? '▲' : '▼';
};

window.trev = (id, btn) => {
    const el = document.getElementById(id);
    el.classList.toggle('open');
    if (id.endsWith('-a')) btn.textContent = el.classList.contains('open') ? '정답 숨기기' : '정답 확인';
    else btn.textContent = el.classList.contains('open') ? '풀이 숨기기' : '풀이 보기';
};

window.retry = (idx) => {
    state.pst[idx] = { picked: -1, submitted: false, isOk: null, userText: '' };
    const cp = document.getElementById('cp');
    const cards = cp.querySelectorAll('.pcard');
    const newCard = mkCard(idx);
    cp.replaceChild(newCard, cards[idx]);
    rm(newCard);
    selCard(idx);
};

window.doSubmit = (idx) => {
    const ps = state.pst[idx];
    if (ps.submitted) return;
    const { prob, sCi } = state.problems[idx];
    const card = document.querySelectorAll('.pcard')[idx];
    
    ps.submitted = true;
    let isOk = ps.picked === sCi;
    ps.isOk = isOk;

    card.classList.add(isOk ? 'ok' : 'ng');
    const stamp = card.querySelector('.ox');
    if (stamp) { stamp.textContent = isOk ? '○' : '✕'; stamp.className = `ox ${isOk ? 'so' : 'sx'}`; }
    
    if (state.selIdx === idx) renderRP(idx);
};
