// ============================================================================
// [고1 공통수학2] 함수와 그래프 데이터 모듈
// ============================================================================

import { ri, sp, makeWrongChoices } from '../../../app.js';

export const ox = [];

export const regular = {
   1: [],
   2: [],
   3: [],
   4: [],
   5: []
};

export const generators = {
   1: [
    ()=>{
      const a=ri(2,5), b=ri(-5,5), x=ri(-2,3);
      const ans = a*x+b;
      return {type:["객관식","단답형","서술형"], q:`함수 $f(x)=${a}x${sp(b)}$일 때, $f(${x})$의 값을 구하시오.`, choices:[`$${ans}$`,`$${ans+1}$`,`$${ans-1}$`,`$${a}$`,`$${b}$`], ci:0, ans:`$${ans}$`, sa:ans, sol:`$f(${x}) = ${a}(${x})${sp(b)} = ${ans}$`, hints:["x 자리에 숫자를 대입"], terms:"함수값", std:"[10공수04-01] 함수"};
    }
   ],
   2: [
    ()=>{
      const f=x=>2*x, g=x=>x+3;
      const val=ri(1,4);
      const res = g(f(val));
      return {type:["객관식","단답형","서술형"], q:`$f(x)=2x, g(x)=x+3$일 때, $(g \\circ f)(${val})$의 값을 구하시오.`, choices:[`$${res}$`,`$${f(g(val))}$`,`$${res+1}$`,`$${res-1}$`,`$5$`], ci:0, ans:`$${res}$`, sa:res, sol:`$f(${val})=${f(val)}$, $g(${f(val)})=${res}$`, hints:["안쪽 함수부터 계산","$(g \\circ f)(x) = g(f(x))$"], terms:"합성함수", std:"[10공수04-02] 합성함수"};
    }
   ],
   3: [
    ()=>{
      const a=ri(2,5), b=ri(1,6);
      const y=ri(10,20);
      const x=(y-b)/a;
      if(!Number.isInteger(x)) return null;
      return {type:["객관식","단답형","서술형"], q:`$f(x)=${a}x+${b}$일 때, $f^{-1}(${y})$의 값을 구하시오.`, choices:[`$${x}$`,`$${y}$`,`$${a}$`,`$${b}$`,`$${x+1}$`], ci:0, ans:`$${x}$`, sa:x, sol:`$f(x)=${y}$가 되는 $x$를 찾으면 됨.\n$${a}x+${b}=${y} \\Rightarrow ${a}x=${y-b} \\Rightarrow x=${x}$`, hints:["역함수 성질: $f^{-1}(b)=a \\iff f(a)=b$"], terms:"역함수", std:"[10공수04-03] 역함수"};
    }
   ],
   4: [
    ()=>{
      const p=ri(1,5), q=ri(1,5);
      const ans = `x=${p}, y=${q}`;
      return {type:["객관식","단답형"], q:`유리함수 $y=\\dfrac{1}{x-${p}}+${q}$의 점근선의 방정식을 구하시오.`, choices:[`$x=${p}, y=${q}$`,`$x=-${p}, y=${q}$`,`$x=${p}, y=-${q}$`,`$x=0, y=0$`,`$x=${q}, y=${p}$`], ci:0, ans:`$x=${p}, y=${q}$`, sa:ans, sol:`분모가 0이 되는 $x=${p}$와 상수항 $y=${q}$가 점근선입니다.`, hints:["분모=0 인 x값","전체 식의 상수항 y값"], terms:"유리함수의 점근선", std:"[10공수04-04] 유리함수"};
    }
   ],
   5: [
    ()=>{
      const a=ri(2,4), p=ri(1,5), q=ri(-3,3);
      const ans = `$x \\geq ${p}$`;
      return {type:["객관식","단답형"], q:`무리함수 $y=\\sqrt{x-${p}}${sp(q)}$의 정의역을 구하시오.`, choices:[`$x \\geq ${p}$`,`$x \\leq ${p}$`,`$x \\geq 0$`,`$y \\geq ${q}$`,`$x > ${p}$`], ci:0, ans:`$x \\geq ${p}$`, sa:`x>=${p}`, sol:`근호 안의 식 $x-${p}$가 0 이상이어야 하므로 $x \\geq ${p}$입니다.`, hints:["√ 안의 값은 0 이상이어야 함"], terms:"무리함수의 정의역", std:"[10공수04-05] 무리함수"};
    }
   ]
};
