function notHaveDigit(str: string) {
  return str.search(/(?=.*[0-9])/);
}

function notHaveUppercase(str: string) {
  return str.search(/(?=.*[A-Z])/);
}

function notHaveSpecial(str: string) {
  return str.search(/(?=.*[!@#$%^&*()~=_+}{":;'?{}/>.<,`\-|[\]])/);
}

function search(str: string, regexStr: string) {
  str.search(regexStr);
}

export { notHaveDigit, notHaveUppercase, notHaveSpecial, search };
