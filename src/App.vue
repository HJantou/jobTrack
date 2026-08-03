<script setup lang="ts">
import { ref } from 'vue';

  const dash = ref("")
  const cand = ref("")
</script>

<template>
  <main>
    <nav>
      <RouterLink to="/" class="link" :class="dash" @click="dash = 'dash', cand = ''">Dashboard</RouterLink>
      <RouterLink to="/candidat" class="link" :class="cand" @click="dash='', cand = 'cand'" >Candidat</RouterLink>
    </nav>

    <RouterView/>
  </main>
</template>

<style scoped>
  :global(html){
    background-color: #ece9e9b7;
  }
  main{
    width: 800px;
    margin: 50px auto;
  }
  nav{
    font-size: 1.2rem;
    padding: 5px;
    margin: 10px;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid black;
    .link{
      margin: 0 50px;
      padding: 5px 25px;
      text-decoration: none;
      color: #292828ce;
    }
    .cand, .dash{
      border: 1px solid #5c5c5c5d;
      background-color: white;
      border-radius: 12px;
    }
  }

</style>
