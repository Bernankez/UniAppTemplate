import presetIcons from "@unocss/preset-icons";
import { defineConfig, Preset } from "unocss";
import { presetUni } from "unocss-preset-uni";
import presetWeapp from "unocss-preset-weapp";

export default defineConfig({
  // presetWeapp转换\/, \:等
  // presetUni包含的属性和presetUno一样多, 比如bg-gradient
  // 单位实际上会被转成presetUni的preset, 即rem
  presets: [presetWeapp() as Preset, presetUni() as Preset, presetIcons() as Preset],
});
