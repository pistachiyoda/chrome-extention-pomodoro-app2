import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import PrimeVue from 'primevue/config'
import { Button, Drawer, InputText, IconField, InputIcon, DataTable, Column } from 'primevue'

createApp(App)
  .use(PrimeVue, {
    theme: 'none',
  })
  .component('Button', Button)
  .component('Drawer', Drawer)
  .component('InputText', InputText)
  .component('IconField', IconField)
  .component('InputIcon', InputIcon)
  .component('DataTable', DataTable)
  .component('Column', Column)
  .mount('#app')
