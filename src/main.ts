import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import authgear from '@authgear/web'

const app = createApp(App)

async function init() {
  try {
    // configure Authgear container instance
    await authgear.configure({
      endpoint: 'http://accounts.portal.localhost:3100',
      clientID: '396f0569ebb4544e',
      sessionType: 'refresh_token'
    })
  } finally {
    app.use(router)
    app.mount('#app')
  }
}

init().catch((e) => {
  // Error handling
  console.error(e)
})
