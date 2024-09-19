import type { App } from 'vue'
import type { Router } from 'vue-router'

interface Ctx {
  app: App
  router: Router
}

export type UserModule = (ctx: Ctx) => void
