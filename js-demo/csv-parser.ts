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
