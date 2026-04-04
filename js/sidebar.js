import { state } from '../app.js';
import { GRADE_UNITS } from '../data/curriculum.js';

export function initSidebar() {
    document.querySelectorAll('#gradeG .grade-tab').forEach(b => {
        b.onclick = () => {
            document.querySelectorAll('#gradeG .grade-tab').forEach(x => x.classList.remove('on'));
            b.classList.add('on');
            state.st.grade = b.dataset.g;
            buildSubList(state.st.grade);
        };
    });
    
    document.querySelectorAll('#lvG .lv-btn').forEach(b => {
        b.onclick = () => {
            document.querySelectorAll('#lvG .lv-btn').forEach(x => {
                x.classList.remove('on');
                x.style = "";
            });
            b.classList.add('on');
            const c = b.dataset.c;
            b.style.borderColor = c;
            b.style.background = c + '18';
            b.style.color = c;
            state.st.lv = +b.dataset.lv;
            state.st.lvL = b.dataset.l;
            document.getElementById('lvHint').textContent = b.dataset.d;
        };
    });

    buildSubList('고1');
}

function buildSubList(grade) {
    const subjects = GRADE_UNITS[grade];
    const subjCont = document.getElementById('subjG');
    subjCont.innerHTML = '';
    subjects.forEach((subj, si) => {
        const sb = document.createElement('button');
        sb.className = 'grade-tab' + (si === 0 ? ' on' : '');
        sb.textContent = subj.subject;
        sb.onclick = () => {
            document.querySelectorAll('#subjG .grade-tab').forEach(x => x.classList.remove('on'));
            sb.classList.add('on');
            buildUnitButtons(grade, si);
        };
        subjCont.appendChild(sb);
    });
    buildUnitButtons(grade, 0);
}

function buildUnitButtons(grade, si) {
    const units = GRADE_UNITS[grade][si].units;
    const cont = document.getElementById('subG');
    cont.innerHTML = '';
    units.forEach((u, i) => {
        const b = document.createElement('button');
        b.className = 'sub-btn' + (i === 0 ? ' on' : '');
        b.innerHTML = `${u.v}<div class="sd">${u.d}</div>`;
        b.onclick = () => {
            document.querySelectorAll('#subG .sub-btn').forEach(x => x.classList.remove('on'));
            b.classList.add('on');
            state.st.sub = u.v;
        };
        cont.appendChild(b);
    });
    state.st.sub = units[0].v;
}