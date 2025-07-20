import { join } from "path";

export const getCurrentDir = (strings: TemplateStringsArray, ...values: any[]) => {
  const filePath = strings.reduce((result, string, i) => {
    return result + string + (values[i] || '');
  }, '');
  return join(process.cwd(), filePath);
};