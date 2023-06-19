/* eslint-disable */
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
// import z biblioteki do ladnych kontrolek wedlugn internetu
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css';       //theme
import 'primevue/resources/primevue.min.css';                 //core css
import 'primeicons/primeicons.css';                           //icons
Vue.use(PrimeVue);
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputSwitch from 'primevue/inputswitch';
import Dialog from 'primevue/dialog';

Vue.component('Column', Column);
Vue.component('DataTable', DataTable);
Vue.component('Button', Button);
Vue.component('InputText', InputText);
Vue.component('InputSwitch', InputSwitch);
Vue.component('Dialog', Dialog);
// import wlasnych elementow strony
import SensorData from '@/components/SensorData.vue';
import DevicesData from '@/components/DevicesData.vue';
import LightsData from '@/components/LightsData.vue';
import MainPage from '@/components/MainPage.vue';
import LoginPage from '@/components/LoginPage.vue';
Vue.component('SensorData', SensorData);
Vue.component('DevicesData', DevicesData);
Vue.component('LightsData', LightsData);
Vue.component('MainPage', MainPage);
Vue.component('LoginPage', LoginPage);

// import czesc odpowiedzialnej za wykresy
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)
Vue.use(VueRouter)
// przekierowania miedzy stronami w linku
const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/main',
    name: "main",
    component: MainPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
