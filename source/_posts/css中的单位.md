---
title: css中的单位
date: 2019-03-22 14:03:37
tags: css,前端
category: 前端开发
---

- [印刷单位](#%E5%8D%B0%E5%88%B7%E5%8D%95%E4%BD%8D)
- [网页单位](#%E7%BD%91%E9%A1%B5%E5%8D%95%E4%BD%8D)
    - [示例](#%E7%A4%BA%E4%BE%8B)
    - [预设单位](#%E9%A2%84%E8%AE%BE%E5%8D%95%E4%BD%8D)
      - [示例](#%E7%A4%BA%E4%BE%8B-1)
- [视窗单位](#%E8%A7%86%E7%AA%97%E5%8D%95%E4%BD%8D)
    - [示例](#%E7%A4%BA%E4%BE%8B-2)
- [基于文字单位](#%E5%9F%BA%E4%BA%8E%E6%96%87%E5%AD%97%E5%8D%95%E4%BD%8D)
    - [示例](#%E7%A4%BA%E4%BE%8B-3)

# 印刷单位

- pt：打印机的每个点，定义 1 pt ＝ 1/72 in，如果在 72 dpi 的系統上 1 px = 1 pt，但如果在 96 dpi 的系統上 1 px = 0.75 pt ( 72/96 = 0.75 )。
- in：英寸，在 96 dpi 的系统上 1 in = 96 px。
- cm：厘米，在 96 dpi 的系统上 1 cm = 37.795275593333 px。
- mm：毫米，在 96 dpi 的系统上 1 cm = 3.7795275593333 px。

# 网页单位

- px：绝对单位，代表屏幕中的每个像素点( pixel )，像素 px 是相对于显示器屏幕分辨率而言的。
- em：相对长度单位。**相对于浏览器的默认字体尺寸**。
  - em 的值并不是固定的
  - em 会继承父级元素的字体大小。
  - 所有未经调整的浏览器都符合: 1em=16px
- rem：相对单位，相对根元素（html）的 font-size。
- %：相对单位，相对父元素的百分比。

### 示例

> px 只要设定多少 px 就显示多大的字体

<div style="border:1px solid;padding:0 12px 5px 12px;font-size:16px;">16px<div 
style="border:1px solid;padding:0 12px 5px 12px;font-size:20px;">20px<div 
style="border:1px solid;padding:0 12px 5px 12px;font-size:24px;">24px<div 
style="border:1px solid;padding:0 12px 5px 12px;font-size:16px;">16px<div 
style="border:1px solid;padding:0 12px 5px 12px;font-size:32px;">32px</div></div></div></div>
</div>

> 浏览器的默认字体尺寸已被设置为 14px

  <div style="border: 1px solid; padding:0 14px;font-size:16px"><div 
  style="font-size:14px">测试文本 font-size:14px</div><div 
  style="font-size:1em">测试文本 font-size:1em</div><div 
  style="font-size:2em">测试文本 font-size:2em</div></div>
  
> em相对于父元素而言
  
<div style="border: 1px solid; padding:0 12px 5px 12px; font-size:14px">测试文本 font-size:14px<div 
style="font-size:1.2em;border:1px solid;padding:0 12px 5px 12px;">测试文本 font-size:1.2em<div 
style="font-size:1.2em;border:1px solid;padding:0 12px 5px 12px;">测试文本 font-size:1.2em<div 
style="font-size:1.2em;border:1px solid;padding:0 12px 5px 12px;">测试文本 font-size:1.2em</div></div></div>
</div>

> rem 相对与根元素而言

<div style="font-size:1.2rem;border:1px solid;padding:0 12px 5px 12px;">测试文本 font-size:1.2rem<div style="font-size:1.2rem;border:1px solid;padding:0 12px 5px 12px;">测试文本 font-size:1.2rem<div 
style="font-size:1.2rem;border:1px solid;padding:0 12px 5px 12px;">测试文本 font-size:1.2rem</div></div></div>

### 预设单位

- medium : 预设值，等于 16px ( h4 预设值 )
- xx-small : medium 的 0.6 倍 ( h6 预设值 )
- x-small : medium 的 0.75 倍
- small : medium 的 0.8 倍 ( h5 预设值，W3C 定义 0.89，实测约 0.8 )
- large : medium 的 1.1 倍 ( h3 预设值，W3C 定义 1.2，实测约 1.1 )
- x-large : medium 的 1.5 倍 ( h2 预设值 )
- xx-large : medium 的 2 倍 ( h1 预设值 )
- smaller : 约为父级的 80%
- larger : 约为父级的 120%

#### 示例

<div style="font-size:medium;border: 1px solid; padding:0 12px;">测试文本 font-size:medium</div><div style="font-size:xx-small;border:1px solid;padding:0 12px;">测试文本 font-size:xx-small</div><div style="font-size:x-small;border:1px solid;padding:0 12px;">测试文本 font-size:x-small</div><div style="font-size:small;border:1px solid;padding:0 12px;">测试文本 font-size:small</div><div 
style="font-size:large;border:1px solid;padding:0 12px;">测试文本 font-size:large</div><div 
style="font-size:x-large;border:1px solid;padding:0 12px;">测试文本 font-size:x-large</div><div style="font-size:xx-large;border:1px solid;padding:0 12px;">测试文本 font-size:xx-large</div>

<div style="font-size:medium;border:1px solid;padding:0 12px 5px 12px;">测试文本 font-size:medium<div style="font-size:larger;border:1px solid;padding:0 12px 5px 12px;">测试文本 font-size:larger(120%)<div style="font-size:larger;border:1px solid;padding:0 12px 5px 12px;">测试文本 font-size:larger(120%)<div style="font-size:smaller;border:1px solid;padding:0 12px 5px 12px;">测试文本 font-size:smaller(80%)<div style="font-size:smaller;border:1px solid;padding:0 12px 5px 12px;">测试文本 font-size:smaller(80%)<div style="font-size:smaller;border:1px solid;padding:0 12px 5px 12px;">测试文本 font-size:smaller(80%)</div></div></div></div></div>
</div>

# 视窗单位

- vw 视窗宽度，1vw=视窗宽度的 1%
- vh 视窗高度，1vh=视窗高度的 1%
- vmin vw 和 vh 中较小的那个
- vmax vw 和 vh 中较大的那个。

### 示例

<div style="width:20vw;background-color:bisque;">测试文本20vw</div>
<div style="width:40vw;background-color:bisque;">测试文本40vw</div>

# 基于文字单位

- ch 数字 0 的宽度
- ex 当前字体的小写 x 字母的高度或者 1/2 的 1em

### 示例

- 与数字 0 的宽度对比

  <div style="border:1px solid;display:inline-block;">iiii</div><span> - 默认宽度</span>
  <div style="border:1px solid;display:inline-block;width:4ch;">iiii</div><span> - 宽度4ch</span>
  <div style="border:1px solid;display:inline-block;">0000</div>

- 对比小写字母的高度
  <div style="border:1px solid;display:inline-block;line-height:1;">默认 - x</div><div 
  style="border:1px solid;display:inline-block;line-height:1;height:3ex;">x - 3ex</div>
