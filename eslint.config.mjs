import uni from '@uni-helper/eslint-config'

export default uni(
  {
    unocss: true,
    typescript: {
      overrides: {
        'no-console': 'off',
      },
    },
  },
)
