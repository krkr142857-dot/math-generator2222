// ============================================================================
// [고2 대수] 지수함수와 로그함수 데이터 모듈
// ============================================================================

import { ri, sp, spx, scx, scx2, makeWrongChoices } from '../../../utils.js';

export const ox = [
   {q:"$a^m \\cdot a^n = a^{m+n}$이다.",ans:"O",exp:"지수 법칙: 밑이 같을 때 곱하면 지수를 더한다."},
   {q:"$\\log_a(MN)=\\log_aM + \\log_aN$이다.",ans:"O",exp:"로그의 곱셈 공식이며 $M>0, N>0, a>0, a\\neq1$일 때 성립한다."},
   {q:"$\\log_a 1 = 1$이다.",ans:"X",exp:"$a^0=1$이므로 $\\log_a 1 = 0$이다."},
   {q:"$\\log_a a = 1$이다.",ans:"O",exp:"$a^1=a$이므로 $\\log_a a = 1$이다."},
   {q:"$(a^m)^n = a^{mn}$이다.",ans:"O",exp:"지수 법칙: 거듭제곱의 거듭제곱은 지수를 곱한다."},
   {q:"$\\log_2 8 = 4$이다.",ans:"X",exp:"$2^3=8$이므로 $\\log_2 8 = 3$이다."},
   {q:"$\\log_{10} 100 = 2$이다.",ans:"O",exp:"$10^2=100$이므로 $\\log_{10} 100 = 2$이다."},
   {q:"$a^m \\cdot a^n=a^{m+n}$이다. (단, $a>0$)",ans:"O",exp:"지수 법칙: 밑이 같을 때 지수를 더한다."},
   {q:"$\\log_a 1=0$이다. (단, $a>0, a\\neq1$)",ans:"O",exp:"$a^0=1$이므로 $\\log_a 1=0$이다."},
   {q:"$\\log_2 8=3$이다.",ans:"O",exp:"$2^3=8$이므로 $\\log_2 8=3$이다."},
   {q:"$\\log_a(mn)=\\log_a m + \\log_a n$이다.",ans:"O",exp:"로그의 곱셈 법칙이다."},
   {q:"$\\log_{10} 0.001=-3$이다.",ans:"O",exp:"$10^{-3}=0.001$이므로 $\\log_{10} 0.001=-3$이다."},
   {q:"$\\log_a 1 = 0$이다. ($a>0, a\\neq 1$)",ans:"O",exp:"$a^0=1$이므로 $\\log_a 1=0$"},
   {q:"$\\log_a a = 1$이다.",ans:"O",exp:"$a^1=a$이므로 $\\log_a a=1$"},
   {q:"$\\log_2 8 = 4$이다.",ans:"X",exp:"$2^3=8$이므로 $\\log_2 8=3$이다."},
   {q:"$\\log_{10} 100 = 2$이다.",ans:"O",exp:"$10^2=100$이므로 $\\log_{10} 100=2$"},
   {q:"로그함수는 항상 양수값을 가진다.",ans:"X",exp:"$\\log_a x$는 음수값도 가질 수 있다. ($0<x<1$이면 음수)"},
   {q:"$\\log_a(xy)=\\log_a x+\\log_a y$이다.",ans:"O",exp:"로그의 곱셈 법칙이다."},
   {q:"$a^{m+n}=a^m \\cdot a^n$이다.",ans:"O",exp:"지수 법칙이다."}
];

export const regular = {
   1:[
    {type:["객관식","단답형","서술형"],q:"$2^3\\times2^4$의 값을 구하시오.",choices:["$128$","$2^{12}$","$64$","$2^{-1}$","$12$"],ci:0,ans:"$128$",sa:"128",sol:"$2^3\\times2^4=2^{3+4}=2^7=128$",hints:["지수법칙: $a^m\\times a^n=a^{m+n}$","$3+4=7$","$2^7=128$"],terms:"지수법칙",std:"[12수학Ⅰ-01-01] 지수의 확장"},
    {type:["객관식","단답형","서술형"],q:"$\\log_2 8$의 값을 구하시오.",choices:["$3$","$2$","$4$","$1$","$8$"],ci:0,ans:"$3$",sa:"3",sol:"$\\log_2 8=\\log_2 2^3=3$",hints:["$\\log_a a^n=n$","$8=2^3$","$=3$"],terms:"로그의 정의",std:"[12수학Ⅰ-01-03] 로그의 정의"}
   ],
   2:[
    {type:["객관식","단답형","서술형"],q:"$\\log_2 3=a$, $\\log_2 5=b$일 때 $\\log_2 15$를 $a,b$로 나타내시오.",choices:["$a+b$","$ab$","$a-b$","$a+b-1$","$2a+b$"],ci:0,ans:"$a+b$",sa:"a+b",sol:"$\\log_2 15=\\log_2(3\\times5)=\\log_2 3+\\log_2 5=a+b$",hints:["$\\log_a MN=\\log_a M+\\log_a N$","$15=3\\times5$","$a+b$"],terms:"로그의 성질",std:"[12수학Ⅰ-01-03] 로그의 성질"},
    {type:["객관식","단답형","서술형"],q:"$9^{1/2}\\times27^{1/3}$의 값을 구하시오.",choices:["$9$","$6$","$3$","$27$","$3\\sqrt{3}$"],ci:0,ans:"$9$",sa:"9",sol:"$9^{1/2}=3$, $27^{1/3}=3$이므로 $3\\times3=9$",hints:["$9^{1/2}=\\sqrt{9}=3$","$27^{1/3}=\\sqrt[3]{27}=3$","$3\\times3=9$"],terms:"거듭제곱근",std:"[12수학Ⅰ-01-01] 거듭제곱근"}
   ],
   3:[
    {type:["객관식","단답형","서술형"],q:"방정식 $4^x-6\\cdot2^x+8=0$의 해를 구하시오.",choices:["$x=1$ 또는 $x=2$","$x=1$","$x=2$","$x=0$ 또는 $x=1$","$x=3$"],ci:0,ans:"$x=1$ 또는 $x=2$",sa:"x=1 또는 x=2",sol:"$t=2^x$로 놓으면 $t^2-6t+8=0$\n$(t-2)(t-4)=0$이므로 $t=2$ 또는 $t=4$\n$x=1$ 또는 $x=2$",hints:["$4^x=(2^x)^2$","$t=2^x$로 치환","$(t-2)(t-4)=0$"],terms:"지수방정식",std:"[12수학Ⅰ-01-02] 지수방정식"}
   ],
   4:[
    {type:["단답형","서술형"],q:"$\\log x+\\log(x-3)=1$을 만족하는 $x$의 값을 구하시오.",choices:[],ci:-1,ans:"$x=5$",sa:"5",sol:"$\\log x(x-3)=1$이므로 $x(x-3)=10$\n$x^2-3x-10=0$, $(x-5)(x+2)=0$\n$x>3$이므로 $x=5$",hints:["로그의 덧셈 법칙","$x(x-3)=10$","진수 조건 $x>3$ 확인"],terms:"로그방정식",std:"[12수학Ⅰ-01-04] 로그방정식"}
   ],
   5:[
    {type:["서술형"],q:"$\\log_a 2=p$, $\\log_a 3=q$일 때 $\\log_6\\sqrt{12}$를 $p, q$로 나타내시오.",choices:[],ci:-1,ans:"$\\dfrac{2p+q}{2(p+q)}$",sa:"(2p+q)/(2(p+q))",sol:"$\\log_6\\sqrt{12}=\\dfrac{\\log_a\\sqrt{12}}{\\log_a 6}=\\dfrac{\\frac{1}{2}\\log_a 12}{\\log_a 6}=\\dfrac{\\frac{1}{2}(2p+q)}{p+q}=\\dfrac{2p+q}{2(p+q)}$",hints:["밑 변환 공식","$\\log_a 12=\\log_a(4\\cdot3)=2p+q$","$\\log_a 6=\\log_a(2\\cdot3)=p+q$"],terms:"밑 변환 공식",std:"[12수학Ⅰ-01-03] 밑 변환 공식"}
   ]
};

export const generators = {
   1: [
    ()=>{
      const [m,n]=[ri(2,5),ri(2,5)];
      return {type:["객관식","단답형","서술형"],q:`$2^${m}\\times2^${n}$의 값을 구하시오.`,choices:[`$${Math.pow(2,m+n)}$`,`$2^{${m*n}}$`,`$${Math.pow(2,m+n)+1}$`,`$2^{${m+n+1}}$`,`$${Math.pow(2,m+n)-1}$`],ci:0,ans:`$${Math.pow(2,m+n)}$`,sa:`${Math.pow(2,m+n)}`,sol:`$2^${m}\\times2^${n}=2^{${m}+${n}}=2^{${m+n}}=${Math.pow(2,m+n)}$`,hints:["지수법칙: $a^m\\times a^n=a^{m+n}$",`지수 더하기: ${m}+${n}=${m+n}`,`$2^{${m+n}}=${Math.pow(2,m+n)}$`],terms:"지수법칙",std:"[12수학Ⅰ-01-01] 지수의 확장"};
    },
    ()=>{
      const k=ri(2,5);
      return {type:["객관식","단답형","서술형"],q:`$\\log_2 ${Math.pow(2,k)}$의 값을 구하시오.`,choices:[`$${k}$`,`$${k-1}$`,`$${k+1}$`,`$${Math.pow(2,k)}$`,`$${k*2}$`],ci:0,ans:`$${k}$`,sa:`${k}`,sol:`$\\log_2 ${Math.pow(2,k)}=\\log_2 2^${k}=${k}$`,hints:["$\\log_a a^n=n$",`$${Math.pow(2,k)}=2^${k}$`,`$=${k}$`],terms:"로그의 정의",std:"[12수학Ⅰ-01-03] 로그의 정의"};
    }
   ],
   2: [
    ()=>{
      const [m,n]=[ri(2,5),ri(2,5)];
      return {type:["객관식","단답형","서술형"],q:`$${m}^{1/2}\\times${m*m}^{1/4}$를 간단히 하시오.`,choices:[`$${m}$`,`$${m}^{3/4}$`,`$${m}^{5/4}$`,`$\\sqrt{${m}}$`,`$${m*m}$`],ci:0,ans:`$${m}$`,sa:`${m}`,sol:`$${m}^{1/2}\\times(${m}^2)^{1/4}=${m}^{1/2}\\times${m}^{1/2}=${m}^1=${m}$`,hints:[`$(${m}^2)^{1/4}=${m}^{2/4}=${m}^{1/2}$`,"지수끼리 더하기","$1/2+1/2=1$"],terms:"지수법칙",std:"[12수학Ⅰ-01-01] 지수법칙"};
    }
   ],
   3: [
    ()=>{
      const b=ri(2,4), n=ri(2,4), m=ri(2,4);
      const ans=n+m;
      return {type:["객관식","단답형","서술형"],q:`$\\log_${b}${Math.pow(b,n)}+\\log_${b}${Math.pow(b,m)}$의 값을 구하시오.`,choices:[`$${ans}$`,`$${ans+1}$`,`$${ans-1}$`,`$${n*m}$`,`$${n+m+1}$`],ci:0,ans:`$${ans}$`,sa:`${ans}`,sol:`$\\log_${b}${b}^${n}+\\log_${b}${b}^${m}=${n}+${m}=${ans}$`,hints:[`$\\log_a a^n=n$`,`$${n}+${m}=${ans}$`],terms:"로그의 성질",std:"[12수학Ⅰ-01-03] 로그의 성질"};
    }
   ],
   4: [
    ()=>{
      const a=ri(2,3), k=ri(1,3);
      return {type:["객관식","단답형","서술형"],q:`$\\log_${a} x=${k}$일 때 $\\log_${a} x^2$의 값을 구하시오.`,choices:[`$${2*k}$`,`$${k}$`,`$${k+1}$`,`$${2*k+1}$`,`$${k*k}$`],ci:0,ans:`$${2*k}$`,sa:`${2*k}`,sol:`$\\log_${a} x^2=2\\log_${a} x=2\\times${k}=${2*k}$`,hints:["$\\log_a x^n = n\\log_a x$",`$2\\times${k}=${2*k}$`],terms:"로그의 성질",std:"[12수학Ⅰ-01-03] 로그의 성질"};
    }
   ],
   5: [
    ()=>{
      const exprs=[
        {q:"$\\log_a 12$", ans:"$2p+q$", sol:"$\\log_a 12=\\log_a(4\\cdot3)=2\\log_a 2+\\log_a 3=2p+q$", choices:["$2p+q$","$p+2q$","$2p+2q$","$p+q$","$2pq$"], ci:0},
        {q:"$\\log_a 18$", ans:"$p+2q$", sol:"$\\log_a 18=\\log_a(2\\cdot3^2)=\\log_a 2+2\\log_a 3=p+2q$", choices:["$p+2q$","$2p+q$","$p+q$","$2p+2q$","$pq$"], ci:0},
        {q:"$\\log_a 6$", ans:"$p+q$", sol:"$\\log_a 6=\\log_a 2+\\log_a 3=p+q$", choices:["$p+q$","$2p+q$","$p+2q$","$pq$","$2pq$"], ci:0}
      ];
      const e=exprs[ri(0,2)];
      return {type:["객관식","단답형","서술형"],q:`$\\log_a 2=p$, $\\log_a 3=q$일 때 ${e.q}를 $p, q$로 나타내시오.`,choices:e.choices,ci:e.ci,ans:e.ans,sa:e.ans.replace(/\$/g,''),sol:e.sol,hints:["소인수분해","로그의 곱셈 법칙","계수 계산"],terms:"로그 변환",std:"[12수학Ⅰ-01-03] 로그의 성질"};
    },
    ()=>{
      const I_ref_str='10^{-12}';
      const I_ratio=ri(2,6)*ri(2,5); 
      const k=ri(4,9); 
      const dB=10*k;
      const ch=makeWrongChoices('$'+dB+'$dB',['$'+(dB+10)+'$dB','$'+(dB-10)+'$dB','$'+(k)+'$dB','$'+(dB*2)+'$dB']);
      return {type:['객관식','단답형','서술형'],
        q:'소음의 강도 $L$ (dB)은 기준 음압 $I_0$에 대해 $L=10\\log\\dfrac{I}{I_0}$로 정의된다. 어떤 소음의 음압이 기준의 $10^{'+k+'}$배일 때, 이 소음의 강도를 구하시오.',
        choices:ch.choices,ci:ch.ci,
        ans:'$'+dB+'$dB',sa:''+dB,
        sol:'$L=10\\log 10^{'+k+'}=10\\times '+k+'='+dB+'$dB',
        hints:['$I/I_0=10^{'+k+'}$ 대입','$\\log 10^{'+k+'}='+k+'$','$L=10\\times'+k+'='+dB+'$'],
        terms:'로그의 실생활 활용 (소음 측정)',std:'[12수학Ⅰ-01-04] 로그의 실생활 활용'};
    },
    ()=>{
      const M1=ri(4,6), M2=M1+ri(1,3); 
      const ratio=Math.pow(10,M2-M1); 
      const ch=makeWrongChoices('$'+ratio.toLocaleString()+'$배',['$'+(ratio*10)+'$배','$'+(ratio/10)+'$배','$'+(M2-M1)*10+'$배','$'+Math.pow(10,M2-M1+1)+'$배']);
      return {type:['객관식','단답형','서술형'],
        q:'지진의 규모 $M$은 에너지 $E$에 대해 $M=\\log E + c$ (c는 상수)로 정의된다. 규모 $'+M2+'$인 지진의 에너지는 규모 $'+M1+'$인 지진의 에너지의 몇 배인지 구하시오.',
        choices:ch.choices,ci:ch.ci,
        ans:'$'+ratio.toLocaleString()+'$배',sa:''+ratio,
        sol:'$'+M2+'-'+M1+'='+'\\log E_2 - \\log E_1 = \\log\\dfrac{E_2}{E_1}$\n$\\log\\dfrac{E_2}{E_1}='+(M2-M1)+'$\n$\\dfrac{E_2}{E_1}=10^{'+(M2-M1)+'}='+ratio.toLocaleString()+'$배',
        hints:['$\\log E_2 - \\log E_1 = '+(M2-M1)+'$','$\\log(E_2/E_1)='+(M2-M1)+'$','$E_2/E_1=10^{'+(M2-M1)+'}$'],
        terms:'로그의 실생활 활용 (지진 규모)',std:'[12수학Ⅰ-01-04] 로그의 실생활 활용'};
    },
    ()=>{
      const P=ri(100,500)*10000;
      const r=ri(3,8); 
      const yr=ri(3,6); 
      const base=1+r/100;
      const logBase=Math.round(Math.log10(base)*10000)/10000;
      const logA=Math.log10(P)+yr*Math.log10(base);
      const A=Math.round(P*Math.pow(base,yr));
      const ch=makeWrongChoices('약 $'+A.toLocaleString()+'$원',['약 $'+(A+P)+'원$','약 $'+(A-P)+'$원','약 $'+(P*(1+r*yr/100)).toLocaleString()+'$원 (단리)','약 $'+(Math.round(A*1.05)).toLocaleString()+'$원']);
      return {type:['객관식','단답형','서술형'],
        q:'원금 '+P.toLocaleString()+'원을 연이율 $'+r+'\\%$의 복리로 $'+yr+'$년 예금하면 원리합계는 얼마인지 구하시오. (단, $\\log(1+'+r+'/100)='+logBase+'$, $\\log '+P.toLocaleString()+'='+Math.round(Math.log10(P)*10000)/10000+'$이고, 역로그를 이용한 근삿값으로 답하시오.)',
        choices:ch.choices,ci:ch.ci,
        ans:'약 $'+A.toLocaleString()+'$원',sa:''+A,
        sol:'$A='+P.toLocaleString()+'\\times(1.'+String(r).padStart(2,'0')+')^{'+yr+'}$\n$\\log A=\\log '+P.toLocaleString()+'+'+yr+'\\times '+logBase+'\\approx '+Math.round(logA*10000)/10000+'$\n$A \\approx '+A.toLocaleString()+'$원',
        hints:['$A=P(1+r)^n$ 공식','양변에 로그 취하기','$\\log A = \\log P + n\\log(1+r)$'],
        terms:'지수방정식의 활용 (복리)',std:'[12수학Ⅰ-01-02] 지수방정식의 실생활 활용'};
    },
    ()=>{
      const n0=ri(100,500)*100;
      const r=ri(2,4); 
      const h=ri(2,5); 
      const ans=n0*Math.pow(r,h);
      const ch=makeWrongChoices('$'+ans.toLocaleString()+'$마리',['$'+(n0*Math.pow(r,h+1)).toLocaleString()+'$마리','$'+(n0*Math.pow(r,h-1)).toLocaleString()+'$마리','$'+(n0*r*h).toLocaleString()+'$마리','$'+(n0*Math.pow(r,h)+n0).toLocaleString()+'$마리']);
      return {type:['객관식','단답형','서술형'],
        q:'어떤 세균은 $'+h+'$시간마다 $'+r+'$배로 증식한다. 처음 $'+n0.toLocaleString()+'$마리가 있을 때, $'+h*h+'$시간 후 세균의 수를 구하시오.',
        choices:ch.choices,ci:ch.ci,
        ans:'$'+ans.toLocaleString()+'$마리',sa:''+ans,
        sol:'$'+h+'$시간마다 $'+r+'$배 → $'+h*h+'$시간 = $'+h+'$주기\n$N='+n0.toLocaleString()+'\\times'+r+'^{'+h+'}='+ans.toLocaleString()+'$마리',
        hints:['$'+h*h+'$시간 = $'+h+'$ 주기','$N=N_0 \\times r^n$',n0.toLocaleString()+'\\times'+r+'^'+h+'='+ans.toLocaleString()],
        terms:'지수함수의 활용 (세균 증식)',std:'[12수학Ⅰ-01-02] 지수방정식의 실생활 활용'};
    },
    ()=>{
      const P0=ri(10,50)*10000;
      const rate=ri(2,5); 
      const yr=ri(2,4); 
      const rateFrac=rate/100;
      const logBase=Math.log10(1+rateFrac);
      const tYears=Math.log10(2)/logBase;
      const tRounded=Math.round(tYears*10)/10;
      const logVal=Math.round(logBase*10000)/10000;
      const ch=makeWrongChoices('약 $'+tRounded+'$년',['약 $'+(tRounded+5)+'$년','약 $'+(tRounded-5)+'$년','약 $'+(tRounded+10)+'$년','약 $'+(Math.round(tYears)+1)+'$년']);
      return {type:['객관식','단답형','서술형'],
        q:'연간 인구 증가율이 $'+rate+'\\%$일 때, 인구가 현재의 2배가 되는 데 걸리는 시간을 구하시오. (단, $\\log(1+'+rate+'/100)='+logVal+'$, $\\log 2=0.3010$)',
        choices:ch.choices,ci:ch.ci,
        ans:'약 $'+tRounded+'$년',sa:''+tRounded,
        sol:'$P_0(1+'+rate+'/100)^t=2P_0$\n$(1.'+String(rate).padStart(2,'0')+')^t=2$\n$t\\cdot\\log 1.'+String(rate).padStart(2,'0')+'=\\log 2$\n$t=\\dfrac{0.3010}{'+logVal+'}\\approx '+tRounded+'$년',
        hints:['$P_0(1+r)^t = 2P_0$ 설정','양변에 로그 취하기','$t=\\dfrac{\\log 2}{\\log(1+r)}$'],
        terms:'지수방정식의 활용 (인구 증가)',std:'[12수학Ⅰ-01-02] 지수방정식의 실생활 활용'};
    },
    ()=>{
      const m0=ri(2,8)*100;
      const half=ri(2,5);
      const days=half*ri(2,4);
      const n_half=days/half; 
      const ans=m0/Math.pow(2,n_half);
      const ansStr=Number.isInteger(ans)?'$'+ans+'$g':'$\\dfrac{'+m0+'}{'+Math.pow(2,n_half)+'}$g';
      const sa=Number.isInteger(ans)?''+ans:''+m0+'/'+Math.pow(2,n_half);
      const ch=makeWrongChoices(ansStr,['$'+Math.round(ans*2)+'$g','$'+Math.round(ans/2)+'$g','$'+Math.round(ans+m0/4)+'$g','$'+m0/Math.pow(2,n_half-1)+'$g']);
      return {type:['객관식','단답형','서술형'],
        q:'반감기가 $'+half+'$일인 방사성 물질 $'+m0+'$g가 있다. $'+days+'$일 후 남아있는 물질의 질량을 구하시오.',
        choices:ch.choices,ci:ch.ci,
        ans:ansStr,sa:sa,
        sol:'$'+days+'$일 = 반감기 $'+half+'$일 $\\times '+n_half+'$회\n$m='+m0+'\\times\\left(\\dfrac{1}{2}\\right)^{'+n_half+'}='+ansStr+'$',
        hints:['반감기 횟수 = $'+days+' \\div '+half+' = '+n_half+'$','$m=m_0\\cdot\\left(\\dfrac{1}{2}\\right)^n$','$='+ansStr+'$'],
        terms:'지수함수의 활용 (반감기)',std:'[12수학Ⅰ-01-02] 지수방정식의 실생활 활용'};
    }
   ]
};
