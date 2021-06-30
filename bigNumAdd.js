console.log(...log("两个大数相加:"));

const bigNumAdd = (...args) => {
  if (!args.every((v) => typeof v == "string")) {
    throw new Error(
      "请传入字符串格式数字，防止数字超过二进制最大表示数字范围时，失去精度"
    );
  }
  const [num1, num2] = [args[0], args[1]];
  if (!num1 || !num2) throw new Error("参数不合法");
  let [result, num1_arr, num2_arr, flag, k] = [
    [],
    num1.toString().split("").reverse(),
    num2.toString().split("").reverse(),
    0,
    0,
  ];
  if (num1_arr.length < num2_arr.length) {
    let save = num1_arr;
    num1_arr = num2_arr;
    num2_arr = save;
    save = null;
  }
  const add = (m, n) => {
    const sum = Number(m) + (n ? Number(n) : 0) + flag;
    if (sum > 9) {
      flag = 1;
      result.unshift(sum - 10);
    } else {
      flag = 0;
      result.unshift(sum);
    }
  };
  for (k = 0; num1_arr[k]; ) {
    add(Number(num1_arr[k]), Number(num2_arr[k]));
    // 计算到首位且前面加的需要进位1时
    if (flag && k == num1_arr.length - 1) {
      result.unshift(1);
    }
    k++;
  }
  return result.join("");
};
console.log(bigNumAdd("999999999999", "999999999999999999999999"));
