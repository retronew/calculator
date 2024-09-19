<script setup lang="ts">
import math from '~/utils/math'

interface Window {
  width: number
  height: number
}

interface Data {
  axisSpan: number // 轴线开间
  floorHeight: number // 层高
  beamHeight: number // 框架梁高
  wallWeight: number // 墙体自重
  columnWidth: number // 框架柱宽
  windowWeight: number // 窗自重
  windows: Window[] // 门窗列表
}

const data = ref<Data>({
  axisSpan: 0, // Axis span (meters)
  floorHeight: 0, // Floor height (meters)
  beamHeight: 0, // Frame beam height (meters)
  wallWeight: 0, // Wall self-weight
  columnWidth: 0, // Frame column width
  windowWeight: 0, // Window self-weight
  windows: [{ width: 0, height: 0 }], // List of windows/doors
})

function addWindow() {
  data.value.windows.push({ width: 0, height: 0 })
}

function removeWindow(index: number) {
  data.value.windows.splice(index, 1)
}

function calculate(data: Data): {
  result: string | null
  formula: string
  error: boolean
  errorMessage?: string
} {
  const { axisSpan, columnWidth, floorHeight, beamHeight, wallWeight, windowWeight, windows } = data

  const s1 = math.subtract(axisSpan, columnWidth)
  const s2 = math.multiply(s1, math.subtract(floorHeight, beamHeight))
  const s3 = windows.reduce((sum, window) => {
    return math.add(sum, math.multiply(window.height, window.width))
  }, 0)

  let formula = `
    \\text{Load} = \\frac{(s_2 - s_3) \\cdot \\text{wallWeight} + s_3 \\cdot \\text{windowWeight}}{s_1}
    \\\\[10pt]
    \\text{where:}
    \\\\[5pt]
    s_1 = \\text{axisSpan} - \\text{columnWidth} = ${axisSpan} - ${columnWidth} = ${s1}
    \\\\[5pt]
    s_2 = s_1 \\cdot (\\text{floorHeight} - \\text{beamHeight}) = ${s1} \\cdot (${floorHeight} - ${beamHeight}) = ${s2}
    \\\\[5pt]
    s_3 = \\text{total window/door area} = ${s3}
    \\\\[10pt]
  `

  // Check for invalid input values
  if (axisSpan <= 0 || columnWidth < 0 || floorHeight <= 0 || beamHeight < 0 || wallWeight < 0 || windowWeight < 0) {
    return {
      result: null,
      formula,
      error: true,
      errorMessage: '输入值无效，请确保所有尺寸和重量为非负数，且轴线开间和层高大于0。',
    }
  }

  // Check if total window area exceeds wall area
  if (math.larger(s3, s2)) {
    return {
      result: null,
      formula,
      error: true,
      errorMessage: '门窗面积总和超过了墙体面积，请检查输入值。',
    }
  }

  if (math.smallerEq(s1, 0)) {
    return {
      result: null,
      formula,
      error: true,
      errorMessage: '无法计算，有效宽度(s1)小于或等于0',
    }
  }

  const numerator = math.add(
    math.multiply(math.subtract(s2, s3), wallWeight),
    math.multiply(s3, windowWeight),
  )
  const result = math.divide(numerator, s1)

  // Check if result is negative
  if (math.smallerEq(result, 0)) {
    return {
      result: null,
      formula,
      error: true,
      errorMessage: '计算结果无效（负数），请检查输入值。',
    }
  }

  formula += `
    \\text{Load} = \\frac{(${s2} - ${s3}) \\cdot ${wallWeight} + ${s3} \\cdot ${windowWeight}}{${s1}}
    \\\\[5pt]
    = ${math.format(result, { precision: 4 })}
  `

  return {
    result: math.format(result, { precision: 4 }),
    formula,
    error: false,
  }
}

const result = computed(() => calculate(data.value))

const toolName = '统计荷载计算工具'

useSeoMeta({
  title: toolName,
  description: toolName,
})
</script>

<template>
  <div class="mx-auto max-w-2xl py-6">
    <h1 class="mb-8 text-center text-2xl font-bold">
      {{ toolName }}
    </h1>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div class="flex flex-col gap-1.5">
        <Label
          for="axisSpan"
          class="block text-sm text-gray-700 font-medium"
        >轴线开间（米）</Label>
        <Input
          id="axisSpan"
          v-model="data.axisSpan"
          type="number"
        />
      </div>
      <div class="flex flex-col gap-1.5">
        <Label
          for="floorHeight"
          class="block text-sm text-gray-700 font-medium"
        >层高（米）</label>
        <Input
          id="floorHeight"
          v-model="data.floorHeight"
          type="number"
        />
      </div>
      <div class="flex flex-col gap-1.5">
        <Label
          for="beamHeight"
          class="block text-sm text-gray-700 font-medium"
        >框架梁高（米）</label>
        <Input
          id="beamHeight"
          v-model="data.beamHeight"
          type="number"
        />
      </div>
      <div class="flex flex-col gap-1.5">
        <Label
          for="wallWeight"
          class="block text-sm text-gray-700 font-medium"
        >墙体自重</label>
        <Input
          id="wallWeight"
          v-model="data.wallWeight"
          type="number"
        />
      </div>
      <div class="flex flex-col gap-1.5">
        <Label
          for="columnWidth"
          class="block text-sm text-gray-700 font-medium"
        >框架柱宽</label>
        <Input
          id="columnWidth"
          v-model="data.columnWidth"
          type="number"
        />
      </div>
      <div class="flex flex-col gap-1.5">
        <Label
          for="windowWeight"
          class="block text-sm text-gray-700 font-medium"
        >窗自重</label>
        <Input
          id="windowWeight"
          v-model="data.windowWeight"
          type="number"
        />
      </div>
    </div>
    <div
      v-for="(window, index) in data.windows"
      :key="index"
      class="grid grid-cols-1 mt-4 gap-4 md:grid-cols-2"
    >
      <div class="flex flex-col gap-1.5">
        <Label
          :for="`windowWidth${index}`"
          class="block text-sm text-gray-700 font-medium"
        >门窗口宽（米）</label>
        <Input
          :id="`windowWidth${index}`"
          v-model="window.width"
          type="number"
        />
      </div>
      <div class="flex flex-col gap-1.5">
        <Label
          :for="`windowHeight${index}`"
          class="block text-sm text-gray-700 font-medium"
        >高度（米）</label>
        <div class="relative">
          <Input
            :id="`windowHeight${index}`"
            v-model="window.height"
            type="number"
          />
          <span class="absolute top-1/2 transform -right-9 -translate-y-1/2">
            <button
              v-if="data.windows.length > 1"
              class="flex justify-center p-1 text-red-500 hover:text-red-700"
              @click="removeWindow(index)"
            >
              <i
                i="lucide-x"
                class="h-4 w-4"
              />
            </button>
          </span>
        </div>
      </div>
    </div>
    <Button
      class="mt-5 w-full font-semibold"
      @click="addWindow"
    >
      增加门窗
    </Button>
    <div class="mt-8 rounded-lg bg-gray-100 p-4">
      <h2 class="mb-4 text-center text-xl font-semibold">
        计算结果
      </h2>
      <div class="mb-4">
        <p class="rounded bg-white p-2">
          <Katex
            :expression="result.formula"
            display-mode
          />
        </p>
      </div>
      <p
        class="text-center text-xl font-semibold"
        :class="{ 'text-destructive': result.error }"
      >
        最终结果：{{ result.result }}
        <span v-if="result.error">
          {{ result.errorMessage }}
        </span>
      </p>
    </div>
  </div>
</template>
