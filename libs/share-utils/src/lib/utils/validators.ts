function notHaveDigit(str: string): boolean {
  return str.search(/(?=.*[0-9])/) == -1;
}

function notHaveUppercase(str: string): boolean {
  return str.search(/(?=.*[A-Z])/) == -1;
}

function notHaveSpecial(str: string): boolean {
  return str.search(/(?=.*[!@#$%^&*()~=_+}{":;'?{}/>.<,`\-|[\]])/) == -1;
}

function search(str: string, regexStr: string) {
  str.search(regexStr);
}

export { notHaveDigit, notHaveSpecial, notHaveUppercase, search };

