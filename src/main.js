import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {VueCsvImportPlugin} from "vue-csv-import"

createApp(App).use(VueCsvImportPlugin).mount('#app')
