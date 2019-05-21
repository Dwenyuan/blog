---
title: CSV parser的实现
tags: 前端
---

- [什么是 csv](#%E4%BB%80%E4%B9%88%E6%98%AF-csv)
- [常用 CSV 文件规则](#%E5%B8%B8%E7%94%A8-csv-%E6%96%87%E4%BB%B6%E8%A7%84%E5%88%99)
- [读取 CSV 文件并转换为对象](#%E8%AF%BB%E5%8F%96-csv-%E6%96%87%E4%BB%B6%E5%B9%B6%E8%BD%AC%E6%8D%A2%E4%B8%BA%E5%AF%B9%E8%B1%A1)
  - [使用字符串里面的 split 函数](#%E4%BD%BF%E7%94%A8%E5%AD%97%E7%AC%A6%E4%B8%B2%E9%87%8C%E9%9D%A2%E7%9A%84-split-%E5%87%BD%E6%95%B0)
  - [正常解析 CSV 文件](#%E6%AD%A3%E5%B8%B8%E8%A7%A3%E6%9E%90-csv-%E6%96%87%E4%BB%B6)
    - [首先需要列出状态转移表](#%E9%A6%96%E5%85%88%E9%9C%80%E8%A6%81%E5%88%97%E5%87%BA%E7%8A%B6%E6%80%81%E8%BD%AC%E7%A7%BB%E8%A1%A8)
    - [确定状态发生时的执行方法](#%E7%A1%AE%E5%AE%9A%E7%8A%B6%E6%80%81%E5%8F%91%E7%94%9F%E6%97%B6%E7%9A%84%E6%89%A7%E8%A1%8C%E6%96%B9%E6%B3%95)

# 什么是 csv

CSV 文件格式的通用标准并不存在，但是在 [RFC4180](https://tools.ietf.org/html/rfc4180#page-4) 里面有基础的描述。一般情况下我们泛指具有以下特征的文件为“CSV”

- 纯文本，使用某个字符集，比如 ASCII、Unicode、EBCDIC 或 GB2312；
- 由记录组成（典型的是每行一条记录）；
- 每条记录被分隔符分隔为字段（典型分隔符有逗号、分号或制表符；有时分隔符可以包括可选的空格）；
- 每条记录都有同样的字段序列。

# 常用 CSV 文件规则

1.  开头是不留空，以行为单位。
2.  可含或不含列名，含列名则居文件第一行。
3.  一行数据不跨行，无空行。
4.  以半角逗号（即,）作分隔符，列为空也要表达其存在。
5.  列内容如存在半角引号（即`"`），替换成半角双引号（`""`）转义，即用半角引号（即`""`）将该字段值包含起来。
6.  文件读写时引号，逗号操作规则互逆。
7.  内码格式不限，可为 ASCII、Unicode 或者其他。
8.  不支持数字
9.  不支持特殊字符

```csv
john, "hello world"
"12,road", 用户名
```

# 读取 CSV 文件并转换为对象

## 使用字符串里面的 split 函数

简单的处理 CSV 文件可以使用 split 方法简单的切割字符串。一般分两步来做

1. 按行切割，生成一个一维数组
2. 遍历数组，每个元素按照分割符（一般是`,`）切割

简单的实现如下：

```typescript
function parser(content: String): String[][] {
  const rows = content.split("\n");
  return rows.map(v => v.split(","));
}
```

但是这种简单处理方式不能处理含有特殊字符的情况，比如我的 CSV 是以下情况

```cs
john, "hello world"
"12,road", 用户名
```

我们希望得到以下结果

```json
[["john", "hello world"], ["12,road", "用户名"]]
```

实际执行结果显然不是我们预期的情况

```json
[["john", "\"hello world\""], ["jack", "\"12", "road\""]]
```

考虑到特殊情况的处理，我们就不能简单的使用 split 函数来处理了

## 正常解析 CSV 文件

这里使用有限状态机解析，一般来说可以分为以下几步执行

### 首先需要列出状态转移表

1. Start 开始状态 最开始解析时会是这个状态
2. NonQuote 非引号状态。 读取到正常字符时为这个状态
3. Quote 引号状态。 第一个字符读取到引号时设置为这个状态
4. 字段结束状态。没有引号的状态下读取到空格表示该字段已经结束，前面有引号然后读取到第二个引号时表示该字段已经结束，后面再有正常字符时会报错。
5. Separator 分割符状态。 读取到`,`号时设置这个状态
6. RowEnd 行分隔符。 读取到换行符时设置这个状态
7. Error 错误状态。发生错误时设置这个状态

| event\state | Start     | NonQuote  | Quote    | EndField  | Separator | RowEnd    | Error |
| ----------- | --------- | --------- | -------- | --------- | --------- | --------- | ----- |
| `,`         | Separator | Separator | Quote    | Separator | Separator | Separator | Error |
| `"`         | Quote     | Error     | EndField | Error     | Quote     | Quote     | Error |
| `space`     | Start     | EndField  | Quote    | EndField  | Separator | RowEnd    | Error |
| `\r`,`\n`   | Error     | RowEnd    | Error    | RowEnd    | RowEnd    | Error     | Error |
| `\w`        | NonQuote  | NonQuote  | Quote    | Error     | NonQuote  | NonQuote  | Error |

### 确定状态发生时的执行方法

按照以上表格设置各种情况下的分支

```typescript
enum StateType {
  // 新开始字段
  Start,
  //  非引号字段
  NonQuote,
  //   引号字段
  Quote,
  // 字段结束标记
  EndField,
  //   分割字段
  Separator,
  //   行分割符
  RowEnd,
  //   语法错误
  Error
}
const COMMA = ",";
const QUOTE = '"';
const NEWLINE = "\n";
const RETURN = "\r";
const SPACE = " ";
export function parser(data = "") {
  data = data.trim();
  let state: StateType = StateType.Start as StateType;
  let result = [];
  let row = [];
  let field = "";
  for (let index = 0; index <= data.length; index++) {
    if (index === data.length) {
      row.push(field);
      result.push(row);
      field = "";
      row = [];
      break;
    }
    const ch = data.charAt(index);
    switch (state) {
      case StateType.Start:
        switch (ch) {
          case COMMA:
            row.push(field);
            field = "";
            state = StateType.Separator;
            break;
          case QUOTE:
            state = StateType.Quote;
            break;
          case RETURN:
          case NEWLINE:
            row.push(field);
            result.push(row);
            field = "";
            row = [];
            state = StateType.RowEnd;
            break;
          default:
            field += ch;
            state = StateType.NonQuote;
            break;
        }
        break;
      case StateType.NonQuote:
        switch (ch) {
          case COMMA:
            row.push(field);
            field = "";
            state = StateType.Separator;
            break;
          case QUOTE:
            state = StateType.Error;
            break;
          case SPACE:
            state = StateType.EndField;
          case RETURN:
          case NEWLINE:
            row.push(field);
            result.push(row);
            field = "";
            row = [];
            state = StateType.RowEnd;
          default:
            field += ch;
            break;
        }
        break;
      case StateType.Quote:
        switch (ch) {
          case QUOTE:
            state = StateType.EndField;
            break;
          case RETURN:
          case NEWLINE:
            state = StateType.Error;
            break;
          default:
            field += ch;
            break;
        }
        break;
      case StateType.EndField:
        switch (ch) {
          case COMMA:
            row.push(field);
            field = "";
            state = StateType.Separator;
            break;
          case QUOTE:
            state = StateType.Error;
            break;
          case SPACE:
            break;
          case RETURN:
          case NEWLINE:
            row.push(field);
            result.push(row);
            field = "";
            row = [];
            state = StateType.RowEnd;
            break;
          default:
            state = StateType.Error;
            break;
        }
        break;
      case StateType.Separator:
        switch (ch) {
          case COMMA:
            row.push(field);
            field = "";
            state = StateType.Separator;
            break;
          case QUOTE:
            field = "";
            state = StateType.Quote;
            break;
          case SPACE:
            break;
          case RETURN:
          case NEWLINE:
            row.push(field);
            result.push(row);
            field = "";
            row = [];
            state = StateType.RowEnd;
          default:
            field += ch;
            state = StateType.NonQuote;
            break;
        }
        break;
      case StateType.RowEnd:
        switch (ch) {
          case COMMA:
            state = StateType.Separator;
            break;
          case QUOTE:
            state = StateType.Quote;
            break;
          case SPACE:
          case RETURN:
          case NEWLINE:
            state = StateType.Error;
            break;
          default:
            field += ch;
            state = StateType.NonQuote;
            break;
        }
        break;
      case StateType.Error:
        break;
      default:
        break;
    }
  }
  return result;
}
```
