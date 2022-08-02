import { isDefined } from "./";

/**
 * 脱敏
 * @param character 原字符串
 * @param range 范围 左开右闭
 * @param maskCode 使用什么字符替换 默认*
 * @example desensitization('123456',[2,4]) => '12**56'
 */
export function desensitization(character: string, range: [number, number] | [number, number][], maskCode = "*") {
  if (!isDefined(character)) {
    return character;
  }
  let val = character;
  if (range.length > 0 && val) {
    if (typeof range[0] === "number" && typeof range[1] === "number") {
      val = val.slice(0, range[0]) + "".padStart(val.slice(range[0], range[1]).length, maskCode) + val.slice(range[1]);
    } else {
      range.forEach(r => {
        val = val.slice(0, r[0]) + "".padStart(val.slice(r[0], r[1]).length, maskCode) + val.slice(r[1]);
      });
    }
  }
  return val;
}
