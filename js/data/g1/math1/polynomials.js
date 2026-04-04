// ============================================================================
// [고1 공통수학1] 다항식 데이터 모듈
// ============================================================================

import { ri, sp, spx, scx, scx2, makeWrongChoices } from '../../../utils.js';

export const ox = [
   {q:"$(a+b)^2 = a^2+2ab+b^2$이다.",ans:"O",exp:"$(a+b)^2$을 전개하면 $a^2+2ab+b^2$이므로 참이다."},
   {q:"$(a-b)^2 = a^2-b^2$이다.",ans:"X",exp:"$(a-b)^2 = a^2-2ab+b^2$이다. $a^2-b^2$은 $(a+b)(a-b)$의 전개식이다."},
   {q:"$(a+b)^3 = a^3+3a^2b+3ab^2+b^3$이다.",ans:"O",exp:"세제곱 전개 공식 $(a+b)^3=a^3+3a^2b+3ab^2+b^3$은 참이다."},
   {q:"다항식의 덧셈에서 교환법칙이 성립한다.",ans:"O",exp:"다항식의 덧셈은 교환법칙 $A+B=B+A$가 성립한다."},
   {q:"$(a+b)(a-b) = a^2+b^2$이다.",ans:"X",exp:"$(a+b)(a-b) = a^2-b^2$이다. 부호에 주의해야 한다."},
   {q:"다항식의 곱셈에서 결합법칙이 성립한다.",ans:"O",exp:"$A(BC)=(AB)C$로 결합법칙이 성립한다."},
   {q:"$x+\\dfrac{1}{x}=k$이면 $x^2+\\dfrac{1}{x^2}=k^2$이다.",ans:"X",exp:"$\\left(x+\\dfrac{1}{x}\\right)^2=x^2+2+\\dfrac{1}{x^2}=k^2$이므로 $x^2+\\dfrac{1}{x^2}=k^2-2$이다."},
   {q:"$(2x+3y)^2 = 4x^2+12xy+9y^2$이다.",ans:"O",exp:"$(2x+3y)^2 = (2x)^2+2\\cdot2x\\cdot3y+(3y)^2=4x^2+12xy+9y^2$으로 참이다."},
   {q:"$(a+b)^2-(a-b)^2=4ab$이다.",ans:"O",exp:"$(a+b)^2=a^2+2ab+b^2$, $(a-b)^2=a^2-2ab+b^2$이므로 차는 $4ab$이다."},
   {q:"$(x+1)(x^2-x+1)=x^3+1$이다.",ans:"O",exp:"$(x+1)(x^2-x+1)=x^3-x^2+x+x^2-x+1=x^3+1$이다."},
   {q:"다항식 $2x^2-3x+1$의 최고차항의 계수는 $3$이다.",ans:"X",exp:"최고차항은 $2x^2$이므로 최고차항의 계수는 $2$이다."},
   {q:"$x^2+2x+1=(x+1)^2$이다.",ans:"O",exp:"$(x+1)^2=x^2+2x+1$이므로 참이다."},
   {q:"$a^2-b^2=(a-b)^2$이다.",ans:"X",exp:"$a^2-b^2=(a+b)(a-b)$이다. $(a-b)^2=a^2-2ab+b^2$이다."},
   {q:"$(x+y+z)^2 = x^2+y^2+z^2+2xy+2yz+2zx$이다.",ans:"O",exp:"전개하면 성립한다."},
   {q:"$(a+b)^2 = a^2+b^2$이다.",ans:"X",exp:"$(a+b)^2=a^2+2ab+b^2$이다. $2ab$ 항이 있다."},
   {q:"$(-a)^2 = a^2$이다.",ans:"O",exp:"$(-a)^2=(-1)^2 a^2=a^2$이다."},
   {q:"$a^2-b^2 = (a+b)(a-b)$이다.",ans:"O",exp:"합차 공식이다."},
   {q:"$(a-b)^3 = a^3-3a^2b+3ab^2-b^3$이다.",ans:"O",exp:"세제곱 전개 공식이다."},
   {q:"다항식의 덧셈은 항상 교환법칙이 성립한다.",ans:"O",exp:"$A+B=B+A$가 항상 성립한다."},
   {q:"$(2x+1)^2 = 4x^2+1$이다.",ans:"X",exp:"$(2x+1)^2=4x^2+4x+1$이다. 중간 항 $4x$가 있다."}
];

export const regular = {
   1:[
    {type:["객관식","단답형","서술형"],q:"$(2x^2-3x+1)+(x^2+5x-2)$를 계산하시오.",choices:["$3x^2+2x-1$","$3x^2-2x+1$","$x^2+2x-1$","$3x^2+2x+1$","$3x^2-2x-1$"],ci:0,ans:"$3x^2+2x-1$",sa:"3x^2+2x-1",sol:"동류항끼리 묶기\n$(2x^2+x^2)+(-3x+5x)+(1-2)=3x^2+2x-1$",hints:["동류항끼리 더한다","각 차수별로 모으기","계산: $3x^2+2x-1$"],terms:"동류항: 문자와 차수가 같은 항",std:"[10공수01-01] 다항식의 사칙연산"},
    {type:["객관식","단답형","서술형"],q:"$3x(2x-4)$를 전개하시오.",choices:["$6x^2-12x$","$6x^2+12x$","$5x^2-12x$","$6x^2-4x$","$3x^2-12x$"],ci:0,ans:"$6x^2-12x$",sa:"6x^2-12x",sol:"분배법칙: $3x\\cdot2x-3x\\cdot4=6x^2-12x$",hints:["분배법칙 $a(b+c)=ab+ac$","$3x\\cdot2x=6x^2$","$3x\\cdot4=12x$"],terms:"분배법칙",std:"[10공수01-01] 다항식의 사칙연산"}
   ],
   2:[
    {type:["객관식","단답형","서술형"],q:"$(x+3)(x-5)$를 전개하시오.",choices:["$x^2-2x-15$","$x^2+2x-15$","$x^2-2x+15$","$x^2-8x-15$","$x^2+8x+15$"],ci:0,ans:"$x^2-2x-15$",sa:"x^2-2x-15",sol:"$(x+a)(x+b)$ 공식에 $a=3,b=-5$ 대입\n$x^2-2x-15$",hints:["$(x+a)(x+b)=x^2+(a+b)x+ab$","$a+b=-2$, $ab=-15$","$x^2-2x-15$"],terms:"곱셈공식",std:"[10공수01-01] 다항식의 사칙연산"},
    {type:["객관식","단답형","서술형"],q:"$(2x+1)(3x-2)$를 전개하시오.",choices:["$6x^2-x-2$","$6x^2+x-2$","$6x^2-x+2$","$5x^2-x-2$","$6x^2+x+2$"],ci:0,ans:"$6x^2-x-2$",sa:"6x^2-x-2",sol:"분배법칙 전개: $6x^2-4x+3x-2=6x^2-x-2$",hints:["분배법칙으로 각 항을 전개","$-4x+3x=-x$","상수: $-2$"],terms:"분배법칙을 이용한 다항식의 전개",std:"[10공수01-01] 다항식의 사칙연산"},
    {type:["객관식","단답형","서술형"],q:"$(x+2)^2-(x-2)^2$을 간단히 하시오.",choices:["$8x$","$4x$","$2x$","$8x^2$","$4$"],ci:0,ans:"$8x$",sa:"8x",sol:"합차공식: $[(x+2)+(x-2)][(x+2)-(x-2)]=2x\\cdot4=8x$",hints:["$A^2-B^2=(A+B)(A-B)$","$(A+B)=2x$","$(A-B)=4$"],terms:"합차공식",std:"[10공수01-01] 다항식의 사칙연산"}
   ],
   3:[
    {type:["객관식","단답형","서술형"],q:"$(x+y)^3$을 전개하시오.",choices:["$x^3+3x^2y+3xy^2+y^3$","$x^3+y^3$","$x^3-3x^2y+3xy^2-y^3$","$x^3+2x^2y+2xy^2+y^3$","$x^3+3xy+y^3$"],ci:0,ans:"$x^3+3x^2y+3xy^2+y^3$",sa:"x^3+3x^2y+3xy^2+y^3",sol:"$(a+b)^3=a^3+3a^2b+3ab^2+b^3$에 대입",hints:["세제곱 전개 공식","계수: 1,3,3,1","$a=x,b=y$"],terms:"$(a+b)^3$ 전개",std:"[10공수01-01] 다항식의 사칙연산"}
   ],
   4:[
    {type:["객관식","단답형","서술형"],q:"$x+\\dfrac{1}{x}=3$일 때 $x^2+\\dfrac{1}{x^2}$의 값을 구하시오.",choices:["$7$","$9$","$11$","$5$","$6$"],ci:0,ans:"$7$",sa:"7",sol:"양변 제곱: $x^2+2+\\dfrac{1}{x^2}=9$\n따라서 $x^2+\\dfrac{1}{x^2}=7$",hints:["주어진 식 제곱","$1+2\\cdot1+\\dfrac{1}{x^2}=9$ (단, $x\\cdot\\dfrac{1}{x}=1$)","$=7$"],terms:"대칭식 활용",std:"[10공수01-01] 다항식의 사칙연산"}
   ],
   5:[
    {type:["객관식","단답형","서술형"],q:"$x+y+z=4$, $xy+yz+zx=2$, $xyz=1$일 때 $x^3+y^3+z^3$의 값을 구하시오.",choices:["$43$","$40$","$46$","$38$","$50$"],ci:0,ans:"$43$",sa:"43",sol:"$x^2+y^2+z^2=(x+y+z)^2-2(xy+yz+zx)=16-4=12$\n$x^2+y^2+z^2-xy-yz-zx=10$\n$x^3+y^3+z^3=3xyz+(x+y+z)\\cdot10=3+40=43$",hints:["$(x+y+z)^2$으로 $x^2+y^2+z^2$ 구하기","$x^2+y^2+z^2-xy-yz-zx=10$","$x^3+y^3+z^3-3xyz=(x+y+z)(\\ldots)$"],terms:"$x^3+y^3+z^3-3xyz=(x+y+z)(x^2+y^2+z^2-xy-yz-zx)$",std:"[10공수01-01] 다항식의 사칙연산"}
   ]
};

export const generators = {
   1: [
    ()=>{ // Lv1-1: Addition/Subtraction with variable rotation (x,y / a,b)
      const vars = [["x","y"], ["a","b"], ["u","v"]][ri(0,1)];
      const [v1, v2] = vars;
      const [a, b, c, d] = [ri(1,5), ri(-5,5), ri(1,5), ri(-5,5)];
      const op = Math.random() > 0.5 ? "+" : "-";
      const q = `$A = ${a}${v1} ${sp(b)}${v2}$, $B = ${c}${v1} ${sp(d)}${v2}$일 때, $A ${op} B$를 계산하시오.`;
      const r1 = op === "+" ? a + c : a - c;
      const r2 = op === "+" ? b + d : b - d;
      const ans = `$${scx(r1).replace("x", v1)} ${spx(r2).replace("x", v2)}$`;
      const sa = `${r1}${v1}${r2>=0?"+":""}${r2}${v2}`;
      const ch = makeWrongChoices(ans, [
        `$${scx(r1+1).replace("x", v1)} ${spx(r2).replace("x", v2)}$`,
        `$${scx(r1).replace("x", v1)} ${spx(r2-1).replace("x", v2)}$`,
        `$${scx(a+c).replace("x", v1)} ${spx(b-d).replace("x", v2)}$`
      ]);
      return {type:["객관식","단답형","서술형"], q, choices:ch.choices, ci:ch.ci, ans, sa, sol:`$A ${op} B = (${a} ${op} ${c})${v1} + (${b} ${op} ${d})${v2} = ${ans}$`, hints:["동류항끼리 모아서 계산하세요."], terms:"다항식의 덧셈과 뺄셈", std:"[10공수01-01]"};
    },
    ()=>{ // Lv1-2: Scalar multiplication and subtraction
      const v = ["x", "a", "t"][ri(0,2)];
      const [a, b, k] = [ri(1,3), ri(-3,3), ri(2,3)];
      const q = `$P = ${a}${v}^2 ${sp(b)}$, $Q = ${v}^2 - 1$일 때,$${k}P - Q$를 계산하시오.`;
      const r1 = k * a - 1;
      const r2 = k * b + 1;
      const ans = `$${scx2(r1).replace("x", v)} ${sp(r2)}$`;
      const sa = `${r1}${v}^2${r2>=0?"+":""}${r2}`;
      const ch = makeWrongChoices(ans, [
        `$${scx2(r1+1).replace("x", v)} ${sp(r2)}$`,
        `$${scx2(r1).replace("x", v)} ${sp(r2-1)}$`,
        `$${scx2(a-1).replace("x", v)} ${sp(b+1)}$`
      ]);
      return {type:["객관식","단답형","서술형"], q, choices:ch.choices, ci:ch.ci, ans, sa, sol:`$${k}P - Q = ${k}(${a}${v}^2 ${sp(b)}) - (${v}^2 - 1) = (${k*a}-1)${v}^2 + (${k*b}+1) = ${ans}$`, hints:[`${k}를 P의 모든 항에 곱한 뒤 Q를 빼세요.`], terms:"다항식의 연산", std:"[10공수01-01]"};
    }
   ],
   2: [
    ()=>{ // Lv2-1: (x+a)(x+b) expansion
      const v = ["x", "a", "u"][ri(0,2)];
      const [a, b] = [ri(-5,5), ri(-5,5)];
      if(a===0 || b===0) return null;
      const q = `$(${v} ${sp(a)})(${v} ${sp(b)})$를 전개하시오.`;
      const s = a + b;
      const p = a * b;
      const ans = `$${v}^2 ${spx(s).replace("x", v)} ${sp(p)}$`;
      const sa = `${v}^2${s>=0?"+":""}${s}${v}${p>=0?"+":""}${p}`;
      const ch = makeWrongChoices(ans, [
        `$${v}^2 ${spx(a-b).replace("x", v)} ${sp(p)}$`,
        `$${v}^2 ${spx(s).replace("x", v)} ${sp(a+b)}$`,
        `$${v}^2 ${spx(p).replace("x", v)} ${sp(s)}$`
      ]);
      return {type:["객관식","단답형","서술형"], q, choices:ch.choices, ci:ch.ci, ans, sa, sol:`$(x+a)(x+b) = x^2 + (a+b)x + ab$ 공식을 사용합니다.\n$ax+b = ${s}, ab = ${p}$ 이므로 답은 ${ans} 입니다.`, hints:["$(x+a)(x+b) = x^2 + (a+b)x + ab$"], terms:"곱셈공식", std:"[10공수01-02]"};
    },
    ()=>{ // Lv2-2: (ax+b)^2 expansion
      const v = ["x", "y", "b"][ri(0,2)];
      const [a, b] = [ri(2,4), ri(1,5)];
      const op = Math.random() > 0.5 ? "+" : "-";
      const q = `$(${a}${v} ${op} ${b})^2$을 전개하시오.`;
      const r1 = a * a;
      const r2 = 2 * a * b * (op === "+" ? 1 : -1);
      const r3 = b * b;
      const ans = `$${r1}${v}^2 ${spx(r2).replace("x", v)} + ${r3}$`;
      const sa = `${r1}${v}^2${r2>=0?"+":""}${r2}${v}+${r3}`;
      const ch = makeWrongChoices(ans, [
        `$${r1}${v}^2 ${spx(a*b).replace("x", v)} + ${r3}$`,
        `$${r1}${v}^2 ${spx(r2).replace("x", v)} - ${r3}$`,
        `$${a}${v}^2 ${spx(r2).replace("x", v)} + ${b}$`
      ]);
      return {type:["객관식","단답형","서술형"], q, choices:ch.choices, ci:ch.ci, ans, sa, sol:`$(ax \\pm b)^2 = a^2x^2 \\pm 2abx + b^2$ 공식을 사용합니다.\n$(${a}${v})^2 = ${r1}${v}^2$, $2 \\cdot ${a}${v} \\cdot ${b} = ${Math.abs(r2)}${v}$ 이므로 답은 ${ans} 입니다.`, hints:["$(A+B)^2 = A^2 + 2AB + B^2$"], terms:"곱셈공식", std:"[10공수01-02]"};
    }
   ],
   3: [
    ()=>{ // Lv3-1: (x+a)(x+b)(x+c) expansion
      const v = ["x", "a", "s"][ri(0,2)];
      const [a, b, c] = [ri(1,3), ri(1,3), ri(1,3)];
      const q = `$(${v} + ${a})(${v} + ${b})(${v} + ${c})$를 전개하시오.`;
      const s1 = a + b + c;
      const s2 = a*b + b*c + c*a;
      const s3 = a*b*c;
      const ans = `$${v}^3 + ${s1}${v}^2 + ${s2}${v} + ${s3}$`;
      const sa = `${v}^3+${s1}${v}^2+${s2}${v}+${s3}`;
      const ch = makeWrongChoices(ans, [
        `$${v}^3 + ${s1}${v}^2 + ${s3}$`,
        `$${v}^3 + ${s2}${v}^2 + ${s1}${v} + ${s3}$`,
        `$${v}^3 + ${a+b+c}${v}^2 + ${a*b*c}$`
      ]);
      return {type:["객관식","단답형","서술형"], q, choices:ch.choices, ci:ch.ci, ans, sa, sol:`$(x+a)(x+b)(x+c) = x^3 + (a+b+c)x^2 + (ab+bc+ca)x + abc$\n$a+b+c = ${s1}, ab+bc+ca = ${s2}, abc = ${s3}$ 이므로 답은 ${ans} 입니다.`, hints:["공식: $x^3 + (\text{합})x^2 + (\text{둘씩 곱의 합})x + (\text{곱})$"], terms:"곱셈공식", std:"[10공수01-02]"};
    },
    ()=>{ // Lv3-2: Real-life Garden Area
      const [a, b, k] = [ri(2,6), ri(2,6), ri(1,2)];
      const q = `가로의 길이가 $x+${a}$, 세로의 길이가 $x+${b}$인 직사각형 모양의 꽃밭이 있다. 이 꽃밭의 둘레에 폭이 $${k}$인 길을 만들었을 때, 길을 포함한 전체 직사각형의 넓이를 $x$에 대한 다항식으로 나타내시오.`;
      const A = a + 2*k;
      const B = b + 2*k;
      const s = A + B;
      const p = A * B;
      const ans = `$x^2 + ${s}x + ${p}$`;
      const sa = `x^2+${s}x+${p}`;
      const ch = makeWrongChoices(ans, [
        `$x^2 + ${a+b}x + ${a*b}$`,
        `$x^2 + ${s}x + ${a*b}$`,
        `$x^2 + ${a+b+k}x + ${p}$`
      ]);
      return {type:["객관식","단답형","서술형"], q, choices:ch.choices, ci:ch.ci, ans, sa, sol:`가로: $(x+${a}) + 2 \\cdot ${k} = x+${A}$, 세로: $(x+${b}) + 2 \\cdot ${k} = x+${B}$\n전체 넓이: $(x+${A})(x+${B}) = x^2 + (${A}+${B})x + ${A}\\cdot${B} = ${ans}$`, hints:[`길의 폭$${k}$가 양쪽에 더해지므로 가로, 세로에 각각 $${2*k}$를 더해야 합니다.`], terms:"다항식의 곱셈 응용", std:"[10공수01-02]"};
    }
   ],
   4: [
    ()=>{ // Lv4-1: Reciprocal Identity
      const v = ["a", "x", "u"][ri(0,2)];
      const k = ri(3, 6);
      const q = `$${v} + \\dfrac{1}{${v}} = ${k}$일 때, $${v}^2 + \\dfrac{1}{${v}^2}$의 값을 구하시오.`;
      const ans_val = k * k - 2;
      const ans = `$${ans_val}$`;
      const sa = `${ans_val}`;
      const ch = makeWrongChoices(ans, [
        `$${k * k}$`,
        `$${k * k + 2}$`,
        `$${k * k - 1}$`,
        `$${k * k - 4}$`
      ]);
      return {type:["객관식","단답형","서술형"], q, choices:ch.choices, ci:ch.ci, ans, sa, sol:`$\\left(${v} + \\dfrac{1}{${v}}\\right)^2 = ${v}^2 + 2 + \\dfrac{1}{${v}^2} = ${k}^2 = ${k*k}$\n따라서 $${v}^2 + \\dfrac{1}{${v}^2} = ${k*k} - 2 = ${ans_val}$ 입니다.`, hints:[`$(A+B)^2 = A^2 + 2AB + B^2$ 공식을 이용하세요.`,`$${v} \\cdot \\dfrac{1}{${v}} = 1$ 임을 활용합니다.`], terms:"곱셈공식의 변형", std:"[10공수01-02]"};
    },
    ()=>{ // Lv4-2: Real-life Shipping Container
      const [a, b, c] = [ri(1,3), ri(2,4), ri(3,5)];
      const v = ["x", "h"][ri(0,1)];
      const q = `어느 해운 회사에서 사용하는 컨테이너의 가로, 세로, 높이의 길이가 각각 $${v}+${a}, ${v}+${b}, ${v}+${c}$이다. 이 컨테이너의 부피를$${v}$에 대한 다항식으로 나타내시오.`;
      const s1 = a + b + c;
      const s2 = a*b + b*c + c*a;
      const s3 = a*b*c;
      const ans = `$${v}^3 + ${s1}${v}^2 + ${s2}${v} + ${s3}$`;
      const sa = `${v}^3+${s1}${v}^2+${s2}${v}+${s3}`;
      const ch = makeWrongChoices(ans, [
        `$${v}^3 + ${s1}${v}^2 + ${s3}$`,
        `$${v}^3 + ${s2}${v}^2 + ${s1}${v} + ${s3}$`,
        `$${v}^3 + ${a*b*c}$`
      ]);
      return {type:["객관식","단답형","서술형"], q, choices:ch.choices, ci:ch.ci, ans, sa, sol:`부피 $V = (가로) \\times (세로) \\times (높이)$\n$V = (${v}+${a})(${v}+${b})(${v}+${c}) = ${ans}$`, hints:[`세 일차식의 곱셈 공식을 사용하세요.`], terms:"다항식의 곱셈 응용", std:"[10공수01-02]"};
    }
   ],
   5: [
    ()=>{ // Lv5-1: Master Identity (a^3+b^3+c^3-3abc)
      const v = ["x, y, z", "a, b, c", "u, v, w"][ri(0,1)];
      const [v1, v2, v3] = v.split(", ");
      const s = ri(3, 6);
      const sq = ri(7, 15);
      const p2 = (s * s - sq) / 2;
      if(!Number.isInteger(p2)) return null;
      const s3 = ri(1, 5); // xyz
      const q = `$${v1}+${v2}+${v3} = ${s}$,$${v1}^2+${v2}^2+${v3}^2 = ${sq}$, $${v1}${v2}${v3} = ${s3}$일 때,$${v1}^3+${v2}^3+${v3}^3$의 값을 구하시오.`;
      const ans_val = s * (sq - p2) + 3 * s3;
      const ans = `$${ans_val}$`;
      const sa = `${ans_val}`;
      const ch = makeWrongChoices(ans, [
        `$${ans_val + 3}$`,
        `$${ans_val - 3}$`,
        `$${s * sq}$`,
        `$${s * sq + s3}$`
      ]);
      return {type:["객관식","단답형","서술형"], q, choices:ch.choices, ci:ch.ci, ans, sa, sol:`$x^3+y^3+z^3-3xyz = (x+y+z)(x^2+y^2+z^2-xy-yz-zx)$ 공식을 이용합니다.\n$xy+yz+zx = \\frac{(x+y+z)^2-(x^2+y^2+z^2)}{2} = \\frac{${s}^2-${sq}}{2} = ${p2}$\n$x^3+y^3+z^3 = ${s}(${sq}-${p2}) + 3(${s3}) = ${ans_val}$ 입니다.`, hints:["$x^3+y^3+z^3-3xyz = (x+y+z)(x^2+y^2+z^2-xy-yz-zx)$"], terms:"복잡한 곱셈공식의 변형", std:"[10공수01-02]"};
    },
    ()=>{ // Lv5-2: Real-life Open Box Construction
      const W = ri(15, 25);
      const H = ri(10, 14);
      const x = 2; // Fixed evaluation point for simplicity in answer
      const q = `가로의 길이가 $${W}\\text{cm}$, 세로의 길이가$${H}\\text{cm}$인 직사각형 모양의 종이의 네 모퉁이에서 한 변의 길이가 $x\\text{cm}$인 정사각형을 잘라내어 윗면이 없는 상자를 만들려고 한다. 이 상자의 부피 $V$를 $x$에 대한 다항식으로 나타내고, $x=${x}$일 때의 부피를 구하시오.`;
      // V(x) = (W-2x)(H-2x)x = (WH - 2(W+H)x + 4x^2)x = 4x^3 - 2(W+H)x^2 + WHx
      const c3 = 4;
      const c2 = -2*(W+H);
      const c1 = W*H;
      const v_val = (W-2*x)*(H-2*x)*x;
      const ans = `$V = ${c3}x^3 ${c2}x^2 + ${c1}x$, $V(${x}) = ${v_val}\\text{cm}^3$`;
      const sa = `${v_val}`;
      const ch = makeWrongChoices(ans, [
        `$V = ${c3}x^3 ${c2/2}x^2 + ${c1}x$, $V(${x}) = ${v_val+10}$`,
        `$V = x^2 ${c2}x + ${c1}$, $V(${x}) = ${v_val-10}$`,
        `$V = ${c3}x^3 ${c2}x^2 + ${c1}x$, $V(${x}) = ${(W-x)*(H-x)*x}$`
      ]);
      return {type:["객관식","단답형","서술형"], q, choices:ch.choices, ci:ch.ci, ans, sa, sol:`상자의 가로: $${W}-2x$, 세로:$${H}-2x$, 높이: $x$\n부피 $V = (${W}-2x)(${H}-2x)x = ${c3}x^3 ${c2}x^2 + ${c1}x$\n$x=${x}$ 대입: $(${W}-4)(${H}-4) \\cdot 2 = ${W-4} \\cdot ${H-4} \\cdot 2 = ${v_val}\\text{cm}^3$`, hints:[`잘라낸 정사각형의 한 변 $x$가 양쪽에서 빠지므로 가로와 세로에서 각각 $2x$를 빼야 합니다.`], terms:"다항식의 곱셈 응용 (부피)", std:"[10공수01-02]"};
    }
   ]
};
