<script setup lang="ts">
interface NavItem {
  title: string
  href: string
  icon?: string
  color: string
}

const navItems: NavItem[] = [
  {
    title: '统计荷载计算工具',
    href: '/load',
    icon: '',
    color: 'from-green-500 to-emerald-500',
  },
  // { title: '', icon: '', color: 'from-purple-500 to-indigo-500' },
  // { title: '', icon: '', color: 'from-pink-500 to-rose-500' },
  // { title: '', icon: '', color: 'from-blue-500 to-cyan-500' },
  // { title: '', icon: '', color: 'from-yellow-500 to-amber-500' },
  // { title: '', icon: '', color: 'from-orange-500 to-red-500' },
]
</script>

<template>
  <div class="min-h-screen px-4 py-8 lg:px-8 sm:px-6">
    <div class="mx-auto max-w-3xl">
      <h1 class="mb-10 text-center text-2xl font-bold">
        Calculator Tools Collection
      </h1>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <RouterLink
          v-for="(item, index) in navItems"
          :key="index"
          :to="item.href"
          as="div"
          :class="`bg-gradient-to-br ${item.color} rounded-lg p-6 text-white shadow-lg transition-transform hover:scale-105 cursor-pointer`"
        >
          <div class="flex flex-col items-center">
            <component
              :is="item.icon"
              class="mb-2 h-12 w-12"
            />
            <h2 class="text-center text-lg font-semibold">
              {{ item.title }}
            </h2>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
