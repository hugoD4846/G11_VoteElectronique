/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

// Plugins
import { registerPlugins } from '@/plugins';
import axios from 'axios';
import VueAxios from 'vue-axios';
const app = createApp(App);
app.use(VueAxios, axios);
axios.defaults.baseURL = 'http://localhost:4000';
// axios.options. =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aXRhbElkIjoiMTI2OTY5Mzg3OTM3MDkiLCJpZCI6IjViZGU1ZmE1LTkwMDgtNDZmNi1iNjQ0LTMyNzhmYTA4NzQ5NSIsImlhdCI6MTY5NzE5MDU2MSwiZXhwIjoxNjk3MjUwNTYxfQ.b21VozArFlvJ9AaZFlpny0NeFQc8iuz_FjVmNrxqZAk';
registerPlugins(app);

app.mount('#app');
