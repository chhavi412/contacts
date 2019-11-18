import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes.js'
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'

Vue.use(Toaster, {timeout: 5000})
Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];

  const authRequired = !publicPages.includes(to.path);
if(localStorage.getItem('users')){
 var loggedIn = true;
}

  // const loggedIn = (localStorage.getItem('users') == 'true');
  console.log(loggedIn);
  
  if (authRequired && !loggedIn) {
    return next('/login');
  }
  if(!authRequired && loggedIn){
    return next('/home');
  }
  next();
 });

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  vuetify
})
