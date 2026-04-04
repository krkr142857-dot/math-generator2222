// ============================================================================
// [고1 공통수학1] 방정식과 부등식 데이터 모듈
// ============================================================================

import { ri, sp, spx, scx, scx2, makeWrongChoices } from '../../../utils.js';

export const ox = [
   {q:"이차방정식 $ax^2+bx+c=0$의 판별식 $D=b^2-4ac>0$이면 서로 다른 두 실근을 가진다.",ans:"O",exp:"$D>0$이면 근의 공식에서 $\\sqrt{D}>0$이므로 두 실근이 서로 다르다."},
   {q:"이차방정식 $x^2-2x+1=0$은 실근이 없다.",ans:"X",exp:"$D=(-2)^2-4\\cdot1\\cdot1=0$이므로 중근 $x=1$을 가진다."},
   {q:"$|x|<3$이면 $-3<x<3$이다.",ans:"O",exp:"절댓값 부등식 $|x|<a$ ($a>0$)는 $-a<x<a$와 동치이다."},
   {q:"이차방정식의 두 근의 합은 $-\\dfrac{b}{a}$이다.",ans:"O",exp:"근과 계수의 관계: $ax^2+bx+c=0$의 두 근 $\\alpha,\\beta$에 대해 $\\alpha+\\beta=-\\dfrac{b}{a}$이다."},
   {q:"부등식 $x^2>0$의 해는 모든 실수이다.",ans:"X",exp:"$x=0$이면 $x^2=0$이므로 $x\\neq0$인 모든 실수가 해이다."},
   {q:"이차방정식 $D<0$이면 두 허근을 가진다.",ans:"O",exp:"$D<0$이면 $\\sqrt{D}$가 허수가 되어 두 허근을 가진다."},
   {q:"이차방정식 $x^2+bx+c=0$의 두 근의 합은 $-b$이다.",ans:"O",exp:"근과 계수의 관계에 의해 두 근의 합은 $-b/1=-b$이다."},
   {q:"이차방정식 $x^2-5x+6=0$의 두 근은 $2$와 $3$이다.",ans:"O",exp:"$(x-2)(x-3)=0$이므로 두 근은 $2, 3$이다."},
   {q:"$x^2+1=0$은 실근을 갖는다.",ans:"X",exp:"판별식 $D=0-4=-4<0$이므로 실근이 없다."},
   {q:"이차부등식 $x^2-x-2>0$의 해는 $-1<x<2$이다.",ans:"X",exp:"$x^2-x-2=(x-2)(x+1)>0$이므로 해는 $x<-1$ 또는 $x>2$이다."},
   {q:"$|a|=a$는 모든 실수 $a$에 대해 성립한다.",ans:"X",exp:"$a<0$이면 $|a|=-a\\neq a$이다."},
   {q:"연립부등식의 해는 각 부등식의 해의 교집합이다.",ans:"O",exp:"연립부등식의 해는 모든 부등식을 동시에 만족하는 수의 집합이다."},
   {q:"이차방정식의 판별식 $D=b^2-4ac>0$이면 서로 다른 두 허근을 가진다.",ans:"X",exp:"$D>0$이면 서로 다른 두 실근을 가진다."},
   {q:"$D=0$이면 이차방정식은 중근을 가진다.",ans:"O",exp:"판별식이 0이면 완전제곱식 형태로 중근을 갖는다."},
   {q:"$D<0$이면 이차방정식은 실근을 가진다.",ans:"X",exp:"$D<0$이면 실근이 없다(허근을 가진다)."},
   {q:"$ax>b$에서 $a<0$이면 $x<b/a$로 부등호 방향이 바뀐다.",ans:"O",exp:"음수로 나누면 부등호 방향이 바뀐다."},
   {q:"절댓값 부등식 $|x|<a$ ($a>0$)의 해는 $-a<x<a$이다.",ans:"O",exp:"$|x|<a$의 해는 $-a<x<a$이다."},
   {q:"이차방정식 $x^2-3x+2=0$의 두 근의 합은 $3$이다.",ans:"O",exp:"근과 계수의 관계: 두 근의 합 $=-\\dfrac{-3}{1}=3$"},
   {q:"이차부등식 $x^2>0$의 해는 모든 실수이다.",ans:"X",exp:"$x=0$이면 $x^2=0$이므로 $x\\neq 0$인 모든 실수이다."}
];

export const regular = {
   1:[
    {type:["객관식","단답형","서술형"],q:"이차방정식 $x^2-5x+6=0$의 두 근의 합을 구하시오.",choices:["$5$","$-5$","$6$","$-6$","$1$"],ci:0,ans:"$5$",sa:"5",sol:"근과 계수: 두 근의 합 $=-\\dfrac{-5}{1}=5$",hints:["근과 계수의 관계 이용","$ax^2+bx+c=0$의 두 근의 합 $=-b/a$","$a=1, b=-5$"],terms:"근과 계수의 관계",std:"[10공수01-05] 이차방정식의 풀이"},
    {type:["객관식","단답형","서술형"],q:"부등식 $2x-3>5$의 해를 구하시오.",choices:["$x>4$","$x<4$","$x>-4$","$x<-4$","$x>1$"],ci:0,ans:"$x>4$",sa:"x>4",sol:"$2x>8$, $x>4$",hints:["양변에 3을 더한다","$2x>8$","양변을 2로 나눈다"],terms:"일차부등식",std:"[10공수01-08] 부등식의 풀이"}
   ],
   2:[
    {type:["객관식","단답형","서술형"],q:"이차방정식 $x^2-3x+1=0$의 판별식 $D$를 구하시오.",choices:["$5$","$-5$","$7$","$-7$","$0$"],ci:0,ans:"$5$",sa:"5",sol:"$D=b^2-4ac=9-4=5$",hints:["$D=b^2-4ac$","$b=-3, a=1, c=1$","$9-4=5$"],terms:"판별식: $D=b^2-4ac$",std:"[10공수01-05] 판별식"},
    {type:["객관식","단답형","서술형"],q:"$x^2-2x-3<0$의 해를 구하시오.",choices:["$-1<x<3$","$x<-1$ 또는 $x>3$","$-3<x<1$","$x<-3$ 또는 $x>1$","$-1\\leq x\\leq3$"],ci:0,ans:"$-1<x<3$",sa:"-1<x<3",sol:"$(x+1)(x-3)<0$이므로 $-1<x<3$",hints:["인수분해: $(x+1)(x-3)$","$(x+1)(x-3)<0$","두 근 사이"],terms:"이차부등식",std:"[10공수01-08] 이차부등식"}
   ],
   3:[
    {type:["객관식","단답형","서술형"],q:"$\\alpha,\\beta$가 $x^2-4x+1=0$의 두 근일 때 $\\alpha^2+\\beta^2$의 값을 구하시오.",choices:["$14$","$12$","$16$","$10$","$18$"],ci:0,ans:"$14$",sa:"14",sol:"$\\alpha+\\beta=4$, $\\alpha\\beta=1$\n$\\alpha^2+\\beta^2=(\\alpha+\\beta)^2-2\\alpha\\beta=16-2=14$",hints:["근과 계수: $\\alpha+\\beta=4$, $\\alpha\\beta=1$","$(\\alpha+\\beta)^2-2\\alpha\\beta$","$16-2=14$"],terms:"근과 계수의 관계 응용",std:"[10공수01-05] 이차방정식"}
   ],
   4:[
    {type:["단답형","서술형"],q:"연립부등식 $\\begin{cases}x^2-5x+4\\leq0 \\\\ x^2-3x-4>0\\end{cases}$을 푸시오.",choices:[],ci:-1,ans:"$1\\leq x<4$",sa:"1<=x<4",sol:"① $(x-1)(x-4)\\leq0$ → $1\\leq x\\leq4$\n② $(x+1)(x-4)>0$ → $x<-1$ 또는 $x>4$\n공통: $1\\leq x<4$",hints:["각 부등식 따로 풀기","①의 해: $1\\leq x\\leq4$","②의 해와 공통부분"],terms:"연립이차부등식",std:"[10공수01-08] 연립부등식"}
   ],
   5:[
    {type:["서술형"],q:"$x$에 대한 이차방정식 $x^2-2kx+k+2=0$이 서로 다른 두 실근을 가질 때, $k$의 범위를 구하시오.",choices:[],ci:-1,ans:"$k<-1$ 또는 $k>2$",sa:"k<-1 또는 k>2",sol:"$D/4=k^2-(k+2)>0$\n$k^2-k-2>0$\n$(k+1)(k-2)>0$\n$k<-1$ 또는 $k>2$",hints:["$D/4=k^2-(k+2)>0$","$k^2-k-2>0$","$(k+1)(k-2)>0$"],terms:"판별식 활용",std:"[10공수01-05] 이차방정식"}
   ]
};

export const generators = {
   1: [
    ()=>{
      const [r1,r2]=[ri(1,6),ri(1,6)];
      const s=r1+r2, p=r1*r2;
      return {type:["객관식","단답형","서술형"],q:`이차방정식 $x^2-${s}x+${p}=0$의 두 근의 합을 구하시오.`,choices:[`$${s}$`,`$-${s}$`,`$${p}$`,`$-${p}$`,`$${r1}$`],ci:0,ans:`$${s}$`,sa:`${s}`,sol:`근과 계수: 두 근의 합 $=-\\dfrac{-${s}}{1}=${s}$`,hints:["근과 계수의 관계 이용","$ax^2+bx+c=0$의 두 근의 합 $=-b/a$",`$a=1, b=-${s}$`],terms:"근과 계수의 관계",std:"[10공수01-05] 이차방정식의 풀이"};
    },
    ()=>{
      const k=ri(2,7), c=ri(1,5);
      const rhs=k+c;
      return {type:["객관식","단답형","서술형"],q:`부등식 $${k}x-${c}>${k*ri(1,3)+c}$의 해를 구하시오.`,choices:[`$x>${ri(2,6)}$`,`$x<${ri(2,6)}$`,`$x>${ri(2,6)}$`,`$x<${ri(2,6)}$`,`$x>${ri(2,6)}$`].map((_,i)=>{const v=ri(2,6);return i===0?`$x>${Math.ceil((k*ri(1,3)+c+c)/k)}$`:_;}).slice(0,5),ci:0,ans:`$x>\\dfrac{${k*ri(1,3)+c+c}}{${k}}$`,sa:`x>${(k*ri(1,3)+c+c)/k}`,sol:`${k}x>${k*ri(1,3)+c+c}+${c}`,hints:["상수항을 우변으로 이항",`${k}x>...`,"양변을 ${k}로 나눈다"],terms:"일차부등식",std:"[10공수01-08] 부등식의 풀이"};
    }
   ],
   2: [
    ()=>{
      const [a,b,c]=[ri(1,3),ri(-4,-1),ri(1,5)];
      const D=b*b-4*a*c;
      return {type:["객관식","단답형","서술형"],q:`이차방정식 $${a>1?a:''}x^2${sp(b)}x${sp(c)}=0$의 판별식 $D$를 구하시오.`,choices:[`$${D}$`,`$${D+4}$`,`$${D-4}$`,`$${-D}$`,`$0$`],ci:0,ans:`$${D}$`,sa:`${D}`,sol:`$D=b^2-4ac=${b}^2-4\\cdot${a}\\cdot${c}=${b*b}-${4*a*c}=${D}$`,hints:["$D=b^2-4ac$",`$b=${b}, a=${a}, c=${c}$`,`$${b*b}-${4*a*c}=${D}$`],terms:"판별식: $D=b^2-4ac$",std:"[10공수01-05] 판별식"};
    }
   ],
   5: [
    ()=>{
      const k=ri(-3,3), bias=ri(1,3);
      const a=k+bias, b=k;
      const D=a*a-4*b;
      const root_exists = D>0;
      if(root_exists){
        const disc_str=`$D=${a}^2-4\\cdot${b}=${D}>0$`;
        return {type:["객관식","단답형","서술형"],q:`$x^2${sp(a>0?a:-a>0?-a:0)}x+${b}=0$의 판별식의 부호를 구하시오.`,choices:[`$D>0$`,`$D=0$`,`$D<0$`,`$D\\geq 0$`,`$D\\leq 0$`],ci:0,ans:`$D>0$`,sa:`D>0`,sol:`$D=${disc_str}$이므로 서로 다른 두 실근을 갖는다.`,hints:[`판별식 $D=b^2-4ac$`,`$D=${D}$`,D>0?`$D>0$: 두 실근`:D===0?`$D=0$: 중근`:`$D<0$: 허근`],terms:"판별식",std:"[10공수01-05] 이차방정식의 판별식"};
      }
      const m=ri(1,4);
      return {type:["객관식","단답형","서술형"],q:`$x$에 대한 이차방정식 $x^2-2${m}x+${m*m}=0$의 근의 종류는?`,choices:[`중근 (${m})`,`두 실근`,`허근`,`근 없음`,`무한히 많은 근`],ci:0,ans:`$x=${m}$ (중근)`,sa:`x=${m}`,sol:`$D/4=${m}^2-${m*m}=0$이므로 중근 $x=${m}$`,hints:[`$D/4=k^2-c$`,`$D/4=0$이면 중근`,`$x=${m}$`],terms:"판별식",std:"[10공수01-05] 이차방정식의 판별식"};
    },
    // ─── 실생활: 직사각형 넓이 최적화 ───
    ()=>{
      const P=ri(4,12)*10;
      const hp=P/2;
      const target=Math.round(hp*hp/4*ri(55,80)/100);
      const disc=hp*hp-4*target;
      if(disc<0) return null;
      const sq=Math.sqrt(disc);
      const x1=((hp-sq)/2), x2=((hp+sq)/2);
      const x1s=x1%1===0?''+x1:(x1).toFixed(2);
      const x2s=x2%1===0?''+x2:(x2).toFixed(2);
      const ans_str='$'+x1s+' \\leq x \\leq '+x2s+'$';
      const ch=makeWrongChoices(ans_str,['$'+(x1-1).toFixed(0)+' \\leq x \\leq '+(x2+1).toFixed(0)+'$','$x = '+(hp/2)+'$','$0 < x < '+hp+'$','$'+x1s+' < x < '+x2s+'$']);
      return {type:['객관식','단답형','서술형'],
        q:'둘레가 $'+P+'\\text{ cm}$인 직사각형에서 가로를 $x\\text{ cm}$라 할 때, 넓이가 $'+target+'\\text{ cm}^2$ 이상이 되는 $x$의 범위를 구하시오.',
        choices:ch.choices,ci:ch.ci,
        ans:ans_str,sa:''+x1s+'<=x<='+x2s,
        sol:'세로 = $'+hp+'-x$\n$x('+hp+'-x) \\geq '+target+'$\n$x^2-'+hp+'x+'+target+' \\leq 0$\n$'+ans_str+'$',
        hints:['세로 = $'+hp+' - x$','$x('+hp+'-x) \\geq '+target+'$ 이차부등식','$x^2-'+hp+'x+'+target+' \\leq 0$'],
        terms:'이차부등식의 활용 (도형의 넓이)',std:'[10공수01-08] 이차부등식의 실생활 활용'};
    },
    // ─── 실생활: 원가·이익률 ───
    ()=>{
      const cost=ri(5,20)*1000;
      const r=ri(15,30);
      const max_p=cost+ri(8,15)*1000;
      const min_p=Math.ceil(cost*(1+r/100)/100)*100;
      const ans_str='$'+min_p.toLocaleString()+' \\leq x \\leq '+max_p.toLocaleString()+'$원';
      const ch=makeWrongChoices(ans_str,['$'+(min_p-100).toLocaleString()+' \\leq x \\leq '+max_p.toLocaleString()+'$원','$'+(min_p+100).toLocaleString()+' \\leq x \\leq '+max_p.toLocaleString()+'$원','$'+min_p.toLocaleString()+' < x < '+max_p.toLocaleString()+'$원','$'+min_p.toLocaleString()+' \\leq x \\leq '+(max_p-1000).toLocaleString()+'$원']);
      return {type:['객관식','단답형','서술형'],
        q:'원가 '+cost.toLocaleString()+'원인 물건의 정가 $x$원을 결정할 때, 이익률 '+r+'% 이상이고 정가가 '+max_p.toLocaleString()+'원 이하가 되려면 $x$의 범위를 구하시오.',
        choices:ch.choices,ci:ch.ci,
        ans:ans_str,sa:''+min_p+'<=x<='+max_p,
        sol:'이익률 조건: $(x-'+cost+')/'+cost+' \\geq '+r+'/100$\n$x \\geq '+cost+'\\times(1+'+r+'/100)$\n백원 단위 올림: $x \\geq '+min_p.toLocaleString()+'$\n상한: $x \\leq '+max_p.toLocaleString()+'$\n'+ans_str,
        hints:['이익률 $\\geq '+r+'\\%$: $x \\geq '+cost+'\\times(1+'+r+'/100)$','상한 조건: $x \\leq '+max_p.toLocaleString()+'$','두 조건의 교집합'],
        terms:'연립부등식의 활용 (이익률)',std:'[10공수01-08] 연립부등식의 실생활 활용'};
    },
    // ─── 실생활: 자동차 제동거리 ───
    ()=>{
      const a_ms2 = ri(4,8);
      const v0_kmh = ri(6,15)*10;
      const v0_ms = v0_kmh / 3.6;
      const D = Math.round(v0_ms*v0_ms / (2*a_ms2));
      const v_max_sq = D * 2 * a_ms2 * 12.96;
      const v_max = Math.round(Math.sqrt(v_max_sq));
      const ch = makeWrongChoices('$'+v_max+'$km/h 이하',['$'+(v_max+10)+'$km/h 이하','$'+(v_max-10)+'$km/h 이하','$'+(v_max+5)+'$km/h 이하','$'+(v_max-5)+'$km/h 이하']);
      return {type:['객관식','단답형','서술형'],
        q:'자동차가 속도 $v$ km/h로 달릴 때 제동거리는 $d=\\dfrac{v^2}{'+Math.round(2*a_ms2*12.96)+'}$ (m)이다. 제동거리가 $'+D+'$ m 이하가 되려면 속도가 최대 몇 km/h인지 구하시오.',
        choices:ch.choices,ci:ch.ci,
        ans:'$'+v_max+'$km/h 이하',sa:''+v_max,
        sol:'$\\dfrac{v^2}{'+Math.round(2*a_ms2*12.96)+'} \\leq '+D+'$\n$v^2 \\leq '+Math.round(D*2*a_ms2*12.96)+'$\n$v \\leq '+v_max+'$ (단, $v>0$)',
        hints:['$d \\leq '+D+'$ 부등식 세우기','$v^2 \\leq '+Math.round(D*2*a_ms2*12.96)+'$','양변에 제곱근 취하기 ($v>0$)'],
        terms:'이차부등식의 활용 (제동거리)',std:'[10공수01-08] 이차부등식의 실생활 활용'};
    }
   ],
   3: [
    ()=>{
      const [a,b,cc]=[ri(1,3),ri(-5,5),ri(-8,8)];
      const D=b*b-4*a*cc;
      const ansStr=D>0?'서로 다른 두 실근':D===0?'중근(하나의 실근)':'실근 없음';
      return {type:["객관식","단답형","서술형"],q:`이차방정식 $${a>1?a:''}x^2${b>=0?'+'+b:b}x${cc>=0?'+'+cc:cc}=0$의 근의 판별 결과는?`,choices:[`$${ansStr}$`,'서로 다른 두 실근','중근(하나의 실근)','실근 없음','판별 불가'].filter((_,i)=>i===0||['서로 다른 두 실근','중근(하나의 실근)','실근 없음'].filter(s=>s!==ansStr)[i-1]).slice(0,1).concat(['서로 다른 두 실근','중근(하나의 실근)','실근 없음'].filter(s=>s!==ansStr).slice(0,3)).concat([`$D=${D}$`]).slice(0,5).map(s=>`$${s}$`),ci:0,ans:`${ansStr}`,sa:`${ansStr}`,sol:`$D=b^2-4ac=${b}^2-4\\cdot${a}\\cdot(${cc})=${D}$\n$D${D>0?'>':'='}0$이므로 ${ansStr}`,hints:[`$D=b^2-4ac$`,`D>0: 두 실근, D=0: 중근, D<0: 실근없음`,`$D=${D}$`],terms:"판별식",std:"[10공수01-05] 판별식"};
    }
   ],
   4: [
    ()=>{
      const r1=ri(1,5), r2=ri(1,5);
      const s=r1+r2, p=r1*r2;
      const a=ri(1,3);
      return {type:["객관식","단답형","서술형"],q:`이차방정식$${a>1?a:''}x^2-${a*s}x+${a*p}=0$의 두 근의 합과 곱을 구하시오.`,choices:[`$합=${s},\;곱=${p}$`,`$합=${s+1},\;곱=${p}$`,`$합=${s},\;곱=${p+1}$`,`$합=-${s},\;곱=${p}$`,`$합=${s},\;곱=-${p}$`],ci:0,ans:`$합=${s},\;곱=${p}$`,sa:`합=${s} 곱=${p}`,sol:`근과 계수의 관계: 두 근의 합$=\\dfrac{${a*s}}{${a}}=${s}$, 곱$=\\dfrac{${a*p}}{${a}}=${p}$`,hints:["두 근을 α,β라 하면","합=−b/a, 곱=c/a",`합=${s}, 곱=${p}`],terms:"근과 계수의 관계",std:"[10공수01-05] 이차방정식의 근과 계수"};
    },
    // ─── 실생활: 요금제 비교 ───
    ()=>{
      const dc=ri(50,200)*10;
      const x0=ri(5,20);
      const diff=dc*x0+ri(1,dc-1);
      const aA=ri(5,15)*1000, aB2=aA+diff;
      const b_cost=ri(100,300)*10, c_cost=b_cost-dc;
      const ch=makeWrongChoices('$'+x0+'$건',['$'+(x0+1)+'$건','$'+(x0-1)+'$건','$'+(x0+2)+'$건','$'+(x0+3)+'$건']);
      return {type:['객관식','단답형','서술형'],
        q:'A 요금제는 기본료 '+aA.toLocaleString()+'원에 건당 '+b_cost+'원, B 요금제는 기본료 '+aB2.toLocaleString()+'원에 건당 '+c_cost+'원이다. 한 달에 몇 건 이하로 사용하면 A 요금제가 더 유리한지 구하시오.',
        choices:ch.choices,ci:ch.ci,
        ans:'$'+x0+'$건 이하',sa:''+x0,
        sol:'A < B: $'+aA+'+'+b_cost+'x < '+aB2+'+'+c_cost+'x$\n$'+dc+'x < '+diff+'$\n$x < '+(diff/dc).toFixed(2)+'$\n최대 정수 $'+x0+'$건',
        hints:['A비용 < B비용 부등식 세우기','$'+dc+'x < '+diff+'$','$x<'+(diff/dc).toFixed(2)+'$, 최대 정수 $'+x0+'$'],
        terms:'일차부등식의 활용 (요금제 비교)',std:'[10공수01-08] 일차부등식의 실생활 활용'};
    },
    // ─── 실생활: 단체 할인 입장료 ───
    ()=>{
      const a=ri(8,15)*1000;
      const b=Math.round(a*ri(55,75)/100/1000)*1000;
      const k=ri(10,20);
      const threshold_num=k*b, threshold_den=a;
      const x_min=Math.floor(threshold_num/threshold_den)+1;
      const ch=makeWrongChoices('$'+x_min+'$명',['$'+(x_min+1)+'$명','$'+(x_min-1)+'$명','$'+k+'$명','$'+(x_min+2)+'$명']);
      return {type:['객관식','단답형','서술형'],
        q:'개인 입장료 '+a.toLocaleString()+'원, '+k+'명 이상 단체권 1인당 '+b.toLocaleString()+'원일 때, 몇 명 이상이면 단체권 '+k+'장을 구입하는 것이 각자 개인권을 사는 것보다 유리한지 구하시오.',
        choices:ch.choices,ci:ch.ci,
        ans:'$'+x_min+'$명 이상',sa:''+x_min,
        sol:'단체권 총액: $'+k+'\\times'+b+'='+threshold_num+'$원\n개인권 총액: $'+a+'x$원\n$'+threshold_num+' < '+a+'x$\n$x > '+(threshold_num/threshold_den).toFixed(2)+'$\n따라서 $'+x_min+'$명 이상',
        hints:['단체권 총비용 = $'+threshold_num+'$원','개인권 총비용 = $'+a+'x$원','$'+threshold_num+' < '+a+'x$'],
        terms:'일차부등식의 활용 (단체 할인)',std:'[10공수01-08] 일차부등식의 실생활 활용'};
    },
    // ─── 실생활: 쏘아 올린 물체 ───
    ()=>{
      const t1=ri(1,3), t2=t1+ri(2,5);
      const v0=5*(t1+t2), H=5*t1*t2;
      const ch=makeWrongChoices('$'+t1+' < t < '+t2+'$',['$'+t1+' \\leq t \\leq '+t2+'$','$0 < t < '+t2+'$','$'+t1+' < t < '+(t2+1)+'$','$'+(t1-1)+' < t < '+t2+'$']);
      return {type:['객관식','단답형','서술형'],
        q:'초속 $'+v0+'\\text{ m/s}$로 쏘아 올린 공의 $t$초 후 높이는 $h(t)=-5t^2+'+v0+'t$ (m)이다. 높이가 $'+H+'\\text{ m}$보다 높은 시간 구간을 구하시오.',
        choices:ch.choices,ci:ch.ci,
        ans:'$'+t1+' < t < '+t2+'$',sa:''+t1+'<t<'+t2,
        sol:'$-5t^2+'+v0+'t > '+H+'$\n$5t^2-'+v0+'t+'+H+' < 0$\n$5(t-'+t1+')(t-'+t2+') < 0$\n$'+t1+' < t < '+t2+'$',
        hints:['$h(t) > '+H+'$ 부등식 세우기','$5(t-'+t1+')(t-'+t2+') < 0$','두 근 사이: $'+t1+' < t < '+t2+'$'],
        terms:'이차부등식의 활용 (포물선 운동)',std:'[10공수01-08] 이차부등식의 실생활 활용'};
    }
   ]
};
