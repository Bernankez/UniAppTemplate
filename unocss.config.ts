import presetIcons from "@unocss/preset-icons";
import { defineConfig, Preset } from "unocss";
import { presetUni } from "unocss-preset-uni";
import presetWeapp from "unocss-preset-weapp";

export default defineConfig({
  // presetWeapp不支持bg-gradient这种; presetUni继承自preset-uno, 但是不支持text-green-500/50这种, 因此两者混用
  // 单位实际上会被转成presetUni的preset, 即rem
  presets: [presetWeapp() as Preset, presetUni() as Preset, presetIcons() as Preset],
});
