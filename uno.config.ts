import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetAnimations from 'unocss-preset-animations'
import { builtinColors, presetShadcn } from 'unocss-preset-shadcn'

export default defineConfig({
  shortcuts: [],
  rules: [
    [/^text-shadow-(?:default|sm|lg)$/, (match) => {
      const textShadowStrategies = [
        {
          name: 'default',
          params: {
            x: 1,
            y: 1,
            blur: 2,
            opacity: 0.5,
          },
        },
        {
          name: 'sm',
          params: {
            x: 0.5,
            y: 0.5,
            blur: 1,
            opacity: 0.2,
          },
        },
        {
          name: 'lg',
          params: {
            x: 2,
            y: 2,
            blur: 3,
            opacity: 0.8,
          },
        },
      ]

      const strategy = textShadowStrategies.find(s => match.includes(s.name))
      if (strategy) {
        const { x, y, blur, opacity } = strategy.params
        return {
          'text-shadow': `${x}px ${y}px ${blur}px rgba(0, 0, 0, ${opacity})`,
        }
      }
      return {}
    }],
  ],
  presets: [
    presetUno(),
    presetAnimations(),
    presetShadcn(builtinColors.map(c => ({ color: c }))),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        lucide: () => import('@iconify-json/lucide/icons.json').then(i => i.default),
      },
    }),
    presetTypography(),
  ],
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        'src/**/*.{js,ts}',
      ],
      // exclude files
      exclude: [],
    },
  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    transformerCompileClass(),
  ],
  safelist: [],
  blocklist: [],
})
