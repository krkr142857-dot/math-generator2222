// js/utils.js - 모든 유틸리티 함수 통합
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

function cleanExpr(s) {
    if (typeof s !== 'string') return String(s);
    let r = s;
    r = r.replace(/(?<![\d.])1x/g, 'x').replace(/\+1x/g, '+x').replace(/-1x/g, '-x');
    r = r.replace(/[+\-]?0x(\^?\{?\d*\}?)?/g, '').replace(/([+\-])0(?![.\d])/g, '');
    r = r.replace(/\+\+/g, '+').replace(/\+-/g, '-').replace(/--/g, '+').replace(/^\+/, '');
    return r || '0';
}

export function cleanLatex(s) {
    s = String(s);
    if (((s.match(/\$/g) || []).length) % 2 === 1) s += '$';
    return s.replace(/\$([^$]+)\$/g, (m, expr) => '$' + cleanExpr(expr) + '$');
}

export function makeWrongChoices(correct, wrongs) {
    const cc = cleanLatex(String(correct).trim());
    const normW = w => String(w).replace(/[\$\s\\]/g, '').toLowerCase();
    const normC = normW(cc);
    const seen = new Set([normC]);
    const clean = wrongs.map(w => cleanLatex(String(w).trim())).filter(w => {
        const nw = normW(w);
        if (!w || w === cc || seen.has(nw)) return false;
        seen.add(nw); return true;
    });
    const all = shuf([cc, ...clean.slice(0, 4)]);
    return { choices: all, ci: all.indexOf(cc) };
}
