import type { App } from 'vue'
import type { Router } from 'vue-router'
import type { UserModule } from '~/types'

export default function useModules(app: App, router: Router) {
  Object.values(import.meta.glob<{ install: UserModule }>('./*.ts', { eager: true }))
    .forEach(i => i.install?.({ app, router }))
}
