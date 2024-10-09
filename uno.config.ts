import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetUni } from '@uni-helper/unocss-preset-uni'
import uno from './src/styles/unocss'

export const directionMap: Record<string, string[]> = {
  'l': ['-left'],
  'r': ['-right'],
  't': ['-top'],
  'b': ['-bottom'],
  's': ['-inline-start'],
  'e': ['-inline-end'],
  'x': ['-left', '-right'],
  'y': ['-top', '-bottom'],
  '': [''],
  'bs': ['-block-start'],
  'be': ['-block-end'],
  'is': ['-inline-start'],
  'ie': ['-inline-end'],
  'block': ['-block-start', '-block-end'],
  'inline': ['-inline-start', '-inline-end'],
}

function directionSize(size?: string) {
  if (!size) {
    return '0'
  }
  const _size = Number(size)
  if (Number.isNaN(_size)) {
    return size
  }
  return `${_size / 4}rem`
}

export default defineConfig({
  presets: [
    presetUni(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  theme: {
    ...uno,
  },
  rules: [
    ['top-safe', { top: 'var(--window-top)' }],
    ['bottom-safe', { bottom: 'env(safe-area-inset-bottom)' }],
    [/^p-?([rltb])-safe-max(?:-?(.+))?$/, ([, direction, s]) => ({ [`padding${directionMap[direction]}`]: `max(env(safe-area-inset${directionMap[direction]}), ${directionSize(s)})` })], // pb-safe-max-10 pb-safe-max-10rpx p-b-safe-max
    [/^m-?([rltb])-safe-max(?:-?(.+))?$/, ([, direction, s]) => ({ [`margin${directionMap[direction]}`]: `max(env(safe-area-inset${directionMap[direction]}), ${directionSize(s)})` })], // mb-safe-max-10 mb-safe-max-10rpx m-b-safe-max
    [/^p-?([rltb])-safe(?:-?(.+))?$/, ([, direction, s]) => ({ [`padding${directionMap[direction]}`]: `calc(env(safe-area-inset${directionMap[direction]}) + ${directionSize(s)})` })], // pb-safe-10 pb-safe-10rpx p-b-safe
    [/^m-?([rltb])-safe(?:-?(.+))?$/, ([, direction, s]) => ({ [`margin${directionMap[direction]}`]: `calc(env(safe-area-inset${directionMap[direction]}) + ${directionSize(s)})` })], // mb-safe-10 mb-safe-10rpx m-b-safe
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
