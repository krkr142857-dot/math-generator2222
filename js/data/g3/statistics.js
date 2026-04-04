// ============================================================================
// [고3 확률과 통계] 통계 데이터 모듈
// ============================================================================

import { ri, sp, makeWrongChoices } from '../../../app.js';

export const ox = [
   {q:"정규분포 $N(m,\\sigma^2)$에서 평균은 $m$, 분산은 $\\sigma^2$이다.",ans:"O",exp:"정규분포의 모수이다."},
   {q:"정규분포 곡선은 평균에 대해 좌우 대칭이다.",ans:"O",exp:"정규분포의 성질이다."},
   {q:"표본의 크기가 클수록 표본평균의 분산이 커진다.",ans:"X",exp:"$\\sigma^2(\\bar{X})=\\sigma^2/n$이므로 $n$이 클수록 분산이 작아진다."}
];

export const regular = {
   1:[],
   2:[
    {type:["객관식","단답형","서술형"],q:"확률변수 $X$의 기댓값을 구하는 식을 구하시오.",choices:["$E(X)=\\sum x_iP(X=x_i)$","$E(X)=\\sum x_i$","$E(X)=\\dfrac{\\sum x_i}{n}$","$E(X)=\\max x_i$","$E(X)=P(X)$"],ci:0,ans:"$E(X)=\\sum x_iP(X=x_i)$",sa:"E(X)=Σx_iP(X=x_i)",sol:"기댓값의 정의",hints:["각 값에 확률을 곱해 합산","$E(X)=\\sum x_iP(x_i)$","이산확률변수"],terms:"기댓값",std:"[12확통-02-03] 이산확률분포"}
   ],
   3:[
    {type:["단답형","서술형"],q:"이항분포 $B(10,0.5)$를 따르는 확률변수 $X$의 평균과 분산을 구하시오.",choices:[],ci:-1,ans:"평균 $5$, 분산 $2.5$",sa:"평균5 분산2.5",sol:"$E(X)=np=5$, $V(X)=np(1-p)=2.5$",hints:["평균: $np$","분산: $np(1-p)$","$n=10$, $p=0.5$"],terms:"이항분포",std:"[12확통-02-04] 이항분포"}
   ],
   4:[
    {type:["단답형","서술형"],q:"정규분포 $N(50,10^2)$을 따르는 확률변수 $X$를 표준화하시오.",choices:[],ci:-1,ans:"$Z=\\dfrac{X-50}{10}$",sa:"Z=(X-50)/10",sol:"$Z=\\dfrac{X-\\mu}{\\sigma}=\\dfrac{X-50}{10}$",hints:["$Z=(X-\\mu)/\\sigma$","$\\mu=50$, $\\sigma=10$","$Z=(X-50)/10$"],terms:"정규분포의 표준화",std:"[12확통-03-01] 정규분포"}
   ],
   5:[
    {type:["객관식","단답형","서술형"],q:"모표준편차 $\\sigma=20$인 모집단에서 $n=100$의 표본을 추출할 때 표본평균 $\\bar{X}$의 표준편차를 구하시오.",choices:["$2$","$4$","$0.2$","$20$","$1$"],ci:0,ans:"$2$",sa:"2",sol:"$\\sigma(\\bar{X})=\\dfrac{\\sigma}{\\sqrt{n}}=\\dfrac{20}{\\sqrt{100}}=\\dfrac{20}{10}=2$",hints:["$\\sigma(\\bar{X})=\\sigma/\\sqrt{n}$","$\\sigma=20$, $n=100$","$20/10=2$"],terms:"표본분포",std:"[12확통-03-02] 표본분포"}
   ]
};

export const generators = {
   1: [],
   2: [],
   3: [],
   4: [],
   5: [
    ()=>{
      const sigma=ri(2,5)*10, n_opts=[25,100,400], n=n_opts[ri(0,2)];
      const std_err=sigma/Math.sqrt(n);
      const ans=Number.isInteger(std_err)?std_err:+(std_err.toFixed(1));
      return {type:["객관식","단답형","서술형"],q:`모표준편차 $\\sigma=${sigma}$인 모집단에서 크기 $n=${n}$인 표본을 추출할 때 표본평균 $\\bar{X}$의 표준편차를 구하시오.`,choices:[`$${ans}$`,`$${ans+1}$`,`$${ans*2}$`,`$${sigma}$`,`$${+(std_err*2).toFixed(1)}$`],ci:0,ans:`$${ans}$`,sa:`${ans}`,sol:`$\\sigma(\\bar{X})=\\dfrac{\\sigma}{\\sqrt{n}}=\\dfrac{${sigma}}{\\sqrt{${n}}}=${ans}$`,hints:[`공식: $\\dfrac{\\sigma}{\\sqrt{n}}$`,`$\\sqrt{${n}}=${Math.sqrt(n)}$`,`$\\dfrac{${sigma}}{${Math.sqrt(n)}}=${ans}$`],terms:"표본분포",std:"[12확통-03-02] 표본분포"};
    }
   ]
};