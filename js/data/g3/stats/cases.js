// ============================================================================
// [고3 확률과 통계] 경우의 수 데이터 모듈
// ============================================================================

import { ri, sp, makeWrongChoices } from '../../../app.js';

export const ox = [
   {q:"$_nP_r = \\dfrac{n!}{(n-r)!}$이다.",ans:"O",exp:"순열 공식으로 $n$개 중 $r$개를 순서 있게 나열하는 경우의 수이다."},
   {q:"$_nC_r = _nC_{n-r}$이다.",ans:"O",exp:"조합의 대칭성으로 $\\dfrac{n!}{r!(n-r)!}=\\dfrac{n!}{(n-r)!r!}$이다."},
   {q:"서로 다른 $n$개 중 $r$개를 순서 있게 선택하는 수는 $_nP_r$이다.",ans:"O",exp:"순열의 정의이다. $_nP_r = \\dfrac{n!}{(n-r)!}$이다."},
   {q:"조합 $_nC_r = _nC_{n-r}$이다.",ans:"O",exp:"$n$개 중 $r$개 선택 = $n$개 중 $(n-r)$개 선택이다."},
   {q:"$_5C_2 = 10$이다.",ans:"O",exp:"$_5C_2 = \\dfrac{5!}{2!3!} = \\dfrac{5\\times4}{2} = 10$이다."},
   {q:"$_nC_r = _nC_{n-r}$이다.",ans:"O",exp:"조합의 성질이다."},
   {q:"$_nP_n = n!$이다.",ans:"O",exp:"$n$개를 모두 나열하는 순열이다."}
];

export const regular = {
   1:[
    {type:["객관식","단답형","서술형"],q:"$_5C_3$의 값을 구하시오.",choices:["$10$","$20$","$15$","$60$","$5$"],ci:0,ans:"$10$",sa:"10",sol:"$_5C_3=\\dfrac{5!}{3!2!}=\\dfrac{20}{2}=10$",hints:["$_nC_r=\\dfrac{n!}{r!(n-r)!}$","$5\\times4/(2\\times1)$","$=10$"],terms:"조합",std:"[12확통-01-01] 순열과 조합"}
   ],
   2:[],
   3:[],
   4:[],
   5:[]
};

export const generators = {
   1: [
    ()=>{
      const [n,r]=[ri(5,8),ri(2,4)];
      const C=(f,k)=>Math.round(f(n)/(f(k)*f(n-k)));
      const fact=n=>{let r=1;for(let i=2;i<=n;i++)r*=i;return r;};
      const ans=C(fact,r);
      return {type:["객관식","단답형","서술형"],q:`$_{${n}}C_{${r}}$의 값을 구하시오.`,choices:[`$${ans}$`,`$${ans+5}$`,`$${ans-5}$`,`$${ans*2}$`,`$${Math.round(ans/2)}$`],ci:0,ans:`$${ans}$`,sa:`${ans}`,sol:`$_{${n}}C_{${r}}=\\dfrac{${n}!}{${r}!\\cdot${n-r}!}=${ans}$`,hints:["$_nC_r=\\dfrac{n!}{r!(n-r)!}$",`분자: ${n}×...`, `$=${ans}$`],terms:"조합",std:"[12확통-01-01] 순열과 조합"};
    }
   ],
   2: [
    ()=>{
      const n=ri(4,7), r=ri(1,n-1);
      let p=1; for(let i=n;i>n-r;i--) p*=i;
      return {type:["객관식","단답형","서술형"],q:`$_{${n}}P_{${r}}$의 값을 구하시오.`,choices:[`$${p}$`,`$${p+n}$`,`$${p-1}$`,`$${p*2}$`,`$${Math.round(p/2)}$`],ci:0,ans:`$${p}$`,sa:`${p}`,sol:`$_{${n}}P_{${r}}=${Array.from({length:r},(_,i)=>n-i).join('\\times')}=${p}$`,hints:[`$_nP_r=n(n-1)\\cdots(n-r+1)$`,`$${n}\\times${n-1}\\times\\cdots =${p}$`],terms:"순열",std:"[12확통-01-01] 순열"};
    }
   ],
   3: [
    ()=>{
      const n=ri(5,8), r=ri(2,Math.floor(n/2));
      let num=1,den=1; for(let i=n;i>n-r;i--) num*=i; for(let i=1;i<=r;i++) den*=i;
      const c2=num/den;
      return {type:["객관식","단답형","서술형"],q:`$_{${n}}C_{${r}}$의 값을 구하시오.`,choices:[`$${c2}$`,`$${c2+n}$`,`$${c2-1}$`,`$${c2*2}$`,`$${c2+r}$`],ci:0,ans:`$${c2}$`,sa:`${c2}`,sol:`$_{${n}}C_{${r}}=\\dfrac{${n}!}{${r}!(${n-r})!}=${c2}$`,hints:[`$_nC_r=\\dfrac{n!}{r!(n-r)!}$`,`분자 ${n}\\times\\cdots`, `$=${c2}$`],terms:"조합",std:"[12확통-01-01] 조합"};
    }
   ],
   4: [],
   5: []
};
