import Login from './components/login.vue';
import Register from './components/register.vue';
// import ViewContact from './components/viewcontact.vue';
// import AddContact from './components/addcontact.vue';
import Home from './components/home.vue'

export default [
    { path: '/', redirect: { name: "Login" } },
    { path: '/login', name: "Login", component: Login },
    { path: '/register', component: Register },
    // {path:'/add',component:AddContact},
    // {path:'/view',component:ViewContact},
    { path: '/home', name: 'home', component: Home },

]