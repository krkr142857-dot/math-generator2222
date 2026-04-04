// ============================================================================
// [고2 대수] 수열 데이터 모듈
// ============================================================================

import { ri, sp, spx, scx, scx2, makeWrongChoices } from '../../../utils.js';

export const ox = [
   {q:"등차수열의 공차가 양수이면 수열은 단조증가한다.",ans:"O",exp:"공차 $d>0$이면 $a_{n+1}-a_n=d>0$이므로 단조증가한다."},
   {q:"등비수열에서 공비가 1이면 모든 항이 같다.",ans:"O",exp:"$r=1$이면 $a_n=a_1\\cdot1^{n-1}=a_1$으로 모두 같다."},
   {q:"$\\sum_{k=1}^{n}1 = n$이다.",ans:"O",exp:"1을 $n$번 더하면 $n$이다."},
   {q:"모든 등차수열은 수렴한다.",ans:"X",exp:"공차 $d\\neq0$인 등차수열은 발산한다."},
   {q:"등비수열의 공비가 0이 될 수 있다.",ans:"X",exp:"공비 $r\\neq0$인 경우만 등비수열로 정의한다."},
   {q:"등차수열에서 공차가 $0$이면 모든 항이 같다.",ans:"O",exp:"공차가 $0$이면 $a_n=a_1$으로 모든 항이 $a_1$이다."},
   {q:"등비수열의 공비는 $0$이 될 수 없다.",ans:"O",exp:"공비가 $0$이면 두 번째 항부터 모두 $0$이 되어 등비수열이 아니다."},
   {q:"$\\sum_{k=1}^{n} k = \\dfrac{n(n+1)}{2}$이다.",ans:"O",exp:"자연수의 합 공식이다."},
   {q:"등차수열 $1,3,5,7,...$의 공차는 $3$이다.",ans:"X",exp:"각 항의 차가 $2$이므로 공차는 $2$이다."},
   {q:"등비수열 $2, 6, 18,...$의 공비는 $3$이다.",ans:"O",exp:"$6/2=3$, $18/6=3$이므로 공비는 $3$이다."},
   {q:"$\\sum_{k=1}^{n} c = nc$ (단, $c$는 상수)이다.",ans:"O",exp:"상수의 합은 상수에 항 수를 곱한 것이다."},
   {q:"등차수열의 공차가 $0$이면 상수수열이다.",ans:"O",exp:"공차가 $0$이면 모든 항이 같다."},
   {q:"등비수열의 공비는 반드시 양수이다.",ans:"X",exp:"공비는 음수도 될 수 있다."},
   {q:"등차수열의 일반항은 $a_n=a_1+(n-1)d$이다.",ans:"O",exp:"등차수열의 일반항 공식이다."},
   {q:"등비수열의 일반항은 $a_n=a_1 \\cdot r^n$이다.",ans:"X",exp:"$a_n=a_1 \\cdot r^{n-1}$이다."},
   {q:"수열 $\\{1, 3, 5, 7, \\ldots\\}$은 공차가 $2$인 등차수열이다.",ans:"O",exp:"연속하는 두 항의 차가 $2$로 일정하다."},
   {q:"$\\sum_{k=1}^n k = \\dfrac{n(n+1)}{2}$이다.",ans:"O",exp:"자연수의 합 공식이다."},
   {q:"공비가 $1$인 등비수열의 합은 $na_1$이다.",ans:"O",exp:"모든 항이 같으므로 합은 $na_1$이다."}
];

export const regular = {
   1:[
    {type:["객관식","단답형","서술형"],q:"등차수열 $2,5,8,11,\\ldots$의 공차를 구하시오.",choices:["$3$","$2$","$5$","$-3$","$1$"],ci:0,ans:"$3$",sa:"3",sol:"$5-2=3$",hints:["공차 = 다음항 - 현재항","$5-2=3$","일정한지 확인"],terms:"등차수열의 공차",std:"[12수학Ⅰ-03-01] 등차수열"},
    {type:["객관식","단답형","서술형"],q:"첫째항이 $2$, 공차가 $3$인 등차수열의 제5항을 구하시오.",choices:["$14$","$11$","$17$","$8$","$13$"],ci:0,ans:"$14$",sa:"14",sol:"$a_5=2+(5-1)\\times3=14$",hints:["$a_n=a_1+(n-1)d$","$a_5=2+4\\times3$","$=14$"],terms:"등차수열의 일반항",std:"[12수학Ⅰ-03-01] 등차수열"}
   ],
   2:[
    {type:["객관식","단답형","서술형"],q:"등비수열 $2,6,18,54,\\ldots$의 공비를 구하시오.",choices:["$3$","$2$","$4$","$6$","$-3$"],ci:0,ans:"$3$",sa:"3",sol:"$6\\div2=3$",hints:["공비 = 다음항 ÷ 현재항","$6/2=3$","일정한지 확인"],terms:"등비수열의 공비",std:"[12수학Ⅰ-03-02] 등비수열"},
    {type:["객관식","단답형","서술형"],q:"$\\sum_{k=1}^{5}(2k-1)$의 값을 구하시오.",choices:["$25$","$20$","$15$","$30$","$10$"],ci:0,ans:"$25$",sa:"25",sol:"$1+3+5+7+9=25$",hints:["$k=1$부터 5까지 $2k-1$ 계산","$1,3,5,7,9$","합 $=25$"],terms:"시그마 계산",std:"[12수학Ⅰ-03-03] 수열의 합"}
   ],
   3:[
    {type:["객관식","단답형","서술형"],q:"첫째항이 $a$, 공차 $d$인 수열에서 $S_{10}=100$일 때 $2a+9d$의 값을 구하시오.",choices:["$20$","$10$","$100$","$50$","$200$"],ci:0,ans:"$20$",sa:"20",sol:"$S_{10}=\\dfrac{10}{2}(2a+9d)=100$이므로 $2a+9d=20$",hints:["$S_n=\\dfrac{n}{2}(2a+(n-1)d)$","$S_{10}=5(2a+9d)=100$","$2a+9d=20$"],terms:"등차수열의 합",std:"[12수학Ⅰ-03-01] 등차수열의 합"}
   ],
   4:[
    {type:["단답형","서술형"],q:"$\\sum_{k=1}^{10}k^2$의 값을 구하시오. (단, $\\sum_{k=1}^{n}k^2=\\dfrac{n(n+1)(2n+1)}{6}$)",choices:[],ci:-1,ans:"$385$",sa:"385",sol:"$\\dfrac{10\\cdot11\\cdot21}{6}=385$",hints:["공식에 $n=10$ 대입","$10\\times11\\times21=2310$","$2310\\div6=385$"],terms:"제곱의 합 공식",std:"[12수학Ⅰ-03-03] 수열의 합"}
   ],
   5:[
    {type:["객관식","단답형","서술형"],q:"$a_1=1$, $a_{n+1}=a_n+2n$을 만족하는 수열 $\\{a_n\\}$에서 $a_{10}$을 구하시오.",choices:["$91$","$82$","$100$","$73$","$110$"],ci:0,ans:"$91$",sa:"91",sol:"$a_n=a_1+\\sum_{k=1}^{n-1}2k=1+n(n-1)$\n$a_{10}=1+10\\cdot9=91$",hints:["$a_n=a_1+\\sum_{k=1}^{n-1}(a_{k+1}-a_k)$","$\\sum_{k=1}^{n-1}2k=n(n-1)$","$a_{10}=91$"],terms:"점화식",std:"[12수학Ⅰ-03-04] 점화식"}
   ]
};

export const generators = {
   1: [
    ()=>{
      const [a1,d]=[ri(1,5),ri(2,5)];
      return {type:["객관식","단답형","서술형"],q:`등차수열 $${a1}, ${a1+d}, ${a1+2*d}, ${a1+3*d}, \\ldots$의 공차를 구하시오.`,choices:[`$${d}$`,`$${d+1}$`,`$${d-1}$`,`$${a1}$`,`$${2*d}$`],ci:0,ans:`$${d}$`,sa:`${d}`,sol:`$${a1+d}-${a1}=${d}$`,hints:["공차 = 다음항 - 현재항",`$${a1+d}-${a1}=${d}$`,"일정한지 확인"],terms:"등차수열의 공차",std:"[12수학Ⅰ-03-01] 등차수열"};
    },
    ()=>{
      const [a1,d,n]=[ri(1,5),ri(2,5),ri(4,8)];
      const an=a1+(n-1)*d;
      return {type:["객관식","단답형","서술형"],q:`첫째항이 $${a1}$, 공차가$${d}$인 등차수열의 제${n}항을 구하시오.`,choices:[`$${an}$`,`$${an+d}$`,`$${an-d}$`,`$${an+1}$`,`$${an-1}$`],ci:0,ans:`$${an}$`,sa:`${an}`,sol:`$a_${n}=${a1}+(${n}-1)\\times${d}=${a1}+${(n-1)*d}=${an}$`,hints:["$a_n=a_1+(n-1)d$",`$a_${n}=${a1}+${n-1}\\times${d}$`,`$=${an}$`],terms:"등차수열의 일반항",std:"[12수학Ⅰ-03-01] 등차수열"};
    }
   ],
   2: [
    ()=>{
      const [a1,r]=[ri(1,4),ri(2,4)];
      return {type:["객관식","단답형","서술형"],q:`등비수열 $${a1}, ${a1*r}, ${a1*r*r}, ${a1*r*r*r}, \\ldots$의 공비를 구하시오.`,choices:[`$${r}$`,`$${r+1}$`,`$${r-1}$`,`$${a1}$`,`$${r*2}$`],ci:0,ans:`$${r}$`,sa:`${r}`,sol:`$${a1*r}\\div${a1}=${r}$`,hints:["공비 = 다음항 ÷ 현재항",`$${a1*r}/${a1}=${r}$`,"일정한지 확인"],terms:"등비수열의 공비",std:"[12수학Ⅰ-03-02] 등비수열"};
    }
   ],
   3: [
    ()=>{
      const a1=ri(1,5), d=ri(1,4), n=ri(5,10);
      const an=a1+(n-1)*d;
      return {type:["객관식","단답형","서술형"],q:`첫째항이 $${a1}$, 공차가 $${d}$인 등차수열의 제$${n}$항을 구하시오.`,choices:[`$${an}$`,`$${an+d}$`,`$${an-d}$`,`$${an+1}$`,`$${an-1}$`],ci:0,ans:`$${an}$`,sa:`${an}`,sol:`$a_n=a_1+(n-1)d=${a1}+(${n}-1)\\times${d}=${an}$`,hints:[`$a_n=a_1+(n-1)d$`,`$(${n}-1)\\times${d}=${(n-1)*d}$`,`$${a1}+${(n-1)*d}=${an}$`],terms:"등차수열",std:"[12수학Ⅰ-03-01] 등차수열"};
    }
   ],
   4: [
    ()=>{
      const a1=ri(2,4), r=ri(2,3), n=ri(3,5);
      const an=a1*Math.pow(r,n-1);
      return {type:["객관식","단답형","서술형"],q:`첫째항이 $${a1}$, 공비가$${r}$인 등비수열의 제$${n}$항을 구하시오.`,choices:[`$${an}$`,`$${an*r}$`,`$${Math.round(an/r)}$`,`$${an+r}$`,`$${a1*n}$`],ci:0,ans:`$${an}$`,sa:`${an}`,sol:`$a_n=a_1\\cdot r^{n-1}=${a1}\\times${r}^{${n-1}}=${an}$`,hints:[`$a_n=a_1\\cdot r^{n-1}$`,`$${r}^{${n-1}}=${Math.pow(r,n-1)}$`,`$${a1}\\times${Math.pow(r,n-1)}=${an}$`],terms:"등비수열",std:"[12수학Ⅰ-03-02] 등비수열"};
    },
    ()=>{
      const a=ri(5,20)*10000;
      const r=ri(3,12); 
      const n=ri(12,36); 
      const rStr=r+'/1200';
      const r_m=1+r/1200;
      const S=Math.round(a*(Math.pow(r_m,n)-1)/(r_m-1)*r_m);
      const S_simple=a*n; 
      const ch=makeWrongChoices('약 $'+S.toLocaleString()+'$원',['약 $'+S_simple.toLocaleString()+'$원 (이자 미포함)','약 $'+(S+a*n/10).toLocaleString()+'$원','약 $'+(Math.round(S*0.9)).toLocaleString()+'$원','약 $'+(S+a*r/100).toLocaleString()+'$원']);
      return {type:['객관식','단답형','서술형'],
        q:'매달 '+a.toLocaleString()+'원씩 월이율 $'+r+'/1200$ (연이율 '+r/12+'분의1%)의 복리 적금에 $'+n+'$개월 납입하면 원리합계는 약 얼마인지 구하시오. (단, $(1+\\dfrac{'+r+'}{1200})^{'+n+'}\\approx '+Math.round(Math.pow(r_m,n)*1000)/1000+'$로 계산)',
        choices:ch.choices,ci:ch.ci,
        ans:'약 $'+S.toLocaleString()+'$원',sa:''+S,
        sol:'$S='+a.toLocaleString()+'\\times\\dfrac{(1+\\frac{'+r+'}{1200})^{'+n+'}-(1)}{\\frac{'+r+'}{1200}}\\times(1+\\dfrac{'+r+'}{1200})$\n$\\approx '+S.toLocaleString()+'$원',
        hints:['등비급수 합 공식','$S=a\\cdot\\dfrac{r^n-1}{r-1}\\cdot r$ ($r=1+월이율$)','근삿값 대입'],
        terms:'등비급수의 활용 (적금)',std:'[12수학Ⅰ-03-02] 등비급수의 실생활 활용'};
    },
    ()=>{
      const S0=ri(4,12)*100; 
      const S_inf_num=3, S_inf_den=2;
      const ans=S0*S_inf_num/S_inf_den;
      const ch=makeWrongChoices('$'+ans+'\\text{ cm}^2$',['$'+S0*2+'\\text{ cm}^2$','$'+S0+'\\text{ cm}^2$','$'+(S0*S_inf_num/S_inf_den+S0/4)+'\\text{ cm}^2$','$'+S0*3+'\\text{ cm}^2$']);
      return {type:['객관식','단답형','서술형'],
        q:'넓이가 $'+S0+'\\text{ cm}^2$인 정삼각형에서 각 변의 중점을 연결해 새 정삼각형을 무한히 추가한다. 각 단계에서 추가되는 삼각형의 넓이 비율이 이전의 $\\dfrac{1}{3}$이라 할 때, 전체 넓이의 합을 구하시오.',
        choices:ch.choices,ci:ch.ci,
        ans:'$'+ans+'\\text{ cm}^2$',sa:''+ans,
        sol:'첫째항 $'+S0+'$, 공비 $\\dfrac{1}{3}$인 등비급수\n$S=\\dfrac{'+S0+'}{1-\\frac{1}{3}}=\\dfrac{'+S0+'}{\\frac{2}{3}}=\\dfrac{3\\times'+S0+'}{2}='+ans+'$',
        hints:['첫째항 $a='+S0+'$','공비 $r=\\dfrac{1}{3}$','$S=\\dfrac{a}{1-r}=\\dfrac{'+S0+'}{2/3}$'],
        terms:'무한등비급수의 활용 (프랙탈)',std:'[12수학Ⅰ-03-02] 무한등비급수의 실생활 활용'};
    },
    ()=>{
      const a=ri(10,50)*10000; 
      const r_pct=ri(3,8); 
      const n=ri(5,15); 
      const r_dec=r_pct/100;
      const r_n=Math.pow(1+r_dec,-n);
      const PV=Math.round(a*(1-r_n)/r_dec);
      const approx_r_n=Math.round(r_n*1000)/1000;
      const ch=makeWrongChoices('약 $'+PV.toLocaleString()+'$원',['약 $'+(PV+a).toLocaleString()+'$원','약 $'+(PV-a).toLocaleString()+'$원','약 $'+(a*n).toLocaleString()+'$원 (단순합)','약 $'+(Math.round(PV*1.1)).toLocaleString()+'$원']);
      return {type:['객관식','단답형','서술형'],
        q:'매년 말에 '+a.toLocaleString()+'원씩 $'+n+'$년간 받을 연금의 현재 가치를 구하시오. (단, 연이율 $'+r_pct+'\\%$, $(1+'+r_pct+'/100)^{-'+n+'}\\approx '+approx_r_n+'$)',
        choices:ch.choices,ci:ch.ci,
        ans:'약 $'+PV.toLocaleString()+'$원',sa:''+PV,
        sol:'$PV='+a.toLocaleString()+'\\times\\dfrac{1-(1+'+r_pct+'/100)^{-'+n+'}}{'+r_pct+'/100}$\n$='+a.toLocaleString()+'\\times\\dfrac{1-'+approx_r_n+'}{'+r_pct+'/100}$\n$\\approx '+PV.toLocaleString()+'$원',
        hints:['$PV=a\\times\\dfrac{1-(1+r)^{-n}}{r}$','$(1+r)^{-n}='+approx_r_n+' 대입','나눗셈으로 정리'],
        terms:'등비급수의 활용 (연금 현가)',std:'[12수학Ⅰ-03-02] 등비급수의 실생활 활용'};
    }
   ],
   5: [
    ()=>{
      const a1=ri(1,3);
      const n=ri(8,12);
      const ans=a1+(n-1)*(n-2);
      return {type:["객관식","단답형","서술형"],q:`$a_1=${a1}$, $a_{n+1}=a_n+2(n-1)$을 만족하는 수열 $\\{a_n\\}$에서 $a_{${n}}$의 값을 구하시오.`,choices:[`$${ans}$`,`$${ans+2}$`,`$${ans-2}$`,`$${ans+4}$`,`$${ans-4}$`],ci:0,ans:`$${ans}$`,sa:`${ans}`,sol:`$a_n=a_1+\\sum_{k=1}^{n-1}2(k-1)=${a1}+(n-1)(n-2)$`,hints:["차이 $a_{n+1}-a_n=2(n-1)$ 으로 합산","$\\sum_{k=1}^{n-1}2(k-1)=(n-1)(n-2)$","$a_1$ 더하기"],terms:"수열의 합",std:"[12수학Ⅰ-03-03] 수열의 합"};
    },
    ()=>{
      const P=ri(100,500)*10000;
      const r=ri(3,8); 
      const n=ri(3,6); 
      const r_m=1+r/100;
      const ans=Math.round(P*Math.pow(r_m,n));
      const ch=makeWrongChoices('$'+ans.toLocaleString()+'$원',['$'+(ans+P*r/100).toLocaleString()+'$원','$'+(ans-P*r/100).toLocaleString()+'$원','$'+(P*(1+r*n/100)).toLocaleString()+'$원 (단리)','$'+Math.round(ans*1.05).toLocaleString()+'$원']);
      return {type:['객관식','단답형','서술형'],
        q:'원금 '+P.toLocaleString()+'원을 연이율 $'+r+'\\%$의 복리로 $'+n+'$년간 예금할 때, 원리합계를 구하는 점화식을 쓰고 $'+n+'$년 후 원리합계를 구하시오. (단, $(1.'+String(r).padStart(2,'0')+')^{'+n+'}\\approx '+Math.round(Math.pow(r_m,n)*1000)/1000+'$)',
        choices:ch.choices,ci:ch.ci,
        ans:'$'+ans.toLocaleString()+'$원',sa:''+ans,
        sol:'점화식: $a_{n+1}=(1+'+r+'/100)a_n$, $a_0='+P.toLocaleString()+'$\n$a_n='+P.toLocaleString()+'\\times(1.'+String(r).padStart(2,'0')+')^n$\n$a_{'+n+'}='+P.toLocaleString()+'\\times '+Math.round(Math.pow(r_m,n)*1000)/1000+'\\approx '+ans.toLocaleString()+'$원',
        hints:['점화식: $a_{n+1}=(1+r)a_n$','일반항: $a_n=a_0(1+r)^n$','$a_{'+n+'}$ 계산'],
        terms:'등비수열의 활용 (복리 원리합계)',std:'[12수학Ⅰ-03-02] 수열의 실생활 활용'};
    },
    ()=>{
      const S0=ri(2,8)*100; 
      const r=ri(3,5); 
      const cnt=r*r-1; 
      const ans=S0*r*r; 
      const ch=makeWrongChoices('$'+ans+'\\text{ cm}^2$',['$'+S0*r+'\\text{ cm}^2$','$'+(ans+S0)+'\\text{ cm}^2$','$'+(ans-S0)+'\\text{ cm}^2$','$'+S0*2+'\\text{ cm}^2$']);
      return {type:['객관식','단답형','서술형'],
        q:'넓이 $'+S0+'\\text{ cm}^2$인 정사각형을 $'+r+'\\times'+r+'$으로 분할하여 가운데를 제외한 $'+cnt+'$개의 정사각형을 무한히 채운다. 전체 채워지는 넓이의 합을 구하시오.',
        choices:ch.choices,ci:ch.ci,
        ans:'$'+ans+'\\text{ cm}^2$',sa:''+ans,
        sol:'첫째항 $'+S0+'$, 공비 $\\dfrac{'+cnt+'}{'+r*r+'}$\n$S=\\dfrac{'+S0+'}{1-\\frac{'+cnt+'}{'+r*r+'}}=\\dfrac{'+S0+'}{\\frac{1}{'+r*r+'}}='+ans+'$',
        hints:['공비 $r=\\dfrac{'+cnt+'}{'+r*r+'}$','무한등비급수 $S=\\dfrac{a}{1-r}$','$S=\\dfrac{'+S0+'}{1/'+r*r+'}='+ans+'$'],
        terms:'무한등비급수의 활용 (프랙탈)',std:'[12수학Ⅰ-03-02] 무한등비급수의 실생활 활용'};
    },
    ()=>{
      const V0=ri(10,50)*100000; 
      const rate=ri(10,25); 
      const n=ri(3,7); 
      const r=1-rate/100;
      const Vn=Math.round(V0*Math.pow(r,n));
      const logR=Math.round(Math.log10(r)*10000)/10000;
      const ch=makeWrongChoices('약 $'+Vn.toLocaleString()+'$원',['약 $'+(Vn+V0*rate/100).toLocaleString()+'$원','약 $'+(Vn-V0*rate/100).toLocaleString()+'$원','약 $'+(V0*(1-rate*n/100)).toLocaleString()+'$원','약 $'+Math.round(Vn*1.1).toLocaleString()+'$원']);
      return {type:['객관식','단답형','서술형'],
        q:'구입가 '+V0.toLocaleString()+'원인 기계가 매년 $'+rate+'\\%$씩 감가될 때, $'+n+'$년 후 잔존 가치를 구하시오. (단, $(1-'+rate+'/100)^{'+n+'}\\approx '+Math.round(Math.pow(r,n)*1000)/1000+'$)',
        choices:ch.choices,ci:ch.ci,
        ans:'약 $'+Vn.toLocaleString()+'$원',sa:''+Vn,
        sol:'$V_n='+V0.toLocaleString()+'\\times(1-'+rate+'/100)^{'+n+'}$\n$='+V0.toLocaleString()+'\\times '+Math.round(Math.pow(r,n)*1000)/1000+'$\n$\\approx '+Vn.toLocaleString()+'$원',
        hints:['$V_n=V_0\\cdot(1-r)^n$ (등비수열)','공비 $1-'+rate+'/100='+r+'$','근삿값 대입'],
        terms:'등비수열의 활용 (감가상각)',std:'[12수학Ⅰ-03-02] 등비수열의 실생활 활용'};
    }
   ]
};
