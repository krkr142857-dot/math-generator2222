import { state } from '../app.js';
import { renderMixedLatex, mkUpdate } from './renderer.js';

const MKB = [
    [{l:'x',v:'x',c:'mk-v'},{l:'y',v:'y',c:'mk-v'},{l:'z',v:'z',c:'mk-v'},{l:'k',v:'k',c:'mk-v'},{l:'m',v:'m',c:'mk-v'},{l:'n',v:'n',c:'mk-v'}],
    [{l:'a',v:'a',c:'mk-v'},{l:'b',v:'b',c:'mk-v'},{l:'c',v:'c',c:'mk-v'},{l:'d',v:'d',c:'mk-v'},{l:'←',v:'\\Leftarrow ',c:'mk-o'},{l:'→',v:'\\Rightarrow ',c:'mk-o'}],
    [{l:'xⁿ',v:'^{}',o:-1,c:'mk-p'},{l:'∩',v:'\\cap ',c:'mk-o'},{l:'∪',v:'\\cup ',c:'mk-o'},{l:'∅',v:'\\emptyset ',c:'mk-o'},{l:'⊂',v:'\\subset ',c:'mk-o'},{l:'∈',v:'\\in ',c:'mk-o'}],
    [{l:'Σ',v:'\\sum_{n=}^{}',o:-4,c:'mk-f'},{l:'lim',v:'\\lim_{n\\to }',c:'mk-f'},{l:'∫',v:'\\int_{}^{}',o:-4,c:'mk-f'},{l:'∞',v:'\\infty ',c:'mk-v'},{l:'(',v:'()',o:-1,c:'mk-o'},{l:')',v:')',c:'mk-o'}],
    [{l:'√',v:'\\sqrt{}',o:-1,c:'mk-f'},{l:'e',v:'e^{}',o:-1,c:'mk-f'},{l:'ln',v:'\\ln(',o:0,c:'mk-f'},{l:'log',v:'\\log_{}()',o:-3,c:'mk-f'},{l:'{',v:'{}',o:-1,c:'mk-o'},{l:'}',v:'}',c:'mk-o'}],
    [{l:'sin',v:'\\sin(',o:0,c:'mk-f'},{l:'cos',v:'\\cos(',o:0,c:'mk-f'},{l:'tan',v:'\\tan(',o:0,c:'mk-f'},{l:'°',v:'^\\circ ',c:'mk-p'},{l:'θ',v:'\\theta ',c:'mk-v'},{l:'π',v:'\\pi ',c:'mk-v'}]
];

export function initKeyboards() {
    const mini = document.getElementById('mkGridMini');
    const input = document.getElementById('mkInput');
    const applyBtn = document.getElementById('mkApplyBtn');

    if (mini) {
        mini.innerHTML = '';
        MKB.flat().forEach(btn => {
            const b = document.createElement('button');
            b.className = `mkb ${btn.c}`; b.textContent = btn.l;
            b.onclick = () => {
                const s = input.selectionStart;
                input.value = input.value.slice(0, s) + btn.v + input.value.slice(input.selectionEnd);
                const pos = s + btn.v.length + (btn.o || 0);
                input.setSelectionRange(pos, pos); input.focus(); mkUpdate();
            };
            mini.appendChild(b);
        });
    }

    input?.addEventListener('input', mkUpdate);

    applyBtn.onclick = () => {
        if (state.selIdx === -1) return alert("문제를 선택하세요.");
        const val = input.value;
        const target = document.querySelectorAll('.pcard')[state.selIdx]?.querySelector('input, textarea');
        if (target) {
            target.value += val; input.value = ""; mkUpdate();
            target.dispatchEvent(new Event('input'));
        }
    };
}

window.toggleKpExpand = () => {
    const ex = document.getElementById('kpExpandable');
    ex.classList.toggle('expanded');
    document.getElementById('kpToggleBtn').textContent = ex.classList.contains('expanded') ? "✕" : "⌨";
};
