<script setup lang="ts">
import katex from 'katex'
import 'katex/dist/katex.min.css'

interface Props {
  fontsize?: number
  expression: string
  displayMode?: boolean
  throwOnError?: boolean
  errorColor?: string
  minRuleThickness?: number
  macros?: object
  colorIsTextColor?: boolean
  maxSize?: number
  maxExpand?: number
  allowedProtocols?: string[]
  strict?: boolean | string
}

const props = withDefaults(defineProps<Props>(), {
  fontsize: 16,
  displayMode: false,
  throwOnError: false,
  minRuleThickness: 0.04,
})

const html = computed(() => katex.renderToString(props.expression, props))
</script>

<template>
  <div
    :style="{ fontSize: `${fontsize}px` }"
    v-html="html"
  />
</template>

<style scoped>
</style>
