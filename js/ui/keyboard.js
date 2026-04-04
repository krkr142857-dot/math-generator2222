import { state, setters, renderMixedLatex } from '../app.js';
// 주의: app.js에서 renderMixedLatex를 다시 export 해주는 구조이거나 
// 혹은 renderer.js에서 직접 가져와야 합니다. 
// 여기서는 일관성을 위해 renderer.js에서 직접 가져오도록 설정합니다.
import { renderMixedLatex as rendererML } from './renderer.js';

// --- 1. 키보드 레이아웃 데이터 ---

const MKB = [
    [{l:'x',v:'x',c:'mk-v'},{l:'y',v:'y',c:'mk-v'},{l:'z',v:'z',c:'mk-v'},{l:'k',v:'k',c:'mk-v'},{l:'m',v:'m',c:'mk-v'},{l:'n',v:'n',c:'mk-v'}],
    [{l:'a',v:'a',c:'mk-v'},{l:'b',v:'b',c:'mk-v'},{l:'c',v:'c',c:'mk-v'},{l:'d',v:'d',c:'mk-v'},{l:'←',v:'\\Leftarrow ',c:'mk-o'},{l:'→',v:'\\Rightarrow ',c:'mk-o'}],
    [{l:'xⁿ',v:'^{}',o:-1,c:'mk-p'},{l:'∩',v:'\\cap ',c:'mk-o'},{l:'∪',v:'\\cup ',c:'mk-o'},{l:'∅',v:'\\emptyset ',c:'mk-o'},{l:'⊂',v:'\\subset ',c:'mk-o'},{l:'∈',v:'\\in ',c:'mk-o'}],
    [{l:'Σ',v:'\\sum_{n=}^{}',o:-4,c:'mk-f'},{l:'lim',v:'\\lim_{n\\to }',c:'mk-f'},{l:'∫',v:'\\int_{}^{}',o:-4,c:'mk-f'},{l:'∞',v:'\\infty ',c:'mk-v'},{l:'(',v:'()',o:-1,c:'mk-o'},{l:')',v:')',c:'mk-o'}],
    [{l:'√',v:'\\sqrt{}',o:-1,c:'mk-f'},{l:'e',v:'e^{}',o:-1,c:'mk-f'},{l:'ln',v:'\\ln(',o:0,c:'mk-f'},{l:'log',v:'\\log_{}()',o:-3,c:'mk-f'},{l:'{',v:'{}',o:-1,c:'mk-o'},{l:'}',v:'}',c:'mk-o'}],
    [{l:'sin',v:'\\sin(',o:0,c:'mk-f'},{l:'cos',v:'\\cos(',o:0,c:'mk-f'},{l:'tan',v:'\\tan(',o:0,c:'mk-f'},{l:'°',v:'^\\circ ',c:'mk-p'},{l:'θ',v:'\\theta ',c:'mk-v'},{l:'π',v:'\\pi ',c:'mk-v'}]
];

const MATH_EXP = [
    [{l:'xⁿ',v:'^{}',o:-1,c:'mk-p'},{l:'√',v:'\\sqrt{}',o:-1,c:'mk-f'},{l:'frac',v:'\\frac{}{}',o:-3,c:'mk-f'},{l:'ln',v:'\\ln ',c:'mk-f'},{l:'log',v:'\\log_{ }',o:-2,c:'mk-f'},{l:'e',v:'e^{}',o:-1,c:'mk-f'},{l:'∞',v:'\\infty ',c:'mk-v'},{l:'!',v:'!',c:'mk-o'}],
    [{l:'Σ',v:'\\sum_{n=}^{}',o:-4,c:'mk-f'},{l:'lim',v:'\\lim_{n\\to }',c:'mk-f'},{l:'∫',v:'\\int_{}^{}',o:-4,c:'mk-f'},{l:'f(x)',v:'f(x)',c:'mk-v'},{l:'f\'(x)',v:'f\'(x)',c:'mk-v'},{l:'\'',v:'\'',c:'mk-o'},{l:'g∘f',v:'g\\circ f',c:'mk-o'},{l:'∘',v:'\\circ ',c:'mk-o'}]
];

const NUM_EXP = [
    [{l:'7',v:'7',c:'mk-n'},{l:'8',v:'8',c:'mk-n'},{l:'9',v:'9',c:'mk-n'},{l:'+',v:'+',c:'mk-o'}],
    [{l:'4',v:'4',c:'mk-n'},{l:'5',v:'5',c:'mk-n'},{l:'6',v:'6',c:'mk-n'},{l:'-',v:'-',c:'mk-o'}],
    [{l:'1',v:'1',c:'mk-n'},{l:'2',v:'2',c:'mk-n'},{l:'3',v:'3',c:'mk-n'},{l:'×',v:'\\times ',c:'mk-o'}],
    [{l:'0',v:'0',c:'mk-n'},{l:'.',v:'.',c:'mk-n'},{l:'=',v:'=',c:'mk-o'},{l:'÷',v:'\\div ',c:'mk-o'}]
];

// --- 2. 핵심 제어 함수 ---

export function mkUpdate() {
    const val = document.getElementById('mkInput').value;
    const preview = document.getElementById('mkRendered');
    if (!preview) return;
    rendererML(val, preview);
}

export function mkInsert(t, o = 0) {
    const ta = document.getElementById('mkInput');
    const s = ta.selectionStart;
    const e = ta.selectionEnd;
    ta.value = ta.value.slice(0, s) + t + ta.value.slice(e);
    const p = s + t.length + o;
    ta.setSelectionRange(p, p);
    ta.focus();
    mkUpdate();
}

export function mkBack() {
    const ta = document.getElementById('mkInput');
    const s = ta.selectionStart;
    if (s > 0) {
        ta.value = ta.value.slice(0, s - 1) + ta.value.slice(s);
        ta.setSelectionRange(s - 1, s - 1);
    }
    ta.focus();
    mkUpdate();
}

export function mkClear() {
    document.getElementById('mkInput').value = "";
    mkUpdate();
}

// --- 3. 초기화 로직 ---

export function initKeyboards() {
    const mini = document.getElementById('mkGridMini');
    const input = document.getElementById('mkInput');

    if (mini) {
        mini.innerHTML = '';
        MKB.flat().forEach(btn => {
            const b = document.createElement('button');
            b.className = `mkb ${btn.c || ''}`;
            b.textContent = btn.l;
            b.onclick = () => mkInsert(btn.v, btn.o || 0);
            mini.appendChild(b);
        });
    }

    // 입력기 직접 타이핑 감지
    input?.addEventListener('input', mkUpdate);

    // 답안에 입력 버튼
    document.getElementById('mkApplyBtn').onclick = () => {
        if (state.selIdx === -1) return alert("문제를 먼저 선택하세요.");
        const val = input.value;
        const card = document.querySelectorAll('.pcard')[state.selIdx];
        const targetInp = card.querySelector('.sin, .ein');
        
        if (targetInp && !targetInp.disabled) {
            targetInp.value += val;
            input.value = "";
            mkUpdate();
            // 입력 받은 카드 쪽의 미리보기 강제 업데이트
            const event = new Event('input');
            targetInp.dispatchEvent(event);
        }
    };

    // 특수 기능 버튼 바인딩
    const gridMini = document.getElementById('mkGridMini');
    if (gridMini) {
        // 기존 렌더링 외에 추가 제어 버튼 (AC, Back 등)
        const controls = [
            {l:'⌫', act:'back', c:'mk-c'},
            {l:'AC', act:'clear', c:'mk-c'}
        ];
        controls.forEach(btn => {
            const b = document.createElement('button');
            b.className = `mkb ${btn.c}`;
            b.textContent = btn.l;
            b.onclick = btn.act === 'back' ? mkBack : mkClear;
            gridMini.appendChild(b);
        });
    }
}

// --- 4. 전역 확장 제어 (Window 바인딩) ---

window.toggleKpExpand = () => {
    const ex = document.getElementById('kpExpandable');
    const btn = document.getElementById('kpToggleBtn');
    const mini = document.getElementById('mkGridMini');
    const full = document.getElementById('mkGridFull');

    if (ex.classList.contains('expanded')) {
        ex.classList.remove('expanded');
        btn.textContent = "⌨";
    } else {
        ex.classList.add('expanded');
        btn.textContent = "✕";
        // 확장 시 추가 패널(수학 확장/숫자 패드) 렌더링 로직 추가 가능
    }
};

// LaTeX 드래그 복사 기능
document.getElementById('latexCopyBtn')?.addEventListener('click', () => {
    const sel = window.getSelection().toString();
    if (sel) {
        document.getElementById('mkInput').value += sel;
        mkUpdate();
    } else {
        alert("복사할 수식 영역을 드래그하세요.");
    }
});
