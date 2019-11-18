<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './components/login.vue'
import Register from './components/register.vue'
import Home from './components/home.vue'

export default {
  components:{
    'app-login': Login,
    'app-register': Register,
    'app-home': Home,
    
  },

  data () {
    return {
      
    }
  }
}
</script>

<style>

</style>
