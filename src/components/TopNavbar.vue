<script setup>
</script>

<template>
  <header id="header" class="header d-flex align-items-center">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
      <router-link to="/" class="logo d-flex align-items-center"><img src="/favicon-32x32.png" alt="Avril14th Logo"></router-link>
      <nav class="navbar">
        <ul>
          <li><router-link to="/" class="nav-link" aria-current="page">Home</router-link></li>
          <li><router-link to="/submit" class="nav-link" aria-current="page">Submit a PFB transaction</router-link></li>
          <li><router-link to="/shares" class="nav-link" aria-current="page">Get namespaced shares</router-link></li>
          <li><router-link to="/check" class="nav-link" aria-current="page">Check a transaction</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script>

export default {
  data() {
    return {

    }
  }
}
</script>