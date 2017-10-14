<template>
  <div id="app">
    <cart-header></cart-header>
    <router-view></router-view>
  </div>
</template>

<script>
import CartHeader from './pages/Header'

export default {
  name: 'app',
  components: {
    CartHeader
  }
}
</script>

<style>

@import '/static/bootstrap/css/bootstrap.min.css';

*{
  margin: 0;
  padding: 0;
}

</style>
