// ============================================================================
// [고1 공통수학2] 집합과 명제 데이터 모듈
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
        const n=ri(2,6); const x=ri(1,n);
        return {type:["OX형"], q:`$${x}$은 집합 $\\{1, 2, \\ldots, ${n}\\}$의 원소이다.`, ans:'O', ci:0, sol:`$${x}$는 해당 집합에 포함되어 있으므로 원소가 맞습니다.`, hints:["원소의 정의: 집합에 포함된 개별 객체"], terms:"집합의 원소", std:"[10공수03-01] 집합"};
      },
      ()=>{
        const a=ri(2,5); const b=ri(a+2, a+6);
        const q=`$A = \\{x | ${a} < x < ${b}, x$는 정수$\\}$를 원소나열법으로 나타낼 때 옳은 것은?`;
        const set=[]; for(let i=a+1; i<b; i++) set.push(i);
        const ans=`$\\{${set.join(', ')}\\}$`;
        return {type:["객관식"], q, choices:[ans, `$\\{${a}, ${b}\\}$`, `$\\{${a+1}, \\ldots, ${b}\\}$`, `$\\{${set.slice(1).join(', ')}\\}$`, `$\\emptyset$`], ci:0, ans, sa:set.join(','), sol:`${a}보다 크고 ${b}보다 작은 정수는 ${set.join(', ')}입니다.`, hints:["부등호 확인: < 는 포함하지 않음"], terms:"집합의 표현", std:"[10공수03-01] 집합"};
      },
      ()=>{
        const t = ri(0,1);
        const q = t===0 ? `다음 중 옳은 것은? (단, $A=\\{1, 2, \\{1, 2\\}\\}$)` : `다음 중 옳은 것은? (단, $A=\\{1, 2, \\{3\\}\\}$)`;
        const choices = t===0 ? ["$\\{1, 2\\} \\in A$", "$\\{1, 2\\} = A$", "$3 \\in A$", "$\\{1\\} \\in A$", "$\\{2\\} \\subset A$"] : ["$\\{3\\} \\in A$", "$3 \\in A$", "$\\{1, 2\\} \\in A$", "$A \\subset 1$", "$\\emptyset \\in A$"];
        return {type:["객관식"], q, choices, ci:0, ans:choices[0], sa:"1", sol:t===0?"$\\{1, 2\\}$ 자체가 집합 $A$의 원소로 들어있으므로 $\\{1, 2\\} \\in A$는 참입니다.":"$\\{3\\}$이 집합 $A$의 원소로 나열되어 있으므로 참입니다. 3은 원소의 안쪽 구성물일 뿐 $A$의 직접적인 원소가 아닙니다.", hints:["원소($\\in$)와 부분집합($\\subset$) 기호 구분"], terms:"집합의 관계", std:"[10공수03-01] 집합"};
      }
   ],
   2: [
      ()=>{
        const n=ri(3,5);
        const q=`집합 $A$의 원소의 개수가 ${n}개일 때, 집합 $A$의 부분집합의 개수를 구하시오.`;
        const ans = Math.pow(2, n);
        return {type:["객관식","단답형"], q, choices:[`$${ans}$`, `$${ans*2}$`, `$${ans-1}$`, `$${n*2}$`, `$${n*n}$`], ci:0, ans:`$${ans}$`, sa:ans, sol:`원소의 개수가 $n$개인 집합의 부분집합의 개수는 $2^n$개입니다. $2^{${n}} = ${ans}$`, hints:["$2^n$ 공식 활용"], terms:"부분집합의 개수", std:"[10공수03-01] 집합"};
      },
      ()=>{
        const n=ri(2,4); const m=ri(1,2);
        const q=`집합 $A=\\{1, 2, \\ldots, ${n+m}\\}$의 부분집합 중 $\\{1, 2, \\ldots, ${n}\\}$을 반드시 원소로 갖는 부분집합의 개수는?`;
        const ans = Math.pow(2, m);
        return {type:["객관식","단답형"], q, choices:[`$${ans}$`, `$${Math.pow(2,n+m)}$`, `$${ans*2}$`, `$${n+m}$`, `$${m}$`], ci:0, ans:`$${ans}$`, sa:ans, sol:`특정한 원소 $k$개를 반드시 포함하는 부분집합의 개수는 $2^{n-k}$입니다. $2^{(${n+m})-${n}} = 2^{${m}} = ${ans}$`, hints:["반드시 포함하는 원소는 제외하고 생각"], terms:"부분집합의 개수", std:"[10공수03-01] 집합"};
      }
   ],
   3: [
      ()=>{
        const na=ri(15,25), nb=ri(15,25), nab=ri(5,10);
        const ans = na+nb-nab;
        return {type:["객관식","단답형","서술형"], q:`학급 학생 전체를 대상으로 두 동아리 $A, B$ 가입 여부를 조사하였다. $A$ 동아리에 가입한 학생이 ${na}명, B$ 동아리에 가입한 학생이 ${nb}명이고, 두 동아리에 모두 가입한 학생이 ${nab}명일 때, 적어도 한 동아리에 가입한 학생의 수를 구하시오.`, choices:makeWrongChoices(`${ans}`, [`${na+nb}`, `${ans-2}`, `${ans+5}`, `${na+nb+nab}`]).choices, ci:0, ans:`${ans}`, sa:ans, sol:`적어도 한 동아리에 가입한 학생 수는 합집합의 원소 개수입니다. $n(A \\cup B) = n(A) + n(B) - n(A \\cap B) = ${na} + ${nb} - ${nab} = ${ans}$`, hints:["포함-배제의 원리"], terms:"집합의 활용", std:"[10공수03-02] 집합의 연산"};
      },
      ()=>{
        const q=`다음 중 집합의 연산 법칙으로 항상 옳은 것은?`;
        const choices=["$(A \\cup B)^c = A^c \\cap B^c$", "$A - B = A \\cup B^c$", "$A \\cap (B \\cup C) = (A \\cap B) \\cup C$", "$A - B = B - A$", "$A \\cup A^c = \\emptyset$"];
        return {type:["객관식"], q, choices, ci:0, ans:choices[0], sa:"1", sol:"드모르간의 법칙에 의해 $(A \\cup B)^c = A^c \\cap B^c$가 성립합니다.", hints:["드모르간의 법칙", "차집합의 성질: $A-B = A \\cap B^c$"], terms:"집합의 연산 법칙", std:"[10공수03-02] 집합의 연산"};
      }
   ],
   4: [
      ()=>{
        const a=ri(1,3);
        const q=`두 조건 $p: x=${a}, q: x^2=${a*a}$에 대하여 $p$는 $q$이기 위한 어떤 조건인가?`;
        return {type:["객관식"], q, choices:["충분조건이지만 필요조건은 아니다", "필요조건이지만 충분조건은 아니다", "필요충분조건이다", "아무 조건도 아니다"], ci:0, ans:"충분조건이지만 필요조건은 아니다", sa:"1", sol:`$p \\Rightarrow q$ ($x=${a} \\Rightarrow x^2=${a*a}$)는 참이지만, $q \\Rightarrow p$ ($x^2=${a*a} \\Rightarrow x=${a}$ 또는 $x=-${a}$)는 거짓이므로 충분조건입니다.`, hints:["진리집합의 포함관계 확인 ($P \\subset Q$)"], terms:"명제와 조건", std:"[10공수03-04] 충분조건과 필요조건"};
      },
      ()=>{
        const isO = Math.random() > 0.5;
        const q = isO ? "명제 '$x$가 4의 배수이면 $x$는 2의 배수이다'의 대우를 쓰고 참/거짓을 판별하시오." : "명제 '$x$가 2의 배수이면 $x$는 4의 배수이다'의 대우를 쓰고 참/거짓을 판별하시오.";
        const ans = isO ? "대우: $x$가 2의 배수가 아니면 $x$는 4의 배수가 아니다 (참)" : "대우: $x$가 4의 배수가 아니면 $x$는 2의 배수가 아니다 (거짓)";
        return {type:["단답형","서술형"], q, ans, sa:isO?"참":"거짓", sol:isO?"원래 명제가 참이므로 그 대우도 항상 참입니다.":"원래 명제에서 2는 2의 배수이지만 4의 배수가 아니므로 거짓입니다. 따라서 대우도 거짓입니다.", hints:["명제와 그 대우의 참/거짓은 항상 일치함"], terms:"명제의 역과 대우", std:"[10공수03-03] 명제"};
      },
      ()=>{
        const total=ri(40, 50); const soccer=ri(20, 30); const baseball=ri(15, 25); const neither=ri(5, 10);
        const both = soccer + baseball - (total - neither);
        const q = `어느 반 학생 ${total}명 중 축구를 좋아하는 학생이 ${soccer}명, 야구를 좋아하는 학생이 ${baseball}명이다. 두 종목을 모두 좋아하지 않는 학생이 ${neither}명일 때, 두 종목을 모두 좋아하는 학생의 수는?`;
        return {type:["객관식","단답형"], q, choices:makeWrongChoices(`${both}`, [`${both+5}`, `${both-3}`, `${neither}`, `${soccer-both}`]).choices, ci:0, ans:`${both}`, sa:both, sol:`$n(A \\cup B) = ${total} - ${neither} = ${total-neither}$\\n$n(A \\cap B) = n(A) + n(B) - n(A \\cup B) = ${soccer} + ${baseball} - ${total-neither} = ${both}$`, hints:["실생활 문장을 집합 기호로 변환"], terms:"집합의 활용", std:"[10공수03-02] 집합의 연산"};
      }
   ],
   5: [
      ()=>{
        const sum = ri(10, 30) * 2;
        const maxArea = Math.pow(sum/4, 2);
        const q = `길이가 ${sum}m인 줄을 모두 사용하여 직사각형 모양의 가축 우리를 만들려고 한다. 가축 우리의 둘레가 ${sum}m일 때, 가축 우리의 넓이의 최댓값을 구하시오.`;
        return {type:["단답형","서술형"], q, ans:`${maxArea}`, sa:maxArea, sol:`가로를 $x$, 세로를 $y$라 하면 $2(x+y) = ${sum}$ 이므로 $x+y = ${sum/2}$ 입니다. 산술-기하 평균 부등식에 의해 $\\dfrac{x+y}{2} \\geq \\sqrt{xy}$ 가 성립하므로, $\\left(\\dfrac{${sum/2}}{2}\\right)^2 \\geq xy$ 즉 $xy \\leq ${maxArea}$ 입니다. 따라서 최댓값은 ${maxArea}$입니다.`, hints:["산술-기하 평균 부등식 적용"], terms:"산술-기하 평균의 활용", std:"[10공수03-05] 절대부등식"};
      },
      ()=>{
        const total=100; const A=ri(40,50); const B=ri(30,45); const C=ri(20,35);
        const AB=ri(10,15); const BC=ri(5,10); const CA=ri(5,10); const ABC=ri(2,5);
        const ans = A+B+C - (AB+BC+CA) + ABC;
        const q = `어느 학교 학생 100명을 대상으로 세 가지 과목 A, B, C에 대한 선호도를 조사하였다. A를 좋아하는 학생 ${A}명, B를 좋아하는 학생 ${B}명, C를 좋아하는 학생 ${C}명이다. A와 B를 모두 좋아하는 학생 ${AB}명, B와 C를 좋아하는 학생 ${BC}명, C와 A를 좋아하는 학생 ${CA}명이며 세 과목을 모두 좋아하는 학생이 ${ABC}명일 때, 적어도 한 과목을 좋아하는 학생의 수는?`;
        return {type:["객관식","단답형"], q, choices:makeWrongChoices(`${ans}`, [`${A+B+C}`, `${ans- ABC}`, `${ans+10}`, `100`]).choices, ci:0, ans:`${ans}`, sa:ans, sol:`세 집합의 합집합의 원소 개수 공식: $n(A \\cup B \\cup C) = n(A)+n(B)+n(C) - (n(A \\cap B)+n(B \\cap C)+n(C \\cap A)) + n(A \\cap B \\cap C) = ${A}+${B}+${C} - (${AB}+${BC}+${CA}) + ${ABC} = ${ans}$`, hints:["3개 집합의 포함-배제 원리 공식 적용"], terms:"집합의 활용", std:"[10공수03-02] 집합의 연산"};
      },
      ()=>{
        const q = "다음 중 항상 참인 명제(절대부등식)가 아닌 것은? (단, $a, b$는 실수)";
        const choices = ["$a^2 + b^2 < 2ab$", "$a^2 + b^2 \\geq 2ab$", "$a^2 + ab + b^2 \\geq 0$", "$|a| + |b| \\geq |a+b|$", "$\\dfrac{a+b}{2} \\geq \\sqrt{ab}$ (단, $a,b > 0$)"];
        return {type:["객관식"], q, choices, ci:0, ans:choices[0], sa:"1", sol:"$a^2 + b^2 - 2ab = (a-b)^2 \\geq 0$ 이므로 $a^2 + b^2 \\geq 2ab$ 가 항상 성립합니다. 따라서 <1번>은 거짓인 경우가 존재합니다.", hints:["제곱식은 항상 0 이상임을 이용", "유명한 절대부등식들 확인"], terms:"절대부등식", std:"[10공수03-05] 절대부등식"};
      }
   ]
};