<script setup lang="ts">
import { buttonVariants } from '~/components/ui/button'
</script>

<template>
  <main
    text="gray-700 dark:gray-200"
    relative
  >
    <RouterLink
      to="/"
      :class="cn(
        buttonVariants({ variant: 'outline', size: 'default' }),
        'absolute right-4 top-4',
      )"
    >
      <i
        i="lucide-undo-2"
        class="mr-2"
      />
      返回
    </RouterLink>
    <RouterView />
  </main>
</template>
