// ============================================================================
// [고1 공통수학2] 도형의 방정식 데이터 모듈
// ============================================================================

import { ri, sp, spx, scx, scx2, makeWrongChoices } from '../../../utils.js';

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
      const [x1,y1,x2,y2]=[ri(-5,5),ri(-5,5),ri(-5,5),ri(-5,5)];
      const d2=(x1-x2)**2 + (y1-y2)**2;
      const ans=`$\\sqrt{${d2}}$`;
      return {type:["객관식","단답형","서술형"],q:`두 점 $A(${x1}, ${y1})$, $B(${x2}, ${y2})$ 사이의 거리를 구하시오.`,choices:[ans,`$\\sqrt{${d2+1}}$`,`$\\sqrt{${Math.max(1,d2-1)}}$`,`$${Math.round(Math.sqrt(d2))}$`,`$${d2}$`],ci:0,ans,sa:Math.sqrt(d2).toFixed(2),sol:`두 점 사이의 거리 공식: $\\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2} = \\sqrt{(${x2-x1})^2 + (${y2-y1})^2} = \\sqrt{${d2}}$`,hints:["거리 공식: $\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$","가로 차이와 세로 차이의 제곱 합"],terms:"두 점 사이의 거리",std:"[10공수02-01] 두 점 사이의 거리"};
    }
   ],
   2: [
    ()=>{
      const [x1,y1,m]=[ri(-3,3),ri(-3,3),ri(-3,3)];
      if(m===0) return null;
      const c = y1 - m*x1;
      const ans = `$y=${m===1?'':m===-1?'-':m}x${sp(c)}$`;
      return {type:["객관식","단답형","서술형"],q:`점 $(${x1}, ${y1})$을 지나고 기울기가 $${m}$인 직선의 방정식을 구하시오.`,choices:[ans,`$y=${m}x${sp(c+1)}$`,`$y=${m}x${sp(c-1)}$`,`$y=${m+1}x${sp(c)}$`,`$y=${m-1}x${sp(c)}$`],ci:0,ans,sa:ans.replace(/\$/g,''),sol:`직선의 방정식: $y-${y1}=${m}(x-${x1})$\n$y=${m}x${sp(-m*x1)}${sp(y1)} = y=${m}x${sp(c)}$`,hints:["공식: $y-y_1=m(x-x_1)$","정리하여 $y=mx+n$ 꼴로 만들기"],terms:"직선의 방정식",std:"[10공수02-02] 직선의 방정식"};
    }
   ],
   3: [
    ()=>{
      const [a,b,c]=[ri(1,4),ri(1,4),ri(-5,5)];
      const [px,py]=[ri(-3,3),ri(-3,3)];
      const nc = -(a*px + b*py);
      const ans = `$${a}x+${b}y${sp(nc)}=0$`;
      return {type:["객관식","단답형","서술형"],q:`직선 $${a}x+${b}y${sp(c)}=0$에 평행하고 점 $(${px}, ${py})$를 지나는 직선의 방정식을 구하시오.`,choices:[ans,`$${a}x+${b}y${sp(nc+1)}=0$`,`$${a}x+${b}y${sp(nc-1)}=0$`,`$${b}x-${a}y${sp(nc)}=0$`,`$${a}x-${b}y${sp(nc)}=0$`],ci:0,ans,sa:ans.replace(/\$/g,''),sol:`평행하므로 $${a}x+${b}y+k=0$ 꼴\n$(${px}, ${py})$ 대입:$${a}(${px})+${b}(${py})+k=0 \\Rightarrow k=${nc}$`,hints:["평행 조건: 기울기가 같다","직선의 계수를 그대로 유지하고 상수항만 조정"],terms:"직선의 평행",std:"[10공수02-03] 두 직선의 위치 관계"};
    }
   ],
   4: [
    ()=>{
      const [a,b,r]=[ri(-3,3),ri(-3,3),ri(1,5)];
      const ans = `$(x${sp(-a)})^2 + (y${sp(-b)})^2 = ${r*r}$`;
      return {type:["객관식","단답형","서술형"],q:`중심이 $(${a}, ${b})$이고 반지름의 길이가 $${r}$인 원의 방정식을 구하시오.`,choices:[ans,`$(x${sp(a)})^2 + (y${sp(b)})^2 = ${r*r}$`,`$(x${sp(-a)})^2 + (y${sp(-b)})^2 = ${r}$`,`$(x${sp(-a)}) + (y${sp(-b)}) = ${r*r}$`,`$(x${sp(-a)})^2 - (y${sp(-b)})^2 = ${r*r}$`],ci:0,ans,sa:ans,sol:`원의 방정식 공식: $(x-a)^2 + (y-b)^2 = r^2$\n$(x-(${a}))^2 + (y-(${b}))^2 = ${r}^2$`,hints:["원의 공식: $(x-a)^2+(y-b)^2=r^2$","중심 좌표의 부호를 반대로 넣어주기"],terms:"원의 방정식",std:"[10공수02-04] 원의 방정식"};
    }
   ],
   5: [
    ()=>{
      const [a,b,c]=[ri(3,4),ri(3,4),ri(-10,10)];
      const [x0,y0]=[ri(-3,3),ri(-3,3)];
      const num = Math.abs(a*x0 + b*y0 + c);
      const den2 = a*a + b*b;
      const den = Math.sqrt(den2);
      if(!Number.isInteger(den)) return null;
      const val = num/den;
      const ans = `$${val}$`;
      return {type:["객관식","단답형","서술형"],q:`점 $(${x0}, ${y0})$에서 직선$${a}x+${b}y${sp(c)}=0$까지의 거리를 구하시오.`,choices:[ans,`$${val+1}$`,`$${Math.abs(val-1)}$`,`$\\sqrt{${num}}$`,`$\\dfrac{${num}}{${den2}}$`],ci:0,ans,sa:val,sol:`점과 직선 사이의 거리 공식:\n$d = \\dfrac{|ax_0+by_0+c|}{\\sqrt{a^2+b^2}} = \\dfrac{|${a}(${x0})+${b}(${y0})${sp(c)}|}{\\sqrt{${a}^2+${b}^2}} = \\dfrac{${num}}{${den}} = ${val}$`,hints:["공식: $\\dfrac{|ax_0+by_0+c|}{\\sqrt{a^2+b^2}}$","대입 후 절댓값 주의"],terms:"점과 직선 사이의 거리",std:"[10공수02-03] 점과 직선 사이의 거리"};
    }
   ]
};
