import { state } from '../app.js';
import { renderMixedLatex, mkUpdate } from './renderer.js';

const MKB = [
    [{l:'x',v:'x',c:'mk-v'},{l:'y',v:'y',c:'mk-v'},{l:'z',v:'z',c:'mk-v'},{l:'k',v:'k',c:'mk-v'},{l:'m',v:'m',c:'mk-v'},{l:'n',v:'n',c:'mk-v'}],
    [{l:'a',v:'a',c:'mk-v'},{l:'b',v:'b',c:'mk-v'},{l:'c',v:'c',c:'mk-v'},{l:'d',v:'d',c:'mk-v'},{l:'←',v:'\\Leftarrow ',c:'mk-o'},{l:'→',v:'\\Rightarrow ',c:'mk-o'}],
    [{l:'xⁿ',v:'^{}',o:-1,c:'mk-p'},{l:'∩',v:'\\cap ',c:'mk-o'},{l:'∪',v:'\\cup ',c:'mk-o'},{l:'∅',v:'\\emptyset ',c:'mk-o'},{l:'⊂',v:'\\subset ',c:'mk-o'},{l:'∈',v:'\\in ',c:'mk-o'}],
    [{l:'Σ',v:'\\sum_{n=}^{}',o:-4,c:'mk-f'},{l:'lim',v:'\\lim_{n\\to }',c:'mk-f'},{l:'∫',v:'\\int_{}^{}',o:-4,c:'mk-f'},{l:'∞',v:'\\infty ',c:'mk-v'},{l:'(',v:'()',o:-1,c:'mk-o'},{l:')',v:')',c:'mk-o'}],
    [{l:'√',v:'\\sqrt{}',o:-1,c:'mk-f'},{l:'e',v:'e^{}',o:-1,c:'mk-f'},{l:'ln',v:'\\ln(',o:0,c:'mk-f'},{l:'log',v:'\\log_{}()',o:-3,c:'mk-f'},{l:'{',v:'{}',o:-1,c:'mk-o'},{l:'}',v:'}',c:'mk-o'}],
    [{l:'sin',v:'\\sin(',o:0,c:'mk-f'},{l:'cos',v:'\\cos(',o:0,c:'mk-f'},{l:'tan',v:'\\tan(',o:0,c:'mk-f'},{l:'°',v:'^\\circ ',c:'mk-p'},{l:'θ',v:'\\theta ',c:'mk-v'},{l:'π',v:'\\pi ',c:'mk-v'}],
    [{l:'7',v:'7',c:'mk-n'},{l:'8',v:'8',c:'mk-n'},{l:'9',v:'9',c:'mk-n'},{l:'+',v:'+',c:'mk-o'},{l:'-',v:'-',c:'mk-o'},{l:'=',v:'=',c:'mk-o'}],
    [{l:'4',v:'4',c:'mk-n'},{l:'5',v:'5',c:'mk-n'},{l:'6',v:'6',c:'mk-n'},{l:'×',v:'\\times ',c:'mk-o'},{l:'÷',v:'\\div ',c:'mk-o'},{l:'≠',v:'\\neq ',c:'mk-o'}],
    [{l:'1',v:'1',c:'mk-n'},{l:'2',v:'2',c:'mk-n'},{l:'3',v:'3',c:'mk-n'},{l:'<',v:'<',c:'mk-o'},{l:'>',v:'>',c:'mk-o'},{l:'±',v:'\\pm ',c:'mk-o'}],
    [{l:',',v:',',c:'mk-n'},{l:'0',v:'0',c:'mk-n'},{l:'.',v:'.',c:'mk-n'},{l:'≤',v:'\\leq ',c:'mk-o'},{l:'≥',v:'\\geq ',c:'mk-o'},{l:'|x|',v:'\\left|{}\right|',o:-8,c:'mk-p'}],
    [{l:'∴',v:'\\therefore ',c:'mk-o'},{l:'이전',act:'prev',c:'mk-v'},{l:'다음',act:'next',c:'mk-v'},{l:'↵',v:'\n',c:'mk-n'},{l:'⌫',act:'back',c:'mk-c'},{l:'AC',act:'clear',c:'mk-c'}]
];

export function initKeyboards() {
    const mini = document.getElementById('mkGridMini');
    const input = document.getElementById('mkInput');
    if (mini) {
        mini.innerHTML = '';
        MKB.flat().forEach(btn => {
            const b = document.createElement('button');
            b.className = `mkb ${btn.c}`; b.textContent = btn.l;
            b.onclick = () => {
                if(btn.act === 'back') { input.value = input.value.slice(0, -1); }
                else if(btn.act === 'clear') { input.value = ''; }
                else if(btn.v) { input.value += btn.v; }
                mkUpdate();
            };
            mini.appendChild(b);
        });
    }
    document.getElementById('mkApplyBtn').onclick = () => {
        if (state.selIdx === -1) return alert("문제를 선택하세요.");
        const target = document.querySelectorAll('.pcard')[state.selIdx]?.querySelector('input, textarea');
        if (target) { target.value += input.value; input.value = ""; mkUpdate(); target.dispatchEvent(new Event('input')); }
    };
}
window.toggleKpExpand = () => document.getElementById('kpExpandable').classList.toggle('expanded');
