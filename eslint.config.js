// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    // Or customize the stylistic rules
    stylistic: {
      indent: 2, // 4, or 'tab'
      quotes: 'single', // or 'double'
    },
    // https://eslint.style/packages/default

    unocss: true,
    formatters: true,

    // TypeScript and Vue are auto-detected
    typescript: true,
    vue: true,
  },
  {
    rules: {
      'no-console': 'off',
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      }],
    },
  },
)
