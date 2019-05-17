const data = `john,"hello,world"
jack,"12,road"`;
enum StateType {
  // 新开始字段
  NewFieldStart,
  //  非引号字段
  NonQuotesField,
  //   引号字段
  QuotesField,
  //   分割字段
  FieldSeparator,
  //   引号中的引号
  QuoteInQuotesField,
  //   行分割符
  RowSeparator,
  //   语法错误
  Error
}

function parser(data = "") {
  let state: StateType = StateType.NewFieldStart as StateType;
  let result = [];
  let row = [];
  let field = "";
  for (let index = 0; index < data.length; index++) {
    const ch = data.charAt(index);
    switch (state) {
      case StateType.NewFieldStart:
        switch (ch) {
          case ",":
            row.push(field);
            field = "";
            state = StateType.FieldSeparator;
            break;
          case '"':
            state = StateType.QuotesField;
            break;
          case "\n":
            state = StateType.RowSeparator;
            break;
          case "\r":
            state = StateType.RowSeparator;
            break;
          default:
            field += ch;
            state = StateType.NonQuotesField;
            break;
        }
        break;
      case StateType.NonQuotesField:
        switch (ch) {
          case ",":
            row.push(field);
            field = "";
            break;
          case '"':
            state = StateType.Error;
            break;
          default:
            field += ch;
            state = StateType.NonQuotesField;
            break;
        }
        break;
      case StateType.QuotesField:
        switch (ch) {
          case '"':
            state = StateType.NonQuotesField;
            break;
          default:
            field += ch;
            state = StateType.QuotesField;
            break;
        }
        break;
      case StateType.FieldSeparator:
        switch (ch) {
          case '"':
            field = "";
            state = StateType.QuotesField;
            break;
          case ",":
            row.push(field);
            field = "";
            state = StateType.FieldSeparator;
          default:
            field += ch;
            state = StateType.NonQuotesField;
            break;
        }
        break;
      case StateType.QuoteInQuotesField:
        break;
      case StateType.RowSeparator:
        break;
      case StateType.Error:
        break;
      default:
        break;
    }
  }
}
