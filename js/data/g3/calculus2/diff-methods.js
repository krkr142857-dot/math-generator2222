// ============================================================================
// [고3 미적분 II] 미분법 데이터 모듈
// ============================================================================

import { ri, sp, spx, scx, scx2, makeWrongChoices } from '../../../utils.js';

export const ox = [
   {q:"$(e^x)'=e^x$이다.",ans:"O",exp:"지수함수 $e^x$의 도함수는 자기 자신 $e^x$이다."},
   {q:"$(\\ln x)'=\\dfrac{1}{x}$이다.",ans:"O",exp:"자연로그 $\\ln x$의 도함수는 $\\dfrac{1}{x}$ ($x>0$)이다."},
   {q:"$(\\sin x)'=\\cos x$이다.",ans:"O",exp:"사인 함수의 도함수는 코사인 함수이다."},
   {q:"$(\\cos x)'=\\sin x$이다.",ans:"X",exp:"$(\\cos x)'=-\\sin x$이다. 부호가 음수임에 주의한다."},
   {q:"합성함수의 미분법: $(f\\circ g)'(x)=f'(g(x))\\cdot g'(x)$이다.",ans:"O",exp:"연쇄법칙(Chain Rule)으로 합성함수 미분의 기본 공식이다."},
   {q:"$f''(x)>0$인 구간에서 $f(x)$는 위로 볼록하다.",ans:"X",exp:"$f''(x)>0$이면 아래로 볼록(concave up)이다."},
   {q:"$(e^x)' = e^x$이다.",ans:"O",exp:"자연지수함수의 도함수는 자신이다."},
   {q:"$(\\ln x)' = \\dfrac{1}{x}$ (단, $x>0$)이다.",ans:"O",exp:"자연로그함수의 도함수이다."},
   {q:"$(\\sin x)' = -\\cos x$이다.",ans:"X",exp:"$(\\sin x)' = \\cos x$이다. $(\\cos x)' = -\\sin x$이다."},
   {q:"$(uv)' = u'v + uv'$이다.",ans:"O",exp:"곱의 미분법(라이프니츠 법칙)이다."},
   {q:"$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$이다.",ans:"O",exp:"몫의 미분법이다."},
   {q:"$(\\cos x)'=\\sin x$이다.",ans:"X",exp:"$(\\cos x)'=-\\sin x$이다."},
   {q:"$(e^x)\' = e^x$이다.",ans:"O",exp:"지수함수의 도함수이다."},
   {q:"$(\\ln x)\' = \\dfrac{1}{x}$이다.",ans:"O",exp:"로그함수의 도함수이다."},
   {q:"$(\\sin x)\' = \\cos x$이다.",ans:"O",exp:"사인함수의 도함수이다."},
   {q:"$(\\cos x)\' = \\sin x$이다.",ans:"X",exp:"$(\\cos x)\'=-\\sin x$이다."},
   {q:"$(fg)\'=f\'g+fg\'$이다.",ans:"O",exp:"곱의 미분법이다."},
   {q:"$\\left(\\dfrac{f}{g}\\right)\'=\\dfrac{f\'g-fg\'}{g^2}$이다.",ans:"O",exp:"몫의 미분법이다."}
];

export const regular = {
   1:[
    {type:["객관식","단답형","서술형"],q:"$f(x)=e^x$의 도함수를 구하시오.",choices:["$e^x$","$xe^{x-1}$","$e^{x-1}$","$e^x\\ln x$","$1$"],ci:0,ans:"$e^x$",sa:"e^x",sol:"$(e^x)'=e^x$",hints:["자연지수함수의 특성","$(e^x)'=e^x$","미분해도 변하지 않음"],terms:"지수함수의 미분",std:"[12미적분-02-01] 지수함수의 미분"},
    {type:["객관식","단답형","서술형"],q:"$f(x)=\\ln x$의 도함수를 구하시오.",choices:["$\\dfrac{1}{x}$","$\\ln x$","$x$","$e^x$","$\\dfrac{1}{\\ln x}$"],ci:0,ans:"$\\dfrac{1}{x}$",sa:"1/x",sol:"$(\\ln x)'=\\dfrac{1}{x}$",hints:["자연로그함수의 미분","$(\\ln x)'=\\dfrac{1}{x}$","$x>0$에서 정의"],terms:"로그함수의 미분",std:"[12미적분-02-01] 로그함수의 미분"}
   ],
   2:[
    {type:["객관식","단답형","서술형"],q:"$f(x)=\\sin x$의 도함수를 구하시오.",choices:["$\\cos x$","$-\\cos x$","$-\\sin x$","$\\tan x$","$\\sec x$"],ci:0,ans:"$\\cos x$",sa:"cos x",sol:"$(\\sin x)'=\\cos x$",hints:["삼각함수 미분 공식","$(\\sin x)'=\\cos x$","$(\\cos x)'=-\\sin x$"],terms:"삼각함수의 미분",std:"[12미적분-02-02] 삼각함수의 미분"},
    {type:["객관식","단답형","서술형"],q:"$f(x)=x\\cdot e^x$의 도함수를 구하시오.",choices:["$(x+1)e^x$","$xe^x$","$e^x$","$(x-1)e^x$","$x^2e^x$"],ci:0,ans:"$(x+1)e^x$",sa:"(x+1)e^x",sol:"곱의 미분: $1\\cdot e^x+x\\cdot e^x=(x+1)e^x$",hints:["$(uv)'=u'v+uv'$","$u=x$, $v=e^x$","$u'=1$, $v'=e^x$"],terms:"곱의 미분법",std:"[12미적분-02-03] 곱의 미분법"}
   ],
   3:[
    {type:["단답형","서술형"],q:"$f(x)=\\ln(x^2+1)$의 도함수를 구하시오.",choices:[],ci:-1,ans:"$\\dfrac{2x}{x^2+1}$",sa:"2x/(x^2+1)",sol:"$(\\ln g(x))'=\\dfrac{g'(x)}{g(x)}=\\dfrac{2x}{x^2+1}$",hints:["합성함수 미분법","$(\\ln g)'=g'/g$","$(x^2+1)'=2x$"],terms:"합성함수의 미분",std:"[12미적분-02-03] 합성함수의 미분"}
   ],
   4:[
    {type:["단답형","서술형"],q:"$f(x)=e^{2x}\\sin x$의 도함수를 구하시오.",choices:[],ci:-1,ans:"$e^{2x}(2\\sin x+\\cos x)$",sa:"e^{2x}(2sinx+cosx)",sol:"$(e^{2x})'\\sin x+e^{2x}(\\sin x)'=2e^{2x}\\sin x+e^{2x}\\cos x=e^{2x}(2\\sin x+\\cos x)$",hints:["곱의 미분법","$(e^{2x})'=2e^{2x}$","$(\\sin x)'=\\cos x$"],terms:"곱의 미분법, 합성함수 미분",std:"[12미적분-02-03] 미분법"}
   ],
   5:[
    {type:["서술형"],q:"$y=\\dfrac{e^x}{x^2+1}$의 도함수를 구하시오.",choices:[],ci:-1,ans:"$\\dfrac{e^x(x^2-2x+1)}{(x^2+1)^2}$",sa:"e^x(x-1)^2/(x^2+1)^2",sol:"몫의 미분: $\\dfrac{e^x(x^2+1)-e^x\\cdot2x}{(x^2+1)^2}=\\dfrac{e^x(x^2-2x+1)}{(x^2+1)^2}=\\dfrac{e^x(x-1)^2}{(x^2+1)^2}$",hints:["몫의 미분법 $(u/v)'=(u'v-uv')/v^2$","$u=e^x$, $v=x^2+1$","$u'=e^x$, $v'=2x$"],terms:"몫의 미분법",std:"[12미적분-02-03] 미분법"}
   ]
};

export const generators = {
   1: [],
   2: [],
   3: [],
   4: [],
   5: []
};
