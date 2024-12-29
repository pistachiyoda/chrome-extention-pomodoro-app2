import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import PrimeVue from 'primevue/config'
import { Button, Drawer } from 'primevue'

createApp(App)
  .use(PrimeVue, {
    theme: 'none',
  })
  .component('Button', Button)
  .component('Drawer', Drawer)
  .mount('#app')
