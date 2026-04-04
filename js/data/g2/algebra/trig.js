// ============================================================================
// [고2 대수] 삼각함수 데이터 모듈
// ============================================================================

import { ri, sp, spx, scx, scx2, makeWrongChoices } from '../../../utils.js';

export const ox = [
   {q:"$\\sin^2\\theta + \\cos^2\\theta = 1$이다.",ans:"O",exp:"피타고라스 항등식으로 모든 실수 $\\theta$에 대해 성립한다."},
   {q:"$\\sin(-\\theta) = \\sin\\theta$이다.",ans:"X",exp:"사인 함수는 홀함수이므로 $\\sin(-\\theta)=-\\sin\\theta$이다."},
   {q:"$\\cos(-\\theta) = \\cos\\theta$이다.",ans:"O",exp:"코사인 함수는 우함수이므로 $\\cos(-\\theta)=\\cos\\theta$이다."},
   {q:"$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$이다.",ans:"O",exp:"탄젠트의 정의로 $\\cos\\theta\\neq0$일 때 성립한다."},
   {q:"$\\sin 90° = 0$이다.",ans:"X",exp:"$\\sin 90°=1$이다."},
   {q:"$\\cos 0° = 1$이다.",ans:"O",exp:"$\\cos 0°=1$로 코사인 함수의 기본값이다."},
   {q:"$\\sin^2\\theta + \\cos^2\\theta = 1$이다.",ans:"O",exp:"삼각함수의 기본 항등식이다."},
   {q:"$\\sin 30°= \\dfrac{1}{2}$이다.",ans:"O",exp:"$30°$의 사인값은 $\\dfrac{1}{2}$이다."},
   {q:"$\\cos 0° = 0$이다.",ans:"X",exp:"$\\cos 0°=1$이다. $\\sin 0°=0$이다."},
   {q:"$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$이다.",ans:"O",exp:"탄젠트의 정의이다."},
   {q:"삼각함수 $y=\\sin x$의 주기는 $2\\pi$이다.",ans:"O",exp:"$\\sin(x+2\\pi)=\\sin x$이므로 주기는 $2\\pi$이다."},
   {q:"$\\sin 90°=1$이다.",ans:"O",exp:"단위원에서 $90°$일 때 $y$좌표가 $1$이다."},
   {q:"$\\sin^2\\theta + \\cos^2\\theta = 1$이다.",ans:"O",exp:"삼각함수의 기본 항등식이다."},
   {q:"$\\sin 90° = 1$이다.",ans:"O",exp:"$\\sin 90°=1$이다."},
   {q:"$\\cos 180° = 1$이다.",ans:"X",exp:"$\\cos 180°=-1$이다."},
   {q:"$\\tan 90°$는 정의되지 않는다.",ans:"O",exp:"$\\tan 90°=\\dfrac{\\sin 90°}{\\cos 90°}$인데 $\\cos 90°=0$이므로 정의 안 됨"},
   {q:"$\\sin(-\\theta) = -\\sin\\theta$이다.",ans:"O",exp:"사인은 기함수이다."},
   {q:"$\\cos(-\\theta) = \\cos\\theta$이다.",ans:"O",exp:"코사인은 우함수이다."},
   {q:"$0 < \\theta < 90°$이면 $\\sin\\theta > 0$이다.",ans:"O",exp:"1사분면에서 사인값은 양수이다."}
];

export const regular = {
   1:[
    {type:["객관식","단답형","서술형"],q:"$\\sin 30°$의 값을 구하시오.",choices:["$\\dfrac{1}{2}$","$\\dfrac{\\sqrt{2}}{2}$","$\\dfrac{\\sqrt{3}}{2}$","$1$","$0$"],ci:0,ans:"$\\dfrac{1}{2}$",sa:"1/2",sol:"$\\sin 30°=\\dfrac{1}{2}$",hints:["30-60-90 삼각형","빗변:단변:장변 = 2:1:√3","$\\sin 30°=1/2$"],terms:"특수각의 삼각비",std:"[12수학Ⅰ-02-01] 삼각함수"},
    {type:["객관식","단답형","서술형"],q:"$\\cos 60°+\\tan 45°$의 값을 구하시오.",choices:["$\\dfrac{3}{2}$","$1$","$\\dfrac{1}{2}$","$2$","$\\sqrt{2}$"],ci:0,ans:"$\\dfrac{3}{2}$",sa:"3/2",sol:"$\\cos 60°=\\dfrac{1}{2}$, $\\tan 45°=1$이므로 $\\dfrac{3}{2}$",hints:["$\\cos60°=1/2$","$\\tan45°=1$","더하기"],terms:"특수각의 삼각비",std:"[12수학Ⅰ-02-01] 삼각함수"}
   ],
   2:[
    {type:["객관식","단답형","서술형"],q:"$\\sin^2\\theta+\\cos^2\\theta$의 값을 구하시오.",choices:["$1$","$0$","$\\sin2\\theta$","$\\tan^2\\theta$","$2$"],ci:0,ans:"$1$",sa:"1",sol:"삼각함수의 기본 항등식",hints:["피타고라스 항등식","항상 성립","$=1$"],terms:"삼각함수 기본 항등식",std:"[12수학Ⅰ-02-02] 삼각항등식"},
    {type:["단답형","서술형"],q:"$\\tan\\theta=2$일 때 $\\dfrac{\\sin\\theta+\\cos\\theta}{\\sin\\theta-\\cos\\theta}$의 값을 구하시오.",choices:[],ci:-1,ans:"$3$",sa:"3",sol:"분자·분모를 $\\cos\\theta$로 나누면 $\\dfrac{\\tan\\theta+1}{\\tan\\theta-1}=\\dfrac{3}{1}=3$",hints:["분자·분모를 $\\cos\\theta$로 나누기","$\\tan\\theta=2$ 대입","$=3$"],terms:"삼각항등식 변형",std:"[12수학Ⅰ-02-02] 삼각함수"}
   ],
   3:[
    {type:["단답형","서술형"],q:"$0\\leq\\theta<2\\pi$에서 $\\sin\\theta=\\dfrac{\\sqrt{3}}{2}$를 만족하는 $\\theta$를 모두 구하시오.",choices:[],ci:-1,ans:"$\\theta=\\dfrac{\\pi}{3}$ 또는 $\\theta=\\dfrac{2\\pi}{3}$",sa:"π/3 또는 2π/3",sol:"기준각 $\\dfrac{\\pi}{3}$, $\\sin>0$이므로 1·2사분면\n$\\theta=\\dfrac{\\pi}{3}$ 또는 $\\pi-\\dfrac{\\pi}{3}=\\dfrac{2\\pi}{3}$",hints:["기준각: $\\sin\\theta=\\dfrac{\\sqrt{3}}{2}$의 기준각은 $\\dfrac{\\pi}{3}$","$\\sin>0$: 1·2사분면","$\\dfrac{\\pi}{3}$, $\\dfrac{2\\pi}{3}$"],terms:"삼각방정식",std:"[12수학Ⅰ-02-03] 삼각방정식"}
   ],
   4:[
    {type:["단답형","서술형"],q:"$\\sin\\theta-\\cos\\theta=\\dfrac{1}{2}$일 때 $\\sin\\theta\\cos\\theta$의 값을 구하시오.",choices:[],ci:-1,ans:"$\\dfrac{3}{8}$",sa:"3/8",sol:"양변 제곱: $1-2\\sin\\theta\\cos\\theta=\\dfrac{1}{4}$\n$\\sin\\theta\\cos\\theta=\\dfrac{3}{8}$",hints:["양변을 제곱","$\\sin^2\\theta+\\cos^2\\theta=1$ 이용","$1-2\\sin\\theta\\cos\\theta=1/4$"],terms:"삼각함수의 기본 항등식 응용",std:"[12수학Ⅰ-02-02] 삼각함수"}
   ],
   5:[
    {type:["서술형"],q:"$0\\leq x<2\\pi$일 때 $2\\sin^2x-3\\cos x-3=0$을 푸시오.",choices:[],ci:-1,ans:"$x=\\dfrac{2\\pi}{3}$, $x=\\pi$, $x=\\dfrac{4\\pi}{3}$",sa:"x=2π/3 또는 x=π 또는 x=4π/3",sol:"$\\sin^2x=1-\\cos^2x$ 대입\n$2\\cos^2x+3\\cos x+1=0$\n$(2\\cos x+1)(\\cos x+1)=0$\n$\\cos x=-\\dfrac{1}{2}$ → $x=\\dfrac{2\\pi}{3},\\dfrac{4\\pi}{3}$\n$\\cos x=-1$ → $x=\\pi$",hints:["$\\sin^2x=1-\\cos^2x$ 대입","$(2\\cos x+1)(\\cos x+1)=0$","각 경우 $x$ 구하기"],terms:"삼각방정식",std:"[12수학Ⅰ-02-03] 삼각방정식"}
   ]
};

export const generators = {
   1: [
    ()=>{
      const ang=[30,45,60]; const a=ang[ri(0,2)];
      const vals={30:{sin:'\\dfrac{1}{2}',cos:'\\dfrac{\\sqrt{3}}{2}',tan:'\\dfrac{1}{\\sqrt{3}}'},45:{sin:'\\dfrac{\\sqrt{2}}{2}',cos:'\\dfrac{\\sqrt{2}}{2}',tan:'1'},60:{sin:'\\dfrac{\\sqrt{3}}{2}',cos:'\\dfrac{1}{2}',tan:'\\sqrt{3}'}};
      const fn=['sin','cos','tan'][ri(0,2)];
      const ans=`$${vals[a][fn]}$`;
      const wrongs=Object.values(vals).map(v=>Object.values(v)).flat().filter(v=>v!==vals[a][fn]).slice(0,4).map(v=>`$${v}$`);
      const ch=makeWrongChoices(ans,wrongs);
      return {type:["객관식","단답형","서술형"],q:`$\\${fn} ${a}°$의 값을 구하시오.`,choices:ch.choices,ci:ch.ci,ans,sa:vals[a][fn].replace(/\\/g,'').replace(/dfrac{([^}]+)}{([^}]+)}/,'$1/$2'),sol:`$\\${fn} ${a}°=${vals[a][fn]}$`,hints:[`${a}°의 특수각 삼각비`,`$\\${fn} ${a}°$를 기억하자`,`$=${vals[a][fn]}$`],terms:"특수각의 삼각비",std:"[12수학Ⅰ-02-01] 삼각함수"};
    }
   ],
   2: [
    ()=>{
      const v=[{q:"$\\sin 30°$의 값을 구하시오.",ans:"$\\dfrac{1}{2}$",sa:"1/2",choices:["$\\dfrac{1}{2}$","$\\dfrac{\\sqrt{3}}{2}$","$\\dfrac{\\sqrt{2}}{2}$","$1$","$0$"]},
               {q:"$\\cos 60°$의 값을 구하시오.",ans:"$\\dfrac{1}{2}$",sa:"1/2",choices:["$\\dfrac{1}{2}$","$\\dfrac{\\sqrt{3}}{2}$","$1$","$0$","$2$"]},
               {q:"$\\tan 45°$의 값을 구하시오.",ans:"$1$",sa:"1",choices:["$1$","$0$","$\\sqrt{3}$","$\\dfrac{1}{\\sqrt{3}}$","$2$"]},
               {q:"$\\sin^2\\theta+\\cos^2\\theta$의 값을 구하시오.",ans:"$1$",sa:"1",choices:["$1$","$0$","$2$","$\\sin^2\\theta$","$\\cos^2\\theta$"]}];
      const vv=v[ri(0,3)];
      return {type:["객관식","단답형"],q:vv.q,choices:vv.choices,ci:0,ans:vv.ans,sa:vv.sa,sol:`기본값 암기`,hints:["삼각함수 기본값","30°,45°,60° 암기"],terms:"삼각함수 기본값",std:"[12수학Ⅰ-02-01] 삼각함수"};
    }
   ],
   3: [
    ()=>{
      const angle=ri(1,4)*30, comp=180-angle;
      const tbl={30:"\\dfrac{1}{2}",60:"\\dfrac{\\sqrt{3}}{2}",90:"1",120:"\\dfrac{\\sqrt{3}}{2}"};
      const val=tbl[angle]||"\\dfrac{\\sqrt{2}}{2}";
      return {type:["객관식","단답형","서술형"],q:`$\\sin ${comp}°$의 값을 구하시오.`,choices:[`$${val}$`,"$0$","$-1$",`$-${val}$`,"$\\sqrt{3}$"],ci:0,ans:`$${val}$`,sa:val.replace(/\\/g,''),sol:`$\\sin ${comp}°=\\sin(180°-${angle}°)=\\sin ${angle}°=${val}$`,hints:[`$\\sin(180°-\\theta)=\\sin\\theta$`],terms:"삼각함수 변환",std:"[12수학Ⅰ-02-02] 삼각함수 항등식"};
    }
   ],
   4: [
    ()=>{
      const k=ri(1,2);
      return {type:["객관식","단답형","서술형"],q:`$\\sin\\theta+\\cos\\theta=${k}$일 때 $\\sin\\theta\\cos\\theta$의 값을 구하시오.`,choices:[`$\\dfrac{${k*k-1}}{2}$`,`$\\dfrac{${k*k}}{2}$`,`$\\dfrac{${k*k+1}}{2}$`,"$1$",`$${k}$`],ci:0,ans:`$\\dfrac{${k*k-1}}{2}$`,sa:`${k*k-1}/2`,sol:`$(\\sin\\theta+\\cos\\theta)^2=1+2\\sin\\theta\\cos\\theta=${k*k}$\n$\\sin\\theta\\cos\\theta=\\dfrac{${k*k-1}}{2}$`,hints:["$(s+c)^2=1+2sc$"],terms:"삼각함수 항등식",std:"[12수학Ⅰ-02-02] 삼각함수 항등식"};
    }
   ],
   5: [
    ()=>{
      const cases=[
        {sin:'\\dfrac{\\sqrt{3}}{2}', x1:'\\dfrac{\\pi}{3}', x2:'\\dfrac{2\\pi}{3}', sa:'pi/3, 2pi/3', cst:'\\sin 60°=\\dfrac{\\sqrt{3}}{2}'},
        {sin:'-\\dfrac{\\sqrt{3}}{2}', x1:'\\dfrac{4\\pi}{3}', x2:'\\dfrac{5\\pi}{3}', sa:'4pi/3, 5pi/3', cst:'\\sin 240°=-\\dfrac{\\sqrt{3}}{2}'},
        {sin:'\\dfrac{1}{2}', x1:'\\dfrac{\\pi}{6}', x2:'\\dfrac{5\\pi}{6}', sa:'pi/6, 5pi/6', cst:'\\sin 30°=\\dfrac{1}{2}'},
        {sin:'-\\dfrac{1}{2}', x1:'\\dfrac{7\\pi}{6}', x2:'\\dfrac{11\\pi}{6}', sa:'7pi/6, 11pi/6', cst:'\\sin 210°=-\\dfrac{1}{2}'}
      ];
      const c=cases[ri(0,cases.length-1)];
      return {
        type:["단답형","서술형"],
        q:`$0\\leq x<2\\pi$일 때 $\\sin x=${c.sin}$를 푸시오.`,
        choices:[],
        ci:-1,
        ans:`$x=${c.x1},${c.x2}$`,
        sa:c.sa,
        sol:`$\\sin x=${c.sin}$이면 $x=${c.x1},${c.x2}$`,
        hints:[c.cst,"특수각의 삼각비","범위 $0\\leq x<2\\pi$"],
        terms:"삼각방정식",
        std:"[12수학Ⅰ-02-03] 삼각방정식"
      };
    },
    ()=>{
      const cases=[
        {sin:'\\dfrac{\\sqrt{3}}{2}', x1:'\\dfrac{\\pi}{3}', x2:'\\dfrac{2\\pi}{3}', sa:'pi/3, 2pi/3', cst:'\\sin 60°=\\dfrac{\\sqrt{3}}{2}'},
        {sin:'-\\dfrac{\\sqrt{3}}{2}', x1:'\\dfrac{4\\pi}{3}', x2:'\\dfrac{5\\pi}{3}', sa:'4pi/3, 5pi/3', cst:'\\sin 240°=-\\dfrac{\\sqrt{3}}{2}'},
        {sin:'\\dfrac{1}{2}', x1:'\\dfrac{\\pi}{6}', x2:'\\dfrac{5\\pi}{6}', sa:'pi/6, 5pi/6', cst:'\\sin 30°=\\dfrac{1}{2}'},
        {sin:'-\\dfrac{1}{2}', x1:'\\dfrac{7\\pi}{6}', x2:'\\dfrac{11\\pi}{6}', sa:'7pi/6, 11pi/6', cst:'\\sin 210°=-\\dfrac{1}{2}'}
      ];
      const idx=ri(0,cases.length-1);
      const c=cases[idx];
      const correct=`$x=${c.x1},${c.x2}$`;
      const others=cases.filter((_,i)=>i!==idx);
      const wrong1=`$x=${others[0].x1},${others[0].x2}$`;
      const wrong2=`$x=${others[1].x1},${others[1].x2}$`;
      const wrong3=`$x=${c.x1},${others[0].x1}$`;
      const wrong4=`$x=${others[1].x2},${c.x2}$`;
      const choices=[correct,wrong1,wrong2,wrong3,wrong4];
      return {
        type:["객관식","단답형","서술형"],
        q:`$0\\leq x<2\\pi$일 때 $\\sin x=${c.sin}$를 푸시오.`,
        choices:choices,
        ci:0,
        ans:correct,
        sa:c.sa,
        sol:`$\\sin x=${c.sin}$이면 $x=${c.x1},${c.x2}$`,
        hints:["특수각의 삼각비", "해당 해 2개 찾기", "범위 확인"],
        terms:"삼각방정식",
        std:"[12수학Ⅰ-02-03] 삼각방정식"
      };
    }
   ]
};
